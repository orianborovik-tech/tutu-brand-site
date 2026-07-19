import * as React from 'react';
import { Badge } from './Badge';
import { Button } from './Button';
import { RoundButton } from './RoundButton';

export interface HeaderNavItem {
  label: string;
  href: string;
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand mark. Defaults to the MANA wordmark. */
  logo?: React.ReactNode;
  /** Link for the logo. */
  logoHref?: string;
  /** Pill nav links (e.g. Shop, Learn). */
  nav?: HeaderNavItem[];
  /** Items in the cart; shows a corner Badge on the cart button when > 0. */
  cartCount?: number;
  onCartClick?: () => void;
  /** Current language toggle label (e.g. "Fr"). Hidden when omitted. */
  languageLabel?: string;
  onLanguageClick?: () => void;
}

/**
 * Site header: wordmark on the left, pill nav links and round
 * language/cart buttons on the right.
 */
export function Header({
  logo = 'MANA',
  logoHref = '#',
  nav = [],
  cartCount = 0,
  onCartClick,
  languageLabel,
  onLanguageClick,
  className = '',
  ...rest
}: HeaderProps) {
  return (
    <header className={`mana-header ${className}`.trim()} {...rest}>
      <a className="mana-header__logo" href={logoHref}>
        {logo}
      </a>
      <nav className="mana-header__nav" aria-label="Main">
        {nav.map((item) => (
          <Button key={item.label} href={item.href} size="sm">
            {item.label}
          </Button>
        ))}
        {languageLabel && (
          <RoundButton
            size="sm"
            aria-label="Switch language"
            onClick={onLanguageClick}
          >
            {languageLabel}
          </RoundButton>
        )}
        <span className="mana-header__cart">
          <RoundButton size="sm" aria-label="Open cart" onClick={onCartClick}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M6 8h12l-1.2 11a1.8 1.8 0 0 1-1.8 1.6H9a1.8 1.8 0 0 1-1.8-1.6L6 8Z" />
              <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
            </svg>
          </RoundButton>
          {cartCount > 0 && <Badge corner>{cartCount}</Badge>}
        </span>
      </nav>
    </header>
  );
}
