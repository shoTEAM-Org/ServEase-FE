"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Search,
  Filter,
  Download,
  DollarSign,
  TrendingUp,
  CreditCard,
  Receipt,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useData } from "../../../contexts/DataContext";
import type { PaymentStatus } from "../../../types";

export default function TransactionsPage() {
  const { transactions, getCustomerById, getProviderById, getCategoryById } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>("all");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const customer = getCustomerById(transaction.customerId);
      const provider = getProviderById(transaction.providerId);

      const matchesSearch =
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider?.businessName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || transaction.paymentStatus === statusFilter;
      const matchesPaymentMethod =
        paymentMethodFilter === "all" || transaction.paymentMethod === paymentMethodFilter;

      return matchesSearch && matchesStatus && matchesPaymentMethod;
    });
  }, [transactions, searchTerm, statusFilter, paymentMethodFilter, getCustomerById, getProviderById]);

  const stats = useMemo(() => {
    const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalCommission = filteredTransactions.reduce((sum, t) => sum + t.commissionAmount, 0);
    const successfulCount = filteredTransactions.filter((t) => t.paymentStatus === "Paid").length;

    return {
      total: filteredTransactions.length,
      totalAmount,
      totalCommission,
      successfulCount,
      successRate: filteredTransactions.length > 0 ? (successfulCount / filteredTransactions.length) * 100 : 0,
    };
  }, [filteredTransactions]);

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case "Paid":
        return (
          <Badge className="bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "Failed":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      case "Refunded":
        return (
          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Refunded
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 font-['Inter',sans-serif]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-['Poppins',sans-serif]">Financial Transactions</h1>
          <p className="text-gray-500">
            Monitor and audit all cash-flows and payments across the ServEase ecosystem.
          </p>
        </div>
        <Button className="bg-[#00BF63] hover:bg-[#00A055] text-white gap-2 font-bold h-11 px-6 rounded-xl shadow-lg shadow-green-100">
          <Download className="w-4 h-4" />
          Export Audit Log
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Volume", value: stats.total, icon: Receipt, color: "text-[#00BF63]", bg: "bg-[#DCFCE7]" },
          { label: "Total Revenue", value: `₱${(stats.totalAmount / 1000).toFixed(1)}K`, icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Commission", value: `₱${(stats.totalCommission / 1000).toFixed(1)}K`, icon: TrendingUp, color: "text-[#00BF63]", bg: "bg-[#DCFCE7]" },
          { label: "Success Rate", value: `${stats.successRate.toFixed(1)}%`, icon: CheckCircle, color: "text-[#00BF63]", bg: "bg-[#DCFCE7]" }
        ].map((item, idx) => (
          <Card key={idx} className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{item.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{item.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${item.bg}`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transactions Table Card */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-100 pb-6">
          <CardTitle className="text-xl font-['Poppins',sans-serif]">Transaction Records</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Filters Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by ID, booking, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 rounded-xl border-gray-200"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-11 rounded-xl border-gray-200">
                <SelectValue placeholder="Status: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>

            <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
              <SelectTrigger className="h-11 rounded-xl border-gray-200">
                <SelectValue placeholder="Payment Method: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Debit Card">Debit Card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="font-bold text-gray-700">Transaction ID</TableHead>
                  <TableHead className="font-bold text-gray-700">Booking & Entity</TableHead>
                  <TableHead className="font-bold text-gray-700">Category & Method</TableHead>
                  <TableHead className="font-bold text-gray-700 text-right">Amount</TableHead>
                  <TableHead className="font-bold text-gray-700 text-right">Commission</TableHead>
                  <TableHead className="font-bold text-[#00BF63] text-right">Earnings</TableHead>
                  <TableHead className="font-bold text-gray-700">Status</TableHead>
                  <TableHead className="font-bold text-gray-700">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-20 text-gray-400 font-medium">
                      <div className="flex flex-col items-center gap-2">
                        <Receipt className="w-8 h-8 opacity-20" />
                        No transaction data available.
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => {
                    const customer = getCustomerById(transaction.customerId);
                    const provider = getProviderById(transaction.providerId);
                    const category = getCategoryById(provider?.categoryId || "");

                    return (
                      <TableRow key={transaction.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <TableCell className="font-mono font-bold text-[#00BF63]">{transaction.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-xs font-mono text-gray-400 font-bold">{transaction.bookingId}</span>
                            <span className="font-bold text-gray-900 mt-0.5">{customer?.name || "N/A"}</span>
                            <span className="text-[10px] uppercase font-bold text-gray-400">{provider?.businessName || "N/A"}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-white bg-gray-500 px-1.5 py-0.5 rounded w-fit">{category?.name || "N/A"}</span>
                            <div className="flex items-center gap-1.5 text-gray-500">
                              <CreditCard className="w-3 h-3" />
                              <span className="text-xs font-medium">{transaction.paymentMethod}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-bold text-gray-900">₱{transaction.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-bold text-[#00BF63]">₱{transaction.commissionAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-bold text-blue-600">₱{transaction.providerEarnings.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(transaction.paymentStatus)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col text-xs text-gray-500 font-medium whitespace-nowrap">
                            <span>{new Date(transaction.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                            <span className="text-[10px]">{new Date(transaction.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                          </div>
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
