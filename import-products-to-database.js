// MAHSULOTLARNI DATABASE.JSON GA IMPORT QILISH

const fs = require('fs');
const path = require('path');

// Database faylini o'qish
const databasePath = path.join(__dirname, 'Admin', 'backend', 'database.json');
let database = JSON.parse(fs.readFileSync(databasePath, 'utf-8'));

// Yangi mahsulotlarni yuklash (50 ta yoki 500 ta)
const sourceFile = process.argv[2] || 'sample-products-50.json';
const newProducts = JSON.parse(fs.readFileSync(sourceFile, 'utf-8'));

console.log(`📦 Yuklanmoqda: ${sourceFile}`);
console.log(`📊 Yangi mahsulotlar: ${newProducts.products.length} ta`);
console.log(`📊 Mavjud mahsulotlar: ${database.products.length} ta`);

// ID'larni yangilash (konflikt bo'lmasligi uchun)
const maxId = database.products.length > 0 
  ? Math.max(...database.products.map(p => p.id))
  : 0;

console.log(`🔢 Oxirgi ID: ${maxId}`);
console.log(`🔢 Yangi ID boshlanishi: ${maxId + 1}`);

// Yangi mahsulotlarni qo'shish
newProducts.products.forEach((product, index) => {
  product.id = maxId + index + 1;
  database.products.push(product);
});

// Database ga yozish
fs.writeFileSync(databasePath, JSON.stringify(database, null, 2), 'utf-8');

console.log('\n✅ Import muvaffaqiyatli!');
console.log(`📁 Fayl: ${databasePath}`);
console.log(`📊 Jami mahsulotlar: ${database.products.length} ta`);

// Kategoriya statistikasi
const stats = {};
database.products.forEach(p => {
  const cat = p.category || 'Kategoriyasiz';
  stats[cat] = (stats[cat] || 0) + 1;
});

console.log('\n📋 Kategoriya statistikasi:');
Object.entries(stats)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} ta`);
  });
