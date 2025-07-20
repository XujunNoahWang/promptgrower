# 🚀 Deployment Guide

This guide covers various deployment options for Prompt Grower, from development to production environments.

## Quick Deploy to Vercel (Recommended)

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/XujunNoahWang/prompt-grower)

### Manual Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Build and Deploy**
   ```bash
   # Build the project
   npm run build
   
   # Deploy to Vercel
   vercel --prod
   ```

3. **Configure Domain** (Optional)
   - Add custom domain in Vercel dashboard
   - Configure DNS settings
   - SSL certificate is automatically provided

## Deploy to Netlify

### Drag & Drop Deployment
1. Build the project locally:
   ```bash
   npm run build
   ```
2. Drag the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

### Git-based Deployment
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18.x`

### Netlify Configuration
Create `netlify.toml` in project root:
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## Deploy to GitHub Pages

### Using GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Manual GitHub Pages
1. Build the project:
   ```bash
   npm run build
   ```
2. Push the `dist` folder to `gh-pages` branch
3. Enable GitHub Pages in repository settings

## Deploy to AWS S3 + CloudFront

### Prerequisites
- AWS CLI configured
- S3 bucket created
- CloudFront distribution set up

### Deployment Script
```bash
#!/bin/bash

# Build the project
npm run build

# Sync to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### S3 Bucket Configuration
- Enable static website hosting
- Set index document to `index.html`
- Set error document to `index.html` (for SPA routing)

## Deploy to Firebase Hosting

### Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting
```

### Firebase Configuration
Update `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Deploy
```bash
# Build and deploy
npm run build
firebase deploy
```

## Docker Deployment

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration
Create `nginx.conf`:
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Enable gzip compression
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    }
}
```

### Build and Run
```bash
# Build Docker image
docker build -t prompt-grower .

# Run container
docker run -p 80:80 prompt-grower
```

## Environment Variables

### Build-time Variables
Create `.env.production`:
```env
VITE_APP_TITLE=Prompt Grower
VITE_APP_DESCRIPTION=AI Prompt Generator
VITE_APP_URL=https://promptgrower.vercel.app
```

### Runtime Configuration
For different environments, you can create:
- `.env.development`
- `.env.staging`
- `.env.production`

## Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build -- --analyze

# Build with source maps (for debugging)
npm run build -- --sourcemap
```

### CDN Configuration
- Enable gzip compression
- Set appropriate cache headers
- Use HTTP/2
- Optimize images and assets

### Monitoring
- Set up error tracking (Sentry, LogRocket)
- Configure performance monitoring
- Set up uptime monitoring
- Monitor Core Web Vitals

## Security Considerations

### Content Security Policy
Add CSP headers:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;
```

### HTTPS Configuration
- Always use HTTPS in production
- Configure HSTS headers
- Use secure cookies
- Implement proper CORS policies

## Troubleshooting

### Common Issues

1. **Routing Issues**
   - Ensure server redirects all routes to `index.html`
   - Check base URL configuration

2. **Build Failures**
   - Verify Node.js version compatibility
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and reinstall

3. **Performance Issues**
   - Enable gzip compression
   - Optimize bundle size
   - Use CDN for static assets

### Debug Mode
Enable debug mode for troubleshooting:
```bash
# Development with debug info
npm run dev -- --debug

# Build with verbose output
npm run build -- --verbose
```

## Monitoring and Analytics

### Performance Monitoring
- Google PageSpeed Insights
- Lighthouse CI
- Web Vitals monitoring
- Real User Monitoring (RUM)

### Error Tracking
- Sentry for error tracking
- LogRocket for session replay
- Custom error boundaries
- Performance profiling

### Analytics
- Google Analytics 4
- Privacy-focused alternatives
- Custom event tracking
- Conversion funnel analysis