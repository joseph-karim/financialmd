import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Components
import { Sidebar } from './components/layout/sidebar'
import { Header } from './components/layout/header'
import { LoadingScreen } from './components/ui/loading-screen'
import { AuthProvider } from './contexts/auth-context'

// Pages
const Landing = lazy(() => import('./pages/landing'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const ModuleRouter = lazy(() => import('./pages/module-router'))
const PatientExamples = lazy(() => import('./pages/patient-examples'))
const NotFound = lazy(() => import('./pages/not-found'))
const Settings = lazy(() => import('./pages/settings'))
const CheatSheet = lazy(() => import('./pages/cheat-sheet'))
const RvuLookup = lazy(() => import('./pages/rvu-lookup'))
const PaymentSuccess = lazy(() => import('./pages/payment-success'))

export default function App() {
  return (
    <AuthProvider>
      <div className="flex h-screen flex-col bg-background">
        <Header />
        <div className="flex flex-1 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={
                <div className="w-full overflow-y-auto">
                  <Suspense fallback={<LoadingScreen />}>
                    <Landing />
                  </Suspense>
                </div>
              }
            />
            <Route
              path="/login"
              element={
                <div className="w-full overflow-y-auto">
                  <Suspense fallback={<LoadingScreen />}>
                    <Dashboard />
                  </Suspense>
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div className="w-full overflow-y-auto">
                  <Suspense fallback={<LoadingScreen />}>
                    <Dashboard />
                  </Suspense>
                </div>
              }
            />
            <Route
              path="/payment-success"
              element={
                <div className="w-full overflow-y-auto">
                  <Suspense fallback={<LoadingScreen />}>
                    <PaymentSuccess />
                  </Suspense>
                </div>
              }
            />
            {/* Protected Routes with Sidebar */}
            <Route
              path="/dashboard"
              element={
                <div className="flex flex-1">
                  <Sidebar />
                  <div className="flex-1 overflow-y-auto">
                    <Suspense fallback={<LoadingScreen />}>
                      <Dashboard />
                    </Suspense>
                  </div>
                </div>
              }
            />
            <Route
              path="/modules/:moduleId"
              element={
                <div className="flex flex-1">
                  <Sidebar />
                  <div className="flex-1 overflow-y-auto">
                    <Suspense fallback={<LoadingScreen />}>
                      <ModuleRouter />
                    </Suspense>
                  </div>
                </div>
              }
            />
            <Route
              path="/patient-examples"
              element={
                <div className="flex flex-1">
                  <Sidebar />
                  <div className="flex-1 overflow-y-auto">
                    <Suspense fallback={<LoadingScreen />}>
                      <PatientExamples />
                    </Suspense>
                  </div>
                </div>
              }
            />
            <Route
              path="/cheat-sheet"
              element={
                <div className="flex flex-1">
                  <Sidebar />
                  <div className="flex-1 overflow-y-auto">
                    <Suspense fallback={<LoadingScreen />}>
                      <CheatSheet />
                    </Suspense>
                  </div>
                </div>
              }
            />
            <Route
              path="/rvu-lookup"
              element={
                <div className="flex flex-1">
                  <Sidebar />
                  <div className="flex-1 overflow-y-auto">
                    <Suspense fallback={<LoadingScreen />}>
                      <RvuLookup />
                    </Suspense>
                  </div>
                </div>
              }
            />
            <Route
              path="/settings"
              element={
                <div className="flex flex-1">
                  <Sidebar />
                  <div className="flex-1 overflow-y-auto">
                    <Suspense fallback={<LoadingScreen />}>
                      <Settings />
                    </Suspense>
                  </div>
                </div>
              }
            />
            <Route
              path="*"
              element={
                <div className="w-full overflow-y-auto">
                  <Suspense fallback={<LoadingScreen />}>
                    <NotFound />
                  </Suspense>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  )
}