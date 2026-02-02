# 🔐 Role Based Dashboard Application (React + TypeScript)

A modern **role-based dashboard web application** built using **React, TypeScript, Tailwind CSS**, and **Framer Motion**.  
This project focuses on **frontend architecture**, **role-based access control**, **protected routing**, and **state management using React Context API**.

---

## 🚀 Features

- 🔑 **Role-Based Access Control**
  - **Admin** → Access to all pages
  - **Normal User** → Limited access (2 pages)
- 🛡 **Protected Routes**
  - Unauthorized access redirects to **Unauthorized Page**
- ⏳ **Basic Token-Based Authentication**
  - Custom JWT-like token generation (`role + currentDate`)
  - Token expires after **24 hours**
- 🌗 **Dark & Light Mode**
  - Theme preference stored in `localStorage`
- 📦 **Global State Management**
  - Implemented using **React Context API**
  - Redux-like behavior using React built-in features
- 📄 **Pages**
  - Login
  - Dashboard
  - Profile
  - Settings
  - Analytics
  - Unauthorized
  - 404 Not Found

---

## 🧠 Tech Stack

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Radix UI**
- **Vite**

---

## 📁 Folder Structure

```

src/
├── components/
│ ├── ui/
│ ├── DashboardLayout.tsx
│ └── ProtectedRoute.tsx
│
├── contexts/
│ ├── AuthContext.tsx
│ └── ThemeContext.tsx
│
├── hooks/
├── lib/
│
├── pages/
│ ├── LoginPage.tsx
│ ├── DashboardPage.tsx
│ ├── ProfilePage.tsx
│ ├── SettingsPage.tsx
│ ├── AnalyticsPage.tsx
│ ├── UnauthorizedPage.tsx
│ └── NotFound.tsx
│
├── types/
│ └── auth.ts
│
├── App.tsx
├── main.tsx
|── index.css

```

---

## 🛡️ Types

```ts
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthToken {
  token: string;
  expiresAt: number;
  user: User;
}
```

---

## 👤 Authentication

- Auth data is stored in localStorage
- Token expires automatically after 24 hours
- Accessing restricted routes redirects to Unauthorized Page

### 🔒 Authorization Logic

- **Admin**
    - Dashboard
    - Profile
    - Settings
    - Analytics

- **Normal User**
    - Dashboard
    - Profile

---

## 📊 Dashboard Data

- Static UI widgets and analytics cards
- API data fetched using async/await

```ts
https://jsonplaceholder.typicode.com/posts?_limit=5
```

- **Used to demonstrate,** 
    - API integration
    - Async data handling
    - Side effects in React

---

## ❗ Notes

- This project uses basic authentication logic
- Not intended for production use
- Created for learning & frontend interview preparation

---

## ♻️ Clone Repo

```
- git clone https://github.com/Coding1610/Anedya_Frontend_Task.git
```
- npm i
- npm run dev

---
