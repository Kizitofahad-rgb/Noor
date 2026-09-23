import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { moods, reflections, type MoodId } from '@/lib/content';
import { Chip, IconButton, ScreenShell, SectionHeading, SmallLabel, SoftCard } from '@/components/NoorUI';

export default function HomeScreen() {
  const colors = useColors();
  const [mood, setMood] = useState<MoodId>('anxious');
  const reflection = reflections[mood];
  const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening';

  const chooseMood = (nextMood: MoodId) => {
    Haptics.selectionAsync();
    setMood(nextMood);
  };

  return (
    <ScreenShell
      eyebrow="Wednesday · 23 September"
      title={`${greeting}, Fahad`}
      subtitle="A few quiet minutes can change the shape of a day."
      rightAction={<IconButton icon="bell" accessibilityLabel="Notifications" onPress={() => Haptics.selectionAsync()} />}
    >
      <View style={[styles.streakCard, { backgroundColor: colors.primary }]}>
        <View style={styles.streakCopy}>
          <SmallLabel tone="accent">YOUR DAILY PRACTICE</SmallLabel>
          <Text style={[styles.streakTitle, { color: colors.primaryForeground }]}>A steady heart</Text>
          <Text style={[styles.streakBody, { color: colors.secondary }]}>3 days of returning to the words that nourish you.</Text>
        </View>
        <View style={[styles.streakRing, { borderColor: colors.accent }]}>
          <Text style={[styles.streakNumber, { color: colors.primaryForeground }]}>3</Text>
          <Text style={[styles.streakDays, { color: colors.secondary }]}>days</Text>
        </View>
      </View>

      <SectionHeading title="How are you arriving today?" />
      <View style={styles.chipRow}>
        {moods.map((item) => (
          <Chip key={item.id} label={item.label} icon={item.icon} active={mood === item.id} onPress={() => chooseMood(item.id)} />
        ))}
      </View>

      <SoftCard style={[styles.reflectionCard, { backgroundColor: colors.sand }]} onPress={() => router.push('/library/hadith-intention')}>
        <View style={styles.cardTopline}>
          <View style={[styles.reflectionBadge, { backgroundColor: colors.accent }]}>
            <Feather name="sun" size={14} color={colors.accentForeground} />
            <Text style={[styles.reflectionBadgeText, { color: colors.accentForeground }]}>TODAY'S REFLECTION</Text>
          </View>
          <Feather name="arrow-up-right" size={18} color={colors.accentForeground} />
        </View>
        <Text style={[styles.arabic, { color: colors.foreground }]}>{reflection.arabic}</Text>
        <Text style={[styles.translation, { color: colors.foreground }]}>{reflection.translation}</Text>
        <Text style={[styles.reference, { color: colors.primary }]}>{reflection.reference}</Text>
        <View style={[styles.noteRule, { backgroundColor: colors.accent }]} />
        <Text style={[styles.note, { color: colors.accentForeground }]}>{reflection.note}</Text>
      </SoftCard>

      <SectionHeading title="Continue your journey" action="See all" onAction={() => router.push('/quran')} />
      <SoftCard onPress={() => router.push('/quran/1')} style={styles.continueCard}>
        <View style={[styles.chapterNumber, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.chapterNumberText, { color: colors.primary }]}>01</Text>
        </View>
        <View style={styles.continueCopy}>
          <Text style={[styles.continueTitle, { color: colors.foreground }]}>Al-Fatihah</Text>
          <Text style={[styles.continueMeta, { color: colors.mutedForeground }]}>The Opening · 7 verses</Text>
          <View style={styles.continueProgress}>
            <View style={{ flex: 1 }}><View style={[styles.progressTrack, { backgroundColor: colors.muted }]}><View style={[styles.progressFill, { backgroundColor: colors.primary, width: '100%' }]} /></View></View>
            <Text style={[styles.progressText, { color: colors.primary }]}>Complete</Text>
          </View>
        </View>
        <Feather name="chevron-right" size={19} color={colors.mutedForeground} />
      </SoftCard>

      <SectionHeading title="Explore Noor" />
      <View style={styles.exploreGrid}>
        <ExploreCard icon="book-open" title="Quran" detail="Read & listen" color={colors.primary} onPress={() => router.push('/quran')} />
        <ExploreCard icon="bookmark" title="Library" detail="Hadith & tafsir" color={colors.accentForeground} onPress={() => router.push('/library')} />
        <ExploreCard icon="type" title="Arabic" detail="Learn the letters" color={colors.success} onPress={() => router.push('/learn')} />
        <ExploreCard icon="play-circle" title="Reels" detail="Short reminders" color={colors.destructive} onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)} />
      </View>
    </ScreenShell>
  );
}

function ExploreCard({ icon, title, detail, color, onPress }: { icon: React.ComponentProps<typeof Feather>['name']; title: string; detail: string; color: string; onPress: () => void }) {
  const colors = useColors();
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.exploreCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.75 : 1 }]}>
      <Feather name={icon} size={19} color={color} />
      <Text style={[styles.exploreTitle, { color: colors.foreground }]}>{title}</Text>
      <Text style={[styles.exploreDetail, { color: colors.mutedForeground }]}>{detail}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  streakCard: { borderRadius: 22, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 146, overflow: 'hidden' },
  streakCopy: { flex: 1, paddingRight: 10 },
  streakTitle: { fontSize: 24, fontFamily: 'Inter_700Bold', marginTop: 10, letterSpacing: -0.5 },
  streakBody: { fontSize: 13, lineHeight: 19, fontFamily: 'Inter_400Regular', marginTop: 7, maxWidth: 210 },
  streakRing: { height: 82, width: 82, borderRadius: 41, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  streakNumber: { fontSize: 28, fontFamily: 'Inter_700Bold', lineHeight: 31 },
  streakDays: { fontSize: 11, fontFamily: 'Inter_500Medium' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 8 },
  reflectionCard: { marginTop: 5, padding: 20 },
  cardTopline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reflectionBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 99 },
  reflectionBadgeText: { fontSize: 10, fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  arabic: { fontSize: 27, lineHeight: 43, textAlign: 'right', marginTop: 23, fontFamily: 'Inter_500Medium' },
  translation: { fontSize: 18, lineHeight: 27, fontFamily: 'Inter_600SemiBold', marginTop: 18, letterSpacing: -0.2 },
  reference: { fontSize: 12, fontFamily: 'Inter_600SemiBold', marginTop: 12 },
  noteRule: { height: 1, width: 34, marginTop: 18, marginBottom: 10 },
  note: { fontSize: 13, lineHeight: 20, fontFamily: 'Inter_400Regular' },
  continueCard: { flexDirection: 'row', alignItems: 'center' },
  chapterNumber: { height: 46, width: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 13 },
  chapterNumberText: { fontSize: 13, fontFamily: 'Inter_700Bold' },
  continueCopy: { flex: 1 },
  continueTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  continueMeta: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 4 },
  continueProgress: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  progressTrack: { height: 5, borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5 },
  progressText: { fontSize: 10, fontFamily: 'Inter_600SemiBold' },
  exploreGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  exploreCard: { width: '48.5%', minHeight: 105, borderWidth: 1, borderRadius: 18, padding: 15 },
  exploreTitle: { fontSize: 15, fontFamily: 'Inter_700Bold', marginTop: 15 },
  exploreDetail: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 4 },
});
