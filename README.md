📘 HELP STUDY ABROAD – Frontend Technical Assessment

A fully functional frontend web application built using Next.js, Material UI, Zustand, NextAuth, and DummyJSON API.
This project demonstrates authentication, protected routes, users listing, products listing, product details, pagination, search, filtering, caching, and responsive UI.

🚀 Tech Stack
Feature	Technology
Framework	Next.js (JavaScript)
UI Library	Material UI (MUI)
State Management	Zustand
Authentication	NextAuth (Credentials Provider)
APIs	DummyJSON REST API
Routing	Next.js Pages Router
Persistence	localStorage + Zustand Caching
📦 Features
🔐 Authentication

Login using DummyJSON Auth API
POST https://dummyjson.com/auth/login

NextAuth Credentials Provider

Store token + user data in Zustand

Protected routes — cannot access dashboard without login

👥 Users Module
✔ Users List Page

Fetch users:
GET https://dummyjson.com/users?limit=10&skip=0

Search users:
GET https://dummyjson.com/users/search?q=...

Pagination (limit + skip)

MUI responsive table/cards

Shows: name, email, phone, gender, company

Route: /users

✔ Single User Page

Fetch single user:
GET https://dummyjson.com/users/{id}

Clean detail layout using MUI

“Back to Users” link

Route: /users/[id]

🛒 Products Module
✔ Products List Page

Fetch products:
GET https://dummyjson.com/products?limit=10&skip=0

Search products:
GET https://dummyjson.com/products/search?q=...

Category filter:
GET https://dummyjson.com/products/category/{category}

Custom 4 equal-column grid layout (no margins/padding)

Shows: product image, title, price, category, rating

Pagination supported

Route: /products

✔ Product Detail Page

Fetch product:
GET https://dummyjson.com/products/{id}

Image carousel

Description, brand, rating, price, stock

“Back to Products” button

Route: /products/[id]

🧠 Zustand State Management
✔ Used for:

Authentication state

Products list, search, pagination

Categories

Product details

Basic client-side caching using cache[key] pattern

✔ Why Zustand?

Lightweight alternative to Redux

Zero boilerplate

Built-in async function support

Simple selector-based reactivity

Perfect for small/medium apps

🎨 UI / UX

Fully styled with Material UI

Responsive layout for all pages

Auto-adjust grid layout

Clean typography and spacing

Image carousel for product preview

Compact cards with equal height

⚡ Performance Optimizations

API-level pagination (limit + skip)

Zustand store caching (prevents refetching)

Debounce input for search

Pure components + memo

Minimized re-renders using selectors

📁 Project Structure
/components
  Layout.jsx
  ProductCard.jsx
  ImageCarousel.jsx
  ProtectedRoute.jsx

/pages
  /auth
    login.jsx
    signup.jsx (UI only)
  /users
    index.jsx
    [id].jsx
  /products
    index.jsx
    [id].jsx
  _app.js
  index.js

/stores
  useAuthStore.js
  useProductsStore.js
  useUsersStore.js

/utils
  api.js

🛠 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/help-study-abroad-frontend.git
cd help-study-abroad-frontend

2️⃣ Install dependencies
npm install


or

yarn

3️⃣ Environment Variables

Create .env.local:

NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

4️⃣ Start development server
npm run dev


App will run at:
👉 http://localhost:3000

🔑 Demo Login Credentials (DummyJSON)

Use this for login:

username:emilys
password: emilyspass


(These are public DummyJSON test credentials.)

❗ Notes & Limitations

Signup is UI-only (DummyJSON does not support user registration).

All data is dummy test data from DummyJSON.

API responses are cached for performance but reset on refresh.

📌 What is Completed

✔ Authentication (NextAuth + Zustand)
✔ Protected routes
✔ Users list + pagination + search
✔ Single user view
✔ Products list + search + category filter + pagination
✔ Product detail page
✔ Zustand caching
✔ Responsive MUI UI
✔ Clean folder structure
✔ README included

📌 What Can Be Improved (Optional)

Dark/light theme toggle

Add “Add to Cart” functionality

Server-side rendering (SSR) for SEO

Infinite scrolling for products

🧑‍💻 Author

Alok Mourya
Frontend Developer • React • Next.js • JavaScript

❤️ Thank you for reviewing my project!

If you want, I can also create a professional GitHub description, project banner, or deployment guide.