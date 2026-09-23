import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useNoor } from '@/context/NoorContext';
import { libraryItems } from '@/lib/content';
import { IconButton, SmallLabel } from '@/components/NoorUI';

export default function LibraryDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isSaved, toggleSaved } = useNoor();
  const item = libraryItems.find((entry) => entry.id === id) ?? libraryItems[0];
  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 30 }}>
        <View style={styles.topbar}>
          <IconButton icon="arrow-left" accessibilityLabel="Go back" onPress={() => router.back()} />
          <SmallLabel tone="primary">{item.type.toUpperCase()}</SmallLabel>
          <IconButton icon={isSaved(item.id) ? 'bookmark' : 'bookmark'} accessibilityLabel={isSaved(item.id) ? 'Remove bookmark' : 'Save item'} onPress={() => toggleSaved(item.id)} />
        </View>
        <View style={[styles.header, { backgroundColor: item.type === 'Hadith' ? colors.sand : colors.secondary }]}>
          <View style={styles.badgeRow}><Feather name={item.type === 'Hadith' ? 'message-circle' : 'book-open'} size={16} color={item.type === 'Hadith' ? colors.accentForeground : colors.primary} /><Text style={[styles.badgeText, { color: item.type === 'Hadith' ? colors.accentForeground : colors.primary }]}>{item.type}</Text></View>
          <Text style={[styles.title, { color: colors.foreground }]}>{item.title}</Text>
          <Text style={[styles.source, { color: colors.primary }]}>{item.source}</Text>
          {item.grading ? <View style={[styles.grading, { backgroundColor: colors.card }]}><Feather name="check-circle" size={14} color={colors.success} /><Text style={[styles.gradingText, { color: colors.success }]}>Grading: {item.grading}</Text></View> : null}
        </View>
        <View style={styles.body}>
          <SmallLabel tone="muted">THE TEXT</SmallLabel>
          <Text style={[styles.excerpt, { color: colors.foreground }]}>{item.excerpt}</Text>
          <View style={[styles.rule, { backgroundColor: colors.border }]} />
          <SmallLabel tone="muted">IN PLAIN LANGUAGE</SmallLabel>
          <Text style={[styles.explanation, { color: colors.foreground }]}>{item.explanation}</Text>
          <View style={[styles.citation, { borderColor: colors.border }]}>
            <Feather name="bookmark" size={15} color={colors.primary} />
            <Text style={[styles.citationText, { color: colors.mutedForeground }]}>Noor keeps the source visible so reflection can remain connected to scholarship.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topbar: { paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  header: { marginHorizontal: 20, borderRadius: 22, padding: 21 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  badgeText: { fontSize: 12, fontFamily: 'Inter_700Bold', letterSpacing: 0.4 },
  title: { fontSize: 27, lineHeight: 33, fontFamily: 'Inter_700Bold', marginTop: 20, letterSpacing: -0.5 },
  source: { fontSize: 12, lineHeight: 18, fontFamily: 'Inter_600SemiBold', marginTop: 12 },
  grading: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 6, borderRadius: 99, paddingHorizontal: 10, paddingVertical: 7, marginTop: 15 },
  gradingText: { fontSize: 11, fontFamily: 'Inter_700Bold' },
  body: { paddingHorizontal: 24, paddingTop: 30 },
  excerpt: { fontSize: 22, lineHeight: 32, fontFamily: 'Inter_600SemiBold', marginTop: 13 },
  rule: { height: 1, marginVertical: 28 },
  explanation: { fontSize: 16, lineHeight: 26, fontFamily: 'Inter_400Regular', marginTop: 13 },
  citation: { borderWidth: 1, borderRadius: 14, padding: 13, flexDirection: 'row', gap: 10, marginTop: 30 },
  citationText: { flex: 1, fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular' },
});