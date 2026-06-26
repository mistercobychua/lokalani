import type { ComponentType } from 'react'

interface Props {
  label: string
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  onClick?: () => void
  tone?: 'onGreen' | 'light' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

/**
 * Compact control that ALWAYS pairs an icon with a text label
 * (recognition over recall — never icon-only for real actions).
 */
export default function IconTextButton({
  label,
  icon: Icon,
  onClick,
  tone = 'light',
  size = 'sm',
  className = '',
}: Props) {
  const tones = {
    onGreen: 'bg-white/15 text-white hover:bg-white/25',
    light: 'bg-white text-green-deep border border-border hover:bg-green-tint',
    outline: 'bg-transparent text-green-deep border border-green/40 hover:bg-green-tint',
  }
  const pad = size === 'sm' ? 'px-2.5 py-1.5 text-[13px] gap-1.5' : 'px-3.5 py-2.5 text-[15px] gap-2'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center rounded-xl font-semibold transition-colors duration-150 active:scale-[0.97] ${tones[tone]} ${pad} ${className}`}
    >
      <Icon className={size === 'sm' ? 'size-[18px]' : 'size-5'} strokeWidth={2.4} />
      <span>{label}</span>
    </button>
  )
}
