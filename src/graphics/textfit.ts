import textfit from 'textfit'

export default function (element: HTMLElement, options?: textfit.TextFitOption): void {
  fit(element, options)
}

function fit (element: HTMLElement, options?: textfit.TextFitOption): void {
  for (let i = 0; i < 2; i++) {
    setTimeout(() => {
      try {
        textfit(element, options)
      } catch (error) {
        console.error(error)
        // retry after 1000ms
        setTimeout(() => {
          textfit(element, options)
        }, 1000)
      }
    }, i * 250)
  }
}
