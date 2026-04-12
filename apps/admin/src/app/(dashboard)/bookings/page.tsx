"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Search,
  Filter,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { useData } from "../../../contexts/DataContext";
import type { Booking, BookingStatus } from "../../../types";

type BookingTab = "all" | "upcoming" | "ongoing" | "completed" | "cancelled";

export default function BookingsPage() {
  const { bookings, getCustomerById, getProviderById, getCategoryById } = useData();
  
  const [activeTab, setActiveTab] = useState<BookingTab>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      // Tab-based filtering
      let matchesTab = true;
      switch (activeTab) {
        case "upcoming":
          matchesTab = booking.status === "Pending" || booking.status === "Confirmed";
          break;
        case "ongoing":
          matchesTab = booking.status === "In Progress";
          break;
        case "completed":
          matchesTab = booking.status === "Completed";
          break;
        case "cancelled":
          matchesTab = booking.status === "Cancelled";
          break;
        case "all":
        default:
          matchesTab = true;
      }

      const customer = getCustomerById(booking.customerId);
      const provider = getProviderById(booking.providerId);

      const matchesSearch =
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider?.businessName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === "all" || booking.categoryId === categoryFilter;

      // Date filter logic
      let matchesDate = true;
      if (dateFilter !== "all") {
        const bookingDate = new Date(booking.scheduledDate);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - bookingDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (dateFilter) {
          case "today":
            matchesDate = diffDays <= 1;
            break;
          case "week":
            matchesDate = diffDays <= 7;
            break;
          case "month":
            matchesDate = diffDays <= 30;
            break;
        }
      }

      return matchesTab && matchesSearch && matchesCategory && matchesDate;
    });
  }, [bookings, activeTab, searchTerm, categoryFilter, dateFilter, getCustomerById, getProviderById]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = filteredBookings.length;
    const completed = filteredBookings.filter((b) => b.status === "Completed").length;
    const inProgress = filteredBookings.filter((b) => b.status === "In Progress").length;
    const cancelled = filteredBookings.filter((b) => b.status === "Cancelled").length;
    const totalRevenue = filteredBookings
      .filter((b) => b.status === "Completed" && b.paymentStatus === "Paid")
      .reduce((sum, b) => sum + b.amount, 0);
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return { total, completed, inProgress, cancelled, totalRevenue, completionRate };
  }, [filteredBookings]);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "Completed":
        return (
          <Badge className="bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "In Progress":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            <Activity className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        );
      case "Confirmed":
        return (
          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmed
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        );
    }
  };

  const getPaymentBadge = (status: Booking["paymentStatus"]) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]">Paid</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "Refunded":
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Refunded</Badge>;
      case "Failed":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Failed</Badge>;
    }
  };

  return (
    <div className="space-y-6 font-['Inter',sans-serif]">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-gray-900 font-['Poppins',sans-serif]">All Bookings</h1>
        <p className="text-gray-500">
          Monitor and manage all service transactions and booking requests.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: "Total Bookings", value: stats.total, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Completed", value: stats.completed, icon: CheckCircle, color: "text-[#16A34A]", bg: "bg-[#DCFCE7]" },
          { label: "In Progress", value: stats.inProgress, icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Cancelled", value: stats.cancelled, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
          { label: "Revenue", value: `₱${(stats.totalRevenue / 1000).toFixed(1)}K`, icon: DollarSign, color: "text-[#16A34A]", bg: "bg-[#DCFCE7]" },
          { label: "Comp. Rate", value: `${stats.completionRate.toFixed(1)}%`, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" }
        ].map((item, idx) => (
          <Card key={idx} className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.bg}`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{item.label}</p>
                  <p className="text-xl font-bold text-gray-900">{item.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Table Card */}
      <Card className="border-gray-200">
        <CardHeader className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 pb-6 border-b border-gray-100">
          <CardTitle className="text-xl font-['Poppins',sans-serif]">Booking Records</CardTitle>
          
          <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
            {(["all", "upcoming", "ongoing", "completed", "cancelled"] as BookingTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab
                    ? "bg-[#00BF63] text-white shadow-md shadow-green-200"
                    : "text-gray-500 hover:text-gray-700 hover:bg-white"
                }`}
              >
                {tab.charAt(0) + tab.slice(1)}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search ID, customer, or provider..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 rounded-xl border-gray-200"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-11 rounded-xl border-gray-200">
                <SelectValue placeholder="Category: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="CAT-001">Home Maintenance</SelectItem>
                <SelectItem value="CAT-002">Beauty & Wellness</SelectItem>
                <SelectItem value="CAT-003">Cleaning Services</SelectItem>
                <SelectItem value="CAT-004">Pet Services</SelectItem>
                <SelectItem value="CAT-005">Events</SelectItem>
                <SelectItem value="CAT-006">Auto & Tech</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="h-11 rounded-xl border-gray-200">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Date: All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Past 7 Days</SelectItem>
                <SelectItem value="month">Past 30 Days</SelectItem>
              </SelectContent>
            </Select>

            <Button className="h-11 bg-gray-900 hover:bg-gray-800 text-white rounded-xl gap-2 font-bold">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </Button>
          </div>

          <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="font-bold text-gray-700">Booking ID</TableHead>
                  <TableHead className="font-bold text-gray-700">Customer</TableHead>
                  <TableHead className="font-bold text-gray-700">Provider & Service</TableHead>
                  <TableHead className="font-bold text-gray-700">Schedule</TableHead>
                  <TableHead className="font-bold text-gray-700 text-right">Amount</TableHead>
                  <TableHead className="font-bold text-gray-700">Status</TableHead>
                  <TableHead className="font-bold text-gray-700 text-center">Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-20 text-gray-400 font-medium">
                      <div className="flex flex-col items-center gap-2">
                        <Calendar className="w-8 h-8 opacity-20" />
                        No bookings found matching your request.
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => {
                    const customer = getCustomerById(booking.customerId);
                    const provider = getProviderById(booking.providerId);
                    const category = getCategoryById(booking.categoryId);

                    return (
                      <TableRow key={booking.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <TableCell className="font-mono font-bold text-[#00BF63]">{booking.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-900">{customer?.name}</span>
                            <span className="text-xs text-gray-400 font-medium">{customer?.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-900">{provider?.businessName}</span>
                            <span className="text-xs text-gray-400 font-semibold uppercase">{category?.name}</span>
                            <span className="text-xs text-gray-500 italic mt-0.5 line-clamp-1">{booking.serviceDescription}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-700">
                              {new Date(booking.scheduledDate).toLocaleDateString("en-US", {
                                month: "short", day: "numeric", year: "numeric"
                              })}
                            </span>
                            <span className="text-xs font-medium text-gray-400">
                              {new Date(booking.scheduledDate).toLocaleTimeString("en-US", {
                                hour: "2-digit", minute: "2-digit"
                              })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-bold text-gray-900">
                          ₱{booking.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="text-center">{getPaymentBadge(booking.paymentStatus)}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
