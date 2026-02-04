import {
  LayoutDashboard,
  BookOpen,
  Users,
  ShoppingCart,
  IndianRupee,
  BarChart3,
  Settings,
  Shield,
  PlusCircle,
} from "lucide-react";

const adminMenu = [
  {
    section: "MAIN",
    items: [{ label: "Dashboard", icon: LayoutDashboard, path: "/admin" }],
  },
  {
    section: "COURSES",
    items: [
      { label: "All Courses", icon: BookOpen, path: "/admin/courses" },
      { label: "Add Course", icon: PlusCircle, path: "/admin/courses/add" },
    ],
  },
  {
    section: "USERS",
    items: [
      { label: "Students", icon: Users, path: "/admin/students" },
      { label: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    ],
  },
  {
    section: "FINANCE",
    items: [
      { label: "Revenue", icon: IndianRupee, path: "/admin/revenue" },
      { label: "Reports", icon: BarChart3, path: "/admin/reports" },
    ],
  },
  {
    section: "SYSTEM",
    items: [
      { label: "Security", icon: Shield, path: "/admin/security" },
      { label: "Settings", icon: Settings, path: "/admin/settings" },
    ],
  },
];

export default adminMenu;
