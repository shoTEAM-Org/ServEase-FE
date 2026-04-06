"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  Search,
  Filter,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

// Export applications data for use in detail page
export const applications = [
  {
    applicationId: "APP-2026-0234",
    businessName: "Tutor Excellence Hub",
    ownerName: "Roberto Miguel Cruz",
    category: "Education & Professional Services",
    dateApplied: "2026-03-01",
    location: "Taguig City, Metro Manila",
    status: "pending",
    providerId: "SE-ED-003",
  },
  {
    applicationId: "APP-2026-0235",
    businessName: "Wellness Massage Therapy",
    ownerName: "Carmen Grace Alvarez",
    category: "Beauty Wellness & Personal Care",
    dateApplied: "2026-03-03",
    location: "Manila City, Metro Manila",
    status: "pending",
    providerId: "SE-BW-009",
  },
  {
    applicationId: "APP-2026-0236",
    businessName: "Prime Cleaning Solutions",
    ownerName: "Fernando Jose Santos",
    category: "Domestic & Cleaning Services",
    dateApplied: "2026-03-02",
    location: "Quezon City, Metro Manila",
    status: "pending",
    providerId: "SE-DC-016",
  },
  {
    applicationId: "APP-2026-0237",
    businessName: "AutoCare Express",
    ownerName: "Leonardo David Reyes",
    category: "Automotive & Tech Support",
    dateApplied: "2026-03-04",
    location: "Makati City, Metro Manila",
    status: "pending",
    providerId: "SE-AT-017",
  },
  {
    applicationId: "APP-2026-0238",
    businessName: "PetCare Veterinary Services",
    ownerName: "Victoria Anne Lopez",
    category: "Pet Services",
    dateApplied: "2026-03-03",
    location: "Pasig City, Metro Manila",
    status: "pending",
    providerId: "SE-PS-018",
  },
  {
    applicationId: "APP-2026-0239",
    businessName: "EventMasters Pro",
    ownerName: "Christopher James Diaz",
    category: "Events & Entertainment",
    dateApplied: "2026-03-01",
    location: "Pasay City, Metro Manila",
    status: "pending",
    providerId: "SE-EE-019",
  },
  {
    applicationId: "APP-2026-0240",
    businessName: "HandyFix Home Services",
    ownerName: "Michelle Anne Garcia",
    category: "Home Maintenance & Repair",
    dateApplied: "2026-03-02",
    location: "Mandaluyong City, Metro Manila",
    status: "pending",
    providerId: "SE-HM-020",
  },
  {
    applicationId: "APP-2026-0228",
    businessName: "ElectroPro Electricians",
    ownerName: "Antonio Carlos Rivera",
    category: "Home Maintenance & Repair",
    dateApplied: "2024-01-20",
    location: "Malabon City, Metro Manila",
    status: "approved",
    providerId: "SE-HM-015",
  },
  {
    applicationId: "APP-2026-0215",
    businessName: "HomeFixPro Manila",
    ownerName: "Juan Carlos Reyes",
    category: "Home Maintenance & Repair",
    dateApplied: "2024-01-10",
    location: "Makati City, Metro Manila",
    status: "approved",
    providerId: "SE-HM-001",
  },
  {
    applicationId: "APP-2026-0221",
    businessName: "Glow Beauty Spa",
    ownerName: "Maria Elena Santos",
    category: "Beauty Wellness & Personal Care",
    dateApplied: "2024-02-15",
    location: "Quezon City, Metro Manila",
    status: "approved",
    providerId: "SE-BW-002",
  },
  {
    applicationId: "APP-2026-0198",
    businessName: "QuickTech Repairs",
    ownerName: "Santiago Miguel Torres",
    category: "Automotive & Tech Support",
    dateApplied: "2023-12-05",
    location: "Valenzuela City, Metro Manila",
    status: "rejected",
    providerId: "SE-AT-021",
  },
  {
    applicationId: "APP-2026-0205",
    businessName: "CleanSwift Services",
    ownerName: "Angelica Rose Mendoza",
    category: "Domestic & Cleaning Services",
    dateApplied: "2024-01-08",
    location: "Paranaque City, Metro Manila",
    status: "rejected",
    providerId: "SE-DC-022",
  },
];

