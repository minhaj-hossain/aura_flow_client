# AuraFlow Full-Stack Web Application

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-4648d4?style=for-the-badge)](https://your-live-link-placeholder.com)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

A modern, fully responsive, production-quality full-stack web application designed with consistent UI/UX principles, smooth transitions, and absolute type safety across both frontend and backend systems.

---

## 🚀 Live Demo & Repository Links

- **Live Production Link:** [https://your-live-link-placeholder.com](https://your-live-link-placeholder.com) _(Placeholder)_
- **Frontend Repository:** [https://github.com/your-username/auraflow-client](https://github.com/your-username/auraflow-client)
- **Backend Repository:** [https://github.com/your-username/auraflow-server](https://github.com/your-username/auraflow-server)

---

## 🛠️ Technology Stack

| Layer        | Technologies                                   | Key Packages Used                                          |
| :----------- | :--------------------------------------------- | :--------------------------------------------------------- |
| **Frontend** | Next.js (App Router), TypeScript, Tailwind CSS | Lucide React, Recharts, TanStack Query                     |
| **Backend**  | Node.js, Express.js, TypeScript                | Mongoose, CORS, ts-node-dev, JSON Web Tokens / Better Auth |
| **Database** | MongoDB                                        | MongoDB Atlas (Cloud Hosting)                              |

---

## ✨ Features Implemented (PRD Checklist Met)

### 1. Landing Page (Home)

- **Responsive Sticky Navbar:** Adaptive menus changing automatically based on auth state (3 routes for logged-out users; 5 routes including profile management and adding items for logged-in users).
- **Hero Section:** Visually striking block constrained to `60-70vh` showcasing interactive cards/animations and an eye-catching CTA.
- **7 Meaningful Content Sections:**
  - Features Overview
  - Interactive Categories
  - Popular Items (Live items fetched from database)
  - Platform Statistics (Using Recharts visual graphs)
  - Customer Testimonials
  - Frequently Asked Questions (FAQ Accordions)
  - Interactive Call-To-Action (CTA) Banner
- **Functional Footer:** Fully mapped Quick links, Contact/Support options, and working social handles.

### 2. Discover & Explore Engine

- **Robust Cards:** Uniform size/height visual cards with layout skeletons, loaded with real database records (no static placeholder text).
- **Search, Filter, & Sort Pipeline:** Real-time search query matching accompanied by dual-field filtering (e.g., category and price range) and sorting rules (e.g., _Newest_, _Price: Low to High_) paired with clean pagination.

### 3. Public Details Page

- Fully accessible page containing metadata grids, tabbed specifications, description blocks, and dynamic image galleries alongside related items of identical categories.

### 4. Authentication System

- Secured sign-up/login panels featuring strict validation rules, error handling boundaries, and a **Demo Login** trigger to auto-populate test credentials for reviewers.

### 5. Secure Protected Routes

- **Add Item (`/items/add`):** Interactive authenticated form using zod schema validations, complete description/pricing parameters, and loading states.
- **Manage Items (`/items/manage`):** Fully integrated interactive table interface enabling users to view details, track configurations, or dispatch secure delete requests.

### 6. Additional Pages

- **About Us:** Comprehensive details regarding the platform's architectural vision.
- **Contact Us:** Fully validated form complete with feedback status updates.

---

## 📂 Project Architecture

```text
├── auraflow-client/          # Next.js Frontend (TypeScript)
│   ├── src/
│   │   ├── app/              # App Router Pages & Layouts
│   │   ├── components/       # Reusable UI Components (Cards, Navbar, Footer, Skeletons)
│   │   ├── lib/              # API Clients, Fetch wrappers, state configurations
│   │   └── types/            # TypeScript Global Interfaces
│   ├── tailwind.config.js    # Design/Color token definitions
│   └── tsconfig.json
│
└── auraflow-server/          # Express.js Backend (TypeScript)
    ├── src/
    │   ├── config/           # Database connection & third-party initializers
    │   ├── controllers/      # Route handler logic
    │   ├── middleware/       # JWT Auth verification & route guards
    │   ├── models/           # Mongoose MongoDB schemas
    │   ├── routes/           # Express API endpoints
    │   └── server.ts         # Server entrypoint
    ├── tsconfig.json
    └── package.json
```
