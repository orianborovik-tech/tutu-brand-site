import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Count or short text inside the dot. */
  children?: React.ReactNode;
  /** Dot colour. Defaults to ink. */
  color?: 'ink' | 'yellow' | 'magenta';
  /** Pin the badge to the top-right corner of a relatively-positioned parent. */
  corner?: boolean;
}

/**
 * Tiny circular counter (the site's "pastille") — e.g. the cart item count
 * pinned to the corner of a RoundButton.
 */
export function Badge({
  children,
  color = 'ink',
  corner = false,
  className = '',
  ...rest
}: BadgeProps) {
  const cls = [
    'mana-badge',
    color !== 'ink' ? `mana-badge--${color}` : '',
    corner ? 'mana-badge--corner' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  );
}
