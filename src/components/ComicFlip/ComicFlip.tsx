import { forwardRef } from 'react'
import HTMLFlipBook from 'react-pageflip'
import './ComicFlip.css'

export interface ComicFlipPage {
  src: string
  id?: string
  alt?: string
}

export interface ComicFlipProps {
  pages: ComicFlipPage[]
  width?: number
  height?: number
  className?: string
  showCover?: boolean
  flippingTime?: number
}

// Simple page component with forwardRef
const Page = forwardRef<HTMLDivElement, { page: ComicFlipPage; index: number }>(
  ({ page, index }, ref) => (
    <div ref={ref} className="comicflip-page">
      <img src={page.src} alt={page.alt || `Page ${index + 1}`} />
    </div>
  )
)
Page.displayName = 'Page'

export function ComicFlip({
  pages,
  width = 400,
  height = 533,
  className = '',
  showCover = true,
  flippingTime = 1000,
}: ComicFlipProps) {
  return (
    <HTMLFlipBook
      width={width}
      height={height}
      showCover={showCover}
      flippingTime={flippingTime}
      className={className}
    >
      {pages.map((page, index) => (
        <Page key={page.id || index} page={page} index={index} />
      ))}
    </HTMLFlipBook>
  )
}

