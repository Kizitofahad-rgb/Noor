import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useArabicFont, arabicFont } from '@/hooks/useArabicFont';
import { useRecitationAudio } from '@/hooks/useRecitationAudio';
import { useNoor } from '@/context/NoorContext';
import { tajweedStyles, tajweedOrder } from '@/lib/tajweed';
import { verseAudioUrl, wordAudioUrl } from '@/lib/recitationAudio';
import type { QuranVerse, QuranWord, TajweedRule } from '@/lib/content';
import { SmallLabel } from '@/components/NoorUI';

type Props = {
  verse: QuranVerse;
  surahNumber: number;
  onClose: () => void;
};

export function RecitationMode({ verse, surahNumber, onClose }: Props) {
  const colors = useColors();
  const fontReady = useArabicFont();
  const audio = useRecitationAudio();
  const { isVersePracticed, toggleVersePracticed } = useNoor();
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const verseKey = `${surahNumber}:${verse.number}`;
  const practiced = isVersePracticed(verseKey);

  const playWord = (index: number) => {
    Haptics.selectionAsync();
    setSelectedWord(index);
    audio.playUrl(wordAudioUrl(surahNumber, verse.number, index + 1), true);
  };

  const playFullVerse = () => {
    Haptics.selectionAsync();
    setSelectedWord(null);
    audio.playUrl(verseAudioUrl(surahNumber, verse.number), false);
  };

  const listenAndRepeat = (index: number) => {
    Haptics.selectionAsync();
    setSelectedWord(index);
    audio.playUrl(wordAudioUrl(surahNumber, verse.number, index + 1), false);
  };

  const markPracticed = () => {
    Haptics.selectionAsync();
    toggleVersePracticed(verseKey);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <SmallLabel tone="primary">LEARN TO RECITE · VERSE {verse.number}</SmallLabel>
        <Pressable onPress={() => { audio.stop(); onClose(); }} hitSlop={8}>
          <Feather name="x" size={20} color={colors.foreground} />
        </Pressable>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Full verse controls */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>FULL VERSE</Text>
          <View style={styles.controlsRow}>
            <Pressable
              onPress={playFullVerse}
              style={({ pressed }) => [
                styles.controlButton,
                { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Feather name="play" size={14} color={colors.primaryForeground} />
              <Text style={[styles.controlText, { color: colors.primaryForeground }]}>Play verse</Text>
            </Pressable>
            <Pressable
              onPress={audio.toggleLoop}
              style={({ pressed }) => [
                styles.controlButton,
                {
                  backgroundColor: audio.player.isLooping ? colors.accent : colors.secondary,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Feather name="repeat" size={14} color={audio.player.isLooping ? colors.accentForeground : colors.secondaryForeground} />
              <Text style={[styles.controlText, { color: audio.player.isLooping ? colors.accentForeground : colors.secondaryForeground }]}>
                {audio.player.isLooping ? 'Looping' : 'Loop'}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => audio.stop()}
              style={({ pressed }) => [
                styles.controlButton,
                { backgroundColor: colors.secondary, opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Feather name="square" size={14} color={colors.secondaryForeground} />
              <Text style={[styles.controlText, { color: colors.secondaryForeground }]}>Stop</Text>
            </Pressable>
          </View>
        </View>

        {/* Word-by-word */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>WORD BY WORD · TAP TO HEAR</Text>
          <View style={styles.wordsGrid}>
            {verse.words.map((word, index) => (
              <WordTile
                key={index}
                word={word}
                index={index}
                isSelected={selectedWord === index}
                fontReady={fontReady}
                onPress={() => playWord(index)}
                onRepeat={() => listenAndRepeat(index)}
              />
            ))}
          </View>
        </View>

        {/* Tajweed legend */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>TAJWEED CUES</Text>
          {tajweedOrder.map((rule) => {
            const ts = tajweedStyles[rule];
            return (
              <View key={rule} style={styles.legendRow}>
                <View style={[styles.legendSwatch, { backgroundColor: ts.color }]} />
                <View style={styles.legendText}>
                  <Text style={[styles.legendLabel, { color: colors.foreground }]}>{ts.label}</Text>
                  <Text style={[styles.legendDesc, { color: colors.mutedForeground }]}>{ts.description}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Recording */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>RECORD YOURSELF</Text>
          <View style={styles.controlsRow}>
            {!audio.recorder.isRecording ? (
              <Pressable
                onPress={audio.startRecording}
                style={({ pressed }) => [
                  styles.controlButton,
                  { backgroundColor: colors.destructive, opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <Feather name="mic" size={14} color={colors.destructiveForeground} />
                <Text style={[styles.controlText, { color: colors.destructiveForeground }]}>Record</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={audio.stopRecording}
                style={({ pressed }) => [
                  styles.controlButton,
                  { backgroundColor: colors.destructive, opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <Feather name="stop-circle" size={14} color={colors.destructiveForeground} />
                <Text style={[styles.controlText, { color: colors.destructiveForeground }]}>Stop</Text>
              </Pressable>
            )}
            {audio.recorder.hasRecording && !audio.recorder.isPlayingBack && (
              <Pressable
                onPress={audio.playRecording}
                style={({ pressed }) => [
                  styles.controlButton,
                  { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <Feather name="play" size={14} color={colors.primaryForeground} />
                <Text style={[styles.controlText, { color: colors.primaryForeground }]}>Play mine</Text>
              </Pressable>
            )}
            {audio.recorder.isPlayingBack && (
              <Pressable
                onPress={audio.stopPlayback}
                style={({ pressed }) => [
                  styles.controlButton,
                  { backgroundColor: colors.secondary, opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <Feather name="pause" size={14} color={colors.secondaryForeground} />
                <Text style={[styles.controlText, { color: colors.secondaryForeground }]}>Stop</Text>
              </Pressable>
            )}
            {audio.recorder.hasRecording && (
              <Pressable
                onPress={audio.clearRecording}
                style={({ pressed }) => [
                  styles.controlButton,
                  { backgroundColor: colors.secondary, opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <Feather name="trash-2" size={14} color={colors.secondaryForeground} />
                <Text style={[styles.controlText, { color: colors.secondaryForeground }]}>Clear</Text>
              </Pressable>
            )}
          </View>
          {audio.recorder.hasRecording && (
            <Text style={[styles.recordingHint, { color: colors.mutedForeground }]}>
              Play the reference, then play your recording to compare side by side.
            </Text>
          )}
        </View>

        {/* Progress marker */}
        <View style={[styles.progressSection, { borderColor: colors.border }]}>
          <Feather name={practiced ? 'check-circle' : 'circle'} size={18} color={practiced ? colors.success : colors.mutedForeground} />
          <Text style={[styles.progressText, { color: practiced ? colors.success : colors.mutedForeground }]}>
            {practiced ? 'Practiced' : 'Not yet practiced'}
          </Text>
          <Pressable
            onPress={markPracticed}
            style={({ pressed }) => [
              styles.markButton,
              { backgroundColor: practiced ? colors.secondary : colors.accent, opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Text style={[styles.markText, { color: practiced ? colors.secondaryForeground : colors.accentForeground }]}>
              {practiced ? 'Unmark' : 'Mark as practiced'}
            </Text>
          </Pressable>
        </View>

        {audio.player.error ? (
          <Text style={[styles.errorText, { color: colors.destructive }]}>{audio.player.error}</Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

function WordTile({
  word,
  index,
  isSelected,
  fontReady,
  onPress,
  onRepeat,
}: {
  word: QuranWord;
  index: number;
  isSelected: boolean;
  fontReady: boolean;
  onPress: () => void;
  onRepeat: () => void;
}) {
  const colors = useColors();
  const hasTajweed = word.tajweed && word.tajweed.length > 0;
  const primaryRule: TajweedRule | undefined = hasTajweed ? word.tajweed![0] : undefined;
  const tajweedColor = primaryRule ? tajweedStyles[primaryRule].color : colors.border;

  return (
    <View style={[styles.wordTile, { borderColor: isSelected ? colors.primary : tajweedColor, backgroundColor: isSelected ? colors.secondary : colors.background }]}>
      <Pressable onPress={onPress} style={styles.wordPressable}>
        <Text style={[styles.wordArabic, { color: colors.foreground }, { fontFamily: fontReady ? arabicFont : 'Inter_500Medium' }]}>
          {word.arabic}
        </Text>
        <Text style={[styles.wordTranslit, { color: colors.accentForeground }]}>{word.transliteration}</Text>
        <Text style={[styles.wordTranslation, { color: colors.mutedForeground }]}>{word.translation}</Text>
      </Pressable>
      <Pressable onPress={onRepeat} style={[styles.repeatBtn, { borderTopColor: colors.border }]} hitSlop={4}>
        <Feather name="repeat" size={11} color={colors.mutedForeground} />
        <Text style={[styles.repeatText, { color: colors.mutedForeground }]}>Listen & repeat</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderWidth: 1, borderRadius: 18, marginTop: 8, overflow: 'hidden' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1 },
  body: { paddingHorizontal: 16, paddingBottom: 16 },
  section: { paddingTop: 16, paddingBottom: 4, borderBottomWidth: 1 },
  sectionLabel: { fontSize: 10, letterSpacing: 1.2, fontFamily: 'Inter_700Bold', marginBottom: 10 },
  controlsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  controlButton: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 99, paddingHorizontal: 13, paddingVertical: 9 },
  controlText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  wordsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  wordTile: { borderWidth: 1.5, borderRadius: 14, minWidth: 100, overflow: 'hidden' },
  wordPressable: { alignItems: 'center', paddingVertical: 14, paddingHorizontal: 12 },
  wordArabic: { fontSize: 26, lineHeight: 38, textAlign: 'center' },
  wordTranslit: { fontSize: 12, fontFamily: 'Inter_400Regular', fontStyle: 'italic', marginTop: 6, textAlign: 'center' },
  wordTranslation: { fontSize: 10, fontFamily: 'Inter_400Regular', marginTop: 3, textAlign: 'center' },
  repeatBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 7, borderTopWidth: 1 },
  repeatText: { fontSize: 9, fontFamily: 'Inter_500Medium' },
  legendRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  legendSwatch: { width: 14, height: 14, borderRadius: 4, marginTop: 2 },
  legendText: { flex: 1 },
  legendLabel: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  legendDesc: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_400Regular', marginTop: 2 },
  recordingHint: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_400Regular', marginTop: 10 },
  progressSection: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 16, paddingBottom: 4, borderTopWidth: 1, marginTop: 4 },
  progressText: { fontSize: 12, fontFamily: 'Inter_600SemiBold', flex: 1 },
  markButton: { borderRadius: 99, paddingHorizontal: 13, paddingVertical: 8 },
  markText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  errorText: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 10, textAlign: 'center' },
});
