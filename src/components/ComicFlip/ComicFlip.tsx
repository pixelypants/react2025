import { useRef } from 'react'
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
  maxShadowOpacity?: number
  startPage?: number
  drawShadow?: boolean
  flippingTime?: number
  usePortrait?: boolean
  startZIndex?: number
  autoSize?: boolean
  maxWidth?: number
  maxHeight?: number
  minWidth?: number
  minHeight?: number
  size?: 'stretch' | 'fixed'
  minLeafWidth?: number
  showPageCorners?: boolean
  mobileScrollSupport?: boolean
  clickEventForward?: boolean
  useMouseEvents?: boolean
  swipeDistance?: number
  showCoverPage?: boolean
  disableFlipByClick?: boolean
}

export function ComicFlip({
  pages,
  width = 400,
  height = 533,
  className = '',
  showCover = true,
  maxShadowOpacity = 0.5,
  startPage = 0,
  drawShadow = true,
  flippingTime = 1000,
  usePortrait = true,
  startZIndex = 0,
  autoSize = true,
  maxWidth = 0,
  maxHeight = 0,
  minWidth = 0,
  minHeight = 0,
  size = 'stretch',
  minLeafWidth = 0,
  showPageCorners = true,
  mobileScrollSupport = false,
  clickEventForward = false,
  useMouseEvents = true,
  swipeDistance = 30,
  showCoverPage = true,
  disableFlipByClick = false,
}: ComicFlipProps) {
  const flipBookRef = useRef<any>(null)

  return (
    <div className={`comicflip-container ${className}`}>
      <HTMLFlipBook
        ref={flipBookRef}
        className="comicflip-flipbook"
        style={{}}
        width={width}
        height={height}
        showCover={showCover}
        maxShadowOpacity={maxShadowOpacity}
        startPage={startPage}
        drawShadow={drawShadow}
        flippingTime={flippingTime}
        usePortrait={usePortrait}
        startZIndex={startZIndex}
        autoSize={autoSize}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        minWidth={minWidth}
        minHeight={minHeight}
        size={size}
        minLeafWidth={minLeafWidth}
        showPageCorners={showPageCorners}
        mobileScrollSupport={mobileScrollSupport}
        clickEventForward={clickEventForward}
        useMouseEvents={useMouseEvents}
        swipeDistance={swipeDistance}
        showCoverPage={showCoverPage}
        disableFlipByClick={disableFlipByClick}
      >
        {pages.map((page, index) => (
          <div key={page.id || index} className="comicflip-page">
            <img
              src={page.src}
              alt={page.alt || `Page ${index + 1}`}
              className="comicflip-page-image"
            />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  )
}

