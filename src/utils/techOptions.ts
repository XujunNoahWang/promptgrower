import {
  WEB_FRONTEND_TECHS,
  DESKTOP_TECHS,
  MOBILE_TECHS,
  CLI_TECHS,
  DESKTOP_PROGRAM_TECHS,
  WEB_BACKEND_TECHS,
  DESKTOP_MOBILE_BACKEND_TECHS,
  CLI_BACKEND_TECHS,
  WEB_TARGET_PLATFORMS,
  DESKTOP_TARGET_PLATFORMS,
  MOBILE_TARGET_PLATFORMS,
  CLI_TARGET_PLATFORMS,
  WEB_TYPESCRIPT_STANDARDS,
  DESKTOP_TYPESCRIPT_STANDARDS,
  MOBILE_TYPESCRIPT_STANDARDS,
  CLI_TYPESCRIPT_STANDARDS,
  WEB_REACT_STANDARDS,
  DESKTOP_REACT_STANDARDS,
  MOBILE_REACT_STANDARDS,
  CLI_REACT_STANDARDS,
  BROWSER_COMPATIBILITY,
  SYSTEM_COMPATIBILITY,
  WEB_CODE_QUALITY,
  DESKTOP_CODE_QUALITY,
  MOBILE_CODE_QUALITY,
  CLI_CODE_QUALITY,
  WEB_PERFORMANCE_OPTIMIZATION,
  DESKTOP_PERFORMANCE_OPTIMIZATION,
  MOBILE_PERFORMANCE_OPTIMIZATION,
  CLI_PERFORMANCE_OPTIMIZATION,
  WEB_GIT_STANDARDS,
  DESKTOP_GIT_STANDARDS,
  MOBILE_GIT_STANDARDS,
  CLI_GIT_STANDARDS,
  WEB_DATABASES,
  DESKTOP_DATABASES,
  MOBILE_DATABASES,
  CLI_DATABASES,
  WEB_DEPLOYMENT_PLATFORMS,
  DESKTOP_DEPLOYMENT_PLATFORMS,
  MOBILE_DEPLOYMENT_PLATFORMS,
  CLI_DEPLOYMENT_PLATFORMS,
  WEB_UI_STYLES,
  DESKTOP_UI_STYLES,
  MOBILE_UI_STYLES,
  CLI_UI_STYLES,
  WEB_BASIC_FEATURES,
  DESKTOP_BASIC_FEATURES,
  MOBILE_BASIC_FEATURES,
  CLI_BASIC_FEATURES,
  WEB_THIRD_PARTY_INTEGRATIONS,
  DESKTOP_THIRD_PARTY_INTEGRATIONS,
  MOBILE_THIRD_PARTY_INTEGRATIONS,
  CLI_THIRD_PARTY_INTEGRATIONS,
  WEB_SECURITY_REQUIREMENTS,
  DESKTOP_SECURITY_REQUIREMENTS,
  MOBILE_SECURITY_REQUIREMENTS,
  CLI_SECURITY_REQUIREMENTS
} from '../types';

// Get frontend technologies based on application category
export const getFrontendTechs = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'Desktop Application':
      return DESKTOP_TECHS;
    case 'Mobile Application':
      return MOBILE_TECHS;
    case 'CLI Application':
      return CLI_TECHS;
    case 'Desktop Program (.exe)':
      return DESKTOP_PROGRAM_TECHS;
    default:
      return WEB_FRONTEND_TECHS;
  }
};

// Get backend technologies based on application category
export const getBackendTechs = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'Desktop Application':
    case 'Mobile Application':
      return DESKTOP_MOBILE_BACKEND_TECHS;
    case 'CLI Application':
      return CLI_BACKEND_TECHS;
    case 'Desktop Program (.exe)':
      return DESKTOP_MOBILE_BACKEND_TECHS;
    default:
      return WEB_BACKEND_TECHS;
  }
};

