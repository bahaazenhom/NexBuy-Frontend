# 🛍️ NexBuy Frontend

A modern, responsive e-commerce web application built with Angular 18 and TypeScript. Features a complete shopping experience with product browsing, cart management, user authentication, and order processing.

[![Angular](https://img.shields.io/badge/Angular-v18-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.9-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

### 🛒 Shopping Experience
- **Product Catalog** - Browse products with images, descriptions, and pricing
- **Product Details** - Comprehensive view with specifications and reviews
- **Smart Search** - Filter and search products efficiently
- **Real-time Cart** - Instant cart updates with quantity controls
- **Seamless Checkout** - Streamlined order placement process

### 👤 User Features
- **Secure Authentication** - JWT-based login and registration
- **Session Persistence** - Stay logged in across sessions
- **Order History** - Track all past purchases
- **Profile Management** - Update user information

### 📦 Seller Dashboard
- **Product Management** - Create, edit, and delete products
- **Ownership Control** - Automatic validation of product ownership
- **Sales Overview** - View and manage listed products
- **Inventory Control** - Real-time product availability

### 💬 Community Features
- **Product Reviews** - Rate and comment on products
- **Star Ratings** - 5-star rating system
- **Review History** - View all product reviews

## 🎨 UI/UX Highlights

- ✨ Modern, clean interface with gradient accents
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Fast loading with lazy-loaded components
- 🎯 Intuitive navigation and user flow
- 🌐 Inter font for optimal readability
- 🔄 Real-time updates using Angular Signals
- ⌨️ Keyboard accessible
- 🎭 Smooth animations and transitions

## 🏗️ Technical Architecture

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Angular** | 18.x | Frontend framework |
| **TypeScript** | 5.9 | Type-safe development |
| **RxJS** | 7.8 | Reactive programming |
| **Angular Signals** | Latest | State management |
| **Angular Router** | 18.x | Navigation & routing |
| **HttpClient** | 18.x | API communication |

### Modern Angular Features

- 🎯 **Standalone Components** - No NgModules required
- 🔄 **Signals** - Reactive state management
- 🎨 **Control Flow** - New @if, @for syntax
- ⚡ **Lazy Loading** - Optimized bundle sizes
- 🔒 **Route Guards** - Protected routes
- 📝 **Reactive Forms** - Form validation and handling

## 📁 Project Structure

```
src/
├── app/
│   ├── components/              # Feature components
│   │   ├── header/             # Navigation header
│   │   ├── product-list/       # Product grid view
│   │   ├── product-detail/     # Single product view
│   │   ├── cart/               # Shopping cart
│   │   ├── checkout/           # Order placement
│   │   ├── my-products/        # Seller dashboard
│   │   ├── add-product/        # Create product
│   │   ├── edit-product/       # Update product
│   │   ├── orders/             # Order history
│   │   ├── login/              # Authentication
│   │   └── register/           # User registration
│   ├── services/                # Business logic
│   │   ├── auth.service.ts     # Authentication
│   │   ├── product.service.ts  # Product operations
│   │   ├── cart.service.ts     # Cart management
│   │   ├── order.service.ts    # Order processing
│   │   └── comment.service.ts  # Reviews
│   ├── models/                  # TypeScript interfaces
│   │   └── index.ts            # Data models
│   ├── app.routes.ts           # Route configuration
│   ├── app.config.ts           # App providers
│   └── app.ts                  # Root component
├── environments/                # Environment configs
│   ├── environment.ts          # Development
│   └── environment.prod.ts     # Production
├── styles.css                  # Global styles
└── index.html                  # Entry point
```

## � Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (v18 or higher)

```bash
npm install -g @angular/cli
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbdoAbdelfatah/nexbuy-frontend.git
   cd nexbuy-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   
   Update `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:5000'
   };
   ```

4. **Start development server**
   ```bash
   npm start
   # or
   ng serve
   ```

5. **Open browser**
   
   Navigate to `http://localhost:4200/`

## 🏗️ Build & Deployment

### Development Build
```bash
ng build
```

### Production Build
```bash
ng build --configuration production
```
Output: `dist/nexbuy-frontend/browser/`

### Optimization Features
- ✅ Ahead-of-Time (AOT) compilation
- ✅ Tree shaking for smaller bundles
- ✅ Lazy loading of routes
- ✅ Build optimizer
- ✅ Production mode optimizations

## 🌐 Environment Configuration

### Development
```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
};
```

### Production
```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com'
};
```

## 🎯 Key Components

### Product List
- Grid layout with product cards
- Real-time cart status indicators
- Quantity controls
- Filter own products from shopping view

### Product Detail
- Full product information
- Image gallery
- Add to cart functionality
- Owner actions (edit/delete)
- Reviews and ratings section

### Shopping Cart
- Live cart updates
- Quantity adjustment (+/-)
- Remove items
- Total calculation
- Checkout button

### My Products
- Seller dashboard
- Product management (CRUD)
- Click to view details
- Edit and delete actions

## 🔐 Authentication Flow

1. **Registration** - Create account with validation
2. **Login** - Secure JWT authentication
3. **Token Storage** - localStorage with automatic refresh
4. **Route Protection** - Guards for protected routes
5. **Auto-logout** - On token expiration

## � Responsive Design

Breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with optimized layouts for each screen size.

## 🧪 Testing

```bash
# Run unit tests
ng test

# Run with coverage
ng test --coverage

# Run in headless mode
ng test --browsers=ChromeHeadless
```

## 📦 Dependencies

### Core Dependencies
```json
{
  "@angular/core": "^20.3.0",
  "@angular/common": "^20.3.0",
  "@angular/router": "^20.3.0",
  "@angular/forms": "^20.3.0",
  "@angular/platform-browser": "^20.3.0",
  "rxjs": "~7.8.0",
  "zone.js": "~0.15.0",
  "tslib": "^2.3.0"
}
```

### Development Dependencies
```json
{
  "@angular/cli": "^20.3.6",
  "@angular/compiler-cli": "^20.3.0",
  "typescript": "~5.9.2",
  "karma": "~6.4.0",
  "jasmine-core": "~5.9.0"
}
```

## �️ Security Features

- ✅ JWT token authentication
- ✅ XSS protection via Angular sanitization
- ✅ CSRF protection
- ✅ Input validation
- ✅ Secure HTTP communication
- ✅ Environment-based configuration

## 🎨 Design System

### Colors
- Primary: `#667eea` (Purple gradient)
- Secondary: `#764ba2`
- Success: `#48bb78`
- Danger: `#f56565`
- Warning: `#ed8936`

### Typography
- Font Family: Inter (Google Fonts)
- Headings: 600-700 weight
- Body: 400 weight
- Small text: 300 weight

## 👨‍ Authors

**Abdo Abdelfatah**

- GitHub: [@AbdoAbdelfatah](https://github.com/AbdoAbdelfatah)

**Bahaa Zenhom**

- GitHub: [@bahaazenhom](https://github.com/bahaazenhom)

## 🔗 Related

- [Backend API Repository](https://github.com/AbdoAbdelfatah/NexBuy_Backend) - Node.js REST API

---
