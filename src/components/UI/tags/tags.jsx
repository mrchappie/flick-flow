import React from 'react';

export function TagWithBg({ children, customStyle = '' }) {
  return (
    <span
      className={`min-w-[100px] bg-brand1 center p-1 rounded-md ${customStyle}`}
    >
      {children}
    </span>
  );
}

export function TagWithBorder({ children, customStyle }) {
  return (
    <span className="min-w-[100px] border border-brand1 center p-1 rounded-md">
      {children}
    </span>
  );
}
