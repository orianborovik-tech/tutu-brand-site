import * as React from 'react';

export interface QuantitySelectorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current quantity. */
  value: number;
  /** Called with the next quantity when − / + is pressed. */
  onChange?: (next: number) => void;
  min?: number;
  max?: number;
}

/**
 * Pill-shaped − / + stepper used on cart lines.
 */
export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className = '',
  ...rest
}: QuantitySelectorProps) {
  return (
    <div className={`mana-qty ${className}`.trim()} {...rest}>
      <button
        type="button"
        className="mana-qty__btn"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange?.(Math.max(min, value - 1))}
      >
        −
      </button>
      <span className="mana-qty__value" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="mana-qty__btn"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange?.(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
