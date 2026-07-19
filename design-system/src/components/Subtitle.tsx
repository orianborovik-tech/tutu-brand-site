import * as React from 'react';

export interface SubtitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  /** md matches the site's sousTitre scale; sm is a compact variant. */
  size?: 'md' | 'sm';
  as?: 'h2' | 'h3' | 'h4' | 'div';
}

/**
 * Uppercase section subtitle (the site's "sousTitre") — light weight,
 * line-height 1.
 */
export function Subtitle({
  children,
  size = 'md',
  as = 'h3',
  className = '',
  ...rest
}: SubtitleProps) {
  const El = as as 'h3';
  const cls = [
    'mana-subtitle',
    size === 'sm' ? 'mana-subtitle--sm' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <El className={cls} {...rest}>
      {children}
    </El>
  );
}
