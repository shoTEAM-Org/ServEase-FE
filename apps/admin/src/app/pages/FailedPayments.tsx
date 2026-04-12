import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  XCircle,
  Search,
  AlertTriangle,
  CreditCard,
  RefreshCw,
  DollarSign,
} from "lucide-react";
import { useData } from "../../contexts/DataContext";

export function FailedPayments() {
  const { transactions, getCustomerById, getProviderById, getCategoryById, bookings } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [reasonFilter, setReasonFilter] = useState<string>("all");

  // Get failed payment transactions
  const failedPayments = useMemo(() => {
    return transactions.filter((t) => t.paymentStatus === "Failed");
  }, [transactions]);

  const filteredPayments = useMemo(() => {
    return failedPayments.filter((payment) => {
      const customer = getCustomerById(payment.customerId);
      const provider = getProviderById(payment.providerId);

      const matchesSearch =
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider?.businessName.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [failedPayments, searchTerm, getCustomerById, getProviderById]);

  const stats = useMemo(() => {
    const totalFailed = failedPayments.length;
    const totalAmount = failedPayments.reduce((sum, p) => sum + p.amount, 0);
    const uniqueCustomers = new Set(failedPayments.map((p) => p.customerId)).size;

    // Calculate failure reasons (mock data for now)
    const insufficientFunds = Math.floor(totalFailed * 0.4);
    const invalidCard = Math.floor(totalFailed * 0.3);
    const networkError = Math.floor(totalFailed * 0.2);
    const otherReasons = totalFailed - insufficientFunds - invalidCard - networkError;

    return {
      totalFailed,
      totalAmount,
      uniqueCustomers,
      insufficientFunds,
      invalidCard,
      networkError,
      otherReasons,
    };
  }, [failedPayments]);

  // Mock failure reasons for display
  const getFailureReason = (id: string) => {
    const reasons = [
      "Insufficient funds",
      "Invalid card details",
      "Network timeout",
      "Card declined",
      "Expired card",
    ];
    const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return reasons[hash % reasons.length];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Failed Payments</h1>
        <p className="text-gray-500 mt-1">
          Monitor and retry failed card payment transactions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Failed</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalFailed}</p>
                <p className="text-xs text-gray-400 mt-1">Payment attempts</p>
              </div>
              <div className="p-3 rounded-lg bg-red-50">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ₱{(stats.totalAmount / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-gray-400 mt-1">Failed revenue</p>
              </div>
              <div className="p-3 rounded-lg bg-red-50">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Affected Customers</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.uniqueCustomers}</p>
                <p className="text-xs text-gray-400 mt-1">Unique customers</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Failure Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {transactions.length > 0
                    ? ((stats.totalFailed / transactions.length) * 100).toFixed(1)
                    : 0}
                  %
                </p>
                <p className="text-xs text-gray-400 mt-1">Of all transactions</p>
              </div>
              <div className="p-3 rounded-lg bg-red-50">
                <CreditCard className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Failure Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Failure Reasons Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-500">Insufficient Funds</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.insufficientFunds}</p>
              <p className="text-xs text-gray-400 mt-1">
                {stats.totalFailed > 0
                  ? ((stats.insufficientFunds / stats.totalFailed) * 100).toFixed(0)
                  : 0}
                % of failures
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-500">Invalid Card</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.invalidCard}</p>
              <p className="text-xs text-gray-400 mt-1">
                {stats.totalFailed > 0
                  ? ((stats.invalidCard / stats.totalFailed) * 100).toFixed(0)
                  : 0}
                % of failures
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-500">Network Error</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.networkError}</p>
              <p className="text-xs text-gray-400 mt-1">
                {stats.totalFailed > 0
                  ? ((stats.networkError / stats.totalFailed) * 100).toFixed(0)
                  : 0}
                % of failures
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-500">Other Reasons</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.otherReasons}</p>
              <p className="text-xs text-gray-400 mt-1">
                {stats.totalFailed > 0
                  ? ((stats.otherReasons / stats.totalFailed) * 100).toFixed(0)
                  : 0}
                % of failures
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <CardTitle>Failed Payment Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by ID, booking, customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Failure Reason</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      No failed payments found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment) => {
                    const customer = getCustomerById(payment.customerId);
                    const provider = getProviderById(payment.providerId);

                    return (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <span className="font-mono font-semibold text-[#16A34A]">
                            {payment.id}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-mono text-sm text-gray-600">
                            {payment.bookingId}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {customer?.name || "N/A"}
                            </p>
                            <p className="text-xs text-gray-500">{customer?.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">
                            {provider?.businessName || "N/A"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-bold text-gray-900">
                            ₱{payment.amount.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">{payment.paymentMethod}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-700 border-red-200">
                            <XCircle className="w-3 h-3 mr-1" />
                            {getFailureReason(payment.id)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">
                            {new Date(payment.timestamp).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Retry
                          </Button>
                        </TableCell>
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
