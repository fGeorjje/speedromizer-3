import { remoteLogger } from './remoteLogger'

export function getElementById<E extends HTMLElement> (id: string): E {
  const element = document.getElementById(id) as E
  if (element === null) throw new Error(`expected ${id}`)
  return element
}

export const path = location.pathname.split('/').slice(3).join('/')
export const agent = navigator.userAgent
const idKey = `id:${path}:${agent}`
let _id = window.localStorage.getItem(idKey)

function dec2hex (dec: number): string {
  return dec.toString(16).padStart(2, '0')
}

if (_id === null) {
  const arr = new Uint8Array(40)
  window.crypto.getRandomValues(arr)
  _id = Array.from(arr, dec2hex).join('')
  window.localStorage.setItem(idKey, _id)
}
export const id = _id
export const params = new URLSearchParams(location.search)

remoteLogger.debug('Client opening page')
