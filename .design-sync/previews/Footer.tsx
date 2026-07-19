import * as React from 'react';
import { Footer } from 'mana-yerba-mate-ds';

export const Default = () => (
  <Footer
    brand="MANA"
    rainbow
    socials={[
      { label: 'IG', href: '#', name: 'Instagram' },
      { label: 'FB', href: '#', name: 'Facebook' },
      { label: 'TK', href: '#', name: 'TikTok' },
    ]}
    links={[
      { label: 'Terms of use', href: '#' },
      { label: 'Refund policy', href: '#' },
      { label: 'Credits', href: '#' },
    ]}
    copyright="2026 © Mana Yerba Maté"
  />
);

export const Plain = () => (
  <Footer
    brand="MANA"
    links={[
      { label: 'Terms of use', href: '#' },
      { label: 'Refund policy', href: '#' },
    ]}
    copyright="2026 © Mana Yerba Maté"
  />
);
