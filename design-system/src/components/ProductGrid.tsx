import * as React from 'react';

export interface ProductGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Columns. Defaults to 3, like the site's shop grid. */
  columns?: 2 | 3 | 4;
  /** ProductCard children. */
  children?: React.ReactNode;
}

/**
 * Hairline-bordered grid of ProductCards — collapses the 1px ink borders
 * between tiles like the site's shop page.
 */
export function ProductGrid({
  columns = 3,
  children,
  className = '',
  style,
  ...rest
}: ProductGridProps) {
  return (
    <div
      className={`mana-productgrid ${className}`.trim()}
      style={
        {
          ...style,
          '--mana-productgrid-cols': columns,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </div>
  );
}
