import { ComicFlip } from '@/components/ComicFlip/ComicFlip'
import type { ComicFlipPage } from '@/components/ComicFlip/ComicFlip'
import metadata from '@/assets/comic/metadata.json'

// Import all comic images
import frontCover from '@/assets/comic/front-cover.jpeg'
import page1 from '@/assets/comic/page1.jpeg'
import page2 from '@/assets/comic/page2.jpeg'
import page3 from '@/assets/comic/page3.jpeg'
import page4 from '@/assets/comic/page4.jpeg'
import page5 from '@/assets/comic/page5.jpeg'
import page6 from '@/assets/comic/page6.jpeg'
import page7 from '@/assets/comic/page7.jpeg'
import page8 from '@/assets/comic/page8.jpeg'
import page9 from '@/assets/comic/page9.jpeg'
import page10 from '@/assets/comic/page10.jpeg'

// Map filenames to imported images
const imageMap: Record<string, string> = {
  'front-cover.jpeg': frontCover,
  'page1.jpeg': page1,
  'page2.jpeg': page2,
  'page3.jpeg': page3,
  'page4.jpeg': page4,
  'page5.jpeg': page5,
  'page6.jpeg': page6,
  'page7.jpeg': page7,
  'page8.jpeg': page8,
  'page9.jpeg': page9,
  'page10.jpeg': page10,
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📚 ComicFlip
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            React component based on{' '}
            <a
              href="https://github.com/neptunelabs/fsi-pages-samples"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              FSI Pages
            </a>{' '}
            structure pattern
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Click pages to flip, drag corners, or swipe on mobile devices
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <ComicFlip
            pages={pages}
            width={400}
            height={533}
            showCover={true}
            flippingTime={800}
            usePortrait={true}
            showPageCorners={true}
            mobileScrollSupport={true}
            useMouseEvents={true}
            swipeDistance={30}
          />
        </div>

        <div className="mt-8 text-center">
          <div className="inline-block bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Features
            </h2>
            <ul className="text-left text-gray-600 dark:text-gray-300 space-y-2">
              <li>✅ Realistic 3D page flip animation</li>
              <li>✅ Mouse and touch support</li>
              <li>✅ Customizable flip speed and shadows</li>
              <li>✅ Responsive design</li>
              <li>✅ Page corner indicators</li>
              <li>✅ Mobile swipe gestures</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

