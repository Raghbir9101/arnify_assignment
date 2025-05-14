# Full Stack Blog Platform

This project is a full stack blog platform that allows users to create, edit, and browse blogs. It features user authentication, blog management, and filtering by category and author.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Material UI, Radix UI, React Router, Axios
- **Backend:** Node.js, Express, TypeScript, MongoDB (via Mongoose), JWT Authentication, Swagger for API docs

## Project Structure

```
.
├── backend/   # Express + TypeScript API server
├── frontend/  # React + Vite + TypeScript client
└── README.md  # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

---

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env` and set your MongoDB URI and JWT secret.

3. **Run the server in development:**
   ```bash
   npm run dev
   ```
   The backend will start on `http://localhost:5000` (or as configured).

4. **API Documentation:**
   - Visit `/api-docs` for Swagger UI.

---

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run start
   ```
   The frontend will start on `http://localhost:5173` (or as configured).

---

## Features

- User authentication (signup, login)
- Create, edit, and delete blogs
- Browse and filter blogs by category and author
- Responsive UI with Material UI and Tailwind CSS
- API documentation with Swagger

---

## Scripts

### Backend

- `npm run dev` – Start backend in development mode
- `npm run build` – Build backend TypeScript
- `npm start` – Start backend from build
- `npm test` – Run backend tests

### Frontend

- `npm run start` – Start frontend in development mode
- `npm run build` – Build frontend for production
- `npm run preview` – Preview production build
- `npm run lint` – Lint frontend code

---

## License

[MIT](LICENSE) (or specify your license)

---
