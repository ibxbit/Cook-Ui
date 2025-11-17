'use client';

import React from 'react';

const RECT_CONFIG = {
  horizontalTops: ['36.5%', '33%', '87.5%', '91.2%'], 
  verticalLefts: ['12.2%', '87.79%'], // Original Solid Vertical Lines
  // vertical broken lines
  verticalBrokenLefts: ['25%', '76%'],
  strokeColor: 'currentColor',
  strokeWidth: 1,
  dashPattern: '4 ', 
};

const GridOverlay: React.FC = () => {
  const { horizontalTops, verticalLefts, verticalBrokenLefts, strokeColor, strokeWidth, dashPattern } = RECT_CONFIG;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 text-black/35 dark:text-white/20">
      
      {/* Horizontal Lines (Broken, Solid, Broken, Solid) */}
      {horizontalTops.map((top, i) => (
        <svg
          key={`h-line-${i}`}
          className="absolute left-0 w-full"
          style={{ top }}
          height="1"
          width="100%"
        >
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            // Apply strokeDasharray for broken lines at index 0 and 2
            strokeDasharray={i % 2 === 0 ? dashPattern : undefined} 
          />
        </svg>
      ))}

      {/* 1. Vertical Solid Lines (Original two lines - FIXED POSITIONING) */}
      {verticalLefts.map((left, i) => (
        <svg
          key={`v-solid-line-${i}`}
          className="fixed top-0 h-screen"
          style={{ left }}
          width="1"
          height="100%"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            // No strokeDasharray applied (Solid)
          />
        </svg>
      ))}
      
      {/* 2. Vertical BROKEN Lines (The two new lines) */}
      {verticalBrokenLefts.map((left, i) => (
        <svg
          key={`v-broken-line-${i}`}
          className="fixed top-120 h-[60vh]"
          style={{ left }}
          width="1"
          height="100%"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            // strokeDasharray applied (Broken)
            strokeDasharray={dashPattern}
          />
        </svg>
      ))}
    </div>
  );
};

export default GridOverlay;