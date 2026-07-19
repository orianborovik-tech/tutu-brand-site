import * as React from 'react';
import { Badge, RoundButton } from 'mana-yerba-mate-ds';

export const CartCount = () => (
  <div style={{ background: '#fef7e6', padding: 20, display: 'flex', gap: 16 }}>
    <span style={{ position: 'relative', display: 'inline-flex' }}>
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
      <Badge corner>3</Badge>
    </span>
  </div>
);

export const Colours = () => (
  <div
    style={{
      background: '#fef7e6',
      padding: 20,
      display: 'flex',
      gap: 12,
      alignItems: 'center',
    }}
  >
    <Badge>1</Badge>
    <Badge>12</Badge>
    <Badge color="yellow">New</Badge>
    <Badge color="magenta">-10%</Badge>
  </div>
);
