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
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  // Load saved data on mount
  useEffect(() => {
    loadFromLocalStorage();
    // Ensure dark mode is applied by default
    document.documentElement.classList.add('dark');
  }, [loadFromLocalStorage]);

  // Handle root path redirect based on saved step
  const handleRootRedirect = () => {
    const savedStep = localStorage.getItem('currentStep');
    if (savedStep && savedStep !== '1') {
      return <Navigate to={`/step/${savedStep}`} replace />;
    }
    return <Navigate to="/step/1" replace />;
  };

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
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Prompt Grower
                  </h1>
                  <div className="relative inline-block">
                    <span 
                      className="text-2xl cursor-pointer inline-block hover:opacity-80 transition-opacity"
                      onClick={() => {
                        setShowWorkflowModal(true);
                        setIsPulsing(false);
                      }}
                    >
                      <em className="text-black dark:text-white">&#123;</em> 
                      <span className="mx-2">
                        <span className={isPulsing ? 'pulse-plant' : ''}>🌱</span>
                      </span>
                      <em className="text-black dark:text-white">&#125;</em>
                    </span>
                  </div>
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
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-40 md:pt-36 lg:pt-32">
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
                  <Route path="/" element={handleRootRedirect()} />
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

          {/* Workflow Modal */}
          {showWorkflowModal && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center"
              onClick={() => setShowWorkflowModal(false)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
              
              {/* Modal Content */}
              <div 
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 ease-out"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowWorkflowModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Title */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Workflow
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    From idea to functional MVP
                  </p>
                </div>
                
                {/* Workflow Steps */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-2xl">🧠</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Generate Your Idea</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Define your concept and vision</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Complete &#123; Prompt Grower &#125; Form</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Structured input and requirements</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-2xl">📝</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Receive Meta Prompt</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Expanded and structured prompt</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Send to AI Tools (leverage free quota)</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Process with external AI</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-2xl">⚡️</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Receive Ultimate Prompt</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Optimized, developer-ready instruction</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-2xl">💻</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Submit to AI IDE</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Let the IDE auto-generate your code
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <div className="font-medium text-blue-900 dark:text-blue-100">Get Functional MVP</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">Ready-to-deploy application output</div>
                    </div>
                  </div>
                </div>
              </div>
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