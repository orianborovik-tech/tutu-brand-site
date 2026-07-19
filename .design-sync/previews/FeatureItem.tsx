import * as React from 'react';
import { FeatureItem } from 'mana-yerba-mate-ds';

export const WithoutTheCrash = () => (
  <div style={{ background: '#fef7e6', padding: 24, display: 'flex', justifyContent: 'center' }}>
    <FeatureItem icon="wave" title="Without the crash">
      A gentle wave of energy. To get you going without the crash.
    </FeatureItem>
  </div>
);

export const AllIcons = () => (
  <div
    style={{
      background: '#fef7e6',
      padding: 24,
      display: 'flex',
      gap: 32,
      justifyContent: 'center',
      flexWrap: 'wrap',
    }}
  >
    <FeatureItem icon="wave" title="Without the crash" />
    <FeatureItem icon="leaf" title="Natural caffeine" />
    <FeatureItem icon="sparkle" title="Antioxidant" />
    <FeatureItem icon="plant" title="Vegan" />
  </div>
);
