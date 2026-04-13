import { useEffect, useMemo, useState } from "react";
import { Link } from "@/lib/react-router-compat";
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
  Eye
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
  ResponsiveContainer
} from "recharts";

import {
  getProviderEarningsSummary,
  getProviderPaymentHistory,
  type ProviderPaymentHistoryResponse,
} from "@/lib/api/provider-portal";

// Styles object for reusability
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #F9FAFB, rgba(16, 185, 129, 0.05))',
    padding: '32px',
  },
  maxWidthContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  pageHeader: {
    marginBottom: '40px',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '12px',
    letterSpacing: '-0.025em',
  },
  pageSubtitle: {
    fontSize: '16px',
    color: '#6B7280',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #F3F4F6',
    padding: '24px',
    transition: 'box-shadow 0.3s ease',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px',
  },
  sectionTitleBar: {
    height: '4px',
    width: '32px',
    backgroundColor: '#00BF63',
    borderRadius: '9999px',
  },
  sectionTitleText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#111827',
  },
  kpiCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #F3F4F6',
    padding: '24px',
    transition: 'all 0.3s ease',
  },
  kpiIconContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  kpiLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: '8px',
  },
  kpiValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#111827',
  },
  button: {
    padding: '14px 24px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  primaryButton: {
    backgroundColor: '#00BF63',
    color: 'white',
    boxShadow: '0 4px 16px rgba(0, 191, 99, 0.25)',
  },
  secondaryButton: {
    backgroundColor: 'white',
    color: '#374151',
    border: '2px solid #E5E7EB',
  },
  periodPill: {
    padding: '12px 24px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s ease',
  },
  metricsCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    border: '1px solid #E5E7EB',
    padding: '20px',
  },
  metricIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    padding: '20px',
  },
  topDayItem: {
    marginBottom: '16px',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#F3F4F6',
    borderRadius: '9999px',
    overflow: 'hidden' as const,
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(to right, #00BF63, #059669)',
    borderRadius: '9999px',
    transition: 'width 0.5s ease',
  },
  tipCard: {
    backgroundColor: '#E8F5E9',
    border: '1px solid rgba(0, 191, 99, 0.2)',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    gap: '16px',
  },
  tipIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'rgba(0, 191, 99, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
};

