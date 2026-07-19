import * as React from 'react';
import { AnnouncementBar } from 'mana-yerba-mate-ds';

export const FreeShipping = () => (
  <AnnouncementBar>
    Free shipping on all purchases of $35 or more — Quebec and Ontario
  </AnnouncementBar>
);

export const Closable = () => (
  <AnnouncementBar color="yellow" closable>
    Sign up for automatic delivery and save 10%
  </AnnouncementBar>
);

export const Colours = () => (
  <div style={{ display: 'grid', gap: 8 }}>
    <AnnouncementBar color="pink">New flavour: Tropical Punch</AnnouncementBar>
    <AnnouncementBar color="magenta">
      Discovery box — 4 flavours, one box
    </AnnouncementBar>
  </div>
);
