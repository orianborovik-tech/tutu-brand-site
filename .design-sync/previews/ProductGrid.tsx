import * as React from 'react';
import { ProductCard, ProductGrid } from 'mana-yerba-mate-ds';

export const ShopGrid = () => (
  <div style={{ maxWidth: 900 }}>
    <ProductGrid columns={3}>
      <ProductCard
        name="Grapefruit"
        flavor="grapefruit"
        quantityInfo="355 ml"
        price="$3.75"
      />
      <ProductCard
        name="Tropical Punch"
        flavor="tropical-punch"
        quantityInfo="355 ml"
        price="$3.75"
      />
      <ProductCard
        name="Blackberry & Hibiscus"
        flavor="blackberry-hibiscus"
        quantityInfo="355 ml"
        price="$3.75"
      />
      <ProductCard
        name="Melon & Mint"
        flavor="melon-mint"
        quantityInfo="355 ml"
        price="$3.75"
      />
      <ProductCard
        name="Discovery box"
        flavor="grapefruit"
        quantityInfo="12 cans"
        price="$42.00"
      />
      <ProductCard
        name="Tropical Punch"
        flavor="tropical-punch"
        quantityInfo="Box of 12"
        price="$42.00"
      />
    </ProductGrid>
  </div>
);

export const TwoColumns = () => (
  <div style={{ maxWidth: 600 }}>
    <ProductGrid columns={2}>
      <ProductCard name="Grapefruit" flavor="grapefruit" />
      <ProductCard name="Melon & Mint" flavor="melon-mint" />
    </ProductGrid>
  </div>
);
