// Test skripti - Buyurtma qo'shish testi
const testOrder = {
  customer: "Test Mijoz",
  phone: "998901234567",
  warehouse: "Склад",
  address: "",
  comment: "Test buyurtma",
  currency: "USD",
  lines: [
    {
      id: Date.now(),
      productId: 1783276315777,
      name: "pepsi",
      image: "",
      qty: 10,
      price: 12,
      discount: 0
    }
  ],
  isWarehousePrinted: false
};

async function testAddOrder() {
  try {
    console.log('📤 Buyurtma yuborilmoqda...');
    const response = await fetch('http://localhost:3001/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testOrder)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Muvaffaqiyatli!');
      console.log('📦 Javob:', JSON.stringify(data, null, 2));
    } else {
      console.log('❌ Xatolik:', response.status);
      console.log('Ma\'lumot:', data);
    }
  } catch (error) {
    console.log('❌ Xatolik yuz berdi:', error.message);
  }
}

testAddOrder();
