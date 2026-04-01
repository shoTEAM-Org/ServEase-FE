import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Download,
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Star,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Monthly Revenue Data
const monthlyRevenueData = [
  { month: "Sep", revenue: 985000, commission: 162450, netProviderEarnings: 822550 },
  { month: "Oct", revenue: 1120000, commission: 184800, netProviderEarnings: 935200 },
  { month: "Nov", revenue: 1085000, commission: 179025, netProviderEarnings: 905975 },
  { month: "Dec", revenue: 1245000, commission: 205425, netProviderEarnings: 1039575 },
  { month: "Jan", revenue: 1389000, commission: 229185, netProviderEarnings: 1159815 },
  { month: "Feb", revenue: 1512000, commission: 249480, netProviderEarnings: 1262520 },
];

// Bookings by Category Data
const bookingsByCategoryData = [
  { category: "Home Maintenance & Repair", bookings: 523, percentage: 22.5 },
  { category: "Beauty, Wellness & Personal Care", bookings: 412, percentage: 17.7 },
  { category: "Domestic & Cleaning Services", bookings: 378, percentage: 16.3 },
  { category: "Events & Entertainment", bookings: 289, percentage: 12.4 },
  { category: "Pet Services", bookings: 267, percentage: 11.5 },
  { category: "Automotive & Tech Support", bookings: 234, percentage: 10.1 },
  { category: "Education & Professional Services", bookings: 223, percentage: 9.5 },
];

// Peak Hours Data
const peakHoursData = [
  { hour: "6AM", bookings: 12 },
  { hour: "7AM", bookings: 23 },
  { hour: "8AM", bookings: 45 },
  { hour: "9AM", bookings: 78 },
  { hour: "10AM", bookings: 102 },
  { hour: "11AM", bookings: 89 },
  { hour: "12PM", bookings: 95 },
  { hour: "1PM", bookings: 87 },
  { hour: "2PM", bookings: 112 },
  { hour: "3PM", bookings: 98 },
  { hour: "4PM", bookings: 85 },
  { hour: "5PM", bookings: 76 },
  { hour: "6PM", bookings: 54 },
  { hour: "7PM", bookings: 32 },
  { hour: "8PM", bookings: 18 },
];

// Top Providers Data
const topProvidersData = [
  {
    id: "PRV-001",
    name: "HomeFixPro Manila",
    category: "Home Maintenance & Repair",
    rating: 4.8,
    completionRate: 97.4,
    revenue: 587000,
    disputes: 2,
    disputeRate: 0.9,
  },
  {
    id: "PRV-002",
    name: "Sparkle Clean Services",
    category: "Domestic & Cleaning Services",
    rating: 4.9,
    completionRate: 97.0,
    revenue: 510000,
    disputes: 1,
    disputeRate: 0.5,
  },
  {
    id: "PRV-003",
    name: "Glow Beauty Spa",
    category: "Beauty, Wellness & Personal Care",
    rating: 4.7,
    completionRate: 94.6,
    revenue: 445000,
    disputes: 3,
    disputeRate: 1.8,
  },
  {
    id: "PRV-004",
    name: "Celebrate Events Co.",
    category: "Events & Entertainment",
    rating: 4.9,
    completionRate: 96.6,
    revenue: 1250000,
    disputes: 1,
    disputeRate: 1.1,
  },
  {
    id: "PRV-005",
    name: "Pawsome Pet Care",
    category: "Pet Services",
    rating: 4.8,
    completionRate: 95.2,
    revenue: 312000,
    disputes: 2,
    disputeRate: 1.4,
  },
];

// Customer Growth Data
const customerGrowthData = [
  { month: "Sep", newUsers: 589, activeUsers: 11250, repeatRate: 34.2, churnRate: 2.8 },
  { month: "Oct", newUsers: 612, activeUsers: 11756, repeatRate: 36.5, churnRate: 2.5 },
  { month: "Nov", newUsers: 578, activeUsers: 12189, repeatRate: 38.1, churnRate: 2.3 },
  { month: "Dec", newUsers: 745, activeUsers: 12789, repeatRate: 39.8, churnRate: 2.1 },
  { month: "Jan", newUsers: 823, activeUsers: 13456, repeatRate: 41.2, churnRate: 1.9 },
  { month: "Feb", newUsers: 892, activeUsers: 14012, repeatRate: 42.8, churnRate: 1.7 },
];

const COLORS = ["#00BF63", "#00A356", "#008746", "#006B37", "#005028", "#003419", "#001F0F"];

