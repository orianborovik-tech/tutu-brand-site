import * as React from 'react';
import { Button, Card } from 'mana-yerba-mate-ds';

export const CookieNotice = () => (
  <div style={{ background: '#f6b1cf', padding: 24, maxWidth: 380 }}>
    <Card>
      <p style={{ margin: '0 0 12px' }}>This website uses cookies.</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button size="sm" color="white" outline>
          Decline
        </Button>
        <Button size="sm" color="ink">
          Okay
        </Button>
      </div>
    </Card>
  </div>
);

export const Paddings = () => (
  <div
    style={{
      background: '#fef7e6',
      padding: 24,
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start',
    }}
  >
    <Card padding="sm" bordered>
      Small padding
    </Card>
    <Card padding="md" bordered>
      Medium padding
    </Card>
    <Card padding="lg" bordered>
      Large padding
    </Card>
  </div>
);
