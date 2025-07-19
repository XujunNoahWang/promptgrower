import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PreviewPane } from './components/PreviewPane';
import { StepIndicator } from './components/StepIndicator';
import { Step1 } from './pages/Step1';
import { Step2 } from './pages/Step2';
import { useFormStore } from './store/formStore';

// Lazy load other step components
const Step3 = React.lazy(() => import('./pages/Step3').then(module => ({ default: module.Step3 })));
const Step4 = React.lazy(() => import('./pages/Step4').then(module => ({ default: module.Step4 })));
const Step5 = React.lazy(() => import('./pages/Step5').then(module => ({ default: module.Step5 })));
const Step6 = React.lazy(() => import('./pages/Step6').then(module => ({ default: module.Step6 })));
const Step7 = React.lazy(() => import('./pages/Step7').then(module => ({ default: module.Step7 })));
const Step8 = React.lazy(() => import('./pages/Step8').then(module => ({ default: module.Step8 })));
const Step9 = React.lazy(() => import('./pages/Step9').then(module => ({ default: module.Step9 })));

// Route guard component
const StepGuard: React.FC<{ step: number; children: React.ReactNode }> = ({ step, children }) => {
  const { currentStep } = useFormStore();
  
  if (currentStep !== step) {
    return <Navigate to={`/step/${currentStep}`} replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const {
    formData,
    currentStep,
    totalSteps,
    isDarkMode,
    errors,
    updateFormData,
    nextStep,
    prevStep,
    toggleDarkMode,
    generateMetaPrompt,
    resetForm,
    loadFromLocalStorage,
  } = useFormStore();

  const [showPreview, setShowPreview] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Load saved data on mount
  useEffect(() => {
    loadFromLocalStorage();
    // Ensure dark mode is applied by default
    document.documentElement.classList.add('dark');
  }, [loadFromLocalStorage]);

  // Apply dark mode on mount and when it changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Show notification
  const showNotification = (message: string): void => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle form updates
  const handleUpdate = (updates: Partial<typeof formData>): void => {
    updateFormData(updates);
  };

  // Handle navigation
  const handleNext = (): void => {
    if (currentStep === totalSteps) {
      setShowPreview(true);
    } else {
      nextStep();
    }
  };

  const handlePrev = (): void => {
    if (showPreview) {
      setShowPreview(false);
    } else {
      prevStep();
    }
  };

  // Handle copy success
  const handleCopySuccess = (): void => {
    showNotification('Meta prompt copied to clipboard!');
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Prompt Grower
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {isDarkMode ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={resetForm}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    Reset
                  </button>
                </div>
              </div>
              {/* Step Indicator */}
              <div className="pb-4">
                <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-40 sm:pt-32">
            {showPreview ? (
              <div className="max-w-4xl mx-auto">
                <PreviewPane
                  metaPrompt={generateMetaPrompt()}
                  onCopy={handleCopySuccess}
                />
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handlePrev}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Back to Form
                  </button>
                </div>
              </div>
            ) : (
              <>
              <React.Suspense fallback={
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Navigate to="/step/1" replace />} />
                  <Route
                    path="/step/1"
                    element={
                      <StepGuard step={1}>
                        <Step1
                          onNext={handleNext}
                          onPrev={handlePrev}
                          onUpdate={handleUpdate}
                        />
                      </StepGuard>
                    }
                  />
                  <Route
                    path="/step/2"
                    element={
                      <StepGuard step={2}>
                        <Step2
                          onNext={handleNext}
                          onPrev={handlePrev}
                          onUpdate={handleUpdate}
                        />
                      </StepGuard>
                    }
                  />
                  <Route
                    path="/step/3"
                    element={
                      <StepGuard step={3}>
                        <Step3
                          onNext={handleNext}
                          onPrev={handlePrev}
                          onUpdate={handleUpdate}
                        />
                      </StepGuard>
                    }
                  />
                  <Route
                    path="/step/4"
                    element={
                      <StepGuard step={4}>
                        <Step4
                          onNext={handleNext}
                          onPrev={handlePrev}
                          onUpdate={handleUpdate}
                        />
                      </StepGuard>
                    }
                  />
                  <Route
                    path="/step/5"
                    element={
                      <StepGuard step={5}>
                        <Step5
                          onNext={handleNext}
                          onPrev={handlePrev}
                          onUpdate={handleUpdate}
                        />
                      </StepGuard>
                    }
                  />
                  <Route
                    path="/step/6"
                    element={
                      <StepGuard step={6}>
                        <Step6
                          onNext={handleNext}
                          onPrev={handlePrev}
                          onUpdate={handleUpdate}
                        />
                      </StepGuard>
                    }
                  />
                  <Route
                    path="/step/7"
                    element={
                      <StepGuard step={7}>
                        <Step7
                          onNext={handleNext}
                          onPrev={handlePrev}
                          onUpdate={handleUpdate}
                        />
                      </StepGuard>
                    }
                  />
                  <Route
                    path="/step/8"
                    element={
                      <StepGuard step={8}>
                        <Step8
                          onNext={handleNext}
                          onPrev={handlePrev}
                          onUpdate={handleUpdate}
                        />
                      </StepGuard>
                    }
                  />
                  <Route
                    path="/step/9"
                    element={
                      <StepGuard step={9}>
                        <Step9
                          onNext={handleNext}
                          onPrev={handlePrev}
                          onUpdate={handleUpdate}
                        />
                      </StepGuard>
                    }
                  />
                </Routes>
              </React.Suspense>
              </>
            )}
          </main>

          {/* Notification */}
          {notification && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
              {notification}
            </div>
          )}

          {/* Error Display */}
          {errors.length > 0 && (
            <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50 max-w-sm">
              <div className="font-medium">Please fix the following errors:</div>
              <ul className="mt-1 text-sm">
                {errors.map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App; 