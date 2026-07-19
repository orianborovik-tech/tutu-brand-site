import * as React from 'react';
import type { BrandColor } from '../tokens';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Pill fill colour. Defaults to white. */
  color?: BrandColor;
  /** Pill size. Defaults to md. */
  size?: 'sm' | 'md' | 'lg';
  /** Transparent pill with a coloured border/text. */
  outline?: boolean;
  /** Append a trailing arrow (→). */
  arrow?: boolean;
  /** Render as an anchor pointing at this URL instead of a button. */
  href?: string;
  children?: React.ReactNode;
}

/**
 * Uppercase pill button — the primary Mana action. 1px ink border,
 * fully rounded, springs slightly on hover.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      color = 'white',
      size = 'md',
      outline = false,
      arrow = false,
      href,
      children,
      className = '',
      ...rest
    },
    ref,
  ) {
    const cls = [
      'mana-btn',
      `mana-btn--${size}`,
      `mana-btn--${color}`,
      outline ? 'mana-btn--outline' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');
    const content = (
      <>
        {children}
        {arrow && (
          <span className="mana-btn__arrow" aria-hidden="true">
            →
          </span>
        )}
      </>
    );
    if (href) {
      return (
        <a
          className={cls}
          href={href}
          {...(rest as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }
    return (
      <button ref={ref} type="button" className={cls} {...rest}>
        {content}
      </button>
    );
  },
);
