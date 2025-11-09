'use client';

import React from 'react';

const RECT_CONFIG = {
  horizontalTops: ['6%', '36%'],
  verticalLefts: ['15%', '88%'],
  strokeColor: 'currentColor',
  strokeWidth: 1,
  dashPattern: '6 8', 
};

const GridOverlay: React.FC = () => {
  const { horizontalTops, verticalLefts, strokeColor, strokeWidth, dashPattern } = RECT_CONFIG;

  const IntersectionMarker: React.FC<{ top: string; left: string }> = ({ top, left }) => (
    <div
      className="absolute"
      style={{
        top: `calc(${top} - 8px)`,
        left: `calc(${left} - 8px)`,
        width: '16px',
        height: '16px',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-350 dark:text-zinc-800"
      >
        <path d="M8 0V16" stroke="currentColor" strokeWidth="3" />
        <path d="M0 8H16" stroke="currentColor" strokeWidth="3" />
      </svg>
    </div>
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-0 text-black/35 dark:text-white/20">
      
      {/* Horizontal Broken Lines */}
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
            strokeDasharray={dashPattern}
          />
        </svg>
      ))}

      {/* Vertical Broken Lines */}
      {verticalLefts.map((left, i) => (
        <svg
          key={`v-line-${i}`}
          className="absolute top-0 h-150"
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
            strokeDasharray={dashPattern}
          />
        </svg>
      ))}

      {/* Plus Signs at Intersections */}
      {horizontalTops.map((top, hIndex) =>
        verticalLefts.map((left, vIndex) => (
          <IntersectionMarker key={`corner-${hIndex}-${vIndex}`} top={top} left={left} />
        ))
      )}
    </div>
  );
};

export default GridOverlay;
