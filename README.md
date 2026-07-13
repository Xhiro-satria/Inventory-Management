# 📦 Inventory Management System

Sistem Inventory Management berbasis web yang dikembangkan menggunakan **React**, **Express.js**, **Prisma ORM**, dan **PostgreSQL**. Aplikasi ini membantu perusahaan atau toko dalam mengelola kategori, produk, stok barang, transaksi stok masuk/keluar, serta manajemen pengguna dengan sistem autentikasi dan otorisasi berbasis role.

---

# ✨ Fitur Utama

## 🔐 Authentication

* Login menggunakan JWT
* Register akun baru
* Logout
* Protected Route
* Role Based Access Control (Admin & Staff)

---

## 📂 Category Management

* Menambahkan kategori
* Mengubah kategori
* Menghapus kategori
* Melihat seluruh kategori

---

## 📦 Product Management

* Menambahkan produk
* Upload gambar produk
* Mengubah data produk
* Menghapus produk
* Detail produk
* Search produk berdasarkan:

  * Nama
  * SKU
  * Kategori

---

## 📊 Inventory Management

### Stock In

* Menambah stok barang
* Menyimpan histori transaksi

### Stock Out

* Mengurangi stok barang
* Validasi stok tidak boleh kurang dari jumlah yang diminta

### Transaction History

* Riwayat seluruh transaksi
* Search transaksi

---

## 📄 Export

* Export seluruh transaksi ke file Excel (.xlsx)

---

## 📈 Dashboard

Menampilkan ringkasan data berupa:

* Total Produk
* Total Kategori
* Total User
* Total Stok
* Total Transaksi
* Stock In Hari Ini
* Stock Out Hari Ini
* Produk Terbaru
* Produk dengan stok menipis

---

# 🛠️ Tech Stack

## Frontend

* React
* TypeScript
* React Router DOM
* React Hook Form
* Zod
* Axios
* Tailwind CSS
* React Hot Toast
* Lucide React

---

## Backend

* Express.js
* TypeScript
* Prisma ORM
* JWT Authentication
* Bcrypt
* Multer
* Zod Validation
* XLSX

---

## Database

* PostgreSQL

---

# 📁 Struktur Project

```text
Inventory-Management-System
│
├── backend
│   ├── prisma
│   ├── src
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── routes
│   │   ├── services
│   │   ├── validators
│   │   ├── lib
│   │   └── server.ts
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── router
│   │   ├── validations
│   │   └── types
│   └── package.json
│
└── README.md
```

---

# 🔑 Role User

## Admin

Memiliki akses penuh terhadap sistem.

Hak akses:

* Dashboard
* User Management
* Category Management
* Product Management
* Inventory
* Transaction History

---

## Staff

Hak akses terbatas.

Dapat:

* Login
* Melihat Dashboard
* Melakukan Stock In
* Melakukan Stock Out
* Melihat Riwayat Transaksi
* Melihat dan mengubah profil sendiri

---

# 🚀 Cara Instalasi

## 1. Clone Repository

```bash
git clone https://github.com/username/inventory-management-system.git
```

Masuk ke folder project.

```bash
cd inventory-management-system
```

---

## 2. Install Backend

Masuk ke folder backend.

```bash
cd backend
```

Install dependency.

```bash
npm install
```

---

## 3. Install Frontend

Buka terminal baru.

```bash
cd frontend
npm install
```

---

# 🗄️ Konfigurasi Database

Buat database MySQL.

```sql
CREATE DATABASE inventory_db;
```

---

# 🔧 Konfigurasi Environment Backend

Buat file `.env` pada folder backend.

```env
DATABASE_URL="mysql://root:password@localhost:3306/inventory_db"

JWT_SECRET=your_jwt_secret

PORT=3000
```

Ganti:

* `root`
* `password`
* `inventory_db`

sesuai konfigurasi MySQL milik Anda.

---

# 🧬 Jalankan Prisma

Generate Prisma Client.

```bash
npx prisma generate
```

Migrasi database.

```bash
npx prisma migrate dev
```

Jika database sudah memiliki migration sebelumnya, gunakan:

```bash
npx prisma migrate deploy
```

---

# ▶️ Menjalankan Backend

```bash
npm run dev
```

Server berjalan di:

```text
http://localhost:3000
```

---

# 🎨 Konfigurasi Frontend

Buat file `.env` pada folder frontend.

```env
VITE_API_URL=http://localhost:3000/api
```

---

# ▶️ Menjalankan Frontend

```bash
npm run dev
```

Frontend berjalan di:

```text
http://localhost:5173
```

---

# 📸 Upload Gambar

Seluruh gambar produk akan disimpan pada folder:

```text
backend/uploads
```

Pastikan folder tersebut memiliki izin tulis.

---

# 🔐 Authentication

Backend menggunakan JSON Web Token (JWT).

Token akan dikirim setelah login berhasil dan harus disertakan pada setiap request yang membutuhkan autentikasi.

Contoh Header:

```http
Authorization: Bearer YOUR_TOKEN
```

---

# 📦 API Endpoint

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

---

## Category

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | /api/categories     |
| POST   | /api/categories     |
| PUT    | /api/categories/:id |
| DELETE | /api/categories/:id |

---

## Product

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /api/products     |
| POST   | /api/products     |
| PUT    | /api/products/:id |
| DELETE | /api/products/:id |

---

## Inventory

| Method | Endpoint                  |
| ------ | ------------------------- |
| POST   | /api/transactions/in      |
| POST   | /api/transactions/out     |
| GET    | /api/transactions/history |
| GET    | /api/transactions/export  |

---

## User

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | /api/users          |
| PATCH  | /api/users/:id/role |
| GET    | /api/users/profile  |
| PUT    | /api/users/profile  |

---

# 📷 Tampilan Aplikasi

Disarankan menambahkan screenshot berikut:

* Login
* Register
* Dashboard
* Product
* Category
* Inventory
* User
* Profile

---

# 👨‍💻 Developer

Dikembangkan oleh **Satria** sebagai proyek pembelajaran dan portofolio dalam pengembangan aplikasi web Full Stack menggunakan React, Express, Prisma, dan MySQL.

---

# 📄 License

Project ini dibuat untuk tujuan pembelajaran dan pengembangan portofolio. Silakan digunakan, dimodifikasi, dan dikembangkan lebih lanjut dengan tetap mencantumkan atribusi kepada pengembang asli apabila dipublikasikan kembali.
