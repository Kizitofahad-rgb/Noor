import { useState } from 'react';
import {
  Heart,
  Share2,
  PlusCircle,
  CheckCircle2,
  Clock,
  User,
  ExternalLink,
  ShieldCheck,
  X,
  Play,
  Bookmark,
  BookmarkCheck,
  Search,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { useNoor } from '@/context/NoorContext';
import { useAuth } from '@/context/AuthContext';
import { OrnamentedCard, BorderedSubPanel, CornerFlourishes, SectionDivider } from '../Ornamentation';

export function ReelsView() {
  const { user, openAuthModal, submitUserReel } = useAuth();
  const {
    reels,
    likedReels,
    toggleLikeReel,
    addSubmittedReel,
    pendingReels,
    approveReel,
    savedItems,
    toggleSaved,
    isLoadingReels,
    fetchReels,
    reelsSource,
  } = useNoor();

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [showAdminQueue, setShowAdminQueue] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [searchTopic, setSearchTopic] = useState('');
  const [activeSearchPreset, setActiveSearchPreset] = useState<string>('Islamic reminder short');

  // Track if a specific video failed to load, triggering the fallback UI
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formSpeaker, setFormSpeaker] = useState('');
  const [formTopic, setFormTopic] = useState('');
  const [formQuote, setFormQuote] = useState('');
  const [formYoutubeUrl, setFormYoutubeUrl] = useState('');
  const [formCategory, setFormCategory] = useState<'Remembrance' | 'Overcoming Grief' | 'Prayer & Peace' | 'Character'>('Remembrance');

  const categories = ['All', 'Remembrance', 'Overcoming Grief', 'Prayer & Peace', 'Character'];

  const searchPresets = [
    { label: 'Islamic Reminders', query: 'Islamic reminder short' },
    { label: 'Quran Recitation', query: 'Quran recitation short' },
    { label: 'Tawakkul & Trust', query: 'reliance on Allah short' },
    { label: 'Night Prayer', query: 'Tahajjud reminder short' },
  ];

  const filteredReels = reels.filter(
    (r) => activeFilter === 'All' || r.category === activeFilter
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTopic.trim()) return;
    setActiveSearchPreset(searchTopic.trim());
    fetchReels(searchTopic.trim());
  };

  const handleSelectPreset = (presetQuery: string) => {
    setActiveSearchPreset(presetQuery);
    setSearchTopic('');
    fetchReels(presetQuery);
  };

  const markVideoFailed = (id: string) => {
    setFailedVideos((prev) => ({ ...prev, [id]: true }));
  };

  const resetVideoFailed = (id: string) => {
    setFailedVideos((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleSubmitReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSpeaker.trim() || !formQuote.trim()) return;

    if (!user) {
      openAuthModal('login');
      return;
    }

    let ytId: string | undefined = undefined;
    if (formYoutubeUrl.includes('youtube.com/watch?v=')) {
      ytId = formYoutubeUrl.split('v=')[1]?.split('&')[0];
    } else if (formYoutubeUrl.includes('youtu.be/')) {
      ytId = formYoutubeUrl.split('youtu.be/')[1]?.split('?')[0];
    } else if (formYoutubeUrl.trim()) {
      ytId = formYoutubeUrl.trim();
    }

    // Save to PostgreSQL submitted_reels table
    await submitUserReel(
      formYoutubeUrl.trim() || `https://youtube.com/watch?v=${ytId || '_PiLcpSPfmQ'}`,
      `${formTitle.trim()} (${formSpeaker.trim()}): ${formQuote.trim()}`
    );

    addSubmittedReel({
      title: formTitle.trim(),
      speaker: formSpeaker.trim(),
      topic: formTopic.trim() || 'Faith Reminder',
      quote: formQuote.trim(),
      duration: '2:30',
      category: formCategory,
      youtubeId: ytId,
      featuredAyah: 'Quran 2:186',
    });

    setFormTitle('');
    setFormSpeaker('');
    setFormTopic('');
    setFormQuote('');
    setFormYoutubeUrl('');
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSubmissionSuccess(false);
      setIsSubmitModalOpen(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-14 text-text-primary">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight font-serif">
            Faith Reminders & Video Reels
          </h1>
          <p className="text-text-secondary text-sm sm:text-base mt-1">
            Short, heart-centered reflections and video reminders powered by YouTube Data API v3.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdminQueue(!showAdminQueue)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors border font-semibold uppercase tracking-wider ${
              showAdminQueue
                ? 'bg-accent-gold/25 text-accent-gold border-accent-gold shadow-xs'
                : 'bg-bg-card text-text-secondary border-accent-gold/40 hover:border-accent-gold hover:text-text-primary'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-accent-gold" />
            <span>Admin Queue ({pendingReels.length})</span>
          </button>

          <button
            onClick={() => {
              if (!user) {
                openAuthModal('login');
              } else {
                setIsSubmitModalOpen(true);
              }
            }}
            className="px-4 py-2 rounded-xl bg-accent-gold hover:bg-accent-gold-dim text-bg-primary text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs transition-colors uppercase tracking-wider"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit a Reminder</span>
          </button>
        </div>
      </div>

      {/* Dynamic YouTube Search & Preset Filters */}
      <OrnamentedCard className="p-4 sm:p-5 space-y-3.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="w-5 h-5 text-accent-gold/70 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              placeholder="Search YouTube (e.g. Quran recitation short, patience sabr, tahajjud)..."
              className="w-full bg-bg-primary border border-accent-gold/45 rounded-2xl pl-12 pr-28 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold"
            />
            <button
              type="submit"
              disabled={isLoadingReels}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-accent-gold text-bg-primary rounded-xl text-xs sm:text-sm font-bold hover:bg-accent-gold-dim disabled:opacity-50 transition-colors shadow-xs uppercase tracking-wider"
            >
              Search
            </button>
          </form>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => fetchReels(activeSearchPreset)}
              disabled={isLoadingReels}
              className="px-4 py-2.5 rounded-xl bg-bg-primary hover:bg-bg-primary/70 text-text-primary border border-accent-gold/40 hover:border-accent-gold text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 uppercase tracking-wider"
              title="Refresh from YouTube Data API"
            >
              <RefreshCw className={`w-4 h-4 text-accent-gold ${isLoadingReels ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh API</span>
            </button>
          </div>
        </div>

        {/* Preset Search Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-accent-gold uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {searchPresets.map((preset) => {
            const isSelected = activeSearchPreset === preset.query;
            return (
              <button
                key={preset.query}
                onClick={() => handleSelectPreset(preset.query)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all border uppercase tracking-wider font-semibold ${
                  isSelected
                    ? 'bg-accent-gold text-bg-primary font-bold border-accent-gold shadow-xs'
                    : 'bg-bg-primary text-text-secondary border-accent-gold/30 hover:border-accent-gold hover:text-text-primary'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Live Status indicator */}
        <div className="pt-2 border-t border-accent-gold/20 flex items-center justify-between text-[11px] text-text-primary/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
            <span>
              {isLoadingReels
                ? 'Querying YouTube Data API v3 search endpoint...'
                : `Verified embeddable videos active (${filteredReels.length} available)`}
            </span>
          </div>
          {reelsSource && (
            <span className="text-text-primary/50">
              Source: <span className="font-mono text-accent-gold font-semibold">{reelsSource}</span>
            </span>
          )}
        </div>
      </OrnamentedCard>

      {/* Admin Approval Queue Drawer */}
      {showAdminQueue && (
        <OrnamentedCard className="p-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent-gold" />
              <h3 className="font-bold text-text-primary text-base">
                Moderation & Approval Queue ({pendingReels.length} pending)
              </h3>
            </div>
            <span className="text-xs text-text-primary/60">Submissions require approval before publication</span>
          </div>

          {pendingReels.length === 0 ? (
            <BorderedSubPanel className="text-xs text-text-primary/70 text-center py-4">
              All submissions are reviewed! No pending reminders in the moderation queue.
            </BorderedSubPanel>
          ) : (
            <div className="space-y-3">
              {pendingReels.map((item) => (
                <div
                  key={item.id}
                  className="bg-bg-primary p-4 rounded-2xl border border-accent-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-text-primary text-sm">{item.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-gold/20 text-accent-gold border border-accent-gold/40 label-caps font-semibold">
                        Pending Review
                      </span>
                    </div>
                    <div className="text-xs text-text-primary/60">
                      Speaker: {item.speaker} · Topic: {item.topic} · Category: {item.category}
                    </div>
                    <p className="text-xs text-text-primary/90 italic">"{item.quote}"</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => approveReel(item.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-accent-gold hover:bg-accent-gold-dim text-bg-primary text-xs font-bold flex items-center gap-1 shadow-xs transition-colors label-caps"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Publish</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </OrnamentedCard>
      )}

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-serif whitespace-nowrap transition-all border label-caps ${
              activeFilter === cat
                ? 'bg-accent-gold text-bg-primary font-bold border-accent-gold shadow-xs'
                : 'bg-bg-card border-accent-gold/30 text-text-primary/80 hover:border-accent-gold hover:text-text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Reels Feed Cards */}
      <div className="space-y-6">
        {filteredReels.map((reel) => {
          const isLiked = likedReels.includes(reel.id);
          const isSaved = savedItems.includes(`reel-${reel.id}`);
          const hasFailed = failedVideos[reel.id];

          return (
            <OrnamentedCard
              key={reel.id}
              className="overflow-hidden flex flex-col md:flex-row p-0"
            >
              {/* Left / Video Frame Area */}
              <div className="md:w-7/12 bg-black flex items-center justify-center relative min-h-[340px] border-b md:border-b-0 md:border-r border-accent-gold/30">
                {reel.youtubeId && !hasFailed ? (
                  <div className="relative w-full h-full min-h-[340px] flex items-center justify-center bg-black">
                    <iframe
                      className="w-full h-full min-h-[340px] border-0"
                      src={`https://www.youtube.com/embed/${reel.youtubeId}`}
                      title={reel.title}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      onError={() => markVideoFailed(reel.id)}
                    />
                  </div>
                ) : (
                  /* Fallback UI: If video fails to load, show prominent "Watch on YouTube" link */
                  <div className="p-8 text-center bg-bg-primary text-text-primary w-full h-full min-h-[340px] flex flex-col items-center justify-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-accent-gold/15 border border-accent-gold/40 flex items-center justify-center text-accent-gold">
                      <AlertCircle className="w-8 h-8 text-accent-gold" />
                    </div>
                    <div className="max-w-xs">
                      <h4 className="font-bold text-text-primary text-base">Video Restricted from Direct Embed</h4>
                      <p className="text-xs text-text-primary/70 mt-1">
                        The video creator may restrict in-app embedding. You can view the full reminder directly on YouTube.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <a
                        href={`https://www.youtube.com/watch?v=${reel.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-gold hover:bg-accent-gold-dim text-bg-primary text-xs font-bold transition-all shadow-md active:scale-95 label-caps"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      {hasFailed && (
                        <button
                          onClick={() => resetVideoFailed(reel.id)}
                          className="px-3 py-2 text-xs text-text-primary/70 hover:text-accent-gold underline transition-colors"
                        >
                          Retry Embed
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right / Information & Reflection Details */}
              <div className="p-6 md:w-5/12 flex flex-col justify-between space-y-4">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-bg-primary text-accent-gold border border-accent-gold/45 uppercase tracking-wider">
                      {reel.category}
                    </span>
                    <span className="text-xs text-text-secondary flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5 text-accent-gold" />
                      {reel.duration}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-text-primary leading-tight font-serif">
                    {reel.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm font-semibold text-accent-gold">
                    <User className="w-4 h-4 text-accent-gold" />
                    <span>{reel.speaker}</span>
                    <span className="text-accent-gold-dim">·</span>
                    <span className="text-text-secondary font-normal">{reel.topic}</span>
                  </div>

                  {/* Spiritual Quote Excerpt */}
                  <BorderedSubPanel className="text-sm italic leading-relaxed text-text-primary p-4">
                    "{reel.quote}"
                  </BorderedSubPanel>

                  {reel.featuredAyah && (
                    <div className="text-xs sm:text-sm text-text-secondary">
                      <span className="font-bold text-accent-gold uppercase tracking-wider text-xs mr-1.5">Rooted in:</span>
                      {reel.featuredAyah}
                    </div>
                  )}

                  {/* Direct YouTube link button */}
                  {reel.youtubeId && (
                    <div className="pt-1">
                      <a
                        href={`https://www.youtube.com/watch?v=${reel.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm text-accent-gold hover:text-accent-gold-dim font-bold transition-colors group uppercase tracking-wider"
                      >
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Engagement Bar */}
                <div className="pt-4 border-t border-accent-gold/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleLikeReel(reel.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors border ${
                        isLiked
                          ? 'bg-accent-gold/25 text-accent-gold border-accent-gold'
                          : 'bg-bg-primary text-text-secondary border-accent-gold/30 hover:border-accent-gold hover:text-text-primary'
                      }`}
                    >
                      <Heart className={`w-4 h-4 text-accent-gold ${isLiked ? 'fill-current' : ''}`} />
                      <span>{reel.likesCount}</span>
                    </button>

                    <button
                      onClick={() => toggleSaved(`reel-${reel.id}`)}
                      className={`p-2.5 rounded-xl transition-colors border ${
                        isSaved
                          ? 'text-accent-gold bg-accent-gold/20 border-accent-gold'
                          : 'text-text-muted border-transparent hover:text-accent-gold hover:border-accent-gold/30'
                      }`}
                      title="Bookmark"
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 text-accent-gold" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `"${reel.quote}" — ${reel.speaker} (${reel.youtubeId ? `https://www.youtube.com/watch?v=${reel.youtubeId}` : 'Shared via Noor'})`
                      );
                    }}
                    className="p-2 text-text-primary/60 hover:text-accent-gold rounded-xl hover:bg-bg-primary transition-colors border border-transparent hover:border-accent-gold/30"
                    title="Copy Quote and Link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </OrnamentedCard>
          );
        })}
      </div>

      {/* Submit Faith Reminder Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-serif">
          <div className="bg-bg-card rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-accent-gold space-y-5 animate-in fade-in zoom-in-95 duration-200 relative text-text-primary">
            <CornerFlourishes />

            <div className="flex items-center justify-between pb-3 border-b border-accent-gold/30">
              <div>
                <h3 className="text-lg font-bold text-text-primary">Submit a Faith Reminder</h3>
                <p className="text-xs text-text-primary/70">Goes directly to the moderation queue for verification</p>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1.5 text-text-primary/60 hover:text-accent-gold rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submissionSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-accent-gold mx-auto" />
                <h4 className="text-base font-bold text-text-primary">Submitted for Approval!</h4>
                <p className="text-xs text-text-primary/70">
                  Your reminder was queued in the moderation system. Once reviewed, it will appear in the public feed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReel} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-accent-gold block mb-1 label-caps">Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Finding Peace in Night Prayer"
                    className="w-full bg-bg-primary border border-accent-gold/40 rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-gold font-serif"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-accent-gold block mb-1 label-caps">Speaker / Scholar *</label>
                    <input
                      type="text"
                      required
                      value={formSpeaker}
                      onChange={(e) => setFormSpeaker(e.target.value)}
                      placeholder="e.g. Sh. Omar Suleiman"
                      className="w-full bg-bg-primary border border-accent-gold/40 rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-gold font-serif"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-accent-gold block mb-1 label-caps">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full bg-bg-primary border border-accent-gold/40 rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-gold font-serif"
                    >
                      <option value="Remembrance">Remembrance</option>
                      <option value="Overcoming Grief">Overcoming Grief</option>
                      <option value="Prayer & Peace">Prayer & Peace</option>
                      <option value="Character">Character</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-accent-gold block mb-1 label-caps">
                    YouTube URL or Video Link
                  </label>
                  <input
                    type="text"
                    value={formYoutubeUrl}
                    onChange={(e) => setFormYoutubeUrl(e.target.value)}
                    placeholder="e.g. https://www.youtube.com/watch?v=..."
                    className="w-full bg-bg-primary border border-accent-gold/40 rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-gold font-serif"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-accent-gold block mb-1 label-caps">
                    Core Spiritual Quote or Takeaway *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formQuote}
                    onChange={(e) => setFormQuote(e.target.value)}
                    placeholder="Enter the heart-stirring message or quote from this reminder..."
                    className="w-full bg-bg-primary border border-accent-gold/40 rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-gold font-serif"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-text-primary/70 hover:text-text-primary hover:bg-bg-primary rounded-xl border border-accent-gold/30 label-caps"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-accent-gold hover:bg-accent-gold-dim text-bg-primary rounded-xl text-xs font-bold shadow-xs label-caps"
                  >
                    Submit for Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <SectionDivider />
    </div>
  );
}
