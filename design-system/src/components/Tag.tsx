import * as React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Fill colour. Defaults to white. */
  color?: 'white' | 'cream' | 'yellow' | 'pink' | 'blue' | 'green';
  /** Show a small ink dot before the label. */
  dot?: boolean;
  children?: React.ReactNode;
}

/**
 * Small uppercase pill label — flavour tags, filters, metadata chips.
 */
export function Tag({
  color = 'white',
  dot = false,
  children,
  className = '',
  ...rest
}: TagProps) {
  const cls = [
    'mana-tag',
    color !== 'white' ? `mana-tag--${color}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={cls} {...rest}>
      {dot && <span className="mana-tag__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
