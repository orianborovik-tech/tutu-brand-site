import * as React from 'react';
import { Marquee } from 'mana-yerba-mate-ds';

export const OnCream = () => (
  <div style={{ background: '#fef7e6', padding: '24px 0' }}>
    <Marquee text="Yerba Mate" />
  </div>
);

export const YellowStrip = () => (
  <Marquee text="Free shipping from $35" color="yellow" separator="✦" />
);

export const InkReversed = () => (
  <Marquee text="We have what you need" color="ink" reverse />
);
