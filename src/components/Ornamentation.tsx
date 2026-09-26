import React from 'react';

/**
 * Small corner flourish: quarter-circle arc line + dot in corner
 */
export function CornerFlourishes({
  color = 'var(--accent-gold)',
  size = 14,
  opacity = 0.85,
}: {
  color?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <>
      {/* Top-Left */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        className="absolute top-1.5 left-1.5 pointer-events-none select-none"
        style={{ opacity }}
      >
        <path d="M 0 14 A 14 14 0 0 1 14 0" stroke={color} strokeWidth="1" fill="none" />
        <circle cx="5.5" cy="5.5" r="1.5" fill={color} />
      </svg>

      {/* Top-Right */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        className="absolute top-1.5 right-1.5 pointer-events-none select-none"
        style={{ opacity }}
      >
        <path d="M 16 14 A 14 14 0 0 0 2 0" stroke={color} strokeWidth="1" fill="none" />
        <circle cx="10.5" cy="5.5" r="1.5" fill={color} />
      </svg>

      {/* Bottom-Left */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        className="absolute bottom-1.5 left-1.5 pointer-events-none select-none"
        style={{ opacity }}
      >
        <path d="M 0 2 A 14 14 0 0 0 14 16" stroke={color} strokeWidth="1" fill="none" />
        <circle cx="5.5" cy="10.5" r="1.5" fill={color} />
      </svg>

      {/* Bottom-Right */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        className="absolute bottom-1.5 right-1.5 pointer-events-none select-none"
        style={{ opacity }}
      >
        <path d="M 16 2 A 14 14 0 0 1 2 16" stroke={color} strokeWidth="1" fill="none" />
        <circle cx="10.5" cy="10.5" r="1.5" fill={color} />
      </svg>
    </>
  );
}

/**
 * Reusable Card with thin gold hairline border and corner flourishes
 */
export function OrnamentedCard({
  children,
  className = '',
  onClick,
  hasFlourishes = true,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hasFlourishes?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl bg-bg-card border border-accent-gold text-text-primary transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-accent-gold-dim hover:shadow-lg' : ''
      } ${className}`}
    >
      {hasFlourishes && <CornerFlourishes />}
      {children}
    </div>
  );
}

/**
 * Reusable Section Divider: "• ◆ •"
 */
export function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-6 my-2 select-none ${className}`}>
      <span className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-accent-gold/40" />
      <span className="text-xs text-accent-gold tracking-widest flex items-center gap-1.5 opacity-85">
        <span>•</span>
        <span className="text-[10px]">◆</span>
        <span>•</span>
      </span>
      <span className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-accent-gold/40" />
    </div>
  );
}

/**
 * Reusable Bordered Sub-Panel for Du'a, Tafsir, Actions, and Contemplation Boxes
 */
export function BorderedSubPanel({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-accent-gold/40 bg-bg-primary/80 p-4 text-text-primary ${className}`}
    >
      {children}
    </div>
  );
}
