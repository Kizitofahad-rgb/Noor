import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

export function ScreenShell({
  children,
  eyebrow,
  title,
  subtitle,
  rightAction,
}: {
  children: React.ReactNode;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 106 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerCopy}>
            {eyebrow ? <Text style={[styles.eyebrow, { color: colors.primary }]}>{eyebrow.toUpperCase()}</Text> : null}
            <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
            {subtitle ? <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{subtitle}</Text> : null}
          </View>
          {rightAction}
        </View>
        {children}
      </ScrollView>
    </View>
  );
}

export function SectionHeading({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  const colors = useColors();
  return (
    <View style={styles.sectionHeading}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{title}</Text>
      {action && onAction ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={[styles.sectionAction, { color: colors.primary }]}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function IconButton({ icon, onPress, accessibilityLabel, style }: {
  icon: React.ComponentProps<typeof Feather>['name'];
  onPress: () => void;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
}) {
  const colors = useColors();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.65 : 1 }, style]}
    >
      <Feather name={icon} size={18} color={colors.foreground} />
    </Pressable>
  );
}

export function SoftCard({ children, style, ...props }: { children: React.ReactNode; style?: StyleProp<ViewStyle> } & PressableProps) {
  const colors = useColors();
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.92 : 1 },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

export function Chip({ label, active, onPress, icon }: { label: string; active?: boolean; onPress?: () => void; icon?: React.ComponentProps<typeof Feather>['name'] }) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      style={({ pressed }) => [
        styles.chip,
        { backgroundColor: active ? colors.primary : colors.secondary, borderColor: active ? colors.primary : colors.border, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      {icon ? <Feather name={icon} size={14} color={active ? colors.primaryForeground : colors.secondaryForeground} /> : null}
      <Text style={[styles.chipText, { color: active ? colors.primaryForeground : colors.secondaryForeground }]}>{label}</Text>
    </Pressable>
  );
}

export function ProgressBar({ progress }: { progress: number }) {
  const colors = useColors();
  return (
    <View style={[styles.progressTrack, { backgroundColor: colors.muted }]}>
      <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%`, backgroundColor: colors.primary }]} />
    </View>
  );
}

export function SmallLabel({ children, tone = 'muted' }: { children: React.ReactNode; tone?: 'muted' | 'accent' | 'primary' }) {
  const colors = useColors();
  const color = tone === 'accent' ? colors.accentForeground : tone === 'primary' ? colors.primary : colors.mutedForeground;
  return <Text style={[styles.smallLabel, { color }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scrollContent: { paddingHorizontal: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  headerCopy: { flex: 1, paddingRight: 12 },
  eyebrow: { fontSize: 11, letterSpacing: 1.5, fontFamily: 'Inter_700Bold', marginBottom: 8 },
  title: { fontSize: 31, lineHeight: 37, fontFamily: 'Inter_700Bold', letterSpacing: -0.7 },
  subtitle: { marginTop: 7, fontSize: 15, lineHeight: 21, fontFamily: 'Inter_400Regular' },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', letterSpacing: -0.2 },
  sectionAction: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  card: { borderWidth: 1, borderRadius: 18, padding: 18, marginBottom: 12 },
  iconButton: { height: 42, width: 42, borderRadius: 21, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 7, borderWidth: 1, borderRadius: 99, paddingHorizontal: 13, paddingVertical: 9, marginRight: 8 },
  chipText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  progressTrack: { height: 5, borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5 },
  smallLabel: { fontSize: 11, fontFamily: 'Inter_600SemiBold', letterSpacing: 0.3 },
});