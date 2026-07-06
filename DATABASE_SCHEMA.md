# 🗄️ E-Commerce Database Schema Documentation

## 📊 Database Overview

Production-ready E-Commerce database with 9 models, professional relationships, indexes, and cascade operations.

## 🏗️ Database Models

### 1. 👤 Users (Admin/Staff)
Manages admin and staff members who manage the platform.

**Fields:**
- `id` - UUID primary key
- `email` - Unique email (indexed)
- `username` - Unique username (indexed)
- `password` - Hashed password
- `firstName`, `lastName` - Name fields
- `avatar` - Profile picture URL
- `role` - USER, ADMIN, MODERATOR (indexed)
- `isActive` - Account status
- `createdAt`, `updatedAt` - Timestamps

**Relations:**
- ✅ Has many `Products` (CASCADE delete)
- ✅ Has many `Orders`

**Indexes:** email, username, role

---

### 2. 👥 Customers
Platform customers who place orders.

**Fields:**
- `id` - UUID primary key
- `email` - Unique email (indexed)
- `password` - Hashed password
- `firstName`, `lastName` - Required names
- `phone` - Phone number (indexed)
- `avatar` - Profile picture
- `isActive` - Account status
- `lastLoginAt` - Last login timestamp
- `createdAt`, `updatedAt` - Timestamps

**Relations:**
- ✅ Has many `Orders` (RESTRICT delete)
- ✅ Has many `Payments` (RESTRICT delete)

**Indexes:** email, phone

---

### 3. 📁 Categories
Hierarchical product categories (supports parent-child).

**Fields:**
- `id` - UUID primary key
- `name` - Unique category name
- `slug` - Unique URL-friendly slug (indexed)
- `description` - Category description
- `parentId` - Parent category (self-relation)
- `image` - Category image
- `isActive` - Visibility status (indexed)
- `sortOrder` - Display order
- `createdAt`, `updatedAt` - Timestamps

**Relations:**
- ✅ Self-relation: parent/children (SET NULL on delete)
- ✅ Has many `Products` (RESTRICT delete)

**Indexes:** slug, parentId, isActive

**Example Hierarchy:**
```
Electronics (parent)
  ├── Smartphones (child)
  └── Laptops (child)
Clothing (parent)
  └── Mens Clothing (child)
```

---

### 4. 📦 Products
Main product catalog.

**Fields:**
- `id` - UUID primary key
- `name` - Product name
- `slug` - Unique URL slug (indexed)
- `description` - Full description
- `price` - Regular price (indexed)
- `salePrice` - Discounted price
- `sku` - Stock Keeping Unit - unique (indexed)
- `stock` - Available quantity
- `isActive` - Visibility (indexed)
- `isFeatured` - Featured product flag (indexed)
- `categoryId` - Category relation
- `userId` - Creator (admin/staff)
- `weight` - Product weight
- `dimensions` - Physical dimensions
- `tags` - Comma-separated tags
- `metaTitle`, `metaDesc` - SEO fields
- `viewCount`, `soldCount` - Statistics
- `createdAt`, `updatedAt` - Timestamps

**Relations:**
- ✅ Belongs to `Category` (RESTRICT delete)
- ✅ Belongs to `User` (CASCADE delete)
- ✅ Has many `ProductImages` (CASCADE delete)
- ✅ Has many `OrderItems` (RESTRICT delete)

**Indexes:** slug, sku, categoryId, userId, isActive, isFeatured, price

---

### 5. 🖼️ ProductImages
Product photos and images.

**Fields:**
- `id` - UUID primary key
- `productId` - Product relation
- `url` - Image URL
- `alt` - Alt text for SEO
- `isPrimary` - Main product image flag (indexed)
- `sortOrder` - Display order
- `createdAt`, `updatedAt` - Timestamps

**Relations:**
- ✅ Belongs to `Product` (CASCADE delete)

**Indexes:** productId, isPrimary

---

### 6. 🛒 Orders
Customer orders.

**Fields:**
- `id` - UUID primary key
- `orderNumber` - Unique order number (indexed)
- `customerId` - Customer relation
- `userId` - Admin who processed (optional)
- `status` - PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED (indexed)
- `subtotal` - Items total
- `tax` - Tax amount
- `shippingCost` - Shipping fee
- `discount` - Discount amount
- `total` - Final total
- `notes` - Order notes
- `shippingAddress` - Delivery address
- `billingAddress` - Billing address
- `trackingNumber` - Shipment tracking
- `shippedAt`, `deliveredAt`, `cancelledAt` - Status timestamps
- `createdAt`, `updatedAt` - Timestamps

