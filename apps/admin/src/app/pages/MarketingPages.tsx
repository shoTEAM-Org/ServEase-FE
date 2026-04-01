import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Tag,
  Plus,
  Search,
  Copy,
  CheckCircle,
  Clock,
  XCircle,
  Percent,
  Users,
  Calendar,
  Megaphone,
  Send,
  Eye,
  BarChart2,
} from "lucide-react";

// ── Promo Codes ─────────────────────────────────────────────────────────────

const mockPromoCodes = [
  { id: "PC-001", code: "WELCOME20", type: "Percentage", value: 20, used: 142, limit: 500, expires: "2026-04-30", status: "Active" },
  { id: "PC-002", code: "SUMMER50", type: "Fixed", value: 50, used: 89, limit: 200, expires: "2026-05-31", status: "Active" },
  { id: "PC-003", code: "NEWUSER15", type: "Percentage", value: 15, used: 300, limit: 300, expires: "2026-03-31", status: "Expired" },
  { id: "PC-004", code: "FLASH100", type: "Fixed", value: 100, used: 0, limit: 50, expires: "2026-04-05", status: "Scheduled" },
  { id: "PC-005", code: "LOYALTY10", type: "Percentage", value: 10, used: 57, limit: 1000, expires: "2026-12-31", status: "Active" },
];

const promoStats = [
  { label: "Active Promos", value: "3", icon: Tag, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Total Redemptions", value: "588", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Avg. Discount", value: "₱320", icon: Percent, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Expiring Soon", value: "1", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
];

const statusCfg: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Expired: "bg-red-50 text-red-600 border-red-200",
  Scheduled: "bg-blue-50 text-blue-700 border-blue-200",
};

export function PromoCodes() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = mockPromoCodes.filter(
    (p) =>
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Promo Codes</h1>
          <p className="text-gray-500 mt-1">Create and manage promotional discount codes</p>
        </div>
        <Button className="bg-[#16A34A] hover:bg-[#15803D] text-white gap-2">
          <Plus className="w-4 h-4" />
          Create Promo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {promoStats.map((s) => (
          <Card key={s.label} className="border border-gray-200">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-2.5 rounded-xl ${s.bg}`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="border border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <CardTitle className="text-sm font-semibold text-gray-800">All Promo Codes</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search codes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Code</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Value</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Usage</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Expires</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((promo) => (
                  <tr key={promo.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded text-xs">
                          {promo.code}
                        </span>
                        <button
                          onClick={() => handleCopy(promo.code)}
                          className="text-gray-400 hover:text-[#16A34A] transition-colors"
                        >
                          {copied === promo.code ? (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{promo.type}</td>
                    <td className="px-5 py-4 font-semibold text-gray-900">
                      {promo.type === "Percentage" ? `${promo.value}%` : `₱${promo.value}`}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-20">
                          <div
                            className="bg-[#16A34A] h-1.5 rounded-full"
                            style={{ width: `${Math.min((promo.used / promo.limit) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{promo.used}/{promo.limit}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(promo.expires).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge className={`text-xs border ${statusCfg[promo.status]}`}>
                        {promo.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-gray-500 hover:text-gray-900">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Broadcasts ───────────────────────────────────────────────────────────────

const mockBroadcasts = [
  { id: "BC-001", title: "Platform Maintenance Notice", audience: "All Users", channel: "Push + Email", sent: 8420, opened: 5103, status: "Sent", date: "2026-03-28T09:00:00" },
  { id: "BC-002", title: "New Feature: Live Tracking", audience: "Customers", channel: "Push", sent: 5200, opened: 3410, status: "Sent", date: "2026-03-25T14:00:00" },
  { id: "BC-003", title: "Summer Promo Reminder", audience: "All Users", channel: "Email", sent: 0, opened: 0, status: "Scheduled", date: "2026-04-01T10:00:00" },
  { id: "BC-004", title: "KYC Verification Reminder", audience: "Providers", channel: "Email + SMS", sent: 312, opened: 271, status: "Sent", date: "2026-03-20T08:30:00" },
];

const broadcastStats = [
  { label: "Total Sent", value: "14.2K", icon: Send, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Open Rate", value: "61%", icon: Eye, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Scheduled", value: "1", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Campaigns", value: mockBroadcasts.length.toString(), icon: BarChart2, color: "text-purple-600", bg: "bg-purple-50" },
];

const bcastStatusCfg: Record<string, string> = {
  Sent: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Scheduled: "bg-blue-50 text-blue-700 border-blue-200",
  Draft: "bg-gray-100 text-gray-600 border-gray-200",
};

export function Broadcasts() {
  const [search, setSearch] = useState("");

  const filtered = mockBroadcasts.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.audience.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Broadcasts</h1>
          <p className="text-gray-500 mt-1">Send platform-wide announcements and notifications</p>
        </div>
        <Button className="bg-[#16A34A] hover:bg-[#15803D] text-white gap-2">
          <Plus className="w-4 h-4" />
          New Broadcast
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {broadcastStats.map((s) => (
          <Card key={s.label} className="border border-gray-200">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-2.5 rounded-xl ${s.bg}`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* List */}
      <Card className="border border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <CardTitle className="text-sm font-semibold text-gray-800">Broadcast Campaigns</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search broadcasts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-50">
            {filtered.map((bc) => (
              <div key={bc.id} className="flex items-center gap-5 px-5 py-4 hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="flex-shrink-0 p-2.5 rounded-xl bg-blue-50">
                  <Megaphone className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-[#16A34A] transition-colors">
                      {bc.title}
                    </p>
                    <Badge className={`text-xs border ${bcastStatusCfg[bc.status]}`}>{bc.status}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>Audience: <span className="text-gray-600 font-medium">{bc.audience}</span></span>
                    <span>·</span>
                    <span>Channel: <span className="text-gray-600 font-medium">{bc.channel}</span></span>
                  </div>
                </div>
                {bc.status === "Sent" ? (
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-gray-500">{bc.sent.toLocaleString()} sent</p>
                    <p className="text-xs font-semibold text-emerald-600 mt-0.5">
                      {((bc.opened / bc.sent) * 100).toFixed(0)}% opened
                    </p>
                  </div>
                ) : (
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-gray-400">Scheduled for</p>
                    <p className="text-xs font-medium text-blue-600 mt-0.5">
                      {new Date(bc.date).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                )}
                <div className="flex-shrink-0 text-xs text-gray-400">
                  {new Date(bc.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0 text-xs h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-900">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
