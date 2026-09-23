import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { glossary, lessons } from '@/lib/content';
import { useNoor } from '@/context/NoorContext';
import { ProgressBar, ScreenShell, SectionHeading, SoftCard } from '@/components/NoorUI';

export default function LearnScreen() {
  const colors = useColors();
  const { completedLessons, isLessonComplete } = useNoor();
  const overall = Math.round(lessons.reduce((sum, lesson) => sum + (isLessonComplete(lesson.id) ? 100 : lesson.progress), 0) / lessons.length);
  return (
    <ScreenShell eyebrow="A small, steady track" title="Learn Arabic" subtitle="Read the Quran with more familiarity and care.">
      <View style={[styles.progressCard, { backgroundColor: colors.sand }]}>
        <View style={styles.progressHeading}>
          <View>
            <Text style={[styles.progressTitle, { color: colors.foreground }]}>Your learning path</Text>
            <Text style={[styles.progressMeta, { color: colors.accentForeground }]}>{completedLessons.length} of {lessons.length} lessons completed</Text>
          </View>
          <Text style={[styles.progressPercent, { color: colors.primary }]}>{overall}%</Text>
        </View>
        <ProgressBar progress={overall} />
        <Text style={[styles.progressNote, { color: colors.accentForeground }]}>No rush. Understanding grows through repetition.</Text>
      </View>

      <SectionHeading title="Lessons" />
      {lessons.map((lesson) => (
        <SoftCard key={lesson.id} onPress={() => router.push(`/learn/${lesson.id}`)} style={styles.lessonCard}>
          <View style={[styles.lessonIcon, { backgroundColor: colors.secondary }]}>
            <Feather name={lesson.icon} size={18} color={colors.primary} />
          </View>
          <View style={styles.lessonCopy}>
            <Text style={[styles.lessonTitle, { color: colors.foreground }]}>{lesson.title}</Text>
            <Text style={[styles.lessonSubtitle, { color: colors.mutedForeground }]}>{lesson.subtitle} · {lesson.duration}</Text>
            <ProgressBar progress={isLessonComplete(lesson.id) ? 100 : lesson.progress} />
          </View>
          <Feather name={isLessonComplete(lesson.id) ? 'check-circle' : 'chevron-right'} size={19} color={isLessonComplete(lesson.id) ? colors.success : colors.mutedForeground} />
        </SoftCard>
      ))}

      <SectionHeading title="Words to carry with you" />
      {glossary.map((word) => (
        <View key={word.transliteration} style={[styles.wordRow, { borderBottomColor: colors.border }]}>
          <View style={styles.wordArabic}>
            <Text style={[styles.arabic, { color: colors.foreground }]}>{word.arabic}</Text>
            <Text style={[styles.transliteration, { color: colors.primary }]}>{word.transliteration}</Text>
          </View>
          <Text style={[styles.meaning, { color: colors.mutedForeground }]}>{word.meaning}</Text>
        </View>
      ))}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  progressCard: { borderRadius: 21, padding: 19 },
  progressHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 17 },
  progressTitle: { fontSize: 17, fontFamily: 'Inter_700Bold' },
  progressMeta: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 5 },
  progressPercent: { fontSize: 28, fontFamily: 'Inter_700Bold' },
  progressNote: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 13 },
  lessonCard: { flexDirection: 'row', alignItems: 'center', padding: 14, marginBottom: 9 },
  lessonIcon: { height: 43, width: 43, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  lessonCopy: { flex: 1, paddingRight: 10 },
  lessonTitle: { fontSize: 14, fontFamily: 'Inter_700Bold' },
  lessonSubtitle: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 5, marginBottom: 10 },
  wordRow: { flexDirection: 'row', paddingVertical: 14, borderBottomWidth: 1, alignItems: 'center' },
  wordArabic: { width: 116 },
  arabic: { fontSize: 21, fontFamily: 'Inter_500Medium' },
  transliteration: { fontSize: 12, fontFamily: 'Inter_600SemiBold', marginTop: 4 },
  meaning: { flex: 1, fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular' },
});