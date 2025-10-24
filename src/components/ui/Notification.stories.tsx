import type { Meta, StoryObj } from '@storybook/react'
import { NotificationItem } from './Notification'
import type { Notification } from '@/types'

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: '1',
    message: 'Success! Your changes have been saved.',
    type: 'success',
    timestamp: Date.now() - 1000,
    isVisible: true,
    duration: 5000,
  },
  {
    id: '2',
    message: 'Error! Something went wrong. Please try again.',
    type: 'error',
    timestamp: Date.now() - 2000,
    isVisible: true,
    duration: 5000,
  },
  {
    id: '3',
    message: 'Warning! This action cannot be undone.',
    type: 'warning',
    timestamp: Date.now() - 3000,
    isVisible: true,
    duration: 5000,
  },
  {
    id: '4',
    message: 'Info: New features are available in the latest update.',
    type: 'info',
    timestamp: Date.now() - 4000,
    isVisible: true,
    duration: 5000,
  },
]

// Mock context for stories
const MockNotificationProvider = ({ children }: { children: React.ReactNode }) => {
  // For Storybook, we'll just render the children without the full context
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      {children}
    </div>
  )
}

const meta: Meta<typeof NotificationItem> = {
  title: 'UI/Notification',
  component: NotificationItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Notification components for displaying toast messages with different types and states.',
      },
    },
  },
  decorators: [
    (Story) => (
      <MockNotificationProvider>
        <div className="w-96">
          <Story />
        </div>
      </MockNotificationProvider>
    ),
  ],
  argTypes: {
    notification: {
      description: 'Notification object containing message, type, and other properties',
    },
    onRemove: {
      description: 'Optional callback function when notification is removed',
      action: 'onRemove',
    },
  },
}

export default meta
type Story = StoryObj<typeof NotificationItem>

// Individual notification stories
export const Success: Story = {
  args: {
    notification: {
      id: '1',
      message: 'Success! Your changes have been saved.',
      type: 'success',
      timestamp: Date.now(),
      isVisible: true,
      duration: 5000,
    },
    onRemove: (id: string) => console.log('Remove notification:', id),
  },
}

export const Error: Story = {
  args: {
    notification: {
      id: '2',
      message: 'Error! Something went wrong. Please try again.',
      type: 'error',
      timestamp: Date.now(),
      isVisible: true,
      duration: 5000,
    },
    onRemove: (id: string) => console.log('Remove notification:', id),
  },
}

export const Warning: Story = {
  args: {
    notification: {
      id: '3',
      message: 'Warning! This action cannot be undone.',
      type: 'warning',
      timestamp: Date.now(),
      isVisible: true,
      duration: 5000,
    },
    onRemove: (id: string) => console.log('Remove notification:', id),
  },
}

export const Info: Story = {
  args: {
    notification: {
      id: '4',
      message: 'Info: New features are available in the latest update.',
      type: 'info',
      timestamp: Date.now(),
      isVisible: true,
      duration: 5000,
    },
    onRemove: (id: string) => console.log('Remove notification:', id),
  },
}

export const LongMessage: Story = {
  args: {
    notification: {
      id: '5',
      message: 'This is a very long notification message that demonstrates how the component handles text that might wrap to multiple lines and still maintains proper styling and layout.',
      type: 'info',
      timestamp: Date.now(),
      isVisible: true,
      duration: 5000,
    },
    onRemove: (id: string) => console.log('Remove notification:', id),
  },
}

export const ShortMessage: Story = {
  args: {
    notification: {
      id: '6',
      message: 'Short message',
      type: 'success',
      timestamp: Date.now(),
      isVisible: true,
      duration: 5000,
    },
    onRemove: (id: string) => console.log('Remove notification:', id),
  },
}

export const Hidden: Story = {
  args: {
    notification: {
      id: '7',
      message: 'This notification is hidden (isVisible: false)',
      type: 'error',
      timestamp: Date.now(),
      isVisible: false,
      duration: 5000,
    },
    onRemove: (id: string) => console.log('Remove notification:', id),
  },
}

// Container stories - showing individual notifications instead of container
export const SingleNotification: Story = {
  render: () => (
    <div className="relative">
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <NotificationItem 
          notification={mockNotifications[0]} 
          onRemove={(id) => console.log('Remove notification:', id)}
        />
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        Single notification in top-right corner
      </div>
    </div>
  ),
}

export const MultipleNotifications: Story = {
  render: () => (
    <div className="relative">
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {mockNotifications.map((notification) => (
          <NotificationItem 
            key={notification.id} 
            notification={notification}
            onRemove={(id) => console.log('Remove notification:', id)}
          />
        ))}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        Multiple notifications stacked in top-right corner
      </div>
    </div>
  ),
}

export const EmptyState: Story = {
  render: () => (
    <div className="relative">
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        No notifications (empty state) - NotificationContainer would return null
      </div>
    </div>
  ),
}

// Interactive stories
export const InteractiveDemo: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Interactive Notification Demo
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => console.log('Success button clicked')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Success
          </button>
          <button
            onClick={() => console.log('Error button clicked')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Error
          </button>
          <button
            onClick={() => console.log('Warning button clicked')}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            Warning
          </button>
          <button
            onClick={() => console.log('Info button clicked')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Info
          </button>
          <button
            onClick={() => console.log('Clear All button clicked')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Clear All
          </button>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          This is a static demo. For interactive notifications, use the main app at localhost:5175
        </div>
        <div className="fixed top-4 right-4 z-50 space-y-2">
          <NotificationItem 
            notification={mockNotifications[0]} 
            onRemove={(id) => console.log('Remove notification:', id)}
          />
        </div>
      </div>
    )
  },
}

// All notification types showcase
export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        All Notification Types
      </div>
      <div className="space-y-2">
        <NotificationItem 
          notification={mockNotifications[0]} 
          onRemove={(id) => console.log('Remove notification:', id)}
        />
        <NotificationItem 
          notification={mockNotifications[1]} 
          onRemove={(id) => console.log('Remove notification:', id)}
        />
        <NotificationItem 
          notification={mockNotifications[2]} 
          onRemove={(id) => console.log('Remove notification:', id)}
        />
        <NotificationItem 
          notification={mockNotifications[3]} 
          onRemove={(id) => console.log('Remove notification:', id)}
        />
      </div>
    </div>
  ),
}

// Responsive design showcase
export const ResponsiveDesign: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Responsive Design
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Mobile (320px)</h3>
          <div className="w-80 border-2 border-dashed border-gray-300 dark:border-gray-600 p-2">
            <NotificationItem 
              notification={mockNotifications[0]} 
              onRemove={(id) => console.log('Remove notification:', id)}
            />
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Desktop (400px)</h3>
          <div className="w-96 border-2 border-dashed border-gray-300 dark:border-gray-600 p-2">
            <NotificationItem 
              notification={mockNotifications[1]} 
              onRemove={(id) => console.log('Remove notification:', id)}
            />
          </div>
        </div>
      </div>
    </div>
  ),
}
