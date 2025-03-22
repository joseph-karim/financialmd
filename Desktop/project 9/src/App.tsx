import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analysis } from './components/Analysis';
import { SharedAnalysis } from './components/SharedAnalysis';
import { AuthProvider } from './components/auth/AuthProvider';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { MultiStepForm } from './components/MultiStepForm';
import { AuthButton } from './components/auth/AuthButton';
import { FreeModelCanvas } from './components/FreeModelCanvas';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <header className="bg-gray-800 border-b border-gray-700 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-white text-2xl font-bold">ReviveAgent Insights</h1>
              <AuthButton />
            </div>
          </header>

          <main className="max-w-7xl mx-auto p-4">
            <Routes>
              {/* Public routes */}
              <Route path="/share/:shareId" element={<SharedAnalysis />} />
              <Route path="/auth/callback" element={
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <p className="text-gray-400">Processing authentication...</p>
                  </div>
                </div>
              } />

              {/* Private routes */}
              <Route path="/" element={
                <PrivateRoute>
                  <MultiStepForm />
                </PrivateRoute>
              } />
              <Route path="/analysis" element={
                <PrivateRoute>
                  <Analysis />
                </PrivateRoute>
              } />
              <Route path="/canvas" element={
                <PrivateRoute>
                  <FreeModelCanvas />
                </PrivateRoute>
              } />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 