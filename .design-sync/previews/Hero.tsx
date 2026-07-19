import * as React from 'react';
import { Button, Hero } from 'mana-yerba-mate-ds';

export const Home = () => (
  <Hero
    title="Yerba Mate"
    subtitle="Fresh, fruity, sparkling — an energizing infusion made in Quebec."
  >
    <Button color="yellow" size="lg">
      Shop
    </Button>
    <Button color="white" size="lg">
      Learn
    </Button>
  </Hero>
);

export const FlavourLaunch = () => (
  <Hero
    title="Tropical Punch"
    rainbow={false}
    color="pink"
    subtitle="Awaken your taste buds."
  >
    <Button color="white" size="lg" arrow>
      Discover this product
    </Button>
  </Hero>
);
