"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  DollarSign, 
  Clock, 
  CheckCircle, 
  Download, 
  TrendingUp,
  CreditCard,
  FileText,
  Briefcase,
  CircleDollarSign,
  Wallet,
  Eye,
  ArrowUpRight,
  TrendingDown
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function EarningsDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "week" | "month" | "all">("month");

  // Sample data
  const earningsTrendData = [
    { date: "Mar 6", amount: 1870 },
    { date: "Mar 7", amount: 1425 },
    { date: "Mar 8", amount: 3020 },
    { date: "Mar 9", amount: 1530 },
    { date: "Mar 10", amount: 2325 },
    { date: "Mar 11", amount: 2850 },
    { date: "Mar 12", amount: 3100 },
  ];

  const serviceCategoryData = [
    { name: "House Cleaning", value: 4500, color: "#00BF63" },
    { name: "Plumbing", value: 3200, color: "#059669" },
    { name: "Electrical", value: 2800, color: "#10B981" },
    { name: "Aircon Services", value: 1950, color: "#34D399" },
  ];

  const topEarningDays = [
    { day: "Monday", amount: 3200, percentage: 100 },
    { day: "Wednesday", amount: 2850, percentage: 89 },
    { day: "Saturday", amount: 2650, percentage: 83 },
    { day: "Friday", amount: 2100, percentage: 66 },
  ];

  const totalEarnings = selectedPeriod === "month" ? 12450 : 42300;
  const pendingEarnings = 1530;
  const inProcessing = 850;
  const paidOut = 10920;
  const completedBookings = 47;
  const avgBookingValue = 2650;
  const totalTips = 1340;
  const platformFees = 1868;

  return (
    <div className="space-y-10 font-['Inter',sans-serif]">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-black text-gray-900 font-['Poppins',sans-serif] tracking-tight">Financial Insights</h1>
          <p className="text-gray-500 font-medium">Track your revenue growth, payout status, and platform performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-200 font-bold text-gray-600 hover:bg-gray-50">
             <Download className="w-4 h-4 mr-2" />
             Download Statements
          </Button>
          <Button className="h-12 px-6 rounded-2xl bg-[#00BF63] hover:bg-[#00A055] text-white font-bold shadow-lg shadow-green-100">
             Add Payment Method
          </Button>
        </div>
      </div>

      {/* Period Selector & Payout Action */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-2 bg-white/50 backdrop-blur-sm p-1.5 rounded-[1.5rem] border border-gray-100/50 w-fit">
          {[
            { key: "today", label: "Today" },
            { key: "week", label: "This Week" },
            { key: "month", label: "This Month" },
            { key: "all", label: "All Time" },
          ].map((period) => (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key as any)}
              className={`
                px-6 py-2.5 rounded-2xl text-xs font-black transition-all uppercase tracking-widest
                ${selectedPeriod === period.key
                  ? "bg-[#00BF63] text-white shadow-md shadow-green-100"
                  : "text-gray-400 hover:text-gray-600 hover:bg-white"
                }
              `}
            >
              {period.label}
            </button>
          ))}
        </div>

        <Link href="/payout" className="group">
           <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-[#00BF63] transition-all">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                 <Wallet className="w-5 h-5 text-[#00BF63]" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Available Payout</span>
                 <span className="text-lg font-black text-gray-900 leading-none">₱{paidOut.toLocaleString()}</span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-[#00BF63] ml-4" />
           </div>
        </Link>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Earnings", value: `₱${totalEarnings.toLocaleString()}`, trend: "+12%", color: "text-[#00BF63]", bg: "bg-[#DCFCE7]", icon: DollarSign, isPositive: true },
          { label: "Pending", value: `₱${pendingEarnings.toLocaleString()}`, trend: "Awaiting", color: "text-amber-600", bg: "bg-amber-50", icon: Clock, isPositive: null },
          { label: "Processing", value: `₱${inProcessing.toLocaleString()}`, trend: "In Bank", color: "text-blue-600", bg: "bg-blue-50", icon: CreditCard, isPositive: null },
          { label: "Completion", value: "98.2%", trend: "+2.4%", color: "text-[#00BF63]", bg: "bg-[#DCFCE7]", icon: CheckCircle, isPositive: true }
        ].map((kpi, idx) => (
          <Card key={idx} className="border-none shadow-xl shadow-gray-100/50 rounded-[2rem] overflow-hidden group hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-8">
              <div className={`w-12 h-12 ${kpi.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em]">{kpi.label}</p>
                <p className="text-3xl font-black text-gray-900 tracking-tight">{kpi.value}</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-50 flex items-center gap-2">
                {kpi.isPositive !== null && (
                  kpi.isPositive ? <TrendingUp className="w-4 h-4 text-[#00BF63]" /> : <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-[10px] font-black uppercase tracking-widest ${kpi.isPositive === true ? "text-[#00BF63]" : kpi.isPositive === false ? "text-red-500" : "text-gray-400"}`}>
                  {kpi.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Earnings Trend */}
        <Card className="border-none shadow-xl shadow-gray-100/50 rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-8 border-b border-gray-50">
             <div className="flex items-center gap-4">
                <div className="w-2 h-8 bg-[#00BF63] rounded-full" />
                <CardTitle className="text-2xl font-black font-['Poppins',sans-serif]">Earnings Growth</CardTitle>
             </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsTrendData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00BF63" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#00BF63" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="5 5" stroke="#F1F5F9" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fontWeight: 700, fill: '#94A3B8' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fontWeight: 700, fill: '#94A3B8' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#FFF',
                      fontSize: '12px',
                      fontWeight: '700'
                    }}
                    itemStyle={{ color: '#00BF63' }}
                    cursor={{ stroke: '#00BF63', strokeWidth: 2 }}
                    formatter={(value: any) => [`₱${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#00BF63" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorAmount)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Distribution */}
        <Card className="border-none shadow-xl shadow-gray-100/50 rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-8 border-b border-gray-50">
             <div className="flex items-center gap-4">
                <div className="w-2 h-8 bg-blue-500 rounded-full" />
                <CardTitle className="text-2xl font-black font-['Poppins',sans-serif]">Service Distribution</CardTitle>
             </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[300px] w-full flex flex-col md:flex-row items-center justify-center gap-10">
              <div className="h-full flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceCategoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {serviceCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={10} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`₱${value.toLocaleString()}`, 'Earnings']}
                      contentStyle={{ borderRadius: '12px', border: 'none', shadow: 'xl' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                {serviceCategoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-4 group">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <div className="flex flex-col">
                       <span className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">{item.name}</span>
                       <span className="text-lg font-black text-gray-900">₱{item.value.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { label: "Completed Bookings", value: completedBookings, sub: "Total orders", icon: Briefcase, bg: "bg-indigo-50", color: "text-indigo-600" },
             { label: "Avg. Booking Value", value: `₱${avgBookingValue.toLocaleString()}`, sub: "Per ticket", icon: CircleDollarSign, bg: "bg-amber-50", color: "text-amber-600" },
             { label: "Total Tips", value: `₱${totalTips.toLocaleString()}`, sub: "Customer gratitude", icon: DollarSign, bg: "bg-green-50", color: "text-[#00BF63]" },
             { label: "Platform Fees", value: `₱${platformFees.toLocaleString()}`, sub: "15% total", icon: FileText, bg: "bg-gray-50", color: "text-gray-400" }
           ].map((metric, idx) => (
             <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-50 shadow-lg shadow-gray-100/50 flex items-center gap-6 group hover:shadow-xl transition-all">
                <div className={`w-14 h-14 ${metric.bg} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform`}>
                   <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{metric.label}</p>
                   <p className="text-2xl font-black text-gray-900 tracking-tight">{metric.value}</p>
                   <p className="text-[10px] font-bold text-gray-400 italic">{metric.sub}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Top Days List */}
        <Card className="border-none shadow-xl shadow-gray-100/50 rounded-[2.5rem] overflow-hidden bg-gray-900 text-white">
          <CardHeader className="p-8 border-b border-white/5">
             <CardTitle className="text-xl font-black font-['Poppins',sans-serif]">Top Earning Days</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {topEarningDays.map((item) => (
              <div key={item.day} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white">{item.day}</span>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">₱{item.amount.toLocaleString()}</span>
                  </div>
                  <span className="text-xs font-black text-[#00BF63]">{item.percentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-[#00BF63] to-green-400 rounded-full" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Efficiency Tip Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-700 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-200">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.5" />
           </svg>
        </div>
        <div className="relative z-10 flex items-start gap-6">
           <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
              <TrendingUp className="w-8 h-8 text-white" />
           </div>
           <div>
              <h3 className="text-2xl font-black font-['Poppins',sans-serif] tracking-tight mb-2 uppercase italic">Peak Efficiency Intel</h3>
              <p className="text-lg text-indigo-50/90 font-medium leading-relaxed max-w-2xl">
                 Strategic Insight: Your peak earning trajectory aligns with <span className="text-white font-black underline decoration-[#00BF63] underline-offset-4">10 AM - 2 PM on weekdays</span>. 
                 Optimizing your availability during this hyper-active window could potentially increase your weekly revenue by up to <span className="text-white font-black">22%</span>.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
