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
  'Security',
  'Scale',
  'Code Standards',
  'Additional'
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div>
      <div className="flex justify-center items-center flex-wrap gap-2 text-sm">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const stepDescription = STEP_DESCRIPTIONS[index];
          
          return (
            <React.Fragment key={stepNumber}>
              <div
                className={`font-medium transition-colors duration-200 ${
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
                <span className="text-gray-400 dark:text-gray-500 mx-1">-----</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}; 