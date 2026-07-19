import * as React from 'react';

const ICONS: Record<string, React.ReactNode> = {
  wave: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M4 40c8-14 16-14 24 0s16 14 24 0"
        stroke="#0e0e0e"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M4 26c8-14 16-14 24 0s16 14 24 0"
        stroke="#e72f63"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M32 56C14 42 16 20 48 10c4 26-4 42-16 46Z"
        fill="#acd084"
        stroke="#0e0e0e"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M32 54c2-14 6-24 14-34"
        stroke="#0e0e0e"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M32 6c2 14 8 22 24 26-16 4-22 12-24 26-2-14-8-22-24-26 16-4 22-12 24-26Z"
        fill="#ffd372"
        stroke="#0e0e0e"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  ),
  plant: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M32 58V30"
        stroke="#0e0e0e"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M32 34c-2-12-10-18-22-18 2 14 10 20 22 18Z"
        fill="#88c1f8"
        stroke="#0e0e0e"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M32 34c2-12 10-18 22-18-2 14-10 20-22 18Z"
        fill="#f6b1cf"
        stroke="#0e0e0e"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export interface FeatureItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Preset doodle icon, or pass a custom node via `customIcon`. */
  icon?: 'wave' | 'leaf' | 'sparkle' | 'plant';
  /** Custom icon node — overrides `icon`. */
  customIcon?: React.ReactNode;
  /** Short uppercase benefit title, e.g. "Without the crash". */
  title: string;
  /** One-liner under the title. */
  children?: React.ReactNode;
}

/**
 * Centered benefit item — hand-drawn style icon, uppercase title, short
 * light-weight description ("Without the crash", "Vegan", …).
 */
export function FeatureItem({
  icon = 'sparkle',
  customIcon,
  title,
  children,
  className = '',
  ...rest
}: FeatureItemProps) {
  return (
    <div className={`mana-feature ${className}`.trim()} {...rest}>
      <span className="mana-feature__icon">{customIcon ?? ICONS[icon]}</span>
      <h4 className="mana-feature__title">{title}</h4>
      {children && <p className="mana-feature__text">{children}</p>}
    </div>
  );
}

export interface FeatureRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/** Horizontal wrap layout for a set of FeatureItems. */
export function FeatureRow({
  children,
  className = '',
  ...rest
}: FeatureRowProps) {
  return (
    <div className={`mana-featurerow ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}
