import * as React from 'react';
import { DisplayTitle } from './DisplayTitle';
import { RoundButton } from './RoundButton';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocial {
  /** Short label shown in the circle, e.g. "IG". */
  label: string;
  href: string;
  /** Accessible name, e.g. "Instagram". */
  name: string;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Giant centered brand title. Defaults to "MANA". */
  brand?: string;
  /** Colour every brand letter from the palette. */
  rainbow?: boolean;
  /** Social circles at the top left. */
  socials?: FooterSocial[];
  /** Bottom link row (Terms of use, Refund policy, …). */
  links?: FooterLink[];
  /** Copyright line, e.g. "2026 © Mana Yerba Maté". */
  copyright?: string;
}

/**
 * Site footer — social circles, a giant display wordmark, a 1px rule and a
 * bottom row with copyright and legal links.
 */
export function Footer({
  brand = 'MANA',
  rainbow = false,
  socials = [],
  links = [],
  copyright = '',
  className = '',
  ...rest
}: FooterProps) {
  return (
    <footer className={`mana-footer ${className}`.trim()} {...rest}>
      {socials.length > 0 && (
        <div className="mana-footer__socials">
          {socials.map((s) => (
            <RoundButton
              key={s.label}
              size="sm"
              aria-label={s.name}
              onClick={() => {
                window.location.href = s.href;
              }}
            >
              {s.label}
            </RoundButton>
          ))}
        </div>
      )}
      <div className="mana-footer__title">
        <DisplayTitle size="lg" as="div" rainbow={rainbow}>
          {brand}
        </DisplayTitle>
      </div>
      <hr className="mana-footer__rule" />
      <div className="mana-footer__bottom">
        {copyright && <span>{copyright}</span>}
        <ul className="mana-footer__links">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
