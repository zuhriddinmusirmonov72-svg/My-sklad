const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'database.json');

// Middleware
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], credentials: true }));
app.use(express.json());

// Database functions
function readDatabase() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const defaultData = { products: [], orders: [], customerOrders: [] };
      fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    const data = JSON.parse(raw);
    if (!data.customerOrders) data.customerOrders = [];
    if (!data.orders) data.orders = [];
    if (!data.products) data.products = [];
    return data;
  } catch (error) {
    console.error('Database error:', error.message);
    return { products: [], orders: [], customerOrders: [] };
  }
}

function writeDatabase(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Write error:', error.message);
    return false;
  }
}

// Swagger spec
const swaggerSpec = {
  openapi: '3.0.0',
  info: { title: 'Admin Panel API', version: '3.0.0', description: 'Mahsulot va Buyurtmalarni Boshqarish' },
  tags: [
    { name: 'Auth', description: 'Login: admin@gmail.com / admin' },
    { name: 'Products', description: 'Mahsulotlarni boshqarish' },
    { name: 'Orders', description: 'Buyurtmalarni boshqarish' },
    { name: 'CustomerOrders', description: 'Mijoz zakaslari' },
  ],
  paths: {},
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ==================== AUTH ====================
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@gmail.com' && password === 'admin') {
    return res.json({ success: true, message: 'Kirish muvaffaqiyatli', user: { email, fullName: 'Administrator', role: 'ADMIN' } });
  }
  res.status(401).json({ success: false, message: "Noto'g'ri email yoki parol" });
});

// ==================== PRODUCTS ====================
app.get('/api/products', (req, res) => {
  try {
    const db = readDatabase();
    res.json({ success: true, data: db.products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const db = readDatabase();
    const product = db.products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ success: false, message: 'Mahsulot topilmadi' });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/products', (req, res) => {
  try {
    const db = readDatabase();
    const newProduct = {
      id: Date.now(),
      name: req.body.name,
      category: req.body.category || '',
      weight: req.body.weight,
      packQuantity: req.body.packQuantity,
      price: req.body.price,
      stock: req.body.stock,
      image: req.body.image || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.products.push(newProduct);
    writeDatabase(db);
    res.json({ success: true, data: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const db = readDatabase();
    const index = db.products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, message: 'Mahsulot topilmadi' });
    db.products[index] = { ...db.products[index], ...req.body, updatedAt: new Date().toISOString() };
    writeDatabase(db);
    res.json({ success: true, data: db.products[index] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const db = readDatabase();
    const index = db.products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, message: 'Mahsulot topilmadi' });
    const deleted = db.products.splice(index, 1);
    writeDatabase(db);
    res.json({ success: true, data: deleted[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== ORDERS ====================
app.get('/api/orders', (req, res) => {
  try {
    const db = readDatabase();
    res.json({ success: true, data: db.orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/orders/:id', (req, res) => {
  try {
    const db = readDatabase();
    const order = db.orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).json({ success: false, message: 'Buyurtma topilmadi' });
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/orders', (req, res) => {
  try {
    const db = readDatabase();
    const newOrder = {
      id: Date.now(),
      orderNumber: req.body.orderNumber || `ORD-${Date.now().toString().slice(-6)}`,
      customer: req.body.customer,
      phone: req.body.phone || '',
      date: req.body.date || new Date().toISOString(),
      status: req.body.status || "Jo'natilmagan",
      warehouse: req.body.warehouse || 'Склад',
      address: req.body.address || '',
      comment: req.body.comment || '',
      currency: req.body.currency || 'USD',
      lines: req.body.lines || [],
      isWarehousePrinted: req.body.isWarehousePrinted || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.orders.push(newOrder);
    writeDatabase(db);
    res.json({ success: true, data: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/orders/:id', (req, res) => {
  try {
    const db = readDatabase();
    const index = db.orders.findIndex(o => o.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, message: 'Buyurtma topilmadi' });
    db.orders[index] = { ...db.orders[index], ...req.body, updatedAt: new Date().toISOString() };
    writeDatabase(db);
    res.json({ success: true, data: db.orders[index] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/orders/:id', (req, res) => {
  try {
    const db = readDatabase();
    const index = db.orders.findIndex(o => o.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, message: 'Buyurtma topilmadi' });
    const deleted = db.orders.splice(index, 1);
    writeDatabase(db);
    res.json({ success: true, data: deleted[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== CUSTOMER ORDERS ====================
app.get('/api/customer-orders', (req, res) => {
  try {
    const db = readDatabase();
    res.json({ success: true, data: db.customerOrders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/customer-orders', (req, res) => {
  try {
    const db = readDatabase();
    const newOrder = {
      id: Date.now(),
      ...req.body,
      status: req.body.status || 'pending',
      createdAt: new Date().toISOString()
    };
    db.customerOrders.push(newOrder);
    writeDatabase(db);
    res.json({ success: true, data: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/customer-orders/:id', (req, res) => {
  try {
    const db = readDatabase();
    const index = db.customerOrders.findIndex(o => o.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, message: 'Zakas topilmadi' });
    db.customerOrders[index] = { ...db.customerOrders[index], ...req.body, updatedAt: new Date().toISOString() };
    writeDatabase(db);
    res.json({ success: true, data: db.customerOrders[index] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/customer-orders/:id', (req, res) => {
  try {
    const db = readDatabase();
    const index = db.customerOrders.findIndex(o => o.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, message: 'Zakas topilmadi' });
    const deleted = db.customerOrders.splice(index, 1);
    writeDatabase(db);
    res.json({ success: true, data: deleted[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== CUSTOMERS ====================
app.get('/api/customers', (req, res) => {
  try {
    const db = readDatabase();
    const uniqueCustomers = [...new Set(db.orders.map(o => o.customer).filter(Boolean))];
    res.json({ success: true, data: uniqueCustomers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/customers/search', (req, res) => {
  try {
    const db = readDatabase();
    const query = (req.query.q || '').toLowerCase();
    if (!query.trim()) return res.json({ success: true, data: [] });
    const filtered = [...new Set(db.orders.map(o => o.customer).filter(Boolean))]
      .filter(c => c.toLowerCase().includes(query))
      .slice(0, 10);
    res.json({ success: true, data: filtered });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== STATS ====================
app.get('/api/stats', (req, res) => {
  try {
    const db = readDatabase();
    res.json({
      success: true,
      data: {
        totalProducts: db.products.length,
        totalOrders: db.orders.length,
        completedOrders: db.orders.filter(o => o.status === "Jo'natilgan").length,
        pendingOrders: db.orders.filter(o => o.status === "Jo'natilmagan").length,
        canceledOrders: db.orders.filter(o => o.status === 'Bekor qilindi').length,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== HEALTH ====================
app.get('/api/health', (req, res) => {
  try {
    const db = readDatabase();
    res.json({
      success: true,
      message: 'Server ishlamoqda!',
      database: 'database.json',
      products: db.products.length,
      orders: db.orders.length,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database bilan muammo', error: err.message });
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint topilmadi' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║   Admin Panel Backend - JSON Database                 ║
║                                                       ║
║   URL:      http://localhost:${PORT}                       ║
║   Swagger:  http://localhost:${PORT}/api-docs              ║
║   Database: database.json                             ║
║                                                       ║
║   GET/POST/PUT/DELETE /api/products                   ║
║   GET/POST/PUT/DELETE /api/orders                     ║
║   GET/POST/PUT/DELETE /api/customer-orders            ║
║   GET                 /api/health                     ║
╚═══════════════════════════════════════════════════════╝
  `);
});
