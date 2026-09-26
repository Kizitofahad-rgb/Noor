import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useArabicFont, arabicFont, arabicBoldFont } from '@/hooks/useArabicFont';
import { useNoor } from '@/context/NoorContext';
import { surahs, verses } from '@/lib/content';
import { IconButton, SmallLabel } from '@/components/NoorUI';
import { RecitationMode } from '@/components/RecitationMode';
import type { QuranVerse } from '@/lib/content';

export default function SurahDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const fontReady = useArabicFont();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [recitingVerse, setRecitingVerse] = useState<number | null>(null);
  const { markSurahRead } = useNoor();
  const surah = surahs.find((item) => item.id === id) ?? surahs[0];
  const surahNum = parseInt(surah.number, 10);
  const surahVerses = verses.filter((v) => v.surahId === surah.id);

  React.useEffect(() => {
    markSurahRead(surah.id);
  }, [surah.id, markSurahRead]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 35 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Topbar */}
        <View style={styles.topbar}>
          <IconButton icon="arrow-left" accessibilityLabel="Go back" onPress={() => router.back()} />
          <View style={styles.topbarTitle}>
            <SmallLabel tone="primary">SURAH {surah.number}</SmallLabel>
            <Text style={[styles.topbarName, { color: colors.foreground }]}>{surah.name}</Text>
          </View>
          <IconButton icon="bookmark" accessibilityLabel="Save surah" onPress={() => Haptics.selectionAsync()} />
        </View>

        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <Text style={[styles.heroArabic, { color: colors.primaryForeground }, { fontFamily: fontReady ? arabicBoldFont : 'Inter_700Bold' }]}>
            {surah.arabic}
          </Text>
          <Text style={[styles.heroName, { color: colors.primaryForeground }]}>{surah.name}</Text>
          <Text style={[styles.heroMeta, { color: colors.secondary }]}>
            {surah.meaning} · {surah.revelation} · {surah.verses} verses
          </Text>
        </View>

        {/* Before You Begin */}
        <View style={[styles.introBlock, { backgroundColor: colors.card, borderColor: colors.accent }]}>
          <View style={styles.introHeader}>
            <Feather name="book-open" size={16} color={colors.accent} />
            <Text style={[styles.introTitle, { color: colors.accentForeground }]}>Before You Begin</Text>
          </View>
          <Text style={[styles.introBody, { color: colors.foreground }]}>
            <Text style={styles.introBold}>Surah name: </Text>
            {surah.intro.nameMeaning}{'\n'}
            <Text style={styles.introBold}>Verses: </Text>
            {surah.intro.verseCount}{'\n\n'}
            {surah.intro.note}
          </Text>
        </View>

        {/* Verses */}
        {surahVerses.map((verse) => (
          <VerseCard
            key={verse.number}
            verse={verse}
            totalVerses={surahVerses.length}
            surahNumber={surahNum}
            fontReady={fontReady}
            isReciting={recitingVerse === verse.number}
            onToggleRecite={() => {
              Haptics.selectionAsync();
              setRecitingVerse(recitingVerse === verse.number ? null : verse.number);
            }}
          />
        ))}

        {/* Citation */}
        <Text style={[styles.citation, { color: colors.mutedForeground }]}>
          Translation: Saheeh International · Study notes are concise prompts for reflection, not a replacement for qualified tafsir.
        </Text>
      </ScrollView>
    </View>
  );
}

