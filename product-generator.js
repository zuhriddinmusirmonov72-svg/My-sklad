// MAHSULOT GENERATOR - 500 TA MAHSULOT YARATISH

const fs = require('fs');

// Mahsulot kategoriyalari
const categories = {
  shokolad: {
    brands: ['Snickers', 'Mars', 'Twix', 'Bounty', 'Kit Kat', 'Milka', 'Alpen Gold', 'Kinder', 'Toblerone', 'Ferrero Rocher', 'Lindt', 'Ritter Sport'],
    variants: ['Classic', 'Hazelnut', 'Caramel', 'Oreo', 'Strawberry', 'Dark', 'White', 'Almond', 'Peanut', 'Crispy'],
    weights: [30, 40, 45, 50, 60, 80, 90, 95, 100, 150, 200],
    packQuantities: [12, 18, 20, 24, 30, 36, 40, 48],
    priceRange: [0.50, 3.00]
  },
  ichimlik: {
    brands: ['Coca Cola', 'Pepsi', 'Fanta', 'Sprite', '7UP', 'Mirinda', 'Schweppes', 'Dr Pepper'],
    variants: ['Classic', 'Zero', 'Max', 'Light', 'Cherry', 'Vanilla', 'Lemon', 'Orange', 'Grape'],
    weights: [250, 330, 500, 1000, 1500, 2000],
    packQuantities: [12, 24, 36],
    priceRange: [0.40, 2.50]
  },
  energetik: {
    brands: ['Red Bull', 'Monster', 'Burn', 'Adrenaline Rush', 'Rockstar', 'Battery'],
    variants: ['Original', 'Sugar Free', 'Tropical', 'Ultra', 'Zero', 'Green', 'Blue'],
    weights: [250, 330, 500],
    packQuantities: [12, 24],
    priceRange: [2.00, 3.50]
  },
  suv: {
    brands: ['Aqua', 'Nestle Pure Life', 'Evian', 'Bon Aqua', 'Vittel', 'Perrier', 'San Pellegrino'],
    variants: ['Still', 'Sparkling', 'Lemon', 'Mint'],
    weights: [330, 500, 1000, 1500, 5000],
    packQuantities: [6, 12, 24, 36],
    priceRange: [0.30, 2.00]
  },
  chips: {
    brands: ['Lay\'s', 'Pringles', 'Doritos', 'Cheetos', 'Ruffles', 'Kettle'],
    variants: ['Classic', 'Sour Cream', 'BBQ', 'Cheese', 'Salt & Vinegar', 'Paprika', 'Original'],
    weights: [40, 50, 80, 100, 150, 165, 200],
    packQuantities: [12, 24, 36, 48],
    priceRange: [0.60, 3.00]
  },
  konfet: {
    brands: ['Haribo', 'Skittles', 'M&M\'s', 'Mentos', 'Tic Tac', 'Chupa Chups', 'Orbit'],
    variants: ['Original', 'Sour', 'Tropical', 'Berry', 'Mint', 'Fruit', 'Cola'],
    weights: [12, 18, 30, 38, 45, 55, 100, 150],
    packQuantities: [24, 36, 40, 60, 100],
    priceRange: [0.30, 2.00]
  },
  pechene: {
    brands: ['Oreo', 'Chips Ahoy', 'Digestive', 'Prince', 'Jubilee', 'Rich Tea'],
    variants: ['Original', 'Double', 'Chocolate', 'Vanilla', 'Strawberry', 'Peanut Butter'],
    weights: [154, 180, 200, 250, 300],
    packQuantities: [12, 16, 20, 24],
    priceRange: [1.00, 3.50]
  },
  muzqaymoq: {
    brands: ['Magnum', 'Cornetto', 'Snickers Ice', 'Twix Ice', 'Bounty Ice', 'Ben & Jerry\'s'],
    variants: ['Classic', 'Almond', 'White', 'Caramel', 'Vanilla', 'Chocolate'],
    weights: [50, 70, 90, 110, 120, 150, 465],
    packQuantities: [6, 12, 18, 20, 24],
    priceRange: [1.50, 5.00]
  }
};

// Random raqam olish
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random element olish
function getRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

// Random price
function getRandomPrice(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

// Mahsulot yaratish
function generateProduct(id, category, categoryData) {
  const brand = getRandomElement(categoryData.brands);
  const variant = getRandomElement(categoryData.variants);
  const weight = getRandomElement(categoryData.weights);
  const packQuantity = getRandomElement(categoryData.packQuantities);
  const price = parseFloat(getRandomPrice(categoryData.priceRange[0], categoryData.priceRange[1]));
  const stock = getRandomInt(100, 1000);
  
  const name = `${brand} ${variant}`;
  const image = `https://via.placeholder.com/150/${getRandomInt(100000, 999999).toString(16).slice(0,6)}/FFFFFF?text=${encodeURIComponent(name)}`;
  
  return {
    id,
    name,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    weight,
    packQuantity,
    price,
    stock,
    image
  };
}

// 500 ta mahsulot yaratish
function generate500Products() {
  const products = [];
  let id = 1;
  
  const categoryKeys = Object.keys(categories);
  const productsPerCategory = Math.ceil(500 / categoryKeys.length);
  
  categoryKeys.forEach(categoryKey => {
    const categoryData = categories[categoryKey];
    
    for (let i = 0; i < productsPerCategory && id <= 500; i++) {
      products.push(generateProduct(id, categoryKey, categoryData));
      id++;
    }
  });
  
  return { products: products.slice(0, 500) };
}

// Faylga saqlash
const data = generate500Products();
fs.writeFileSync('generated-products-500.json', JSON.stringify(data, null, 2), 'utf-8');

console.log('✅ 500 ta mahsulot yaratildi!');
console.log('📁 Fayl: generated-products-500.json');
console.log(`📊 Jami: ${data.products.length} ta mahsulot`);

// Kategoriya bo'yicha statistika
const stats = {};
data.products.forEach(p => {
  stats[p.category] = (stats[p.category] || 0) + 1;
});

console.log('\n📋 Kategoriya statistikasi:');
Object.entries(stats).forEach(([cat, count]) => {
  console.log(`   ${cat}: ${count} ta`);
});
