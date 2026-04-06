"use client";

import { useState, useEffect } from "react";
import {
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Activity,
  UserCheck,
  FileCheck,
  Clock,
  Star,
  Package,
  ShieldAlert,
  AlertTriangle,
  CreditCard,
  Ticket,
  UserPlus,
  FileText,
  BarChart2,
  ChevronRight,
  ClipboardList,
  RefreshCw,
  RotateCcw,
  MessageSquare,
  AlertCircle,
  Headphones,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { KPICard } from "../../components/shared/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useData } from "../../../contexts/DataContext";
import { useRouter } from "next/navigation";
import type { Booking } from "../../../types";
import { useAuth } from "../../contexts/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { admin } = useAuth();
  const {
    dashboardStats,
    bookings,
    serviceProviders,
    customers,
    payoutRequests,
    disputes,
  } = useData();

  // ── Live clock ──────────────────────────────────────────────────
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // ── Computed metrics ─────────────────────────────────────────────
  const activeBookingsToday = bookings.filter(
    (b) => b.status === "In Progress" || b.status === "Confirmed"
  ).length;
  const completedBookings = bookings.filter((b) => b.status === "Completed").length;
  const cancelledBookings = bookings.filter((b) => b.status === "Cancelled").length;

  const totalRevenue = bookings
    .filter((b) => b.status === "Completed" && b.paymentStatus === "Paid")
    .reduce((sum, b) => sum + b.amount, 0);

  const commissionEarnings = bookings
    .filter((b) => b.status === "Completed" && b.paymentStatus === "Paid")
    .reduce((sum, b) => sum + b.commissionAmount, 0);

  const pendingApprovals = 47;
  const openSupportTickets = 12;
  const pendingPayouts = payoutRequests.filter((p) => p.status === "Pending").length;
  const openDisputes = disputes.filter((d) => d.status === "Open" || d.status === "Under Review").length;

  const activeProviders = serviceProviders.filter(
    (sp) => sp.status === "Verified" || sp.status === "Active"
  ).length;
  const pendingProviderApprovals = serviceProviders.filter(
    (sp) => sp.status === "Pending" || sp.status === "Under Review"
  ).length;
  const totalUsers = customers.length + serviceProviders.length;

  // ── Chart 1: Customers Overview — preserved exactly ─────────────
  const customerGrowthData = [
    { month: "Sep 2025", customers: 380 },
    { month: "Oct 2025", customers: 420 },
    { month: "Nov 2025", customers: 410 },
    { month: "Dec 2025", customers: 450 },
    { month: "Jan 2026", customers: 435 },
    { month: "Feb 2026", customers: 468 },
    { month: "Mar 2026", customers: customers.length },
  ];

  // ── Chart 2: Service Providers Overview — preserved exactly ──────
  const providerOverviewData = [
    {
      category: "Marketplace",
      Active: serviceProviders.filter(p => p.category === "Marketplace" && p.status === "Active").length,
      Pending: Math.floor(pendingApprovals * 0.2),
    },
    {
      category: "Grocery",
      Active: serviceProviders.filter(p => p.category === "Grocery" && p.status === "Active").length,
      Pending: Math.floor(pendingApprovals * 0.15),
    },
    {
      category: "Restaurant",
      Active: serviceProviders.filter(p => p.category === "Restaurant" && p.status === "Active").length,
      Pending: Math.floor(pendingApprovals * 0.25),
    },
    {
      category: "Pharmacy",
      Active: serviceProviders.filter(p => p.category === "Pharmacy" && p.status === "Active").length,
      Pending: Math.floor(pendingApprovals * 0.15),
    },
    {
      category: "Healthcare",
      Active: serviceProviders.filter(p => p.category === "Healthcare" && p.status === "Active").length,
      Pending: Math.floor(pendingApprovals * 0.15),
    },
    {
      category: "Franchise",
      Active: serviceProviders.filter(p => p.category === "Franchise" && p.status === "Active").length,
      Pending: Math.floor(pendingApprovals * 0.1),
    },
  ];

  // ── Chart 3: Bookings Overview — preserved exactly ───────────────
  const bookingsOverviewData = [
    {
      period: "This Week",
      Active: activeBookingsToday,
      Completed: completedBookings,
      Cancelled: cancelledBookings,
    },
  ];

  // ── Chart 4: Revenue & Commission — preserved exactly ────────────
  const revenueCommissionData = [
    { date: "Feb 26", revenue: 145.2, commission: 18.5 },
    { date: "Feb 27", revenue: 162.8, commission: 21.0 },
    { date: "Feb 28", revenue: 158.4, commission: 19.8 },
    { date: "Mar 1",  revenue: 178.6, commission: 23.4 },
    { date: "Mar 2",  revenue: 185.3, commission: 24.5 },
    { date: "Mar 3",  revenue: 192.7, commission: 26.1 },
    { date: "Mar 4",  revenue: totalRevenue / 1000, commission: commissionEarnings / 1000 },
  ];

  // ── Chart 5: Issues & Operations — preserved exactly ─────────────
  const issuesOperationsData = [
    { type: "Pending Payout Requests", count: pendingPayouts,  fill: "#f59e0b" },
    { type: "Open Disputes",           count: openDisputes,    fill: "#ef4444" },
  ];

  // ── Alerts ───────────────────────────────────────────────────────
  const alerts = [
    {
      id: "fraud",
      label: "Fraud Alerts",
      count: 3,
      icon: ShieldAlert,
      bg: "bg-red-50",
      border: "border-red-200",
      iconColor: "text-red-600",
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
      dot: "bg-purple-500",
    },
  ];

  // ── Activity feed ────────────────────────────────────────────────
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
  ];

  const topProviders = [...serviceProviders]
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 5)
    .map((provider, index) => ({
      rank: index + 1,
      name: provider.businessName,
      revenue: provider.totalRevenue,
      rating: provider.rating,
      bookings: provider.totalBookings,
    }));

  return (
    <div className="space-y-7 font-['Inter',sans-serif]">
      {/* ── Welcome Header ──────────────────────────────────────── */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">
            {formattedDate} &nbsp;·&nbsp;
            <span className="font-mono tabular-nums">{formattedTime}</span>
          </p>
          <h1 className="text-3xl font-bold text-gray-900 font-['Poppins',sans-serif]">
            Welcome back, {admin?.name?.split(" ")[0] || "Admin"} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening on ServEase today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 border-gray-200 gap-2 h-10 px-4"
            onClick={() => router.push("/reports/revenue")}
          >
            <BarChart2 className="w-4 h-4" />
            View Reports
          </Button>
          <Button
            size="sm"
            className="bg-[#00BF63] hover:bg-[#00A055] text-white gap-2 h-10 px-4"
            onClick={() => router.push("/provider-applications")}
          >
            <ClipboardList className="w-4 h-4" />
            Review Queue ({pendingApprovals})
          </Button>
        </div>
      </div>

      {/* ── Alerts Strip ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-center gap-4 p-4 rounded-xl border ${alert.bg} ${alert.border} cursor-pointer group hover:shadow-md transition-all`}
          >
            <div className="relative flex-shrink-0">
              <div className="p-2.5 rounded-lg bg-white shadow-sm">
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

      {/* ── Quick Stats Section ────────────────────────────────────── */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800 font-['Poppins',sans-serif]">Platform Performance</h2>
        
        {/* Main Chart */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-['Poppins',sans-serif]">
              <Users className="w-6 h-6 text-[#00BF63]" />
              Customers Overview
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">Customer growth trend over the last 7 months</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={customerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 13 }} tickLine={false} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 13 }} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="#00BF63"
                  strokeWidth={4}
                  dot={{ fill: "#00BF63", r: 5, strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 7, strokeWidth: 2, stroke: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Triple Row Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-['Poppins',sans-serif]">
                <UserCheck className="w-6 h-6 text-[#00BF63]" />
                Service Providers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={providerOverviewData}>
                  <XAxis dataKey="category" stroke="#94a3b8" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="Active" stackId="a" fill="#00BF63" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Pending" stackId="a" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-['Poppins',sans-serif]">
                <TrendingUp className="w-6 h-6 text-[#00BF63]" />
                Financial Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={revenueCommissionData}>
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#00BF63" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="commission" stroke="#3b82f6" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Bottom Section ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top Providers */}
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-['Poppins',sans-serif]">Top Providers</CardTitle>
            <Button variant="ghost" size="sm" className="text-[#00BF63]" onClick={() => router.push("/service-providers")}>
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProviders.map((provider) => (
              <div key={provider.rank} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 hover:border-[#00BF63]/30 hover:bg-[#00BF63]/5 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00BF63]/10 flex items-center justify-center text-[#00BF63] font-bold text-sm">
                    #{provider.rank}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{provider.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {provider.rating} • {provider.bookings} bookings
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#00BF63]">₱{(provider.revenue / 1000).toFixed(1)}K</p>
                  <p className="text-[10px] text-gray-400 font-medium">REVENUE</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-['Poppins',sans-serif]">Platform Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4 group">
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${activity.iconBg}`}>
                  <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-900 group-hover:text-[#00BF63] transition-colors">{activity.title}</p>
                    <span className="text-[10px] text-gray-400 font-medium">{activity.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{activity.description}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full h-11 text-gray-500 border-gray-200 rounded-xl" onClick={() => router.push("/audit-trail")}>
              View Activity Log
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