function VerseCard({
  verse,
  totalVerses,
  surahNumber,
  fontReady,
  isReciting,
  onToggleRecite,
}: {
  verse: QuranVerse;
  totalVerses: number;
  surahNumber: number;
  fontReady: boolean;
  isReciting: boolean;
  onToggleRecite: () => void;
}) {
  const colors = useColors();

  return (
    <View style={[styles.verse, { borderColor: colors.border, backgroundColor: colors.card }]}>
      {/* Eyebrow */}
      <View style={styles.verseTop}>
        <View style={[styles.verseNumber, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.verseNumberText, { color: colors.primary }]}>{verse.number}</Text>
        </View>
        <Text style={[styles.verseEyebrow, { color: colors.mutedForeground }]}>
          VERSE {verse.number} OF {totalVerses}
        </Text>
        <Pressable
          onPress={onToggleRecite}
          style={({ pressed }) => [
            styles.reciteToggle,
            { backgroundColor: isReciting ? colors.accent : colors.secondary, opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Feather name={isReciting ? 'x' : 'mic'} size={13} color={isReciting ? colors.accentForeground : colors.secondaryForeground} />
          <Text style={[styles.reciteToggleText, { color: isReciting ? colors.accentForeground : colors.secondaryForeground }]}>
            {isReciting ? 'Close' : 'Learn to Recite'}
          </Text>
        </Pressable>
      </View>

      {/* 1. Arabic */}
      <Text
        style={[styles.verseArabic, { color: colors.foreground }, { fontFamily: fontReady ? arabicFont : 'Inter_500Medium' }]}
      >
        {verse.arabic}
      </Text>

      {/* 2. Transliteration */}
      <Text style={[styles.verseTranslit, { color: colors.accentForeground }]}>
        {verse.transliteration}
      </Text>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.accent }]} />

      {/* 3. Simple Meaning */}
      <SmallLabel tone="primary">SIMPLE MEANING</SmallLabel>
      <Text style={[styles.verseSimple, { color: colors.foreground }]}>{verse.simpleMeaning}</Text>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.accent }]} />

      {/* 4. Understanding the Verse */}
      <SmallLabel tone="primary">UNDERSTANDING THE VERSE</SmallLabel>
      {verse.understanding.map((para, i) => (
        <Text key={i} style={[styles.understandingText, { color: colors.foreground }]}>
          {para}
        </Text>
      ))}

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.accent }]} />

      {/* 5. Reflection */}
      <SmallLabel tone="primary">REFLECTION</SmallLabel>
      <View style={styles.reflectionList}>
        {verse.reflectionQuestions.map((q, i) => (
          <View key={i} style={styles.reflectionItem}>
            <Text style={[styles.reflectionBullet, { color: colors.accent }]}>—</Text>
            <Text style={[styles.reflectionQuestion, { color: colors.foreground }]}>{q}</Text>
          </View>
        ))}
      </View>

      {/* 6. Personal Du'a */}
      <View style={[styles.duaPanel, { borderColor: colors.accent, backgroundColor: colors.secondary }]}>
        <SmallLabel tone="accent">PERSONAL DU'A</SmallLabel>
        <Text style={[styles.duaText, { color: colors.secondaryForeground }]}>{verse.dua}</Text>
      </View>

      {/* Recitation mode */}
      {isReciting && (
        <RecitationMode verse={verse} surahNumber={surahNumber} onClose={onToggleRecite} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topbar: { paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  topbarTitle: { alignItems: 'center' },
  topbarName: { fontSize: 16, fontFamily: 'Inter_700Bold', marginTop: 2 },
  hero: { marginHorizontal: 20, borderRadius: 22, padding: 22, alignItems: 'center' },
  heroArabic: { fontSize: 35, lineHeight: 58 },
  heroName: { fontSize: 23, fontFamily: 'Inter_700Bold', marginTop: 6 },
  heroMeta: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 6 },
  introBlock: { marginHorizontal: 20, borderWidth: 1.5, borderRadius: 16, padding: 16, marginTop: 14 },
  introHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  introTitle: { fontSize: 13, fontFamily: 'Inter_700Bold', letterSpacing: 0.3 },
  introBody: { fontSize: 13, lineHeight: 20, fontFamily: 'Inter_400Regular' },
  introBold: { fontFamily: 'Inter_700Bold' },
  verse: { marginHorizontal: 20, borderWidth: 1, borderRadius: 18, padding: 17, marginBottom: 14 },
  verseTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  verseNumber: { height: 26, width: 26, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  verseNumberText: { fontSize: 11, fontFamily: 'Inter_700Bold' },
  verseEyebrow: { fontSize: 9, letterSpacing: 1, fontFamily: 'Inter_600SemiBold', flex: 1 },
  reciteToggle: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 99, paddingHorizontal: 10, paddingVertical: 6 },
  reciteToggleText: { fontSize: 10, fontFamily: 'Inter_600SemiBold' },
  verseArabic: { textAlign: 'center', fontSize: 28, lineHeight: 46, marginTop: 17 },
  verseTranslit: { textAlign: 'center', fontSize: 14, fontFamily: 'Inter_400Regular', fontStyle: 'italic', marginTop: 8, lineHeight: 20 },
  divider: { height: 1, marginVertical: 14, opacity: 0.4 },
  verseSimple: { fontSize: 14, lineHeight: 22, fontFamily: 'Inter_400Regular', marginTop: 6 },
  understandingText: { fontSize: 13, lineHeight: 20, fontFamily: 'Inter_400Regular', marginTop: 8 },
  reflectionList: { marginTop: 8 },
  reflectionItem: { flexDirection: 'row', gap: 10, marginBottom: 8, paddingLeft: 4 },
  reflectionBullet: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  reflectionQuestion: { fontSize: 13, lineHeight: 20, fontFamily: 'Inter_400Regular', flex: 1, fontStyle: 'italic' },
  duaPanel: { borderWidth: 1.5, borderRadius: 14, padding: 14, marginTop: 16 },
  duaText: { fontSize: 13, lineHeight: 20, fontFamily: 'Inter_400Regular', marginTop: 8, fontStyle: 'italic' },
  citation: { marginHorizontal: 24, marginTop: 8, fontSize: 11, lineHeight: 17, textAlign: 'center', fontFamily: 'Inter_400Regular' },
});
