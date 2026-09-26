import { useRef, useState, useCallback, useEffect } from 'react';
import {
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
  RecordingPresets,
  setAudioModeAsync,
  requestRecordingPermissionsAsync,
  createAudioPlayer,
  type AudioPlayer,
  type AudioStatus,
} from 'expo-audio';
import * as FileSystem from 'expo-file-system';

export type AudioPlayerState = {
  isPlaying: boolean;
  isLooping: boolean;
  isLoading: boolean;
  error: string | null;
};

export type RecorderState = {
  isRecording: boolean;
  hasRecording: boolean;
  isPlayingBack: boolean;
  recordingUri: string | null;
};

export type RecitationAudio = {
  player: AudioPlayerState;
  recorder: RecorderState;
  playUrl: (url: string, loop?: boolean) => void;
  stop: () => void;
  toggleLoop: () => void;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  playRecording: () => void;
  stopPlayback: () => void;
  clearRecording: () => void;
};

export function useRecitationAudio(): RecitationAudio {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [loop, setLoop] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const player = useAudioPlayer(currentUrl ?? undefined);
  const status = useAudioPlayerStatus(player);

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const playbackRef = useRef<AudioPlayer | null>(null);
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const playUrl = useCallback((url: string, shouldLoop = false) => {
    setError(null);
    setLoop(shouldLoop);
    setCurrentUrl(url);
  }, []);

  useEffect(() => {
    if (!currentUrl) return;
    player.loop = loop;
    player.play();
  }, [currentUrl, player, loop]);

  const stop = useCallback(() => {
    player.pause();
    setCurrentUrl(null);
  }, [player]);

  const toggleLoop = useCallback(() => {
    setLoop((l) => {
      const next = !l;
      player.loop = next;
      return next;
    });
  }, [player]);

  const startRecording = useCallback(async () => {
    try {
      const perm = await requestRecordingPermissionsAsync();
      if (!perm.granted) {
        setError('Microphone permission is needed to record.');
        return;
      }
      await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      await recorder.prepareToRecordAsync();
      recorder.record();
      setIsRecording(true);
    } catch {
      setError('Could not start recording.');
      setIsRecording(false);
    }
  }, [recorder]);

  const stopRecording = useCallback(async () => {
    try {
      await recorder.stop();
      await setAudioModeAsync({ allowsRecording: false });
      setRecordingUri(recorder.uri);
      setIsRecording(false);
    } catch {
      setIsRecording(false);
    }
  }, [recorder]);

  const playRecording = useCallback(() => {
    if (!recordingUri) return;
    if (playbackRef.current) {
      playbackRef.current.remove();
      playbackRef.current = null;
    }
    playbackRef.current = createAudioPlayer(recordingUri);
    playbackRef.current.addListener('playbackStatusUpdate', (s: AudioStatus) => {
      if (s.didJustFinish) {
        setIsPlayingBack(false);
        playbackRef.current?.remove();
        playbackRef.current = null;
      }
    });
    playbackRef.current.play();
    setIsPlayingBack(true);
  }, [recordingUri]);

  const stopPlayback = useCallback(() => {
    if (playbackRef.current) {
      playbackRef.current.pause();
      playbackRef.current.remove();
      playbackRef.current = null;
    }
    setIsPlayingBack(false);
  }, []);

  const clearRecording = useCallback(() => {
    if (recordingUri) {
      FileSystem.deleteAsync(recordingUri).catch(() => undefined);
    }
    setRecordingUri(null);
    setIsPlayingBack(false);
  }, [recordingUri]);

  useEffect(() => {
    return () => {
      playbackRef.current?.remove();
      playbackRef.current = null;
    };
  }, []);

  return {
    player: {
      isPlaying: status.playing,
      isLooping: loop,
      isLoading: !status.isLoaded && !!currentUrl,
      error,
    },
    recorder: {
      isRecording,
      hasRecording: !!recordingUri,
      isPlayingBack,
      recordingUri,
    },
    playUrl,
    stop,
    toggleLoop,
    startRecording,
    stopRecording,
    playRecording,
    stopPlayback,
    clearRecording,
  };
}
