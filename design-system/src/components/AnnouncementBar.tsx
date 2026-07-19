import * as React from 'react';

export interface AnnouncementBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Bar colour. Defaults to ink (black bar, cream text). */
  color?: 'ink' | 'yellow' | 'pink' | 'blue' | 'green' | 'magenta';
  /** Show a ✕ close control. */
  closable?: boolean;
  /** Called when the close control is clicked. */
  onClose?: () => void;
  /** Announcement content, e.g. "Free shipping on all purchases of $35 or more". */
  children?: React.ReactNode;
}

/**
 * Slim uppercase announcement strip (the site's "bandeau") shown above the
 * header — free-shipping offers, promos.
 */
export function AnnouncementBar({
  color = 'ink',
  closable = false,
  onClose,
  children,
  className = '',
  ...rest
}: AnnouncementBarProps) {
  const cls = [
    'mana-announce',
    color !== 'ink' ? `mana-announce--${color}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={cls} role="status" {...rest}>
      {children}
      {closable && (
        <button
          type="button"
          className="mana-announce__close"
          aria-label="Close announcement"
          onClick={onClose}
        >
          ✕
        </button>
      )}
    </div>
  );
}
