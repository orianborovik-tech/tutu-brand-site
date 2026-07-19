import * as React from 'react';
import { FeatureItem, FeatureRow } from 'mana-yerba-mate-ds';

export const Benefits = () => (
  <div style={{ background: '#fef7e6' }}>
    <FeatureRow>
      <FeatureItem icon="wave" title="Without the crash">
        A gentle wave of energy. To get you going without the crash.
      </FeatureItem>
      <FeatureItem icon="leaf" title="Natural caffeine">
        This certified organic caffeine comes from the plant.
      </FeatureItem>
      <FeatureItem icon="sparkle" title="Antioxidant">
        Richer in antioxidants than tea. Not bad.
      </FeatureItem>
      <FeatureItem icon="plant" title="Vegan">
        A plant-based drink that tastes like heaven.
      </FeatureItem>
    </FeatureRow>
  </div>
);
