import * as React from 'react';
import { Button } from './Button';
import { DisplayTitle } from './DisplayTitle';

export interface SubscribeBannerProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Big uppercase headline. Defaults to "We have what you need". */
  title?: string;
  /** Supporting copy above the CTA. */
  children?: React.ReactNode;
  /** CTA pill label. Defaults to "Subscribe". */
  ctaLabel?: string;
  onCta?: () => void;
  /** Section colour. Defaults to yellow. */
  color?: 'yellow' | 'pink' | 'blue' | 'green' | 'cream' | 'magenta';
  /** Small footnote under the CTA. */
  note?: string;
}

/**
 * Full-width promo section — big display headline, short copy, one pill CTA.
 * Modeled on the site's "Sign up for automatic delivery and save 10%" block.
 */
export function SubscribeBanner({
  title = 'We have what you need',
  children,
  ctaLabel = 'Subscribe',
  onCta,
  color = 'yellow',
  note,
  className = '',
  ...rest
}: SubscribeBannerProps) {
  const cls = [
    'mana-subscribe',
    color !== 'yellow' ? `mana-subscribe--${color}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <section className={cls} {...rest}>
      <DisplayTitle size="sm" as="h2">
        {title}
      </DisplayTitle>
      {children && <p className="mana-subscribe__text">{children}</p>}
      <Button size="lg" color={color === 'cream' ? 'yellow' : 'white'} onClick={onCta}>
        {ctaLabel}
      </Button>
      {note && <span className="mana-subscribe__note">{note}</span>}
    </section>
  );
}
