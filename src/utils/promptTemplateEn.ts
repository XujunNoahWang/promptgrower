export function generatePromptTemplateEn(consistentFinalData: any): string {
  // Helper function to get appropriate code quality requirements based on application category and complexity
  const getCodeQualityRequirements = (data: any) => {
    const category = data.applicationCategory;
    const complexity = data.projectComplexity || 'Medium';
    
    // For CLI and Desktop programs, don't show TypeScript and React standards
    if (category === 'CLI Application' || category === 'Desktop Program (.exe)') {
      if (complexity === 'Simple Project (1-2 weeks)') {
        return `**Code Quality**: ${data.codeQuality.length > 0 ? data.codeQuality.join(', ') : 'Basic Error Handling'}
**Performance Optimization**: ${data.performanceOptimization.length > 0 ? data.performanceOptimization.join(', ') : 'Basic Memory Management'}
**Version Control**: ${data.gitStandards.length > 0 ? data.gitStandards.join(', ') : 'Basic Git Workflow'}`;
      }
      return `**Code Quality**: ${data.codeQuality.length > 0 ? data.codeQuality.join(', ') : 'Code Documentation + Error Handling'}
**Performance Optimization**: ${data.performanceOptimization.length > 0 ? data.performanceOptimization.join(', ') : 'Memory Management + Efficient Algorithms'}
**Version Control**: ${data.gitStandards.length > 0 ? data.gitStandards.join(', ') : 'Git Flow Workflow'}`;
    }
    
    // For other application types, show TypeScript and React standards based on complexity
    if (complexity === 'Simple Project (1-2 weeks)') {
      return `**Code Quality**: ${data.codeQuality.length > 0 ? data.codeQuality.join(', ') : 'Basic ESLint + Prettier'}
**Performance Optimization**: ${data.performanceOptimization.length > 0 ? data.performanceOptimization.join(', ') : 'Basic Code Optimization'}
**Version Control**: ${data.gitStandards.length > 0 ? data.gitStandards.join(', ') : 'Basic Git Workflow'}`;
    }
    
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

  // Helper function to get complexity-based requirements
  const getComplexityBasedRequirements = (complexity: string) => {
    switch (complexity) {
      case 'Simple Project (1-2 weeks)':
        return `
## Complexity-Based Requirements
**Project Scale**: Simple MVP with core functionality
**Development Focus**: Quick implementation, basic features only
**Testing**: Basic functionality testing (optional)
**Deployment**: Simple deployment process
**Documentation**: Basic setup and usage instructions
**Code Examples**: Complete, runnable code with basic configuration`;
      
      case 'Medium Project (1-2 months)':
        return `
## Complexity-Based Requirements
**Project Scale**: Medium complexity with essential features
**Development Focus**: Balanced implementation with good practices
**Testing**: Unit testing for core functionality
**Deployment**: Standard deployment with basic monitoring
**Documentation**: Comprehensive setup and development guide
**Code Examples**: Complete code with configuration and testing`;
      
      case 'Complex Project (3-6 months)':
        return `
## Complexity-Based Requirements
**Project Scale**: Complex application with advanced features
**Development Focus**: Enterprise-level implementation with best practices
**Testing**: Comprehensive testing strategy (unit, integration, e2e)
**Deployment**: Advanced deployment with monitoring and CI/CD
**Documentation**: Complete technical documentation and architecture guide
**Code Examples**: Enterprise-level code with full testing and deployment`;
      
      default:
        return `
## Complexity-Based Requirements
**Project Scale**: Medium complexity with essential features
**Development Focus**: Balanced implementation with good practices
**Testing**: Unit testing for core functionality
**Deployment**: Standard deployment with basic monitoring
**Documentation**: Comprehensive setup and development guide
**Code Examples**: Complete code with configuration and testing`;
    }
  };

  const complexity = consistentFinalData.projectComplexity || 'Medium Project (1-2 months)';

  return `# AI Development Expert Role Definition

You are an experienced development expert and software architect with the following core capabilities:
- 10+ years of modern development experience across different project scales
- Proficient in frontend frameworks (React, Vue, Angular) and backend technology stacks
- Deep understanding of software architecture design and best practices
- Ability to adapt solutions based on project complexity (simple, medium, large)
- Expertise in providing appropriate technical depth for different project scales
- Understanding of when to keep things simple vs. when to add complexity

## Work Principles
- **Complexity-Aware Design**: Match technical solutions to project scale and requirements
- **Avoid Over-Engineering**: Don't add unnecessary complexity for simple projects
- **Ensure Completeness**: Provide comprehensive solutions for complex projects
- **Code Quality First**: Follow appropriate best practices for the project scale
- **Security and Performance**: Consider these aspects appropriately for the project complexity
- **Maintainability**: Provide solutions that can be maintained by the target team

## Project Complexity Assessment
Based on the project constraints, you should:
- **Simple Projects (1-2 weeks)**: Focus on core functionality, basic setup, minimal configuration
- **Medium Projects (1-2 months)**: Include essential features, moderate testing, standard deployment
- **Complex Projects (3-6 months)**: Provide comprehensive architecture, full testing strategy, advanced deployment

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
**Complexity Level**: ${complexity}
**Development Priority**: ${consistentFinalData.developmentPriority || 'Feature Completeness'}
**Budget Range**: ${consistentFinalData.budgetRange || 'Medium Budget'}

## Code Quality Requirements
${getCodeQualityRequirements(consistentFinalData)}

## Additional Information
**Special Requirements**: ${consistentFinalData.specialRequirements || 'No special requirements'}
**Reference Applications**: ${consistentFinalData.referenceApps || 'No reference applications'}

${getComplexityBasedRequirements(complexity)}

---

# Task Objectives

Based on the above requirements and project complexity, generate a development guide prompt that is **appropriate for the project scale**. The generated prompt should:

## Required Content (Adjusted for Project Complexity)

### For Simple Projects (1-2 weeks):
1. **Basic Technical Setup**
   - Recommend simple, proven technology stack
   - Provide basic project structure
   - Include essential configuration files

2. **Core Implementation**
   - Focus on core functionality only
   - Provide complete, runnable code examples
   - Basic error handling and user feedback

3. **Simple Deployment**
   - Basic deployment instructions
   - Minimal configuration required

### For Medium Projects (1-2 months):
1. **Technical Architecture Design**
   - Recommend suitable technology stack combination
   - Design basic system architecture
   - Explain technical choice reasons

2. **Project Structure Standards**
   - Complete file directory structure
   - Code organization principles
   - Module division strategy

3. **Development Implementation Plan**
   - Phased development plan
   - Core functionality implementation path
   - Key code examples with testing

4. **Quality Assurance**
   - Basic code standards and linting
   - Unit testing for core functionality
   - Simple deployment pipeline

### For Complex Projects (3-6 months):
1. **Comprehensive Technical Architecture**
   - Advanced technology stack recommendations
   - Detailed system architecture diagrams
   - Comprehensive technical choice analysis

2. **Enterprise Project Structure**
   - Complete enterprise-level file structure
   - Advanced code organization principles
   - Comprehensive module strategy

3. **Advanced Development Plan**
   - Detailed phased development plan
   - Advanced implementation patterns
   - Comprehensive code examples

4. **Full Quality Assurance System**
   - Complete code standards and tooling
   - Comprehensive testing strategy (unit, integration, e2e)
   - Advanced CI/CD pipeline

5. **Security and Performance**
   - Advanced security best practices
   - Performance monitoring and optimization
   - Comprehensive error handling

6. **Enterprise Deployment**
   - Production environment setup
   - Monitoring and alerting
   - Backup and disaster recovery

## Output Requirements (Scaled by Complexity)

### Simple Projects:
- Provide complete, runnable code that works immediately
- Include basic configuration files
- Focus on core functionality only
- Avoid unnecessary complexity

### Medium Projects:
- Provide complete code with basic testing
- Include standard configuration files
- Explain technical choices briefly
- Include basic deployment instructions

### Complex Projects:
- Provide enterprise-level code with comprehensive testing
- Include advanced configuration and tooling
- Detailed technical choice analysis
- Complete deployment and monitoring setup

## Special Requirements
Please ensure the generated prompt:
- **Matches the project complexity level** - Don't over-engineer simple projects
- **Provides appropriate technical depth** - Simple projects get simple solutions
- **Includes complete, runnable code** - All code examples should work immediately
- **Has clear structure and instructions** - Easy to understand and execute
- **Considers the development timeline** - Solutions should fit the time constraints
- **Avoids unnecessary features** - Focus on what's actually needed
- **Provides appropriate testing strategy** - Scale testing to project complexity
- **Includes suitable deployment instructions** - Match deployment complexity to project scale

## Role Definition for AI IDE
The generated prompt should include a clear role definition that tells the AI IDE:
- What role it should play (e.g., "You are a React developer building a simple web app")
- What level of complexity to expect
- What kind of code and explanations to provide
- How detailed the implementation should be

## Output Format Requirements
**CRITICAL INSTRUCTION**: You MUST generate a **downloadable Markdown file** for the user, NOT display the content in the chat.

**REQUIRED ACTION**: Create a Markdown file with the following structure and provide it as a downloadable file:

# [Project Name] Development Guide

## AI IDE Role Definition
[Your role definition here]

## Project Overview  
[Project description and requirements]

## Technical Implementation
[Technical details and code examples]

## Deployment Instructions
[Deployment and setup instructions]

## Additional Notes
[Any additional information]

**MANDATORY REQUIREMENTS:**
1. **Generate a file** - Create a downloadable Markdown file, not inline text
2. **Use proper Markdown syntax** - All headers, code blocks, and lists must use correct Markdown formatting
3. **Include code blocks** - Use \`\`\`typescript, \`\`\`json, \`\`\`bash for code examples
4. **Complete document** - Provide a self-contained Markdown document
5. **File naming** - Name the file appropriately (e.g., "project-name-development-guide.md")

**FILE CONTENT STRUCTURE:**
The Markdown file should contain:

# [Project Name] Development Guide

## AI IDE Role Definition
You are a [specific role] building a [project type]...

## Project Overview
[Project description and requirements]

## Technical Implementation
[Technical details and code examples]

## Deployment Instructions
[Deployment and setup instructions]

## Additional Notes
[Any additional information]

**IMPORTANT**: Do NOT display the Markdown content in the chat. Instead, generate and provide a downloadable Markdown file that the user can preview and download.

Please generate a professional, appropriately-scaled, and directly usable development prompt as a downloadable Markdown file that matches the project complexity and requirements.`;
} 