export function ProviderEarningsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "week" | "month" | "all">("month");
  const periods: Array<{ key: "today" | "week" | "month" | "all"; label: string }> = [
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "all", label: "All Time" },
  ];
  const [summary, setSummary] = useState({
    completed_payments: 0,
    monthly_earnings: 0,
    net_earnings: 0,
    platform_fees: 0,
    total_earnings: 0,
  });
  const [paymentHistory, setPaymentHistory] = useState<ProviderPaymentHistoryResponse[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadEarnings = async () => {
      try {
        const [earningsSummary, history] = await Promise.all([
          getProviderEarningsSummary(),
          getProviderPaymentHistory(),
        ]);

        if (!isMounted) {
          return;
        }

        setSummary(earningsSummary);
        setPaymentHistory(history);
      } catch (error) {
        console.error("Unable to load provider earnings:", error);
      }
    };

    loadEarnings();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPayments = useMemo(() => {
    const now = new Date();

    return paymentHistory.filter((payment) => {
      if (!payment.created_at) {
        return selectedPeriod === "all";
      }

      const paymentDate = new Date(payment.created_at);

      if (selectedPeriod === "today") {
        return paymentDate.toDateString() === now.toDateString();
      }

      if (selectedPeriod === "week") {
        const diff = now.getTime() - paymentDate.getTime();
        return diff <= 7 * 24 * 60 * 60 * 1000;
      }

      if (selectedPeriod === "month") {
        return (
          paymentDate.getMonth() === now.getMonth() &&
          paymentDate.getFullYear() === now.getFullYear()
        );
      }

      return true;
    });
  }, [paymentHistory, selectedPeriod]);

  const earningsTrendData = useMemo(() => {
    const grouped = new Map<string, number>();

    for (const payment of filteredPayments) {
      if (!payment.created_at) {
        continue;
      }

      const key = new Date(payment.created_at).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
      });
      grouped.set(key, (grouped.get(key) ?? 0) + Number(payment.amount ?? 0));
    }

    return Array.from(grouped.entries()).map(([date, amount]) => ({ date, amount }));
  }, [filteredPayments]);

  const serviceCategoryData = useMemo(() => {
    const colors = ["#00BF63", "#059669", "#10B981", "#34D399"];
    const grouped = new Map<string, number>();

    for (const payment of filteredPayments) {
      const key = payment.service_title || "Uncategorized";
      grouped.set(key, (grouped.get(key) ?? 0) + Number(payment.amount ?? 0));
    }

    return Array.from(grouped.entries()).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }));
  }, [filteredPayments]);

  const topEarningDays = useMemo(() => {
    const grouped = new Map<string, number>();

    for (const payment of filteredPayments) {
      if (!payment.created_at) {
        continue;
      }

      const day = new Date(payment.created_at).toLocaleDateString(undefined, {
        weekday: "long",
      });
      grouped.set(day, (grouped.get(day) ?? 0) + Number(payment.amount ?? 0));
    }

    const values = Array.from(grouped.entries())
      .map(([day, amount]) => ({ day, amount }))
      .sort((first, second) => second.amount - first.amount)
      .slice(0, 4);
    const maxAmount = values[0]?.amount ?? 0;

    return values.map((entry) => ({
      ...entry,
      percentage: maxAmount ? Math.round((entry.amount / maxAmount) * 100) : 0,
    }));
  }, [filteredPayments]);

  const totalEarnings =
    selectedPeriod === "all" ? summary.total_earnings : filteredPayments.reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);
  const pendingEarnings = filteredPayments
    .filter((payment) => payment.status === "pending")
    .reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);
  const inProcessing = filteredPayments
    .filter((payment) => payment.status === "processing")
    .reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);
  const paidOut = filteredPayments
    .filter((payment) => payment.status === "completed")
    .reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);
  const completedBookings = summary.completed_payments;
  const avgBookingValue = completedBookings ? totalEarnings / completedBookings : 0;
  const totalTips = 0;
  const platformFees = summary.platform_fees;

  return (
    <div style={styles.container}>
      <div style={styles.maxWidthContainer}>
        {/* Page Header */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>Earnings Dashboard</h1>
          <p style={styles.pageSubtitle}>Track your earnings, payouts, and performance metrics</p>
        </div>

        {/* Period Selector */}
        <div style={{ marginBottom: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' as const }}>
          {periods.map((period) => (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key)}
              style={{
                ...styles.periodPill,
                backgroundColor: selectedPeriod === period.key ? '#00BF63' : '#F3F4F6',
                color: selectedPeriod === period.key ? 'white' : '#6B7280',
                boxShadow: selectedPeriod === period.key ? '0 2px 8px rgba(0, 191, 99, 0.25)' : 'none',
              }}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Top Row: 4 KPI Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Total Earnings */}
          <Link 
            to="/provider/earningsdetails"
            style={{ 
              ...styles.kpiCard, 
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            <div style={{...styles.kpiIconContainer, backgroundColor: '#D1FAE5'}}>
              <DollarSign style={{ width: '24px', height: '24px', color: '#00BF63' }} />
            </div>
            <p style={styles.kpiLabel}>Total Earnings</p>
            <p style={styles.kpiValue}>₱{totalEarnings.toLocaleString()}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
              <TrendingUp style={{ width: '14px', height: '14px', color: '#00BF63' }} />
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#00BF63' }}>+12%</span>
            </div>
          </Link>

          {/* Pending */}
          <div style={styles.kpiCard}>
            <div style={{...styles.kpiIconContainer, backgroundColor: '#FEF3C7'}}>
              <Clock style={{ width: '24px', height: '24px', color: '#F59E0B' }} />
            </div>
            <p style={styles.kpiLabel}>Pending</p>
            <p style={styles.kpiValue}>₱{pendingEarnings.toLocaleString()}</p>
          </div>

          {/* Processing */}
          <div style={styles.kpiCard}>
            <div style={{...styles.kpiIconContainer, backgroundColor: '#DBEAFE'}}>
              <CreditCard style={{ width: '24px', height: '24px', color: '#3B82F6' }} />
            </div>
            <p style={styles.kpiLabel}>Processing</p>
            <p style={styles.kpiValue}>₱{inProcessing.toLocaleString()}</p>
          </div>

          {/* Paid Out */}
          <div style={styles.kpiCard}>
            <div style={{...styles.kpiIconContainer, backgroundColor: '#D1FAE5'}}>
              <CheckCircle style={{ width: '24px', height: '24px', color: '#00BF63' }} />
            </div>
            <p style={styles.kpiLabel}>Paid Out</p>
            <p style={styles.kpiValue}>₱{paidOut.toLocaleString()}</p>
          </div>
        </div>

        {/* Second Row: Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {/* Left: Earnings Trend */}
          <div style={styles.card}>
            <div style={styles.sectionTitle}>
              <div style={styles.sectionTitleBar}></div>
              <h2 style={styles.sectionTitleText}>Earnings Trend</h2>
            </div>
            <div style={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={earningsTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    stroke="#E5E7EB"
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    stroke="#E5E7EB"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number | string) => [`₱${value}`, 'Earnings']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#00BF63" 
                    strokeWidth={3}
                    dot={{ fill: '#00BF63', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: Service Category */}
          <div style={styles.card}>
            <div style={styles.sectionTitle}>
              <div style={styles.sectionTitleBar}></div>
              <h2 style={styles.sectionTitleText}>Service Category</h2>
            </div>
            <div style={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={serviceCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number | string) => [`₱${value}`, 'Earnings']}
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Legend */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
                {serviceCategoryData.map((item) => (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: item.color }} />
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Third Row: Performance Metrics & Top Earning Days */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {/* Left: Performance Metrics */}
          <div style={styles.card}>
            <div style={styles.sectionTitle}>
              <div style={styles.sectionTitleBar}></div>
              <h2 style={styles.sectionTitleText}>Performance Metrics</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* Completed Bookings */}
              <div style={styles.metricsCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{...styles.metricIcon, backgroundColor: '#EEF2FF'}}>
                    <Briefcase style={{ width: '20px', height: '20px', color: '#6366F1' }} />
                  </div>
                  <p style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>Completed</p>
                </div>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>{completedBookings}</p>
                <p style={{ fontSize: '11px', color: '#9CA3AF' }}>Bookings</p>
              </div>

              {/* Average Booking Value */}
              <div style={styles.metricsCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{...styles.metricIcon, backgroundColor: '#FEF3C7'}}>
                    <CircleDollarSign style={{ width: '20px', height: '20px', color: '#F59E0B' }} />
                  </div>
                  <p style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>Avg. Value</p>
                </div>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>₱{avgBookingValue.toLocaleString()}</p>
                <p style={{ fontSize: '11px', color: '#9CA3AF' }}>Per Booking</p>
              </div>

              {/* Total Tips */}
              <div style={styles.metricsCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{...styles.metricIcon, backgroundColor: '#D1FAE5'}}>
                    <DollarSign style={{ width: '20px', height: '20px', color: '#00BF63' }} />
                  </div>
                  <p style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>Total Tips</p>
                </div>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>₱{totalTips.toLocaleString()}</p>
                <p style={{ fontSize: '11px', color: '#00BF63' }}>+8% vs last period</p>
              </div>

              {/* Platform Fees */}
              <div style={styles.metricsCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{...styles.metricIcon, backgroundColor: '#F3F4F6'}}>
                    <FileText style={{ width: '20px', height: '20px', color: '#6B7280' }} />
                  </div>
                  <p style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>Platform Fees</p>
                </div>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#9CA3AF' }}>₱{platformFees.toLocaleString()}</p>
                <p style={{ fontSize: '11px', color: '#9CA3AF' }}>15% of total</p>
              </div>
            </div>
          </div>

          {/* Right: Top Earning Days */}
          <div style={styles.card}>
            <div style={styles.sectionTitle}>
              <div style={styles.sectionTitleBar}></div>
              <h2 style={styles.sectionTitleText}>Top Earning Days</h2>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '20px' }}>
              {topEarningDays.map((item) => (
                <div key={item.day} style={styles.topDayItem}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: '600', fontSize: '14px', color: '#374151' }}>{item.day}</span>
                      <span style={{ fontSize: '13px', color: '#6B7280' }}>₱{item.amount.toLocaleString()}</span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#00BF63' }}>{item.percentage}%</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div style={{...styles.progressFill, width: `${item.percentage}%`}} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fourth Row: Action Buttons & Efficiency Tip */}
        <div style={{ marginBottom: '32px' }}>
          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <Link 
              to="/provider/earningsdetails"
              style={{
                ...styles.button, 
                ...styles.secondaryButton,
                textDecoration: 'none',
              }}
            >
              <Eye style={{ width: '20px', height: '20px' }} />
              <span>View Earnings Details</span>
            </Link>
            <Link
              to="/provider/payout"
              style={{
                ...styles.button,
                ...styles.primaryButton,
                textDecoration: 'none',
              }}
            >
              <Wallet style={{ width: '20px', height: '20px' }} />
              <span>Request Payout</span>
            </Link>
            <button style={{...styles.button, ...styles.secondaryButton}}>
              <Download style={{ width: '20px', height: '20px' }} />
              <span>Download Statement</span>
            </button>
          </div>

          {/* Efficiency Tip */}
          <div style={styles.tipCard}>
            <div style={styles.tipIcon}>
              <TrendingUp style={{ width: '20px', height: '20px', color: '#00BF63' }} />
            </div>
            <div>
              <p style={{ fontWeight: '600', fontSize: '14px', color: '#111827', marginBottom: '8px' }}>
                Efficiency Tip
              </p>
              <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>
                Your peak earning hours are <span style={{ fontWeight: '600', color: '#00BF63' }}>10 AM - 2 PM on weekdays</span>. 
                Consider scheduling more availability during these times to maximize earnings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
