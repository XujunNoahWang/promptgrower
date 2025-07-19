import React from 'react';
import type { StepFormProps } from '../types';
import { BUDGET_RANGES } from '../types';
import { useFormStore } from '../store/formStore';

export const Step9: React.FC<StepFormProps> = ({ onNext, onPrev, onUpdate }) => {
  const { formData } = useFormStore();
  
  // Add fallback for undefined formData
  const safeFormData = formData || {
    specialRequirements: '',
    referenceApps: '',
    budgetRange: 'Let AI Choose Most Economical'
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
            Additional Information
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Provide any additional requirements or references for your project.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Special Requirements */}
          <div>
            <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Special Requirements
            </label>
            <textarea
              id="specialRequirements"
              name="specialRequirements"
              value={safeFormData.specialRequirements}
              rows={4}
              placeholder="Any special requirements, constraints, or specific implementation details..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Optional: Any special requirements, constraints, or specific implementation details.
            </p>
          </div>

          {/* Reference Applications */}
          <div>
            <label htmlFor="referenceApps" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reference Applications
            </label>
            <input
              type="text"
              id="referenceApps"
              name="referenceApps"
              value={safeFormData.referenceApps}
              placeholder="e.g., Similar to Notion, Like Figma, etc."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleInputChange('referenceApps', e.target.value)}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Optional: Any similar applications you'd like to reference.
            </p>
          </div>

          {/* Budget Range */}
          <div>
            <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Budget Range
            </label>
            <select
              id="budgetRange"
              name="budgetRange"
              value={safeFormData.budgetRange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleInputChange('budgetRange', e.target.value)}
            >
              {BUDGET_RANGES.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Choose your budget preference or let AI recommend the most economical solution.
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
              Generate Meta Prompt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 