export type FreshLevel = 'fresh' | 'aging' | 'last'

interface FreshInfo {
  level: FreshLevel
  /** Tailwind text colour token */
  text: string
  /** Tailwind background tint token */
  tint: string
  /** Solid dot / accent token */
  dot: string
  /** Plain Taglish label */
  label: string
}

/**
 * Freshness colour logic (per brief):
 *  🟢 green  fresh    (>70%)
 *  🟡 amber  aging    (60–70%)
 *  🔴 danger last-call(<60%)
 */
export function freshness(pct: number, freshUntil: string): FreshInfo {
  if (pct > 70) {
    return {
      level: 'fresh',
      text: 'text-green-deep',
      tint: 'bg-green-tint',
      dot: 'bg-green',
      label: `Sariwa hanggang ${freshUntil}`,
    }
  }
  if (pct >= 60) {
    return {
      level: 'aging',
      text: 'text-amber-deep',
      tint: 'bg-amber-tint',
      dot: 'bg-amber',
      label: `Bagsak-presyo na — hanggang ${freshUntil}`,
    }
  }
  return {
    level: 'last',
    text: 'text-danger-deep',
    tint: 'bg-danger-tint',
    dot: 'bg-danger',
    label: `Huling tawag — bilhin bago ${freshUntil}`,
  }
}
