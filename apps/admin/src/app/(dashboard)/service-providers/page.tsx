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
import { Search, Star, TrendingUp, Users, CheckCircle, AlertCircle, Upload, Download, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useData } from "../../../contexts/DataContext";
import type { ProviderStatus, ServiceProvider } from "../../../types";
import { ProviderDetailsDrawer } from "../../components/ProviderDetailsDrawer";
import { CSVUploadModal } from "../../components/CSVUploadModal";
import { toast } from "sonner";

export default function ServiceProvidersPage() {
  const { serviceProviders, getCategoryById, updateProviderStatus } = useData();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredProviders = useMemo(() => {
    return serviceProviders.filter((provider) => {
      const category = getCategoryById(provider.categoryId);
      const matchesSearch =
        provider.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === "all" || provider.categoryId === categoryFilter;
      const matchesStatus = statusFilter === "all" || provider.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [serviceProviders, searchTerm, categoryFilter, statusFilter, getCategoryById]);

  const stats = useMemo(() => {
    const avgRating = serviceProviders.length > 0 
      ? serviceProviders.reduce((sum, p) => sum + p.rating, 0) / serviceProviders.length 
      : 0;
    const avgCompletionRate = serviceProviders.length > 0 
      ? serviceProviders.reduce((sum, p) => sum + p.completionRate, 0) / serviceProviders.length 
      : 0;
    const totalBookings = serviceProviders.reduce((sum, p) => sum + p.totalBookings, 0);

    return [
      {
        title: "Total Service Providers",
        value: serviceProviders.length.toString(),
        change: `${serviceProviders.filter((p) => p.status === "Active").length} active`,
        icon: Users,
        color: "text-[#16A34A]",
        bgColor: "bg-[#DCFCE7]",
      },
      {
        title: "Average Rating",
        value: avgRating.toFixed(2),
        change: "Platform average",
        icon: Star,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
      },
      {
        title: "Avg Completion Rate",
        value: `${avgCompletionRate.toFixed(1)}%`,
        change: "Good performance",
        icon: CheckCircle,
        color: "text-[#16A34A]",
        bgColor: "bg-[#DCFCE7]",
      },
      {
        title: "Total Bookings",
        value: totalBookings.toString(),
        change: "All time",
        icon: TrendingUp,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
    ];
  }, [serviceProviders]);

  const getStatusBadge = (status: ProviderStatus) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "Inactive":
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Inactive
          </Badge>
        );
      case "Suspended":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Suspended
          </Badge>
        );
    }
  };

  const handleViewDetails = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedProvider(null), 300);
  };

  const handleToggleStatus = (providerId: string, newStatus: ProviderStatus) => {
    updateProviderStatus(providerId, newStatus);
    toast.success(`Provider status updated to ${newStatus}`);
  };

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleUploadCSV = async (file: File): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  const handleExportCSV = () => {
    try {
      const headers = [
        "Provider ID", "Business Name", "Category", "Contact Person", "Email", 
        "Phone", "Location", "Rating", "Total Bookings", "Completed Bookings", 
        "Completion Rate", "Status", "Total Revenue", "Total Earnings", "Joined Date",
      ];

      const rows = filteredProviders.map((provider) => [
        provider.id,
        provider.businessName,
        getCategoryById(provider.categoryId)?.name || "N/A",
        provider.contactPerson,
        provider.email,
        provider.phone,
        provider.location,
        provider.rating,
        provider.totalBookings,
        provider.completedBookings,
        `${provider.completionRate}%`,
        provider.status,
        `₱${provider.totalRevenue.toFixed(2)}`,
        `₱${provider.totalEarnings.toFixed(2)}`,
        new Date(provider.joinedDate).toLocaleDateString("en-US"),
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `service-providers-${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("CSV exported successfully", {
        description: `${filteredProviders.length} providers exported`,
      });
    } catch (error) {
      toast.error("Export failed");
    }
  };

  return (
    <div className="space-y-6 font-['Inter',sans-serif]">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-gray-900 font-['Poppins',sans-serif]">Service Providers</h1>
        <p className="text-gray-500">
          Manage and monitor all verified service providers on the platform.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">{stat.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Table Card */}
      <Card className="border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 pb-6 border-b border-gray-100">
          <CardTitle className="text-xl font-['Poppins',sans-serif]">Provider Database</CardTitle>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenUploadModal}
              className="gap-2 h-10 border-gray-200"
            >
              <Upload className="w-4 h-4" />
              Import CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              className="gap-2 h-10 border-gray-200"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button
              size="sm"
              className="bg-[#00BF63] hover:bg-[#00A055] text-white gap-2 h-10 px-4"
              onClick={() => toast.info("PDF Export coming soon")}
            >
              <FileText className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Filters Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search business, ID, or contact..."
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
                <SelectItem value="Home Maintenance & Repair">Home Maintenance</SelectItem>
                <SelectItem value="Beauty, Wellness & Personal Care">Beauty & Wellness</SelectItem>
                <SelectItem value="Domestic & Cleaning Services">Cleaning Services</SelectItem>
                <SelectItem value="Automotive & Tech Support">Auto & Tech</SelectItem>
                <SelectItem value="Pet Services">Pet Services</SelectItem>
                <SelectItem value="Events & Entertainment">Events</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-11 rounded-xl border-gray-200">
                <SelectValue placeholder="Status: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-xl border border-gray-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="font-bold text-gray-700">Provider ID</TableHead>
                  <TableHead className="font-bold text-gray-700">Business Name</TableHead>
                  <TableHead className="font-bold text-gray-700">Category</TableHead>
                  <TableHead className="font-bold text-gray-700">Contact</TableHead>
                  <TableHead className="font-bold text-gray-700 text-center">Rating</TableHead>
                  <TableHead className="font-bold text-gray-700 text-center">Bookings</TableHead>
                  <TableHead className="font-bold text-gray-700">Status</TableHead>
                  <TableHead className="font-bold text-gray-700 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-20 text-gray-400 font-medium">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-8 h-8 opacity-20" />
                        No service providers found.
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProviders.map((provider) => (
                    <TableRow key={provider.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <TableCell className="font-mono font-bold text-[#00BF63]">{provider.id}</TableCell>
                      <TableCell className="font-bold text-gray-900">{provider.businessName}</TableCell>
                      <TableCell className="text-gray-500 font-medium text-sm">
                        {getCategoryById(provider.categoryId)?.name || "N/A"}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 text-sm">{provider.contactPerson}</span>
                          <span className="text-xs text-gray-400">{provider.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-gray-900">{provider.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-bold text-gray-900">{provider.totalBookings}</TableCell>
                      <TableCell>{getStatusBadge(provider.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => handleViewDetails(provider)}
                          className="bg-[#00BF63] hover:bg-[#00A055] text-white rounded-lg px-4 font-semibold"
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {selectedProvider && (
        <ProviderDetailsDrawer
          provider={selectedProvider}
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          categoryName={getCategoryById(selectedProvider.categoryId)?.name || "N/A"}
          onToggleStatus={handleToggleStatus}
        />
      )}

      <CSVUploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        onUpload={handleUploadCSV}
      />
    </div>
  );
}
