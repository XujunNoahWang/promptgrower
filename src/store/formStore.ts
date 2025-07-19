import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FormData, FormStore, ValidationError } from '../types';
import { generatePromptTemplate } from '../utils/promptTemplate';
import { generatePromptTemplateEn } from '../utils/promptTemplateEn';

// Initial form data
const initialFormData: FormData = {
  // Step 1: Project Basic Information
  appName: '',
  appDescription: '',
  targetUsers: '',
  applicationCategory: 'Let AI Decide',
  customApplicationCategory: '',
  appType: 'Let AI Decide',
  customAppType: '',
  
  // Step 2: Functional Requirements
  coreFunctionality: '',
  userRoles: [],
  customUserRole: '',
  keyModules: [],
  customModule: '',
  
  // Step 3: Technology Stack
  frontendTech: 'Let AI Decide',
  customFrontendTech: '',
  backendTech: 'Let AI Decide',
  customBackendTech: '',
  database: 'Let AI Decide',
  customDatabase: '',
  deploymentPlatform: 'Let AI Decide',
  customDeploymentPlatform: '',
  
  // Step 4: Platform & Compatibility
  targetPlatforms: [],
  customTargetPlatform: '',
  browserCompatibility: [],
  customBrowserCompatibility: '',
  
  // Step 5: User Experience
  uiStyle: 'Let AI Decide',
  basicFeatures: [],
  customBasicFeature: '',
  performanceRequirement: 'Let AI Decide',
  
  // Step 6: Integration & Security
  thirdPartyIntegrations: [],
  customThirdPartyIntegration: '',
  securityRequirements: [],
  customSecurityRequirement: '',
  
  // Step 7: Project Scale & Time
  projectComplexity: 'Let AI Decide',
  developmentPriority: 'Let AI Decide',
  
  // Step 8: Code Standards
  typescriptStandards: [],
  reactStandards: [],
  codeQuality: [],
  performanceOptimization: [],
  gitStandards: [],
  
  // Step 9: Additional Information
  specialRequirements: '',
  referenceApps: '',
  budgetRange: 'Let AI Decide',
};

// Form validation functions
const validateStep1 = (data: FormData): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!data.appName.trim()) {
    errors.push({ field: 'appName', message: 'Application name is required' });
  } else if (data.appName.length < 2 || data.appName.length > 50) {
    errors.push({ field: 'appName', message: 'Application name must be 2-50 characters' });
  }
  
  if (!data.appDescription.trim()) {
    errors.push({ field: 'appDescription', message: 'Application description is required' });
  } else if (data.appDescription.length < 10 || data.appDescription.length > 200) {
    errors.push({ field: 'appDescription', message: 'Application description must be 10-200 characters' });
  }
  
  if (!data.targetUsers.trim()) {
    errors.push({ field: 'targetUsers', message: 'Target users is required' });
  }
  
  return errors;
};

const validateStep2 = (data: FormData): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!data.coreFunctionality.trim()) {
    errors.push({ field: 'coreFunctionality', message: 'Core functionality description is required' });
  } else if (data.coreFunctionality.length < 50) {
    errors.push({ field: 'coreFunctionality', message: 'Core functionality must be at least 50 characters' });
  }
  
  return errors;
};

const validateStep = (step: number, data: FormData): ValidationError[] => {
  switch (step) {
    case 1:
      return validateStep1(data);
    case 2:
      return validateStep2(data);
    default:
      return [];
  }
};

