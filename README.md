# 📘 HELP STUDY ABROAD – Frontend Technical Assessment

> A fully functional frontend web application built using **Next.js**, **Material UI**, **Zustand**, **NextAuth**, and the **DummyJSON API**.

This project demonstrates authentication, protected routes, user listing, product listing, product details, pagination, search, filtering, caching, and a responsive UI.

---

## 🚀 Tech Stack

| Feature | Technology |
| :--- | :--- |
| **Framework** | Next.js (JavaScript) |
| **UI Library** | Material UI (MUI) |
| **State Management** | Zustand |
| **Authentication** | NextAuth (Credentials Provider) |
| **APIs** | DummyJSON REST API |
| **Routing** | Next.js Pages Router |
| **Persistence** | localStorage + Zustand Caching |

---

## 📦 Features

### 🔐 Authentication
* **Login Integration:** Uses DummyJSON Auth API (`POST https://dummyjson.com/auth/login`).
* **Provider:** NextAuth Credentials Provider.
* **State:** Stores token and user data in Zustand with persistence.
* **Security:** Protected routes prevent access to the dashboard/users/products without a valid session.

### 👥 Users Module
* **Route:** `/users` & `/users/[id]`
* **List View:**
    * Fetch users (`GET /users?limit=10&skip=0`)
    * Search functionality (`GET /users/search?q=...`)
    * Server-side Pagination (Limit + Skip)
    * MUI Responsive Table/Cards showing Name, Email, Phone, Gender, Company.
* **Detail View:**
    * Fetch single user (`GET /users/{id}`)
    * Clean layout with a "Back to Users" navigation link.

### 🛒 Products Module
* **Route:** `/products` & `/products/[id]`
* **List View:**
    * Fetch products (`GET /products?limit=10&skip=0`)
    * Search products (`GET /products/search?q=...`)
    * **Category Filter:** (`GET /products/category/{category}`)
    * **Layout:** Custom 4-column equal-grid layout.
* **Detail View:**
    * Fetch product (`GET /products/{id}`)
    * **UI:** Image carousel, Description, Brand, Rating, Price, Stock status.

---

## 🧠 State Management (Zustand)

We chose **Zustand** for this project to handle global state.

* **Scope:** Authentication, Products list, Search query, Pagination state, Categories, and Product details.
* **Caching:** Implemented client-side caching using a `cache[key]` pattern to minimize API calls.

**Why Zustand?**
* ✅ Lightweight alternative to Redux.
* ✅ Zero boilerplate.
* ✅ Built-in async function support.
* ✅ Simple selector-based reactivity to prevent unnecessary re-renders.

---

## ⚡ Performance Optimizations

* **API-level Pagination:** Uses `limit` and `skip` to load data in chunks.
* **Caching:** Zustand store prevents refetching data that has already been loaded.
* **Debouncing:** Search inputs are debounced to reduce API load.
* **Memoization:** Uses `React.memo` and pure components to minimize re-renders.

---

## 🎨 UI / UX

* **Material UI:** Fully styled components.
* **Responsive:** Auto-adjusting grid layouts for Mobile, Tablet, and Desktop.
* **Visuals:** Clean typography, consistent spacing, and an image carousel for product previews.

---

## 📁 Project Structure

```text
/help-study-abroad-frontend
├── /components          # Reusable UI components
│   ├── Layout.jsx
│   ├── ProductCard.jsx
│   ├── ImageCarousel.jsx
│   └── ProtectedRoute.jsx
├── /pages               # Next.js Pages (Routes)
│   ├── /auth
│   │   ├── login.jsx
│   │   └── signup.jsx
│   ├── /users
│   │   ├── index.jsx
│   │   └── [id].jsx
│   ├── /products
│   │   ├── index.jsx
│   │   └── [id].jsx
│   ├── _app.js
│   └── index.js
├── /stores              # Zustand Stores (State & Caching)
│   ├── useAuthStore.js
│   ├── useProductsStore.js
│   └── useUsersStore.js
├── /utils               # Helper functions
│   └── api.js
└── ...


## 🛠 Installation & Setup

Follow these steps to set up the project locally.

**1️⃣ Clone the repository**
```bash

git clone [https://github.com/Akmourya24/Technical-Assessment.git]

cd help-study-abroad

Install dependenciesBashnpm install
Configure Environmen
t 
NEXTAUTH_URL=http://localhost:3000

Run in Development ModeBashnpm 
run dev


🔑 Demo CredentialsAccess the application using these test 

Demo Credentials:

Username: emilys
Password: emilyspass


🧑‍💻 AuthorAlok MouryaFrontend Developer • React • Next.js