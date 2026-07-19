import * as React from 'react';
import { DisplayTitle } from 'mana-yerba-mate-ds';

const cream: React.CSSProperties = { background: '#fef7e6', padding: 24 };

export const Rainbow = () => (
  <div style={cream}>
    <DisplayTitle size="sm" rainbow as="h1">
      Yerba Mate
    </DisplayTitle>
  </div>
);

export const Plain = () => (
  <div style={cream}>
    <DisplayTitle size="sm" as="h2">
      Recommended products
    </DisplayTitle>
  </div>
);

export const TwoLines = () => (
  <div style={{ ...cream, maxWidth: 480 }}>
    <DisplayTitle size="sm" rainbow as="h2">
      We have what you need
    </DisplayTitle>
  </div>
);
