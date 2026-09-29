import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  Sparkles,
  AlertCircle,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { CornerFlourishes } from './Ornamentation';

export function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    login,
    signup,
    error,
    clearError,
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    setMode(authModalMode);
  }, [authModalMode]);

  useEffect(() => {
    if (isAuthModalOpen) {
      clearError();
      setValidationError(null);
      setShowPassword(false);
    }
  }, [isAuthModalOpen, mode, clearError]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setValidationError('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'signup' && !displayName.trim()) {
      setValidationError('Please enter your display name.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'signup') {
        await signup(cleanEmail, password, displayName);
      } else {
        await login(cleanEmail, password);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setIsSubmitting(true);
    setValidationError(null);
    clearError();
    setEmail('test@example.com');
    setPassword('password123');

    try {
      const ok = await login('test@example.com', 'password123');
      if (!ok) {
        // If demo user wasn't registered yet, register it
        await signup('test@example.com', 'password123', 'Noor Believer');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeError = validationError || error;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-md bg-bg-card rounded-3xl border border-accent-gold shadow-2xl p-6 sm:p-8 text-text-primary animate-in fade-in zoom-in-95 duration-200 my-auto">
        <CornerFlourishes size={16} opacity={0.7} />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 p-2 text-text-muted hover:text-accent-gold rounded-xl transition-colors hover:bg-bg-primary/50"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Devotional Badge */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-semibold uppercase tracking-wider border border-accent-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Journey</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-text-primary tracking-tight">
            {mode === 'login' ? 'Welcome Back to Noor' : 'Create Your Sacred Profile'}
          </h2>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            {mode === 'login'
              ? 'Sign in to access your recitation journey, track practiced surahs, and view submitted reflections.'
              : 'Join Noor to save personalized Quran recitation milestones, contemplation notes, and faith reels.'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex bg-bg-primary p-1 rounded-xl border border-accent-gold/30 mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              clearError();
              setValidationError(null);
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all uppercase tracking-wider ${
              mode === 'login'
                ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/50 shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              clearError();
              setValidationError(null);
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all uppercase tracking-wider ${
              mode === 'signup'
                ? 'bg-accent-gold/25 text-accent-gold border border-accent-gold/50 shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error message callout */}
        {activeError && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-950/70 border border-rose-600/50 text-rose-200 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{activeError}</span>
          </div>
        )}

        {/* Quick 1-Click Demo Login */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 rounded-xl border border-accent-gold/45 bg-accent-gold/10 hover:bg-accent-gold/20 text-accent-gold text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <Zap className="w-4 h-4 text-accent-gold" />
            <span>1-Click Quick Demo Sign In</span>
          </button>
        </div>

        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-accent-gold/20" />
          </div>
          <span className="relative px-3 bg-bg-card text-[11px] uppercase tracking-wider text-text-muted">
            or enter your credentials
          </span>
        </div>

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Display Name</span>
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  setValidationError(null);
                  clearError();
                }}
                placeholder="e.g. Tariq, Maryam"
                className="w-full bg-bg-primary border border-accent-gold/40 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidationError(null);
                clearError();
              }}
              placeholder="you@domain.com"
              className="w-full bg-bg-primary border border-accent-gold/40 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setValidationError(null);
                  clearError();
                }}
                placeholder="Minimum 6 characters"
                className="w-full bg-bg-primary border border-accent-gold/40 rounded-xl pl-4 pr-11 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-accent-gold transition-colors focus:outline-none"
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-accent-gold" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 bg-accent-gold hover:bg-accent-gold-dim text-bg-primary font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : mode === 'login' ? (
              <>
                <span>Sign In to Noor</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Create Sacred Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Subtext Switcher */}
        <div className="mt-5 pt-3 border-t border-accent-gold/20 text-center text-xs text-text-secondary">
          {mode === 'login' ? (
            <span>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  clearError();
                  setValidationError(null);
                }}
                className="text-accent-gold font-bold hover:underline ml-1"
              >
                Create one now
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  clearError();
                  setValidationError(null);
                }}
                className="text-accent-gold font-bold hover:underline ml-1"
              >
                Sign in here
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
