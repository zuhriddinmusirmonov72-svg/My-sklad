# 🚀 LOYIHANI ISHGA TUSHIRISH QO'LLANMA

## ✅ HOZIRDA ISHLAB TURGAN SERVISLAR

### 1️⃣ **Admin Panel (Frontend)** - React + Vite
- 🌐 **URL**: http://localhost:5174
- 📂 **Papka**: `d:\beckend\Admin`
- ⚙️ **Buyruq**: `npm run dev`

### 2️⃣ **Backend API** - Express.js
- 🌐 **URL**: http://localhost:3001
- 📚 **Swagger**: http://localhost:3001/api-docs
- 📂 **Papka**: `d:\beckend\Admin\backend`
- ⚙️ **Buyruq**: `node server.js`
- 💾 **Database**: `database.json` (birlashtirilgan)

### 3️⃣ **Swagger Backend** - NestJS
- 🌐 **URL**: http://localhost:3000
- 📚 **Swagger**: http://localhost:3000/api/docs
- 🌍 **Network**: http://172.21.248.95:3000
- 📂 **Papka**: `d:\beckend`
- ⚙️ **Buyruq**: `npm run start:dev`

---

## 📋 TERMINAL BUYRUQLARI (Qo'lda ishga tushirish)

### **Variant 1: Har bir terminal alohida**

#### Terminal 1 - Admin Panel
```cmd
cd d:\beckend\Admin
npm run dev
```

#### Terminal 2 - Backend API
```cmd
cd d:\beckend\Admin\backend
node server.js
```

#### Terminal 3 - Swagger Backend
```cmd
cd d:\beckend
npm run start:dev
```

#### Terminal 4 - Ngrok (Internet uchun)
```cmd
cd d:\beckend
ngrok http --domain=lather-shortwave-chief.ngrok-free.dev 3000
```

---

## 🎯 VARIANT 2: Bitta Bosish - .BAT Fayllar Orqali

### ✅ **ISHGA-TUSHIRISH.bat**
```
d:\beckend\ISHGA-TUSHIRISH.bat
```
**Nima qiladi:**
- Barcha 3 ta servisni avtomatik ishga tushiradi
- Har biri alohida terminalda ochiladi
- Loyiha 10 soniyada tayyor bo'ladi

### 🌍 **NGROK-ISHGA-TUSHIRISH.bat**
```
d:\beckend\NGROK-ISHGA-TUSHIRISH.bat
```
**Nima qiladi:**
- Swagger Backend'ni Internetga chiqaradi
- Ngrok tunnel ochadi
- Public URL: https://lather-shortwave-chief.ngrok-free.dev

### 🛑 **HAMMANI-TUXTATISH.bat**
```
d:\beckend\HAMMANI-TUXTATISH.bat
```
**Nima qiladi:**
- Barcha Node.js jarayonlarini to'xtatadi
- Ngrok'ni yopadi
- Portlarni bo'shatadi

---

## 🔐 LOGIN MA'LUMOTLARI

**Admin Panel uchun:**
- 📧 Email: `admin@gmail.com`
- 🔑 Parol: `admin`

---

## 📊 API ENDPOINTLAR

### Express.js Backend (Port 3001):
```
POST   /api/auth/login
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
GET    /api/orders
```

### NestJS Backend (Port 3000):
```
POST   /auth/login
GET    /api/v1/admin-products
POST   /api/v1/admin-products
PATCH  /api/v1/admin-products/:id
DELETE /api/v1/admin-products/:id
GET    /api/v1/admin-orders
POST   /api/v1/admin-orders
PATCH  /api/v1/admin-orders/:id
DELETE /api/v1/admin-orders/:id
```

---

## 💾 DATABASE

**Birlashtirilgan database:**
- 📍 Fayl: `d:\beckend\Admin\backend\database.json`
- 🔗 Ikkala backend ham shu faylni ishlatadi
- ⚠️ Har qanday o'zgarish ikkala sistemada ham ko'rinadi

---

## 🌍 INTERNETGA CHIQARISH (NGROK)

1. Avval Swagger Backend ishga tushsin (Port 3000)
2. Keyin Ngrok ishga tushiring:
```cmd
cd d:\beckend
ngrok http --domain=lather-shortwave-chief.ngrok-free.dev 3000
```
3. Public URL: https://lather-shortwave-chief.ngrok-free.dev
4. Swagger: https://lather-shortwave-chief.ngrok-free.dev/api/docs

---

## ⚠️ MUAMMOLAR VA YECHIMLAR

### ❌ "Port already in use" xatosi
**Yechim:**
```cmd
taskkill /F /IM node.exe
taskkill /F /IM ngrok.exe
```

### ❌ Admin Panel ishlamayapti
**Tekshirish:**
```cmd
cd d:\beckend\Admin
npm install
npm run dev
```

### ❌ Backend API ishlamayapti
**Tekshirish:**
```cmd
cd d:\beckend\Admin\backend
node server.js
```

### ❌ Swagger ishlamayapti
**Tekshirish:**
```cmd
cd d:\beckend
npm install
npm run start:dev
```

---

## 🎨 YANGI FUNKSIYALAR (Task 7)

### ✅ Filter Tugmasi
- "Yangi Zakas" sahifasida mavjud
- Barcha mahsulotlarni ko'rsatadi
- Kategoriya bo'yicha filterlash
- Tanlangan mahsulotlar jadvalga qo'shiladi

### ✅ Print Menu
- 3 ta variant:
  1. **Заказ на склад** - Excel formatda
  2. **Заказ покупателя** - Keyingi versiyada
  3. **Счет покупателю** - Keyingi versiyada

### ✅ Status Boshqaruvi
- "Jo'natilmagan" - Summa ko'rinmaydi
- "Jo'natilgan" - Summa ko'rinadi (Excel export qilgandan keyin)

---

## 📱 WI-FI ORQALI KIRISH

Bir xil Wi-Fi'da bo'lgan qurilmalar uchun:
- Admin Panel: http://172.21.248.95:5174
- Backend API: http://172.21.248.95:3001
- Swagger: http://172.21.248.95:3000

---

## 🎯 TEZKOR ISHGA TUSHIRISH (ENG OSON)

**1. Birinchi marta (Paketlarni o'rnatish):**
```cmd
cd d:\beckend\Admin
npm install

cd d:\beckend\Admin\backend
npm install

cd d:\beckend
npm install
```

**2. Har safar (Ishga tushirish):**
```cmd
d:\beckend\ISHGA-TUSHIRISH.bat
```

**3. To'xtatish:**
```cmd
d:\beckend\HAMMANI-TUXTATISH.bat
```

---

## 🎉 TAYYOR!

Endi loyihangiz ishlab turibdi:
- ✅ Admin Panel: http://localhost:5174
- ✅ Backend API: http://localhost:3001
- ✅ Swagger: http://localhost:3000/api/docs
- ✅ Filter va Print funksiyalari qo'shilgan
- ✅ JSX xatolari tuzatilgan

**Omad!** 🚀
