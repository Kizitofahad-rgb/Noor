import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { surahs } from '@/lib/content';
import { ScreenShell, SmallLabel, SoftCard } from '@/components/NoorUI';

export default function QuranScreen() {
  const colors = useColors();
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => surahs.filter((surah) => `${surah.name} ${surah.meaning}`.toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <ScreenShell eyebrow="The central practice" title="Quran" subtitle="Read slowly. Return often.">
      <View style={[styles.search, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Feather name="search" size={17} color={colors.mutedForeground} />
        <TextInput value={search} onChangeText={setSearch} placeholder="Search surahs" placeholderTextColor={colors.mutedForeground} style={[styles.searchInput, { color: colors.foreground }]} />
        {search ? <Pressable onPress={() => setSearch('')}><Feather name="x-circle" size={16} color={colors.mutedForeground} /></Pressable> : null}
      </View>

      <View style={[styles.hero, { backgroundColor: colors.primary }]}>
        <View style={styles.heroCopy}>
          <SmallLabel tone="accent">YOUR READING PLAN</SmallLabel>
          <Text style={[styles.heroTitle, { color: colors.primaryForeground }]}>One page, fully present.</Text>
          <Text style={[styles.heroBody, { color: colors.secondary }]}>Keep a small, meaningful rhythm. You can always begin again.</Text>
        </View>
        <Feather name="book-open" size={38} color={colors.accent} />
      </View>

      <Text style={[styles.listEyebrow, { color: colors.mutedForeground }]}>SURAH INDEX · 114 CHAPTERS</Text>
      {filtered.map((surah) => (
        <SoftCard key={surah.id} style={styles.surahCard} onPress={() => router.push(`/quran/${surah.id}`)}>
          <View style={[styles.number, { backgroundColor: colors.secondary }]}>
            <Text style={[styles.numberText, { color: colors.primary }]}>{surah.number}</Text>
          </View>
          <View style={styles.surahCopy}>
            <View style={styles.surahTitleRow}>
              <Text style={[styles.surahName, { color: colors.foreground }]}>{surah.name}</Text>
              <Text style={[styles.arabic, { color: colors.foreground }]}>{surah.arabic}</Text>
            </View>
            <Text style={[styles.surahMeta, { color: colors.mutedForeground }]}>{surah.meaning} · {surah.verses} verses · {surah.revelation}</Text>
            <View style={styles.progressRow}>
              <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${surah.progress}%`, backgroundColor: colors.primary }]} /></View>
              <Text style={[styles.progressText, { color: colors.primary }]}>{surah.progress > 0 ? `${surah.progress}%` : surah.time}</Text>
            </View>
          </View>
          <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
        </SoftCard>
      ))}
      {filtered.length === 0 ? <View style={styles.empty}><Feather name="search" size={22} color={colors.mutedForeground} /><Text style={[styles.emptyText, { color: colors.mutedForeground }]}>No surahs match that search.</Text></View> : null}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  search: { borderWidth: 1, borderRadius: 15, minHeight: 49, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, gap: 10, marginBottom: 14 },
  searchInput: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular' },
  hero: { borderRadius: 21, padding: 19, minHeight: 136, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroCopy: { flex: 1, paddingRight: 15 },
  heroTitle: { fontSize: 22, fontFamily: 'Inter_700Bold', marginTop: 11, letterSpacing: -0.4 },
  heroBody: { fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular', marginTop: 8, maxWidth: 245 },
  listEyebrow: { fontSize: 10, letterSpacing: 1.2, fontFamily: 'Inter_700Bold', marginTop: 26, marginBottom: 11 },
  surahCard: { flexDirection: 'row', alignItems: 'center', padding: 14, marginBottom: 9 },
  number: { height: 42, width: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  numberText: { fontSize: 12, fontFamily: 'Inter_700Bold' },
  surahCopy: { flex: 1 },
  surahTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  surahName: { fontSize: 15, fontFamily: 'Inter_700Bold' },
  arabic: { fontSize: 18, fontFamily: 'Inter_500Medium' },
  surahMeta: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 4 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  progressTrack: { flex: 1, height: 4, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  progressText: { fontSize: 10, fontFamily: 'Inter_600SemiBold', minWidth: 34, textAlign: 'right' },
  empty: { alignItems: 'center', paddingTop: 30, gap: 10 },
  emptyText: { fontSize: 13, fontFamily: 'Inter_400Regular' },
});