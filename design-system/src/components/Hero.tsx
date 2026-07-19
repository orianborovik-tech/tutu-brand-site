import * as React from 'react';
import { DisplayTitle } from './DisplayTitle';

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  /** Big display headline, e.g. "Yerba Mate". */
  title: string;
  /** Colour every headline letter from the palette (the site's hero look). */
  rainbow?: boolean;
  /** Light-weight supporting line under the headline. */
  subtitle?: React.ReactNode;
  /** CTA buttons or anything else to render under the subtitle. */
  children?: React.ReactNode;
  /** Section background. Defaults to cream. */
  color?: 'cream' | 'yellow' | 'pink' | 'blue' | 'green';
}

/**
 * Full-bleed hero section — giant (optionally rainbow) display title,
 * short supporting line, CTA row.
 */
export function Hero({
  title,
  rainbow = true,
  subtitle,
  children,
  color = 'cream',
  className = '',
  ...rest
}: HeroProps) {
  const cls = [
    'mana-hero',
    color !== 'cream' ? `mana-hero--${color}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <section className={cls} {...rest}>
      <DisplayTitle size="lg" as="h1" rainbow={rainbow}>
        {title}
      </DisplayTitle>
      {subtitle && <p className="mana-hero__subtitle">{subtitle}</p>}
      {children && <div className="mana-hero__actions">{children}</div>}
    </section>
  );
}
