import React, { useState, useRef } from 'react';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Search,
  ExternalLink,
  Quote,
  Compass,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Share2,
} from 'lucide-react';
import { prophetStories, type ProphetStory, type QuranEvidenceItem } from '@/lib/storiesData';
import { surahs, type Surah } from '@/lib/content';
import { StoryAudioPlayer } from '../StoryAudioPlayer';
import { OrnamentedCard, BorderedSubPanel, CornerFlourishes, SectionDivider } from '../Ornamentation';

interface StoriesViewProps {
  onOpenSurah?: (surah: Surah) => void;
  onNavigate?: (tab: any) => void;
  onOpenShareModal?: () => void;
}

export function StoriesView({ onOpenSurah, onNavigate, onOpenShareModal }: StoriesViewProps) {
  const [selectedStoryId, setSelectedStoryId] = useState<string>('idris');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectionId, setActiveSectionId] = useState<string | undefined>(undefined);

  const activeStory = prophetStories.find((s) => s.id === selectedStoryId) || prophetStories[0];

  // Search filter across stories
  const filteredStories = prophetStories.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.meaning.toLowerCase().includes(q) ||
      s.biblicalEquivalent.toLowerCase().includes(q) ||
      s.arabicName.includes(q)
    );
  });

  // Handler to jump to verse in Quran section
  const handleOpenCitation = (item: QuranEvidenceItem) => {
    if (!onOpenSurah) {
      if (onNavigate) onNavigate('quran');
      return;
    }

    const foundSurah = surahs.find((s) => s.number === item.surahNumber);
    if (foundSurah) {
      onOpenSurah(foundSurah);
    } else if (onNavigate) {
      onNavigate('quran');
    }
  };

  // Scroll smoothly to a specific narrative section
  const handleScrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 text-text-primary">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sacred Prophetic Chronicles</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight font-serif">
            Stories of the Prophets
          </h1>

          <p className="text-text-secondary text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Authentic historical narratives, divine Quranic citations, scholarly reflections, and synchronized audio narration detailing the lives of the Messengers of God.
          </p>
        </div>

        {onOpenShareModal && (
          <button
            onClick={onOpenShareModal}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-bg-card hover:bg-bg-primary border border-accent-gold/40 hover:border-accent-gold text-accent-gold text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors uppercase tracking-wider shadow-xs"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Story</span>
          </button>
        )}
      </div>

      {/* Story Carousel / Selector Strip */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-accent-gold/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Prophet name, title, or biblical equivalent (e.g. Idris, Noah, Abraham, Enoch)..."
              className="w-full bg-bg-card border border-accent-gold/40 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold"
            />
          </div>

          <span className="text-xs text-text-muted self-end sm:self-auto font-mono">
            {prophetStories.length} Historical Chronologies
          </span>
        </div>

        {/* Story Tab Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {filteredStories.map((story) => {
            const isSelected = story.id === activeStory.id;
            return (
              <button
                key={story.id}
                onClick={() => {
                  setSelectedStoryId(story.id);
                  setActiveSectionId(undefined);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all border relative flex flex-col justify-between overflow-hidden group ${
                  isSelected
                    ? 'bg-accent-gold/20 border-accent-gold text-accent-gold shadow-md'
                    : 'bg-bg-card hover:bg-bg-primary/90 border-accent-gold/30 hover:border-accent-gold/70 text-text-primary'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl sm:text-2xl">{story.headerVisual.iconSymbol}</span>
                    <span className="font-arabic text-accent-gold text-lg sm:text-xl font-bold">
                      {story.arabicName}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm sm:text-base leading-snug">
                    {story.name}
                  </h3>

                  <p className="text-[11px] text-text-secondary mt-0.5 line-clamp-1">
                    {story.biblicalEquivalent} · {story.meaning}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-accent-gold/20 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-accent-gold">
                  <span>{isSelected ? 'Active Story ✓' : 'Explore'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. HEADER IMAGE / VISUAL ILLUSTRATION BANNER */}
      {/* ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-accent-gold/60 shadow-2xl p-6 sm:p-10 text-text-primary bg-radial from-[#1A382B] via-[#0E231B] to-[#081711]">
        <CornerFlourishes size={24} opacity={0.8} />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold border border-accent-gold/40 text-xs font-semibold uppercase tracking-wider">
              <span>{activeStory.titleBadge}</span>
              <span>·</span>
              <span>{activeStory.eraAndLocation}</span>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-text-primary tracking-tight">
                {activeStory.name}
              </h2>
              <span className="text-accent-gold font-arabic text-3xl sm:text-5xl font-bold">
                {activeStory.arabicName}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-bg-primary/80 border border-accent-gold/40 text-accent-gold font-semibold uppercase">
                {activeStory.honorific}
              </span>
            </div>

            <p className="text-accent-gold/90 font-serif italic text-base sm:text-lg">
              "{activeStory.headerVisual.subtitle}"
            </p>

            <div className="pt-2">
              <span className="font-arabic text-2xl sm:text-3xl text-accent-gold/80 block select-text">
                {activeStory.headerVisual.calligraphySnippet}
              </span>
            </div>
          </div>

          {/* Large Decorative Emblem Icon */}
          <div className="hidden md:flex w-36 h-36 rounded-3xl bg-bg-primary/80 border-2 border-accent-gold flex-col items-center justify-center text-center p-4 shadow-xl shrink-0">
            <span className="text-5xl mb-1">{activeStory.headerVisual.iconSymbol}</span>
            <span className="text-[11px] font-bold text-accent-gold uppercase tracking-wider">
              {activeStory.biblicalEquivalent}
            </span>
            <span className="text-[9px] text-text-muted mt-0.5 truncate max-w-[120px]">
              {activeStory.meaning}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SHORT INTRO: "WHO IS [FIGURE]?" & 7. COMPACT MANUSCRIPT INFO CARD */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Intro Body */}
        <div className="lg:col-span-2 space-y-4">
          <OrnamentedCard className="p-6 sm:p-7 space-y-3">
            <div className="flex items-center gap-2 text-accent-gold text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Who was {activeStory.name}?</span>
            </div>

            <p className="text-base sm:text-lg text-text-primary leading-relaxed font-medium">
              {activeStory.whoIsIntro}
            </p>

            <div className="pt-3 border-t border-accent-gold/20 flex items-center justify-between text-xs text-text-secondary flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                <span>Era: {activeStory.eraAndLocation}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-accent-gold" />
                <span>Significance: Ulul-Azm / Grand Prophetic Lineage</span>
              </span>
            </div>
          </OrnamentedCard>

          {/* ========================================================================= */}
          {/* AUDIO NARRATION PLAYER COMPONENT */}
          {/* ========================================================================= */}
          <StoryAudioPlayer
            story={activeStory}
            onSectionClick={handleScrollToSection}
            activeSectionId={activeSectionId}
          />
        </div>

        {/* 7. COMPACT INFO CARD (Manuscript's Gold-Bordered Box Style) */}
        <div className="space-y-4">
          <div className="relative bg-bg-card border-2 border-accent-gold rounded-2xl p-6 shadow-xl space-y-5">
            <CornerFlourishes size={14} opacity={0.7} />

            <div className="text-center pb-3 border-b border-accent-gold/30">
              <span className="font-arabic text-3xl sm:text-4xl text-accent-gold font-bold block mb-1">
                {activeStory.arabicName}
              </span>
              <h3 className="font-serif font-bold text-xl text-text-primary">
                {activeStory.name} {activeStory.honorific}
              </h3>
              <span className="text-xs text-text-secondary mt-0.5 block italic">
                {activeStory.titleBadge}
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start justify-between gap-3 pb-2 border-b border-accent-gold/15">
                <span className="text-text-muted uppercase tracking-wider text-[11px] font-semibold">
                  Name Meaning:
                </span>
                <span className="text-text-primary font-semibold text-right">
                  {activeStory.meaning}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 pb-2 border-b border-accent-gold/15">
                <span className="text-text-muted uppercase tracking-wider text-[11px] font-semibold">
                  Biblical Equivalent:
                </span>
                <span className="text-accent-gold font-bold text-right">
                  {activeStory.biblicalEquivalent}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 pb-2 border-b border-accent-gold/15">
                <span className="text-text-muted uppercase tracking-wider text-[11px] font-semibold">
                  Era & Geography:
                </span>
                <span className="text-text-primary text-right font-medium">
                  {activeStory.eraAndLocation}
                </span>
              </div>

              {/* Predecessor Link */}
              <div className="flex items-center justify-between gap-3 pb-2 border-b border-accent-gold/15">
                <span className="text-text-muted uppercase tracking-wider text-[11px] font-semibold">
                  Predecessor:
                </span>
                {activeStory.predecessor && prophetStories.some((s) => s.id === activeStory.predecessor?.id) ? (
                  <button
                    onClick={() => {
                      setSelectedStoryId(activeStory.predecessor!.id);
                      window.scrollTo({ top: 100, behavior: 'smooth' });
                    }}
                    className="text-accent-gold hover:underline font-bold text-right flex items-center gap-1"
                  >
                    <span>{activeStory.predecessor.name}</span>
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="text-text-secondary">
                    {activeStory.predecessor?.name || 'Earlier Patriarchs'}
                  </span>
                )}
              </div>

              {/* Successor Link */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-text-muted uppercase tracking-wider text-[11px] font-semibold">
                  Successor:
                </span>
                {activeStory.successor && prophetStories.some((s) => s.id === activeStory.successor?.id) ? (
                  <button
                    onClick={() => {
                      setSelectedStoryId(activeStory.successor!.id);
                      window.scrollTo({ top: 100, behavior: 'smooth' });
                    }}
                    className="text-accent-gold hover:underline font-bold text-right flex items-center gap-1"
                  >
                    <span>{activeStory.successor.name}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="text-text-secondary">
                    {activeStory.successor?.name || 'Later Messengers'}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Navigation Jump to Other Stories */}
            <div className="pt-3 border-t border-accent-gold/25 text-center">
              <span className="text-[11px] font-bold text-accent-gold uppercase tracking-wider block mb-2">
                Timeline Series Navigation
              </span>
              <div className="flex items-center justify-between gap-2">
                {activeStory.predecessor && prophetStories.some((s) => s.id === activeStory.predecessor?.id) && (
                  <button
                    onClick={() => {
                      setSelectedStoryId(activeStory.predecessor!.id);
                      window.scrollTo({ top: 100, behavior: 'smooth' });
                    }}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-bg-primary hover:bg-bg-primary/80 border border-accent-gold/40 text-xs font-semibold text-accent-gold flex items-center justify-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span className="truncate">{activeStory.predecessor.name}</span>
                  </button>
                )}

                {activeStory.successor && prophetStories.some((s) => s.id === activeStory.successor?.id) && (
                  <button
                    onClick={() => {
                      setSelectedStoryId(activeStory.successor!.id);
                      window.scrollTo({ top: 100, behavior: 'smooth' });
                    }}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-bg-primary hover:bg-bg-primary/80 border border-accent-gold/40 text-xs font-semibold text-accent-gold flex items-center justify-center gap-1"
                  >
                    <span className="truncate">{activeStory.successor.name}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. "QUR'AN EVIDENCE" SECTION */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Qur'an Evidence</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-text-primary">
              Direct Mentions in Divine Scripture
            </h2>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('quran')}
              className="text-xs sm:text-sm text-accent-gold font-semibold hover:underline uppercase tracking-wider hidden sm:block"
            >
              Open Quran Hub &rarr;
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeStory.quranEvidence.map((item, idx) => (
            <OrnamentedCard
              key={idx}
              className="p-5 flex flex-col justify-between space-y-4 hover:border-accent-gold transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-accent-gold/20">
                  <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                    {item.citation}
                  </span>
                  <span className="text-xs text-text-muted">
                    Surah {item.surahName}
                  </span>
                </div>

                {/* Arabic Scripture */}
                <p className="font-arabic text-2xl text-accent-gold leading-loose text-right pt-3 select-text">
                  {item.arabic}
                </p>

                {/* Transliteration */}
                <p className="text-xs text-text-muted italic font-serif mt-2">
                  "{item.transliteration}"
                </p>

                {/* English Translation */}
                <p className="text-sm text-text-primary mt-2 font-medium leading-relaxed">
                  "{item.translation}"
                </p>
              </div>

              {/* Link back to that verse in Quran Hub / Surah Deep Dive */}
              <div className="pt-3 border-t border-accent-gold/20">
                <button
                  onClick={() => handleOpenCitation(item)}
                  className="w-full py-2 px-3 rounded-xl bg-bg-primary hover:bg-accent-gold/20 border border-accent-gold/40 text-accent-gold font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 uppercase tracking-wider"
                  title="Open chapter in Quran section"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Read Chapter in Quran Hub</span>
                </button>
              </div>
            </OrnamentedCard>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 4. THE NARRATIVE ITSELF & 5. PULL-QUOTE BLOCKS */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30">
            <Layers className="w-3.5 h-3.5" />
            <span>Chronological Narrative</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-text-primary">
            The Life, Trials & Triumphs of {activeStory.name}
          </h2>
          <p className="text-xs text-text-secondary">
            Grounded in Qur’anic revelation, authentic hadith, and distinguished classical scholarship.
          </p>
        </div>

        <div className="space-y-6">
          {activeStory.narrativeSections.map((section, idx) => (
            <div
              key={section.id}
              id={section.id}
              className={`relative bg-bg-card rounded-2xl border p-6 sm:p-8 space-y-4 transition-all scroll-mt-24 ${
                activeSectionId === section.id
                  ? 'border-accent-gold shadow-2xl bg-bg-card/95'
                  : 'border-accent-gold/40'
              }`}
            >
              <CornerFlourishes size={14} opacity={0.6} />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-accent-gold/25">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-bg-primary border border-accent-gold text-accent-gold font-bold text-sm flex items-center justify-center shadow-xs">
                    {idx + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-text-primary">
                    {section.title}
                  </h3>
                </div>

                <span className="text-xs font-mono text-accent-gold bg-bg-primary px-2.5 py-1 rounded-lg border border-accent-gold/30 self-start sm:self-auto">
                  Timestamp {section.timestamp}
                </span>
              </div>

              {/* Narrative Paragraphs */}
              <div className="space-y-3.5 text-base sm:text-lg text-text-primary/95 leading-relaxed font-sans">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Evidence-based Scholarly Note */}
              {section.scholarlyNote && (
                <BorderedSubPanel className="mt-4 p-3.5 sm:p-4 text-xs sm:text-sm text-text-secondary leading-relaxed flex items-start gap-2.5 bg-bg-primary/70">
                  <span className="text-accent-gold font-bold uppercase tracking-wider text-[11px] shrink-0">
                    Scholarly Source:
                  </span>
                  <span>{section.scholarlyNote}</span>
                </BorderedSubPanel>
              )}
            </div>
          ))}
        </div>

        {/* 5. PULL-QUOTE STYLE BLOCKS */}
        {activeStory.pullQuotes.length > 0 && (
          <div className="space-y-3 pt-2">
            {activeStory.pullQuotes.map((pull, qIdx) => (
              <div
                key={qIdx}
                className="relative bg-bg-primary/95 rounded-2xl border-2 border-accent-gold p-6 sm:p-8 shadow-xl text-center space-y-3 overflow-hidden"
              >
                <CornerFlourishes size={16} opacity={0.8} />
                <Quote className="w-8 h-8 text-accent-gold/40 mx-auto" />

                <blockquote className="text-lg sm:text-2xl font-serif font-bold text-accent-gold leading-relaxed italic max-w-3xl mx-auto">
                  "{pull.quote}"
                </blockquote>

                <div className="pt-2">
                  <div className="text-sm font-bold text-text-primary uppercase tracking-wider">
                    — {pull.speaker}
                  </div>
                  <div className="text-xs text-text-secondary italic mt-0.5">
                    {pull.context}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <SectionDivider />

      {/* ========================================================================= */}
      {/* 6. "TEACHINGS & LESSONS" SECTION */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spiritual Wisdom</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-text-primary">
            Teachings & Timeless Lessons for Our Lives
          </h2>
          <p className="text-xs text-text-secondary">
            Core principles derived from the legacy of {activeStory.name} {activeStory.honorific}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeStory.teachingsAndLessons.map((lesson, idx) => (
            <OrnamentedCard key={idx} className="p-5 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-bg-primary border border-accent-gold text-accent-gold flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                {idx + 1}
              </div>
              <p className="text-sm sm:text-base text-text-primary font-medium leading-relaxed">
                {lesson}
              </p>
            </OrnamentedCard>
          ))}
        </div>
      </div>

      {/* Bottom Navigation to Next Prophet in Timeline */}
      {activeStory.successor && prophetStories.some((s) => s.id === activeStory.successor?.id) && (
        <div className="pt-6">
          <button
            onClick={() => {
              setSelectedStoryId(activeStory.successor!.id);
              window.scrollTo({ top: 100, behavior: 'smooth' });
            }}
            className="w-full p-6 rounded-2xl bg-bg-card hover:bg-bg-primary border-2 border-accent-gold text-center transition-all group shadow-xl space-y-1"
          >
            <span className="text-xs uppercase tracking-widest text-accent-gold font-bold">
              Next Chapter in the Prophetic Series &rarr;
            </span>
            <h3 className="text-2xl font-serif font-bold text-text-primary group-hover:text-accent-gold transition-colors">
              Continue to the Story of {activeStory.successor.name}
            </h3>
          </button>
        </div>
      )}
    </div>
  );
}
