# Backend Endpoints

Base URL: `https://courses-production-3bad.up.railway.app`

## Health

| Method | Path | Auth | What it does | Quick test result |
| --- | --- | --- | --- | --- |
| GET | `/` | No | API health + endpoint index | 200 OK (works) |

## Auth (`/api/auth`)

| Method | Path | Auth | What it does | Body / Notes | Quick test result |
| --- | --- | --- | --- | --- | --- |
| POST | `/api/auth/signup` | No | Create user + set cookie + return token | `{ name, email, password, role? }` role must be one of `admin, advocate, client, paralegal` | Could not confirm end-to-end without a working DB |
| POST | `/api/auth/login` | No | Login user + set cookie + return token | `{ email, password }` | Not tested (needs DB user) |
| POST | `/api/auth/logout` | No | Clears auth cookie | No body required | Not tested |
| POST | `/api/auth/google/login` | No | Google login flow | `{ credential }` | Not tested (requires external Google API/network) |
| POST | `/api/auth/google/signup` | No | Google signup flow | `{ credential }` | Not tested (requires external Google API/network) |
| POST | `/api/auth/set-password` | Yes | Set password for logged-in user | `{ password }` (token via cookie or `Authorization: Bearer <token>`) | 401 without token (expected) |
| POST | `/api/auth/change-password` | Yes | Change password for logged-in user | `{ currentPassword, newPassword }` (token via cookie or header) | 401 without token (expected) |

## Protected (`/api/protected`)

All routes below require a valid token (cookie `token` or `Authorization: Bearer <token>`).

| Method | Path | Roles | What it does | Quick test result |
| --- | --- | --- | --- | --- |
| GET | `/api/protected/me` | Any authenticated user | Returns `req.user` | 401 without token (expected) |
| GET | `/api/protected/admin-dashboard` | `admin` | Admin-only dashboard stub | 401 without token (expected) |
| GET | `/api/protected/client-dashboard` | `client` | Client-only dashboard stub | 401 without token (expected) |

## Courses (`/api/courses`)

| Method | Path | Auth | What it does | Body / Notes | Quick test result |
| --- | --- | --- | --- | --- | --- |
| GET | `/api/courses/get/courses` | No | Returns published courses | Reads from MongoDB `Course` model | Could not confirm without a working DB |
| GET | `/api/courses/:id` | No | Returns single course by id | `:id` must be a valid Mongo ObjectId | 500 on invalid id like `123` (CastError) |
| POST | `/api/courses/create-course` | Yes + Admin | Create course | `{ title, shortDescription, fullDescription, category, level, language, tags }` | 401 without token (expected) |
| PUT | `/api/courses/:id/edit` | Yes + Admin | Update course | Any updatable fields in body | 401 without token (expected) |
| DELETE | `/api/courses/:id/delete` | Yes + Admin | Delete course | No body required | 401 without token (expected) |

## Orders (`/api/orders`)

All routes below require a valid token.

| Method | Path | Auth | What it does | Body / Notes | Quick test result |
| --- | --- | --- | --- | --- | --- |
| POST | `/api/orders/buy/:courseId` | Yes | Initiate purchase | `:courseId` must be a valid course id | 401 without token (expected) |
| POST | `/api/orders/confirm-payment` | Yes | Confirm payment | See `controller/order.controller.js` for required fields | 401 without token (expected) |
| GET | `/api/orders/my-orders` | Yes | Get current user's orders | Token required | 401 without token (expected) |

## Notes / Gaps Found

- `routes/test.route.js` exists but is not mounted in `index.js`, so it is not reachable.
- The health endpoint lists user endpoints like `/api/users/my-courses`, but there is no mounted `/api/users` route in `index.js`.
- Several controllers depend on MongoDB + environment variables (for example `JWT_SECRET` and DB connection). End-to-end tests will require a running DB and valid tokens.