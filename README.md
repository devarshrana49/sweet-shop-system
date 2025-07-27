

<!-- # Sweet Shop Management System

A full-stack web application for managing a sweet shop inventory, built with Test-Driven Development (TDD) principles.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Sweet Management**: Add, view, update, and delete sweets
- **Inventory Control**: Purchase sweets (decreases quantity) and restock (admin)
- **Search & Filter**: Find sweets by name, category, or price range
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Backend
- Node.js
- Express.js
- SQLite3 (Database)
- JWT (Authentication)
- bcryptjs (Password Hashing)
- Jest & Supertest (Testing)

### Frontend
- React.js
- Axios (API calls)
- CSS3 (Styling)

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Backend Setup -->


Sweet Shop Management System
A full-stack web application for managing a sweet shop inventory, built from the ground up using Test-Driven Development (TDD) principles. This project features a complete backend API and a functional React frontend.

Screenshots
(It's highly recommended to add screenshots of your application here. For example:)

Login Page:

Main Dashboard:

Features
User Authentication: Secure user registration and login system using JWT tokens.

Sweet Management: A dashboard to view, add, and search for sweets.

Inventory Control: Purchase sweets (which decreases the available quantity).

TDD Foundation: The backend was built following a strict Test-First approach.

RESTful API: A well-structured API for managing users and sweets.

Tech Stack
Backend
Runtime: Node.js

Framework: Express.js

Database: SQLite3

Authentication: JSON Web Tokens (JWT)

Password Security: bcryptjs for hashing

Testing: Jest & Supertest

Frontend
Library: React.js

API Communication: Axios

Styling: Inline CSS & App.css

Installation & Setup
Prerequisites
Node.js (v16 or higher)

npm (comes with Node.js)

Git

1. Backend Setup
First, get the server running.

# Navigate to the backend folder
cd backend

# Install all required packages
npm install

# Start the development server
npm run dev

The backend will be running on http://localhost:5000.

2. Frontend Setup
In a separate terminal, get the user interface running.

# Navigate to the frontend folder
cd frontend

# Install all required packages
npm install

# Start the React application
npm start

The frontend will open automatically on http://localhost:3000.

API Endpoints
The following API endpoints were created and tested.

Authentication
POST /api/auth/register - Register a new user.

POST /api/auth/login - Log in an existing user.

Sweets (Protected Routes)
GET /api/sweets - Get a list of all sweets.

GET /api/sweets/search - Search for sweets.

POST /api/sweets - Add a new sweet to the inventory.

PUT /api/sweets/:id - Update an existing sweet.

DELETE /api/sweets/:id - Delete a sweet.

POST /api/sweets/:id/purchase - Purchase a sweet, decreasing its quantity.

POST /api/sweets/:id/restock - Restock a sweet, increasing its quantity.

Testing
The backend has a full suite of tests built with Jest and Supertest.

To run the tests:

# Navigate to the backend folder
cd backend

# Run the test suite
npm test

My AI Usage
AI Tool Used
Gemini (by Google): I used Gemini as an interactive, conversational guide throughout the entire project.

How I Used AI
My interaction with Gemini was like working with an experienced teacher who guided me step-by-step.

Guided Learning & Scaffolding: I followed a structured tutorial provided by Gemini. For each step, it gave me the code and a simple English explanation of what the code did and why it was necessary. This helped me build the application piece by piece, from setting up the project structure to final deployment preparation.

Error Diagnosis & Debugging: When I encountered errors, I pasted the exact error messages into the chat. Gemini was able to:

Instantly identify the PowerShell Execution Policy issue on Windows and provide the exact command to fix it.

Diagnose the SQLITE_CONSTRAINT error during testing, explain that it was caused by tests not cleaning up after themselves, and provide the correct code (beforeEach) to fix it, teaching me about test independence.

Conceptual Understanding: Gemini explained key development concepts in simple terms as they came up, such as Test-Driven Development (TDD), the purpose of a README.md file, the role of each backend folder (controllers, services, etc.), and what "deployment" means.

Reflection
Using an AI assistant like Gemini was incredibly effective. It dramatically sped up the development process by providing immediate, context-aware help for errors that could have taken a long time to solve alone. More importantly, it acted as a tutor, ensuring I understood the why behind the code, not just the what. This collaborative approach allowed me to build a complex application while learning foundational software engineering principles.

Future Improvements
User Roles: Differentiate between 'Admin' and 'Customer' roles, giving admins special privileges like adding/deleting sweets.

Shopping Cart: Implement a full shopping cart feature for purchasing multiple sweets at once.

UI/UX Enhancements: Replace inline styles with a dedicated CSS framework like Tailwind CSS for a more professional look and feel.

Payment Gateway: Integrate a service like Stripe or PayPal to handle mock payments.
 