import React from 'react';
import type { StepFormProps } from '../types';
import { 
  getTypeScriptStandards, 
  getReactStandards,
  getCodeQualityOptions,
  getPerformanceOptimizationOptions,
  getGitStandardsOptions,
  shouldShowTypeScriptStandards,
  shouldShowReactStandards
} from '../utils/techOptions';
import { useFormStore } from '../store/formStore';

export const Step8: React.FC<StepFormProps> = ({ onNext, onPrev, onUpdate }) => {
  const { formData } = useFormStore();
  
  // Add fallback for undefined formData
  const safeFormData = formData || {
    applicationCategory: 'Let AI Decide',
    frontendTech: 'Let AI Decide',
    backendTech: 'Let AI Decide',
    typescriptStandards: [],
    reactStandards: [],
    codeQuality: [],
    performanceOptimization: [],
    gitStandards: []
  };

  // Get code standards based on application category
  const typescriptStandards = getTypeScriptStandards(safeFormData.applicationCategory);
  const reactStandards = getReactStandards(safeFormData.applicationCategory);
  const codeQualityOptions = getCodeQualityOptions(safeFormData.applicationCategory);
  const performanceOptimizationOptions = getPerformanceOptimizationOptions(safeFormData.applicationCategory);
  const gitStandardsOptions = getGitStandardsOptions(safeFormData.applicationCategory);

  // Check if sections should be displayed based on selected technologies
  const showTypeScriptStandards = shouldShowTypeScriptStandards(
    safeFormData.applicationCategory, 
    safeFormData.frontendTech, 
    safeFormData.backendTech
  );
  const showReactStandards = shouldShowReactStandards(
    safeFormData.applicationCategory, 
    safeFormData.frontendTech
  );

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onNext();
  };

  const handleArrayChange = (field: string, value: string, checked: boolean): void => {
    const currentArray = safeFormData[field as keyof typeof safeFormData] as string[];
    const updatedArray = checked
      ? [...currentArray, value]
      : currentArray.filter((item) => item !== value);
    onUpdate({ [field]: updatedArray });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Code Standards
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Define your preferred code standards and best practices.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TypeScript Standards - Only show if needed */}
          {showTypeScriptStandards && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                TypeScript Standards
              </label>
              <div className="space-y-2">
                {typescriptStandards.map((standard) => (
                  <label key={standard} className="flex items-center">
                    <input
                      type="checkbox"
                      name="typescriptStandards"
                      value={standard}
                      checked={safeFormData.typescriptStandards.includes(standard)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                      onChange={(e) => handleArrayChange('typescriptStandards', standard, e.target.checked)}
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{standard}</span>
                  </label>
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Select TypeScript coding standards to follow.
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                If you don't select any, AI will decide for you.
              </p>
            </div>
          )}

          {/* React Standards - Only show if needed */}
          {showReactStandards && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                React Standards
              </label>
              <div className="space-y-2">
                {reactStandards.map((standard) => (
                  <label key={standard} className="flex items-center">
                    <input
                      type="checkbox"
                      name="reactStandards"
                      value={standard}
                      checked={safeFormData.reactStandards.includes(standard)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                      onChange={(e) => handleArrayChange('reactStandards', standard, e.target.checked)}
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{standard}</span>
                  </label>
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Select React coding standards to follow.
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                If you don't select any, AI will decide for you.
              </p>
            </div>
          )}

          {/* Code Quality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Code Quality
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {codeQualityOptions.map((quality) => (
                <label key={quality} className="flex items-center">
                  <input
                    type="checkbox"
                    name="codeQuality"
                    value={quality}
                    checked={safeFormData.codeQuality.includes(quality)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleArrayChange('codeQuality', quality, e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{quality}</span>
                </label>
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Select code quality measures to implement.
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              If you don't select any, AI will decide for you.
            </p>
          </div>

          {/* Performance Optimization */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Performance Optimization
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {performanceOptimizationOptions.map((optimization) => (
                <label key={optimization} className="flex items-center">
                  <input
                    type="checkbox"
                    name="performanceOptimization"
                    value={optimization}
                    checked={safeFormData.performanceOptimization.includes(optimization)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleArrayChange('performanceOptimization', optimization, e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{optimization}</span>
                </label>
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Select performance optimization strategies.
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              If you don't select any, AI will decide for you.
            </p>
          </div>

          {/* Git Standards */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Git Standards
            </label>
            <div className="space-y-2">
              {gitStandardsOptions.map((standard) => (
                <label key={standard} className="flex items-center">
                  <input
                    type="checkbox"
                    name="gitStandards"
                    value={standard}
                    checked={safeFormData.gitStandards.includes(standard)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleArrayChange('gitStandards', standard, e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{standard}</span>
                </label>
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Select Git workflow standards to follow.
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              If you don't select any, AI will decide for you.
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