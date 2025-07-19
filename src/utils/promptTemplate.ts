export function generatePromptTemplate(consistentFinalData: any): string {
  return `# 全栈开发专家角色设定

你是一位经验丰富的全栈开发专家和软件架构师，具备以下核心能力：
- 10年以上现代Web开发经验
- 精通前端框架（React、Vue、Angular）和后端技术栈
- 深度理解软件架构设计和最佳实践
- 熟悉DevOps、安全性和性能优化
- 能够将业务需求转化为技术实现方案

## 工作原则
- 代码质量优先，遵循SOLID原则和设计模式
- 安全性和性能作为核心考量
- 提供可维护、可扩展的解决方案
- 详细说明技术选择的理由
- 考虑长期维护成本和技术债务

---

# 项目需求概览

## 基本信息
**应用名称**: ${consistentFinalData.appName}
**应用描述**: ${consistentFinalData.appDescription}
**目标用户**: ${consistentFinalData.targetUsers}
**应用类别**: ${consistentFinalData.applicationCategory === 'Other' ? consistentFinalData.customApplicationCategory : (consistentFinalData.applicationCategory || '待AI推荐')}
**应用类型**: ${consistentFinalData.appType === 'Other' ? consistentFinalData.customAppType : (consistentFinalData.appType || '待AI推荐')}

## 功能需求
**核心功能**: ${consistentFinalData.coreFunctionality}
**用户角色**: ${consistentFinalData.userRoles.length > 0 ? consistentFinalData.userRoles.join(', ') : '待AI设计'}${consistentFinalData.customUserRole ? `, ${consistentFinalData.customUserRole}` : ''}
**关键模块**: ${consistentFinalData.keyModules.length > 0 ? consistentFinalData.keyModules.join(', ') : '待AI推荐'}${consistentFinalData.customModule ? `, ${consistentFinalData.customModule}` : ''}

## 技术栈偏好
**前端技术**: ${consistentFinalData.frontendTech === 'Other' ? consistentFinalData.customFrontendTech : (consistentFinalData.frontendTech || '请推荐最佳选择')}
**后端技术**: ${consistentFinalData.backendTech === 'Other' ? consistentFinalData.customBackendTech : (consistentFinalData.backendTech || '请推荐最佳选择')}
**数据库**: ${consistentFinalData.database === 'Other' ? consistentFinalData.customDatabase : (consistentFinalData.database || '请推荐最佳选择')}
**部署平台**: ${consistentFinalData.deploymentPlatform === 'Other' ? consistentFinalData.customDeploymentPlatform : (consistentFinalData.deploymentPlatform || '请推荐最佳选择')}

## 平台和兼容性
**目标平台**: ${consistentFinalData.targetPlatforms.length > 0 ? consistentFinalData.targetPlatforms.join(', ') : '待确定'}${consistentFinalData.customTargetPlatform ? `, ${consistentFinalData.customTargetPlatform}` : ''}
**浏览器兼容性**: ${consistentFinalData.browserCompatibility.length > 0 ? consistentFinalData.browserCompatibility.join(', ') : '主流浏览器'}${consistentFinalData.customBrowserCompatibility ? `, ${consistentFinalData.customBrowserCompatibility}` : ''}
**UI设计风格**: ${consistentFinalData.uiStyle || '现代简洁风格'}
**性能要求**: ${consistentFinalData.performanceRequirement || '标准Web应用性能'}

## 功能特性
**基础功能**: ${consistentFinalData.basicFeatures.length > 0 ? consistentFinalData.basicFeatures.join(', ') : '标准Web应用功能'}${consistentFinalData.customBasicFeature ? `, ${consistentFinalData.customBasicFeature}` : ''}
**第三方集成**: ${consistentFinalData.thirdPartyIntegrations.length > 0 ? consistentFinalData.thirdPartyIntegrations.join(', ') : '按需推荐'}${consistentFinalData.customThirdPartyIntegration ? `, ${consistentFinalData.customThirdPartyIntegration}` : ''}
**安全需求**: ${consistentFinalData.securityRequirements.length > 0 ? consistentFinalData.securityRequirements.join(', ') : '标准安全措施'}${consistentFinalData.customSecurityRequirement ? `, ${consistentFinalData.customSecurityRequirement}` : ''}

## 项目约束
**复杂度等级**: ${consistentFinalData.projectComplexity || '中等'}
**开发优先级**: ${consistentFinalData.developmentPriority || '功能完整性'}
**预算范围**: ${consistentFinalData.budgetRange || '中等预算'}

## 代码质量要求
**TypeScript标准**: ${consistentFinalData.typescriptStandards.length > 0 ? consistentFinalData.typescriptStandards.join(', ') : '严格类型检查'}
**React最佳实践**: ${consistentFinalData.reactStandards.length > 0 ? consistentFinalData.reactStandards.join(', ') : '函数式组件优先'}
**代码质量**: ${consistentFinalData.codeQuality.length > 0 ? consistentFinalData.codeQuality.join(', ') : 'ESLint + Prettier'}
**性能优化**: ${consistentFinalData.performanceOptimization.length > 0 ? consistentFinalData.performanceOptimization.join(', ') : '代码分割 + 懒加载'}
**版本控制**: ${consistentFinalData.gitStandards.length > 0 ? consistentFinalData.gitStandards.join(', ') : 'Git Flow工作流'}

## 附加信息
**特殊需求**: ${consistentFinalData.specialRequirements || '无特殊需求'}
**参考应用**: ${consistentFinalData.referenceApps || '无参考应用'}

---

# 任务目标

基于上述需求，请为我生成一个完整的开发指南提示词，包含：

## 必须包含的内容
1. **技术架构设计**
   - 推荐最适合的技术栈组合
   - 设计系统架构图和数据流
   - 说明技术选择的理由

2. **项目结构规范**
   - 完整的文件目录结构
   - 代码组织原则
   - 模块划分策略

3. **开发实施方案**
   - 分阶段开发计划
   - 核心功能实现路径
   - 关键代码示例

4. **质量保证体系**
   - 代码规范和检查工具配置
   - 测试策略（单元测试、集成测试）
   - CI/CD流水线设计

5. **安全和性能优化**
   - 安全最佳实践
   - 性能监控和优化策略
   - 错误处理和日志记录

6. **部署和运维**
   - 生产环境部署方案
   - 监控和告警设置
   - 备份和灾难恢复

## 输出要求
- 提供具体可执行的代码示例
- 包含完整的配置文件模板
- 说明每个技术选择的优缺点
- 提供问题排查和调试指南
- 考虑不同技能水平的开发者需求

## 特殊要求
请确保生成的提示词：
- 结构清晰，易于理解和执行
- 包含足够的细节，避免歧义
- 提供多个实现选择和权衡分析
- 考虑项目的长期维护和扩展性
- 符合现代开发的最佳实践

请生成一个专业、详细、可直接用于开发的完整提示词。`;
} 