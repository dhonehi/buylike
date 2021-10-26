export default function imgToSvg(selectors) {
  document.querySelectorAll(selectors).forEach((img) => {
    const imgClass = img.className
    const imgURL = img.src

    fetch(imgURL)
      .then((r) => r.text())
      .then((text) => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(text, 'text/xml')
        const svg = xmlDoc.getElementsByTagName('svg')[0]

        if (typeof imgClass !== 'undefined') {
          svg.setAttribute('class', imgClass)
        }

        img.parentNode.replaceChild(svg, img)
      })
      .catch(console.error) // eslint-disable-line no-console
  })
}
