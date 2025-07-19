import React from 'react';
import type { StepFormProps } from '../types';
import { 
  getFrontendTechs, 
  getBackendTechs,
  getDatabaseOptions,
  getDeploymentPlatformOptions,
  needsFrontendTech,
  needsBackendTech
} from '../utils/techOptions';
import { useFormStore } from '../store/formStore';

export const Step3: React.FC<StepFormProps> = ({ onNext, onPrev, onUpdate }) => {
  const { formData } = useFormStore();
  
  // Add fallback for undefined formData
  const safeFormData = formData || {
    applicationCategory: 'Let AI Decide',
    frontendTech: 'Let AI Decide',
    customFrontendTech: '',
    backendTech: 'Let AI Decide',
    customBackendTech: '',
    database: 'Let AI Decide',
    customDatabase: '',
    deploymentPlatform: 'Let AI Decide',
    customDeploymentPlatform: ''
  };

  // Get technology options based on application category
  const frontendTechs = getFrontendTechs(safeFormData.applicationCategory);
  const backendTechs = getBackendTechs(safeFormData.applicationCategory);
  const databaseOptions = getDatabaseOptions(safeFormData.applicationCategory);
  const deploymentPlatformOptions = getDeploymentPlatformOptions(safeFormData.applicationCategory);

  // Check if sections should be displayed
  const showFrontendTech = needsFrontendTech(safeFormData.applicationCategory);
  const showBackendTech = needsBackendTech(safeFormData.applicationCategory);

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
            Technology Stack
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose your preferred technologies or let AI recommend the best options.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Frontend Technology - Only show if needed */}
          {showFrontendTech && (
            <div>
              <label htmlFor="frontendTech" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Frontend Technology
              </label>
              <select
                id="frontendTech"
                name="frontendTech"
                value={safeFormData.frontendTech}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                onChange={(e) => handleInputChange('frontendTech', e.target.value)}
              >
                {frontendTechs.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
              {safeFormData.frontendTech === 'Other' && (
                <input
                  type="text"
                  placeholder="Enter your custom frontend technology"
                  value={safeFormData.customFrontendTech}
                  onChange={(e) => handleInputChange('customFrontendTech', e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Choose your preferred frontend framework or let AI decide.
              </p>
            </div>
          )}

          {/* Backend Technology - Only show if needed */}
          {showBackendTech && (
            <div>
              <label htmlFor="backendTech" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Backend Technology
              </label>
              <select
                id="backendTech"
                name="backendTech"
                value={safeFormData.backendTech}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                onChange={(e) => handleInputChange('backendTech', e.target.value)}
              >
                {backendTechs.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
              {safeFormData.backendTech === 'Other' && (
                <input
                  type="text"
                  placeholder="Enter your custom backend technology"
                  value={safeFormData.customBackendTech}
                  onChange={(e) => handleInputChange('customBackendTech', e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Choose your preferred backend framework or let AI decide.
              </p>
            </div>
          )}

          {/* Database */}
          <div>
            <label htmlFor="database" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Database
            </label>
            <select
              id="database"
              name="database"
              value={safeFormData.database}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleInputChange('database', e.target.value)}
            >
              {databaseOptions.map((db) => (
                <option key={db} value={db}>
                  {db}
                </option>
              ))}
            </select>
            {safeFormData.database === 'Other' && (
              <input
                type="text"
                placeholder="Enter your custom database"
                value={safeFormData.customDatabase}
                onChange={(e) => handleInputChange('customDatabase', e.target.value)}
                className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Choose your preferred database or let AI decide.
            </p>
          </div>

          {/* Deployment Platform */}
          <div>
            <label htmlFor="deploymentPlatform" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Deployment Platform
            </label>
            <select
              id="deploymentPlatform"
              name="deploymentPlatform"
              value={safeFormData.deploymentPlatform}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleInputChange('deploymentPlatform', e.target.value)}
            >
              {deploymentPlatformOptions.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
            {safeFormData.deploymentPlatform === 'Other' && (
              <input
                type="text"
                placeholder="Enter your custom deployment platform"
                value={safeFormData.customDeploymentPlatform}
                onChange={(e) => handleInputChange('customDeploymentPlatform', e.target.value)}
                className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Choose your preferred deployment platform or let AI decide.
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