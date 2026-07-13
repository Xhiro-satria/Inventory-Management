# 📦 Inventory Management System

Aplikasi **Inventory Management System** berbasis web yang dikembangkan menggunakan **React**, **Express.js**, **Prisma ORM**, dan **PostgreSQL**. Sistem ini dirancang untuk membantu pengelolaan inventaris barang mulai dari kategori, produk, transaksi stok masuk dan keluar, hingga manajemen pengguna dengan autentikasi berbasis JWT.

Proyek ini dibuat sebagai syarat tugas akhir kelas back-end code124 sekaligus implementasi konsep Full Stack Web Development menggunakan teknologi modern.

---

# ✨ Features

## 🔐 Authentication

* Login
* Register
* Logout
* JWT Authentication
* Protected Route
* Role Based Authorization (Admin & Staff)

---

## 👤 Profile

* Melihat profil pengguna

---

## 📂 Category Management

* Menambahkan kategori
* Mengubah kategori
* Menghapus kategori
* Melihat daftar kategori

---

## 📦 Product Management

* Menambahkan produk
* Upload gambar produk
* Edit produk
* Hapus produk
* Detail produk
* Search produk
* Filter berdasarkan kategori

---

## 📊 Inventory Management

### Stock In

* Menambahkan stok barang
* Mencatat histori transaksi

### Stock Out

* Mengurangi stok barang
* Validasi stok agar tidak bernilai negatif

### Transaction History

* Riwayat transaksi
* Search transaksi

---

## 📄 Export

* Export riwayat transaksi ke format **Excel (.xlsx)**

---

## 📈 Dashboard

Dashboard menampilkan informasi:

* Total Produk
* Total Kategori
* Total User
* Total Stock
* Total Transaksi
* Stock In Hari Ini
* Stock Out Hari Ini
* Produk Terbaru
* Produk dengan stok menipis

---

# 🛠 Tech Stack

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
* JWT
* Bcrypt
* Multer
* Zod Validation
* XLSX

---

## Database

* PostgreSQL

---

# 📁 Project Structure

```text
inventory-management-system
│
├── backend
│   ├── prisma
│   │   ├── migrations
│   │   └── schema.prisma
│   │
│   ├── src
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── routes
│   │   ├── services
│   │   ├── validators
│   │   ├── lib
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── uploads
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── router
│   │   ├── services
│   │   ├── types
│   │   ├── validations
│   │   └── lib
│   │
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# 🔑 User Role

## 👨‍💼 ADMIN

Admin memiliki akses penuh terhadap sistem.

Fitur yang dapat diakses:

* Dashboard
* User Management
* Category Management
* Product Management
* Inventory Management
* Transaction History
* Export Excel
* Profile

---

## 👨‍🔧 STAFF

Staff memiliki akses terbatas.

Fitur yang dapat diakses:

* Dashboard
* Inventory Management
* Transaction History
* Profile

---

# ⚠ Default User Role

Semua akun yang melakukan **Register** akan otomatis memiliki role:

```text
STAFF
```

Untuk mendapatkan akses sebagai **ADMIN**, role harus diubah secara manual menggunakan **Prisma Studio**.

Jalankan:

```bash
npx prisma studio
```

Kemudian buka:

```text
http://localhost:5555
```

Masuk ke tabel **User** lalu ubah kolom:

```text
role
```

dari

```text
STAFF
```

menjadi

```text
ADMIN
```

Simpan perubahan, kemudian login kembali menggunakan akun tersebut.

> Hal ini dilakukan agar pengguna baru tidak dapat langsung memperoleh hak akses Administrator.

---

# ⚙ Requirements

Pastikan telah menginstal:

* Node.js 20+
* PostgreSQL
* Git
* npm

---

# 🚀 Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/your-repository.git
```

Masuk ke folder project

```bash
cd your-repository
```

---

# 📦 Backend Installation

Masuk ke folder backend

```bash
cd backend
```

Install dependency

```bash
npm install
```

---

# 🎨 Frontend Installation

Buka terminal baru

```bash
cd frontend
```

Install dependency

```bash
npm install
```

---

# 🗄 Database

Buat database PostgreSQL

```sql
CREATE DATABASE inventory_db;
```

---

# 🔧 Backend Environment

Buat file

```text
backend/.env
```

Isi dengan konfigurasi berikut:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/inventory_db"

JWT_SECRET=your_secret_key

PORT=3000
```

Sesuaikan:

* username PostgreSQL
* password
* nama database

---

# 🎨 Frontend Environment

Buat file

```text
frontend/.env
```

Isi:

```env
VITE_API_URL=http://localhost:3000/api
```

---

# 🧬 Prisma

Generate Prisma Client

```bash
npx prisma generate
```

Jalankan migration

```bash
npx prisma migrate dev
```

Apabila migration sudah tersedia:

```bash
npx prisma migrate deploy
```

---

# ▶ Running Backend

```bash
npm run dev
```

Backend berjalan pada:

```text
http://localhost:3000
```

---

# ▶ Running Frontend

```bash
npm run dev
```

Frontend berjalan pada:

```text
http://localhost:5173
```

---

# 🔐 Login

Lakukan registrasi melalui halaman Register.

Kemudian login menggunakan akun yang telah dibuat.

Apabila ingin mengakses seluruh fitur administrasi, ubah role menjadi **ADMIN** menggunakan Prisma Studio.

---

# 📁 Upload Directory

Semua gambar produk akan disimpan pada folder:

```text
backend/uploads
```

Pastikan folder tersebut memiliki izin tulis.

---

# 📚 API Endpoints

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

---

## User

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | /api/users          |
| PATCH  | /api/users/:id/role |
| GET    | /api/users/profile  |
| PUT    | /api/users/profile  |

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

# 📸 Application Preview

* Login
<img width="1919" height="869" alt="image" src="https://github.com/user-attachments/assets/5f037ff2-f28b-4ad1-a274-161e981fd96f" />

* Dashboard
<img width="1916" height="870" alt="image" src="https://github.com/user-attachments/assets/73075640-e38c-43bd-905e-b35870956536" />

* Category
<img width="1919" height="864" alt="image" src="https://github.com/user-attachments/assets/6e76e650-c712-4545-a2b5-6d2d792aa993" />

* Product
  <img width="1919" height="864" alt="image" src="https://github.com/user-attachments/assets/8ce8be79-3527-4008-91c8-b5907554d195" />

* Inventory
  <img width="1919" height="870" alt="image" src="https://github.com/user-attachments/assets/4dfbccb5-e3ee-48ab-82a3-dbd2f685bfbd" />
  
* Profile
<img width="1919" height="868" alt="image" src="https://github.com/user-attachments/assets/5df8e459-4d8f-4473-b526-e8b814c86cb4" />

---

# 🚀 Future Improvements

Beberapa pengembangan yang dapat ditambahkan:

* Dashboard Chart
* Pagination
* Export PDF
* Email Notification
* Docker Support
* Unit Testing
* Dark Mode

---

# 👨‍💻 Author

**Satria**

kalo ada yg ingin ditanyakan langsung pc aja eaaa

---

# 📄 License

Project ini dibuat untuk keperluan pembelajaran dan portofolio. Silakan digunakan, dimodifikasi, dan dikembangkan lebih lanjut dengan tetap memberikan atribusi kepada pengembang apabila dipublikasikan kembali.
