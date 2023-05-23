import { bundleConfig } from '../../browser/nodecg'

const button = document.getElementById('load') as HTMLButtonElement
const frame = document.getElementById('frame') as HTMLIFrameElement
const { beefweb } = bundleConfig.externalUrls

button.onclick = function () {
  button.style.display = 'none'
  frame.style.display = 'initial'
  frame.src = beefweb
}
