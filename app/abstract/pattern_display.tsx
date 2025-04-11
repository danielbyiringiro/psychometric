import React from 'react';

const PatternDisplay: React.FC<React.SVGProps<SVGSVGElement>> = ({ children }) => (
  <svg viewBox="0 0 40 40" width="100" height="100" style={{ margin: '0 10px' }}>
    <g fill="none" stroke="currentColor" strokeWidth="2">
      {children}
    </g>
  </svg>
);

export default PatternDisplay;