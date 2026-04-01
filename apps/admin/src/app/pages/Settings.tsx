import {
  Settings as SettingsIcon,
  Percent,
  Bell,
  Shield,
  Edit,
  Save,
  AlertCircle,
  CheckCircle,
  Clock,
  Link as LinkIcon,
  FileText,
  Download,
  CreditCard,
  Mail,
  MessageSquare,
  MapPin,
  BarChart3,
  Key,
  Zap,
} from "lucide-react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

interface CommissionRule {
  id: string;
  category: string;
  percentage: number;
  lastUpdated: string;
  updatedBy: string;
}

interface SystemLog {
  id: string;
  timestamp: string;
  adminUser: string;
  action: string;
  entity: string;
  details: string;
  ipAddress: string;
}

const initialCommissionRates: CommissionRule[] = [
  {
    id: "CR-001",
    category: "Home Maintenance & Repair",
    percentage: 18,
    lastUpdated: "2026-02-15T10:30:00",
    updatedBy: "Admin User",
  },
  {
    id: "CR-002",
    category: "Beauty, Wellness & Personal Care",
    percentage: 20,
    lastUpdated: "2026-02-15T10:30:00",
    updatedBy: "Admin User",
  },
  {
    id: "CR-003",
    category: "Education & Professional Services",
    percentage: 15,
    lastUpdated: "2026-02-15T10:30:00",
    updatedBy: "Admin User",
  },
  {
    id: "CR-004",
    category: "Domestic & Cleaning Services",
    percentage: 17,
    lastUpdated: "2026-02-15T10:30:00",
    updatedBy: "Admin User",
  },
  {
    id: "CR-005",
    category: "Pet Services",
    percentage: 16,
    lastUpdated: "2026-02-15T10:30:00",
    updatedBy: "Admin User",
  },
  {
    id: "CR-006",
    category: "Events & Entertainment",
    percentage: 22,
    lastUpdated: "2026-02-15T10:30:00",
    updatedBy: "Admin User",
  },
  {
    id: "CR-007",
    category: "Automotive & Tech Support",
    percentage: 19,
    lastUpdated: "2026-02-15T10:30:00",
    updatedBy: "Admin User",
  },
];

const mockSystemLogs: SystemLog[] = [
  {
    id: "LOG-001",
    timestamp: "2026-03-30T14:35:22",
    adminUser: "John Doe",
    action: "COMMISSION_RATE_UPDATE",
    entity: "Commission Settings",
    details: "Updated Beauty category commission from 18% to 20%",
    ipAddress: "192.168.1.45",
  },
  {
    id: "LOG-002",
    timestamp: "2026-03-30T13:20:11",
    adminUser: "Admin User",
    action: "USER_SUSPENSION",
    entity: "Service Provider",
    details: "Suspended provider account PRO-12453 (John Smith)",
    ipAddress: "192.168.1.45",
  },
  {
    id: "LOG-003",
    timestamp: "2026-03-30T12:15:00",
    adminUser: "Sarah Lee",
    action: "PAYOUT_APPROVAL",
    entity: "Payout Request",
    details: "Approved payout request PAY-8921 for ₱25,000",
    ipAddress: "10.0.0.23",
  },
  {
    id: "LOG-004",
    timestamp: "2026-03-30T11:45:33",
    adminUser: "John Doe",
    action: "DISPUTE_RESOLVED",
    entity: "Dispute Case",
    details: "Resolved dispute DSP-5621 in favor of customer",
    ipAddress: "192.168.1.45",
  },
  {
    id: "LOG-005",
    timestamp: "2026-03-30T10:30:14",
    adminUser: "Admin User",
    action: "REFUND_PROCESSED",
    entity: "Refund Request",
    details: "Processed refund REF-3421 of ₱5,500",
    ipAddress: "192.168.1.45",
  },
  {
    id: "LOG-006",
    timestamp: "2026-03-30T09:20:45",
    adminUser: "Sarah Lee",
    action: "USER_VERIFIED",
    entity: "Customer Account",
    details: "Verified identity for customer CUS-9823",
    ipAddress: "10.0.0.23",
  },
  {
    id: "LOG-007",
    timestamp: "2026-03-30T08:15:22",
    adminUser: "John Doe",
    action: "PROMO_CODE_CREATED",
    entity: "Marketing Campaign",
    details: "Created promo code SUMMER2026 with 20% discount",
    ipAddress: "192.168.1.45",
  },
  {
    id: "LOG-008",
    timestamp: "2026-03-29T17:50:11",
    adminUser: "Admin User",
    action: "SETTINGS_UPDATE",
    entity: "Platform Settings",
    details: "Updated cancellation window from 12 to 24 hours",
    ipAddress: "192.168.1.45",
  },
];

