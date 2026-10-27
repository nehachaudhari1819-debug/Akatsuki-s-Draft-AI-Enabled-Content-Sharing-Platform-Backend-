# Akatsuki's Draft — AI-Enabled Content Sharing Platform (Backend)

REST API backend for **Akatsuki's Draft**, an AI-powered role-based content sharing and publishing platform built with Node.js, Express, MongoDB, and Google Gemini AI.

Designed to run seamlessly in local development, standard server/container environments, and as serverless functions on **Vercel**.

---

## 🚀 Features

- **Authentication & Authorization**: Secure JWT authentication, password hashing with bcrypt, and role-based access control.
- **Content Management**: Create, view, edit, and publish draft posts.
- **AI-Powered Enhancements**: Content enhancement and grammar/style refinement powered by **Google Gemini AI**.
- **Admin Management**: Dedicated admin routes for content moderation and platform control.
- **Vercel & Serverless Ready**: Configured with `vercel.json`, `api/index.js`, and connection-pooling middleware for instant, trouble-free deployment on Vercel.

---

## 📁 Project Structure

```
├── api/
│   └── index.js           # Serverless entry point for Vercel
├── config/
│   ├── db.js              # MongoDB connection (with serverless caching)
│   └── gemini.js          # Google Gemini AI client configuration
├── controllers/
│   ├── adminController.js # Admin operations
│   ├── aiController.js    # AI content improvement logic
│   ├── authController.js  # User registration, login, profile
│   └── postController.js  # Post CRUD operations
├── middlewares/
│   ├── authMiddleware.js  # JWT verification & role authorization
│   └── errorMiddleware.js # Centralized global error handling
├── models/
│   ├── Post.js            # Post / Draft schema
│   └── User.js            # User schema
├── routes/
│   ├── adminRoutes.js     # /admin endpoints
│   ├── aiRoutes.js        # /ai endpoints
│   ├── authRoutes.js      # /auth endpoints
│   └── postRoutes.js      # /posts endpoints
├── .env.example           # Example environment variables
├── .gitignore             # Git ignore rules (protects .env & node_modules)
├── package.json           # Project dependencies & scripts
├── server.js              # Main Express application
└── vercel.json            # Vercel routing configuration
```

---

## 🛠️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/akatsuki-draft?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
GEMINI_API_KEY=your_google_gemini_api_key_here
```

---

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure `.env`**:
   Copy `.env.example` to `.env` and fill in your MongoDB URI, JWT secret, and Gemini API key.

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Start in production mode**:
   ```bash
   npm start
   ```

---

## 🌐 Deploying to Vercel

This repository is pre-configured for one-click deployment on [Vercel](https://vercel.com):

1. **Push your code to GitHub** (or connect your GitHub repository).
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
3. Import this repository.
4. Keep the Framework Preset as **Other** (Root directory is `.`).
5. In **Environment Variables**, add:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random string for signing JWT tokens.
   - `GEMINI_API_KEY`: Your Google Gemini API key.
6. Click **Deploy**.

> **Note on MongoDB Atlas**: Ensure your MongoDB Atlas cluster has Network Access configured to allow connections from anywhere (`0.0.0.0/0`) since Vercel serverless function IPs are dynamic.

---

## 🔌 API Endpoints Summary

### Auth (`/auth`)
- `POST /auth/register` — Register a new account
- `POST /auth/login` — Log in and receive JWT token
- `GET /auth/me` — Get current user profile (Protected)

### Posts (`/posts`)
- `GET /posts` — Get all published posts
- `POST /posts` — Create a draft post (Protected)
- `GET /posts/:id` — Get single post by ID
- `PUT /posts/:id` — Update post (Protected, Author/Admin)
- `DELETE /posts/:id` — Delete post (Protected, Author/Admin)

### AI Content Improvement (`/ai`)
- `POST /ai/improve/:postId` — Enhance draft content using Gemini AI (Protected, Author)

### Admin (`/admin`)
- Moderation and role-based administrative routes (Protected, Admin role)
