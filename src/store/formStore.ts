import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FormData, FormStore, ValidationError } from '../types';

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
      case 'CLI Application':
        recommendations.frontendTech = 'Node.js + TypeScript';
        break;
      case 'Desktop Program (.exe)':
        recommendations.frontendTech = 'C# + WPF';
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
    recommendations.performanceRequirement = 'Balance Performance & Features';
  }
  
  // Recommend third-party integrations if not selected
  if (data.thirdPartyIntegrations.length === 0) {
    recommendations.thirdPartyIntegrations = ['Google Analytics', 'Social Media Login'];
  }
  
  // Recommend security requirements if not selected
  if (data.securityRequirements.length === 0) {
    recommendations.securityRequirements = ['User Authentication & Authorization', 'HTTPS Enforcement'];
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
  
  return `# 角色设定

你是一位资深的AI提示词工程师和全栈开发专家，拥有10年以上的软件开发经验。你精通前端、后端、移动端和桌面应用开发，对现代技术栈有深入理解。你的任务是基于用户需求生成高质量的开发提示词，确保生成的代码符合最佳实践、可维护且易于扩展。

## 核心能力
- 深度理解用户需求并转化为技术实现方案
- 精通现代开发框架和工具链
- 具备架构设计和技术选型能力
- 熟悉代码质量保证和性能优化
- 了解安全最佳实践和部署策略

## 工作原则
- 始终以用户需求为中心
- 优先考虑代码质量和可维护性
- 遵循行业最佳实践和设计模式
- 提供详细的技术说明和实现指导
- 确保解决方案的可扩展性和未来兼容性

---

# 项目需求分析

## 项目概述
**应用名称**：${consistentFinalData.appName}
**应用简介**：${consistentFinalData.appDescription}
**目标用户**：${consistentFinalData.targetUsers}
**应用类别**：${consistentFinalData.applicationCategory === 'Other' ? consistentFinalData.customApplicationCategory : (consistentFinalData.applicationCategory || '[请AI分析并推荐]')}
**应用类型**：${consistentFinalData.appType === 'Other' ? consistentFinalData.customAppType : (consistentFinalData.appType || '[请AI分析并推荐]')}

## 功能需求
**核心功能**：${consistentFinalData.coreFunctionality}
**用户角色**：${consistentFinalData.userRoles.length > 0 ? consistentFinalData.userRoles.join(', ') : '[请AI设计]'}${consistentFinalData.customUserRole ? `, ${consistentFinalData.customUserRole}` : ''}
**关键模块**：${consistentFinalData.keyModules.length > 0 ? consistentFinalData.keyModules.join(', ') : '[请AI推荐]'}${consistentFinalData.customModule ? `, ${consistentFinalData.customModule}` : ''}

## 技术栈要求
**前端技术**：${consistentFinalData.frontendTech === 'Other' ? consistentFinalData.customFrontendTech : (consistentFinalData.frontendTech || '[请AI推荐最佳方案]')}
**后端技术**：${consistentFinalData.backendTech === 'Other' ? consistentFinalData.customBackendTech : (consistentFinalData.backendTech || '[请AI推荐最佳方案]')}
**数据库**：${consistentFinalData.database === 'Other' ? consistentFinalData.customDatabase : (consistentFinalData.database || '[请AI推荐最佳方案]')}
**部署平台**：${consistentFinalData.deploymentPlatform === 'Other' ? consistentFinalData.customDeploymentPlatform : (consistentFinalData.deploymentPlatform || '[请AI推荐最佳方案]')}

## 平台与用户体验
**目标平台**：${consistentFinalData.targetPlatforms.length > 0 ? consistentFinalData.targetPlatforms.join(', ') : '[请AI推荐]'}${consistentFinalData.customTargetPlatform ? `, ${consistentFinalData.customTargetPlatform}` : ''}
**兼容性要求**：${consistentFinalData.browserCompatibility.length > 0 ? consistentFinalData.browserCompatibility.join(', ') : '[请AI推荐]'}${consistentFinalData.customBrowserCompatibility ? `, ${consistentFinalData.customBrowserCompatibility}` : ''}
**UI风格**：${consistentFinalData.uiStyle || '[请AI推荐]'}
**基础功能**：${consistentFinalData.basicFeatures.length > 0 ? consistentFinalData.basicFeatures.join(', ') : '[请AI推荐标准配置]'}${consistentFinalData.customBasicFeature ? `, ${consistentFinalData.customBasicFeature}` : ''}
**性能要求**：${consistentFinalData.performanceRequirement || '[请AI平衡推荐]'}

## 集成与安全
**第三方集成**：${consistentFinalData.thirdPartyIntegrations.length > 0 ? consistentFinalData.thirdPartyIntegrations.join(', ') : '[请AI推荐]'}${consistentFinalData.customThirdPartyIntegration ? `, ${consistentFinalData.customThirdPartyIntegration}` : ''}
**安全需求**：${consistentFinalData.securityRequirements.length > 0 ? consistentFinalData.securityRequirements.join(', ') : '[请AI推荐标准安全配置]'}${consistentFinalData.customSecurityRequirement ? `, ${consistentFinalData.customSecurityRequirement}` : ''}

## 项目规模与约束
**项目复杂度**：${consistentFinalData.projectComplexity || '[请AI评估]'}
**开发优先级**：${consistentFinalData.developmentPriority || '[请AI推荐]'}
**预算考虑**：${consistentFinalData.budgetRange || '[请AI推荐经济方案]'}

## 代码质量标准
**TypeScript规范**：${consistentFinalData.typescriptStandards.length > 0 ? consistentFinalData.typescriptStandards.join(', ') : '[请AI推荐最佳实践]'}
**React规范**：${consistentFinalData.reactStandards.length > 0 ? consistentFinalData.reactStandards.join(', ') : '[请AI推荐最佳实践]'}
**代码质量**：${consistentFinalData.codeQuality.length > 0 ? consistentFinalData.codeQuality.join(', ') : '[请AI推荐标准规范]'}
**性能优化**：${consistentFinalData.performanceOptimization.length > 0 ? consistentFinalData.performanceOptimization.join(', ') : '[请AI推荐优化策略]'}
**Git规范**：${consistentFinalData.gitStandards.length > 0 ? consistentFinalData.gitStandards.join(', ') : '[请AI推荐标准流程]'}

## 特殊要求与参考
**特殊要求**：${consistentFinalData.specialRequirements || '[用户未填写特殊需求]'}
**参考应用**：${consistentFinalData.referenceApps || '[用户未填写参考应用]'}

---

# 任务指令

基于以上项目需求，请生成一个完整、专业、可直接用于开发的终极提示词。你的提示词应该：

## 核心要求
1. **明确角色定位**：设定AI助手的专业角色和职责范围
2. **详细技术规范**：提供完整的技术栈选择和配置说明
3. **架构设计指导**：包含系统架构、数据流和组件设计
4. **开发流程规范**：定义清晰的开发步骤和代码组织方式
5. **质量保证措施**：包含测试策略、代码审查和性能优化
6. **部署运维指南**：提供完整的部署、监控和维护方案

## 输出格式要求
- 使用清晰的Markdown格式
- 包含详细的代码示例和配置模板
- 提供完整的文件结构建议
- 包含错误处理和调试指南
- 添加必要的注释和文档说明

## 质量标准
- 确保代码符合现代开发最佳实践
- 考虑安全性、可扩展性和维护性
- 提供完整的错误处理和边界情况处理
- 包含性能优化和用户体验优化建议
- 确保跨平台兼容性和响应式设计

请生成一个能够让任何开发者（包括AI助手如Cursor、Claude等）直接理解并实现这个应用的终极提示词。`;
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