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
} from 'lucide-react';
import { useNoor } from '@/context/NoorContext';
import type { ReelItem } from '@/lib/content';

export function ReelsView() {
  const {
    reels,
    likedReels,
    toggleLikeReel,
    addSubmittedReel,
    pendingReels,
    approveReel,
    savedItems,
    toggleSaved,
  } = useNoor();

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [showAdminQueue, setShowAdminQueue] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formSpeaker, setFormSpeaker] = useState('');
  const [formTopic, setFormTopic] = useState('');
  const [formQuote, setFormQuote] = useState('');
  const [formYoutubeUrl, setFormYoutubeUrl] = useState('');
  const [formCategory, setFormCategory] = useState<'Remembrance' | 'Overcoming Grief' | 'Prayer & Peace' | 'Character'>('Remembrance');

  const categories = ['All', 'Remembrance', 'Overcoming Grief', 'Prayer & Peace', 'Character'];

  const filteredReels = reels.filter(
    (r) => activeFilter === 'All' || r.category === activeFilter
  );

  const handleSubmitReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSpeaker.trim() || !formQuote.trim()) return;

    // Extract YouTube ID if valid URL
    let ytId: string | undefined = undefined;
    if (formYoutubeUrl.includes('youtube.com/watch?v=')) {
      ytId = formYoutubeUrl.split('v=')[1]?.split('&')[0];
    } else if (formYoutubeUrl.includes('youtu.be/')) {
      ytId = formYoutubeUrl.split('youtu.be/')[1]?.split('?')[0];
    } else if (formYoutubeUrl.trim()) {
      ytId = formYoutubeUrl.trim();
    }

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
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Faith Reminders & Video Reels
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Short, heart-centered reflections and video reminders curated for busy days.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdminQueue(!showAdminQueue)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              showAdminQueue
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Admin Queue ({pendingReels.length})</span>
          </button>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit a Reminder</span>
          </button>
        </div>
      </div>

      {/* Admin Approval Queue Drawer */}
      {showAdminQueue && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-800" />
              <h3 className="font-bold text-stone-900 text-sm">
                Moderation & Approval Queue ({pendingReels.length} pending)
              </h3>
            </div>
            <span className="text-xs text-stone-500">Submissions require approval before publication</span>
          </div>

          {pendingReels.length === 0 ? (
            <p className="text-xs text-stone-600 bg-white/70 p-4 rounded-2xl border border-amber-200/60 text-center">
              All submissions are reviewed! No pending reminders in the moderation queue.
            </p>
          ) : (
            <div className="space-y-3">
              {pendingReels.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">{item.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
                        Pending Review
                      </span>
                    </div>
                    <div className="text-xs text-stone-500">
                      Speaker: {item.speaker} · Topic: {item.topic} · Category: {item.category}
                    </div>
                    <p className="text-xs text-stone-700 italic">"{item.quote}"</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => approveReel(item.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Publish</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === cat
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
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

          return (
            <div
              key={reel.id}
              className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:border-emerald-700/30 transition-all flex flex-col md:flex-row"
            >
              {/* Left / Video Frame Area */}
              <div className="md:w-7/12 bg-stone-950 flex items-center justify-center relative min-h-[280px]">
                {reel.youtubeId ? (
                  <iframe
                    className="w-full h-full min-h-[300px] border-0"
                    src={`https://www.youtube.com/embed/${reel.youtubeId}?rel=0&modestbranding=1`}
                    title={reel.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="p-8 text-center text-white space-y-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-700/80 mx-auto flex items-center justify-center">
                      <Play className="w-6 h-6 fill-white text-white ml-1" />
                    </div>
                    <div className="font-bold text-lg text-emerald-200">{reel.title}</div>
                    <p className="text-xs text-stone-300 max-w-sm mx-auto">{reel.quote}</p>
                  </div>
                )}
              </div>

              {/* Right / Information & Reflection Details */}
              <div className="p-6 md:w-5/12 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 uppercase tracking-wide">
                      {reel.category}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {reel.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 leading-tight">
                    {reel.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                    <User className="w-3.5 h-3.5" />
                    <span>{reel.speaker}</span>
                    <span className="text-stone-300">·</span>
                    <span className="text-stone-500 font-normal">{reel.topic}</span>
                  </div>

                  {/* Spiritual Quote Excerpt */}
                  <blockquote className="text-xs text-stone-700 leading-relaxed bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200/80 italic">
                    "{reel.quote}"
                  </blockquote>

                  {reel.featuredAyah && (
                    <div className="text-[11px] text-stone-500">
                      <span className="font-semibold text-stone-700">Rooted in:</span>{' '}
                      {reel.featuredAyah}
                    </div>
                  )}
                </div>

                {/* Engagement Bar */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleLikeReel(reel.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                        isLiked
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-600' : ''}`} />
                      <span>{reel.likesCount}</span>
                    </button>

                    <button
                      onClick={() => toggleSaved(`reel-${reel.id}`)}
                      className={`p-2 rounded-xl transition-colors ${
                        isSaved ? 'text-amber-600 bg-amber-50' : 'text-stone-400 hover:text-stone-700'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `"${reel.quote}" — ${reel.speaker} (Shared via Noor)`
                      );
                    }}
                    className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-50 transition-colors"
                    title="Copy Quote"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Faith Reminder Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Submit a Faith Reminder</h3>
                <p className="text-xs text-stone-500">Goes directly to the admin queue for verification</p>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submissionSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                <h4 className="text-base font-bold text-stone-900">Submitted for Approval!</h4>
                <p className="text-xs text-stone-500">
                  Your reminder was queued in the moderation system. Once reviewed, it will appear in the public feed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReel} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Finding Peace in Night Prayer"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Speaker / Scholar *</label>
                    <input
                      type="text"
                      required
                      value={formSpeaker}
                      onChange={(e) => setFormSpeaker(e.target.value)}
                      placeholder="e.g. Sh. Omar Suleiman"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                    >
                      <option value="Remembrance">Remembrance</option>
                      <option value="Overcoming Grief">Overcoming Grief</option>
                      <option value="Prayer & Peace">Prayer & Peace</option>
                      <option value="Character">Character</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    YouTube URL or Video Link
                  </label>
                  <input
                    type="text"
                    value={formYoutubeUrl}
                    onChange={(e) => setFormYoutubeUrl(e.target.value)}
                    placeholder="e.g. https://www.youtube.com/watch?v=..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Core Spiritual Quote or Takeaway *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formQuote}
                    onChange={(e) => setFormQuote(e.target.value)}
                    placeholder="Enter the heart-stirring message or quote from this reminder..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                  >
                    Submit for Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
