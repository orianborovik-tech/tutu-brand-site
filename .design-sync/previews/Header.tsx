import * as React from 'react';
import { Header } from 'mana-yerba-mate-ds';

export const Default = () => (
  <div style={{ background: '#fef7e6' }}>
    <Header
      nav={[
        { label: 'Shop', href: '#' },
        { label: 'Learn', href: '#' },
      ]}
      languageLabel="Fr"
      cartCount={2}
    />
  </div>
);

export const EmptyCart = () => (
  <div style={{ background: '#ffd372' }}>
    <Header
      nav={[
        { label: 'Shop', href: '#' },
        { label: 'Points of sale', href: '#' },
        { label: 'FAQ', href: '#' },
      ]}
      cartCount={0}
    />
  </div>
);
