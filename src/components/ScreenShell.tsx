import type { ReactNode } from 'react'

interface Props {
  appBar: ReactNode
  children: ReactNode
  /** Bottom-anchored CTA bar (sits above the tab bar on tab screens). */
  sticky?: ReactNode
}

/** One screen: fixed app bar, scrollable body, optional sticky action bar. */
export default function ScreenShell({ appBar, children, sticky }: Props) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {appBar}
      <main className="no-scrollbar flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
        {children}
      </main>
      {sticky}
    </div>
  )
}
