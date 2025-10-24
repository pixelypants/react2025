# React 2025 - Best Practice React Application

A modern, production-ready React application built with TypeScript, Tailwind CSS, and industry best practices.

## 🚀 Features

- **⚡ Vite** - Lightning-fast build tool and development server
- **🔷 TypeScript** - Full type safety and better developer experience
- **🎨 Tailwind CSS** - Utility-first CSS framework with custom theme
- **🛣️ React Router** - Client-side routing with protected routes
- **🎭 Context API** - State management with React Context
- **🧪 Vitest** - Fast unit testing with React Testing Library
- **📚 Storybook** - Component development and documentation
- **🎨 shadcn/ui** - Modern component library with Tailwind CSS
- **📏 ESLint & Prettier** - Code quality and formatting
- **🌙 Dark Mode** - Built-in theme switching
- **♿ Accessibility** - WCAG compliant components
- **📱 Responsive** - Mobile-first responsive design
- **🛡️ Error Boundaries** - Graceful error handling

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, etc.)
│   ├── layout/         # Layout components (Header, Footer, etc.)
│   └── forms/          # Form components
├── contexts/           # React Context providers
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # API services and external integrations
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
├── constants/         # Application constants
└── test/              # Test utilities and setup
```

## 🛠️ Development

### Prerequisites

- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

### Quick Start

```bash
# 1. Clone the repository
git clone <repository-url>
cd react2025

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open your browser
# The app will be available at http://localhost:5173
```

### Detailed Setup Instructions

#### 1. **Environment Setup**
```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version
```

#### 2. **Project Installation**
```bash
# Navigate to project directory
cd react2025

# Install all dependencies
npm install

# This will install:
# - React 19 with TypeScript
# - Vite for fast development
# - Tailwind CSS for styling
# - React Router for navigation
# - Testing libraries (Vitest, React Testing Library)
# - ESLint & Prettier for code quality
```

#### 3. **Environment Configuration**
```bash
# Copy environment variables template
cp env.example .env.local

# Edit .env.local with your configuration
# VITE_API_BASE_URL=http://localhost:3001/api
# VITE_APP_NAME=ReactApp
# VITE_APP_VERSION=1.0.0
```

#### 4. **Start Development**
```bash
# Start the development server
npm run dev

# The app will be available at:
# - Local: http://localhost:5173
# - Network: Use --host to expose to network
```

#### 5. **Verify Installation**
- ✅ Open http://localhost:5173 in your browser
- ✅ You should see the ReactApp landing page
- ✅ Try the theme switcher (light/dark/system)
- ✅ Test the login/register forms
- ✅ Navigate to the dashboard after login

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # Run TypeScript type checking

# Testing
npm run test             # Run tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Run tests with coverage

# Storybook
npm run storybook        # Start Storybook development server
npm run build-storybook # Build Storybook for production
```

## 🎨 Styling

This project uses Tailwind CSS with a custom configuration:

- **Custom color palette** with primary colors
- **Inter font** for typography
- **Dark mode support** with system preference detection
- **Responsive design** with mobile-first approach
- **Custom components** with consistent styling

## 🧪 Testing

Testing is set up with Vitest and React Testing Library:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🎨 shadcn/ui Component Library

This project uses shadcn/ui for modern, accessible components:

```bash
# Add new components
npx shadcn@latest add [component-name]

# Examples
npx shadcn@latest add button card input dialog
```

### Available Components:
- **Card** - Flexible card components with header, content, footer
- **Badge** - Status descriptors and labels  
- **Avatar** - User profile images with fallbacks
- **Dialog** - Modal dialogs and overlays
- **Dropdown Menu** - Contextual menus
- **Label** - Form labels with accessibility
- **Form** - Form handling with validation

### Features:
- **Copy-paste components** - No runtime dependencies
- **Tailwind CSS integration** - Perfect for your setup
- **Accessibility first** - WCAG compliant out of the box
- **TypeScript native** - Full type safety
- **Customizable** - Own the code, modify as needed

## 📚 Storybook

Storybook is configured for component development and documentation:

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

### Storybook Features:
- **Component Documentation** - Interactive component documentation
- **Design System** - Centralized component library
- **Visual Testing** - Component testing in isolation
- **Accessibility Testing** - Built-in a11y addon
- **Theme Switching** - Light/dark mode testing
- **Responsive Testing** - Multiple viewport sizes
- **Interactive Controls** - Live component editing

### Available Stories:
- **Button** - All variants, sizes, and states
- **Input** - Form inputs with validation states
- **LoadingSpinner** - Loading indicators
- **Card** - Flexible card components with header, content, footer
- **Badge** - Status descriptors and labels
- **Avatar** - User profile images with fallbacks
- **Layout Components** - Header, Footer, Layout
- **Page Components** - Home, Login, Register, Dashboard

## 🚀 Deployment

### Build for Production

```bash
# Build the application for production
npm run build

# The build artifacts will be stored in the `dist/` directory
# You can preview the production build with:
npm run preview
```

### Environment Variables

Create a `.env.local` file for local development:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api

# App Configuration
VITE_APP_NAME=ReactApp
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=false
```

### Deployment Options

#### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Or connect your GitHub repository to Vercel for automatic deployments
```

#### **Netlify**
```bash
# Build the project
npm run build

# Deploy the dist/ folder to Netlify
# Or connect your GitHub repository to Netlify
```

#### **Docker**
```dockerfile
# Create Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔧 Troubleshooting

### Common Issues

#### **Port Already in Use**
```bash
# If port 5173 is in use, Vite will automatically try the next available port
# You can also specify a different port:
npm run dev -- --port 3000
```

#### **Node.js Version Issues**
```bash
# Check your Node.js version
node --version

# If you need to update Node.js:
# - Download from nodejs.org
# - Or use nvm: nvm install 18 && nvm use 18
```

#### **Dependency Issues**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### **TypeScript Errors**
```bash
# Run type checking
npm run type-check

# Fix TypeScript issues
npm run lint:fix
```

#### **Build Issues**
```bash
# Clear build cache
rm -rf dist node_modules/.vite

# Rebuild
npm run build
```

### Getting Help

- **Check the console** for error messages
- **Run `npm run lint`** to check for code issues
- **Run `npm run type-check`** to check TypeScript errors
- **Check the browser developer tools** for runtime errors

## 📚 Best Practices Implemented

### Code Organization
- **Feature-based structure** with clear separation of concerns
- **Barrel exports** for clean imports
- **TypeScript interfaces** for all data structures
- **Custom hooks** for reusable logic

### Performance
- **Code splitting** with React.lazy
- **Memoization** with React.memo and useMemo
- **Bundle optimization** with Vite
- **Tree shaking** for smaller bundles

### Accessibility
- **Semantic HTML** with proper ARIA attributes
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Color contrast** compliance

### Security
- **Input validation** and sanitization
- **XSS protection** with proper escaping
- **CSRF protection** considerations
- **Secure authentication** patterns

## 🔧 Configuration

### ESLint Configuration
- TypeScript support
- React hooks rules
- Accessibility rules
- Prettier integration

### Prettier Configuration
- Consistent code formatting
- TypeScript support
- JSON configuration

### Tailwind Configuration
- Custom color palette
- Typography settings
- Plugin integration
- Dark mode support

## 📖 Learn More

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.