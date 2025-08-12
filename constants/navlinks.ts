import {
  House,
  BarChart4,
  Users,
  Car,
  FileText,
  Tags,
  Flag,
  MessageSquareText,
  ScrollText,
  Activity,
  Settings,
  BellRing,
  Wallet,
  PackageSearch,
  Store,
} from "lucide-react";

export const NavLinks = [
  {
    label: "Main",
    links: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: House,
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        icon: BarChart4,
      },
      {
        title: "Notifications",
        url: "/admin/notifications",
        icon: BellRing,
      },
    ],
  },
  {
    label: "User Management",
    links: [
      {
        title: "Manage Users",
        url: "/admin/users",
        icon: Users,
      },
      {
        title: "Dealers & Sellers",
        url: "/admin/dealers",
        icon: Store,
      },
    ],
  },
  {
    label: "Vehicle Management",
    links: [
      {
        title: "All Listings",
        url: "/admin/cars",
        icon: Car,
      },
      {
        title: "Pending Approvals",
        url: "/admin/cars/pending",
        icon: PackageSearch,
      },
      {
        title: "Categories & Tags",
        url: "/admin/categories",
        icon: Tags,
      },
    ],
  },
  {
    label: "Transactions",
    links: [
      {
        title: "Orders & Purchases",
        url: "/admin/orders",
        icon: FileText,
      },
      {
        title: "Payments & Payouts",
        url: "/admin/payments",
        icon: Wallet,
      },
    ],
  },
  {
    label: "Support",
    links: [
      {
        title: "Feedback & Reviews",
        url: "/admin/feedback",
        icon: MessageSquareText,
      },
      {
        title: "Reports & Flags",
        url: "/admin/reports",
        icon: Flag,
      },
    ],
  },
  {
    label: "System",
    links: [
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
      {
        title: "Audit Logs",
        url: "/admin/audit-logs",
        icon: ScrollText,
      },
      {
        title: "System Status",
        url: "/admin/system-status",
        icon: Activity,
      },
    ],
  },
];
