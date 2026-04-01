import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  CreditCard,
  Mail,
  MessageSquare,
  MapPin,
  BarChart3,
  Key,
  Settings as SettingsIcon,
} from "lucide-react";

export function Integrations() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-500 mt-1">
          Manage third-party integrations and API connections
        </p>
      </div>

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
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Test Integration
                </Button>
                <Button size="sm" variant="outline" className="w-full text-xs">
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
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Test Integration
                </Button>
                <Button size="sm" variant="outline" className="w-full text-xs">
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
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Test Integration
                </Button>
                <Button size="sm" variant="outline" className="w-full text-xs">
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
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Test Integration
                </Button>
                <Button size="sm" variant="outline" className="w-full text-xs">
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
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Test Integration
                </Button>
                <Button size="sm" variant="outline" className="w-full text-xs">
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
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Test Integration
                </Button>
                <Button size="sm" variant="outline" className="w-full text-xs">
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
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Test Integration
                </Button>
                <Button size="sm" variant="outline" className="w-full text-xs">
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
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Test Integration
                </Button>
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Update Credentials
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}