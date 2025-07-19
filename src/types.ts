import React from 'react';

// Form data types based on prompt_grower_form.md structure
export interface FormData {
  // Step 1: Project Basic Information
  appName: string;
  appDescription: string;
  targetUsers: string;
  applicationCategory: string; // New field for application type (Web, Desktop, Mobile, CLI, etc.)
  customApplicationCategory: string;
  appType: string;
  customAppType: string;
  
  // Step 2: Functional Requirements
  coreFunctionality: string;
  userRoles: string[];
  customUserRole: string;
  keyModules: string[];
  customModule: string;
  
  // Step 3: Technology Stack
  frontendTech: string;
  customFrontendTech: string;
  backendTech: string;
  customBackendTech: string;
  database: string;
  customDatabase: string;
  deploymentPlatform: string;
  customDeploymentPlatform: string;
  
  // Step 4: Platform & Compatibility
  targetPlatforms: string[];
  customTargetPlatform: string;
  browserCompatibility: string[];
  customBrowserCompatibility: string;
  
  // Step 5: User Experience
  uiStyle: string;
  basicFeatures: string[];
  customBasicFeature: string;
  performanceRequirement: string;
  
  // Step 6: Integration & Security
  thirdPartyIntegrations: string[];
  customThirdPartyIntegration: string;
  securityRequirements: string[];
  customSecurityRequirement: string;
  
  // Step 7: Project Scale & Time
  projectComplexity: string;
  developmentPriority: string;
  
  // Step 8: Code Standards
  typescriptStandards: string[];
  reactStandards: string[];
  codeQuality: string[];
  performanceOptimization: string[];
  gitStandards: string[];
  
  // Step 9: Additional Information
  specialRequirements: string;
  referenceApps: string;
  budgetRange: string;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

// Store types
export interface FormStore {
  // Form data
  formData: FormData;
  
  // UI state
  currentStep: number;
  totalSteps: number;
  isDarkMode: boolean;
  isLoading: boolean;
  errors: ValidationError[];
  
