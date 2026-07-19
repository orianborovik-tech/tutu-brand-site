import * as React from 'react';
import type { BrandColor } from '../tokens';

export interface RoundButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Circle fill colour. Defaults to white. */
  color?: BrandColor;
  /** Circle diameter. Defaults to md (56px). */
  size?: 'sm' | 'md' | 'lg';
  /** Remove the 1px ink border. */
  borderless?: boolean;
  /** Accessible label — required, the circle usually only shows an icon. */
  'aria-label': string;
  /** Icon or short text (e.g. "En", a cart glyph, an arrow). */
  children?: React.ReactNode;
}

/**
 * Circular icon button (the site's "btnRond") — used in the header for
 * cart/language, as slider arrows, and for social links.
 */
export const RoundButton = React.forwardRef<
  HTMLButtonElement,
  RoundButtonProps
>(function RoundButton(
  {
    color = 'white',
    size = 'md',
    borderless = false,
    children,
    className = '',
    ...rest
  },
  ref,
) {
  const cls = [
    'mana-roundbtn',
    `mana-roundbtn--${size}`,
    `mana-roundbtn--${color}`,
    borderless ? 'mana-roundbtn--borderless' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button ref={ref} type="button" className={cls} {...rest}>
      {children}
    </button>
  );
});
