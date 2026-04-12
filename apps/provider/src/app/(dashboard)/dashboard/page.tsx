"use client";

import { Calendar, DollarSign, Star, TrendingUp, Clock, CheckCircle, ArrowRight, Eye, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export default function DashboardPage() {
  const router = useRouter();

  const stats = [
    { label: 'New Requests', value: '12', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+3 from yesterday' },
    { label: "Today's Bookings", value: '8', icon: CheckCircle, color: 'text-[#00BF63]', bg: 'bg-[#DCFCE7]', trend: '5 completed' },
    { label: "Today's Earnings", value: '₱42,840', icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+12% from avg' },
    { label: 'Overall Rating', value: '4.8', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50', trend: 'Based on 247 reviews' },
  ];

  const quickActions = [
    { label: 'Set Availability', path: '/availability', color: 'bg-[#00BF63]' },
    { label: 'View Calendar', path: '/calendar', color: 'bg-blue-600' },
    { label: 'Update Pricing', path: '/edit-services', color: 'bg-purple-600' },
    { label: 'View Earnings', path: '/earningsdashboard', color: 'bg-amber-600' },
  ];

  const upcomingBookings = [
    { time: '9:00 AM', customer: 'John Miller', service: 'Home Cleaning', location: '123 Oak St', status: 'Confirmed' },
    { time: '11:30 AM', customer: 'Emily Davis', service: 'Lawn Care', location: '456 Pine Ave', status: 'Confirmed' },
    { time: '2:00 PM', customer: 'Michael Brown', service: 'Pet Grooming', location: '789 Maple Dr', status: 'Pending' },
    { time: '4:30 PM', customer: 'Sarah Wilson', service: 'Tutoring', location: '321 Elm St', status: 'Confirmed' },
    { time: '6:00 PM', customer: 'David Lee', service: 'Tech Support', location: '654 Cedar Ln', status: 'Confirmed' },
  ];

  const performanceMetrics = [
    { label: 'Acceptance Rate', value: '94%', icon: CheckCircle, color: 'text-[#00BF63]' },
    { label: 'Completion Rate', value: '98%', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Response Time', value: '< 2 min', icon: Clock, color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-10 font-['Inter',sans-serif]">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-black text-gray-900 font-['Poppins',sans-serif] tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 font-medium">Monitor your business performance and manage your service schedule.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-200 font-bold text-gray-600 hover:bg-gray-50">
            Export Report
          </Button>
          <Button className="h-12 px-6 rounded-2xl bg-[#00BF63] hover:bg-[#00A055] text-white font-bold shadow-lg shadow-green-100">
            View Analytics
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-xl shadow-gray-100/50 rounded-[2rem] overflow-hidden group hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-8">
              <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</p>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em]">{stat.label}</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                <p className="text-xs font-bold text-gray-500">{stat.trend}</p>
                <TrendingUp className="w-4 h-4 text-[#00BF63]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Upcoming Bookings */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900 font-['Poppins',sans-serif]">Upcoming Bookings</h2>
            <Button variant="link" onClick={() => router.push('/calendar')} className="text-[#00BF63] font-black p-0 h-auto">
              View Calendar <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <Card className="border-none shadow-xl shadow-gray-100/50 rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100 font-['Poppins',sans-serif]">
                      <th className="text-left py-6 px-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">Time</th>
                      <th className="text-left py-6 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                      <th className="text-left py-6 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Service</th>
                      <th className="text-left py-6 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                      <th className="text-right py-6 px-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {upcomingBookings.map((booking, index) => (
                      <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="py-6 px-10 text-sm font-black text-gray-900">{booking.time}</td>
                        <td className="py-6 px-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900">{booking.customer}</span>
                            <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span> {booking.location}
                            </span>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-none font-bold px-3 py-1 rounded-lg">
                            {booking.service}
                          </Badge>
                        </td>
                        <td className="py-6 px-4">
                          <div className="flex items-center gap-2">
                             <div className={`w-1.5 h-1.5 rounded-full ${booking.status === 'Confirmed' ? 'bg-[#00BF63]' : 'bg-amber-400'}`} />
                             <span className="text-sm font-bold text-gray-700">{booking.status}</span>
                          </div>
                        </td>
                        <td className="py-6 px-10 text-right">
                          <Button variant="ghost" size="sm" className="h-9 w-9 rounded-xl text-gray-400 hover:text-[#00BF63] hover:bg-green-50 p-0">
                            <Eye className="w-5 h-5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Performance */}
        <div className="space-y-10">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-gray-900 font-['Poppins',sans-serif]">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => router.push(action.path)}
                  className={`${action.color} text-white p-6 rounded-[2rem] font-black text-sm text-left hover:scale-[1.05] transition-all shadow-lg hover:shadow-xl shadow-gray-100 flex flex-col justify-between h-32`}
                >
                  <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-gray-900 font-['Poppins',sans-serif]">Performance</h2>
            <Card className="border-none shadow-xl shadow-gray-100/50 rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-8 space-y-8">
                {performanceMetrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{metric.label}</p>
                        <p className="text-xl font-black text-gray-900 tracking-tight">{metric.value}</p>
                      </div>
                    </div>
                    <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${metric.color.replace('text', 'bg')} rounded-full w-full opacity-30`} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Requests Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#00BF63] via-[#16A34A] to-[#15803D] rounded-[3rem] p-12 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest">
              <Clock className="w-4 h-4" /> Pending Action
            </div>
            <h3 className="text-4xl font-black font-['Poppins',sans-serif] tracking-tight">You have 12 new booking requests!</h3>
            <p className="text-xl text-white/80 font-medium">Review and respond to customer requests to grow your business efficiency.</p>
          </div>
          <Button 
            onClick={() => router.push('/bookings')}
            className="h-16 px-10 rounded-[2rem] bg-white text-[#00BF63] hover:bg-gray-100 font-black text-lg shadow-2xl transition-all hover:scale-[1.05]"
          >
            Check Requests
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
