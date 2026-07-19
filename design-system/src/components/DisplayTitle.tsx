import * as React from 'react';

const RAINBOW = [
  'var(--mana-yellow)',
  'var(--mana-pink)',
  'var(--mana-blue)',
  'var(--mana-green)',
  'var(--mana-magenta)',
  'var(--mana-orange)',
  'var(--mana-navy)',
];

export interface DisplayTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Title text. Rendered uppercase at weight 300. */
  children: string;
  /** Type scale step. xl is the site's full-bleed hero size. Defaults to md. */
  size?: 'xl' | 'lg' | 'md' | 'sm';
  /** Colour every letter from the brand palette (the site's "rainbow" hero). */
  rainbow?: boolean;
  /** Heading element to render. Defaults to h2. */
  as?: 'h1' | 'h2' | 'h3' | 'div';
}

/**
 * Huge uppercase display heading — light weight, tight 0.85 line-height.
 * With `rainbow`, each letter cycles through the flavour palette like the
 * site's "Yerba Mate" hero lettering.
 */
export function DisplayTitle({
  children,
  size = 'md',
  rainbow = false,
  as = 'h2',
  className = '',
  ...rest
}: DisplayTitleProps) {
  const El = as as 'h2';
  const cls = ['mana-title', `mana-title--${size}`, className]
    .filter(Boolean)
    .join(' ');
  if (!rainbow) {
    return (
      <El className={cls} {...rest}>
        {children}
      </El>
    );
  }
  let i = 0;
  const words = children.split(' ').map((word, w) => (
    <React.Fragment key={w}>
      {w > 0 && ' '}
      <span className="mana-title__word">
        {Array.from(word).map((letter, l) => (
          <span
            key={l}
            className="mana-title__letter"
            style={{ color: RAINBOW[i++ % RAINBOW.length] }}
          >
            {letter}
          </span>
        ))}
      </span>
    </React.Fragment>
  ));
  return (
    <El className={cls} {...rest}>
      {words}
    </El>
  );
}
