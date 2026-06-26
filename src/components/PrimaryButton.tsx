import type { ComponentType, ReactNode } from 'react'

interface Props {
  label: string
  /** Outcome line, e.g. "makukuha mo agad" — names the result (recognition over recall). */
  sub?: string
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'amber' | 'danger' | 'ghost'
  type?: 'button' | 'submit'
  children?: ReactNode
}

const variants = {
  primary: 'bg-green text-white shadow-pop hover:bg-green-dark',
  amber: 'bg-amber text-ink shadow-pop hover:brightness-95',
  danger: 'bg-danger-deep text-white shadow-pop hover:brightness-95',
  ghost: 'bg-white text-green-deep border border-border hover:bg-green-tint',
}

/**
 * Large, bottom-anchored primary action. Names the verb AND the outcome.
 * Disabled until requirements are met (error prevention).
 */
export default function PrimaryButton({
  label,
  sub,
  icon: Icon,
  onClick,
  disabled,
  variant = 'primary',
  type = 'button',
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`tap-target flex w-full items-center justify-center gap-2.5 rounded-2xl px-5 py-3.5 text-center transition-[transform,background-color,filter] duration-150 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none ${variants[variant]}`}
    >
      {Icon && <Icon className="size-5 shrink-0" strokeWidth={2.4} />}
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[17px] font-bold font-heading tracking-tight">{label}</span>
        {sub && <span className="text-[13px] font-medium opacity-90">{sub}</span>}
      </span>
    </button>
  )
}
