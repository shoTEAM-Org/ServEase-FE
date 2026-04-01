import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Headphones,
  Search,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  Ticket,
  User,
  ChevronRight,
} from "lucide-react";

const mockTickets = [
  {
    id: "TKT-001",
    subject: "Unable to complete booking payment",
    user: "Maria Santos",
    email: "maria@email.com",
    priority: "High",
    status: "Open",
    category: "Payment",
    created: "2026-03-29T10:23:00",
  },
  {
    id: "TKT-002",
    subject: "Provider did not show up for appointment",
    user: "Jose Reyes",
    email: "jose@email.com",
    priority: "High",
    status: "In Progress",
    category: "Service Issue",
    created: "2026-03-29T08:45:00",
  },
  {
    id: "TKT-003",
    subject: "Refund not received after 7 days",
    user: "Anna Cruz",
    email: "anna@email.com",
    priority: "Medium",
    status: "Open",
    category: "Refund",
    created: "2026-03-28T14:10:00",
  },
  {
    id: "TKT-004",
    subject: "App crashing on Android device",
    user: "Carlos Bautista",
    email: "carlos@email.com",
    priority: "Low",
    status: "Resolved",
    category: "Technical",
    created: "2026-03-27T11:30:00",
  },
  {
    id: "TKT-005",
    subject: "Wrong service provider assigned to booking",
    user: "Liza Gomez",
    email: "liza@email.com",
    priority: "Medium",
    status: "In Progress",
    category: "Booking",
    created: "2026-03-27T09:15:00",
  },
];

const stats = [
  { label: "Open Tickets", value: 12, icon: Ticket, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "High Priority", value: 5, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  { label: "In Progress", value: 8, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Resolved Today", value: 14, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
];

const priorityConfig: Record<string, { label: string; classes: string }> = {
  High: { label: "High", classes: "bg-red-50 text-red-700 border-red-200" },
  Medium: { label: "Medium", classes: "bg-amber-50 text-amber-700 border-amber-200" },
  Low: { label: "Low", classes: "bg-gray-100 text-gray-600 border-gray-200" },
};

const statusConfig: Record<string, { classes: string }> = {
  Open: { classes: "bg-blue-50 text-blue-700 border-blue-200" },
  "In Progress": { classes: "bg-amber-50 text-amber-700 border-amber-200" },
  Resolved: { classes: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

export function Support() {
  const [search, setSearch] = useState("");

  const filtered = mockTickets.filter(
    (t) =>
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support</h1>
          <p className="text-gray-500 mt-1">Manage support tickets and customer inquiries</p>
        </div>
        <Button className="bg-[#16A34A] hover:bg-[#15803D] text-white gap-2">
          <MessageSquare className="w-4 h-4" />
          New Ticket
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
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

      {/* Tickets Table */}
      <Card className="border border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <CardTitle className="text-sm font-semibold text-gray-800">Support Tickets</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-50">
            {filtered.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className="flex-shrink-0 p-2 rounded-lg bg-gray-100">
                  <Headphones className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-mono font-semibold text-[#16A34A]">{ticket.id}</span>
                    <Badge className={`text-xs border ${priorityConfig[ticket.priority].classes}`}>
                      {ticket.priority}
                    </Badge>
                    <Badge className={`text-xs border ${statusConfig[ticket.status].classes}`}>
                      {ticket.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-gray-900 truncate">{ticket.subject}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <User className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{ticket.user}</span>
                    <span className="text-gray-300 mx-1">·</span>
                    <span className="text-xs text-gray-400">{ticket.category}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-xs text-gray-400">
                    {new Date(ticket.created).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-gray-300">
                    {new Date(ticket.created).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#16A34A] flex-shrink-0 transition-colors" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
