export function generatePromptTemplateEn(consistentFinalData: any): string {
  // Helper function to get appropriate code quality requirements based on application category
  const getCodeQualityRequirements = (data: any) => {
    const category = data.applicationCategory;
    
    // For CLI and Desktop programs, don't show TypeScript and React standards
    if (category === 'CLI Application' || category === 'Desktop Program (.exe)') {
      return `**Code Quality**: ${data.codeQuality.length > 0 ? data.codeQuality.join(', ') : 'Code Documentation + Error Handling'}
**Performance Optimization**: ${data.performanceOptimization.length > 0 ? data.performanceOptimization.join(', ') : 'Memory Management + Efficient Algorithms'}
**Version Control**: ${data.gitStandards.length > 0 ? data.gitStandards.join(', ') : 'Git Flow Workflow'}`;
    }
    
    // For other application types, show TypeScript and React standards
    return `**TypeScript Standards**: ${data.typescriptStandards.length > 0 ? data.typescriptStandards.join(', ') : 'Strict Type Checking'}
**React Best Practices**: ${data.reactStandards.length > 0 ? data.reactStandards.join(', ') : 'Functional Components First'}
**Code Quality**: ${data.codeQuality.length > 0 ? data.codeQuality.join(', ') : 'ESLint + Prettier'}
**Performance Optimization**: ${data.performanceOptimization.length > 0 ? data.performanceOptimization.join(', ') : 'Code Splitting + Lazy Loading'}
**Version Control**: ${data.gitStandards.length > 0 ? data.gitStandards.join(', ') : 'Git Flow Workflow'}`;
  };

  // Helper function to get appropriate technology stack based on application category
  const getTechnologyStack = (data: any) => {
    const category = data.applicationCategory;
    
    // For CLI applications, don't show frontend technology
    if (category === 'CLI Application') {
      return `**Development Technology**: ${data.frontendTech === 'Other' ? data.customFrontendTech : (data.frontendTech || 'Node.js + TypeScript')}
**Backend Technology**: ${data.backendTech === 'Other' ? data.customBackendTech : (data.backendTech || 'Local File System')}
**Data Storage**: ${data.database === 'Other' ? data.customDatabase : (data.database || 'Local File System')}
**Deployment Platform**: ${data.deploymentPlatform === 'Other' ? data.customDeploymentPlatform : (data.deploymentPlatform || 'Package Manager')}`;
    }
    
    // For Desktop programs, don't show frontend technology
    if (category === 'Desktop Program (.exe)') {
      return `**Development Technology**: ${data.frontendTech === 'Other' ? data.customFrontendTech : (data.frontendTech || 'C# + WPF')}
**Backend Technology**: ${data.backendTech === 'Other' ? data.customBackendTech : (data.backendTech || 'Local Database Only')}
**Data Storage**: ${data.database === 'Other' ? data.customDatabase : (data.database || 'SQLite')}
**Deployment Platform**: ${data.deploymentPlatform === 'Other' ? data.customDeploymentPlatform : (data.deploymentPlatform || 'Local Installation')}`;
    }
    
    // For other application types, show frontend and backend technology
    return `**Frontend Technology**: ${data.frontendTech === 'Other' ? data.customFrontendTech : (data.frontendTech || 'Please recommend best choice')}
**Backend Technology**: ${data.backendTech === 'Other' ? data.customBackendTech : (data.backendTech || 'Please recommend best choice')}
**Database**: ${data.database === 'Other' ? data.customDatabase : (data.database || 'Please recommend best choice')}
**Deployment Platform**: ${data.deploymentPlatform === 'Other' ? data.customDeploymentPlatform : (data.deploymentPlatform || 'Please recommend best choice')}`;
  };

  // Helper function to get appropriate platform and compatibility based on application category
  const getPlatformAndCompatibility = (data: any) => {
    const category = data.applicationCategory;
    
    // For CLI applications, don't show browser compatibility
    if (category === 'CLI Application') {
      return `**Target Platforms**: ${data.targetPlatforms.length > 0 ? data.targetPlatforms.join(', ') : 'Cross-platform'}
**UI Design Style**: ${data.uiStyle || 'Clean Terminal Style'}
**Performance Requirements**: ${data.performanceRequirement || 'CLI Application Performance'}`;
    }
    
    // For Desktop programs, don't show browser compatibility
    if (category === 'Desktop Program (.exe)') {
      return `**Target Platforms**: ${data.targetPlatforms.length > 0 ? data.targetPlatforms.join(', ') : 'Windows'}
**UI Design Style**: ${data.uiStyle || 'Native Desktop Style'}
**Performance Requirements**: ${data.performanceRequirement || 'Desktop Application Performance'}`;
    }
    
    // For other application types, show browser compatibility
    return `**Target Platforms**: ${data.targetPlatforms.length > 0 ? data.targetPlatforms.join(', ') : 'To be determined'}${data.customTargetPlatform ? `, ${data.customTargetPlatform}` : ''}
**Browser Compatibility**: ${data.browserCompatibility.length > 0 ? data.browserCompatibility.join(', ') : 'Modern Browsers'}${data.customBrowserCompatibility ? `, ${data.customBrowserCompatibility}` : ''}
**UI Design Style**: ${data.uiStyle || 'Modern Clean Style'}
**Performance Requirements**: ${data.performanceRequirement || 'Standard Web Application Performance'}`;
  };

  return `# Full-Stack Development Expert Role Definition

You are an experienced full-stack development expert and software architect with the following core capabilities:
- 10+ years of modern web development experience
- Proficient in frontend frameworks (React, Vue, Angular) and backend technology stacks
- Deep understanding of software architecture design and best practices
- Familiar with DevOps, security, and performance optimization
- Ability to transform business requirements into technical implementation solutions

## Work Principles
- Code quality first, following SOLID principles and design patterns
- Security and performance as core considerations
- Provide maintainable and scalable solutions
- Detailed explanation of technical choice reasons
- Consider long-term maintenance costs and technical debt

---

# Project Requirements Overview

## Basic Information
**Application Name**: ${consistentFinalData.appName}
**Application Description**: ${consistentFinalData.appDescription}
**Target Users**: ${consistentFinalData.targetUsers}
**Application Category**: ${consistentFinalData.applicationCategory === 'Other' ? consistentFinalData.customApplicationCategory : (consistentFinalData.applicationCategory || 'AI Recommendation')}
**Application Type**: ${consistentFinalData.appType === 'Other' ? consistentFinalData.customAppType : (consistentFinalData.appType || 'AI Recommendation')}

## Functional Requirements
**Core Functionality**: ${consistentFinalData.coreFunctionality}
**User Roles**: ${consistentFinalData.userRoles.length > 0 ? consistentFinalData.userRoles.join(', ') : 'AI Design'}${consistentFinalData.customUserRole ? `, ${consistentFinalData.customUserRole}` : ''}
**Key Modules**: ${consistentFinalData.keyModules.length > 0 ? consistentFinalData.keyModules.join(', ') : 'AI Recommendation'}${consistentFinalData.customModule ? `, ${consistentFinalData.customModule}` : ''}

## Technology Stack Preferences
${getTechnologyStack(consistentFinalData)}

## Platform and Compatibility
${getPlatformAndCompatibility(consistentFinalData)}

## Feature Requirements
**Basic Features**: ${consistentFinalData.basicFeatures.length > 0 ? consistentFinalData.basicFeatures.join(', ') : 'Standard Web Application Features'}${consistentFinalData.customBasicFeature ? `, ${consistentFinalData.customBasicFeature}` : ''}
**Third-party Integrations**: ${consistentFinalData.thirdPartyIntegrations.length > 0 ? consistentFinalData.thirdPartyIntegrations.join(', ') : 'As needed'}${consistentFinalData.customThirdPartyIntegration ? `, ${consistentFinalData.customThirdPartyIntegration}` : ''}
**Security Requirements**: ${consistentFinalData.securityRequirements.length > 0 ? consistentFinalData.securityRequirements.join(', ') : 'Standard Security Measures'}${consistentFinalData.customSecurityRequirement ? `, ${consistentFinalData.customSecurityRequirement}` : ''}

## Project Constraints
**Complexity Level**: ${consistentFinalData.projectComplexity || 'Medium'}
**Development Priority**: ${consistentFinalData.developmentPriority || 'Feature Completeness'}
**Budget Range**: ${consistentFinalData.budgetRange || 'Medium Budget'}

## Code Quality Requirements
${getCodeQualityRequirements(consistentFinalData)}

## Additional Information
**Special Requirements**: ${consistentFinalData.specialRequirements || 'No special requirements'}
**Reference Applications**: ${consistentFinalData.referenceApps || 'No reference applications'}

---

# Task Objectives

Based on the above requirements, please generate a complete development guide prompt that includes:

## Required Content
1. **Technical Architecture Design**
   - Recommend the most suitable technology stack combination
   - Design system architecture diagrams and data flow
   - Explain the reasons for technical choices

2. **Project Structure Standards**
   - Complete file directory structure
   - Code organization principles
   - Module division strategy

3. **Development Implementation Plan**
   - Phased development plan
   - Core functionality implementation path
   - Key code examples

4. **Quality Assurance System**
   - Code standards and inspection tool configuration
   - Testing strategy (unit testing, integration testing)
   - CI/CD pipeline design

5. **Security and Performance Optimization**
   - Security best practices
   - Performance monitoring and optimization strategies
   - Error handling and logging

6. **Deployment and Operations**
   - Production environment deployment plan
   - Monitoring and alerting setup
   - Backup and disaster recovery

## Output Requirements
- Provide specific executable code examples
- Include complete configuration file templates
- Explain the pros and cons of each technical choice
- Provide troubleshooting and debugging guides
- Consider developers with different skill levels

## Special Requirements
Please ensure the generated prompt:
- Has clear structure, easy to understand and execute
- Contains sufficient details to avoid ambiguity
- Provides multiple implementation choices and trade-off analysis
- Considers long-term project maintenance and scalability
- Complies with modern development best practices

Please generate a professional, detailed, and directly usable development prompt.`;
} 