import type { Meta, StoryObj } from '@storybook/react'
import { LoadingSpinner } from './LoadingSpinner'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'UI/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A loading spinner component with different sizes.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the spinner',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <LoadingSpinner size="sm" />
        <p className="text-sm mt-2">Small</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="md" />
        <p className="text-sm mt-2">Medium</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="text-sm mt-2">Large</p>
      </div>
    </div>
  ),
}

export const WithCustomColor: Story = {
  args: {
    size: 'md',
    className: 'text-blue-600',
  },
}

export const InContext: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading content...</p>
      </div>
    </div>
  ),
}
