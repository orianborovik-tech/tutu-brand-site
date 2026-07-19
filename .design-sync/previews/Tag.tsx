import * as React from 'react';
import { Tag } from 'mana-yerba-mate-ds';

const row: React.CSSProperties = {
  background: '#fef7e6',
  padding: 20,
  display: 'flex',
  gap: 10,
  flexWrap: 'wrap',
  alignItems: 'center',
};

export const FlavourTags = () => (
  <div style={row}>
    <Tag color="yellow">Grapefruit</Tag>
    <Tag color="pink">Tropical Punch</Tag>
    <Tag color="blue">Blackberry &amp; Hibiscus</Tag>
    <Tag color="green">Melon &amp; Mint</Tag>
  </div>
);

export const WithDots = () => (
  <div style={row}>
    <Tag dot>Certified organic</Tag>
    <Tag dot color="cream">
      Vegan
    </Tag>
    <Tag dot color="yellow">
      Natural caffeine
    </Tag>
  </div>
);
