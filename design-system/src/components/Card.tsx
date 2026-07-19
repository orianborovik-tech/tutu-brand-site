import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inner padding. Defaults to md (20px). */
  padding?: 'sm' | 'md' | 'lg';
  /** Add a 1px ink border. */
  bordered?: boolean;
  children?: React.ReactNode;
}

/**
 * Soft-cornered white surface (radius .75em) — dialogs, popovers, and small
 * informational panels like the site's cookie notice.
 */
export function Card({
  padding = 'md',
  bordered = false,
  children,
  className = '',
  ...rest
}: CardProps) {
  const cls = [
    'mana-card',
    `mana-card--${padding}`,
    bordered ? 'mana-card--bordered' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}
