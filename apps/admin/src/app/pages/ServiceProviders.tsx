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
import { Search, Star, TrendingUp, Users, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useData } from "../../contexts/DataContext";
import type { ProviderStatus } from "../../types";

export function ServiceProviders() {
  const { serviceProviders, getCategoryById } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Service Providers</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Manage all service providers on the platform
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-gray-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Table */}
      <Card className="border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">All Service Providers</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, ID, contact person..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="text-sm">
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
              <SelectTrigger className="text-sm">
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
                <TableRow className="bg-gray-50/60">
                  <TableHead className="text-xs">Provider ID</TableHead>
                  <TableHead className="text-xs">Business Name</TableHead>
                  <TableHead className="text-xs">Category</TableHead>
                  <TableHead className="text-xs">Contact Person</TableHead>
                  <TableHead className="text-xs">Location</TableHead>
                  <TableHead className="text-xs">Rating</TableHead>
                  <TableHead className="text-xs">Bookings</TableHead>
                  <TableHead className="text-xs">Completion</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-10 text-gray-400 text-sm">
                      No service providers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProviders.map((provider) => (
                    <TableRow key={provider.id} className="hover:bg-gray-50/50">
                      <TableCell>
                        <span className="font-mono font-semibold text-[#16A34A] text-sm">
                          {provider.id}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-gray-900 text-sm">
                          {provider.businessName}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-gray-600">
                          {getCategoryById(provider.categoryId)?.name || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {provider.contactPerson}
                          </p>
                          <p className="text-xs text-gray-400">{provider.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-gray-600">{provider.location}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-gray-900 text-sm">{provider.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-gray-900 text-sm">
                          {provider.totalBookings}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            provider.completionRate >= 95
                              ? "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0] text-xs"
                              : provider.completionRate >= 85
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200 text-xs"
                              : "bg-red-50 text-red-700 border-red-200 text-xs"
                          }
                        >
                          {provider.completionRate}%
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(provider.status)}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => navigate(`/service-providers/${provider.id}`)}
                          className="bg-[#16A34A] hover:bg-[#15803D] text-xs h-8 px-3"
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
    </div>
  );
}