import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with label, error, and helper text support.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'The input type',
    },
    label: {
      control: { type: 'text' },
      description: 'The label for the input',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    error: {
      control: { type: 'text' },
      description: 'Error message to display',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text to display',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the input',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Marks the input as required',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
}

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
}

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Text" type="text" placeholder="Enter text" />
      <Input label="Email" type="email" placeholder="Enter email" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Number" type="number" placeholder="Enter number" />
      <Input label="Phone" type="tel" placeholder="Enter phone" />
      <Input label="URL" type="url" placeholder="Enter URL" />
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 w-80">
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        required
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="Create a password"
        helperText="Must be at least 8 characters"
        required
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        error="Passwords do not match"
      />
    </form>
  ),
}
