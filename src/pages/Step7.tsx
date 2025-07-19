import React from 'react';
import type { StepFormProps } from '../types';
import { PROJECT_COMPLEXITY, DEVELOPMENT_PRIORITIES } from '../types';
import { useFormStore } from '../store/formStore';

const Step7: React.FC<StepFormProps> = ({ onNext, onPrev, onUpdate }) => {
  const { formData } = useFormStore();
  
  // Add fallback for undefined formData
  const safeFormData = formData || {
    projectComplexity: 'Let AI Decide',
    developmentPriority: 'Let AI Decide'
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onNext();
  };

  const handleInputChange = (field: string, value: string): void => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Project Scale & Time
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Define the scope and timeline for your project.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Complexity */}
          <div>
            <label htmlFor="projectComplexity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Complexity
            </label>
            <select
              id="projectComplexity"
              name="projectComplexity"
              value={safeFormData.projectComplexity}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleInputChange('projectComplexity', e.target.value)}
            >
              {PROJECT_COMPLEXITY.map((complexity) => (
                <option key={complexity} value={complexity}>
                  {complexity}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Choose the complexity level or let AI assess based on your requirements.
            </p>
          </div>

          {/* Development Priority */}
          <div>
            <label htmlFor="developmentPriority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Development Priority
            </label>
            <select
              id="developmentPriority"
              name="developmentPriority"
              value={safeFormData.developmentPriority}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleInputChange('developmentPriority', e.target.value)}
            >
              {DEVELOPMENT_PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Choose your development priority or let AI recommend.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={onPrev}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Previous
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Step7 }; 