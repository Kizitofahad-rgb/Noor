import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { libraryItems } from '@/lib/content';
import { Chip, ScreenShell, SmallLabel, SoftCard } from '@/components/NoorUI';

export default function LibraryScreen() {
  const colors = useColors();
  const [filter, setFilter] = useState<'All' | 'Hadith' | 'Tafsir'>('All');
  const filtered = filter === 'All' ? libraryItems : libraryItems.filter((item) => item.type === filter);
  return (
    <ScreenShell eyebrow="Citation-first learning" title="Library" subtitle="Plain language, careful sources.">
      <View style={styles.chips}>
        {(['All', 'Hadith', 'Tafsir'] as const).map((item) => <Chip key={item} label={item} active={filter === item} onPress={() => setFilter(item)} />)}
      </View>
      <View style={[styles.notice, { backgroundColor: colors.secondary }]}>
        <Feather name="info" size={16} color={colors.primary} />
        <Text style={[styles.noticeText, { color: colors.secondaryForeground }]}>Sources and grading stay beside the text, so context is never hidden.</Text>
      </View>
      {filtered.map((item) => (
        <SoftCard key={item.id} onPress={() => router.push(`/library/${item.id}`)} style={styles.itemCard}>
          <View style={styles.itemTop}>
            <View style={[styles.typeBadge, { backgroundColor: item.type === 'Hadith' ? colors.sand : colors.secondary }]}>
              <Text style={[styles.typeText, { color: item.type === 'Hadith' ? colors.accentForeground : colors.primary }]}>{item.type.toUpperCase()}</Text>
            </View>
            <Feather name="arrow-up-right" size={17} color={colors.mutedForeground} />
          </View>
          <Text style={[styles.itemTitle, { color: colors.foreground }]}>{item.title}</Text>
          <Text style={[styles.excerpt, { color: colors.foreground }]}>{item.excerpt}</Text>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.sourceRow}>
            <Feather name="bookmark" size={13} color={colors.primary} />
            <Text style={[styles.source, { color: colors.primary }]}>{item.source}</Text>
            {item.grading ? <Text style={[styles.grading, { color: colors.success }]}>{item.grading}</Text> : null}
          </View>
        </SoftCard>
      ))}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', marginBottom: 14 },
  notice: { borderRadius: 14, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 18 },
  noticeText: { flex: 1, fontSize: 12, lineHeight: 17, fontFamily: 'Inter_500Medium' },
  itemCard: { padding: 18 },
  itemTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  typeBadge: { borderRadius: 99, paddingHorizontal: 9, paddingVertical: 5 },
  typeText: { fontSize: 10, letterSpacing: 1, fontFamily: 'Inter_700Bold' },
  itemTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', marginTop: 17, letterSpacing: -0.2 },
  excerpt: { fontSize: 15, lineHeight: 23, fontFamily: 'Inter_400Regular', marginTop: 10 },
  divider: { height: 1, marginVertical: 16 },
  sourceRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  source: { flex: 1, fontSize: 11, lineHeight: 16, fontFamily: 'Inter_600SemiBold' },
  grading: { fontSize: 11, fontFamily: 'Inter_700Bold' },
});