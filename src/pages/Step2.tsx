import React from 'react';
import type { StepFormProps } from '../types';
import { USER_ROLES, KEY_MODULES } from '../types';
import { useFormStore } from '../store/formStore';

export const Step2: React.FC<StepFormProps> = ({ onNext, onPrev, onUpdate }) => {
  const { formData } = useFormStore();
  
  // Add fallback for undefined formData
  const safeFormData = formData || {
    coreFunctionality: '',
    userRoles: [],
    customUserRole: '',
    keyModules: [],
    customModule: ''
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onNext();
  };

  const handleUserRoleChange = (role: string, checked: boolean): void => {
    const updatedRoles = checked
      ? [...safeFormData.userRoles, role]
      : safeFormData.userRoles.filter((r) => r !== role);
    onUpdate({ userRoles: updatedRoles });
  };

  const handleKeyModuleChange = (module: string, checked: boolean): void => {
    const updatedModules = checked
      ? [...safeFormData.keyModules, module]
      : safeFormData.keyModules.filter((m) => m !== module);
    onUpdate({ keyModules: updatedModules });
  };

  const handleInputChange = (field: string, value: string): void => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Functional Requirements
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Describe what your application should do and who will use it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Core Functionality */}
          <div>
            <label htmlFor="coreFunctionality" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Core Functionality Description *
            </label>
            <textarea
              id="coreFunctionality"
              name="coreFunctionality"
              value={safeFormData.coreFunctionality}
              rows={4}
              placeholder="Please describe in detail what you want your application to do. For example: 'Users can create todo items, set reminders, invite team members to collaborate, and track progress with analytics.'"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleInputChange('coreFunctionality', e.target.value)}
              required
              minLength={50}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              At least 50 characters. Be as detailed as possible.
            </p>
          </div>

          {/* User Roles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              User Roles
            </label>
            <div className="space-y-2">
              {USER_ROLES.slice(0, -1).map((role) => (
                <label key={role} className="flex items-center">
                  <input
                    type="checkbox"
                    name="userRoles"
                    value={role}
                    checked={safeFormData.userRoles.includes(role)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleUserRoleChange(role, e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{role}</span>
                </label>
              ))}
              
              {/* Other option with input field */}
              <div className="flex items-center space-x-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="userRoles"
                    value="Other"
                    checked={safeFormData.userRoles.includes('Other')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleUserRoleChange('Other', e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Other</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter other user roles"
                  value={safeFormData.customUserRole}
                  onChange={(e) => handleInputChange('customUserRole', e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  disabled={!safeFormData.userRoles.includes('Other')}
                />
              </div>
            </div>
            
            <div className="mt-3 space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Select all user types that will use your application.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                If you don't select any, AI will decide for you.
              </p>
            </div>
          </div>

          {/* Key Function Modules */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Key Function Modules
            </label>
            <div className="space-y-2">
              {KEY_MODULES.slice(0, -1).map((module) => (
                <label key={module} className="flex items-center">
                  <input
                    type="checkbox"
                    name="keyModules"
                    value={module}
                    checked={safeFormData.keyModules.includes(module)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleKeyModuleChange(module, e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{module}</span>
                </label>
              ))}
              
              {/* Other option with input field */}
              <div className="flex items-center space-x-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="keyModules"
                    value="Other"
                    checked={safeFormData.keyModules.includes('Other')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                    onChange={(e) => handleKeyModuleChange('Other', e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Other</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter other modules"
                  value={safeFormData.customModule}
                  onChange={(e) => handleInputChange('customModule', e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  disabled={!safeFormData.keyModules.includes('Other')}
                />
              </div>
            </div>
            
            <div className="mt-3 space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Select the main features your application will need.
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