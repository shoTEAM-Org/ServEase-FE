import { useState, useMemo } from "react";
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
import { Search, Star, TrendingUp, Users, CheckCircle, AlertCircle, Upload, Download, FileText } from "lucide-react";
import { useNavigate } from "react-router";
import { useData } from "../../contexts/DataContext";
import type { ProviderStatus, ServiceProvider } from "../../types";
import { ProviderDetailsDrawer } from "../components/ProviderDetailsDrawer";
import { CSVUploadModal } from "../components/CSVUploadModal";
import { toast } from "sonner";

export function ServiceProviders() {
  const { serviceProviders, getCategoryById, updateProviderStatus } = useData();
  const navigate = useNavigate();
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
    const avgRating = serviceProviders.reduce((sum, p) => sum + p.rating, 0) / serviceProviders.length;
    const avgCompletionRate = serviceProviders.reduce((sum, p) => sum + p.completionRate, 0) / serviceProviders.length;
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
    navigate(`/service-providers/${provider.id}`);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    // Add a small delay before clearing the selected provider to allow the close animation to complete
    setTimeout(() => setSelectedProvider(null), 300);
  };

  const handleToggleStatus = (providerId: string, newStatus: ProviderStatus) => {
    updateProviderStatus(providerId, newStatus);
  };

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleUploadCSV = async (file: File): Promise<void> => {
    // Simulate file processing
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // In a real implementation, you would:
        // 1. Parse the CSV file
        // 2. Validate the data
        // 3. Send it to your backend API
        // 4. Update the state with new data

        // For now, just simulate success
        resolve();
      }, 2000);
    });
  };

  const handleExportCSV = () => {
    try {
      // Prepare CSV headers
      const headers = [
        "Provider ID",
        "Business Name",
        "Category",
        "Contact Person",
        "Email",
        "Phone",
        "Location",
        "Rating",
        "Total Bookings",
        "Completed Bookings",
        "Completion Rate",
        "Status",
        "Total Revenue",
        "Total Earnings",
        "Joined Date",
      ];

      // Prepare CSV rows
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

      // Create CSV content
      const csvContent = [
        headers.join(","),
        ...rows.map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
        ),
      ].join("\n");

      // Create blob and download
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
      toast.error("Export failed", {
        description: "Failed to export CSV file",
      });
    }
  };

  const handleExportPDF = () => {
    toast.info("PDF Export", {
      description: "PDF export functionality will be available soon",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Service Providers</h1>
        <p className="text-gray-500 mt-1">
          Manage all service providers on the platform
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 pb-4">
          <CardTitle>All Service Providers</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenUploadModal}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              Import CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button
              size="sm"
              onClick={handleExportPDF}
              className="bg-[#00BF63] hover:bg-[#00A855] text-white gap-2"
            >
              <FileText className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, ID, contact person..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Category" />
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

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider ID</TableHead>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Completion Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                      No service providers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProviders.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell>
                        <span className="font-mono font-semibold text-[#16A34A]">
                          {provider.id}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-gray-900">
                          {provider.businessName}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {getCategoryById(provider.categoryId)?.name || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {provider.contactPerson}
                          </p>
                          <p className="text-xs text-gray-500">{provider.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{provider.location}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-gray-900">{provider.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-gray-900">
                          {provider.totalBookings}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            provider.completionRate >= 95
                              ? "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]"
                              : provider.completionRate >= 90
                              ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                              : "bg-red-100 text-red-700 border-red-200"
                          }
                        >
                          {provider.completionRate}%
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(provider.status)}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => handleViewDetails(provider)}
                          className="bg-[#16A34A] hover:bg-[#15803D]"
                        >
                          View Details
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

      {/* Provider Details Drawer */}
      <ProviderDetailsDrawer
        provider={selectedProvider}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        categoryName={
          selectedProvider
            ? getCategoryById(selectedProvider.categoryId)?.name || "N/A"
            : ""
        }
        onToggleStatus={handleToggleStatus}
      />

      {/* CSV Upload Modal */}
      <CSVUploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        onUpload={handleUploadCSV}
      />
    </div>
  );
}