// Get target platforms based on application category
export const getTargetPlatforms = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'Desktop Application':
      return DESKTOP_TARGET_PLATFORMS;
    case 'Mobile Application':
      return MOBILE_TARGET_PLATFORMS;
    case 'CLI Application':
      return CLI_TARGET_PLATFORMS;
    case 'Desktop Program (.exe)':
      return DESKTOP_TARGET_PLATFORMS;
    default:
      return WEB_TARGET_PLATFORMS;
  }
};

// Check if application type needs TypeScript standards
export const needsTypeScriptStandards = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'CLI Application':
      // CLI applications can use various languages, TypeScript is optional
      return false;
    case 'Desktop Program (.exe)':
      // Desktop programs typically don't use TypeScript
      return false;
    case 'Desktop Application':
    case 'Mobile Application':
    case 'Web Application':
    default:
      return true;
  }
};

// Check if application type needs React standards
export const needsReactStandards = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'CLI Application':
      // CLI applications typically don't use React
      return false;
    case 'Desktop Program (.exe)':
      // Desktop programs might not use React
      return false;
    case 'Desktop Application':
    case 'Mobile Application':
    case 'Web Application':
    default:
      return true;
  }
};

// Get TypeScript standards based on application category (with null check)
export const getTypeScriptStandards = (applicationCategory: string) => {
  if (!needsTypeScriptStandards(applicationCategory)) {
    return [];
  }
  
  switch (applicationCategory) {
    case 'Desktop Application':
      return DESKTOP_TYPESCRIPT_STANDARDS;
    case 'Mobile Application':
      return MOBILE_TYPESCRIPT_STANDARDS;
    case 'CLI Application':
      return CLI_TYPESCRIPT_STANDARDS;
    case 'Desktop Program (.exe)':
      return DESKTOP_TYPESCRIPT_STANDARDS;
    default:
      return WEB_TYPESCRIPT_STANDARDS;
  }
};

// Get React standards based on application category (with null check)
export const getReactStandards = (applicationCategory: string) => {
  if (!needsReactStandards(applicationCategory)) {
    return [];
  }
  
  switch (applicationCategory) {
    case 'Desktop Application':
      return DESKTOP_REACT_STANDARDS;
    case 'Mobile Application':
      return MOBILE_REACT_STANDARDS;
    case 'CLI Application':
      return CLI_REACT_STANDARDS;
    case 'Desktop Program (.exe)':
      return DESKTOP_REACT_STANDARDS;
    default:
      return WEB_REACT_STANDARDS;
  }
};

// Get compatibility options based on application category
export const getCompatibilityOptions = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'CLI Application':
    case 'Desktop Program (.exe)':
      return SYSTEM_COMPATIBILITY;
    default:
      return BROWSER_COMPATIBILITY;
  }
};

// Get compatibility section title based on application category
export const getCompatibilityTitle = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'CLI Application':
    case 'Desktop Program (.exe)':
      return 'System Compatibility';
    default:
      return 'Browser Compatibility';
  }
};

// Get compatibility section description based on application category
export const getCompatibilityDescription = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'CLI Application':
    case 'Desktop Program (.exe)':
      return 'Select all operating systems your application should support.';
    default:
      return 'Select all browsers your application should support.';
  }
};

// Get code quality options based on application category
export const getCodeQualityOptions = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'Desktop Application':
    case 'Desktop Program (.exe)':
      return DESKTOP_CODE_QUALITY;
    case 'Mobile Application':
      return MOBILE_CODE_QUALITY;
    case 'CLI Application':
      return CLI_CODE_QUALITY;
    default:
      return WEB_CODE_QUALITY;
  }
};

// Get performance optimization options based on application category
export const getPerformanceOptimizationOptions = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'Desktop Application':
    case 'Desktop Program (.exe)':
      return DESKTOP_PERFORMANCE_OPTIMIZATION;
    case 'Mobile Application':
      return MOBILE_PERFORMANCE_OPTIMIZATION;
    case 'CLI Application':
      return CLI_PERFORMANCE_OPTIMIZATION;
    default:
      return WEB_PERFORMANCE_OPTIMIZATION;
  }
};

