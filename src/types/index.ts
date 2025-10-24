export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type Theme = 'light' | 'dark' | 'system'

export interface AppState {
  theme: Theme
  sidebarOpen: boolean
}

// Notification types
export interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  timestamp: number
  isVisible: boolean
}

export interface NotificationState {
  notifications: Notification[]
  maxNotifications: number
}
