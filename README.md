
# 🍬 Sweet Shop Management System

A full-stack inventory management system for a sweet shop, built with a Test-Driven Development (TDD) approach using modern JavaScript technologies.

Live Demo: [Frontend](https://elegant-starburst-8a8c4d.netlify.app) | [Backend API](https://sweet-shop-api-devarsh.onrender.com)  
Source Code: [GitHub Repository](https://github.com/devarshrana49/sweet-shop-system)

---

## ✅ Features

- 🔐 User Authentication with JWT
- 🍭 Manage Sweets (Add, View, Update, Delete)
- 📦 Inventory Control (Purchase & Restock)
- 🔍 Search & Filter sweets
- 💡 Fully Tested API using Jest & Supertest
- 📱 Responsive Frontend built with React + TailwindCSS

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- SQLite3
- JWT (Authentication)
- bcryptjs (Password Hashing)
- Jest & Supertest (Testing)

### Frontend
- React.js
- TailwindCSS
- Axios (for API calls)

---

## 🚀 Deployment

| Service    | URL |
|------------|-----|
| **Frontend (Netlify)** | [https://elegant-starburst-8a8c4d.netlify.app](https://elegant-starburst-8a8c4d.netlify.app) |
| **Backend (Render)**   | [https://sweet-shop-api-devarsh.onrender.com](https://sweet-shop-api-devarsh.onrender.com) |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- Git
- npm (comes with Node.js)

### 🔧 Backend Setup

```bash
cd backend
npm install
npm run dev
```

> The backend runs on `http://localhost:5000`

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

> The frontend runs on `http://localhost:3000`

---

## 📡 API Endpoints (Protected by JWT)

### 🔐 Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with JWT token

### 🍬 Sweets
- `GET /api/sweets` - List all sweets
- `GET /api/sweets/search` - Search sweets
- `POST /api/sweets` - Add a sweet
- `PUT /api/sweets/:id` - Update a sweet
- `DELETE /api/sweets/:id` - Delete a sweet
- `POST /api/sweets/:id/purchase` - Purchase a sweet
- `POST /api/sweets/:id/restock` - Restock a sweet

---

## 🧪 Test Report

All backend endpoints are tested with **Jest + Supertest**.

To run tests:

```bash
cd backend
npm test
```

✅ Green for pass  
🔴 Red for fail  
🛠 Refactored after test validation

> Visual test result screenshots are available inside the `assets/screenshots/` folder.

---

## 📸 Application Screenshots

All screenshots of the application (Login page, Dashboard, Test results, etc.) are available in the `assets/screenshots/` folder in this repository.

You can view them here:  
[assets/screenshots/](./assets/screenshots/)

---

## 🤖 My AI Usage

### AI Tool Used
**Gemini (by Google)**

### How I Used It
- **Planning**: I followed Gemini’s structured task plan, broken into backend, frontend, and finalization phases.
- **Debugging**: Whenever I hit errors (like PowerShell restrictions, test setup issues, etc.), Gemini helped solve them with real explanations and correct commands.
- **Learning**: I didn't just copy code — Gemini helped me _understand_ concepts like:
  - TDD (Test-Driven Development)
  - REST API design
  - Authentication using JWT
  - Refactoring strategies
- **Scaffolding**: The project dashboard UI, progress tracking chart, countdown timer, and README guidance were AI-assisted for clarity and motivation.

### Reflection
Gemini acted like a personal mentor, helping me stay focused, debug faster, and learn smarter. This was not just AI assistance — it was **AI collaboration**.

---

## 🔮 Future Improvements

- Role-based access (Admin vs Customer)
- Shopping Cart flow
- Payment gateway integration
- UI enhancement using Tailwind component libraries (like DaisyUI or Shadcn)
- Switch from SQLite to PostgreSQL for better scalability

---
