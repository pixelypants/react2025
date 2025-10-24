import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import type { Notification, NotificationState } from '@/types'
import { STORAGE_KEYS } from '@/constants'

// Action types for the reducer
type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp' | 'isVisible'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_ALL_NOTIFICATIONS' }
  | { type: 'SET_VISIBILITY'; payload: { id: string; isVisible: boolean } }
  | { type: 'RESTORE_NOTIFICATIONS'; payload: Notification[] }

// Initial state
const initialState: NotificationState = {
  notifications: [],
  maxNotifications: 5,
}

// Reducer function - handles all state updates
function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      const newNotification: Notification = {
        id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        isVisible: true,
        duration: 5000, // Default 5 seconds
        ...action.payload,
      }

      // Remove oldest notifications if we exceed max
      const updatedNotifications = [...state.notifications, newNotification]
      if (updatedNotifications.length > state.maxNotifications) {
        updatedNotifications.splice(0, updatedNotifications.length - state.maxNotifications)
      }

      return {
        ...state,
        notifications: updatedNotifications,
      }
    }

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload),
      }

    case 'CLEAR_ALL_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
      }

    case 'SET_VISIBILITY':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload.id
            ? { ...notification, isVisible: action.payload.isVisible }
            : notification
        ),
      }

    case 'RESTORE_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      }

    default:
      return state
  }
}

// Context type definition
interface NotificationContextType extends NotificationState {
  addNotification: (message: string, type: Notification['type'], duration?: number) => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
}

// Create the context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Provider component
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  // 🔥 useEffect #1: Restore notifications from localStorage on app load
  useEffect(() => {
    console.log('🔔 useEffect #1: Restoring notifications from localStorage')
    
    try {
      const savedNotifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)
      if (savedNotifications) {
        const notifications = JSON.parse(savedNotifications)
        // Only restore recent notifications (less than 1 hour old)
        const recentNotifications = notifications.filter(
          (notification: Notification) => Date.now() - notification.timestamp < 3600000
        )
        dispatch({ type: 'RESTORE_NOTIFICATIONS', payload: recentNotifications })
        console.log('🔔 Restored', recentNotifications.length, 'notifications')
      }
    } catch (error) {
      console.error('🔔 Error restoring notifications:', error)
      localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS)
    }
  }, []) // Empty dependency array = run only once on mount

  // 🔥 useEffect #2: Save notifications to localStorage whenever notifications change
  useEffect(() => {
    console.log('🔔 useEffect #2: Saving notifications to localStorage')
    
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(state.notifications))
      console.log('🔔 Saved', state.notifications.length, 'notifications to localStorage')
    } catch (error) {
      console.error('🔔 Error saving notifications:', error)
    }
  }, [state.notifications]) // Runs whenever notifications array changes

  // 🔥 useEffect #3: Auto-remove notifications after their duration
  useEffect(() => {
    console.log('🔔 useEffect #3: Setting up auto-removal timers')
    
    const timers: NodeJS.Timeout[] = []

    state.notifications.forEach(notification => {
      if (notification.duration && notification.duration > 0) {
        const timer = setTimeout(() => {
          console.log('🔔 Auto-removing notification:', notification.id)
          dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id })
        }, notification.duration)
        
        timers.push(timer)
      }
    })

    // Cleanup function - runs when component unmounts or dependencies change
    return () => {
      console.log('🔔 useEffect #3 cleanup: Clearing', timers.length, 'timers')
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [state.notifications]) // Runs whenever notifications change

  // Action creators
  const addNotification = useCallback((message: string, type: Notification['type'], duration?: number) => {
    console.log('🔔 Adding notification:', { message, type, duration })
    dispatch({ type: 'ADD_NOTIFICATION', payload: { message, type, duration } })
  }, [])

  const removeNotification = useCallback((id: string) => {
    console.log('🔔 Removing notification:', id)
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }, [])

  const clearAllNotifications = useCallback(() => {
    console.log('🔔 Clearing all notifications')
    dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' })
  }, [])

  // Convenience methods
  const success = useCallback((message: string, duration?: number) => {
    addNotification(message, 'success', duration)
  }, [addNotification])

  const error = useCallback((message: string, duration?: number) => {
    addNotification(message, 'error', duration)
  }, [addNotification])

  const warning = useCallback((message: string, duration?: number) => {
    addNotification(message, 'warning', duration)
  }, [addNotification])

  const info = useCallback((message: string, duration?: number) => {
    addNotification(message, 'info', duration)
  }, [addNotification])

  const value: NotificationContextType = {
    ...state,
    addNotification,
    removeNotification,
    clearAllNotifications,
    success,
    error,
    warning,
    info,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

// Custom hook to use the context
export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
