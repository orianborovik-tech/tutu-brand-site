import * as React from 'react';

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Text repeated along the ticker. */
  text: string;
  /** Separator glyph between repeats. Defaults to ✳. */
  separator?: string;
  /** Strip colour. Defaults to transparent on the page background. */
  color?: 'none' | 'yellow' | 'pink' | 'blue' | 'green' | 'magenta' | 'ink';
  /** Seconds per loop. Defaults to 18. */
  duration?: number;
  /** Scroll right-to-left reversed. */
  reverse?: boolean;
  /** Remove the top/bottom hairlines. */
  borderless?: boolean;
}

/**
 * Infinite uppercase ticker strip between sections — big light type with
 * ✳ separators, 1px hairlines top and bottom.
 */
export function Marquee({
  text,
  separator = '✳',
  color = 'none',
  duration = 18,
  reverse = false,
  borderless = false,
  className = '',
  style,
  ...rest
}: MarqueeProps) {
  const cls = [
    'mana-marquee',
    color !== 'none' ? `mana-marquee--${color}` : '',
    reverse ? 'mana-marquee--reverse' : '',
    borderless ? 'mana-marquee--borderless' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const items = Array.from({ length: 6 });
  const half = (key: string, hidden: boolean) => (
    <React.Fragment key={key}>
      {items.map((_, i) => (
        <span
          key={i}
          className="mana-marquee__item"
          aria-hidden={hidden || i > 0 ? 'true' : undefined}
        >
          <span>{text}</span>
          <span className="mana-marquee__sep">{separator}</span>
        </span>
      ))}
    </React.Fragment>
  );
  return (
    <div
      className={cls}
      style={
        {
          ...style,
          '--mana-marquee-duration': `${duration}s`,
        } as React.CSSProperties
      }
      {...rest}
    >
      <div className="mana-marquee__track">
        {half('a', false)}
        {half('b', true)}
      </div>
    </div>
  );
}