// Get Git standards options based on application category
export const getGitStandardsOptions = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'Desktop Application':
    case 'Desktop Program (.exe)':
      return DESKTOP_GIT_STANDARDS;
    case 'Mobile Application':
      return MOBILE_GIT_STANDARDS;
    case 'CLI Application':
      return CLI_GIT_STANDARDS;
    default:
      return WEB_GIT_STANDARDS;
  }
}; 

// Check if application type needs frontend technology
export const needsFrontendTech = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'CLI Application':
      // CLI applications typically don't need frontend technology
      return false;
    case 'Desktop Program (.exe)':
      // Desktop programs might not use frontend frameworks
      return false;
    case 'Desktop Application':
    case 'Mobile Application':
    case 'Web Application':
    default:
      return true;
  }
};

// Check if application type needs backend technology
export const needsBackendTech = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'CLI Application':
      // CLI applications might need backend logic but not traditional backend
      return false;
    case 'Desktop Program (.exe)':
      // Desktop programs might not need traditional backend
      return false;
    case 'Desktop Application':
    case 'Mobile Application':
    case 'Web Application':
    default:
      return true;
  }
};

// Get database options based on application category
export const getDatabaseOptions = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'Desktop Application':
    case 'Desktop Program (.exe)':
      return DESKTOP_DATABASES;
    case 'Mobile Application':
      return MOBILE_DATABASES;
    case 'CLI Application':
      return CLI_DATABASES;
    default:
      return WEB_DATABASES;
  }
};

// Get deployment platform options based on application category
export const getDeploymentPlatformOptions = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'Desktop Application':
    case 'Desktop Program (.exe)':
      return DESKTOP_DEPLOYMENT_PLATFORMS;
    case 'Mobile Application':
      return MOBILE_DEPLOYMENT_PLATFORMS;
    case 'CLI Application':
      return CLI_DEPLOYMENT_PLATFORMS;
    default:
      return WEB_DEPLOYMENT_PLATFORMS;
  }
}; 

// Get UI styles based on application category
export const getUIStyles = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'Desktop Application':
    case 'Desktop Program (.exe)':
      return DESKTOP_UI_STYLES;
    case 'Mobile Application':
      return MOBILE_UI_STYLES;
    case 'CLI Application':
      return CLI_UI_STYLES;
    default:
      return WEB_UI_STYLES;
  }
};

// Get basic features based on application category
export const getBasicFeatures = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'Desktop Application':
    case 'Desktop Program (.exe)':
      return DESKTOP_BASIC_FEATURES;
    case 'Mobile Application':
      return MOBILE_BASIC_FEATURES;
    case 'CLI Application':
      return CLI_BASIC_FEATURES;
    default:
      return WEB_BASIC_FEATURES;
  }
};

// Get third-party integrations based on application category
export const getThirdPartyIntegrations = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'Desktop Application':
    case 'Desktop Program (.exe)':
      return DESKTOP_THIRD_PARTY_INTEGRATIONS;
    case 'Mobile Application':
      return MOBILE_THIRD_PARTY_INTEGRATIONS;
    case 'CLI Application':
      return CLI_THIRD_PARTY_INTEGRATIONS;
    default:
      return WEB_THIRD_PARTY_INTEGRATIONS;
  }
};

// Get security requirements based on application category
export const getSecurityRequirements = (applicationCategory: string) => {
  switch (applicationCategory) {
    case 'Desktop Application':
    case 'Desktop Program (.exe)':
      return DESKTOP_SECURITY_REQUIREMENTS;
    case 'Mobile Application':
      return MOBILE_SECURITY_REQUIREMENTS;
    case 'CLI Application':
      return CLI_SECURITY_REQUIREMENTS;
    default:
      return WEB_SECURITY_REQUIREMENTS;
  }
}; 