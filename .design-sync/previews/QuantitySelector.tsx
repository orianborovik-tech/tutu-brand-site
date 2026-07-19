import * as React from 'react';
import { QuantitySelector } from 'mana-yerba-mate-ds';

export const Default = () => (
  <div style={{ background: '#fef7e6', padding: 20, display: 'flex', gap: 16 }}>
    <QuantitySelector value={2} />
  </div>
);

export const AtMinimum = () => (
  <div style={{ background: '#fef7e6', padding: 20, display: 'flex', gap: 16 }}>
    <QuantitySelector value={1} />
    <QuantitySelector value={12} max={12} />
  </div>
);
