# 📡 API Documentation

> **Note**: Prompt Grower currently operates as a client-side application. This document outlines the planned API structure for future versions.

## Overview

The Prompt Grower API will provide programmatic access to prompt generation capabilities, allowing developers to integrate prompt generation into their own tools and workflows.

## Planned API Endpoints

### Authentication
```http
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
DELETE /api/auth/logout
```

### Prompt Generation
```http
POST /api/prompts/generate
GET /api/prompts/{id}
PUT /api/prompts/{id}
DELETE /api/prompts/{id}
GET /api/prompts/user/{userId}
```

### Templates
```http
GET /api/templates
GET /api/templates/{id}
POST /api/templates
PUT /api/templates/{id}
DELETE /api/templates/{id}
```

### Projects
```http
GET /api/projects
POST /api/projects
GET /api/projects/{id}
PUT /api/projects/{id}
DELETE /api/projects/{id}
```

## Data Structures

### FormData Interface
```typescript
interface FormData {
  // Step 1: Project Basic Information
  appName: string;
  appDescription: string;
  targetUsers: string;
  applicationCategory: string;
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
```

### API Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    version: string;
    requestId: string;
  };
}
```

## Example API Usage

### Generate Prompt
```typescript
// POST /api/prompts/generate
const response = await fetch('/api/prompts/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token'
  },
  body: JSON.stringify({
    formData: {
      appName: "My Awesome App",
      appDescription: "A productivity tool for developers",
      // ... other form fields
    },
    options: {
      language: 'en',
      template: 'default',
      includeExamples: true
    }
  })
});

const result = await response.json();
```

### Response Example
```json
{
  "success": true,
  "data": {
    "id": "prompt_123456",
    "prompt": "# Full-Stack Development Expert Role...",
    "metadata": {
      "wordCount": 1250,
      "complexity": "medium",
      "estimatedTokens": 1800,
      "generatedAt": "2025-01-20T10:30:00Z"
    },
    "suggestions": [
      "Consider adding authentication requirements",
      "Specify database schema needs"
    ]
  },
  "meta": {
    "timestamp": "2025-01-20T10:30:00Z",
    "version": "1.0.0",
    "requestId": "req_789012"
  }
}
```

## Client Libraries

### JavaScript/TypeScript
```typescript
import { PromptGrowerClient } from '@prompt-grower/client';

const client = new PromptGrowerClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.promptgrower.com'
});

// Generate a prompt
const prompt = await client.generatePrompt(formData);

// Get user's prompts
const prompts = await client.getPrompts();

// Save a template
const template = await client.saveTemplate({
  name: 'React SaaS Template',
  description: 'Template for React SaaS applications',
  formData: templateData
});
```

### Python
```python
from prompt_grower import PromptGrowerClient

client = PromptGrowerClient(
    api_key='your-api-key',
    base_url='https://api.promptgrower.com'
)

# Generate a prompt
prompt = client.generate_prompt(form_data)

# Get templates
templates = client.get_templates()
```

### cURL Examples
```bash
# Generate a prompt
curl -X POST https://api.promptgrower.com/api/prompts/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "formData": {
      "appName": "My App",
      "appDescription": "A great app"
    }
  }'

# Get user prompts
curl -X GET https://api.promptgrower.com/api/prompts/user/123 \
  -H "Authorization: Bearer your-token"
```

## Rate Limits

| Endpoint | Rate Limit | Window |
|----------|------------|--------|
| `/api/prompts/generate` | 10 requests | 1 minute |
| `/api/templates/*` | 100 requests | 1 hour |
| `/api/projects/*` | 200 requests | 1 hour |

## Error Codes

| Code | Description |
|------|-------------|
| `INVALID_REQUEST` | Request validation failed |
| `UNAUTHORIZED` | Authentication required |
| `FORBIDDEN` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `RATE_LIMITED` | Rate limit exceeded |
| `INTERNAL_ERROR` | Server error |

## Webhooks

### Event Types
- `prompt.generated` - New prompt generated
- `template.created` - New template created
- `project.updated` - Project updated

### Webhook Payload
```json
{
  "event": "prompt.generated",
  "data": {
    "promptId": "prompt_123456",
    "userId": "user_789012",
    "timestamp": "2025-01-20T10:30:00Z"
  },
  "signature": "sha256=..."
}
```

## SDK Development

### Contributing to SDKs
We welcome contributions to official SDKs:
- JavaScript/TypeScript SDK
- Python SDK
- Go SDK
- PHP SDK

### SDK Requirements
- Full API coverage
- TypeScript definitions
- Comprehensive tests
- Documentation
- Examples

## Future API Features

### Planned Endpoints
- `/api/ai/optimize` - AI-powered prompt optimization
- `/api/analytics/usage` - Usage analytics
- `/api/integrations/github` - GitHub integration
- `/api/export/pdf` - PDF export
- `/api/collaboration/share` - Sharing and collaboration

### Advanced Features
- GraphQL API
- Real-time subscriptions
- Batch operations
- Advanced filtering
- Custom prompt templates

## Getting Started

1. **Sign up** for API access (coming soon)
2. **Get your API key** from the dashboard
3. **Install** the client library
4. **Start building** with the API

For updates on API availability, follow our [GitHub repository](https://github.com/XujunNoahWang/prompt-grower) or join our community discussions.