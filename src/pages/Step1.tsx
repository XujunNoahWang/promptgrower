import React from 'react';
import type { StepFormProps } from '../types';
import { APPLICATION_CATEGORIES, APP_TYPES } from '../types';
import { useFormStore } from '../store/formStore';

export const Step1: React.FC<StepFormProps> = ({ onNext, onPrev, onUpdate }) => {
  const { formData } = useFormStore();
  
  // Add fallback for undefined formData
  const safeFormData = formData || {
    appName: '',
    appDescription: '',
    targetUsers: '',
    applicationCategory: 'Let AI Decide',
    customApplicationCategory: '',
    appType: 'Let AI Decide',
    customAppType: ''
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Basic Information
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Let's start with the fundamental details about your application.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Application Name */}
          <div>
            <label htmlFor="appName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Application Name *
            </label>
            <input
              type="text"
              id="appName"
              name="appName"
              value={safeFormData.appName}
              placeholder="e.g., Todo List, YouTube Video Downloader"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleInputChange('appName', e.target.value)}
              required
              minLength={2}
              maxLength={50}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              2-50 characters.
            </p>
          </div>

          {/* Application Description */}
          <div>
            <label htmlFor="appDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Application Description *
            </label>
            <textarea
              id="appDescription"
              name="appDescription"
              value={safeFormData.appDescription}
              rows={3}
              placeholder="Describe your application in 1-2 sentences"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleInputChange('appDescription', e.target.value)}
              required
              minLength={10}
              maxLength={200}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              10-200 characters.
            </p>
          </div>

          {/* Target Users */}
          <div>
            <label htmlFor="targetUsers" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Users *
            </label>
            <input
              type="text"
              id="targetUsers"
              name="targetUsers"
              value={safeFormData.targetUsers}
              placeholder="e.g., Students, Software Developers, Non-technical Users"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleInputChange('targetUsers', e.target.value)}
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Who will use this application?
            </p>
          </div>

          {/* Application Category */}
          <div>
            <label htmlFor="applicationCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Application Category
            </label>
            <select
              id="applicationCategory"
              name="applicationCategory"
              value={safeFormData.applicationCategory}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleInputChange('applicationCategory', e.target.value)}
            >
              {APPLICATION_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {safeFormData.applicationCategory === 'Other' && (
              <input
                type="text"
                placeholder="Enter your custom application category"
                value={safeFormData.customApplicationCategory}
                onChange={(e) => handleInputChange('customApplicationCategory', e.target.value)}
                className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Choose the type of application you want to develop, or let AI decide for you.
            </p>
          </div>

          {/* Application Type */}
          <div>
            <label htmlFor="appType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Application Type
            </label>
            <select
              id="appType"
              name="appType"
              value={safeFormData.appType}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleInputChange('appType', e.target.value)}
            >
              {APP_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {safeFormData.appType === 'Other' && (
              <input
                type="text"
                placeholder="Enter your custom application type"
                value={safeFormData.customAppType}
                onChange={(e) => handleInputChange('customAppType', e.target.value)}
                className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Choose the most appropriate category for your application, or let AI decide for you.
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