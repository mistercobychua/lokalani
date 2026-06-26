import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  hint?: string
  action?: ReactNode
}

export default function SectionHeading({ children, hint, action }: Props) {
  return (
    <div className="mb-2.5 flex items-end justify-between gap-3">
      <div>
        <h2 className="font-heading text-[17px] font-extrabold text-green-deep">{children}</h2>
        {hint && <p className="mt-0.5 text-[13px] text-muted">{hint}</p>}
      </div>
      {action}
    </div>
  )
}
