import { useEffect, useMemo, useState } from 'react';
import { Calendar, DollarSign, Star, TrendingUp, Clock, CheckCircle, ArrowRight, Eye } from 'lucide-react';
import { useNavigate } from '@/lib/react-router-compat';

import {
  getProviderBookings,
  getProviderDashboard,
  getProviderEarningsSummary,
  type ProviderBookingResponse,
} from '@/lib/api/provider-portal';
import { useAuth } from '../contexts/AuthContext';
import { useProviderData } from '../context/ProviderDataContext';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProviderData();
  const [dashboard, setDashboard] = useState({ new_job_requests: 0, total_earnings: 0 });
  const [bookings, setBookings] = useState<ProviderBookingResponse[]>([]);
  const [earningsSummary, setEarningsSummary] = useState({
    completed_payments: 0,
    monthly_earnings: 0,
    net_earnings: 0,
    platform_fees: 0,
    total_earnings: 0,
  });

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    let isMounted = true;

    const loadDashboard = async () => {
      try {
        const [dashboardResponse, bookingsResponse, earningsResponse] = await Promise.all([
          getProviderDashboard(user.id),
          getProviderBookings(),
          getProviderEarningsSummary(),
        ]);

        if (!isMounted) {
          return;
        }

        setDashboard(dashboardResponse);
        setBookings(bookingsResponse);
        setEarningsSummary(earningsResponse);
      } catch (error) {
        console.error('Unable to load dashboard data:', error);
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const todayIsoDate = new Date().toISOString().slice(0, 10);

  const stats = useMemo(() => {
    const todaysBookings = bookings.filter((booking) =>
      booking.scheduled_at?.startsWith(todayIsoDate)
    );

    return [
      {
        label: 'New Requests',
        value: String(dashboard.new_job_requests),
        icon: Calendar,
        color: 'bg-blue-500',
        trend: 'Pending provider requests',
      },
      {
        label: "Today's Bookings",
        value: String(todaysBookings.length),
        icon: CheckCircle,
        color: 'bg-green-600',
        trend: `${todaysBookings.filter((booking) => booking.status === 'completed').length} completed`,
      },
      {
        label: 'Monthly Earnings',
        value: `₱${Math.round(earningsSummary.monthly_earnings).toLocaleString()}`,
        icon: DollarSign,
        color: 'bg-purple-500',
        trend: `Net ₱${Math.round(earningsSummary.net_earnings).toLocaleString()}`,
      },
      {
        label: 'Overall Rating',
        value: profile.averageRating ? profile.averageRating.toFixed(1) : 'N/A',
        icon: Star,
        color: 'bg-yellow-500',
        trend: `Based on ${profile.totalReviews ?? 0} reviews`,
      },
    ];
  }, [bookings, dashboard.new_job_requests, earningsSummary.monthly_earnings, earningsSummary.net_earnings, profile.averageRating, profile.totalReviews, todayIsoDate]);

  const performanceMetrics = useMemo(() => {
    const totalBookings = bookings.length;
    const acceptedBookings = bookings.filter((booking) =>
      ['confirmed', 'in_progress', 'completed'].includes(booking.status ?? '')
    ).length;
    const completedBookings = bookings.filter((booking) => booking.status === 'completed').length;

    return [
      {
        label: 'Acceptance Rate',
        value: totalBookings ? `${Math.round((acceptedBookings / totalBookings) * 100)}%` : '0%',
        icon: CheckCircle,
        color: 'text-green-600',
      },
      {
        label: 'Completion Rate',
        value: totalBookings ? `${Math.round((completedBookings / totalBookings) * 100)}%` : '0%',
        icon: TrendingUp,
        color: 'text-blue-600',
      },
      {
        label: 'Completed Jobs',
        value: String(earningsSummary.completed_payments),
        icon: Clock,
        color: 'text-purple-600',
      },
    ];
  }, [bookings, earningsSummary.completed_payments]);

  const quickActions = [
    { label: 'Set Availability', path: '/provider/availability', color: 'bg-green-600' },
    { label: 'View Calendar', path: '/provider/calendar', color: 'bg-blue-600' },
    { label: 'Update Pricing', path: '/provider/edit-services', color: 'bg-purple-600' },
    { label: 'View Earnings', path: '/provider/earningsdashboard', color: 'bg-yellow-600' },
  ];

  const upcomingBookings = useMemo(() => {
    return bookings
      .filter((booking) => ['pending', 'confirmed', 'in_progress'].includes(booking.status ?? ''))
      .sort((first, second) => {
        const firstTime = first.scheduled_at ? new Date(first.scheduled_at).getTime() : 0;
        const secondTime = second.scheduled_at ? new Date(second.scheduled_at).getTime() : 0;
        return firstTime - secondTime;
      })
      .slice(0, 5)
      .map((booking) => ({
        id: booking.id,
        customer: booking.customer_name || 'Customer',
        location: booking.service_address || 'Location unavailable',
        service: booking.service_title || 'Service',
        status: booking.status === 'pending' ? 'Pending' : 'Confirmed',
        time: booking.scheduled_at
          ? new Date(booking.scheduled_at).toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
            })
          : 'TBD',
      }));
  }, [bookings]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
                <p className="text-xs text-gray-400">{stat.trend}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className={`${action.color} text-white px-6 py-4 rounded-xl font-medium hover:opacity-90 transition-all shadow-sm hover:shadow-md`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* New Requests Banner */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-green-900 mb-1">
            You have {dashboard.new_job_requests} new booking requests!
          </h3>
          <p className="text-sm text-green-700">Review and respond to customer requests to grow your business</p>
        </div>
        <button
          onClick={() => navigate('/provider/bookings')}
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2"
        >
          View Requests
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Upcoming Bookings Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Upcoming Bookings</h2>
          <button
            onClick={() => navigate('/provider/calendar')}
            className="text-green-600 text-sm font-medium hover:text-green-700 flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">Time</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">Customer Name</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">Service Type</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">Location</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">Status</th>
                <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {upcomingBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 text-sm font-medium text-gray-900">{booking.time}</td>
                  <td className="py-4 text-sm text-gray-700">{booking.customer}</td>
                  <td className="py-4 text-sm text-gray-700">{booking.service}</td>
                  <td className="py-4 text-sm text-gray-600">{booking.location}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button
                      className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1 ml-auto"
                      onClick={() => navigate(`/provider/booking-details/${booking.id}`)}
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {performanceMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-xl">
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