const stats = [
  {
    title: "Pending Review",
    value: "7",
    subtitle: "Awaiting approval",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    title: "Approved Today",
    value: "3",
    subtitle: "Applications processed",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Requires Action",
    value: "2",
    subtitle: "Urgent reviews needed",
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
];

export default function ProviderApplicationsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [categoryFilter, setCategoryFilter] = useState("all");

  let filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || app.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Sort: pending first, then by date (newest first)
  filteredApplications = [...filteredApplications].sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") return -1;
    if (a.status !== "pending" && b.status === "pending") return 1;
    return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime();
  });

  const getStatusBadge = (status: string) => {
    if (status === "pending") {
      return (
        <Badge className="bg-amber-100 text-amber-700 border-amber-200">
          Pending Review
        </Badge>
      );
    }
    if (status === "approved") {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          Approved
        </Badge>
      );
    }
    if (status === "rejected") {
      return (
        <Badge className="bg-red-100 text-red-700 border-red-200">Rejected</Badge>
      );
    }
    return <Badge variant="outline">{status}</Badge>;
  };

  const pendingCount = applications.filter((app) => app.status === "pending").length;

  return (
    <div className="space-y-6 font-['Inter',sans-serif]">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-gray-900 font-['Poppins',sans-serif]">Provider Applications</h1>
        <p className="text-gray-500">
          Review and verify new service provider applications to maintain platform quality.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">{stat.subtitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Applications Table Card */}
      <Card className="border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-gray-100">
          <CardTitle className="text-xl font-['Poppins',sans-serif]">Application Queue</CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
            <Filter className="w-4 h-4 text-[#00BF63]" />
            <span className="font-bold text-gray-700">{filteredApplications.length}</span>
            <span>of {applications.length} applications</span>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Search & Filter Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or application ID..."
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
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">
                  Pending Review ({pendingCount})
                </SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-11 rounded-xl border-gray-200">
                <SelectValue placeholder="Category: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Home Maintenance & Repair">Home Maintenance</SelectItem>
                <SelectItem value="Beauty Wellness & Personal Care">Beauty & Wellness</SelectItem>
                <SelectItem value="Education & Professional Services">Education & Prof.</SelectItem>
                <SelectItem value="Domestic & Cleaning Services">Cleaning Services</SelectItem>
                <SelectItem value="Pet Services">Pet Services</SelectItem>
                <SelectItem value="Events & Entertainment">Events</SelectItem>
                <SelectItem value="Automotive & Tech Support">Auto & Tech</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="font-bold text-gray-700">Application ID</TableHead>
                  <TableHead className="font-bold text-gray-700">Business Name</TableHead>
                  <TableHead className="font-bold text-gray-700">Owner Name</TableHead>
                  <TableHead className="font-bold text-gray-700">Category</TableHead>
                  <TableHead className="font-bold text-gray-700">Date Applied</TableHead>
                  <TableHead className="font-bold text-gray-700">Status</TableHead>
                  <TableHead className="font-bold text-gray-700 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-20 text-gray-400 font-medium">
                      <div className="flex flex-col items-center gap-2">
                        <Filter className="w-8 h-8 opacity-20" />
                        No applications found matching your criteria.
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApplications.map((app) => (
                    <TableRow key={app.applicationId} className="border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <TableCell className="font-mono font-bold text-gray-900">{app.applicationId}</TableCell>
                      <TableCell className="font-bold text-gray-900">{app.businessName}</TableCell>
                      <TableCell className="text-gray-700 font-medium">{app.ownerName}</TableCell>
                      <TableCell>
                        <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                          {app.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-500 font-medium">
                          {new Date(app.dateApplied).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/provider-applications/${app.applicationId}`)}
                          className="gap-2 h-9 border-[#00BF63] text-[#00BF63] hover:bg-[#00BF63] hover:text-white font-bold transition-all"
                        >
                          <Eye className="w-4 h-4" />
                          Review
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
