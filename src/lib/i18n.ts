import { useApp } from './AppContext'

/**
 * Lightweight inline i18n. Call sites pass both strings:
 *   const t = useT(); t('Mga Order', 'Orders')
 * Returns the Filipino/Taglish string by default, English when toggled.
 */
export function useT() {
  const { lang } = useApp()
  return (fil: string, en: string) => (lang === 'en' ? en : fil)
}
