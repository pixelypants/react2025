import { ComicFlip } from '@/components/ComicFlip/ComicFlip'
import type { ComicFlipPage } from '@/components/ComicFlip/ComicFlip'
import metadata from '@/assets/ChillyNinjas/metadata.json'
import { useEffect, useState, useMemo } from 'react'

// Import all ChillyNinjas images
import chillyNinjas0 from '@/assets/ChillyNinjas/ChillyNinjas_0.jpeg'
import chillyNinjas1 from '@/assets/ChillyNinjas/ChillyNinjas_1.jpeg'
import chillyNinjas2 from '@/assets/ChillyNinjas/ChillyNinjas_2.jpeg'
import chillyNinjas3 from '@/assets/ChillyNinjas/ChillyNinjas_3.jpeg'
import chillyNinjas4 from '@/assets/ChillyNinjas/ChillyNinjas_4.jpeg'

// Map filenames to imported images
const imageMap: Record<string, string> = {
  'ChillyNinjas_0.jpeg': chillyNinjas0,
  'ChillyNinjas_1.jpeg': chillyNinjas1,
  'ChillyNinjas_2.jpeg': chillyNinjas2,
  'ChillyNinjas_3.jpeg': chillyNinjas3,
  'ChillyNinjas_4.jpeg': chillyNinjas4,
}

export function ComicFlipDemo() {
  // Sort pages by order from metadata and map to ComicFlipPage format
  const pages: ComicFlipPage[] = useMemo(
    () =>
      metadata.pages
        .sort((a, b) => a.order - b.order)
        .map((page) => ({
          src: imageMap[page.filename],
          id: page.order.toString(),
          alt: page.alt,
        })),
    []
  )

  // Store natural image dimensions
  const [naturalDimensions, setNaturalDimensions] = useState<{ width: number; height: number } | null>(null)
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null)

  // Load image to get natural dimensions
  useEffect(() => {
    const img = new Image()
    img.src = pages[0]?.src || ''
    img.onload = () => {
      setNaturalDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      })
    }
    img.onerror = () => {
      console.error('Failed to load image:', pages[0]?.src)
    }
  }, [pages])

  // Calculate dimensions to fill screen with 50px padding
  // Account for double spread width (2 pages side by side)
  useEffect(() => {
    if (!naturalDimensions) return

    const updateDimensions = () => {
      const padding = 50
      const availableWidth = window.innerWidth - padding * 2
      const availableHeight = window.innerHeight - padding * 2

      const aspectRatio = naturalDimensions.width / naturalDimensions.height

      // Calculate dimensions to fit within available space
      // Account for double spread (2 pages side by side)
      let width: number
      let height: number

      // Try fitting double spread by width first (2 pages = 2 * page width)
      const doubleSpreadWidth = availableWidth
      const singlePageWidth = doubleSpreadWidth / 2
      const widthBasedHeight = singlePageWidth / aspectRatio

      // Try fitting by height
      const heightBasedWidth = availableHeight * aspectRatio

      // Use whichever constraint fits better
      if (widthBasedHeight <= availableHeight) {
        // Width is the limiting factor (double spread)
        width = singlePageWidth
        height = widthBasedHeight
      } else {
        // Height is the limiting factor
        height = availableHeight
        width = heightBasedWidth
      }

      setDimensions({
        width: Math.round(width),
        height: Math.round(height),
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [naturalDimensions])

  if (!dimensions) {
    return <div className="h-screen w-screen bg-fuchsia-500 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="h-screen w-screen bg-fuchsia-500 flex items-start relative p-[50px] overflow-visible">
      {dimensions && (
        <div className="absolute top-4 left-4 bg-black/70 text-white p-2 rounded text-xs z-50">
          Dimensions: {dimensions.width}px × {dimensions.height}px
        </div>
      )}
      {dimensions && (
        <ComicFlip
          pages={pages}
          width={dimensions.width}
          height={dimensions.height}
          showCover={true}
          flippingTime={800}
        />
      )}
    </div>
  )
}

