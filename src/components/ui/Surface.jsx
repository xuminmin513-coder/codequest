import React from 'react';

export default function Surface({ as: Tag = 'section', className = '', children, ...props }) {
  return <Tag className={`ui-surface ${className}`.trim()} {...props}>{children}</Tag>;
}
