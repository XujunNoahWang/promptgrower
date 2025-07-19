import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

// Step descriptions based on the form structure
const STEP_DESCRIPTIONS = [
  'Basic Info',
  'Functions',
  'Tech Stack',
  'Platform',
  'UX Design',
  'Integration & Security',
  'Scale',
  'Code Standards',
  'Additional'
];

// Short descriptions for medium screens
const STEP_DESCRIPTIONS_SHORT = [
  'Basic',
  'Func',
  'Tech',
  'Platform',
  'UX',
  'Integration',
  'Scale',
  'Code',
  'Extra'
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div>
      {/* Large screens: Full descriptions */}
      <div className="hidden lg:flex justify-center items-center gap-2 text-sm overflow-x-auto">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const stepDescription = STEP_DESCRIPTIONS[index];
          
          return (
            <React.Fragment key={stepNumber}>
              <div
                className={`font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : isCompleted
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {stepNumber}. {stepDescription}
              </div>
              {stepNumber < totalSteps && (
                <span className="text-gray-400 dark:text-gray-500 mx-1">---</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Medium screens: Short descriptions */}
      <div className="hidden md:flex lg:hidden justify-center items-center gap-1 text-xs overflow-x-auto">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const stepDescription = STEP_DESCRIPTIONS_SHORT[index];
          
          return (
            <React.Fragment key={stepNumber}>
              <div
                className={`font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : isCompleted
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {stepNumber}. {stepDescription}
              </div>
              {stepNumber < totalSteps && (
                <span className="text-gray-400 dark:text-gray-500 mx-1">-</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Small screens: Numbers only with progress bar */}
      <div className="md:hidden">
        <div className="flex justify-center items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-primary-600 dark:bg-primary-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-center items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
          {STEP_DESCRIPTIONS[currentStep - 1]}
        </div>
      </div>
    </div>
  );
}; 