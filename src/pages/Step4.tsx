import React from 'react';
import type { StepFormProps } from '../types';
import { getTargetPlatforms, getCompatibilityOptions, getCompatibilityTitle, getCompatibilityDescription } from '../utils/techOptions';
import { useFormStore } from '../store/formStore';

export const Step4: React.FC<StepFormProps> = ({ onNext, onPrev, onUpdate }) => {
  const { formData } = useFormStore();
  
  // Add fallback for undefined formData
  const safeFormData = formData || {
    applicationCategory: 'Let AI Decide',
    targetPlatforms: [],
    customTargetPlatform: '',
    browserCompatibility: [],
    customBrowserCompatibility: ''
  };

  // Get target platforms based on application category
  const targetPlatforms = getTargetPlatforms(safeFormData.applicationCategory);
  
  // Get compatibility options based on application category
  const compatibilityOptions = getCompatibilityOptions(safeFormData.applicationCategory);
  const compatibilityTitle = getCompatibilityTitle(safeFormData.applicationCategory);
  const compatibilityDescription = getCompatibilityDescription(safeFormData.applicationCategory);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onNext();
  };

  const handleTargetPlatformChange = (platform: string, checked: boolean): void => {
    const updatedPlatforms = checked
      ? [...safeFormData.targetPlatforms, platform]
      : safeFormData.targetPlatforms.filter((p) => p !== platform);
    onUpdate({ targetPlatforms: updatedPlatforms });
  };

  const handleBrowserCompatibilityChange = (browser: string, checked: boolean): void => {
    const updatedBrowsers = checked
      ? [...safeFormData.browserCompatibility, browser]
      : safeFormData.browserCompatibility.filter((b) => b !== browser);
    onUpdate({ browserCompatibility: updatedBrowsers });
  };

  const handleInputChange = (field: string, value: string): void => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Platform & Compatibility
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Define your target platforms and compatibility requirements.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Target Platforms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Target Platforms
            </label>
            <div className="space-y-2">
              {targetPlatforms.slice(0, -1).map((platform) => (
                <label key={platform} className="flex items-center">
                  <input
                    type="checkbox"
                    name="targetPlatforms"
                    value={platform}
                    checked={safeFormData.targetPlatforms.includes(platform)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleTargetPlatformChange(platform, e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{platform}</span>
                </label>
              ))}
              
              {/* Other option with input field */}
              <div className="flex items-center space-x-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="targetPlatforms"
                    value="Other"
                    checked={safeFormData.targetPlatforms.includes('Other')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleTargetPlatformChange('Other', e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Other</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter other platforms"
                  value={safeFormData.customTargetPlatform}
                  onChange={(e) => handleInputChange('customTargetPlatform', e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  disabled={!safeFormData.targetPlatforms.includes('Other')}
                />
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Select all platforms where your application will be used.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                If you don't select any, AI will decide for you.
              </p>
            </div>
          </div>

          {/* Dynamic Compatibility Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {compatibilityTitle}
            </label>
            <div className="space-y-2">
              {compatibilityOptions.slice(0, -1).map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    name="browserCompatibility"
                    value={option}
                    checked={safeFormData.browserCompatibility.includes(option)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleBrowserCompatibilityChange(option, e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{option}</span>
                </label>
              ))}
              
              {/* Other option with input field */}
              <div className="flex items-center space-x-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="browserCompatibility"
                    value="Other"
                    checked={safeFormData.browserCompatibility.includes('Other')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleBrowserCompatibilityChange('Other', e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Other</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter other compatibility options"
                  value={safeFormData.customBrowserCompatibility}
                  onChange={(e) => handleInputChange('customBrowserCompatibility', e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  disabled={!safeFormData.browserCompatibility.includes('Other')}
                />
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {compatibilityDescription}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                If you don't select any, AI will decide for you.
              </p>
            </div>
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