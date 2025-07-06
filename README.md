# 🛍️ Ecommerce Platform

A modern, full-stack ecommerce platform built with Next.js 14, Prisma, and Tailwind CSS.

## ✨ Features

### 🛒 Shopping Experience
- **Product Catalog** with advanced filtering and search
- **Shopping Cart** with real-time updates
- **Wishlist** functionality
- **Product Reviews** and ratings
- **Flash Sales** with countdown timers
- **Recently Viewed** products
- **Product Comparison** tool

### 👤 User Management
- **User Authentication** (Login/Register)
- **Profile Management** with address book
- **Order History** and tracking
- **Password Management**
- **Wishlist Management**

### 🎨 Modern UI/UX
- **Responsive Design** for all devices
- **Dark/Light Mode** toggle
- **Loading Skeletons** for better UX
- **Toast Notifications**
- **Advanced Search** with debouncing
- **Category Navigation**

### 🛠️ Admin Features
- **Product Management** (CRUD operations)
- **Order Management**
- **User Management**
- **Analytics Dashboard**

### 💳 Payment & Checkout
- **Multiple Payment Methods**
- **Order Tracking**
- **Shipping Information**
- **Return Policy**

## 🚀 Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui components
- **Database:** Prisma ORM with SQLite
- **Authentication:** Custom JWT-based auth
- **State Management:** React Context API
- **Package Manager:** pnpm

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Prashuu0/blog-authentication.git
cd blog-authentication
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
```

4. **Initialize database:**
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

5. **Run development server:**
```bash
pnpm dev
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js

2. **Environment Variables:**
   - Add your environment variables in Vercel dashboard
   - Set `NODE_ENV=production`

3. **Deploy:**
   - Vercel will automatically deploy on every push to main branch

### Other Platforms

- **Netlify:** Compatible with Next.js
- **Railway:** Good for full-stack apps
- **Render:** Free tier available

## 📁 Project Structure

```
ecommerce-platform/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── products/          # Product pages
│   └── ...                # Other pages
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── contexts/             # React contexts
├── lib/                  # Utility functions
├── prisma/              # Database schema
└── types/               # TypeScript types
```

## 🔧 Configuration

### Environment Variables

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### Database Schema

The project uses Prisma with the following main models:
- User
- Product
- Order
- Cart
- Wishlist
- Review

## 🎯 Key Features Explained

### Authentication System
- JWT-based authentication
- Protected routes
- User session management
- Password hashing

### Product Management
- CRUD operations for products
- Image upload support
- Category management
- Inventory tracking

### Shopping Cart
- Persistent cart storage
- Real-time updates
- Quantity management
- Price calculations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Prashant Kumar**
- GitHub: [@Prashuu0](https://github.com/Prashuu0)
- LinkedIn: [Prashant Kumar](https://linkedin.com/in/prashant-kumar-b8aa23276)

## 🚀 Live Demo

[Deploy on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/Prashuu0/blog-authentication)

---

⭐ **Star this repository if you find it helpful!**
