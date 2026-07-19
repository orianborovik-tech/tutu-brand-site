import * as React from 'react';
import { RoundButton } from 'mana-yerba-mate-ds';

const row: React.CSSProperties = {
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  background: '#fef7e6',
  padding: 20,
};

export const HeaderControls = () => (
  <div style={row}>
    <RoundButton size="sm" aria-label="Switch language">
      Fr
    </RoundButton>
    <RoundButton size="sm" aria-label="Open cart">
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
    <RoundButton size="md" aria-label="Next slide" color="yellow">
      →
    </RoundButton>
    <RoundButton size="md" aria-label="Previous slide" color="yellow">
      ←
    </RoundButton>
  </div>
);

export const SocialCircles = () => (
  <div style={row}>
    <RoundButton size="sm" aria-label="Instagram">
      IG
    </RoundButton>
    <RoundButton size="sm" aria-label="Facebook">
      FB
    </RoundButton>
    <RoundButton size="sm" aria-label="TikTok">
      TK
    </RoundButton>
  </div>
);

export const ColoursAndSizes = () => (
  <div style={row}>
    <RoundButton size="sm" aria-label="Pink" color="pink">
      ✳
    </RoundButton>
    <RoundButton size="md" aria-label="Blue" color="blue">
      ✳
    </RoundButton>
    <RoundButton size="lg" aria-label="Ink" color="ink">
      ✳
    </RoundButton>
    <RoundButton size="md" aria-label="Magenta borderless" color="magenta" borderless>
      ✳
    </RoundButton>
  </div>
);