// AI recommendation functions
const getAIRecommendations = (data: FormData): Partial<FormData> => {
  const recommendations: Partial<FormData> = {};
  
  // Recommend application category if not selected or set to "Let AI Decide"
  if (!data.applicationCategory || data.applicationCategory === 'Let AI Decide') {
    recommendations.applicationCategory = 'Web Application';
  }
  
  // Recommend app type if not selected or set to "Let AI Decide"
  if (!data.appType || data.appType === 'Let AI Decide') {
    recommendations.appType = 'Productivity Tool';
  }
  
  // Recommend frontend tech based on application category
  if (!data.frontendTech || data.frontendTech === 'Let AI Decide') {
    switch (data.applicationCategory) {
      case 'Desktop Application':
        recommendations.frontendTech = 'Electron + React';
        break;
      case 'Mobile Application':
        recommendations.frontendTech = 'React Native';
        break;
      case 'Web Application':
        recommendations.frontendTech = 'React + TypeScript';
        break;
      case 'CLI Application':
      case 'Desktop Program (.exe)':
        // Don't recommend frontend tech for CLI and Desktop programs
        break;
      default:
        recommendations.frontendTech = 'React + TypeScript';
    }
  }
  
  // Recommend backend tech based on application category
  if (!data.backendTech || data.backendTech === 'Let AI Decide') {
    switch (data.applicationCategory) {
      case 'Desktop Application':
      case 'Mobile Application':
        recommendations.backendTech = 'Local Database Only';
        break;
      case 'CLI Application':
        recommendations.backendTech = 'Local File System';
        break;
      case 'Desktop Program (.exe)':
        recommendations.backendTech = 'Local Database Only';
        break;
      default:
        recommendations.backendTech = 'Node.js + Express';
    }
  }
  
  // Recommend database if not selected or set to "Let AI Decide"
  if (!data.database || data.database === 'Let AI Decide') {
    switch (data.applicationCategory) {
      case 'Desktop Application':
      case 'Desktop Program (.exe)':
        recommendations.database = 'SQLite';
        break;
      case 'Mobile Application':
        recommendations.database = 'SQLite';
        break;
      case 'CLI Application':
        recommendations.database = 'Local File System';
        break;
      default:
        recommendations.database = 'PostgreSQL';
    }
  }
  
  // Recommend deployment platform if not selected or set to "Let AI Decide"
  if (!data.deploymentPlatform || data.deploymentPlatform === 'Let AI Decide') {
    switch (data.applicationCategory) {
      case 'Desktop Application':
      case 'Desktop Program (.exe)':
        recommendations.deploymentPlatform = 'Local Installation';
        break;
      case 'Mobile Application':
        recommendations.deploymentPlatform = 'App Store';
        break;
      case 'CLI Application':
        recommendations.deploymentPlatform = 'Package Manager';
        break;
      default:
        recommendations.deploymentPlatform = 'Vercel';
    }
  }
  
  // Recommend target platforms based on application category
  if (data.targetPlatforms.length === 0) {
    switch (data.applicationCategory) {
      case 'Desktop Application':
        recommendations.targetPlatforms = ['Cross-platform'];
        break;
      case 'Mobile Application':
        recommendations.targetPlatforms = ['Cross-platform'];
        break;
      case 'CLI Application':
        recommendations.targetPlatforms = ['Cross-platform'];
        break;
      case 'Desktop Program (.exe)':
        recommendations.targetPlatforms = ['Windows'];
        break;
      default:
        recommendations.targetPlatforms = ['Desktop (Web)', 'Mobile (Responsive)'];
    }
  }
  
  // Recommend browser compatibility if not selected
  if (data.browserCompatibility.length === 0) {
    recommendations.browserCompatibility = ['Chrome (Modern)', 'Firefox (Modern)', 'Safari', 'Edge'];
  }
  
  // Recommend UI style if not selected or set to "Let AI Decide"
  if (!data.uiStyle || data.uiStyle === 'Let AI Decide') {
    switch (data.applicationCategory) {
      case 'Desktop Application':
      case 'Desktop Program (.exe)':
        recommendations.uiStyle = 'Native Desktop Style';
        break;
      case 'Mobile Application':
        recommendations.uiStyle = 'Mobile-First Design';
        break;
      case 'CLI Application':
        recommendations.uiStyle = 'Clean Terminal Style';
        break;
      default:
        recommendations.uiStyle = 'Clean Modern Style';
    }
  }
  
  // Recommend basic features if not selected
  if (data.basicFeatures.length === 0) {
    switch (data.applicationCategory) {
      case 'Desktop Application':
      case 'Desktop Program (.exe)':
        recommendations.basicFeatures = ['Multi-language Support', 'Native OS Integration', 'Step Indicators', 'Search Functionality'];
        break;
      case 'Mobile Application':
        recommendations.basicFeatures = ['Multi-language Support', 'Touch Gestures', 'Step Indicators', 'Search Functionality'];
        break;
      case 'CLI Application':
        recommendations.basicFeatures = ['Multi-language Support', 'Help System', 'Step Indicators', 'Color-coded Output'];
        break;
      default:
        recommendations.basicFeatures = ['Responsive Design', 'Dark/Light Mode Toggle', 'Step Indicators', 'Search Functionality'];
    }
  }
  
  // Recommend performance requirement if not selected or set to "Let AI Decide"
  if (!data.performanceRequirement || data.performanceRequirement === 'Let AI Decide') {
    switch (data.applicationCategory) {
      case 'CLI Application':
        recommendations.performanceRequirement = 'CLI Application Performance';
        break;
      case 'Desktop Application':
      case 'Desktop Program (.exe)':
        recommendations.performanceRequirement = 'Desktop Application Performance';
        break;
      case 'Mobile Application':
        recommendations.performanceRequirement = 'Mobile Application Performance';
        break;
      case 'Web Application':
        recommendations.performanceRequirement = 'Standard Web Application Performance';
        break;
      default:
        recommendations.performanceRequirement = 'Balance Performance & Features';
    }
  }
  
  // Recommend third-party integrations if not selected
  if (data.thirdPartyIntegrations.length === 0) {
    recommendations.thirdPartyIntegrations = ['Google Analytics', 'Social Media Login'];
  }
  
  // Recommend security requirements if not selected
  if (data.securityRequirements.length === 0) {
    switch (data.applicationCategory) {
      case 'CLI Application':
        recommendations.securityRequirements = ['CLI Security', 'Input Validation'];
        break;
      case 'Desktop Application':
      case 'Desktop Program (.exe)':
        recommendations.securityRequirements = ['Local Security', 'File System Protection'];
        break;
      case 'Mobile Application':
        recommendations.securityRequirements = ['Mobile Security', 'Data Encryption'];
        break;
      case 'Web Application':
        recommendations.securityRequirements = ['User Authentication & Authorization', 'HTTPS Enforcement'];
        break;
      default:
        recommendations.securityRequirements = ['User Authentication & Authorization', 'HTTPS Enforcement'];
    }
  }
  
  // Recommend project complexity if not selected or set to "Let AI Decide"
  if (!data.projectComplexity || data.projectComplexity === 'Let AI Decide') {
    recommendations.projectComplexity = 'Simple Project (1-2 weeks)';
  }
  
  // Recommend development priority if not selected or set to "Let AI Decide"
  if (!data.developmentPriority || data.developmentPriority === 'Let AI Decide') {
    recommendations.developmentPriority = 'Quick MVP';
  }
  
  // Recommend budget range if not selected
  if (!data.budgetRange) {
    recommendations.budgetRange = 'Free Solution Priority';
  }
  
  // Recommend TypeScript standards if not selected and needed
  if (data.typescriptStandards.length === 0) {
    switch (data.applicationCategory) {
      case 'Desktop Application':
        recommendations.typescriptStandards = ['Strict Type Checking', 'ESLint Configuration'];
        break;
      case 'Mobile Application':
        recommendations.typescriptStandards = ['Strict Type Checking', 'React Native Best Practices'];
        break;
      case 'Web Application':
        recommendations.typescriptStandards = ['Strict Type Checking', 'ESLint Configuration'];
        break;
      case 'CLI Application':
      case 'Desktop Program (.exe)':
        // Don't recommend TypeScript standards for CLI and Desktop programs
        break;
      default:
        recommendations.typescriptStandards = ['Strict Type Checking', 'ESLint Configuration'];
    }
  }
  
  // Recommend React standards if not selected and needed
  if (data.reactStandards.length === 0) {
    switch (data.applicationCategory) {
      case 'Desktop Application':
        recommendations.reactStandards = ['Component Best Practices', 'State Management'];
        break;
      case 'Mobile Application':
        recommendations.reactStandards = ['React Native Best Practices', 'Component Best Practices'];
        break;
      case 'Web Application':
        recommendations.reactStandards = ['Component Best Practices', 'State Management'];
        break;
      case 'CLI Application':
      case 'Desktop Program (.exe)':
        // Don't recommend React standards for CLI and Desktop programs
        break;
      default:
        recommendations.reactStandards = ['Component Best Practices', 'State Management'];
    }
  }
  
  // Recommend code quality standards if not selected
  if (data.codeQuality.length === 0) {
    switch (data.applicationCategory) {
      case 'CLI Application':
        recommendations.codeQuality = ['Code Documentation', 'Error Handling'];
        break;
      case 'Desktop Program (.exe)':
        recommendations.codeQuality = ['Code Documentation', 'Error Handling'];
        break;
      default:
        recommendations.codeQuality = ['Code Documentation', 'ESLint Configuration'];
    }
  }
  
  // Recommend performance optimization if not selected
  if (data.performanceOptimization.length === 0) {
    switch (data.applicationCategory) {
      case 'CLI Application':
        recommendations.performanceOptimization = ['Memory Management', 'Efficient Algorithms'];
        break;
      case 'Desktop Program (.exe)':
        recommendations.performanceOptimization = ['Memory Management', 'Efficient Algorithms'];
        break;
      default:
        recommendations.performanceOptimization = ['Code Splitting', 'Lazy Loading'];
    }
  }
  
  // Recommend Git standards if not selected
  if (data.gitStandards.length === 0) {
    recommendations.gitStandards = ['Conventional Commits', 'Branch Naming'];
  }
  
  return recommendations;
};

