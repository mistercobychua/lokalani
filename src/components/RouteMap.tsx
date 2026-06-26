import { useId } from 'react'
import { useReducedMotion } from '../lib/useReducedMotion'

export interface MapStop {
  label: string
  type: 'pickup' | 'drop'
}

interface Props {
  stops: MapStop[]
  showRing?: boolean // 2 km alert radius
  activeIndex?: number // highlight current stop (active delivery)
}

const LAYOUTS: Record<number, [number, number][]> = {
  1: [[160, 110]],
  2: [[64, 150], [250, 72]],
  3: [[56, 152], [160, 84], [264, 142]],
  4: [[52, 156], [124, 80], [206, 148], [278, 72]],
  5: [[48, 152], [110, 90], [172, 150], [234, 84], [288, 140]],
}

/** Stylized faux map: 2 km ring, pickup + drop pins, dashed route, moving tricycle. */
export default function RouteMap({ stops, showRing = true, activeIndex }: Props) {
  const reduced = useReducedMotion()
  const uid = useId().replace(/:/g, '')
  const n = Math.min(stops.length, 5)
  const pts = LAYOUTS[n] ?? LAYOUTS[5]
  const [px, py] = pts[0]
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')

  return (
    <div className="overflow-hidden rounded-card border border-border bg-white shadow-card">
      <svg viewBox="0 0 320 200" className="block w-full" role="img" aria-label="Mapa ng ruta">
        <defs>
          <clipPath id={`clip-${uid}`}>
            <rect x="0" y="0" width="320" height="200" rx="20" />
          </clipPath>
          <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#eef3ec" />
            <stop offset="1" stopColor="#e3ece3" />
          </linearGradient>
        </defs>

        <g clipPath={`url(#clip-${uid})`}>
          <rect x="0" y="0" width="320" height="200" fill={`url(#bg-${uid})`} />

          {/* faint "streets" */}
          <g stroke="#d4ddd2" strokeWidth="6" opacity="0.7">
            <line x1="-10" y1="46" x2="330" y2="64" />
            <line x1="-10" y1="128" x2="330" y2="112" />
            <line x1="86" y1="-10" x2="64" y2="210" />
            <line x1="228" y1="-10" x2="248" y2="210" />
          </g>
          <g fill="#dde6db" opacity="0.6">
            <rect x="18" y="76" width="44" height="36" rx="5" />
            <rect x="120" y="120" width="50" height="40" rx="5" />
            <rect x="190" y="20" width="48" height="34" rx="5" />
            <rect x="256" y="150" width="40" height="34" rx="5" />
          </g>

          {/* 2 km ring around pickup */}
          {showRing && (
            <g>
              <circle cx={px} cy={py} r="86" fill="#4a7c59" fillOpacity="0.07" stroke="#4a7c59" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="5 5" />
              <text x={px} y={py - 88} textAnchor="middle" fontSize="11" fontWeight="700" fill="#34573f">
                2 km radius
              </text>
            </g>
          )}

          {/* dashed route */}
          <path d={pathD} fill="none" stroke="#4a7c59" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" opacity="0.85" />

          {/* moving tricycle */}
          {n > 1 && (
            <g>
              <circle r="6" fill="#34573f" stroke="#fff" strokeWidth="2">
                {!reduced && (
                  <animateMotion dur="5.5s" repeatCount="indefinite" rotate="auto" path={pathD} />
                )}
              </circle>
            </g>
          )}

          {/* pins */}
          {pts.map(([x, y], i) => {
            const isPickup = i === 0
            const isActive = activeIndex === i
            return (
              <g key={i}>
                {isActive && <circle cx={x} cy={y} r="18" fill="#4a7c59" fillOpacity="0.18" />}
                <circle
                  cx={x}
                  cy={y}
                  r={isPickup ? 12 : 11}
                  fill={isPickup ? '#4a7c59' : '#ffffff'}
                  stroke={isPickup ? '#ffffff' : '#4a7c59'}
                  strokeWidth={isPickup ? 2.5 : 2.5}
                />
                {isPickup ? (
                  <circle cx={x} cy={y} r="4" fill="#ffffff" />
                ) : (
                  <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="800" fill="#34573f">
                    {i}
                  </text>
                )}
              </g>
            )
          })}
        </g>
      </svg>

      {/* legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-3.5 py-2.5 text-[12.5px]">
        <span className="flex items-center gap-1.5 font-semibold text-green-deep">
          <span className="grid size-4 place-items-center rounded-full bg-green ring-2 ring-white">
            <span className="size-1.5 rounded-full bg-white" />
          </span>
          Pickup
        </span>
        <span className="flex items-center gap-1.5 font-semibold text-muted">
          <span className="size-4 rounded-full border-2 border-green bg-white" /> Drop-off
        </span>
        {showRing && <span className="ml-auto text-muted">Loob ng 2 km zone</span>}
      </div>
    </div>
  )
}
