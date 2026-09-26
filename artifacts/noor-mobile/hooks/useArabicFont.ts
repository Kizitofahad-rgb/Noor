import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

let fontCache: { loaded: boolean; error: Error | null } = { loaded: false, error: null };
let loadPromise: Promise<void> | null = null;

const AMIRI_URL = 'https://github.com/google/fonts/raw/main/ofl/amiri/Amiri-Regular.ttf';
const AMIRI_BOLD_URL = 'https://github.com/google/fonts/raw/main/ofl/amiri/Amiri-Bold.ttf';

async function loadArabicFonts() {
  if (fontCache.loaded || fontCache.error) return;
  if (!loadPromise) {
    loadPromise = (async () => {
      try {
        await Font.loadAsync({
          Amiri: AMIRI_URL,
          'Amiri-Bold': AMIRI_BOLD_URL,
        });
        fontCache = { loaded: true, error: null };
      } catch (e) {
        fontCache = { loaded: false, error: e as Error };
      }
    })();
  }
  await loadPromise;
}

export function useArabicFont() {
  const [ready, setReady] = useState(fontCache.loaded);
  useEffect(() => {
    if (fontCache.loaded) return;
    let mounted = true;
    loadArabicFonts().then(() => {
      if (mounted) setReady(fontCache.loaded);
    });
    return () => { mounted = false; };
  }, []);
  return ready;
}

export const arabicFont = 'Amiri';
export const arabicBoldFont = 'Amiri-Bold';
