import { ComicFlip } from '@/components/ComicFlip/ComicFlip'
import type { ComicFlipPage } from '@/components/ComicFlip/ComicFlip'
import metadata from '@/assets/ChillyNinjas/metadata.json'
import { useEffect, useState } from 'react'

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
  const pages: ComicFlipPage[] = metadata.pages
    .sort((a, b) => a.order - b.order)
    .map((page) => ({
      src: imageMap[page.filename],
      id: page.order.toString(),
      alt: page.alt,
    }))

    console.log("pages: " + JSON.stringify(pages))
  // Calculate dimensions to fill screen with 80px padding
  const [dimensions, setDimensions] = useState({ width: 400, height: 533 })
  const aspectRatio = 3 / 4 // width / height

  useEffect(() => {
    const updateDimensions = () => {
      const padding = 80
      const availableWidth = window.innerWidth - padding * 2
      const availableHeight = window.innerHeight - padding * 2

      // Calculate width and height maintaining aspect ratio
      let width = availableWidth
      let height = width / aspectRatio

      // If height exceeds available space, scale down
      if (height > availableHeight) {
        height = availableHeight
        width = height * aspectRatio
      }

      setDimensions({ width: Math.floor(width), height: Math.floor(height) })
    }

    updateDimensions()
    console.log("dimensions: " + dimensions.width + "x" + dimensions.height)
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [aspectRatio])

  return (
    <div className="h-screen w-screen bg-fuchsia-500 flex items-center justify-center p-[80px] relative">
      <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg font-mono text-sm">
        Width: {dimensions.width}px × Height: {dimensions.height}px
        <br />
        Pages: {pages.length}
      </div>
      <ComicFlip
        pages={pages}
        width={dimensions.width}
        height={dimensions.height}
        showCover={true}
        flippingTime={800}
        usePortrait={true}
        showPageCorners={false}
        mobileScrollSupport={true}
        useMouseEvents={true}
        swipeDistance={30}
      />
    </div>
  )
}

