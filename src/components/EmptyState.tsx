import type { ReactNode } from 'react'

interface Props {
  emoji: string
  title: string
  body: string
  action?: ReactNode
}

/** Empty states teach the interface, not "nothing here." */
export default function EmptyState({ emoji, title, body, action }: Props) {
  return (
    <div className="flex flex-col items-center rounded-card border border-dashed border-border bg-white/60 px-6 py-10 text-center">
      <div className="grid size-16 place-items-center rounded-2xl bg-green-tint text-[36px]" aria-hidden>
        {emoji}
      </div>
      <h3 className="mt-3 font-heading text-[17px] font-extrabold text-green-deep">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-[26ch] text-[15.5px] leading-snug text-muted">{body}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
