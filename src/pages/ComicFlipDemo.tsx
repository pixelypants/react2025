import { ComicFlip } from '@/components/ComicFlip/ComicFlip'
import type { ComicFlipPage } from '@/components/ComicFlip/ComicFlip'

// Import local assets from assets/pages
import page1 from '@/assets/pages/2131250c017aa0609a1e72acc2941ce5.jpg'
import page2 from '@/assets/pages/7b4b8853746b542d45a56991075b492b.jpg'
import page3 from '@/assets/pages/blackterror1643-823ab4-640.jpg'
import page4 from '@/assets/pages/c4606da3fe73adc813abe8be5762b712.jpg'
import page5 from '@/assets/pages/c4a3776f4531274b0f56c545caf18ce0.jpg'
import page6 from '@/assets/pages/MCP_Spider-Man_pg5.jpg'

export function ComicFlipDemo() {
  const pages: ComicFlipPage[] = [
    { src: page1, id: '1', alt: 'Page 1' },
    { src: page2, id: '2', alt: 'Page 2' },
    { src: page3, id: '3', alt: 'Page 3' },
    { src: page4, id: '4', alt: 'Page 4' },
    { src: page5, id: '5', alt: 'Page 5' },
    { src: page6, id: '6', alt: 'Page 6' },
  ]

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
            width={600}
            height={800}
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

