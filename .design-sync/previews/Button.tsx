import * as React from 'react';
import { Button } from 'mana-yerba-mate-ds';

export const Primary = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button color="yellow">Shop</Button>
    <Button color="white">Learn</Button>
    <Button color="ink">Subscribe</Button>
  </div>
);

export const FlavourFills = () => (
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
    <Button color="yellow">Grapefruit</Button>
    <Button color="pink">Tropical Punch</Button>
    <Button color="blue">Blackberry &amp; Hibiscus</Button>
    <Button color="green">Melon &amp; Mint</Button>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button size="sm" color="white">
      Points of sale
    </Button>
    <Button size="md" color="yellow">
      All our products
    </Button>
    <Button size="lg" color="magenta" arrow>
      See all our products
    </Button>
  </div>
);

export const OutlineAndDisabled = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button outline color="ink">
      Terms of use
    </Button>
    <Button outline color="magenta">
      Refund policy
    </Button>
    <Button disabled color="yellow">
      Sold out
    </Button>
  </div>
);
