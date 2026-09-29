import React, { useState } from 'react';
import {
  User,
  Mail,
  Calendar,
  BookOpen,
  Video,
  LogOut,
  Edit2,
  Check,
  X,
  Sparkles,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  Trash2,
  Share2,
  Download,
  Palette,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNoor, type AppThemeId } from '@/context/NoorContext';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { OrnamentedCard, BorderedSubPanel, CornerFlourishes } from '../Ornamentation';
import { surahs, type Surah } from '@/lib/content';

interface ProfileViewProps {
  onOpenSurah?: (surah: Surah) => void;
  onNavigate?: (tab: any) => void;
  onOpenShareModal?: () => void;
}

export function ProfileView({ onOpenSurah, onNavigate, onOpenShareModal }: ProfileViewProps) {
  const { appTheme, setAppTheme } = useNoor();
  const {
    user,
    logout,
    updateProfile,
    userProgress,
    userReels,
    openAuthModal,
    refreshProgress,
  } = useAuth();

  const { isInstallable, isInstalled, install, isIOS } = usePWAInstall();

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);
  const [nameSaveSuccess, setNameSaveSuccess] = useState(false);

  // If user is not logged in, show sacred invitation card
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 pb-14 text-text-primary">
        <OrnamentedCard className="p-8 sm:p-12 text-center space-y-6">
          <CornerFlourishes size={16} opacity={0.8} />

          <div className="w-16 h-16 rounded-2xl bg-bg-primary border border-accent-gold/50 flex items-center justify-center text-accent-gold mx-auto shadow-md">
            <User className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Spiritual Account</span>
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-text-primary tracking-tight">
              Sign In to Your Sacred Profile
            </h1>

            <p className="text-base text-text-secondary max-w-lg mx-auto leading-relaxed">
              Create an account or sign in to track your personalized recitation journey, view practiced verses, and monitor your submitted faith reflections.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent-gold hover:bg-accent-gold-dim text-bg-primary font-bold text-sm uppercase tracking-wider transition-all shadow-md"
            >
              Sign In to Account
            </button>
            <button
              onClick={() => openAuthModal('signup')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-bg-card hover:bg-bg-card/80 border border-accent-gold/50 text-accent-gold font-bold text-sm uppercase tracking-wider transition-all"
            >
              Create Free Account
            </button>
          </div>
        </OrnamentedCard>
      </div>
    );
  }

  const handleStartEdit = () => {
    setEditedName(user.displayName);
    setIsEditingName(true);
    setNameSaveSuccess(false);
  };

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedName.trim() || editedName.trim() === user.displayName) {
      setIsEditingName(false);
      return;
    }

    setIsSavingName(true);
    const success = await updateProfile(editedName.trim());
    setIsSavingName(false);
    if (success) {
      setIsEditingName(false);
      setNameSaveSuccess(true);
      setTimeout(() => setNameSaveSuccess(false), 3000);
    }
  };

  const formattedJoinDate = (() => {
    try {
      return new Date(user.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'Recently';
    }
  })();

  const userInitials = user.displayName
    ? user.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'N';

  // Helper to open Surah by ID
  const handleOpenSurahById = (surahId?: string | null) => {
    if (!surahId || !onOpenSurah) return;
    const num = parseInt(surahId, 10);
    const found = surahs.find((s) => s.number === num || s.id === surahId);
    if (found) {
      onOpenSurah(found);
    }
  };

  // Helper to delete progress entry
  const handleDeleteProgress = async (id: string) => {
    try {
      const res = await fetch(`/api/progress/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await refreshProgress();
      }
    } catch (e) {
      console.error('Failed to remove progress:', e);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-14 text-text-primary">
      {/* Profile Header Card */}
      <OrnamentedCard className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Ornate Avatar Disc */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-bg-primary border-2 border-accent-gold flex items-center justify-center font-bold text-accent-gold text-2xl sm:text-3xl shadow-md shrink-0">
              {userInitials}
            </div>

            <div className="space-y-1">
              {!isEditingName ? (
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-bold font-serif text-text-primary tracking-tight">
                    {user.displayName}
                  </h1>
                  <button
                    onClick={handleStartEdit}
                    title="Edit display name"
                    className="p-1.5 text-text-muted hover:text-accent-gold rounded-lg hover:bg-bg-primary/50 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSaveName} className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="bg-bg-primary border border-accent-gold rounded-xl px-3 py-1.5 text-base text-text-primary focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={isSavingName}
                    className="p-2 bg-accent-gold text-bg-primary rounded-xl hover:bg-accent-gold-dim transition-colors"
                    title="Save name"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    className="p-2 bg-bg-primary text-text-muted hover:text-text-primary rounded-xl border border-accent-gold/30 transition-colors"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              )}

              {nameSaveSuccess && (
                <span className="text-xs text-accent-gold font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Display name updated!
                </span>
              )}

              <div className="flex items-center gap-4 text-xs sm:text-sm text-text-secondary flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-accent-gold" />
                  {user.email}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                  Member since {formattedJoinDate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {onOpenShareModal && (
              <button
                onClick={onOpenShareModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-accent-gold hover:bg-accent-gold-dim text-bg-primary text-xs sm:text-sm font-bold transition-all uppercase tracking-wider shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Noor</span>
              </button>
            )}

            {!isInstalled && isInstallable && (
              <button
                onClick={install}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-bg-primary hover:bg-bg-primary/80 border border-accent-gold/45 text-accent-gold text-xs sm:text-sm font-semibold transition-all uppercase tracking-wider"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install App</span>
              </button>
            )}

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg-primary hover:bg-rose-950/40 text-text-secondary hover:text-rose-300 border border-accent-gold/35 hover:border-rose-600/50 text-xs sm:text-sm font-semibold transition-colors uppercase tracking-wider"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </OrnamentedCard>

      {/* Global Sanctuary Appearance & Theme Card */}
      <OrnamentedCard className="p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-accent-gold/25">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30 mb-1">
              <Palette className="w-3.5 h-3.5" />
              <span>Sanctuary Visual Atmosphere</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-text-primary">
              Global App Color Theme
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
              Choose whether colors dynamically change per section, or lock your favorite sanctuary palette across the entire app.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1">
          {[
            { id: 'dynamic' as const, label: 'Dynamic Aura', sub: 'Adaptive', color: '#E5C365' },
            { id: 'emerald' as const, label: 'Sacred Emerald', sub: 'Forest Green', color: '#10B981' },
            { id: 'parchment' as const, label: 'Mushaf Parchment', sub: 'Ivory & Ink', color: '#9E6B15' },
            { id: 'obsidian' as const, label: 'Night Obsidian', sub: 'OLED Black', color: '#F59E0B' },
            { id: 'ochre' as const, label: 'Desert Ochre', sub: 'Terracotta', color: '#E08736' },
            { id: 'sapphire' as const, label: 'Royal Sapphire', sub: 'Midnight Navy', color: '#38BDF8' },
            { id: 'jade' as const, label: 'Persian Jade', sub: 'Mint Teal', color: '#2DD4BF' },
            { id: 'amethyst' as const, label: 'Velvet Amethyst', sub: 'Deep Violet', color: '#C084FC' },
            { id: 'rosewood' as const, label: 'Rosewood Gold', sub: 'Burgundy', color: '#FB7185' },
            { id: 'gold' as const, label: 'Imperial Gold', sub: 'Burnished Gold', color: '#EAB308' },
          ].map((theme) => {
            const isSelected = appTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setAppTheme(theme.id)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'border-accent-gold bg-accent-gold/20 shadow-xs ring-1 ring-accent-gold'
                    : 'border-accent-gold/30 bg-bg-primary/60 hover:border-accent-gold/60 hover:bg-bg-primary'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-xs"
                    style={{ backgroundColor: theme.color }}
                  />
                  {isSelected && <Check className="w-3.5 h-3.5 text-accent-gold" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-text-primary leading-tight">
                    {theme.label}
                  </div>
                  <div className="text-[10px] text-text-muted mt-0.5">
                    {theme.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </OrnamentedCard>

      {/* Recitation Progress Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Recitation Progress</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-text-primary">
              Practiced Surahs & Verses ({userProgress.length})
            </h2>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('quran')}
              className="text-xs sm:text-sm text-accent-gold font-semibold hover:underline uppercase tracking-wider"
            >
              Explore Quran &rarr;
            </button>
          )}
        </div>

        {userProgress.length === 0 ? (
          <BorderedSubPanel className="p-8 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-accent-gold/40 mx-auto" />
            <h3 className="text-base sm:text-lg font-bold text-text-primary font-serif">
              No Recitation Progress Recorded Yet
            </h3>
            <p className="text-sm text-text-secondary max-w-md mx-auto">
              When you practice or complete verses in the Quran Hub or Surah Deep Dive, your milestones will automatically sync here to your database account.
            </p>
          </BorderedSubPanel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {userProgress.map((item) => {
              const surahNum = item.surahId ? parseInt(item.surahId, 10) : null;
              const surahObj = surahNum ? surahs.find((s) => s.number === surahNum) : null;

              return (
                <OrnamentedCard key={item.id} className="p-4 sm:p-5 flex items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-md bg-accent-gold/20 text-accent-gold border border-accent-gold/40 font-semibold uppercase tracking-wider">
                        {item.status}
                      </span>
                      {surahObj && (
                        <span className="font-arabic text-accent-gold text-lg truncate">
                          {surahObj.arabic}
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-base sm:text-lg text-text-primary truncate font-serif">
                      {surahObj ? `${surahObj.number}. ${surahObj.name}` : `Surah ${item.surahId}`}
                      {item.verseId ? ` · Ayah ${item.verseId}` : ' · Full Chapter'}
                    </h4>

                    <div className="text-xs text-text-muted flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-accent-gold" />
                      <span>Updated {new Date(item.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {surahObj && onOpenSurah && (
                      <button
                        onClick={() => handleOpenSurahById(item.surahId)}
                        title="Review Chapter in Deep Dive"
                        className="p-2 rounded-xl bg-bg-primary hover:bg-bg-card border border-accent-gold/40 hover:border-accent-gold text-accent-gold transition-colors"
                      >
                        <Play className="w-4 h-4 fill-accent-gold" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteProgress(item.id)}
                      title="Remove record"
                      className="p-2 rounded-xl text-text-muted hover:text-accent-gold transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </OrnamentedCard>
              );
            })}
          </div>
        )}
      </div>

      {/* Submitted Reels Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30">
                <Video className="w-3.5 h-3.5" />
                <span>Faith Reminders</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-text-primary">
              Your Submitted Reels ({userReels.length})
            </h2>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('reels')}
              className="text-xs sm:text-sm text-accent-gold font-semibold hover:underline uppercase tracking-wider"
            >
              Submit New Reel &rarr;
            </button>
          )}
        </div>

        {userReels.length === 0 ? (
          <BorderedSubPanel className="p-8 text-center space-y-3">
            <Video className="w-10 h-10 text-accent-gold/40 mx-auto" />
            <h3 className="text-base sm:text-lg font-bold text-text-primary font-serif">
              No Video Reminders Submitted Yet
            </h3>
            <p className="text-sm text-text-secondary max-w-md mx-auto">
              Share heart-centered Islamic reminders or Quran recitations with the community. You can submit reminders directly from the Faith Reminders view.
            </p>
          </BorderedSubPanel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {userReels.map((reel) => {
              const isPending = reel.status === 'pending';
              const isApproved = reel.status === 'approved';

              return (
                <OrnamentedCard key={reel.id} className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-accent-gold/20">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                        isApproved
                          ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/50'
                          : isPending
                          ? 'bg-amber-950/70 text-amber-300 border border-amber-500/50'
                          : 'bg-rose-950/70 text-rose-300 border border-rose-500/50'
                      }`}
                    >
                      {isApproved && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {isPending && <Clock className="w-3.5 h-3.5" />}
                      {!isApproved && !isPending && <AlertCircle className="w-3.5 h-3.5" />}
                      <span>{reel.status}</span>
                    </span>

                    <span className="text-xs text-text-muted">
                      {new Date(reel.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-text-primary font-medium leading-relaxed italic">
                    "{reel.caption}"
                  </p>

                  <div className="pt-2 border-t border-accent-gold/15 flex items-center justify-between text-xs">
                    <a
                      href={reel.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-gold hover:underline flex items-center gap-1 font-semibold truncate max-w-[240px]"
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{reel.videoUrl}</span>
                    </a>

                    <span className="text-text-muted">
                      {isPending ? 'Pending Moderation' : 'Reviewed'}
                    </span>
                  </div>
                </OrnamentedCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