  // Actions
  updateFormData: (updates: Partial<FormData>) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  toggleDarkMode: () => void;
  validateStep: (step: number) => ValidationError[];
  generateMetaPrompt: () => string;
  resetForm: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

// Component prop types
export interface StepFormProps {
  step?: number;
  onNext: () => void;
  onPrev: () => void;
  onUpdate: (updates: Partial<FormData>) => void;
}

export interface PreviewPaneProps {
  metaPrompt: string;
  onCopy: () => void;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Form field options
export const APPLICATION_CATEGORIES = [
  'Let AI Decide',
  'Web Application',
  'Desktop Application',
  'Mobile Application',
  'CLI Application',
  'Desktop Program (.exe)',
  'Other'
] as const;

export const APP_TYPES = [
  'Let AI Decide',
  'Productivity Tool',
  'Educational App',
  'Entertainment App',
  'E-commerce App',
  'Social App',
  'Utility App',
  'Other'
] as const;

export const USER_ROLES = [
  'Admin',
  'Regular User',
  'Guest',
  'Other'
] as const;

export const KEY_MODULES = [
  'User Authentication',
  'Data Management',
  'File Upload',
  'Real-time Notifications',
  'Search Functionality',
  'Data Analytics/Reports',
  'Payment Integration',
  'Email Sending',
  'API Integration',
  'Other'
] as const;

// Web Application Technologies
export const WEB_FRONTEND_TECHS = [
  'Let AI Decide',
  'React + TypeScript',
  'Vue.js + TypeScript',
  'Angular',
  'Next.js',
  'Nuxt.js',
  'Vanilla HTML/CSS/JS',
  'Other'
] as const;

// Desktop Application Technologies
export const DESKTOP_TECHS = [
  'Let AI Decide',
  'Electron + React',
  'Electron + Vue',
  'Tauri + React',
  'Tauri + Vue',
  'WPF + C#',
  'Qt + Python',
  'JavaFX + Java',
  'Other'
] as const;

// Mobile Application Technologies
export const MOBILE_TECHS = [
  'Let AI Decide',
  'React Native',
  'Flutter',
  'Ionic',
  'Xamarin',
  'Native iOS (Swift)',
  'Native Android (Kotlin)',
  'Other'
] as const;

// CLI Application Technologies
export const CLI_TECHS = [
  'Let AI Decide',
  'Node.js + TypeScript',
  'Python',
  'Go',
  'Rust',
  'C++',
  'C#',
  'Other'
] as const;

// Desktop Program Technologies
export const DESKTOP_PROGRAM_TECHS = [
  'Let AI Decide',
  'C# + WPF',
  'C# + WinForms',
  'C++ + Qt',
  'Python + Tkinter',
  'Java + Swing',
  'Delphi',
  'Other'
] as const;

// Legacy - keeping for backward compatibility
export const FRONTEND_TECHS = WEB_FRONTEND_TECHS;

// Web Backend Technologies
export const WEB_BACKEND_TECHS = [
  'Let AI Decide',
  'Node.js + Express',
  'Python + FastAPI',
  'Python + Django',
  'Java + Spring Boot',
  'C# + .NET',
  'Go + Gin',
  'No Backend',
  'Other'
] as const;

// Desktop/Mobile Backend Technologies
export const DESKTOP_MOBILE_BACKEND_TECHS = [
  'Let AI Decide',
  'Local Database Only',
  'REST API Integration',
  'GraphQL API',
  'Firebase Backend',
  'Supabase Backend',
  'Custom Backend',
  'No Backend',
  'Other'
] as const;

// CLI Backend Technologies
export const CLI_BACKEND_TECHS = [
  'Let AI Decide',
  'Local File System',
  'SQLite Database',
  'REST API Integration',
  'Command Line Arguments',
  'Configuration Files',
  'No Backend',
  'Other'
] as const;

// Legacy - keeping for backward compatibility
export const BACKEND_TECHS = WEB_BACKEND_TECHS;

export const DATABASES = [
  'Let AI Decide',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'SQLite',
  'Firebase',
  'Supabase',
  'No Database Needed',
  'Other'
] as const;

// Database options for different application types
export const WEB_DATABASES = [
  'Let AI Decide',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'SQLite',
  'Firebase',
  'Supabase',
  'No Database Needed',
  'Other'
] as const;

export const DESKTOP_DATABASES = [
  'Let AI Decide',
  'SQLite',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Local File Storage',
  'No Database Needed',
  'Other'
] as const;

export const MOBILE_DATABASES = [
  'Let AI Decide',
  'SQLite',
  'Firebase',
  'Supabase',
  'Local Storage',
  'Cloud Database',
  'No Database Needed',
  'Other'
] as const;

export const CLI_DATABASES = [
  'Let AI Decide',
  'SQLite',
  'JSON Files',
  'CSV Files',
  'Local File Storage',
  'No Database Needed',
  'Other'
] as const;

export const DEPLOYMENT_PLATFORMS = [
  'Let AI Decide',
  'Vercel',
  'Netlify',
  'AWS',
  'Google Cloud',
  'Azure',
  'Local Deployment',
  'Other'
] as const;

// Deployment platform options for different application types
export const WEB_DEPLOYMENT_PLATFORMS = [
  'Let AI Decide',
  'Vercel',
  'Netlify',
  'AWS',
  'Google Cloud',
  'Azure',
  'Heroku',
  'DigitalOcean',
  'Other'
] as const;

export const DESKTOP_DEPLOYMENT_PLATFORMS = [
  'Let AI Decide',
  'GitHub Releases',
  'Microsoft Store',
  'Mac App Store',
  'Direct Download',
  'Package Managers',
  'Other'
] as const;

export const MOBILE_DEPLOYMENT_PLATFORMS = [
  'Let AI Decide',
  'App Store',
  'Google Play Store',
  'TestFlight',
  'Internal Distribution',
  'Other'
] as const;

export const CLI_DEPLOYMENT_PLATFORMS = [
  'Let AI Decide',
  'npm Package',
  'Homebrew (macOS)',
  'Chocolatey (Windows)',
  'Direct Download',
  'Package Managers',
  'Other'
] as const;

// Web Application Platforms
export const WEB_TARGET_PLATFORMS = [
  'Desktop (Web)',
  'Mobile (Responsive)',
  'Mobile (Native App)',
  'Tablet',
  'Let AI Choose Best Option'
] as const;

// Desktop Application Platforms
export const DESKTOP_TARGET_PLATFORMS = [
  'Windows',
  'macOS',
  'Linux',
  'Cross-platform',
  'Let AI Choose Best Option'
] as const;

// Mobile Application Platforms
export const MOBILE_TARGET_PLATFORMS = [
  'iOS',
  'Android',
  'Cross-platform',
  'Let AI Choose Best Option'
] as const;

// CLI Application Platforms
export const CLI_TARGET_PLATFORMS = [
  'Windows',
  'macOS',
  'Linux',
  'Cross-platform',
  'Let AI Choose Best Option'
] as const;

// Legacy - keeping for backward compatibility
export const TARGET_PLATFORMS = WEB_TARGET_PLATFORMS;

export const BROWSER_COMPATIBILITY = [
  'Chrome (Modern)',
  'Firefox (Modern)',
  'Safari',
  'Edge',
  'Legacy Browser Support',
  'Let AI Choose Best Option'
] as const;

// Compatibility options for CLI and Desktop Program applications
export const SYSTEM_COMPATIBILITY = [
  'Windows 10/11',
  'Windows 7/8',
  'macOS 10.15+',
  'macOS 11+',
  'Linux (Ubuntu/Debian)',
  'Linux (CentOS/RHEL)',
  'Cross-platform',
  'Let AI Choose Best Option'
] as const;

export const UI_STYLES = [
  'Let AI Decide',
  'Clean Modern Style',
  'Professional Business Style',
  'Creative Design Style',
  'Dark Theme Priority',
  'Light Theme Priority'
] as const;

// UI Styles for different application types
export const WEB_UI_STYLES = [
  'Let AI Decide',
  'Clean Modern Style',
  'Professional Business Style',
  'Creative Design Style',
  'Dark Theme Priority',
  'Light Theme Priority'
] as const;

export const DESKTOP_UI_STYLES = [
  'Let AI Decide',
  'Native OS Style',
  'Modern Flat Design',
  'Professional Business Style',
  'Dark Theme Priority',
  'Light Theme Priority'
] as const;

export const MOBILE_UI_STYLES = [
  'Let AI Decide',
  'Native Mobile Style',
  'Modern Flat Design',
  'Material Design',
  'iOS Style',
  'Dark Theme Priority'
] as const;

export const CLI_UI_STYLES = [
  'Let AI Decide',
  'Clean Terminal Style',
  'Colorful Output',
  'Minimal Text Style',
  'Professional CLI Style'
] as const;

export const BASIC_FEATURES = [
  'Multi-language Support',
  'Dark/Light Mode Toggle',
  'Responsive Design',
  'Accessibility Features',
  'PWA Support',
  'Offline Functionality',
  'Let AI Choose Best Option'
] as const;

// Basic Features for different application types
export const WEB_BASIC_FEATURES = [
  'Multi-language Support',
  'Dark/Light Mode Toggle',
  'Responsive Design',
  'Accessibility Features',
  'PWA Support',
  'Offline Functionality',
  'Step Indicators',
  'Search Functionality',
  'Notification System',
  'Data Export/Import',
  'Keyboard Shortcuts',
  'Auto-save Feature',
  'Let AI Choose Best Option'
] as const;

export const DESKTOP_BASIC_FEATURES = [
  'Multi-language Support',
  'Dark/Light Mode Toggle',
  'Native OS Integration',
  'Accessibility Features',
  'Auto-update System',
  'Offline Functionality',
  'Step Indicators',
  'Search Functionality',
  'Notification System',
  'Data Export/Import',
  'Keyboard Shortcuts',
  'Auto-save Feature',
  'System Tray Integration',
  'Drag & Drop Support',
  'Let AI Choose Best Option'
] as const;

export const MOBILE_BASIC_FEATURES = [
  'Multi-language Support',
  'Dark/Light Mode Toggle',
  'Touch Gestures',
  'Accessibility Features',
  'Push Notifications',
  'Offline Functionality',
  'Step Indicators',
  'Search Functionality',
  'Data Export/Import',
  'Auto-save Feature',
  'Haptic Feedback',
  'Biometric Authentication',
  'Camera Integration',
  'GPS Integration',
  'Let AI Choose Best Option'
] as const;

export const CLI_BASIC_FEATURES = [
  'Multi-language Support',
  'Color-coded Output',
  'Progress Indicators',
  'Help System',
  'Configuration Files',
  'Logging System',
  'Step Indicators',
  'Search Functionality',
  'Data Export/Import',
  'Auto-save Feature',
  'Interactive Prompts',
  'Command History',
  'Tab Completion',
  'Let AI Choose Best Option'
] as const;

export const PERFORMANCE_REQUIREMENTS = [
  'Let AI Decide',
  'High Performance Priority',
  'Lightweight Priority',
  'Balance Performance & Features'
] as const;

export const THIRD_PARTY_INTEGRATIONS = [
  'Social Media Login',
  'Payment Gateway',
  'Email Service',
  'Cloud Storage',
  'Analytics Tools',
  'Customer Service System',
  'No Integration Needed',
  'Other'
] as const;

// Third-party integrations for different application types
export const WEB_THIRD_PARTY_INTEGRATIONS = [
  'Social Media Login',
  'Payment Gateway',
  'Email Service',
  'Cloud Storage',
  'Analytics Tools',
  'Customer Service System',
  'No Integration Needed',
  'Other'
] as const;

export const DESKTOP_THIRD_PARTY_INTEGRATIONS = [
  'Cloud Storage',
  'Analytics Tools',
  'Auto-update Service',
  'Crash Reporting',
  'No Integration Needed',
  'Other'
] as const;

export const MOBILE_THIRD_PARTY_INTEGRATIONS = [
  'Push Notifications',
  'Analytics Tools',
  'Crash Reporting',
  'Social Media Login',
  'Payment Gateway',
  'No Integration Needed',
  'Other'
] as const;

export const CLI_THIRD_PARTY_INTEGRATIONS = [
  'Configuration Management',
  'Logging Service',
  'Update Checker',
  'No Integration Needed',
  'Other'
] as const;

export const SECURITY_REQUIREMENTS = [
  'User Authentication & Authorization',
  'Data Encryption',
  'HTTPS Enforcement',
  'XSS/CSRF Protection',
  'Data Backup',
  'Other'
] as const;

// Security requirements for different application types
export const WEB_SECURITY_REQUIREMENTS = [
  'User Authentication & Authorization',
  'Data Encryption',
  'HTTPS Enforcement',
  'XSS/CSRF Protection',
  'Data Backup',
  'Other'
] as const;

export const DESKTOP_SECURITY_REQUIREMENTS = [
  'User Authentication & Authorization',
  'Data Encryption',
  'Local File Security',
  'Auto-update Security',
  'Other'
] as const;

export const MOBILE_SECURITY_REQUIREMENTS = [
  'User Authentication & Authorization',
  'Data Encryption',
  'App Store Security',
  'Biometric Authentication',
  'Other'
] as const;

export const CLI_SECURITY_REQUIREMENTS = [
  'Input Validation',
  'File Permission Checks',
  'Secure Configuration',
  'Other'
] as const;

export const PROJECT_COMPLEXITY = [
  'Let AI Decide',
  'Simple Project (1-2 weeks)',
  'Medium Project (1-2 months)',
  'Complex Project (3-6 months)',
  'Large Project (6+ months)'
] as const;

export const DEVELOPMENT_PRIORITIES = [
  'Let AI Decide',
  'Quick MVP',
  'Feature Completeness Priority',
  'User Experience Priority',
  'Performance Priority'
] as const;

// Web Application Code Standards
export const WEB_TYPESCRIPT_STANDARDS = [
  'Strict Type Definitions',
  'Avoid Any Type',
  'Interface Over Type',
  'Explicit Function Return Types'
] as const;

export const WEB_REACT_STANDARDS = [
  'Function Components + Hooks',
  'PascalCase Component Names',
  'Single Responsibility Principle',
  'Props Interface Definition'
] as const;

// Desktop Application Code Standards
export const DESKTOP_TYPESCRIPT_STANDARDS = [
  'Strict Type Definitions',
  'Avoid Any Type',
  'Interface Over Type',
  'Explicit Function Return Types',
  'Electron Security Best Practices'
] as const;

export const DESKTOP_REACT_STANDARDS = [
  'Function Components + Hooks',
  'PascalCase Component Names',
  'Single Responsibility Principle',
  'Props Interface Definition',
  'Electron IPC Communication'
] as const;

// Mobile Application Code Standards
export const MOBILE_TYPESCRIPT_STANDARDS = [
  'Strict Type Definitions',
  'Avoid Any Type',
  'Interface Over Type',
  'Explicit Function Return Types',
  'Mobile Performance Optimization'
] as const;

export const MOBILE_REACT_STANDARDS = [
  'Function Components + Hooks',
  'PascalCase Component Names',
  'Single Responsibility Principle',
  'Props Interface Definition',
  'React Native Best Practices'
] as const;

// CLI Application Code Standards
export const CLI_TYPESCRIPT_STANDARDS = [
  'Strict Type Definitions',
  'Avoid Any Type',
  'Interface Over Type',
  'Explicit Function Return Types',
  'CLI Argument Parsing'
] as const;

export const CLI_REACT_STANDARDS = [
  'Modular Architecture',
  'Command Pattern',
  'Single Responsibility Principle',
  'Error Handling',
  'CLI User Experience'
] as const;

// Legacy - keeping for backward compatibility
export const TYPESCRIPT_STANDARDS = WEB_TYPESCRIPT_STANDARDS;
export const REACT_STANDARDS = WEB_REACT_STANDARDS;

export const CODE_QUALITY = [
  'ESLint + Prettier',
  'JSDoc Comments',
  'Semantic Variable Naming',
  'Error Handling Mechanism'
] as const;

// Code Quality options for different application types
export const WEB_CODE_QUALITY = [
  'ESLint + Prettier',
  'JSDoc Comments',
  'Semantic Variable Naming',
  'Error Handling Mechanism',
  'Accessibility Standards'
] as const;

export const DESKTOP_CODE_QUALITY = [
  'ESLint + Prettier',
  'JSDoc Comments',
  'Semantic Variable Naming',
  'Error Handling Mechanism',
  'Electron Security Best Practices',
  'Native API Integration'
] as const;

export const MOBILE_CODE_QUALITY = [
  'ESLint + Prettier',
  'JSDoc Comments',
  'Semantic Variable Naming',
  'Error Handling Mechanism',
  'Mobile Performance Standards',
  'Platform-specific Guidelines'
] as const;

export const CLI_CODE_QUALITY = [
  'ESLint + Prettier',
  'JSDoc Comments',
  'Semantic Variable Naming',
  'Error Handling Mechanism',
  'CLI Argument Validation',
  'User Input Sanitization'
] as const;

export const PERFORMANCE_OPTIMIZATION = [
  'React.memo Optimization',
  'useMemo/useCallback',
  'Code Splitting',
  'Lazy Loading'
] as const;

// Performance Optimization options for different application types
export const WEB_PERFORMANCE_OPTIMIZATION = [
  'React.memo Optimization',
  'useMemo/useCallback',
  'Code Splitting',
  'Lazy Loading',
  'Bundle Size Optimization',
  'Image Optimization'
] as const;

export const DESKTOP_PERFORMANCE_OPTIMIZATION = [
  'React.memo Optimization',
  'useMemo/useCallback',
  'Code Splitting',
  'Lazy Loading',
  'Electron Memory Management',
  'Native Performance Integration'
] as const;

export const MOBILE_PERFORMANCE_OPTIMIZATION = [
  'React.memo Optimization',
  'useMemo/useCallback',
  'Code Splitting',
  'Lazy Loading',
  'Mobile Bundle Optimization',
  'Platform-specific Optimization'
] as const;

export const CLI_PERFORMANCE_OPTIMIZATION = [
  'Modular Architecture',
  'Efficient Algorithms',
  'Memory Management',
  'Stream Processing',
  'Async Operations',
  'Resource Cleanup'
] as const;

export const GIT_STANDARDS = [
  'Conventional Commits',
  'Branch Management Strategy',
  'Code Review Process'
] as const;

// Git Standards options for different application types
export const WEB_GIT_STANDARDS = [
  'Conventional Commits',
  'Branch Management Strategy',
  'Code Review Process',
  'Deployment Pipeline Integration'
] as const;

export const DESKTOP_GIT_STANDARDS = [
  'Conventional Commits',
  'Branch Management Strategy',
  'Code Review Process',
  'Release Management',
  'Native Build Integration'
] as const;

export const MOBILE_GIT_STANDARDS = [
  'Conventional Commits',
  'Branch Management Strategy',
  'Code Review Process',
  'App Store Release Management',
  'Platform-specific Branches'
] as const;

export const CLI_GIT_STANDARDS = [
  'Conventional Commits',
  'Branch Management Strategy',
  'Code Review Process',
  'Version Management',
  'Distribution Strategy'
] as const;

export const BUDGET_RANGES = [
  'Let AI Decide',
  'Free Solution Priority',
  'Low Cost Solution',
  'Medium Budget',
  'Unlimited Budget'
] as const; 