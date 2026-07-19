/** The four Mana flavours and their signature colours. */
export const flavorColors = {
  grapefruit: '#ffd372',
  'tropical-punch': '#f6b1cf',
  'blackberry-hibiscus': '#88c1f8',
  'melon-mint': '#acd084',
} as const;

export type Flavor = keyof typeof flavorColors;

/** Fill colours shared by Button, RoundButton, sections, etc. */
export type BrandColor =
  | 'white'
  | 'cream'
  | 'yellow'
  | 'pink'
  | 'blue'
  | 'green'
  | 'magenta'
  | 'orange'
  | 'ink';

/** Maps a flavour to its brand colour name. */
export const flavorToColor: Record<Flavor, BrandColor> = {
  grapefruit: 'yellow',
  'tropical-punch': 'pink',
  'blackberry-hibiscus': 'blue',
  'melon-mint': 'green',
};
