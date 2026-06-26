import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
  /** Dismissable by backdrop/close (success sheets can hide this). */
  dismissable?: boolean
}

/** Bottom sheet, scoped to the phone screen. Prefer this over centred modals. */
export default function BottomSheet({ open, onClose, title, children, footer, dismissable = true }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismissable && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, dismissable, onClose])

  if (!open) return null

  return (
    <div className="absolute inset-0 z-sheet flex flex-col justify-end" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Isara"
        tabIndex={dismissable ? 0 : -1}
        onClick={() => dismissable && onClose()}
        className="anim-backdrop absolute inset-0 bg-green-deep/45 backdrop-blur-[2px]"
      />
      <div className="anim-sheet relative max-h-[88%] overflow-hidden rounded-t-[1.75rem] bg-white shadow-pop">
        <div className="mx-auto mt-2.5 h-1.5 w-10 rounded-full bg-border" />
        {(title || dismissable) && (
          <div className="flex items-center justify-between px-5 pb-1 pt-2.5">
            {title && <h2 className="font-heading text-[19px] font-extrabold text-green-deep">{title}</h2>}
            {dismissable && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Isara"
                className="tap-target -mr-2 grid place-items-center rounded-xl text-muted transition hover:bg-surface active:scale-95"
              >
                <X className="size-5" strokeWidth={2.4} />
              </button>
            )}
          </div>
        )}
        <div className="no-scrollbar max-h-[60vh] overflow-y-auto px-5 pb-2 pt-1">{children}</div>
        {footer && <div className="border-t border-border px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">{footer}</div>}
      </div>
    </div>
  )
}
