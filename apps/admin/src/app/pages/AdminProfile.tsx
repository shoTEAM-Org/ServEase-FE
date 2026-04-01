import { Link, useNavigate } from "react-router";
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Calendar, 
  Clock, 
  Camera,
  Edit,
  Key,
  ShieldCheck,
  FileText,
  Monitor,
  MapPin,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

// Mock data for the logged-in admin
const adminProfile = {
  id: "admin_001",
  name: "John Doe",
  email: "john.doe@platform.com",
  phone: "+63 917 123 4567",
  role: "Super Admin",
  roleColor: "bg-purple-100 text-purple-700 border-purple-200",
  profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  accountCreated: "2024-01-15",
  lastLogin: "2025-03-30 14:23:15",
  twoFactorEnabled: true,
  permissions: [
    "Full System Access",
    "User Management",
    "Financial Operations",
    "Marketing Campaigns",
    "System Settings",
    "Audit Logs",
  ],
};

// Mock login history
const loginHistory = [
  {
    id: "log_001",
    timestamp: "2025-03-30 14:23:15",
    device: "Chrome on Windows",
    location: "Manila, Philippines",
    ipAddress: "192.168.1.100",
    status: "success",
  },
  {
    id: "log_002",
    timestamp: "2025-03-29 09:15:42",
    device: "Chrome on Windows",
    location: "Manila, Philippines",
    ipAddress: "192.168.1.100",
    status: "success",
  },
  {
    id: "log_003",
    timestamp: "2025-03-28 16:45:21",
    device: "Safari on MacOS",
    location: "Quezon City, Philippines",
    ipAddress: "192.168.2.45",
    status: "success",
  },
  {
    id: "log_004",
    timestamp: "2025-03-27 11:30:05",
    device: "Chrome on Windows",
    location: "Manila, Philippines",
    ipAddress: "192.168.1.100",
    status: "success",
  },
  {
    id: "log_005",
    timestamp: "2025-03-26 08:20:33",
    device: "Firefox on Windows",
    location: "Manila, Philippines",
    ipAddress: "192.168.1.100",
    status: "success",
  },
  {
    id: "log_006",
    timestamp: "2025-03-25 13:55:18",
    device: "Chrome on Android",
    location: "Makati, Philippines",
    ipAddress: "192.168.3.22",
    status: "success",
  },
  {
    id: "log_007",
    timestamp: "2025-03-24 10:10:44",
    device: "Chrome on Windows",
    location: "Manila, Philippines",
    ipAddress: "192.168.1.100",
    status: "success",
  },
  {
    id: "log_008",
    timestamp: "2025-03-23 15:40:12",
    device: "Safari on iOS",
    location: "Pasig, Philippines",
    ipAddress: "192.168.4.88",
    status: "success",
  },
  {
    id: "log_009",
    timestamp: "2025-03-22 09:25:39",
    device: "Chrome on Windows",
    location: "Manila, Philippines",
    ipAddress: "192.168.1.100",
    status: "success",
  },
  {
    id: "log_010",
    timestamp: "2025-03-21 14:05:27",
    device: "Edge on Windows",
    location: "Taguig, Philippines",
    ipAddress: "192.168.5.67",
    status: "success",
  },
];

export function AdminProfile() {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-8 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Admin Profile</h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage your admin account information
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/audit-trail")}
          >
            <FileText className="w-4 h-4 mr-2" />
            View Activity Log
          </Button>
          <Button 
            size="sm" 
            className="bg-[#16A34A] hover:bg-[#15803D]"
            onClick={() => {/* Edit profile handler */}}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Profile Info Card */}
        <div className="col-span-1 space-y-6">
          {/* Profile Photo & Basic Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={adminProfile.profilePhoto}
                    alt={adminProfile.name}
                    className="w-32 h-32 rounded-full border-4 border-gray-100"
                  />
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mt-4">
                  {adminProfile.name}
                </h2>
                <Badge className={`mt-2 ${adminProfile.roleColor}`}>
                  {adminProfile.role}
                </Badge>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{adminProfile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{adminProfile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{adminProfile.role}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Account Created</div>
                    <div className="text-base font-semibold text-gray-900 mt-0.5">
                      {formatDate(adminProfile.accountCreated)}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Last Login</div>
                    <div className="text-base font-semibold text-gray-900 mt-0.5">
                      {formatDateTime(adminProfile.lastLogin)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Two-Factor Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {adminProfile.twoFactorEnabled ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Enabled</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="text-sm font-medium text-red-700">Disabled</span>
                    </>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {/* Toggle 2FA handler */}}
                >
                  {adminProfile.twoFactorEnabled ? "Disable" : "Enable"}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Two-factor authentication adds an extra layer of security to your account.
              </p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
                onClick={() => {/* Change password handler */}}
              >
                <Key className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
                onClick={() => navigate("/security-settings")}
              >
                <Shield className="w-4 h-4 mr-2" />
                Security Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Permissions & Login History */}
        <div className="col-span-2 space-y-6">
          {/* Permissions Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Permissions Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {adminProfile.permissions.map((permission, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span className="text-sm font-medium text-green-900">
                      {permission}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Note:</strong> As a {adminProfile.role}, you have unrestricted access to all platform features and settings.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Login History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Login History (Recent 10)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Timestamp</TableHead>
                      <TableHead className="w-[200px]">Device</TableHead>
                      <TableHead className="w-[180px]">Location</TableHead>
                      <TableHead className="w-[140px]">IP Address</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loginHistory.map((log, index) => (
                      <TableRow key={log.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <TableCell className="py-3">
                          <span className="text-xs text-gray-600">
                            {formatDateTime(log.timestamp)}
                          </span>
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-700">{log.device}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-700">{log.location}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <span className="text-xs font-mono text-gray-500">
                            {log.ipAddress}
                          </span>
                        </TableCell>
                        <TableCell className="py-3">
                          <Badge
                            className={
                              log.status === "success"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {log.status === "success" ? "Success" : "Failed"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}