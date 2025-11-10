import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { NotificationProvider } from '@/contexts/NotificationContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Layout } from '@/components/layout/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { NotificationContainer } from '@/components/ui/Notification'
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { Dashboard } from '@/pages/Dashboard'
import { ComicFlipDemo } from '@/pages/ComicFlipDemo'
import { ROUTES } from '@/constants'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NotificationProvider>
          <AuthProvider>
            <Router>
              <Routes>
                <Route
                  path={ROUTES.HOME}
                  element={
                    <Layout>
                      <Home />
                    </Layout>
                  }
                />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route
                  path={ROUTES.DASHBOARD}
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.COMICFLIP}
                  element={
                    <Layout>
                      <ComicFlipDemo />
                    </Layout>
                  }
                />
                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
              </Routes>
            </Router>
            <NotificationContainer />
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
