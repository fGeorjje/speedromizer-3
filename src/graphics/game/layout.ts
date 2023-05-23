import { params } from '../../browser/browser'

export function setupLayout (): void {
  const layout = params.get('layout')
  if (layout === null) throw new Error()
  Array.from(document.getElementsByClassName('layout'))
    .map(e => e as HTMLLinkElement)
    .forEach(e => {
      if (!e.className.includes(layout)) e.remove()
    })
}
