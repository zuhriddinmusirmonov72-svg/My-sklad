// MAHSULOT GENERATOR - HAQIQIY RASMLAR BILAN

const fs = require('fs');

// HAQIQIY RASMLAR - Unsplash va haqiqiy mahsulot rasmlari
const realImages = {
  // SHOKOLADLAR
  'Snickers': 'https://images.unsplash.com/photo-1604373750555-e0c8c68dd0d0?w=400',
  'Mars': 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400',
  'Twix': 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400',
  'Bounty': 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=400',
  'Kit Kat': 'https://images.unsplash.com/photo-1606312619070-d48b4cdd0d59?w=400',
  'Milka': 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400',
  'Alpen Gold': 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=400',
  'Kinder': 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400',
  'Toblerone': 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400',
  'Ferrero Rocher': 'https://images.unsplash.com/photo-1548848338-d4e4e5e0b735?w=400',
  'Lindt': 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=400',
  'Ritter Sport': 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400',
  
  // ICHIMLIKLAR
  'Coca Cola': 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
  'Pepsi': 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400',
  'Fanta': 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=400',
  'Sprite': 'https://images.unsplash.com/photo-1629203849648-e155f6e8d4ea?w=400',
  '7UP': 'https://images.unsplash.com/photo-1629203849648-e155f6e8d4ea?w=400',
  'Mirinda': 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=400',
  'Schweppes': 'https://images.unsplash.com/photo-1629203849648-e155f6e8d4ea?w=400',
  'Dr Pepper': 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400',
  
  // ENERGETIK ICHIMLIKLAR
  'Red Bull': 'https://images.unsplash.com/photo-1622543925917-763c34f1f86a?w=400',
  'Monster': 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=400',
  'Burn': 'https://images.unsplash.com/photo-1622543925917-763c34f1f86a?w=400',
  'Adrenaline Rush': 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=400',
  'Rockstar': 'https://images.unsplash.com/photo-1622543925917-763c34f1f86a?w=400',
  'Battery': 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=400',
  
  // SUV
  'Aqua': 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=400',
  'Nestle Pure Life': 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=400',
  'Evian': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
  'Bon Aqua': 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=400',
  'Vittel': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
  'Perrier': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
  'San Pellegrino': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
  
  // CHIPS
  'Lay\'s': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400',
  'Pringles': 'https://images.unsplash.com/photo-1613919113640-c7ceccfb3e3e?w=400',
  'Doritos': 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=400',
  'Cheetos': 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=400',
  'Ruffles': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400',
  'Kettle': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400',
  
  // KONFETLAR
  'Haribo': 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400',
  'Skittles': 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400',
  'M&M\'s': 'https://images.unsplash.com/photo-1571506165871-ee72a35bc9d9?w=400',
  'Mentos': 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400',
  'Tic Tac': 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400',
  'Chupa Chups': 'https://images.unsplash.com/photo-1581798459219-c0f6fa8c0f0b?w=400',
  'Orbit': 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400',
  
  // PECHENELER
  'Oreo': 'https://images.unsplash.com/photo-1606312619070-d48b4cdd0d59?w=400',
  'Chips Ahoy': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
  'Digestive': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
  'Prince': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
  'Jubilee': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
  'Rich Tea': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
  
  // MUZQAYMOQ
  'Magnum': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400',
  'Cornetto': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
  'Snickers Ice': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400',
  'Twix Ice': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400',
  'Bounty Ice': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400',
  'Ben & Jerry\'s': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400'
};

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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function getRandomPrice(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function generateProduct(id, category, categoryData) {
  const brand = getRandomElement(categoryData.brands);
  const variant = getRandomElement(categoryData.variants);
  const weight = getRandomElement(categoryData.weights);
  const packQuantity = getRandomElement(categoryData.packQuantities);
  const price = parseFloat(getRandomPrice(categoryData.priceRange[0], categoryData.priceRange[1]));
  const stock = getRandomInt(100, 1000);
  
  const name = `${brand} ${variant}`;
  
  // HAQIQIY RASM OLISH
  const image = realImages[brand] || 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=400';
  
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

const data = generate500Products();
fs.writeFileSync('generated-products-500-real-images.json', JSON.stringify(data, null, 2), 'utf-8');

console.log('✅ 500 ta mahsulot yaratildi (HAQIQIY RASMLAR)!');
console.log('📁 Fayl: generated-products-500-real-images.json');
console.log(`📊 Jami: ${data.products.length} ta mahsulot`);
console.log('🖼️  Rasmlar: Unsplash dan haqiqiy mahsulot rasmlari');

const stats = {};
data.products.forEach(p => {
  stats[p.category] = (stats[p.category] || 0) + 1;
});

console.log('\n📋 Kategoriya statistikasi:');
Object.entries(stats).forEach(([cat, count]) => {
  console.log(`   ${cat}: ${count} ta`);
});
