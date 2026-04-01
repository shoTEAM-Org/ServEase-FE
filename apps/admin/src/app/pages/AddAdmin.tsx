import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { RefreshCw, Shield, Check } from "lucide-react";

// Role definitions with permissions
const ADMIN_ROLES = [
  {
    id: "super-admin",
    name: "Super Admin",
    permissions: [
      "Full system access",
      "User management",
      "Financial operations",
      "System settings",
      "Security controls",
      "Analytics & reports",
      "Marketing campaigns",
      "Integration management",
    ],
  },
  {
    id: "finance-manager",
    name: "Finance Manager",
    permissions: [
      "View transactions",
      "Process payouts",
      "Manage refunds",
      "Financial reports",
      "Commission settings",
      "Provider earnings",
    ],
  },
  {
    id: "operations-manager",
    name: "Operations Manager",
    permissions: [
      "Manage bookings",
      "Handle disputes",
      "Service monitoring",
      "Provider approvals",
      "Customer support",
      "Operational reports",
    ],
  },
  {
    id: "support-manager",
    name: "Support Manager",
    permissions: [
      "Customer support",
      "View user profiles",
      "Handle disputes",
      "View bookings",
      "Basic reports",
    ],
  },
  {
    id: "marketing-manager",
    name: "Marketing Manager",
    permissions: [
      "Create campaigns",
      "Manage promo codes",
      "Send broadcasts",
      "View analytics",
      "Customer insights",
    ],
  },
];

// Generate random password
const generatePassword = () => {
  const length = 16;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

export function AddAdmin() {
  const navigate = useNavigate();
  
  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [password, setPassword] = useState(generatePassword());
  const [sendInvitation, setSendInvitation] = useState(true);
  const [require2FA, setRequire2FA] = useState(false);

  // Selected role permissions
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);

  // Update permissions when role changes
  useEffect(() => {
    if (selectedRole) {
      const role = ADMIN_ROLES.find((r) => r.id === selectedRole);
      setRolePermissions(role?.permissions || []);
    } else {
      setRolePermissions([]);
    }
  }, [selectedRole]);

  // Check if form is valid
  const isFormValid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      selectedRole !== ""
    );
  };

  const handleRegeneratePassword = () => {
    setPassword(generatePassword());
  };

  const handleCreateAdmin = () => {
    // Handle form submission
    console.log("Creating admin user:", {
      firstName,
      lastName,
      email,
      phoneNumber,
      role: selectedRole,
      password,
      sendInvitation,
      require2FA,
    });
    // Navigate back to admin roles page
    navigate("/admin-roles");
  };

  const handleCancel = () => {
    navigate("/admin-roles");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Admin User</h1>
        <p className="text-gray-500 mt-1">
          Create a new admin account with specific role and permissions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Admin Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="first-name"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="last-name"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+63 9XX XXX XXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">
                  Admin Role <span className="text-red-500">*</span>
                </Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select admin role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ADMIN_ROLES.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  Role determines the access level and permissions for this admin user
                </p>
              </div>

              {/* Initial Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Initial Password</Label>
                <div className="flex gap-2">
                  <Input
                    id="password"
                    type="text"
                    value={password}
                    readOnly
                    className="font-mono text-sm bg-gray-50"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRegeneratePassword}
                    className="shrink-0"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  This password will be sent to the admin user via email
                </p>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="send-invitation"
                    checked={sendInvitation}
                    onCheckedChange={(checked) => setSendInvitation(checked === true)}
                    className="mt-0.5 border-[#16A34A] data-[state=checked]:bg-[#16A34A] data-[state=checked]:border-[#16A34A]"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="send-invitation"
                      className="font-medium cursor-pointer"
                    >
                      Send invitation email
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Automatically send login credentials and setup instructions to the new admin
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="require-2fa"
                    checked={require2FA}
                    onCheckedChange={(checked) => setRequire2FA(checked === true)}
                    className="mt-0.5 border-[#16A34A] data-[state=checked]:bg-[#16A34A] data-[state=checked]:border-[#16A34A]"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="require-2fa"
                      className="font-medium cursor-pointer"
                    >
                      Two-factor authentication required
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Admin will be required to set up 2FA on first login for enhanced security
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Permissions Preview Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#16A34A]" />
                Role Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedRole ? (
                <div className="space-y-3">
                  <div className="p-3 bg-[#DCFCE7] rounded-lg border border-[#16A34A]/20">
                    <p className="text-sm font-semibold text-[#16A34A]">
                      {ADMIN_ROLES.find((r) => r.id === selectedRole)?.name}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Access Permissions:
                    </p>
                    <div className="space-y-1.5">
                      {rolePermissions.map((permission, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                          <span>{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Shield className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">
                    Select a role to preview permissions
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t">
        <Button
          variant="outline"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreateAdmin}
          disabled={!isFormValid()}
          className="bg-[#16A34A] hover:bg-[#15803D] disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Create Admin User
        </Button>
      </div>
    </div>
  );
}