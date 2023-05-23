import { bundleConfig } from '../../browser/nodecg'
const button = document.getElementById('button') as HTMLButtonElement
const oscframe = document.getElementById('oscframe') as HTMLIFrameElement
const vdoframe = document.getElementById('vdoframe') as HTMLIFrameElement
const refreshvdo = document.getElementById('refreshvdo') as HTMLButtonElement

button.onclick = function () {
  vdoframe.src = bundleConfig.externalUrls.vdo
  oscframe.src = bundleConfig.externalUrls.osc
  button.style.display = 'none'
  oscframe.style.display = 'initial'
  refreshvdo.style.display = 'initial'
}

refreshvdo.onclick = function () {
  vdoframe.src = ''
  vdoframe.src = bundleConfig.externalUrls.vdo
}
