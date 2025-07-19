import React from 'react';
import type { StepFormProps } from '../types';
import { getThirdPartyIntegrations, getSecurityRequirements } from '../utils/techOptions';
import { useFormStore } from '../store/formStore';

const Step6: React.FC<StepFormProps> = ({ onNext, onPrev, onUpdate }) => {
  const { formData } = useFormStore();
  
  // Add fallback for undefined formData
  const safeFormData = formData || {
    applicationCategory: 'Let AI Decide',
    thirdPartyIntegrations: [],
    customThirdPartyIntegration: '',
    securityRequirements: [],
    customSecurityRequirement: ''
  };

  // Get options based on application category
  const thirdPartyIntegrations = getThirdPartyIntegrations(safeFormData.applicationCategory);
  const securityRequirements = getSecurityRequirements(safeFormData.applicationCategory);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onNext();
  };

  const handleThirdPartyIntegrationChange = (integration: string, checked: boolean): void => {
    const updatedIntegrations = checked
      ? [...safeFormData.thirdPartyIntegrations, integration]
      : safeFormData.thirdPartyIntegrations.filter((i) => i !== integration);
    onUpdate({ thirdPartyIntegrations: updatedIntegrations });
  };

  const handleSecurityRequirementChange = (security: string, checked: boolean): void => {
    const updatedSecurity = checked
      ? [...safeFormData.securityRequirements, security]
      : safeFormData.securityRequirements.filter((s) => s !== security);
    onUpdate({ securityRequirements: updatedSecurity });
  };

  const handleInputChange = (field: string, value: string): void => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Integration & Security
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Configure third-party integrations and security requirements.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Third Party Integrations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Third Party Integrations
            </label>
            <div className="space-y-2">
              {thirdPartyIntegrations.slice(0, -1).map((integration: string) => (
                <label key={integration} className="flex items-center">
                  <input
                    type="checkbox"
                    name="thirdPartyIntegrations"
                    value={integration}
                    checked={safeFormData.thirdPartyIntegrations.includes(integration)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleThirdPartyIntegrationChange(integration, e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{integration}</span>
                </label>
              ))}
              
              {/* Other option with input field */}
              <div className="flex items-center space-x-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="thirdPartyIntegrations"
                    value="Other"
                    checked={safeFormData.thirdPartyIntegrations.includes('Other')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleThirdPartyIntegrationChange('Other', e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Other</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter other integrations"
                  value={safeFormData.customThirdPartyIntegration}
                  onChange={(e) => handleInputChange('customThirdPartyIntegration', e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  disabled={!safeFormData.thirdPartyIntegrations.includes('Other')}
                />
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Select third-party services your application will integrate with.
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              If you don't select any, AI will decide for you.
            </p>
          </div>

          {/* Security Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Security Requirements
            </label>
            <div className="space-y-2">
              {securityRequirements.slice(0, -1).map((security: string) => (
                <label key={security} className="flex items-center">
                  <input
                    type="checkbox"
                    name="securityRequirements"
                    value={security}
                    checked={safeFormData.securityRequirements.includes(security)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleSecurityRequirementChange(security, e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{security}</span>
                </label>
              ))}
              
              {/* Other option with input field */}
              <div className="flex items-center space-x-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="securityRequirements"
                    value="Other"
                    checked={safeFormData.securityRequirements.includes('Other')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleSecurityRequirementChange('Other', e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Other</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter other security requirements"
                  value={safeFormData.customSecurityRequirement}
                  onChange={(e) => handleInputChange('customSecurityRequirement', e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  disabled={!safeFormData.securityRequirements.includes('Other')}
                />
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Select security measures your application should implement.
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

export { Step6 }; 