// Generate meta prompt
const generateMetaPrompt = (data: FormData): string => {
  const recommendations = getAIRecommendations(data);
  const finalData = { ...data, ...recommendations };
  
  // Re-run recommendations with the final application category to ensure consistency
  const finalRecommendations = getAIRecommendations(finalData);
  const consistentFinalData = { ...finalData, ...finalRecommendations };
  
  // Use English template for the current English-only application
  return generatePromptTemplateEn(consistentFinalData);
};

// Create Zustand store
export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      // Initial state
      formData: initialFormData,
      currentStep: 1,
      totalSteps: 9,
      isDarkMode: true,
      isLoading: false,
      errors: [],
      
      // Actions
      updateFormData: (updates: Partial<FormData>) => {
        set((state) => ({
          formData: { ...state.formData, ...updates },
        }));
        get().saveToLocalStorage();
      },
      
      setCurrentStep: (step: number) => {
        set({ currentStep: step });
      },
      
      nextStep: () => {
        const { currentStep, totalSteps, formData } = get();
        const errors = validateStep(currentStep, formData);
        
        if (errors.length > 0) {
          set({ errors });
          return;
        }
        
        if (currentStep < totalSteps) {
          set({ currentStep: currentStep + 1, errors: [] });
        }
      },
      
      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1, errors: [] });
        }
      },
      
      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
        const { isDarkMode } = get();
        document.documentElement.classList.toggle('dark', isDarkMode);
      },
      
      validateStep: (step: number) => {
        const { formData } = get();
        const errors = validateStep(step, formData);
        set({ errors });
        return errors;
      },
      
      generateMetaPrompt: () => {
        const { formData } = get();
        return generateMetaPrompt(formData);
      },
      
      resetForm: () => {
        set({
          formData: initialFormData,
          currentStep: 1,
          errors: [],
        });
        localStorage.removeItem('prompt-grower-form');
      },
      
      saveToLocalStorage: () => {
        const { formData, isDarkMode } = get();
        localStorage.setItem('prompt-grower-form', JSON.stringify({ formData, isDarkMode }));
      },
      
      loadFromLocalStorage: () => {
        try {
          const saved = localStorage.getItem('prompt-grower-form');
          if (saved) {
            const parsed = JSON.parse(saved);
            const { formData, isDarkMode } = parsed;
            
            // Validate and merge with initial data to ensure all fields exist
            const validatedFormData = { ...initialFormData, ...formData };
            
            set({ formData: validatedFormData, isDarkMode: !!isDarkMode });
            if (isDarkMode) {
              document.documentElement.classList.add('dark');
            }
          }
        } catch (error) {
          console.error('Failed to load form data from localStorage:', error);
          // Reset to initial state if loading fails
          set({ formData: initialFormData, isDarkMode: true });
        }
      },
    }),
    {
      name: 'prompt-grower-form',
      partialize: (state) => ({ formData: state.formData, isDarkMode: state.isDarkMode }),
    }
  )
); 