import { useState, useEffect } from "react";
import {
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Activity,
  UserCheck,
  Clock,
  ShieldAlert,
  AlertTriangle,
  CreditCard,
  MessageSquare,
  Ticket,
  UserPlus,
  FileText,
  BarChart2,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardList,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useData } from "../../contexts/DataContext";
import { useNavigate } from "react-router";
import type { Booking } from "../../types";

type RevenueToggle = "today" | "week" | "month";

export function Dashboard() {
  const navigate = useNavigate();
  const { bookings, serviceProviders, customers, payoutRequests, disputes } = useData();

  const [revenueToggle, setRevenueToggle] = useState<RevenueToggle>("week");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Computed metrics
  const totalUsers = customers.length + serviceProviders.length;
  const activeBookings = bookings.filter(
    (b) => b.status === "In Progress" || b.status === "Confirmed"
  ).length;
  const completedBookings = bookings.filter((b) => b.status === "Completed").length;
  const cancelledBookings = bookings.filter((b) => b.status === "Cancelled").length;
  const pendingVerifications = 47;
  const openDisputes = disputes.filter(
    (d) => d.status === "Open" || d.status === "Under Review"
  ).length;
  const totalRevenue = bookings
    .filter((b) => b.status === "Completed" && b.paymentStatus === "Paid")
    .reduce((sum, b) => sum + b.amount, 0);

  const revenueByPeriod: Record<RevenueToggle, number> = {
    today: 8300,
    week: 45200,
    month: 187500,
  };
  const revenueTrendByPeriod: Record<RevenueToggle, { delta: number; positive: boolean }> = {
    today: { delta: 12.4, positive: true },
    week: { delta: 8.7, positive: true },
    month: { delta: 3.2, positive: false },
  };

  // Formatted date
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // User growth data (last 7 days)
  const userGrowthData = [
    { day: "Mon", customers: 380, providers: 98 },
    { day: "Tue", customers: 412, providers: 102 },
    { day: "Wed", customers: 395, providers: 105 },
    { day: "Thu", customers: 430, providers: 110 },
    { day: "Fri", customers: 448, providers: 114 },
    { day: "Sat", customers: 461, providers: 117 },
    { day: "Sun", customers: customers.length, providers: serviceProviders.length },
  ];

  // Booking volume (last 7 days)
  const bookingVolumeData = [
    { day: "Mon", bookings: 234, completed: 180 },
    { day: "Tue", bookings: 267, completed: 201 },
    { day: "Wed", bookings: 251, completed: 195 },
    { day: "Thu", bookings: 289, completed: 222 },
    { day: "Fri", bookings: 302, completed: 241 },
    { day: "Sat", bookings: 318, completed: 260 },
    { day: "Sun", bookings: bookings.length, completed: completedBookings },
  ];

  // Revenue trend (last 30 days — sampled)
  const revenueTrendData = [
    { date: "Mar 1", revenue: 145, commission: 18.5 },
    { date: "Mar 3", revenue: 162, commission: 21 },
    { date: "Mar 5", revenue: 138, commission: 17.2 },
    { date: "Mar 7", revenue: 178, commission: 23.4 },
    { date: "Mar 9", revenue: 155, commission: 19.8 },
    { date: "Mar 11", revenue: 192, commission: 26.1 },
    { date: "Mar 13", revenue: 168, commission: 22.3 },
    { date: "Mar 15", revenue: 205, commission: 27.8 },
    { date: "Mar 17", revenue: 188, commission: 25.1 },
    { date: "Mar 19", revenue: 217, commission: 29.5 },
    { date: "Mar 21", revenue: 196, commission: 26.8 },
    { date: "Mar 23", revenue: 234, commission: 31.2 },
    { date: "Mar 25", revenue: 221, commission: 29.9 },
    { date: "Mar 27", revenue: 248, commission: 33.7 },
    { date: "Mar 29", revenue: totalRevenue / 1000, commission: 36.2 },
  ];

  // Alert items
  const alerts = [
    {
      id: "fraud",
      label: "Fraud Alerts",
      count: 3,
      icon: ShieldAlert,
      bg: "bg-red-50",
      border: "border-red-200",
      iconColor: "text-red-600",
      badgeBg: "bg-red-100 text-red-700",
      dot: "bg-red-500",
    },
    {
      id: "system",
      label: "System Issues",
      count: 1,
      icon: AlertTriangle,
      bg: "bg-orange-50",
      border: "border-orange-200",
      iconColor: "text-orange-500",
      badgeBg: "bg-orange-100 text-orange-700",
      dot: "bg-orange-500",
    },
    {
      id: "failed",
      label: "Failed Payments",
      count: 8,
      icon: CreditCard,
      bg: "bg-amber-50",
      border: "border-amber-200",
      iconColor: "text-amber-600",
      badgeBg: "bg-amber-100 text-amber-700",
      dot: "bg-amber-500",
    },
    {
      id: "tickets",
      label: "High Priority Tickets",
      count: 5,
      icon: Ticket,
      bg: "bg-purple-50",
      border: "border-purple-200",
      iconColor: "text-purple-600",
      badgeBg: "bg-purple-100 text-purple-700",
      dot: "bg-purple-500",
    },
  ];

  // Recent activity feed
  const activities = [
    {
      id: 1,
      type: "provider",
      icon: UserPlus,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "New provider application submitted",
      description: "CleanPro Services applied for Cleaning & Sanitation category",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "verification",
      icon: CheckCircle,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      title: "Provider verification completed",
      description: "Juan's Electrical Services — KYC approved",
      time: "14 min ago",
    },
    {
      id: 3,
      type: "dispute",
      icon: MessageSquare,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      title: "Dispute resolved",
      description: "Booking #BK-2024-018 — Ruling in favor of customer",
      time: "38 min ago",
    },
    {
      id: 4,
      type: "update",
      icon: RefreshCw,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "Platform update deployed",
      description: "ServEase v2.1 — Improved booking flow & payment processing",
      time: "1 hr ago",
    },
    {
      id: 5,
      type: "provider",
      icon: UserPlus,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "New provider application submitted",
      description: "Maria's Catering Co. applied for Food & Events category",
      time: "2 hr ago",
    },
    {
      id: 6,
      type: "verification",
      icon: CheckCircle,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      title: "Verification approved",
      description: "TechFix Solutions — Background check cleared",
      time: "3 hr ago",
    },
    {
      id: 7,
      type: "dispute",
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      title: "Dispute escalated",
      description: "Booking #BK-2024-011 — Escalated to senior review",
      time: "4 hr ago",
    },
    {
      id: 8,
      type: "update",
      icon: FileText,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      title: "Scheduled maintenance complete",
      description: "Database optimization finished — All systems operational",
      time: "6 hr ago",
    },
  ];

  // Quick actions
  const quickActions = [
    {
      label: "Verify Provider",
      description: "Review pending KYC",
      icon: UserCheck,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      action: () => navigate("/approval-queue"),
      count: pendingVerifications,
    },
    {
      label: "Review Dispute",
      description: "Open cases",
      icon: MessageSquare,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      action: () => navigate("/disputes-resolutions"),
      count: openDisputes,
    },
    {
      label: "Approve Payouts",
      description: "Pending requests",
      icon: TrendingUp,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      action: () => navigate("/payout-requests"),
      count: payoutRequests.filter((p) => p.status === "Pending").length,
    },
    {
      label: "Process Refunds",
      description: "Refund management",
      icon: RotateCcw,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      action: () => navigate("/refund-management"),
    },
    {
      label: "View Reports",
      description: "Analytics & insights",
      icon: BarChart2,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      action: () => navigate("/reports-insights"),
    },
    {
      label: "Manage Users",
      description: "Customers & providers",
      icon: Users,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      action: () => navigate("/customers"),
      count: totalUsers,
    },
  ];

  // 6 Main KPI stat cards
  const statCards = [
    {
      id: "total-users",
      title: "Total Users",
      value: totalUsers.toLocaleString(),
      sub: `${customers.length} customers · ${serviceProviders.length} providers`,
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      delta: "+12%",
      positive: true,
      sparkline: [320, 340, 355, 370, 390, 405, totalUsers],
      lineColor: "#3b82f6",
    },
    {
      id: "active-bookings",
      title: "Active Bookings",
      value: activeBookings.toString(),
      sub: "Currently in progress today",
      icon: Activity,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      delta: "+6%",
      positive: true,
      sparkline: [180, 210, 195, 240, 225, 260, activeBookings],
      lineColor: "#10b981",
    },
    {
      id: "pending-verifications",
      title: "Pending Verifications",
      value: pendingVerifications.toString(),
      sub: "Awaiting KYC review",
      icon: Clock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      delta: "+4",
      positive: false,
      sparkline: [40, 44, 48, 52, 50, 47, pendingVerifications],
      lineColor: "#f59e0b",
    },
    {
      id: "support-tickets",
      title: "Open Support Tickets",
      value: "12",
      sub: "5 high priority",
      icon: Ticket,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      delta: "+2",
      positive: false,
      sparkline: [8, 9, 11, 10, 13, 11, 12],
      lineColor: "#8b5cf6",
    },
    {
      id: "revenue",
      title: "Platform Revenue",
      value:
        revenueToggle === "today"
          ? "₱8.3K"
          : revenueToggle === "week"
          ? "₱45.2K"
          : "₱187.5K",
      sub: "Commission included",
      icon: DollarSign,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      delta: revenueTrendByPeriod[revenueToggle].positive
        ? `+${revenueTrendByPeriod[revenueToggle].delta}%`
        : `-${revenueTrendByPeriod[revenueToggle].delta}%`,
      positive: revenueTrendByPeriod[revenueToggle].positive,
      sparkline: [220, 235, 245, 260, 270, 280, revenueByPeriod[revenueToggle] / 1000],
      lineColor: "#10b981",
      isRevenue: true,
    },
    {
      id: "pending-disputes",
      title: "Pending Disputes",
      value: openDisputes.toString(),
      sub: "Needs resolution",
      icon: XCircle,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      delta: openDisputes > 2 ? "+1" : "-1",
      positive: false,
      sparkline: [8, 7, 9, 6, 7, 5, openDisputes],
      lineColor: "#ef4444",
    },
  ];

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200"><Activity className="w-3 h-3 mr-1" />In Progress</Badge>;
      case "Confirmed":
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200"><CheckCircle className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case "Pending":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-50 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
    }
  };

  return (
    <div className="space-y-7">
      {/* ── Welcome Header ─────────────────────────────────────────────── */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">{formattedDate}</p>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin 👋</h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening on ServEase today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 border-gray-200 gap-2"
            onClick={() => navigate("/reports-insights")}
          >
            <BarChart2 className="w-4 h-4" />
            View Reports
          </Button>
          <Button
            size="sm"
            className="bg-[#16A34A] hover:bg-[#15803D] text-white gap-2"
            onClick={() => navigate("/approval-queue")}
          >
            <ClipboardList className="w-4 h-4" />
            Review Queue ({pendingVerifications})
          </Button>
        </div>
      </div>

      {/* ── Alert Strip ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-center gap-4 p-4 rounded-xl border ${alert.bg} ${alert.border} cursor-pointer group hover:shadow-md transition-all`}
          >
            <div className="relative flex-shrink-0">
              <div className={`p-2.5 rounded-lg bg-white shadow-sm`}>
                <alert.icon className={`w-5 h-5 ${alert.iconColor}`} />
              </div>
              <span
                className={`absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full ${alert.dot} ring-2 ring-white animate-pulse`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 truncate">{alert.label}</p>
              <p className={`text-xl font-bold ${alert.iconColor}`}>{alert.count}</p>
            </div>
            <ChevronRight className={`w-4 h-4 ${alert.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
          </div>
        ))}
      </div>

      {/* ── Platform Statistics Cards ───────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-800">Platform Statistics</h2>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {(["today", "week", "month"] as RevenueToggle[]).map((t) => (
              <button
                key={t}
                onClick={() => setRevenueToggle(t)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all capitalize ${
                  revenueToggle === t
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {statCards.map((card) => {
            const chartData = card.sparkline.map((v, i) => ({ v, i }));
            return (
              <Card
                key={card.id}
                className="relative overflow-hidden hover:shadow-lg transition-all border border-gray-200 group"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${card.iconBg}`}>
                      <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                    <div className="w-28 h-10">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <Line
                            type="monotone"
                            dataKey="v"
                            stroke={card.lineColor}
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500 truncate mr-2">{card.sub}</p>
                    <span
                      className={`flex items-center gap-0.5 text-xs font-semibold flex-shrink-0 ${
                        card.positive ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {card.positive ? (
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5" />
                      )}
                      {card.delta}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ── Charts Section ─────────────────────────────────────────────── */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-4">Quick Stats</h2>

        {/* Row 1: User Growth + Booking Volume */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
          {/* User Growth */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold text-gray-800">
                    User Growth
                  </CardTitle>
                  <p className="text-xs text-gray-400 mt-0.5">Last 7 days · Customers & Providers</p>
                </div>
                <Badge className="bg-blue-50 text-blue-700 border-0 text-xs">+{((customers.length / 380 - 1) * 100).toFixed(1)}% this week</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }}
                  />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
                  <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="Customers" />
                  <Line type="monotone" dataKey="providers" stroke="#10b981" strokeWidth={2.5} dot={false} name="Providers" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Booking Volume */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold text-gray-800">
                    Booking Volume
                  </CardTitle>
                  <p className="text-xs text-gray-400 mt-0.5">Last 7 days · Total vs Completed</p>
                </div>
                <Badge className="bg-emerald-50 text-emerald-700 border-0 text-xs">{completedBookings} completed</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={bookingVolumeData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }}
                  />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
                  <Bar dataKey="bookings" fill="#c7d2fe" radius={[4, 4, 0, 0]} name="Total" />
                  <Bar dataKey="completed" fill="#6366f1" radius={[4, 4, 0, 0]} name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Row 2: Revenue Trend (area, full width) */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-gray-800">Revenue Trend</CardTitle>
                <p className="text-xs text-gray-400 mt-0.5">Last 30 days · Revenue & Commission (₱K)</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-50 text-emerald-700 border-0 text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  ₱{(totalRevenue / 1000).toFixed(1)}K total
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueTrendData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="commGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} unit="K" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }}
                  formatter={(v: number) => `₱${v}K`}
                />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
                <Area type="monotone" dataKey="revenue" stroke="#16A34A" strokeWidth={2.5} fill="url(#revGrad)" name="Revenue (₱K)" dot={false} />
                <Area type="monotone" dataKey="commission" stroke="#3b82f6" strokeWidth={2} fill="url(#commGrad)" name="Commission (₱K)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ── Bottom Section: Activity Feed + Quick Actions ───────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Recent Activity Feed */}
        <div className="xl:col-span-2">
          <Card className="border border-gray-200 h-full">
            <CardHeader className="pb-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold text-gray-800">Recent Activity</CardTitle>
                  <p className="text-xs text-gray-400 mt-0.5">Latest platform events</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-[#16A34A] gap-1">
                  View All <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-y-auto max-h-[420px] divide-y divide-gray-50">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <div className={`flex-shrink-0 p-2 rounded-lg ${activity.iconBg}`}>
                      <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-[#16A34A] transition-colors">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{activity.description}</p>
                    </div>
                    <span className="flex-shrink-0 text-xs text-gray-400 whitespace-nowrap mt-0.5">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Panel */}
        <div>
          <Card className="border border-gray-200 h-full">
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-sm font-semibold text-gray-800">Quick Actions</CardTitle>
              <p className="text-xs text-gray-400 mt-0.5">Common admin tasks</p>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={action.action}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#16A34A] hover:bg-[#F0FDF4] transition-all group text-left"
                >
                  <div className={`p-2.5 rounded-lg ${action.iconBg} group-hover:scale-110 transition-transform`}>
                    <action.icon className={`w-5 h-5 ${action.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-[#16A34A] transition-colors">
                      {action.label}
                    </p>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </div>
                  {action.count !== undefined && (
                    <span className="flex-shrink-0 min-w-[1.75rem] h-7 px-2 rounded-full bg-gray-100 group-hover:bg-[#DCFCE7] text-xs font-bold text-gray-700 group-hover:text-[#16A34A] flex items-center justify-center transition-colors">
                      {action.count}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#16A34A] flex-shrink-0 transition-colors" />
                </button>
              ))}

              {/* Additional Quick Stats */}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs text-gray-500">Payout requests pending</span>
                  <span className="text-xs font-bold text-amber-600">
                    {payoutRequests.filter((p) => p.status === "Pending").length}
                  </span>
                </div>
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs text-gray-500">Cancelled bookings today</span>
                  <span className="text-xs font-bold text-red-500">{cancelledBookings}</span>
                </div>
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs text-gray-500">Completion rate</span>
                  <span className="text-xs font-bold text-emerald-600">
                    {bookings.length > 0
                      ? ((completedBookings / bookings.length) * 100).toFixed(1)
                      : 0}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}