# 📁 Folder Structure - Bookletku - Kelompok 3 - RPL

**Project**: Digital Booklet/Menu Ordering System  
**Architecture**: Clean Architecture + Feature-Based Organization  
**Framework**: Next.js 16 (App Router) + TypeScript  
**Updated**: 29 November 2025

---

## 📊 Project Overview

Bookletku adalah aplikasi web untuk pemesanan menu digital dengan fitur:
- **Customer Interface**: Menu browsing, cart management, dan checkout
- **Admin Panel**: Dashboard analytics, product management, QR code generation
- **Design**: Modern glassmorphism UI dengan dual theme (minimalist/colorful)
- **Database**: Supabase untuk data persistence

---

## 🏗️ Root Structure

```
bookletku_rpl7/
├── 📂 src/                      # Source code utama (clean architecture)
├── 📂 public/                   # Static assets (images, icons, SVGs)
├── 📂 .next/                    # Next.js build output (auto-generated)
├── 📂 node_modules/             # Dependencies (auto-generated)
├── 📄 package.json              # Project dependencies & scripts
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 next.config.ts            # Next.js configuration
├── 📄 tailwind.config.ts        # Tailwind CSS configuration
├── 📄 components.json           # shadcn/ui configuration
├── 📄 eslint.config.mjs         # ESLint rules
├── 📄 postcss.config.mjs        # PostCSS configuration
├── 📄 .env                      # Environment variables (Supabase keys)
├── 📄 .gitignore                # Git ignore rules
├── 📄 FOLDER-STRUCTURE.md       # Dokumentasi struktur folder (file ini)
└── 📄 README.md                 # Dokumentasi proyek
```

---

## 📦 src/ Directory Structure

### 🌐 src/app/ - Next.js App Router
Routing dan pages menggunakan Next.js App Router dengan route groups.

```
src/app/
├── 📂 (main)/                           # Route group untuk customer interface
│   └── 📄 page.tsx                      # Homepage / main menu page (customer view)
│
├── 📂 admin/                            # Admin panel routes
│   ├── 📄 layout.tsx                    # Admin layout dengan sidebar & glassmorphism
│   ├── 📄 page.tsx                      # Admin root page (redirect ke dashboard)
│   ├── 📂 login/                        # Admin authentication
│   │   └── 📄 page.tsx                  # Login page dengan glassmorphism form
│   ├── 📂 dashboard/                    # Analytics dashboard
│   │   └── 📄 page.tsx                  # Dashboard page dengan charts & stats
│   ├── 📂 product/                      # Product management
│   │   └── 📄 page.tsx                  # Product CRUD page
│   └── 📂 qr/                           # QR Code generator
│       └── 📄 page.tsx                  # QR code generation page
│
├── 📄 layout.tsx                        # Root layout (font, metadata)
└── 📄 globals.css                       # Global styles & Tailwind CSS
```

**File Details:**
- **`(main)/page.tsx`**: Main customer-facing page dengan menu display, cart, search, categories
- **`admin/layout.tsx`**: Admin layout dengan conditional sidebar dan glassmorphism theme
- **`admin/login/page.tsx`**: Authentication page untuk admin access
- **`admin/dashboard/page.tsx`**: Dashboard dengan revenue charts, stats cards, category analytics
- **`admin/product/page.tsx`**: Product management dengan table, add/edit/delete functionality
- **`admin/qr/page.tsx`**: Generate QR codes untuk menu access
- **`layout.tsx`**: Root layout dengan Geist font dan global metadata
- **`globals.css`**: Tailwind directives, CSS variables, custom animations

---

### 🎯 src/features/ - Feature Modules

#### 🛍️ features/main/ - Customer Features
Fitur-fitur untuk customer interface (menu browsing, cart, layout)