export function ReportsInsights() {
  const [activeTab, setActiveTab] = useState<"revenue" | "bookings" | "providers" | "customers">(
    "revenue"
  );
  const [dateRange, setDateRange] = useState("last-30-days");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleExportCSV = () => {
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `servEase_${activeTab}_${timestamp}.csv`;
    console.log(`Exporting ${filename}...`);
    alert(`✅ Exporting ${filename}\nDate Range: ${dateRange}\nCategory: ${categoryFilter}`);
  };

  const tabs = [
    { id: "revenue" as const, label: "Revenue Reports", icon: DollarSign },
    { id: "bookings" as const, label: "Booking Analytics", icon: Package },
    { id: "providers" as const, label: "Provider Performance", icon: Star },
    { id: "customers" as const, label: "Customer Growth", icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Insights</h1>
          <p className="text-gray-500 mt-1">
            Comprehensive analytics and performance reports for admin review
          </p>
        </div>
        <Button onClick={handleExportCSV} className="bg-[#00BF63] hover:bg-[#00A356]">
          <Download className="w-4 h-4 mr-2" />
          Export to CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>

            {/* Date Range Filter */}
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="this-quarter">This Quarter</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="home">Home Maintenance & Repair</SelectItem>
                <SelectItem value="beauty">Beauty, Wellness & Personal Care</SelectItem>
                <SelectItem value="cleaning">Domestic & Cleaning Services</SelectItem>
                <SelectItem value="pet">Pet Services</SelectItem>
                <SelectItem value="events">Events & Entertainment</SelectItem>
                <SelectItem value="auto">Automotive & Tech Support</SelectItem>
                <SelectItem value="education">Education & Professional Services</SelectItem>
              </SelectContent>
            </Select>

            <Badge variant="outline" className="ml-auto">
              {categoryFilter === "all" ? "All Categories" : "Filtered"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-[#00BF63] text-[#00BF63] font-medium"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* REVENUE REPORTS TAB */}
      {activeTab === "revenue" && (
        <div className="space-y-6">
          {/* Revenue Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <DollarSign className="w-6 h-6 text-[#00BF63]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">₱1.51M</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +8.8% vs last month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Commission Earned</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">₱249.5K</p>
                    <p className="text-xs text-gray-400 mt-1">16.5% avg rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-50">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Net Provider Earnings</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">₱1.26M</p>
                    <p className="text-xs text-gray-400 mt-1">83.5% to providers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-orange-50">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Refund Rate</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">2.3%</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      -0.5% improvement
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Revenue breakdown showing total, commission, and provider earnings
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyRevenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00BF63" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#00BF63" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCommission" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    formatter={(value: number) => `₱${value.toLocaleString()}`}
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#00BF63"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    name="Total Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="commission"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorCommission)"
                    name="Commission"
                  />
                  <Line
                    type="monotone"
                    dataKey="netProviderEarnings"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    name="Provider Earnings"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* BOOKING ANALYTICS TAB */}
      {activeTab === "bookings" && (
        <div className="space-y-6">
          {/* Booking Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">2,326</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +14.2% growth
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <CheckCircle className="w-6 h-6 text-[#00BF63]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">94.8%</p>
                    <p className="text-xs text-gray-400 mt-1">Excellent performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-red-50">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Cancellation Rate</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">3.7%</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      -1.2% improvement
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-orange-50">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Peak Booking Time</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">2 PM</p>
                    <p className="text-xs text-gray-400 mt-1">112 bookings avg</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Peak Booking Hours Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Peak Booking Hours</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Hourly booking distribution</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={peakHoursData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="hour" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
                  />
                  <Bar dataKey="bookings" fill="#00BF63" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bookings per Category Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bookings by Category</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Category distribution</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={bookingsByCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percentage }) => `${percentage}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="bookings"
                    >
                      {bookingsByCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => `${value} bookings`}
                      contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Details</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Booking counts by category</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingsByCategoryData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {item.category}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{item.bookings}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* PROVIDER PERFORMANCE TAB */}
      {activeTab === "providers" && (
        <div className="space-y-6">
          {/* Provider Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-50">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Total Providers</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">1,234</p>
                    <p className="text-xs text-gray-400 mt-1">Active service providers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-yellow-50">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">4.82</p>
                    <p className="text-xs text-gray-400 mt-1">Platform average</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <CheckCircle className="w-6 h-6 text-[#00BF63]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Avg Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">96.2%</p>
                    <p className="text-xs text-gray-400 mt-1">Excellent performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-red-50">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Avg Dispute Rate</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">1.1%</p>
                    <p className="text-xs text-gray-400 mt-1">Low dispute rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Providers Table */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Providers</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Ranked by revenue generated and performance metrics
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Average Rating</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead>Revenue Generated</TableHead>
                    <TableHead>Dispute Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProvidersData.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{provider.name}</p>
                          <p className="text-xs text-gray-500">{provider.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700">{provider.category}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-gray-900">{provider.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            provider.completionRate >= 95
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-yellow-100 text-yellow-700 border-yellow-200"
                          }
                        >
                          {provider.completionRate}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-[#00BF63]">
                          ₱{provider.revenue.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            provider.disputeRate < 1
                              ? "bg-green-100 text-green-700 border-green-200"
                              : provider.disputeRate < 2
                              ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                              : "bg-red-100 text-red-700 border-red-200"
                          }
                        >
                          {provider.disputeRate}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CUSTOMER GROWTH TAB */}
      {activeTab === "customers" && (
        <div className="space-y-6">
          {/* Customer Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">New Users (Monthly)</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">892</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +8.4% vs last month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <CheckCircle className="w-6 h-6 text-[#00BF63]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">14,012</p>
                    <p className="text-xs text-gray-400 mt-1">Current active base</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-50">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Repeat Booking Rate</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">42.8%</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +1.6% improvement
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-red-50">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Churn Rate</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">1.7%</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      -0.2% improvement
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Growth Trend</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Monthly new users and active user base growth
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={customerGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis yAxisId="left" stroke="#6b7280" />
                  <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="newUsers"
                    stroke="#00BF63"
                    strokeWidth={2}
                    name="New Users"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="activeUsers"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Active Users"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Repeat Rate & Churn Rate Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Repeat Booking Rate</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Percentage of returning customers</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={customerGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" tickFormatter={(value) => `${value}%`} />
                    <Tooltip
                      formatter={(value: number) => `${value}%`}
                      contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
                    />
                    <Bar dataKey="repeatRate" fill="#00BF63" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Churn Rate</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Percentage of users leaving platform</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={customerGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" tickFormatter={(value) => `${value}%`} />
                    <Tooltip
                      formatter={(value: number) => `${value}%`}
                      contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
                    />
                    <Bar dataKey="churnRate" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
