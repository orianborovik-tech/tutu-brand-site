import * as React from 'react';
import { SubscribeBanner } from 'mana-yerba-mate-ds';

export const Save10 = () => (
  <SubscribeBanner
    title="We have what you need"
    note="* We don't deliver in space yet, but who knows..."
  >
    Sign up for automatic delivery and save 10%.
  </SubscribeBanner>
);

export const PinkInstagram = () => (
  <SubscribeBanner
    title="@manayerbamate"
    color="pink"
    ctaLabel="Follow us"
  >
    For a dose of energy in your feed.
  </SubscribeBanner>
);