##### **features/main/menu/** - Menu Display Features
```
src/features/main/menu/
├── 📂 components/
│   ├── 📂 FeaturedMenu/                 # Featured/popular menu carousel
│   │   ├── 📄 index.tsx                 # Main featured menu component
│   │   ├── 📄 FeaturedHeader.tsx        # Header dengan title & subtitle
│   │   ├── 📄 FeaturedItem.tsx          # Individual featured menu item card
│   │   └── 📄 ScrollButtons.tsx         # Navigation buttons untuk carousel
│   │
│   ├── 📄 CategoryMenu.tsx              # Category filter pills/tabs
│   ├── 📄 MenuSection.tsx               # Menu grid section container
│   └── 📄 MenuDish.tsx                  # Individual menu item card dengan add button
│
├── 📂 hooks/
│   └── 📄 useMenuData.ts                # Custom hook: fetch & filter menu data
│
└── 📂 services/
    └── 📄 menuServices.ts               # API calls ke Supabase untuk menu data
```

**File Functions:**
- **`FeaturedMenu/index.tsx`**: Horizontal scrollable carousel untuk featured items
- **`FeaturedHeader.tsx`**: Header section dengan emoji dan text
- **`FeaturedItem.tsx`**: Card untuk featured menu dengan image, name, price
- **`ScrollButtons.tsx`**: Left/right navigation buttons dengan smooth scroll
- **`CategoryMenu.tsx`**: Filter categories dengan active state indicator
- **`MenuSection.tsx`**: Grid layout untuk menu items dengan loading & error states
- **`MenuDish.tsx`**: Menu card dengan image, name, price, description, add to cart button
- **`useMenuData.ts`**: Fetch menu dari Supabase, filter by search & category
- **`menuServices.ts`**: Supabase queries untuk fetch menu items

##### **features/main/cart/** - Shopping Cart Features
```
src/features/main/cart/
├── 📂 components/
│   ├── 📂 CartSidebar/                  # Desktop cart sidebar
│   │   ├── 📄 index.tsx                 # Main cart sidebar container
│   │   ├── 📄 CartHeader.tsx            # Header dengan title & close button
│   │   ├── 📄 CartItem.tsx              # Individual cart item dengan quantity controls
│   │   ├── 📄 CartSummary.tsx           # Total price & checkout button
│   │   └── 📄 EmptyCart.tsx             # Empty state dengan illustration
│   │
│   ├── 📄 CartButton.tsx                # Floating cart button (desktop)
│   ├── 📄 CartMobile.tsx                # Mobile cart view (bottom sheet)
│   └── 📄 OrderConfirmation.tsx         # Checkout confirmation dialog
│
└── 📂 hooks/
    ├── 📄 useCart.ts                    # Custom hook: cart state management
    └── 📄 useCheckout.ts                # Custom hook: checkout process logic
```

**File Functions:**
- **`CartSidebar/index.tsx`**: Desktop cart sidebar dengan glassmorphism styling
- **`CartHeader.tsx`**: Cart header dengan item count dan close button
- **`CartItem.tsx`**: Cart item card dengan +/- quantity buttons dan delete
- **`CartSummary.tsx`**: Total calculation dan checkout button
- **`EmptyCart.tsx`**: Empty state dengan message dan icon
- **`CartButton.tsx`**: Floating action button untuk toggle cart (desktop)
- **`CartMobile.tsx`**: Mobile optimized cart view
- **`OrderConfirmation.tsx`**: Confirmation modal sebelum checkout
- **`useCart.ts`**: State management untuk cart items, add/remove/update logic
- **`useCheckout.ts`**: Checkout flow logic, order submission ke Supabase

##### **features/main/layout/** - Layout Components
```
src/features/main/layout/
└── 📂 components/
    ├── 📄 Header.tsx                    # Main header dengan search, language, theme toggle
    ├── 📄 StoreBanner.tsx               # Store info banner dengan stats
    └── 📄 Sidebar.tsx                   # (Legacy/optional) Sidebar component
```

**File Functions:**
- **`Header.tsx`**: Top navigation dengan search bar, language switcher, theme toggle
- **`StoreBanner.tsx`**: Banner menampilkan jumlah items & categories
- **`Sidebar.tsx`**: Optional sidebar component

---

#### 👨‍💼 features/admin/ - Admin Panel Features
Fitur-fitur untuk admin panel (dashboard, product management, analytics)

