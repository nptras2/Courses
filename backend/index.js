import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import protectedRoute from "./routes/protected.route.js";
import coursesRoute from "./routes/courses.route.js";
import orderrouter from "./routes/order.route.js";
import testRoute from "./routes/test.route.js";
import usersRoute from "./routes/users.route.js";
import reportsRoute from "./routes/reports.route.js";
 
 
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: [
    "https://course-olive-one.vercel.app"
  ],
  credentials: true
}));


// Routes
app.use("/api/auth", authRoute);
app.use("/api/protected", protectedRoute);
app.use("/api/courses", coursesRoute);
app.use('/api/orders', orderrouter)
app.use("/api/test", testRoute);
app.use("/api/users", usersRoute);
app.use("/api/reports", reportsRoute);

 
// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Courses Backend API is running",
    version: "1.0.0",
    endpoints: {
      auth: {
        signup: "POST /api/auth/signup",
        login: "POST /api/auth/login",
        logout: "POST /api/auth/logout",
        googleAuth: "POST /api/auth/google"
      },
      protected: {
        profile: "GET /api/protected/me",
        adminDashboard: "GET /api/protected/admin-dashboard", 
        clientDashboard: "GET /api/protected/client-dashboard"
      },
      courses: {
        public: {
          getAllCourses: "GET /api/courses",
          getSingleCourse: "GET /api/courses/:id"
        },
        admin: {
          createCourse: "POST /api/courses",
          updateCourse: "PUT /api/courses/:id",
          deleteCourse: "DELETE /api/courses/:id",
          addSection: "POST /api/courses/:id/section",
          addLecture: "POST /api/courses/:id/lecture",
          uploadLectureVideo: "POST /api/courses/upload-lecture"
        }
      },
      orders: {
        buyCourse: "POST /api/orders/buy/:courseId",
        myOrders: "GET /api/orders/my-orders"
      },
      users: {
        myCourses: "GET /api/users/my-courses",
      }
    }
  });
});


// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "development" ? err : {}
  });
});

// Start Server
const server = app.listen(port, async () => {
  console.log(`✅ Server is running on: http://localhost:${port}`);
  
  // Connect to database
  try {
    await connectDb();
  } catch (error) {
    console.error("Failed to connect database:", error.message);
  }
  
   
});

// Error handlers for server
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use`);
  }
  process.exit(1);
});

 
