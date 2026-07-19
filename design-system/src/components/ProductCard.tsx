import * as React from 'react';
import { flavorToColor, type Flavor } from '../tokens';

/** Simple stylised can, used when no product image is supplied. */
function CanArt() {
  return (
    <svg
      className="mana-product__art"
      viewBox="0 0 200 340"
      fill="none"
      aria-hidden="true"
    >
      <rect x="20" y="30" width="160" height="290" rx="26" fill="#ffffff" />
      <rect
        x="20"
        y="30"
        width="160"
        height="290"
        rx="26"
        stroke="#0e0e0e"
        strokeWidth="3"
      />
      <ellipse
        cx="100"
        cy="30"
        rx="80"
        ry="16"
        fill="#f1f1f1"
        stroke="#0e0e0e"
        strokeWidth="3"
      />
      <rect x="20" y="110" width="160" height="110" fill="currentColor" />
      <text
        x="100"
        y="185"
        textAnchor="middle"
        fontFamily="'Neue Montreal 2020', Arial, sans-serif"
        fontWeight="500"
        fontSize="46"
        fill="#0e0e0e"
      >
        MANA
      </text>
    </svg>
  );
}

export interface ProductCardProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  /** Flavour name shown at the top, e.g. "Grapefruit". */
  name: string;
  /** Flavour — sets the card's background colour. */
  flavor?: Flavor;
  /** Product photo URL; a stylised can is drawn when omitted. */
  image?: string;
  /** e.g. "$3.75" */
  price?: string;
  /** e.g. "355 ml" or "Box of 12" */
  quantityInfo?: string;
  /** Hover CTA pill label. Defaults to "Discover this product". */
  ctaLabel?: string;
  /** Force the hover CTA visible (for touch/preview contexts). */
  showCta?: boolean;
  href?: string;
}

/**
 * Product tile from the shop grid: flavour-coloured background, uppercase
 * flavour name, product art, and a white CTA pill revealed on hover.
 * 1px ink hairline border — compose in a ProductGrid for the full look.
 */
export function ProductCard({
  name,
  flavor = 'grapefruit',
  image,
  price,
  quantityInfo,
  ctaLabel = 'Discover this product',
  showCta = false,
  href = '#',
  className = '',
  ...rest
}: ProductCardProps) {
  const color = flavorToColor[flavor];
  const cls = [
    'mana-product',
    `mana-product--${color}`,
    showCta ? 'mana-product--cta' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <a className={cls} href={href} {...rest}>
      <span className="mana-product__name">{name}</span>
      {(price || quantityInfo) && (
        <span className="mana-product__meta">
          {quantityInfo && <span>{quantityInfo}</span>}
          {price && <span>{price}</span>}
        </span>
      )}
      {image ? (
        <img className="mana-product__img" src={image} alt={name} />
      ) : (
        <CanArt />
      )}
      <span className="mana-product__cta">{ctaLabel}</span>
      <span className="mana-product__ctaround" aria-hidden="true">
        →
      </span>
    </a>
  );
}
