import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Package,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { fetchAdminJson } from "../lib/adminApi";
import { toast } from "sonner";

type Customer = {
  id: string;
  full_name: string;
  email: string;
  contact_number: string;
  status: string;
  created_at: string;
  booking_count: number;
};

type CustomersResponse = {
  customers: Customer[];
  total: number;
  page: number;
  limit: number;
};

const LIMIT = 20;

function CustomersSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-[480px] w-full rounded-xl" />
    </>
  );
}

export function Customers() {
  const [data, setData] = useState<CustomersResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  async function load(targetPage: number) {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchAdminJson<CustomersResponse>(
        `/api/admin/v1/users/customers?page=${targetPage}&limit=${LIMIT}`
      );
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load customers.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void load(page);
  }, [page]);

  async function toggleStatus(customer: Customer) {
    const newStatus = customer.status.toLowerCase() === "active" ? "suspended" : "active";
    setTogglingId(customer.id);
    try {
      await fetchAdminJson<{ ok: boolean }>(`/api/admin/v1/users/customers/${customer.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      void load(page);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update status.");
    } finally {
      setTogglingId(null);
    }
  }

  const customers = data?.customers ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);
  const rangeStart = (page - 1) * LIMIT + 1;
  const rangeEnd = Math.min(page * LIMIT, total);

  const filtered = customers.filter(
    (c) =>
      c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = customers.filter(
    (c) => c.status.toLowerCase() === "active"
  ).length;
  const totalBookings = customers.reduce((sum, c) => sum + c.booking_count, 0);
  const newestMember =
    customers.length > 0
      ? new Date(customers[0].created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  const stats = [
    {
      title: "Total Customers",
      value: total.toLocaleString(),
      change: "All registered customers",
      icon: Users,
      color: "text-[#16A34A]",
      bgColor: "bg-[#DCFCE7]",
    },
    {
      title: "Active (this page)",
      value: activeCount.toString(),
      change: `of ${customers.length} on this page`,
      icon: UserCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Bookings (this page)",
      value: totalBookings.toLocaleString(),
      change: "Combined booking count",
      icon: Package,
      color: "text-[#16A34A]",
      bgColor: "bg-[#DCFCE7]",
    },
    {
      title: "Newest Member",
      value: newestMember,
      change: "Most recently joined",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-500 mt-1">
          Manage and monitor all customers on the platform
        </p>
      </div>

      {error ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex items-start gap-3 p-6 text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Failed to load customers</p>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {isLoading ? (
        <CustomersSkeleton />
      ) : (
        <>
          {/* KPI Cards */}
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

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 max-w-md relative">
                <Input
                  placeholder="Search by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4"
                />
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Member Since</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center py-8 text-gray-500"
                        >
                          No customers found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filtered.map((customer) => {
                        const isActive = customer.status.toLowerCase() === "active";
                        const isToggling = togglingId === customer.id;
                        return (
                          <TableRow key={customer.id}>
                            <TableCell>
                              <span className="font-mono font-semibold text-[#16A34A] text-sm">
                                {customer.id.slice(0, 8)}…
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="font-medium text-gray-900">
                                {customer.full_name}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-600">{customer.email}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-600">
                                {customer.contact_number || "—"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-600">
                                {new Date(customer.created_at).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="font-semibold text-gray-900">
                                {customer.booking_count}
                              </span>
                            </TableCell>
                            <TableCell>
                              {isActive ? (
                                <Badge className="bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Active
                                </Badge>
                              ) : (
                                <Badge variant="secondary">
                                  {customer.status}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant={isActive ? "destructive" : "outline"}
                                disabled={isToggling}
                                onClick={() => void toggleStatus(customer)}
                                className="text-xs"
                              >
                                {isToggling
                                  ? "Updating…"
                                  : isActive
                                  ? "Suspend"
                                  : "Activate"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-500">
                  {total === 0
                    ? "No customers"
                    : `Showing ${rangeStart}–${rangeEnd} of ${total} customers`}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
