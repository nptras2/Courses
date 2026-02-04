import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";
import Home from "@/pages/Home";
import SignUp from "@/pages/auth/SignUp";
import SignIn from "@/pages/auth/SignIn";
import Features from "./pages/Features";
import Download from "./pages/Download";
import Premium from "./pages/Premium";
import Resources from "./pages/Resources";
import ProductivityGuideline from "./pages/ProductivityGuideline";
import About from "./pages/About";
import FAQ from "./pages/F&Q";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Press from "./pages/Press";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Security from "./pages/Security";
import Guide from "./pages/Guide";
import Templates from "./pages/Templates";
import Blog from "./pages/Blog";
import HelpCenter from "./pages/HelpCenter";
import Enterprise from "./pages/Enterprise";
import Courses from "./pages/Courses";
import AdminHome from "@/admin/AdminHome";
import AdminDashboard from "@/admin/AdminDashboard";
import AdminCourses from "@/admin/AdminCourses";
import AdminAddCourse from "@/admin/AdminAddCourse";
import AdminStudents from "@/admin/AdminStudents";
import AdminOrders from "@/admin/AdminOrders";
import AdminRevenue from "@/admin/AdminRevenue";
import AdminReports from "@/admin/AdminReports";
import AdminSecurity from "@/admin/AdminSecurity";
import AdminSettings from "@/admin/AdminSettings";
import ClientLayout from "@/client/ClientLayout";
import ClientOverview from "@/client/ClientOverview";
import ClientCourses from "@/client/ClientCourses";
import ClientEnrolled from "@/client/ClientEnrolled";
import ClientCertificates from "@/client/ClientCertificates";
import ClientSettings from "@/client/ClientSettings";
import ClientCourseDetail from "@/client/ClientCourseDetail";
 
 

function App() {
   
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={ <PublicRoute> <SignUp /> </PublicRoute> } />
      
          <Route path="/signin" element={ <PublicRoute> <SignIn /> </PublicRoute> } />

          <Route path="/features" element={<Features />} />
          <Route path="/download" element={<Download />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/productivity-guideline" element={<ProductivityGuideline />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/press" element={<Press />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/security" element={<Security />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/faq" element={<FAQ />} />
          {/* <Route path="/admin-home" element={<AdminHome />} /> */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminHome />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="courses/add" element={<AdminAddCourse />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="revenue" element={<AdminRevenue />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="security" element={<AdminSecurity />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
            
          {/* <Route path="/client-home" element={<ClientHome />} /> */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <ClientLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ClientOverview />} />
            <Route path="overview" element={<ClientOverview />} />
            <Route path="courses" element={<ClientCourses />} />
            <Route path="enrolled" element={<ClientEnrolled />} />
            <Route path="enrolled/:courseId" element={<ClientCourseDetail />} />
            <Route path="certificates" element={<ClientCertificates />} />
            <Route path="settings" element={<ClientSettings />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <Navigate to="/student/overview" replace />
              </ProtectedRoute>
            }
          />
              
          {/* <Route path="/paralegal-home" element={<ParalegalHome />} />
          <Route
            path="/paralegal"
            element={
              <ProtectedRoute allowedRoles={['paralegal']}>
                <ParalegalHome />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/advocate"
            element={
              <ProtectedRoute allowedRoles={['advocate']}>
                <AdvocateHome />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="matters" element={<MattersPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="case-summary" element={<CaseSummaryPageReact />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="billing" element={<BillingPageReact />} />
            <Route path="messages" element={<MessagesPageReact />} />
            <Route path="app-integrations" element={<AppIntegrationsPageReact />} />
            <Route path="settings" element={<AdvocateSettings />} />
            <Route index element={<Dashboard />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </div>
  );
}

export default App;
