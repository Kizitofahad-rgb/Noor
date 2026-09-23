import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useNoor } from '@/context/NoorContext';
import { surahs, verses } from '@/lib/content';
import { IconButton, SmallLabel } from '@/components/NoorUI';

export default function SurahDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [playing, setPlaying] = useState(false);
  const { markSurahRead } = useNoor();
  const surah = surahs.find((item) => item.id === id) ?? surahs[0];
  const togglePlaying = () => {
    Haptics.selectionAsync();
    setPlaying((current) => !current);
    markSurahRead(surah.id);
  };
  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 35 }} showsVerticalScrollIndicator={false}>
        <View style={styles.topbar}>
          <IconButton icon="arrow-left" accessibilityLabel="Go back" onPress={() => router.back()} />
          <View style={styles.topbarTitle}><SmallLabel tone="primary">SURAH {surah.number}</SmallLabel><Text style={[styles.topbarName, { color: colors.foreground }]}>{surah.name}</Text></View>
          <IconButton icon="bookmark" accessibilityLabel="Save surah" onPress={() => Haptics.selectionAsync()} />
        </View>
        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <Text style={[styles.heroArabic, { color: colors.primaryForeground }]}>{surah.arabic}</Text>
          <Text style={[styles.heroName, { color: colors.primaryForeground }]}>{surah.name}</Text>
          <Text style={[styles.heroMeta, { color: colors.secondary }]}>{surah.meaning} · {surah.revelation} · {surah.verses} verses</Text>
          <Pressable onPress={togglePlaying} style={({ pressed }) => [styles.listenButton, { backgroundColor: colors.accent, opacity: pressed ? 0.75 : 1 }]}>
            <Feather name={playing ? 'pause' : 'play'} size={15} color={colors.accentForeground} />
            <Text style={[styles.listenText, { color: colors.accentForeground }]}>{playing ? 'Pause recitation' : 'Listen to recitation'}</Text>
          </Pressable>
        </View>
        <View style={styles.studyHeader}><Text style={[styles.studyTitle, { color: colors.foreground }]}>Study guide</Text><Text style={[styles.studyMeta, { color: colors.mutedForeground }]}>Saheeh International</Text></View>
        {verses.map((verse) => (
          <View key={verse.number} style={[styles.verse, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <View style={styles.verseTop}><View style={[styles.verseNumber, { backgroundColor: colors.secondary }]}><Text style={[styles.verseNumberText, { color: colors.primary }]}>{verse.number}</Text></View><Feather name="more-horizontal" size={18} color={colors.mutedForeground} /></View>
            <Text style={[styles.verseArabic, { color: colors.foreground }]}>{verse.arabic}</Text>
            <Text style={[styles.verseTranslation, { color: colors.foreground }]}>{verse.translation}</Text>
            <View style={[styles.reflectionBox, { backgroundColor: colors.secondary }]}><SmallLabel tone="primary">A MOMENT TO NOTICE</SmallLabel><Text style={[styles.reflectionText, { color: colors.secondaryForeground }]}>{verse.reflection}</Text></View>
          </View>
        ))}
        <Text style={[styles.citation, { color: colors.mutedForeground }]}>Translation: Saheeh International · Study notes are concise prompts for reflection, not a replacement for qualified tafsir.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topbar: { paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  topbarTitle: { alignItems: 'center' },
  topbarName: { fontSize: 16, fontFamily: 'Inter_700Bold', marginTop: 2 },
  hero: { marginHorizontal: 20, borderRadius: 22, padding: 22, alignItems: 'center' },
  heroArabic: { fontSize: 35, lineHeight: 58, fontFamily: 'Inter_500Medium' },
  heroName: { fontSize: 23, fontFamily: 'Inter_700Bold', marginTop: 6 },
  heroMeta: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 6 },
  listenButton: { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 99, paddingHorizontal: 15, paddingVertical: 10, marginTop: 18 },
  listenText: { fontSize: 12, fontFamily: 'Inter_700Bold' },
  studyHeader: { paddingHorizontal: 20, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 26, marginBottom: 12 },
  studyTitle: { fontSize: 19, fontFamily: 'Inter_700Bold' },
  studyMeta: { fontSize: 11, fontFamily: 'Inter_500Medium' },
  verse: { marginHorizontal: 20, borderWidth: 1, borderRadius: 18, padding: 17, marginBottom: 11 },
  verseTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  verseNumber: { height: 26, width: 26, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  verseNumberText: { fontSize: 11, fontFamily: 'Inter_700Bold' },
  verseArabic: { textAlign: 'right', fontSize: 23, lineHeight: 40, fontFamily: 'Inter_500Medium', marginTop: 17 },
  verseTranslation: { fontSize: 15, lineHeight: 23, fontFamily: 'Inter_500Medium', marginTop: 14 },
  reflectionBox: { padding: 12, borderRadius: 12, marginTop: 16 },
  reflectionText: { fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular', marginTop: 6 },
  citation: { marginHorizontal: 24, marginTop: 8, fontSize: 11, lineHeight: 17, textAlign: 'center', fontFamily: 'Inter_400Regular' },
});