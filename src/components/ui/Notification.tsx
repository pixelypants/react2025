import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import type { Notification as NotificationType } from '@/types'
import { useNotifications } from '@/contexts/NotificationContext'

// Individual notification component
export function NotificationItem({ notification, onRemove }: { notification: NotificationType; onRemove?: (id: string) => void }) {
  // Use the context if available, otherwise use the onRemove prop
  let removeNotification: (id: string) => void
  
  try {
    const context = useNotifications()
    removeNotification = context.removeNotification
  } catch {
    // Fallback for Storybook when context is not available
    removeNotification = onRemove || (() => console.log('Remove notification:', notification.id))
  }

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />
      default:
        return <Info className="w-5 h-5 text-gray-500" />
    }
  }

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getTextColor = () => {
    switch (notification.type) {
      case 'success':
        return 'text-green-800'
      case 'error':
        return 'text-red-800'
      case 'warning':
        return 'text-yellow-800'
      case 'info':
        return 'text-blue-800'
      default:
        return 'text-gray-800'
    }
  }

  return (
    <div
      className={`
        ${getBackgroundColor()}
        ${getTextColor()}
        border rounded-lg p-4 shadow-lg
        transform transition-all duration-300 ease-in-out
        ${notification.isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        max-w-sm w-full
      `}
      style={{
        minWidth: '300px',
        maxWidth: '400px',
        pointerEvents: 'auto'
      }}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">
            {notification.message}
          </p>
          <p className="text-xs opacity-75 mt-1">
            {new Date(notification.timestamp).toLocaleTimeString()}
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <button
            onClick={() => removeNotification(notification.id)}
            className="inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Container component for all notifications
export function NotificationContainer() {
  const { notifications } = useNotifications()

  if (notifications.length === 0) {
    return null
  }

  return (
    <div 
      className="fixed top-4 right-4 z-50 space-y-2"
      style={{ 
        position: 'fixed', 
        top: '16px', 
        right: '16px', 
        zIndex: 9999,
        pointerEvents: 'auto'
      }}
    >
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  )
}

// Hook for easy notification usage
export const useNotificationActions = () => {
  const { success, error, warning, info, clearAllNotifications } = useNotifications()

  return {
    // Success notifications
    showSuccess: (message: string, duration?: number) => success(message, duration),
    
    // Error notifications
    showError: (message: string, duration?: number) => error(message, duration),
    
    // Warning notifications
    showWarning: (message: string, duration?: number) => warning(message, duration),
    
    // Info notifications
    showInfo: (message: string, duration?: number) => info(message, duration),
    
    // Clear all
    clearAll: () => clearAllNotifications(),
  }
}
