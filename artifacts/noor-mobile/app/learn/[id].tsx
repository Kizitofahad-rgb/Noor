import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useNoor } from '@/context/NoorContext';
import { lessons } from '@/lib/content';
import { IconButton, SmallLabel } from '@/components/NoorUI';

export default function LessonDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isLessonComplete, toggleLesson } = useNoor();
  const lesson = lessons.find((entry) => entry.id === id) ?? lessons[0];
  const complete = isLessonComplete(lesson.id);
  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 30 }}>
        <View style={styles.topbar}><IconButton icon="arrow-left" accessibilityLabel="Go back" onPress={() => router.back()} /><SmallLabel tone="primary">LESSON</SmallLabel><View style={styles.topbarSpacer} /></View>
        <View style={[styles.hero, { backgroundColor: colors.primary }]}>
          <View style={[styles.icon, { backgroundColor: colors.accent }]}><Feather name={lesson.icon} size={22} color={colors.accentForeground} /></View>
          <Text style={[styles.title, { color: colors.primaryForeground }]}>{lesson.title}</Text>
          <Text style={[styles.subtitle, { color: colors.secondary }]}>{lesson.subtitle} · {lesson.duration}</Text>
        </View>
        <View style={styles.body}>
          <SmallLabel tone="muted">TODAY'S FOCUS</SmallLabel>
          <Text style={[styles.heading, { color: colors.foreground }]}>Learn gently, notice often.</Text>
          <Text style={[styles.paragraph, { color: colors.foreground }]}>Arabic is not only a code to decode. It is a language with layers of sound, rhythm, and meaning. This lesson gives you one small piece to practice without rushing past it.</Text>
          <View style={[styles.example, { backgroundColor: colors.sand }]}>
            <Text style={[styles.exampleArabic, { color: colors.foreground }]}>رَحْمَة</Text>
            <Text style={[styles.exampleTranslit, { color: colors.primary }]}>rahmah</Text>
            <Text style={[styles.exampleMeaning, { color: colors.accentForeground }]}>Mercy that moves toward someone with care.</Text>
          </View>
          <Text style={[styles.paragraph, { color: colors.foreground }]}>Say the word slowly. Notice how the sound opens. Then return to a verse where you have heard it before.</Text>
          <Pressable onPress={() => toggleLesson(lesson.id)} style={({ pressed }) => [styles.completeButton, { backgroundColor: complete ? colors.secondary : colors.primary, opacity: pressed ? 0.75 : 1 }]}>
            <Feather name={complete ? 'check-circle' : 'circle'} size={18} color={complete ? colors.primary : colors.primaryForeground} />
            <Text style={[styles.completeText, { color: complete ? colors.primary : colors.primaryForeground }]}>{complete ? 'Lesson completed' : 'Mark lesson complete'}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topbar: { paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  topbarSpacer: { width: 42 },
  hero: { marginHorizontal: 20, borderRadius: 22, padding: 22 },
  icon: { height: 46, width: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 27, lineHeight: 33, fontFamily: 'Inter_700Bold', marginTop: 21, letterSpacing: -0.5 },
  subtitle: { fontSize: 13, fontFamily: 'Inter_400Regular', marginTop: 9 },
  body: { paddingHorizontal: 24, paddingTop: 31 },
  heading: { fontSize: 22, lineHeight: 28, fontFamily: 'Inter_700Bold', marginTop: 13 },
  paragraph: { fontSize: 16, lineHeight: 26, fontFamily: 'Inter_400Regular', marginTop: 14 },
  example: { borderRadius: 17, padding: 18, marginTop: 21 },
  exampleArabic: { fontSize: 32, fontFamily: 'Inter_500Medium' },
  exampleTranslit: { fontSize: 14, fontFamily: 'Inter_700Bold', marginTop: 5 },
  exampleMeaning: { fontSize: 13, lineHeight: 19, fontFamily: 'Inter_400Regular', marginTop: 9 },
  completeButton: { minHeight: 53, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, marginTop: 26 },
  completeText: { fontSize: 14, fontFamily: 'Inter_700Bold' },
});