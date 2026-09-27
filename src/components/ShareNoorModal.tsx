import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Sparkles,
  Download,
  Smartphone,
  MessageCircle,
  Send,
  ExternalLink,
} from 'lucide-react';
import { CornerFlourishes, OrnamentedCard } from './Ornamentation';
import { usePWAInstall } from '@/hooks/usePWAInstall';

interface ShareNoorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareNoorModal({ isOpen, onClose }: ShareNoorModalProps) {
  const [copied, setCopied] = useState(false);
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  if (!isOpen) return null;

  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://noor.app';
  const shareMessage = `I've been using Noor to connect more with my faith — try it: ${appUrl}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareMessage);
      } else {
        const input = document.createElement('textarea');
        input.value = shareMessage;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy link:', e);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Noor — Sacred Islamic Companion',
          text: "I've been using Noor to connect more with my faith — try it:",
          url: appUrl,
        });
        onClose();
      } catch (err) {
        // User cancelled or share dismissed
      }
    }
  };

  const encodedMessage = encodeURIComponent(shareMessage);
  const encodedUrl = encodeURIComponent(appUrl);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-bg-card rounded-2xl border border-accent-gold shadow-2xl p-6 sm:p-8 text-text-primary">
        <CornerFlourishes size={16} opacity={0.7} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-text-muted hover:text-accent-gold rounded-xl transition-colors hover:bg-bg-primary/50"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spread the Light</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-text-primary tracking-tight">
            Share Noor with Family & Friends
          </h2>

          <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
            Invite your loved ones to reflect upon sacred Quranic words, explore prophetic history narratives, and calculate prayer times.
          </p>
        </div>

        {/* Native Web Share Button (if supported) */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="w-full mb-4 py-3 px-4 rounded-xl bg-accent-gold hover:bg-accent-gold-dim text-bg-primary font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Share2 className="w-4 h-4" />
            <span>Open Phone Share Sheet</span>
          </button>
        )}

        {/* Share Link Preview Box */}
        <div className="space-y-2 mb-6">
          <label className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
            Invitation Link
          </label>
          <div className="flex items-center gap-2 p-1.5 bg-bg-primary rounded-xl border border-accent-gold/40">
            <input
              type="text"
              readOnly
              value={appUrl}
              className="flex-1 bg-transparent px-3 text-xs sm:text-sm text-text-primary select-all focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 ${
                copied
                  ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/50'
                  : 'bg-accent-gold hover:bg-accent-gold-dim text-bg-primary'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
          {copied && (
            <p className="text-xs text-accent-gold font-semibold text-center animate-in fade-in">
              ✓ Link and invitation message copied to clipboard!
            </p>
          )}
        </div>

        {/* Quick Social & Messaging Channels */}
        <div className="space-y-2 mb-6">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Send Directly Via
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <a
              href={`https://api.whatsapp.com/send?text=${encodedMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-bg-primary hover:bg-bg-primary/70 border border-accent-gold/30 hover:border-accent-gold text-xs font-semibold transition-all group"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform mb-1" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent("I've been using Noor to connect more with my faith — try it:")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-bg-primary hover:bg-bg-primary/70 border border-accent-gold/30 hover:border-accent-gold text-xs font-semibold transition-all group"
            >
              <Send className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform mb-1" />
              <span>Telegram</span>
            </a>

            <a
              href={`mailto:?subject=${encodeURIComponent('Try Noor — Sacred Islamic Companion')}&body=${encodedMessage}`}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-bg-primary hover:bg-bg-primary/70 border border-accent-gold/30 hover:border-accent-gold text-xs font-semibold transition-all group"
            >
              <ExternalLink className="w-5 h-5 text-accent-gold group-hover:scale-110 transition-transform mb-1" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* PWA Install Banner */}
        {!isInstalled && (
          <div className="pt-4 border-t border-accent-gold/25">
            <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-bg-primary border border-accent-gold/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-bg-card border border-accent-gold text-accent-gold flex items-center justify-center font-bold text-lg shrink-0">
                  ن
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary font-serif">
                    Install Noor on Device
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {isIOS
                      ? 'Tap Share ⎋ and select "Add to Home Screen" ⊞'
                      : 'Fast offline access and native fullscreen experience'}
                  </p>
                </div>
              </div>

              {isInstallable && (
                <button
                  onClick={install}
                  className="px-3.5 py-2 rounded-lg bg-accent-gold hover:bg-accent-gold-dim text-bg-primary font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Install</span>
                </button>
              )}

              {isIOS && (
                <span className="text-xs font-semibold text-accent-gold px-2 py-1 rounded bg-accent-gold/15 border border-accent-gold/30 shrink-0">
                  iOS Safari
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
