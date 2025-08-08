import {
  House,
  ChartArea,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  ListChecks,
  Tags,
  Flag,
  MessageSquareText,
  ScrollText,
  Activity,
  Settings,
  BellRing,
} from "lucide-react";

export const NavLinks = [
  {
    label: "Main Main",
    links: [
      {
        title: "Dashboard",
        url: "/dashboard/admin",
        icon: House,
      },
      {
        title: "Analytics",
        url: "/dashboard/admin/analytics",
        icon: ChartArea,
      },
      {
        title: "Notifications",
        url: "/dashboard/admin/notifications",
        icon: BellRing,
      },
    ],
  },
  {
    label: "User Management",
    links: [
      {
        title: "Manage users",
        url: "/dashboard/admin/users",
        icon: Users,
      },

      {
        title: "Students",
        url: "/dashboard/admin/users/students",
        icon: GraduationCap,
      },
      {
        title: "Roles and permissions",
        url: "/dashboard/admin/users-roles",
        icon: GraduationCap,
      },
    ],
  },
  {
    label: "Course Management",
    links: [
      {
        title: "Course",
        url: "/dashboard/admin/courses",
        icon: BookOpen,
      },
      {
        title: "Assignments",
        url: "/dashboard/admin/assignments",
        icon: FileText,
      },
      {
        title: "Quizzes",
        url: "/dashboard/admin/users/quizzes",
        icon: ListChecks,
      },
      {
        title: "Category & tags",
        url: "/dashboard/admin/categories",
        icon: Tags,
      },
    ],
  },
  {
    label: "Support",
    links: [
      {
        title: "Feedback & reviews",
        url: "/dashboard/admin/feedback",
        icon: MessageSquareText,
      },
      {
        title: "Report & Flags",
        url: "/dashboard/admin/reports",
        icon: Flag,
      },
    ],
  },
  {
    label: "System",
    links: [
      {
        title: "Settings",
        url: "/dashboard/admin/settings",
        icon: Settings,
      },
      {
        title: "Audit Logs",
        url: "/dashboard/admin/audit-logs",
        icon: ScrollText,
      },
      {
        title: "System status",
        url: "/dashboard/admin/system-status",
        icon: Activity,
      },
    ],
  },
];
