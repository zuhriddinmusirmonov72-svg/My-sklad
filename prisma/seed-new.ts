import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding E-Commerce Management System...\n');

  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  // ==========================================
  // 1. Create Admins
  // ==========================================
  console.log('👤 Creating admins...');
  
  const superAdmin = await prisma.admin.upsert({
    where: { email: 'superadmin@ecommerce.com' },
    update: {},
    create: {
      email: 'superadmin@ecommerce.com',
      password: hashedPassword,
      fullName: 'Super Administrator',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@ecommerce.com' },
    update: {},
    create: {
      email: 'admin@ecommerce.com',
      password: hashedPassword,
      fullName: 'Admin Manager',
      role: 'ADMIN',
      isActive: true,
    },
  });

  const manager = await prisma.admin.upsert({
    where: { email: 'manager@ecommerce.com' },
    update: {},
    create: {
      email: 'manager@ecommerce.com',
      password: hashedPassword,
      fullName: 'Store Manager',
      role: 'MANAGER',
      isActive: true,
    },
  });

  console.log('✅ 3 admins created');

  // ==========================================
  // 2. Create Categories
  // ==========================================
  console.log('\n📁 Creating categories...');
  
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic devices and gadgets',
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Clothing',
        slug: 'clothing',
        description: 'Apparel and fashion items',
        isActive: true,
        sortOrder: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Home & Garden',
        slug: 'home-garden',
        description: 'Home decor and garden supplies',
        isActive: true,
        sortOrder: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Books',
        slug: 'books',
        description: 'Books and educational materials',
        isActive: true,
        sortOrder: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Sports',
        slug: 'sports',
        description: 'Sports equipment and accessories',
        isActive: true,
        sortOrder: 5,
      },
    }),
  ]);

  console.log(`✅ ${categories.length} categories created`);

  // ==========================================
  // 3. Create Products
  // ==========================================
  console.log('\n📦 Creating products...');

  const products = await Promise.all([
    // Electronics
    prisma.product.create({
      data: {
        name: 'Wireless Bluetooth Headphones',
        slug: 'wireless-bluetooth-headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
        price: 79.99,
        discountPrice: 59.99,
        sku: 'ELEC-HEAD-001',
        stockQuantity: 50,
        minStockLevel: 10,
        categoryId: categories[0].id,
        createdBy: superAdmin.id,
        isActive: true,
        isFeatured: true,
        tags: 'wireless,bluetooth,headphones,audio',
        unit: 'pcs',
        weight: 0.25,
        images: {
          create: [
            {
              url: '/uploads/products/headphones-1.jpg',
              filename: 'headphones-1.jpg',
              isPrimary: true,
              sortOrder: 1,
              mimeType: 'image/jpeg',
            },
            {
              url: '/uploads/products/headphones-2.jpg',
              filename: 'headphones-2.jpg',
              isPrimary: false,
              sortOrder: 2,
              mimeType: 'image/jpeg',
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Smart Watch Pro',
        slug: 'smart-watch-pro',
        description: 'Advanced fitness tracking smartwatch with heart rate monitor',
        price: 199.99,
        sku: 'ELEC-WATCH-002',
        stockQuantity: 30,
        minStockLevel: 5,
        categoryId: categories[0].id,
        createdBy: admin.id,
        isActive: true,
        isFeatured: true,
        tags: 'smartwatch,fitness,health,wearable',
        unit: 'pcs',
        weight: 0.05,
        images: {
          create: {
            url: '/uploads/products/smartwatch-1.jpg',
            filename: 'smartwatch-1.jpg',
            isPrimary: true,
            sortOrder: 1,
            mimeType: 'image/jpeg',
          },
        },
      },
    }),
    // Clothing
    prisma.product.create({
      data: {
        name: 'Classic Denim Jeans',
        slug: 'classic-denim-jeans',
        description: 'Comfortable slim-fit denim jeans',
        price: 49.99,
        discountPrice: 39.99,
        sku: 'CLTH-JEANS-001',
        stockQuantity: 100,
        minStockLevel: 20,
        categoryId: categories[1].id,
        createdBy: admin.id,
        isActive: true,
        tags: 'jeans,denim,pants,clothing',
        unit: 'pcs',
        images: {
          create: {
            url: '/uploads/products/jeans-1.jpg',
            filename: 'jeans-1.jpg',
            isPrimary: true,
            sortOrder: 1,
            mimeType: 'image/jpeg',
          },
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Cotton T-Shirt Pack (3pc)',
        slug: 'cotton-tshirt-pack',
        description: 'Pack of 3 premium cotton t-shirts',
        price: 29.99,
        sku: 'CLTH-TSHIRT-002',
        stockQuantity: 150,
        minStockLevel: 30,
        categoryId: categories[1].id,
        createdBy: manager.id,
        isActive: true,
        tags: 'tshirt,cotton,clothing,pack',
        unit: 'pack',
        images: {
          create: {
            url: '/uploads/products/tshirt-pack-1.jpg',
            filename: 'tshirt-pack-1.jpg',
            isPrimary: true,
            sortOrder: 1,
            mimeType: 'image/jpeg',
          },
        },
      },
    }),
    // Home & Garden
    prisma.product.create({
      data: {
        name: 'LED Desk Lamp',
        slug: 'led-desk-lamp',
        description: 'Adjustable LED desk lamp with USB charging port',
        price: 34.99,
        sku: 'HOME-LAMP-001',
        stockQuantity: 75,
        minStockLevel: 15,
        categoryId: categories[2].id,
        createdBy: admin.id,
        isActive: true,
        isFeatured: true,
        tags: 'lamp,led,desk,home',
        unit: 'pcs',
        weight: 0.8,
        images: {
          create: {
            url: '/uploads/products/desk-lamp-1.jpg',
            filename: 'desk-lamp-1.jpg',
            isPrimary: true,
            sortOrder: 1,
            mimeType: 'image/jpeg',
          },
        },
      },
    }),
    // Books
    prisma.product.create({
      data: {
        name: 'Web Development Guide 2024',
        slug: 'web-development-guide-2024',
        description: 'Complete guide to modern web development',
        price: 44.99,
        sku: 'BOOK-WEB-001',
        stockQuantity: 40,
        minStockLevel: 10,
        categoryId: categories[3].id,
        createdBy: admin.id,
        isActive: true,
        tags: 'book,programming,web,development',
        unit: 'pcs',
        weight: 0.5,
        images: {
          create: {
            url: '/uploads/products/book-web-1.jpg',
            filename: 'book-web-1.jpg',
            isPrimary: true,
            sortOrder: 1,
            mimeType: 'image/jpeg',
          },
        },
      },
    }),
    // Sports
    prisma.product.create({
      data: {
        name: 'Yoga Mat Premium',
        slug: 'yoga-mat-premium',
        description: 'Non-slip premium yoga mat with carrying strap',
        price: 24.99,
        sku: 'SPORT-YOGA-001',
        stockQuantity: 60,
        minStockLevel: 15,
        categoryId: categories[4].id,
        createdBy: manager.id,
        isActive: true,
        tags: 'yoga,mat,fitness,sports',
        unit: 'pcs',
        weight: 1.2,
        dimensions: '183 x 61 x 0.6 cm',
        images: {
          create: {
            url: '/uploads/products/yoga-mat-1.jpg',
            filename: 'yoga-mat-1.jpg',
            isPrimary: true,
            sortOrder: 1,
            mimeType: 'image/jpeg',
          },
        },
      },
    }),
  ]);

  console.log(`✅ ${products.length} products created with images`);

  // ==========================================
  // 4. Create Customers
  // ==========================================
  console.log('\n👥 Creating customers...');

  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        fullName: 'Alisher Karimov',
        phone: '+998901234567',
        email: 'alisher@example.com',
        address: 'Chilonzor tumani, 12-kvartal, 5-uy',
        city: 'Tashkent',
        postalCode: '100115',
        notes: 'Regular customer, prefers evening delivery',
        isActive: true,
      },
    }),
    prisma.customer.create({
      data: {
        fullName: 'Kamola Rahimova',
        phone: '+998907654321',
        email: 'kamola@example.com',
        address: 'Yunusobod tumani, 7-kvartal, 15-uy',
        city: 'Tashkent',
        postalCode: '100093',
        isActive: true,
      },
    }),
    prisma.customer.create({
      data: {
        fullName: 'Bobur Tursunov',
        phone: '+998931234567',
        address: 'Registon ko\'chasi, 25-uy',
        city: 'Samarkand',
        postalCode: '140100',
        notes: 'Calls before delivery required',
        isActive: true,
      },
    }),
    prisma.customer.create({
      data: {
        fullName: 'Dilnoza Usmanova',
        phone: '+998909876543',
        email: 'dilnoza@example.com',
        address: 'Mustaqillik ko\'chasi, 45-uy',
        city: 'Bukhara',
        postalCode: '200100',
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ ${customers.length} customers created`);

  // ==========================================
  // 5. Create Orders
  // ==========================================
  console.log('\n🛒 Creating orders...');

  const order1 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-2026-00001',
      customerId: customers[0].id,
      createdBy: admin.id,
      status: 'DELIVERED',
      subtotal: 139.98,
      discount: 20.00,
      tax: 11.99,
      shippingCost: 5.00,
      total: 136.97,
      paymentMethod: 'CARD',
      paymentStatus: 'PAID',
      shippingAddress: customers[0].address,
      confirmedAt: new Date('2026-07-01T10:00:00'),
      shippedAt: new Date('2026-07-02T14:00:00'),
      deliveredAt: new Date('2026-07-03T16:30:00'),
      items: {
        create: [
          {
            productId: products[0].id,
            productName: products[0].name,
            productSku: products[0].sku,
            quantity: 1,
            unitPrice: 59.99,
            discount: 0,
            total: 59.99,
          },
          {
            productId: products[1].id,
            productName: products[1].name,
            productSku: products[1].sku,
            quantity: 1,
            unitPrice: 199.99,
            discount: 20.00,
            total: 179.99,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-2026-00002',
      customerId: customers[1].id,
      createdBy: manager.id,
      status: 'PROCESSING',
      subtotal: 109.97,
      discount: 0,
      tax: 10.99,
      shippingCost: 5.00,
      total: 125.96,
      paymentMethod: 'CASH',
      paymentStatus: 'PENDING',
      shippingAddress: customers[1].address,
      confirmedAt: new Date('2026-07-05T09:00:00'),
      items: {
        create: [
          {
            productId: products[2].id,
            productName: products[2].name,
            productSku: products[2].sku,
            quantity: 1,
            unitPrice: 39.99,
            discount: 0,
            total: 39.99,
          },
          {
            productId: products[3].id,
            productName: products[3].name,
            productSku: products[3].sku,
            quantity: 2,
            unitPrice: 29.99,
            discount: 0,
            total: 59.98,
          },
        ],
      },
    },
  });

  const order3 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-2026-00003',
      customerId: customers[2].id,
      createdBy: admin.id,
      status: 'PENDING',
      subtotal: 69.98,
      discount: 0,
      tax: 6.99,
      shippingCost: 10.00,
      total: 86.97,
      paymentMethod: 'BANK_TRANSFER',
      paymentStatus: 'PENDING',
      shippingAddress: customers[2].address,
      items: {
        create: [
          {
            productId: products[4].id,
            productName: products[4].name,
            productSku: products[4].sku,
            quantity: 2,
            unitPrice: 34.99,
            discount: 0,
            total: 69.98,
          },
        ],
      },
    },
  });

  console.log('✅ 3 orders created with items');

  // Update customer statistics
  await prisma.customer.update({
    where: { id: customers[0].id },
    data: {
      totalOrders: 1,
      totalSpent: 136.97,
      lastOrderAt: order1.createdAt,
    },
  });

  await prisma.customer.update({
    where: { id: customers[1].id },
    data: {
      totalOrders: 1,
      totalSpent: 125.96,
      lastOrderAt: order2.createdAt,
    },
  });

  await prisma.customer.update({
    where: { id: customers[2].id },
    data: {
      totalOrders: 1,
      totalSpent: 86.97,
      lastOrderAt: order3.createdAt,
    },
  });

  // ==========================================
  // 6. Create System Settings
  // ==========================================
  console.log('\n⚙️ Creating system settings...');

  const settings = await Promise.all([
    prisma.systemSetting.upsert({
      where: { key: 'store_name' },
      update: {},
      create: {
        key: 'store_name',
        value: 'E-Commerce Store',
        type: 'STRING',
        group: 'GENERAL',
        isPublic: true,
      },
    }),
    prisma.systemSetting.upsert({
      where: { key: 'currency' },
      update: {},
      create: {
        key: 'currency',
        value: 'UZS',
        type: 'STRING',
        group: 'GENERAL',
        isPublic: true,
      },
    }),
    prisma.systemSetting.upsert({
      where: { key: 'tax_rate' },
      update: {},
      create: {
        key: 'tax_rate',
        value: '12',
        type: 'NUMBER',
        group: 'FINANCIAL',
        isPublic: true,
      },
    }),
    prisma.systemSetting.upsert({
      where: { key: 'default_shipping_cost' },
      update: {},
      create: {
        key: 'default_shipping_cost',
        value: '5',
        type: 'NUMBER',
        group: 'SHIPPING',
        isPublic: true,
      },
    }),
    prisma.systemSetting.upsert({
      where: { key: 'low_stock_alert_enabled' },
      update: {},
      create: {
        key: 'low_stock_alert_enabled',
        value: 'true',
        type: 'BOOLEAN',
        group: 'INVENTORY',
        isPublic: false,
      },
    }),
  ]);

  console.log(`✅ ${settings.length} settings created`);

  // ==========================================
  // Summary
  // ==========================================
  console.log('\n📊 Database Summary:');
  console.log('='.repeat(50));
  console.log(`👤 Admins: ${await prisma.admin.count()}`);
  console.log(`📁 Categories: ${await prisma.category.count()}`);
  console.log(`📦 Products: ${await prisma.product.count()}`);
  console.log(`🖼️  Product Images: ${await prisma.productImage.count()}`);
  console.log(`👥 Customers: ${await prisma.customer.count()}`);
  console.log(`🛒 Orders: ${await prisma.order.count()}`);
  console.log(`📝 Order Items: ${await prisma.orderItem.count()}`);
  console.log(`⚙️  Settings: ${await prisma.systemSetting.count()}`);
  console.log('='.repeat(50));

  console.log('\n🎉 E-Commerce Management System seeding completed!\n');
  console.log('🔑 Login Credentials:');
  console.log('━'.repeat(50));
  console.log('Super Admin:');
  console.log('  Email: superadmin@ecommerce.com');
  console.log('  Password: Admin123!');
  console.log('  Role: SUPER_ADMIN');
  console.log('\nAdmin:');
  console.log('  Email: admin@ecommerce.com');
  console.log('  Password: Admin123!');
  console.log('  Role: ADMIN');
  console.log('\nManager:');
  console.log('  Email: manager@ecommerce.com');
  console.log('  Password: Admin123!');
  console.log('  Role: MANAGER');
  console.log('━'.repeat(50));
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
