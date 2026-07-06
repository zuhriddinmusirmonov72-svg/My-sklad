# 🏗️ E-Commerce Management System - Professional Architecture

## 📋 API Endpoints Design

### Authentication
- `POST /api/v1/auth/login` - Admin login
- `POST /api/v1/auth/refresh` - Refresh token
- `GET /api/v1/auth/profile` - Get current admin profile
- `POST /api/v1/auth/logout` - Logout

### Products Management
- `GET /api/v1/products` - List products (with pagination, search, filter)
- `GET /api/v1/products/:id` - Get single product
- `POST /api/v1/products` - Create product
- `PATCH /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product
- `POST /api/v1/products/:id/images` - Upload product images
- `DELETE /api/v1/products/:id/images/:imageId` - Delete product image

### Customers Management
- `GET /api/v1/customers` - List customers (with pagination, search)
- `GET /api/v1/customers/:id` - Get single customer
- `POST /api/v1/customers` - Create customer
- `PATCH /api/v1/customers/:id` - Update customer
- `DELETE /api/v1/customers/:id` - Delete customer
- `GET /api/v1/customers/:id/history` - Get customer order history

### Orders Management
- `GET /api/v1/orders` - List orders (with pagination, search, filter)
- `GET /api/v1/orders/:id` - Get single order
- `POST /api/v1/orders` - Create order
- `PATCH /api/v1/orders/:id` - Update order
- `PATCH /api/v1/orders/:id/status` - Update order status
- `DELETE /api/v1/orders/:id` - Cancel order
- `GET /api/v1/orders/:id/invoice` - Get order invoice

### Dashboard & Analytics
- `GET /api/v1/dashboard/stats` - Get dashboard statistics
- `GET /api/v1/dashboard/sales/today` - Today's sales
- `GET /api/v1/dashboard/sales/monthly` - Monthly sales
- `GET /api/v1/dashboard/sales/chart` - Sales chart data
- `GET /api/v1/dashboard/top-products` - Top selling products
- `GET /api/v1/dashboard/recent-orders` - Recent orders

### Categories
- `GET /api/v1/categories` - List categories
- `POST /api/v1/categories` - Create category
- `PATCH /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category

### Search & Autocomplete
- `GET /api/v1/search/products?q=...` - Search products
- `GET /api/v1/search/customers?q=...` - Search customers
- `GET /api/v1/search/orders?q=...` - Search orders
- `GET /api/v1/autocomplete/products?q=...` - Product autocomplete
- `GET /api/v1/autocomplete/customers?q=...` - Customer autocomplete

### File Upload
- `POST /api/v1/uploads/images` - Upload images
- `POST /api/v1/uploads/documents` - Upload documents
- `DELETE /api/v1/uploads/:filename` - Delete uploaded file

## 🗄️ Database Schema

### Admin
- id (UUID)
- email (unique)
- password (hashed)
- fullName
- role (SUPER_ADMIN, ADMIN, MANAGER)
- isActive
- lastLoginAt
- createdAt, updatedAt

### Category
- id (UUID)
- name (unique)
- slug (unique)
- description
- isActive
- createdAt, updatedAt

### Product
- id (UUID)
- name
- slug (unique)
- description
- price
- discountPrice
- sku (unique)
- stockQuantity
- minStockLevel
- categoryId (FK)
- isActive
- isFeatured
- tags
- createdBy (FK to Admin)
- createdAt, updatedAt

### ProductImage
- id (UUID)
- productId (FK)
- url
- filename
- isPrimary
- sortOrder
- createdAt

### Customer
- id (UUID)
- fullName
- phone (unique)
- email
- address
- city
- notes
- totalOrders
- totalSpent
- lastOrderAt
- createdAt, updatedAt

### Order
- id (UUID)
- orderNumber (unique, auto)
- customerId (FK)
- status (PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- subtotal
- discount
- tax
- shippingCost
- total
- notes
- paymentMethod
- paymentStatus
- createdBy (FK to Admin)
- createdAt, updatedAt, deliveredAt

### OrderItem
- id (UUID)
- orderId (FK)
- productId (FK)
- productName (snapshot)
- quantity
- unitPrice (snapshot)
- discount
- total
- createdAt

## 📁 Project Structure

```
src/
├── common/
│   ├── decorators/
│   │   ├── current-admin.decorator.ts
│   │   ├── public.decorator.ts
│   │   └── roles.decorator.ts
│   ├── dto/
│   │   ├── pagination.dto.ts
│   │   └── search.dto.ts
│   ├── filters/
│   │   ├── http-exception.filter.ts
│   │   └── prisma-exception.filter.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── interceptors/
│   │   ├── logging.interceptor.ts
│   │   └── transform.interceptor.ts
│   ├── interfaces/
│   │   └── pagination.interface.ts
│   └── utils/
│       ├── pagination.util.ts
│       ├── password.util.ts
│       └── slug.util.ts
├── config/
│   ├── app.config.ts
│   ├── database.config.ts
│   ├── jwt.config.ts
│   └── upload.config.ts
├── modules/
│   ├── auth/
│   │   ├── dto/
│   │   ├── strategies/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── products/
│   ├── customers/
│   ├── orders/
│   ├── categories/
│   ├── dashboard/
│   ├── search/
│   ├── uploads/
│   └── prisma/
├── app.controller.ts
├── app.module.ts
└── main.ts
```

## 🎯 Features Implementation

✅ JWT Authentication with refresh tokens
✅ Role-based authorization (SUPER_ADMIN, ADMIN, MANAGER)
✅ Comprehensive validation with class-validator
✅ Global exception handling
✅ Request/response logging
✅ File upload with validation
✅ Pagination with metadata
✅ Advanced search with filters
✅ Autocomplete functionality
✅ Dashboard with real-time statistics
✅ Order status tracking
✅ Customer purchase history
✅ Product inventory management
✅ Swagger OpenAPI 3.0 documentation
✅ Docker containerization
✅ PostgreSQL with Prisma ORM
✅ Environment-based configuration