**Relations:**
- ✅ Belongs to `Customer` (RESTRICT delete)
- ✅ Belongs to `User` optional (SET NULL)
- ✅ Has many `OrderItems` (CASCADE delete)
- ✅ Has many `Payments` (CASCADE delete)

**Indexes:** orderNumber, customerId, userId, status, createdAt

---

### 7. 📝 OrderItems
Individual items in orders.

**Fields:**
- `id` - UUID primary key
- `orderId` - Order relation
- `productId` - Product relation
- `quantity` - Quantity ordered
- `price` - Price at time of order
- `discount` - Discount applied
- `total` - Line total
- `createdAt`, `updatedAt` - Timestamps

**Relations:**
- ✅ Belongs to `Order` (CASCADE delete)
- ✅ Belongs to `Product` (RESTRICT delete)

**Indexes:** orderId, productId

---

### 8. 💳 Payments
Payment transactions.

**Fields:**
- `id` - UUID primary key
- `orderId` - Order relation
- `customerId` - Customer relation
- `amount` - Payment amount
- `paymentMethod` - CARD, CASH, BANK_TRANSFER, PAYPAL
- `paymentStatus` - PENDING, COMPLETED, FAILED, REFUNDED (indexed)
- `transactionId` - Unique transaction ID (indexed)
- `paymentGateway` - Stripe, PayPal, etc.
- `paymentMetadata` - Additional JSON data
- `paidAt`, `refundedAt` - Status timestamps
- `createdAt`, `updatedAt` - Timestamps

**Relations:**
- ✅ Belongs to `Order` (CASCADE delete)
- ✅ Belongs to `Customer` (RESTRICT delete)

**Indexes:** orderId, customerId, paymentStatus, transactionId

---

### 9. ⚙️ Settings
System configuration key-value store.

**Fields:**
- `id` - UUID primary key
- `key` - Unique setting key (indexed)
- `value` - Setting value (string)
- `type` - STRING, NUMBER, BOOLEAN, JSON
- `group` - GENERAL, PAYMENT, SHIPPING, EMAIL (indexed)
- `isPublic` - Public visibility flag
- `createdAt`, `updatedAt` - Timestamps

**Indexes:** key, group

**Example Settings:**
- `site_name`: "E-Commerce Shop"
- `currency`: "USD"
- `tax_rate`: "10"
- `free_shipping_threshold`: "100"

---

## 🔗 Relationship Summary

```
User (Admin)
  ├─> Products (CASCADE)
  └─> Orders (SET NULL)

Customer
  ├─> Orders (RESTRICT)
  └─> Payments (RESTRICT)

Category
  ├─> Category (self, SET NULL)
  └─> Products (RESTRICT)

Product
  ├─> ProductImages (CASCADE)
  └─> OrderItems (RESTRICT)

Order
  ├─> OrderItems (CASCADE)
  └─> Payments (CASCADE)
```

## 🎯 Cascade Delete Strategy

✅ **CASCADE** - Child deleted when parent deleted:
- User → Products
- Product → ProductImages
- Order → OrderItems
- Order → Payments

⚠️ **RESTRICT** - Cannot delete parent if children exist:
- Category → Products
- Product → OrderItems
- Customer → Orders
- Customer → Payments

🔄 **SET NULL** - Child's foreign key set to null:
- Category → Category (parent/child)
- User → Orders (admin assignment)

## 📈 Database Statistics (After Seeding)

| Model | Count | Description |
|-------|-------|-------------|
| Users | 2 | Admin & Staff |
| Customers | 2 | Sample customers |
| Categories | 5 | With hierarchy |
| Products | 5 | Various items |
| ProductImages | 6 | Product photos |
| Orders | 2 | Sample orders |
| OrderItems | 4 | Order line items |
| Payments | 2 | Transactions |
| Settings | 5 | System config |

## 🔐 Sample Data

### Admin Login:
- **Email:** admin@shop.com
- **Password:** Admin123!

### Customer Login:
- **Email:** john.doe@example.com
- **Password:** Admin123!

## 💾 Migration Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create new migration
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (development)
npx prisma migrate reset

# Seed database
npx ts-node prisma/seed.ts

# Open Prisma Studio
npx prisma studio
```

## 🏆 Production Features

✅ UUID primary keys
✅ Proper indexing on foreign keys
✅ Cascading deletes configured
✅ Unique constraints where needed
✅ Timestamps on all tables
✅ Hierarchical categories
✅ Comprehensive seeding
✅ Professional relationships
✅ SEO-friendly fields
✅ Order tracking
✅ Payment processing
✅ Settings management

## 📝 Notes

- All sensitive data (passwords) are hashed with bcrypt
- Database uses SQLite for development (easily switch to PostgreSQL for production)
- All relations properly indexed for performance
- Cascade operations prevent orphaned records
- Comprehensive seed data for testing
