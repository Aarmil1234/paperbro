import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Brain,
  BarChart3,
  Target,
  FileCheck,
  BookMarked,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

export default function Sidebar() {
  const location =
    useLocation();

  const menus = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      title: "Subjects",
      icon: BookOpen,
      path: "/subjects",
    },
    {
      title: "Papers",
      icon: FileText,
      path: "/papers",
    },
    {
      title: "Analyze",
      icon: Brain,
      path: "/analyze",
    },
    // {
    //   title: "Analytics",
    //   icon: BarChart3,
    //   path: "/analytics",
    // },
    // {
    //   title: "Predictions",
    //   icon: Target,
    //   path: "/predictions",
    // },
    // {
    //   title: "Final Paper",
    //   icon: FileCheck,
    //   path: "/final-paper",
    // },
    // {
    //   title: "Answer Book",
    //   icon: BookMarked,
    //   path: "/answer-book",
    // },
  ];

  return (
    <div className="w-72 bg-white border-r min-h-screen">

      {/* Logo */}

      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">
          PaperBro
        </h1>

        <p className="text-sm text-gray-500">
          AI Exam Predictor
        </p>
      </div>

      {/* Menu */}

      <div className="p-4 space-y-2">

        {menus.map((menu) => {
          const Icon =
            menu.icon;

          const active =
            location.pathname ===
            menu.path;

          return (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition
              ${
                active
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />

              {menu.title}
            </Link>
          );
        })}
      </div>

    </div>
  );
}