```
src/features/admin/
├── 📂 components/
│   ├── 📂 Dashboard/                    # Dashboard components
│   │   ├── 📄 StatsCards.tsx            # Statistics cards (revenue, orders, etc)
│   │   ├── 📄 RevenueList.tsx           # Revenue list table
│   │   ├── 📄 CategoryChart.tsx         # Category distribution chart (Pie)
│   │   └── 📄 CartAddedChart.tsx        # Cart additions chart (Area)
│   │
│   └── 📂 Product/                      # Product management components
│       ├── 📄 productTable.tsx          # Product table dengan sorting & pagination
│       ├── 📄 productFormDialog.tsx     # Add/Edit product dialog form
│       └── 📄 productDeleteDialog.tsx   # Delete confirmation dialog
│
├── 📂 hooks/
│   └── 📄 useProduct.ts                 # Custom hook: product CRUD operations
│
└── 📂 services/
    ├── 📄 productService.ts             # Product API calls ke Supabase
    ├── 📄 orderServices.ts              # Order data fetching
    ├── 📄 statsServices.ts              # Statistics & analytics data
    └── 📄 trackingServices.ts           # User tracking & analytics data
```

**File Functions:**
- **`Dashboard/StatsCards.tsx`**: Cards menampilkan total revenue, orders, products, pending orders
- **`Dashboard/RevenueList.tsx`**: Table list revenue per product/category
- **`Dashboard/CategoryChart.tsx`**: Pie chart untuk category distribution
- **`Dashboard/CartAddedChart.tsx`**: Area chart untuk cart addition trends
- **`Product/productTable.tsx`**: Table dengan columns: image, name, price, category, stock, actions
- **`Product/productFormDialog.tsx`**: Modal form untuk create/update product
- **`Product/productDeleteDialog.tsx`**: Confirmation modal untuk delete product
- **`useProduct.ts`**: Hook untuk fetch, create, update, delete products
- **`productService.ts`**: Supabase queries untuk product CRUD
- **`orderServices.ts`**: Fetch order data, order statistics
- **`statsServices.ts`**: Calculate statistics dari database
- **`trackingServices.ts`**: Track user actions, cart additions

---

### 🔗 src/shared/ - Shared Resources
Komponen, utilities, types yang digunakan di multiple features

```
src/shared/
├── 📂 components/
│   └── 📂 ui/                           # shadcn/ui components
│       ├── 📄 button.tsx                # Button component (variants: default, outline, ghost, etc)
│       ├── 📄 card.tsx                  # Card component (header, content, footer)
│       ├── 📄 input.tsx                 # Input field component
│       ├── 📄 label.tsx                 # Form label component
│       ├── 📄 select.tsx                # Select/dropdown component
│       ├── 📄 dialog.tsx                # Modal dialog component
│       ├── 📄 alert-dialog.tsx          # Alert/confirmation dialog
│       ├── 📄 alert.tsx                 # Alert banner component
│       ├── 📄 badge.tsx                 # Badge/tag component
│       ├── 📄 tabs.tsx                  # Tabs component
│       └── 📄 textarea.tsx              # Textarea component
│
├── 📂 lib/
│   ├── 📄 supabase.ts                   # Supabase client initialization
│   ├── 📄 categoryIcons.ts              # Category icon mappings (Lucide icons)
│   └── 📄 utils.ts                      # Utility functions (cn, formatters)
│
└── 📂 types/
    ├── 📄 menu.types.ts                 # Menu & product type definitions
    ├── 📄 cart.types.ts                 # Cart & cart item types
    └── 📄 order.types.ts                # Order & order item types
```

**File Functions:**
- **UI Components** (`ui/*.tsx`): Reusable UI components dari shadcn/ui dengan Tailwind styling
- **`supabase.ts`**: Single instance Supabase client untuk database operations
- **`categoryIcons.ts`**: Map category names ke Lucide React icons
- **`utils.ts`**: Helper functions seperti `cn()` untuk className merging, formatCurrency, formatDate
- **`menu.types.ts`**: TypeScript interfaces untuk Menu, Product, Category
- **`cart.types.ts`**: TypeScript interfaces untuk CartItem, CartState
- **`order.types.ts`**: TypeScript interfaces untuk Order, OrderItem, OrderStatus

