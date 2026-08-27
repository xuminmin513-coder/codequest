import React from 'react';

export default function BrandMark({ compact = false }) {
  return (
    <span className={`brand-lockup${compact ? ' compact' : ''}`} aria-label="XM squared code">
      <span className="brand-mark" aria-hidden="true">XM²</span>
      {!compact && <span className="brand-wordmark">XM²code</span>}
    </span>
  );
}
