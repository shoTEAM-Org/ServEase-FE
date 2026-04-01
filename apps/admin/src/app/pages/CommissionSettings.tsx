import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Percent,
  Edit,
  Save,
  TrendingUp,
  DollarSign,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface CommissionRule {
  id: string;
  serviceCategory: string;
  commissionPercentage: number;
  lastUpdated: string;
  updatedBy: string;
}

const initialCommissionData: CommissionRule[] = [
  {
    id: "CR-001",
    serviceCategory: "Home Maintenance & Repair",
    commissionPercentage: 18,
    lastUpdated: "2026-02-15T10:30:00",
    updatedBy: "Admin User",
  },
  {
    id: "CR-002",
    serviceCategory: "Beauty, Wellness & Personal Care",
    commissionPercentage: 20,
    lastUpdated: "2026-02-15T10:30:00",
    updatedBy: "Admin User",
  },
  {
    id: "CR-003",
    serviceCategory: "Education & Professional Services",
    commissionPercentage: 15,
    lastUpdated: "2026-02-15T10:30:00",
    updatedBy: "Admin User",
  },
  {
    id: "CR-004",
    serviceCategory: "Domestic & Cleaning Services",
    commissionPercentage: 17,
    lastUpdated: "2026-02-15T10:30:00",
    updatedBy: "Admin User",
  },
  {
    id: "CR-005",
    serviceCategory: "Pet Services",
    commissionPercentage: 16,
    lastUpdated: "2026-02-15T10:30:00",
    updatedBy: "Admin User",
  },
  {
    id: "CR-006",
    serviceCategory: "Events & Entertainment",
    commissionPercentage: 22,
    lastUpdated: "2026-02-15T10:30:00",
    updatedBy: "Admin User",
  },
  {
    id: "CR-007",
    serviceCategory: "Automotive & Tech Support",
    commissionPercentage: 19,
    lastUpdated: "2026-02-15T10:30:00",
    updatedBy: "Admin User",
  },
  {
    id: "CR-008",
    serviceCategory: "Health & Fitness",
    commissionPercentage: 18,
    lastUpdated: "2026-02-15T10:30:00",
    updatedBy: "Admin User",
  },
];

export function CommissionSettings() {
  const [commissions, setCommissions] = useState<CommissionRule[]>(initialCommissionData);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState<CommissionRule | null>(null);
  const [newPercentage, setNewPercentage] = useState("");

  const defaultCommissionRate = 18;

  const handleEditClick = (commission: CommissionRule) => {
    setSelectedCommission(commission);
    setNewPercentage(commission.commissionPercentage.toString());
    setEditModalOpen(true);
  };

  const handleSaveCommission = () => {
    if (!selectedCommission) return;

    const percentage = parseFloat(newPercentage);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      alert("Please enter a valid percentage between 0 and 100");
      return;
    }

    setCommissions((prev) =>
      prev.map((comm) =>
        comm.id === selectedCommission.id
          ? {
              ...comm,
              commissionPercentage: percentage,
              lastUpdated: new Date().toISOString(),
              updatedBy: "Admin User",
            }
          : comm
      )
    );

    setEditModalOpen(false);
    setSelectedCommission(null);
    setNewPercentage("");
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const avgCommissionRate = (
    commissions.reduce((sum, comm) => sum + comm.commissionPercentage, 0) / commissions.length
  ).toFixed(1);

  const stats = [
    {
      title: "Default Commission Rate",
      value: `${defaultCommissionRate}%`,
      change: "Platform standard",
      icon: Percent,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Average Commission Rate",
      value: `${avgCommissionRate}%`,
      change: "Across all categories",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Active Categories",
      value: commissions.length.toString(),
      change: "With custom rates",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Lowest Commission",
      value: `${Math.min(...commissions.map((c) => c.commissionPercentage))}%`,
      change: "Cleaning Services",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Commission Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage platform commission rates for each service category
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

      {/* Commission Rules Table */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Rules by Service Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Category</TableHead>
                <TableHead>Commission Percentage</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Updated By</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissions.map((commission) => (
                <TableRow key={commission.id}>
                  <TableCell>
                    <span className="font-medium text-gray-900">
                      {commission.serviceCategory}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-[#00BF63]" />
                      <span className="font-medium text-[#00BF63]">
                        {commission.commissionPercentage}%
                      </span>
                      {commission.commissionPercentage > defaultCommissionRate ? (
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                          Above Default
                        </Badge>
                      ) : commission.commissionPercentage < defaultCommissionRate ? (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          Below Default
                        </Badge>
                      ) : (
                        <Badge variant="outline">Default</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-700">
                      {formatDateTime(commission.lastUpdated)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{commission.updatedBy}</span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditClick(commission)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Important Note */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Commission Rate Guidelines</p>
              <p className="text-sm text-blue-700 mt-1">
                Commission rates are applied to all successful card payment transactions. Changes
                to commission rates take effect immediately for new bookings. Existing pending
                settlements will use the commission rate that was active at the time of booking.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Commission Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Commission Rate</DialogTitle>
            <DialogDescription>
              Update the commission percentage for{" "}
              <strong>{selectedCommission?.serviceCategory}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Current Commission Rate
                </label>
                <div className="flex items-center gap-2 text-gray-600">
                  <Percent className="w-5 h-5" />
                  <span className="text-xl font-bold">
                    {selectedCommission?.commissionPercentage}%
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  New Commission Percentage
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={newPercentage}
                    onChange={(e) => setNewPercentage(e.target.value)}
                    placeholder="Enter percentage (0-100)"
                    className="pr-8"
                  />
                  <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter a value between 0 and 100. Default platform rate is {defaultCommissionRate}
                  %.
                </p>
              </div>

              {newPercentage && !isNaN(parseFloat(newPercentage)) && (
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview Example:</p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      Booking Amount: <strong>₱10,000</strong>
                    </p>
                    <p>
                      Commission ({parseFloat(newPercentage)}%):{" "}
                      <strong className="text-purple-600">
                        ₱{((10000 * parseFloat(newPercentage)) / 100).toLocaleString()}
                      </strong>
                    </p>
                    <p>
                      Provider Earnings:{" "}
                      <strong className="text-green-600">
                        ₱
                        {(10000 - (10000 * parseFloat(newPercentage)) / 100).toLocaleString()}
                      </strong>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCommission}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}