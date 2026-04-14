export function loadImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function resizeImageToSquare(dataUrl, size = 100, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size

      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, size, size)

      const scale = Math.max(size / image.width, size / image.height)
      const width = image.width * scale
      const height = image.height * scale
      const x = (size - width) / 2
      const y = (size - height) / 2

      ctx.drawImage(image, x, y, width, height)

      let currentQuality = quality
      let compressed = canvas.toDataURL('image/jpeg', currentQuality)

      while (compressed.length > 40000 && currentQuality > 0.3) {
        currentQuality -= 0.05
        compressed = canvas.toDataURL('image/jpeg', currentQuality)
      }

      resolve(compressed)
    }

    image.onerror = reject
    image.src = dataUrl
  })
}

export async function prepareProfileImage(file) {
  const dataUrl = await loadImageFile(file)
  return resizeImageToSquare(dataUrl, 100, 0.72)
}