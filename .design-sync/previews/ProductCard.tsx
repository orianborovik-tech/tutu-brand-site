import * as React from 'react';
import { ProductCard } from 'mana-yerba-mate-ds';

export const Grapefruit = () => (
  <div style={{ width: 320 }}>
    <ProductCard
      name="Grapefruit"
      flavor="grapefruit"
      quantityInfo="355 ml"
      price="$3.75"
    />
  </div>
);

export const WithCtaVisible = () => (
  <div style={{ width: 320 }}>
    <ProductCard
      name="Tropical Punch"
      flavor="tropical-punch"
      quantityInfo="355 ml"
      price="$3.75"
      showCta
    />
  </div>
);

export const AllFlavours = () => (
  <div style={{ display: 'flex', gap: 16 }}>
    <div style={{ width: 200 }}>
      <ProductCard name="Grapefruit" flavor="grapefruit" />
    </div>
    <div style={{ width: 200 }}>
      <ProductCard name="Tropical Punch" flavor="tropical-punch" />
    </div>
    <div style={{ width: 200 }}>
      <ProductCard name="Blackberry & Hibiscus" flavor="blackberry-hibiscus" />
    </div>
    <div style={{ width: 200 }}>
      <ProductCard name="Melon & Mint" flavor="melon-mint" />
    </div>
  </div>
);
