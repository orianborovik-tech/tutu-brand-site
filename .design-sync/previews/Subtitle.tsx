import * as React from 'react';
import { Subtitle } from 'mana-yerba-mate-ds';

const cream: React.CSSProperties = { background: '#fef7e6', padding: 24 };

export const Default = () => (
  <div style={cream}>
    <Subtitle>All our products</Subtitle>
  </div>
);

export const Small = () => (
  <div style={cream}>
    <Subtitle size="sm">Fresh, fruity, sparkling</Subtitle>
  </div>
);
