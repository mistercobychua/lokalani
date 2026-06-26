interface Props {
  label: string
  emoji?: string
  active?: boolean
  onClick?: () => void
}

/** Selectable filter chip (visible choices — recognition over recall). */
export default function Chip({ label, emoji, active, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[14px] font-semibold transition-colors active:scale-95 ${
        active
          ? 'border-green bg-green text-white shadow-card'
          : 'border-border bg-white text-ink hover:bg-green-tint'
      }`}
    >
      {emoji && <span aria-hidden>{emoji}</span>}
      {label}
    </button>
  )
}
