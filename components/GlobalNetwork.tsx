'use client';

import { useId } from 'react';

/**
 * Decorative world-map / global-network graphic:
 * dotted continents + animated gold connection arcs + pulsing hub nodes.
 * Purely presentational (aria-hidden).
 */
export default function GlobalNetwork({ className }: { className?: string }) {
  const uid = useId().replace(/[:]/g, '');
  const dotId = `dots-${uid}`;
  const maskId = `mask-${uid}`;

  const continents: Array<[number, number, number, number]> = [
    [185, 150, 125, 92], // North America
    [360, 72, 46, 30], // Greenland
    [250, 322, 58, 108], // South America
    [492, 128, 58, 46], // Europe
    [512, 282, 76, 116], // Africa
    [700, 150, 152, 92], // Asia
    [802, 362, 56, 44], // Australia
  ];

  const arcs = [
    'M185 170 Q340 70 490 150',
    'M490 150 Q600 90 690 160',
    'M510 280 Q620 235 706 214',
    'M492 132 Q505 210 510 278',
    'M690 160 Q780 250 802 360',
    'M250 318 Q300 180 434 140',
  ];

  const nodes: Array<[number, number]> = [
    [490, 150],
    [185, 170],
    [690, 160],
    [510, 280],
    [802, 360],
    [250, 320],
    [706, 214],
  ];

  return (
    <svg className={className} viewBox="0 0 1000 500" fill="none" aria-hidden preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={dotId} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="currentColor" opacity="0.5" />
        </pattern>
        <mask id={maskId}>
          <rect width="1000" height="500" fill="black" />
          {continents.map(([cx, cy, rx, ry], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="white" />
          ))}
        </mask>
      </defs>

      {/* dotted landmasses */}
      <rect width="1000" height="500" fill={`url(#${dotId})`} mask={`url(#${maskId})`} />

      {/* connection arcs */}
      {arcs.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="net-arc"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}

      {/* pulsing hubs */}
      {nodes.map(([cx, cy], i) => (
        <g key={i} className="net-node" style={{ animationDelay: `${i * 0.45}s` }}>
          <circle cx={cx} cy={cy} r="9" fill="currentColor" opacity="0.16" />
          <circle cx={cx} cy={cy} r="3.2" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}