---

## 📂 public/ - Static Assets

```
public/
├── 📄 icon.png                  # App icon/favicon
├── 📄 next.svg                  # Next.js logo
├── 📄 vercel.svg                # Vercel logo
├── 📄 file.svg                  # File icon
├── 📄 globe.svg                 # Globe icon
└── 📄 window.svg                # Window icon
```

---

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| **`package.json`** | Project metadata, dependencies (Next.js, React, Supabase, Recharts, etc), scripts |
| **`tsconfig.json`** | TypeScript config dengan path aliases (`@/*`, `@/features/*`, dll) |
| **`next.config.ts`** | Next.js configuration (image domains, experimental features) |
| **`tailwind.config.ts`** | Tailwind CSS customization (colors, animations, plugins) |
| **`components.json`** | shadcn/ui configuration (component path, style, tailwind config) |
| **`eslint.config.mjs`** | ESLint rules untuk code quality |
| **`postcss.config.mjs`** | PostCSS plugins (Tailwind CSS) |
| **`.env`** | Environment variables (SUPABASE_URL, SUPABASE_ANON_KEY) |
| **`.gitignore`** | Files/folders to ignore in git (node_modules, .env, .next) |

---

## 🛤️ Path Aliases (tsconfig.json)

Untuk cleaner imports, project menggunakan path aliases:

```typescript
import Header from "@/features/main/layout/components/Header"
import { useCart } from "@/features/main/cart/hooks/useCart"
import { Button } from "@/shared/components/ui/button"
import { supabase } from "@/shared/lib/supabase"
```

**Configured Aliases:**
- `@/*` → `./src/*`
- `@/app/*` → `./src/app/*`
- `@/features/*` → `./src/features/*`
- `@/features/main/*` → `./src/features/main/*`
- `@/features/admin/*` → `./src/features/admin/*`
- `@/shared/*` → `./src/shared/*`
- `@/core/*` → `./src/core/*` (future use)

---

## 🎨 Architecture Principles

### 1️⃣ **Clean Architecture**
- **Features**: Organized by business logic (menu, cart, admin)
- **Shared**: Reusable components, utilities, types
- **Separation of Concerns**: Components, hooks, services terpisah

### 2️⃣ **Feature-Based Organization**
- Setiap feature memiliki components, hooks, services sendiri
- Easy to maintain dan scale
- Clear boundaries antar features

### 3️⃣ **Component Splitting**
- Max 200 lines per file
- Large components dipecah menjadi sub-components
- Contoh: `FeaturedMenu` (250+ lines) → 4 files (~60-120 lines)

### 4️⃣ **Type Safety**
- TypeScript di semua files
- Centralized type definitions di `src/shared/types/`
- Strict type checking enabled

### 5️⃣ **Code Reusability**
- Shared UI components dari shadcn/ui
- Custom hooks untuk logic reuse
- Service layer untuk API abstraction

---

## 📊 File Count Summary

```
Total Files: ~60+ files
├── Pages (app router): 7 files
├── Feature Components: 30+ files
├── Shared UI Components: 11 files
├── Hooks: 5 files
├── Services: 5 files
├── Types: 3 files
└── Config Files: 8 files
```

---

## 🔄 Data Flow

```
User Interaction
    ↓
Component (React)
    ↓
Custom Hook (useCart, useMenuData)
    ↓
Service Layer (menuServices, productService)
    ↓
Supabase Client (shared/lib/supabase)
    ↓
Database (Supabase PostgreSQL)
```

---

## 📝 Notes

- **Next.js Version**: 16.0.3 (App Router)
- **React Version**: 19.2.0
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4 + custom animations
- **UI Framework**: shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Charts**: Recharts library
- **Icons**: Lucide React
- **Design**: Glassmorphism dengan dual theme support

---



