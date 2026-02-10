PROJECT OVERVIEW
================

This repository contains a full-stack "courses" application with:
- Frontend: React (CRA via CRACO) with Tailwind + Framer Motion.
- Backend: Node.js + Express + MongoDB (Mongoose) with JWT auth, role-based access control, and course management.

FOLDER STRUCTURE
----------------
- Frontend/  : React app (marketing site, auth, dashboards)
- backend/   : Express API server (auth, protected routes, courses)


FRONTEND DETAILS (Frontend/)
----------------------------
Tech stack:
- React 19, react-router-dom 7
- Tailwind CSS + tailwindcss-animate
- Framer Motion for animations
- Axios for API calls
- CRACO for configuration

Routing:
- Public marketing pages: /, /features, /download, /premium, /resources, /about, /faq, etc.
- Auth pages: /signup, /signin
- Role-protected pages:
  - /admin  -> admin dashboard (ProtectedRoute)
  - /dashboard -> client dashboard (ProtectedRoute)

Auth flow:
- AuthContext manages login, signup, Google auth, logout, and password setup.
- Axios base URL is set via REACT_APP_API_URL environment variable with cookies enabled.
- ProtectedRoute redirects unauthenticated users to /signin.
- PublicRoute redirects authenticated users to role-based home.

UI/UX:
- Home page is a large animated marketing page using Framer Motion + Tailwind.
- Multiple static pages exist under Frontend/src/pages/.


BACKEND DETAILS (backend/)
--------------------------
Tech stack:
- Express 5
- MongoDB via Mongoose
- JWT auth with HTTP-only cookies
- bcryptjs for password hashing
- Google OAuth support
- Cloudinary + Multer for file uploads (service and middleware present)

Core routes:
- /api/auth
  - POST /signup
  - POST /login
  - POST /logout
  - POST /google/login
  - POST /google/signup
  - POST /set-password (protected)
  - POST /change-password (protected)

- /api/protected
  - GET /me (auth required)
  - GET /admin-dashboard (admin only)
  - GET /client-dashboard (client only)

- /api/courses
  - GET /get/courses (public, published courses)
  - GET /:id (public, course by id)
  - POST /create-course (admin only)
  - PUT /:id/edit (admin only)
  - DELETE /:id/delete (admin only)

Models:
- User (auth, profile, role, Google login fields)
- Course (curriculum, pricing, media, status, createdBy)
- Order (course purchases)

Infrastructure:
- MongoDB connection uses MONGODB_URL from .env.
- JWT_SECRET required for token generation.
- Cloudinary config via environment variables.


WHAT'S DONE
-----------
- Frontend marketing site with animated homepage and multiple static pages.
- Frontend auth flow wired to backend (signup/login/google).
- Role-based routing (ProtectedRoute + PublicRoute).
- Backend auth system (JWT, cookies, Google OAuth, password setup).
- Backend course CRUD for admins + public listing.
- MongoDB models for users, courses, orders.
- Upload service (Cloudinary + Multer) available for media.


WHAT'S PENDING / NEEDS FIXING
-----------------------------
1) Orders routes not wired:
   - order.controller.js exists but no /api/orders route is mounted in backend/index.js.

2) Incorrect imports in order.controller.js:
   - It imports from ../models/... but models live in ../model/ (singular).

3) Route path mismatch:
   - backend/index.js health check lists /api/courses and /api/courses/:id,
     but actual routes are /api/courses/get/courses and /api/courses/:id.

4) Role mismatch between auth logic and schema:
   - auth.controller allows admin/advocate/client/paralegal
   - user.model only allows admin/client

5) Unused/partial features:
   - Upload middleware/service present but no route uses it.
   - Order/payment flow is defined but not exposed.
   - Some role-based dashboards (advocate/paralegal) are commented out on frontend.


NEXT STEPS (SUGGESTED)
----------------------
1) Add orders routes and mount them in backend/index.js.
2) Fix order.controller.js imports to use ../model.
3) Align course routes with health check (or update health check docs).
4) Align user roles across auth controller, schema, and frontend routes.
5) Add missing upload endpoints if video/thumbnail upload is required.
6) Decide which dashboards are active and remove unused routes/components.


ENVIRONMENT VARIABLES (backend/.env)
------------------------------------
Required:
- MONGODB_URL
- JWT_SECRET
- GOOGLE_CLIENT_ID (for Google OAuth)
- CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET (for Cloudinary)