export function Settings() {
  const [commissionRates, setCommissionRates] = useState<CommissionRule[]>(initialCommissionRates);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState<CommissionRule | null>(null);
  const [newPercentage, setNewPercentage] = useState("");
  const [pendingUpdate, setPendingUpdate] = useState<CommissionRule | null>(null);

  // General Settings State
  const [platformName, setPlatformName] = useState("ServEase");
  const [supportEmail, setSupportEmail] = useState("support@servease.ph");
  const [contactPhone, setContactPhone] = useState("+63 2 1234 5678");
  const [defaultTimezone, setDefaultTimezone] = useState("asia-manila");
  const [defaultCurrency, setDefaultCurrency] = useState("PHP");
  const [cancellationWindow, setCancellationWindow] = useState("24");
  const [disputeWindow, setDisputeWindow] = useState("48");
  const [autoComplete, setAutoComplete] = useState(true);

  // Notification Settings State
  const [customerNotifs, setCustomerNotifs] = useState({
    bookingConfirmation: true,
    bookingReminder: true,
    serviceCompleted: true,
    refundProcessed: true,
  });

  // System Logs Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState("7days");
  const [adminUserFilter, setAdminUserFilter] = useState("all");
  const [actionTypeFilter, setActionTypeFilter] = useState("all");
  const [entityTypeFilter, setEntityTypeFilter] = useState("all");
  const [appliedFilters, setAppliedFilters] = useState({
    dateRange: "7days",
    adminUser: "all",
    actionType: "all",
    entityType: "all",
  });

  const [providerNotifs, setProviderNotifs] = useState({
    newBooking: true,
    paymentReceived: true,
    disputeFiled: true,
    payoutReleased: true,
  });

  const [adminNotifs, setAdminNotifs] = useState({
    highDispute: true,
    failedPayment: true,
    largeRefund: true,
  });

  // Security Settings State
  const [enable2FA, setEnable2FA] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [minPasswordLength, setMinPasswordLength] = useState("8");
  const [requireSpecialChar, setRequireSpecialChar] = useState(true);
  const [ipRestriction, setIpRestriction] = useState("");

  const handleEditCommission = (commission: CommissionRule) => {
    setSelectedCommission(commission);
    setNewPercentage(commission.percentage.toString());
    setEditModalOpen(true);
  };

  const handleSaveClick = () => {
    if (!selectedCommission) return;

    const percentage = parseFloat(newPercentage);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      alert("Please enter a valid percentage between 0 and 100");
      return;
    }

    setPendingUpdate({
      ...selectedCommission,
      percentage,
      lastUpdated: new Date().toISOString(),
      updatedBy: "Admin User",
    });

    setEditModalOpen(false);
    setConfirmModalOpen(true);
  };

  const handleConfirmUpdate = () => {
    if (!pendingUpdate) return;

    setCommissionRates((prev) =>
      prev.map((rate) => (rate.id === pendingUpdate.id ? pendingUpdate : rate))
    );

    // Create audit log entry
    console.log("Audit Log:", {
      action: "COMMISSION_RATE_UPDATE",
      category: pendingUpdate.category,
      oldPercentage: selectedCommission?.percentage,
      newPercentage: pendingUpdate.percentage,
      updatedBy: "Admin User",
      timestamp: new Date().toISOString(),
    });

    setConfirmModalOpen(false);
    setPendingUpdate(null);
    setSelectedCommission(null);
  };

  const handleSaveGeneral = () => {
    console.log("General settings saved:", {
      platformName,
      supportEmail,
      contactPhone,
      defaultTimezone,
      defaultCurrency,
      cancellationWindow,
      disputeWindow,
      autoComplete,
    });
    alert("✅ General settings saved successfully!");
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

  // System Logs Filtering Functions
  const handleApplyFilters = () => {
    setAppliedFilters({
      dateRange: dateRangeFilter,
      adminUser: adminUserFilter,
      actionType: actionTypeFilter,
      entityType: entityTypeFilter,
    });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setDateRangeFilter("7days");
    setAdminUserFilter("all");
    setActionTypeFilter("all");
    setEntityTypeFilter("all");
    setAppliedFilters({
      dateRange: "7days",
      adminUser: "all",
      actionType: "all",
      entityType: "all",
    });
  };

  const getFilteredLogs = () => {
    let filtered = [...mockSystemLogs];

    // Real-time search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (log) =>
          log.details.toLowerCase().includes(query) ||
          log.ipAddress.toLowerCase().includes(query) ||
          log.action.toLowerCase().includes(query) ||
          log.entity.toLowerCase().includes(query) ||
          log.adminUser.toLowerCase().includes(query)
      );
    }

    // Date range filter
    if (appliedFilters.dateRange !== "7days") {
      const now = new Date();
      const logDate = (timestamp: string) => new Date(timestamp);
      
      if (appliedFilters.dateRange === "today") {
        filtered = filtered.filter((log) => {
          const date = logDate(log.timestamp);
          return date.toDateString() === now.toDateString();
        });
      } else if (appliedFilters.dateRange === "30days") {
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter((log) => logDate(log.timestamp) >= thirtyDaysAgo);
      }
    }

    // Admin user filter
    if (appliedFilters.adminUser !== "all") {
      const userMap: Record<string, string> = {
        john: "John Doe",
        admin: "Admin User",
        sarah: "Sarah Lee",
      };
      const userName = userMap[appliedFilters.adminUser] || appliedFilters.adminUser;
      filtered = filtered.filter((log) => log.adminUser === userName);
    }

    // Action type filter
    if (appliedFilters.actionType !== "all") {
      const actionMap: Record<string, string[]> = {
        update: ["UPDATE", "SETTINGS_UPDATE", "COMMISSION_RATE_UPDATE"],
        approval: ["APPROVAL", "PAYOUT_APPROVAL"],
        suspension: ["SUSPENSION", "USER_SUSPENSION"],
        create: ["CREATED", "PROMO_CODE_CREATED"],
        delete: ["DELETE", "DELETED"],
        verified: ["VERIFIED", "USER_VERIFIED"],
      };
      const actions = actionMap[appliedFilters.actionType] || [];
      filtered = filtered.filter((log) =>
        actions.some((action) => log.action.includes(action))
      );
    }

    // Entity type filter
    if (appliedFilters.entityType !== "all") {
      const entityMap: Record<string, string> = {
        provider: "Service Provider",
        customer: "Customer",
        payout: "Payout Request",
        dispute: "Dispute Case",
        refund: "Refund Request",
        commission: "Commission Settings",
        settings: "Platform Settings",
        marketing: "Marketing Campaign",
      };
      const entityName = entityMap[appliedFilters.entityType] || appliedFilters.entityType;
      filtered = filtered.filter((log) => log.entity === entityName);
    }

    return filtered;
  };

  const filteredLogs = getFilteredLogs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-gray-500 mt-1">
          Configure platform settings, commission rates, notifications, and security
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="general" className="data-[state=active]:bg-blue-50">
            <SettingsIcon className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="commission" className="data-[state=active]:bg-blue-50">
            <Percent className="w-4 h-4 mr-2" />
            Commission Rates
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-50">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-blue-50">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-blue-50">
            <FileText className="w-4 h-4 mr-2" />
            System Logs
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-blue-50">
            <Zap className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* GENERAL SETTINGS TAB */}
        <TabsContent value="general" className="space-y-6">
          {/* Platform Information */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input
                    id="platform-name"
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                    placeholder="Enter platform name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    placeholder="Enter support email"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input
                    id="contact-phone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Enter contact phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select value={defaultTimezone} onValueChange={setDefaultTimezone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-manila">Asia/Manila (PHT)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="asia-singapore">Asia/Singapore</SelectItem>
                      <SelectItem value="asia-tokyo">Asia/Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PHP">PHP - Philippine Peso (₱)</SelectItem>
                      <SelectItem value="USD">USD - US Dollar ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operational Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cancellation-window">
                    Default Booking Cancellation Window
                  </Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="cancellation-window"
                      type="number"
                      value={cancellationWindow}
                      onChange={(e) => setCancellationWindow(e.target.value)}
                      className="w-24"
                    />
                    <span className="text-sm text-gray-600">hours</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Customers can cancel bookings within this timeframe
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dispute-window">Dispute Filing Window</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="dispute-window"
                      type="number"
                      value={disputeWindow}
                      onChange={(e) => setDisputeWindow(e.target.value)}
                      className="w-24"
                    />
                    <span className="text-sm text-gray-600">hours after service completion</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Customers can file disputes within this timeframe
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Automatic Booking Status Completion</p>
                  <p className="text-sm text-gray-500">
                    Automatically mark bookings as completed after service delivery confirmation
                  </p>
                </div>
                <Switch checked={autoComplete} onCheckedChange={setAutoComplete} />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveGeneral} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* COMMISSION RATES TAB */}
        <TabsContent value="commission" className="space-y-6">
          {/* Default Commission Card */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Default Platform Commission Rate
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Applied to categories without custom rates
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Percent className="w-5 h-5 text-blue-600" />
                  <span className="text-3xl font-bold text-blue-900">18%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission Table */}
          <Card>
            <CardHeader>
              <CardTitle>Category Commission Rates</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Manage commission rates for each service category
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Commission %</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Updated By</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissionRates.map((rate) => (
                    <TableRow key={rate.id}>
                      <TableCell>
                        <span className="font-medium text-gray-900">{rate.category}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-purple-600" />
                          <span className="text-xl font-bold text-purple-600">
                            {rate.percentage}%
                          </span>
                          {rate.percentage === 18 ? (
                            <Badge variant="outline">Default</Badge>
                          ) : rate.percentage > 18 ? (
                            <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                              Above Default
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              Below Default
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {formatDateTime(rate.lastUpdated)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{rate.updatedBy}</span>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditCommission(rate)}
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

          {/* Info Note */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-900">Commission Rate Guidelines</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Changes to commission rates take effect immediately for new bookings. All
                    updates are logged in the audit trail for compliance tracking.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS TAB */}
        <TabsContent value="notifications" className="space-y-6">
          {/* Customer Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Customer Notifications</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Mobile app only</p>
                </div>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">App Only</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Booking Confirmation</p>
                  <p className="text-sm text-gray-500">
                    Notify customers when booking is confirmed
                  </p>
                </div>
                <Switch
                  checked={customerNotifs.bookingConfirmation}
                  onCheckedChange={(checked) =>
                    setCustomerNotifs({ ...customerNotifs, bookingConfirmation: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Booking Reminder</p>
                  <p className="text-sm text-gray-500">
                    Remind customers before scheduled service
                  </p>
                </div>
                <Switch
                  checked={customerNotifs.bookingReminder}
                  onCheckedChange={(checked) =>
                    setCustomerNotifs({ ...customerNotifs, bookingReminder: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Service Completed</p>
                  <p className="text-sm text-gray-500">Notify when service is completed</p>
                </div>
                <Switch
                  checked={customerNotifs.serviceCompleted}
                  onCheckedChange={(checked) =>
                    setCustomerNotifs({ ...customerNotifs, serviceCompleted: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Refund Processed</p>
                  <p className="text-sm text-gray-500">
                    Notify when refund is approved and processed
                  </p>
                </div>
                <Switch
                  checked={customerNotifs.refundProcessed}
                  onCheckedChange={(checked) =>
                    setCustomerNotifs({ ...customerNotifs, refundProcessed: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Service Provider Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Service Provider Notifications</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Mobile app + Website access</p>
                </div>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                  App + Website
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Booking Request</p>
                  <p className="text-sm text-gray-500">
                    Notify providers of new booking requests
                  </p>
                </div>
                <Switch
                  checked={providerNotifs.newBooking}
                  onCheckedChange={(checked) =>
                    setProviderNotifs({ ...providerNotifs, newBooking: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payment Received</p>
                  <p className="text-sm text-gray-500">
                    Notify when customer payment is received
                  </p>
                </div>
                <Switch
                  checked={providerNotifs.paymentReceived}
                  onCheckedChange={(checked) =>
                    setProviderNotifs({ ...providerNotifs, paymentReceived: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dispute Filed</p>
                  <p className="text-sm text-gray-500">Alert when customer files a dispute</p>
                </div>
                <Switch
                  checked={providerNotifs.disputeFiled}
                  onCheckedChange={(checked) =>
                    setProviderNotifs({ ...providerNotifs, disputeFiled: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payout Released</p>
                  <p className="text-sm text-gray-500">Notify when payout is released</p>
                </div>
                <Switch
                  checked={providerNotifs.payoutReleased}
                  onCheckedChange={(checked) =>
                    setProviderNotifs({ ...providerNotifs, payoutReleased: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Admin Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Admin Notifications</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Critical alerts for admin dashboard
                  </p>
                </div>
                <Badge className="bg-red-100 text-red-700 border-red-200">Critical</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">High Dispute Alert</p>
                  <p className="text-sm text-gray-500">
                    Alert when disputes exceed threshold
                  </p>
                </div>
                <Switch
                  checked={adminNotifs.highDispute}
                  onCheckedChange={(checked) =>
                    setAdminNotifs({ ...adminNotifs, highDispute: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Failed Payment Alert</p>
                  <p className="text-sm text-gray-500">Notify when card payments fail</p>
                </div>
                <Switch
                  checked={adminNotifs.failedPayment}
                  onCheckedChange={(checked) =>
                    setAdminNotifs({ ...adminNotifs, failedPayment: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Large Refund Alert</p>
                  <p className="text-sm text-gray-500">Alert for refunds above ₱10,000</p>
                </div>
                <Switch
                  checked={adminNotifs.largeRefund}
                  onCheckedChange={(checked) =>
                    setAdminNotifs({ ...adminNotifs, largeRefund: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SECURITY TAB */}
        <TabsContent value="security" className="space-y-6">
          {/* Two-Factor Authentication */}
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Admin 2FA</p>
                  <p className="text-sm text-gray-500">
                    Require two-factor authentication for all admin users
                  </p>
                </div>
                <Switch checked={enable2FA} onCheckedChange={setEnable2FA} />
              </div>
              {enable2FA && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm text-green-700">
                      2FA is enabled. Admin users will be prompted to set up authenticator app on
                      next login.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Session Management */}
          <Card>
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout Duration</Label>
                <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeout duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  Automatically log out inactive admin users after this duration
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Password Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Password Policy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="min-password">Minimum Password Length</Label>
                <Select value={minPasswordLength} onValueChange={setMinPasswordLength}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 characters</SelectItem>
                    <SelectItem value="8">8 characters</SelectItem>
                    <SelectItem value="10">10 characters</SelectItem>
                    <SelectItem value="12">12 characters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Require Special Characters</p>
                  <p className="text-sm text-gray-500">
                    Passwords must include special characters (!@#$%^&*)
                  </p>
                </div>
                <Switch checked={requireSpecialChar} onCheckedChange={setRequireSpecialChar} />
              </div>
            </CardContent>
          </Card>

          {/* IP Access Restriction */}
          <Card>
            <CardHeader>
              <CardTitle>IP Access Restriction (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ip-restriction">Allowed IP Addresses</Label>
                <Input
                  id="ip-restriction"
                  value={ipRestriction}
                  onChange={(e) => setIpRestriction(e.target.value)}
                  placeholder="e.g., 192.168.1.1, 10.0.0.0/24"
                />
                <p className="text-xs text-gray-500">
                  Leave empty to allow access from all IPs. Separate multiple IPs with commas.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Activity Logs Link */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">View Login Activity</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Monitor admin login history and security events
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="border-blue-300 text-blue-700">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Go to Logs & Audit Trail
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SYSTEM LOGS TAB */}
        <TabsContent value="logs" className="space-y-4">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Logs & Audit Trail</h2>
              <p className="text-sm text-gray-500 mt-1">
                View and export admin activity logs for audit and compliance
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>

          {/* Search Bar - Full Width */}
          <Input
            placeholder="Search by details, IP address..."
            className="h-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Filter Options Row */}
          <div className="flex items-center gap-2 flex-nowrap overflow-x-auto">
            <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
              <SelectTrigger className="h-9 w-[130px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>

            <Select value={adminUserFilter} onValueChange={setAdminUserFilter}>
              <SelectTrigger className="h-9 w-[160px]">
                <SelectValue placeholder="Admin User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="admin">Admin User</SelectItem>
                <SelectItem value="sarah">Sarah Lee</SelectItem>
              </SelectContent>
            </Select>

            <Select value={actionTypeFilter} onValueChange={setActionTypeFilter}>
              <SelectTrigger className="h-9 w-[160px]">
                <SelectValue placeholder="Action Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="update">Updates</SelectItem>
                <SelectItem value="approval">Approvals</SelectItem>
                <SelectItem value="suspension">Suspensions</SelectItem>
                <SelectItem value="create">Creates</SelectItem>
                <SelectItem value="delete">Deletes</SelectItem>
                <SelectItem value="verified">Verifications</SelectItem>
              </SelectContent>
            </Select>

            <Select value={entityTypeFilter} onValueChange={setEntityTypeFilter}>
              <SelectTrigger className="h-9 w-[160px]">
                <SelectValue placeholder="Entity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entities</SelectItem>
                <SelectItem value="provider">Service Provider</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="payout">Payout Request</SelectItem>
                <SelectItem value="dispute">Dispute Case</SelectItem>
                <SelectItem value="refund">Refund Request</SelectItem>
                <SelectItem value="commission">Commission Settings</SelectItem>
                <SelectItem value="settings">Platform Settings</SelectItem>
                <SelectItem value="marketing">Marketing Campaign</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="h-9 shrink-0" onClick={handleClearFilters}>
              Clear Filters
            </Button>

            <Button size="sm" className="h-9 shrink-0 bg-[#16A34A] hover:bg-[#15803D]" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>

          {/* Table - Directly Below Filters */}
          <div className="rounded-lg border overflow-x-auto">
            <Table className="min-w-[1200px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Timestamp</TableHead>
                  <TableHead className="w-[130px]">Admin User</TableHead>
                  <TableHead className="w-[200px]">Action</TableHead>
                  <TableHead className="w-[150px]">Entity</TableHead>
                  <TableHead className="w-[400px]">Details</TableHead>
                  <TableHead className="w-[140px]">IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center text-sm text-gray-500">
                      No logs found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log, index) => (
                    <TableRow 
                      key={log.id} 
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                    >
                      <TableCell className="py-3 border-b border-gray-100">
                        <span className="text-xs text-gray-600">
                          {formatDateTime(log.timestamp)}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 border-b border-gray-100">
                        <span className="text-xs font-medium text-gray-900">{log.adminUser}</span>
                      </TableCell>
                      <TableCell className="py-3 border-b border-gray-100">
                        <Badge
                          variant="outline"
                          className={
                            log.action.includes("UPDATE")
                              ? "bg-blue-50 text-blue-700 border-blue-200 text-xs"
                              : log.action.includes("APPROVAL") || log.action.includes("PAYOUT")
                              ? "bg-green-50 text-green-700 border-green-200 text-xs"
                              : log.action.includes("SUSPENSION")
                              ? "bg-red-50 text-red-700 border-red-200 text-xs"
                              : log.action.includes("RESOLVED")
                              ? "bg-purple-50 text-purple-700 border-purple-200 text-xs"
                              : log.action.includes("VERIFIED")
                              ? "bg-teal-50 text-teal-700 border-teal-200 text-xs"
                              : log.action.includes("CREATED") || log.action.includes("PROMO")
                              ? "bg-indigo-50 text-indigo-700 border-indigo-200 text-xs"
                              : "bg-gray-50 text-gray-700 border-gray-200 text-xs"
                          }
                        >
                          {log.action.replace(/_/g, " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3 border-b border-gray-100">
                        <span className="text-xs text-gray-700">{log.entity}</span>
                      </TableCell>
                      <TableCell className="py-3 border-b border-gray-100 w-[400px]">
  <span className="text-xs text-gray-600 truncate block" title={log.details}>
    {log.details}
  </span>
</TableCell>
                      <TableCell className="py-3 border-b border-gray-100">
                        <span className="text-xs font-mono text-gray-500">{log.ipAddress}</span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* INTEGRATIONS TAB */}
        <TabsContent value="integrations" className="space-y-6">
          {/* Payment Gateways */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Gateways
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {/* GCash */}
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">GCash</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        Active
                      </Badge>
                      <button className="hover:bg-gray-100 p-1 rounded transition-colors">
                        <SettingsIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Mobile wallet integration</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Test Integration
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Update Credentials
                    </Button>
                  </div>
                </div>

                {/* PayMaya */}
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">PayMaya</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        Active
                      </Badge>
                      <button className="hover:bg-gray-100 p-1 rounded transition-colors">
                        <SettingsIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Digital payment solution</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Test Integration
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Update Credentials
                    </Button>
                  </div>
                </div>

                {/* Stripe */}
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Stripe</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                        Inactive
                      </Badge>
                      <button className="hover:bg-gray-100 p-1 rounded transition-colors">
                        <SettingsIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Global payment processor</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Test Integration
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Update Credentials
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SMS Gateway */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                SMS Gateway
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {/* Twilio */}
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Twilio</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        Active
                      </Badge>
                      <button className="hover:bg-gray-100 p-1 rounded transition-colors">
                        <SettingsIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">SMS & Voice API</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Test Integration
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Update Credentials
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Service */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {/* SendGrid */}
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">SendGrid</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        Active
                      </Badge>
                      <button className="hover:bg-gray-100 p-1 rounded transition-colors">
                        <SettingsIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Email delivery platform</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Test Integration
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Update Credentials
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Maps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {/* Google Maps API */}
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Google Maps API</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        Active
                      </Badge>
                      <button className="hover:bg-gray-100 p-1 rounded transition-colors">
                        <SettingsIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">API Key</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="password"
                        value="AIzaSyD************************"
                        disabled
                        className="text-xs font-mono"
                      />
                      <Button size="sm" variant="ghost">
                        <Key className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Test Integration
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Update Credentials
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {/* Mixpanel */}
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Mixpanel</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        Active
                      </Badge>
                      <button className="hover:bg-gray-100 p-1 rounded transition-colors">
                        <SettingsIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Product analytics</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Test Integration
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Update Credentials
                    </Button>
                  </div>
                </div>

                {/* Firebase */}
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Firebase</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        Active
                      </Badge>
                      <button className="hover:bg-gray-100 p-1 rounded transition-colors">
                        <SettingsIcon className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">App analytics & hosting</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Test Integration
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Update Credentials
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Commission Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Commission Rate</DialogTitle>
            <DialogDescription>
              Update the commission percentage for{" "}
              <strong>{selectedCommission?.category}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div>
              <Label>Current Commission Rate</Label>
              <div className="flex items-center gap-2 mt-2">
                <Percent className="w-5 h-5 text-gray-600" />
                <span className="text-xl font-bold">{selectedCommission?.percentage}%</span>
              </div>
            </div>

            <div>
              <Label htmlFor="new-percentage">New Commission Percentage</Label>
              <div className="relative mt-2">
                <Input
                  id="new-percentage"
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
                Default platform rate is 18%. Enter a value between 0 and 100.
              </p>
            </div>

            {newPercentage && !isNaN(parseFloat(newPercentage)) && (
              <div className="p-3 bg-gray-50 rounded-lg border">
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
                      ₱{(10000 - (10000 * parseFloat(newPercentage)) / 100).toLocaleString()}
                    </strong>
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveClick}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Commission Rate Change</DialogTitle>
            <DialogDescription>
              Please confirm this commission rate update. This action will be logged in the audit
              trail.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="p-4 bg-gray-50 rounded-lg border space-y-3">
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-semibold text-gray-900">{pendingUpdate?.category}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Current Rate</p>
                  <p className="text-xl font-bold text-red-600">
                    {selectedCommission?.percentage}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">New Rate</p>
                  <p className="text-xl font-bold text-green-600">{pendingUpdate?.percentage}%</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  This change will apply to all new bookings immediately. Existing pending
                  settlements will use the old rate.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmUpdate} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Confirm & Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}