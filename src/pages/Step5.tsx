import React from 'react';
import type { StepFormProps } from '../types';
import { PERFORMANCE_REQUIREMENTS } from '../types';
import { getUIStyles, getBasicFeatures } from '../utils/techOptions';
import { useFormStore } from '../store/formStore';

const Step5: React.FC<StepFormProps> = ({ onNext, onPrev, onUpdate }) => {
  const { formData } = useFormStore();
  
  // Add fallback for undefined formData
  const safeFormData = formData || {
    applicationCategory: 'Let AI Decide',
    uiStyle: 'Let AI Decide',
    basicFeatures: [],
    customBasicFeature: '',
    performanceRequirement: 'Let AI Decide'
  };

  // Get options based on application category
  const uiStyles = getUIStyles(safeFormData.applicationCategory);
  const basicFeatures = getBasicFeatures(safeFormData.applicationCategory);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onNext();
  };

  const handleBasicFeatureChange = (feature: string, checked: boolean): void => {
    const updatedFeatures = checked
      ? [...safeFormData.basicFeatures, feature]
      : safeFormData.basicFeatures.filter((f) => f !== feature);
    onUpdate({ basicFeatures: updatedFeatures });
  };

  const handleInputChange = (field: string, value: string): void => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            User Experience Settings
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Configure the look, feel, and performance of your application.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* UI Style */}
          <div>
            <label htmlFor="uiStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              UI/UX Style
            </label>
            <select
              id="uiStyle"
              name="uiStyle"
              value={safeFormData.uiStyle}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleInputChange('uiStyle', e.target.value)}
            >
              {uiStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Choose your preferred UI style or let AI decide.
            </p>
          </div>

          {/* Basic Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Basic Features
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {basicFeatures.slice(0, -1).map((feature) => (
                <label key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    name="basicFeatures"
                    value={feature}
                    checked={safeFormData.basicFeatures.includes(feature)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleBasicFeatureChange(feature, e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </label>
              ))}
            </div>
            
            {/* Other option with input field */}
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="basicFeatures"
                    value="Other"
                    checked={safeFormData.basicFeatures.includes('Other')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleBasicFeatureChange('Other', e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Other</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter other features"
                  value={safeFormData.customBasicFeature}
                  onChange={(e) => handleInputChange('customBasicFeature', e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  disabled={!safeFormData.basicFeatures.includes('Other')}
                />
              </div>
            </div>
            
            <div className="mt-3 space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Select the basic features your application should include.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                If you don't select any, AI will decide for you.
              </p>
            </div>
          </div>

          {/* Performance Requirements */}
          <div>
            <label htmlFor="performanceRequirement" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Performance Requirements
            </label>
            <select
              id="performanceRequirement"
              name="performanceRequirement"
              value={safeFormData.performanceRequirement}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleInputChange('performanceRequirement', e.target.value)}
            >
              {PERFORMANCE_REQUIREMENTS.map((req) => (
                <option key={req} value={req}>
                  {req}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Choose your performance priority or let AI decide.
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

export { Step5 }; 