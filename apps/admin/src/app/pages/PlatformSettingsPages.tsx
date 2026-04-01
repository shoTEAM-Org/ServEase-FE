import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
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
import { Shield, Bell, FileText, Users, CheckCircle, Clock, Download, Search } from "lucide-react";
import { useNavigate } from "react-router";

// Admin Roles & Permissions
export function AdminRoles() {
  const navigate = useNavigate();
  const admins = [
    {
      id: "ADM-001",
      name: "Juan Dela Cruz",
      email: "juan@servease.ph",
      role: "Super Admin",
      permissions: "Full Access",
      lastLogin: "2026-03-04T14:30:00",
      status: "Active",
    },
    {
      id: "ADM-002",
      name: "Maria Santos",
      email: "maria@servease.ph",
      role: "Finance Manager",
      permissions: "Finance Only",
      lastLogin: "2026-03-04T10:15:00",
      status: "Active",
    },
    {
      id: "ADM-003",
      name: "Roberto Garcia",
      email: "roberto@servease.ph",
      role: "Support Manager",
      permissions: "Operations Only",
      lastLogin: "2026-03-03T16:45:00",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Roles & Permissions</h1>
          <p className="text-gray-500 mt-1">
            Manage admin users and their access permissions
          </p>
        </div>
        <Button 
          className="bg-[#16A34A] hover:bg-[#15803D]"
          onClick={() => navigate("/add-admin")}
        >
          <Users className="w-4 h-4 mr-2" />
          Add New Admin
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-[#DCFCE7]">
                <Users className="w-6 h-6 text-[#16A34A]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Total Admins</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
                <p className="text-xs text-gray-400 mt-1">All active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-50">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Super Admins</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">1</p>
                <p className="text-xs text-gray-400 mt-1">Full access</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-50">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Active Sessions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
                <p className="text-xs text-gray-400 mt-1">Currently online</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Table */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>
                    <span className="font-mono font-semibold text-[#16A34A]">{admin.id}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-900">{admin.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{admin.email}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                      {admin.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-700">{admin.permissions}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {new Date(admin.lastLogin).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {admin.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/admin/${admin.id}`)}>
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Notification Settings
export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notification Settings</h1>
        <p className="text-gray-500 mt-1">
          Configure notification preferences for different user types
        </p>
      </div>

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
              <p className="text-sm text-gray-500">Notify when booking is confirmed</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Booking Reminder</p>
              <p className="text-sm text-gray-500">Remind before scheduled service</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Service Completed</p>
              <p className="text-sm text-gray-500">Notify when service is completed</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Refund Processed</p>
              <p className="text-sm text-gray-500">Notify when refund is approved</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Provider Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Service Provider Notifications</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Mobile app + Website</p>
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
              <p className="text-sm text-gray-500">Notify of new booking requests</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Payment Received</p>
              <p className="text-sm text-gray-500">Notify when payment is received</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dispute Filed</p>
              <p className="text-sm text-gray-500">Alert when dispute is filed</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Payout Released</p>
              <p className="text-sm text-gray-500">Notify when payout is released</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Admin Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Admin Notifications</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Critical alerts</p>
            </div>
            <Badge className="bg-red-100 text-red-700 border-red-200">Critical</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">High Dispute Alert</p>
              <p className="text-sm text-gray-500">Alert when disputes exceed threshold</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Failed Payment Alert</p>
              <p className="text-sm text-gray-500">Notify when card payments fail</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Large Refund Alert</p>
              <p className="text-sm text-gray-500">Alert for refunds above ₱10,000</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-[#16A34A] hover:bg-[#15803D]">Save Changes</Button>
      </div>
    </div>
  );
}

// Security Settings
export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Security Settings</h1>
        <p className="text-gray-500 mt-1">
          Configure security and authentication settings
        </p>
      </div>

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
                Require 2FA for all admin users
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Session Management */}
      <Card>
        <CardHeader>
          <CardTitle>Session Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Session Timeout Duration</Label>
            <Select defaultValue="30">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Password Policy */}
      <Card>
        <CardHeader>
          <CardTitle>Password Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Minimum Password Length</Label>
            <Select defaultValue="8">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6 characters</SelectItem>
                <SelectItem value="8">8 characters</SelectItem>
                <SelectItem value="10">10 characters</SelectItem>
                <SelectItem value="12">12 characters</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Require Special Characters</p>
              <p className="text-sm text-gray-500">Password must include !@#$%^&*</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-[#16A34A] hover:bg-[#15803D]">Save Changes</Button>
      </div>
    </div>
  );
}

// Logs & Audit Trail
export function AuditTrail() {
  const auditLogs = [
    {
      id: "LOG-001",
      action: "Commission Rate Updated",
      user: "Juan Dela Cruz",
      timestamp: "2026-03-04T14:30:00",
      details: "Changed Beauty & Wellness commission from 18% to 20%",
      ipAddress: "192.168.1.1",
      entity: "Commission Settings",
      actionType: "UPDATE",
    },
    {
      id: "LOG-002",
      action: "Dispute Resolved",
      user: "Maria Santos",
      timestamp: "2026-03-04T13:15:00",
      details: "Approved refund for BK-2026-001789 (₱3,500)",
      ipAddress: "192.168.1.2",
      entity: "Dispute",
      actionType: "RESOLVE",
    },
    {
      id: "LOG-003",
      action: "Provider Suspended",
      user: "Juan Dela Cruz",
      timestamp: "2026-03-04T11:45:00",
      details: "Suspended PRV-005 (QuickFix Plumbing) due to low completion rate",
      ipAddress: "192.168.1.1",
      entity: "Service Provider",
      actionType: "SUSPEND",
    },
    {
      id: "LOG-004",
      action: "Payout Approved",
      user: "Maria Santos",
      timestamp: "2026-03-04T10:20:00",
      details: "Approved payout PAY-2026-123 (₱45,000) for PRV-001",
      ipAddress: "192.168.1.2",
      entity: "Payout",
      actionType: "APPROVE",
    },
    {
      id: "LOG-005",
      action: "User Registered",
      user: "System",
      timestamp: "2026-03-04T09:15:00",
      details: "New customer registered: CUST-2026-9876",
      ipAddress: "192.168.1.5",
      entity: "Customer",
      actionType: "CREATE",
    },
    {
      id: "LOG-006",
      action: "Booking Created",
      user: "System",
      timestamp: "2026-03-04T08:30:00",
      details: "New booking created: BK-2026-002456",
      ipAddress: "192.168.1.6",
      entity: "Booking",
      actionType: "CREATE",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Logs & Audit Trail</h1>
          <p className="text-gray-500 mt-1">
            Track all admin actions and system events
          </p>
        </div>
      </div>

      {/* Filter Options */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* Dropdowns in single row */}
          <div className="grid grid-cols-4 gap-3">
            {/* Date Range */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Date Range</Label>
              <Select defaultValue="7days">
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Admin User */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Admin User</Label>
              <Select defaultValue="all">
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="juan">Juan Dela Cruz</SelectItem>
                  <SelectItem value="maria">Maria Santos</SelectItem>
                  <SelectItem value="roberto">Roberto Garcia</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Type */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Action Type</Label>
              <Select defaultValue="all">
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="approve">Approve</SelectItem>
                  <SelectItem value="reject">Reject</SelectItem>
                  <SelectItem value="suspend">Suspend</SelectItem>
                  <SelectItem value="resolve">Resolve</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Entity Type */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Entity Type</Label>
              <Select defaultValue="all">
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Entities</SelectItem>
                  <SelectItem value="booking">Booking</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="provider">Service Provider</SelectItem>
                  <SelectItem value="payout">Payout</SelectItem>
                  <SelectItem value="dispute">Dispute</SelectItem>
                  <SelectItem value="commission">Commission Settings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search and Action Buttons Row */}
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Search Logs</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by log ID, details, or IP address..."
                  className="pl-10 h-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-10 px-4">
                Clear Filters
              </Button>
              <Button size="sm" className="h-10 px-4 bg-[#16A34A] hover:bg-[#15803D]">
                Apply Filters
              </Button>
              <Button variant="outline" size="sm" className="h-10 px-4">
                <Download className="w-4 h-4 mr-2" />
                Export Logs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[1200px]">
              <TableHeader>
                <TableRow className="bg-gray-50 border-b">
                  <TableHead className="w-[160px] font-semibold text-gray-900">Timestamp</TableHead>
                  <TableHead className="w-[150px] font-semibold text-gray-900">Admin User</TableHead>
                  <TableHead className="w-[200px] font-semibold text-gray-900">Action</TableHead>
                  <TableHead className="w-[150px] font-semibold text-gray-900">Entity</TableHead>
                  <TableHead className="min-w-[300px] font-semibold text-gray-900">Details</TableHead>
                  <TableHead className="w-[140px] font-semibold text-gray-900">IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id} className="border-b last:border-b-0">
                    <TableCell className="py-4">
                      <span className="text-sm text-gray-600">
                        {new Date(log.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-sm font-medium text-gray-900">{log.user}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        className={
                          log.actionType === "CREATE"
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : log.actionType === "UPDATE"
                            ? "bg-purple-100 text-purple-700 border-purple-200"
                            : log.actionType === "APPROVE"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : log.actionType === "SUSPEND"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : log.actionType === "RESOLVE"
                            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }
                      >
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-sm text-gray-700">{log.entity}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-sm text-gray-600">{log.details}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-xs text-gray-500 font-mono">{log.ipAddress}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}