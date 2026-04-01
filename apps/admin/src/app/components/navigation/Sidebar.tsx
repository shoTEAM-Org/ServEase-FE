import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Package,
  LifeBuoy,
  CreditCard,
  DollarSign,
  TrendingUp,
  XCircle,
  BarChart3,
  UserPlus,
  Shield,
  Bell,
  FileText,
  PanelLeftClose,
  PanelLeft,
  Headphones,
  Truck,
  AlertCircle,
  Tag,
  Megaphone,
  Sliders,
  Lock,
  Zap,
  FilePieChart,
} from "lucide-react";
import logo from "@/assets/serveaselogo.png";

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
  end?: boolean;
  badge?: string | number;
  badgeColor?: string;
}

interface SidebarItemProps {
  item: NavItem;
  isCollapsed: boolean;
}

function SidebarItem({ item, isCollapsed }: SidebarItemProps) {
  return (
    <li>
      <NavLink
        to={item.to}
        end={item.end}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 group relative ${
            isActive
              ? "bg-[#16A34A] text-white shadow-sm"
              : "text-gray-600 hover:bg-[#F0FDF4] hover:text-[#16A34A]"
          }`
        }
        title={isCollapsed ? item.label : undefined}
      >
        {({ isActive }) => (
          <>
            <item.icon
              className={`flex-shrink-0 ${isActive ? "text-white" : ""}`}
              style={{ width: "17px", height: "17px" }}
            />
            <span
              className={`text-sm font-medium transition-all duration-300 flex-1 whitespace-nowrap ${
                isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              }`}
            >
              {item.label}
            </span>

            {/* Badge */}
            {!isCollapsed && item.badge !== undefined && (
              <span
                className={`flex-shrink-0 text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center leading-tight ${
                  isActive
                    ? "bg-white/25 text-white"
                    : item.badgeColor || "bg-gray-100 text-gray-600"
                }`}
              >
                {item.badge}
              </span>
            )}

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg pointer-events-none">
                {item.label}
                {item.badge !== undefined && (
                  <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 rounded-full text-[10px]">
                    {item.badge}
                  </span>
                )}
                <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
              </div>
            )}
          </>
        )}
      </NavLink>
    </li>
  );
}

function SectionLabel({ label, isCollapsed }: { label: string; isCollapsed: boolean }) {
  if (isCollapsed) {
    return <div className="h-px bg-gray-100 my-1 mx-2" />;
  }
  return (
    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5 px-2 pt-1">
      {label}
    </p>
  );
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const navSections: { title: string; items: NavItem[] }[] = [
    {
      title: "Main Menu",
      items: [
        { to: "/", icon: LayoutDashboard, label: "Dashboard", end: true },
        {
          to: "/approval-queue",
          icon: UserCheck,
          label: "Verifications",
          badge: 47,
          badgeColor: "bg-amber-100 text-amber-700",
        },
        { to: "/customers", icon: Users, label: "Users" },
        { to: "/bookings", icon: Package, label: "Bookings" },
        {
          to: "/disputes-resolutions",
          icon: LifeBuoy,
          label: "Disputes",
          badge: 1,
          badgeColor: "bg-red-100 text-red-600",
        },
        { to: "/reports", icon: FilePieChart, label: "Reports" },
        { to: "/reports-insights", icon: BarChart3, label: "Analytics" },
        {
          to: "/support",
          icon: Headphones,
          label: "Support",
          badge: 12,
          badgeColor: "bg-purple-100 text-purple-700",
        },
      ],
    },
    {
      title: "User Management",
      items: [
        { to: "/service-providers", icon: UserCheck, label: "Service Providers" },
        { to: "/approval-queue", icon: UserPlus, label: "Approval Queue" },
      ],
    },
    {
      title: "Operations",
      items: [
        { to: "/ongoing-services", icon: Truck, label: "Ongoing Services" },
      ],
    },
    {
      title: "Finance",
      items: [
        { to: "/transactions", icon: CreditCard, label: "Transactions" },
        { to: "/provider-earnings", icon: DollarSign, label: "Provider Earnings" },
        { to: "/payout-requests", icon: TrendingUp, label: "Payout Requests" },
        { to: "/refund-management", icon: XCircle, label: "Refund Management" },
        { to: "/failed-payments", icon: AlertCircle, label: "Failed Payments" },
      ],
    },
    {
      title: "Marketing",
      items: [
        { to: "/promo-codes", icon: Tag, label: "Promo Codes" },
        { to: "/broadcasts", icon: Megaphone, label: "Broadcasts" },
      ],
    },
    {
      title: "Settings",
      items: [
        { to: "/commission-settings", icon: Sliders, label: "Commission" },
        { to: "/admin-roles", icon: Shield, label: "Admin Roles" },
        { to: "/notification-settings", icon: Bell, label: "Notifications" },
        { to: "/security-settings", icon: Lock, label: "Security" },
        { to: "/audit-trail", icon: FileText, label: "Audit Trail" },
        { to: "/integrations", icon: Zap, label: "Integrations" },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-20 flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-[68px]" : "w-64"
      }`}
    >
      {/* Logo */}
      <div
        className={`flex items-center border-b border-gray-200 flex-shrink-0 ${
          isCollapsed ? "p-4 justify-center" : "px-5 py-4"
        }`}
      >
        {!isCollapsed ? (
          <div className="flex flex-col items-center gap-1 w-full">
            <img src={logo} alt="ServEase" className="h-8 w-auto" />
            <span className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">
              Admin Dashboard
            </span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-[#16A34A] rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-xs font-bold text-white">SE</span>
          </div>
        )}
      </div>

      {/* Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-0.5">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className={sIdx > 0 ? "mt-3" : ""}>
            <SectionLabel label={section.title} isCollapsed={isCollapsed} />
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <SidebarItem
                  key={item.to + item.label}
                  item={item}
                  isCollapsed={isCollapsed}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="flex-shrink-0 border-t border-gray-200 p-2.5">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <PanelLeft className="w-4 h-4" />
          ) : (
            <>
              <PanelLeftClose className="w-4 h-4" />
              <span className="text-xs font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="flex-shrink-0 px-3 pb-3">
          <div className="bg-gray-50 rounded-lg px-3 py-2 text-center border border-gray-100">
            <p className="text-[10px] text-gray-400 font-medium">ServEase Admin v2.0</p>
            <p className="text-[10px] text-gray-300 mt-0.5">© 2026 ServEase Platform</p>
          </div>
        </div>
      )}
    </aside>
  );
}