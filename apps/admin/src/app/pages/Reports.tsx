import { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  Shield,
  Plus,
  Clock,
  Mail,
  Edit,
  BarChart3,
  FileSpreadsheet,
  FilePieChart,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface ReportCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  color: string;
  count: number;
}

interface ReportTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ElementType;
}

interface ScheduledReport {
  id: string;
  name: string;
  frequency: string;
  recipients: string[];
  lastSent: string;
  status: "active" | "disabled";
}

interface RecentReport {
  id: string;
  name: string;
  generatedDate: string;
  format: string;
  size: string;
  category: string;
}

export function Reports() {
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduledReportsState, setScheduledReportsState] = useState<ScheduledReport[]>([
    {
      id: "SCH-001",
      name: "Daily Revenue Report",
      frequency: "Daily at 9:00 AM",
      recipients: ["admin@servease.com", "finance@servease.com"],
      lastSent: "2026-03-30 09:00 AM",
      status: "active",
    },
    {
      id: "SCH-002",
      name: "Weekly Provider Performance",
      frequency: "Every Monday at 8:00 AM",
      recipients: ["operations@servease.com", "manager@servease.com"],
      lastSent: "2026-03-24 08:00 AM",
      status: "active",
    },
    {
      id: "SCH-003",
      name: "Monthly Financial Summary",
      frequency: "1st of every month at 10:00 AM",
      recipients: ["cfo@servease.com", "finance@servease.com", "admin@servease.com"],
      lastSent: "2026-03-01 10:00 AM",
      status: "active",
    },
    {
      id: "SCH-004",
      name: "User Growth Report",
      frequency: "Every Friday at 5:00 PM",
      recipients: ["marketing@servease.com"],
      lastSent: "2026-03-28 05:00 PM",
      status: "disabled",
    },
  ]);

  const handleToggleReportStatus = (reportId: string) => {
    setScheduledReportsState((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId
          ? { ...report, status: report.status === "active" ? "disabled" : "active" }
          : report
      )
    );
  };

  const reportCategories: ReportCategory[] = [
    {
      id: "business",
      name: "Business Reports",
      icon: BarChart3,
      description: "Overall business performance and trends",
      color: "bg-blue-50 text-blue-700 border-blue-200",
      count: 12,
    },
    {
      id: "financial",
      name: "Financial Reports",
      icon: DollarSign,
      description: "Revenue, transactions, and financial metrics",
      color: "bg-green-50 text-green-700 border-green-200",
      count: 18,
    },
    {
      id: "user",
      name: "User Reports",
      icon: Users,
      description: "User activity and engagement metrics",
      color: "bg-purple-50 text-purple-700 border-purple-200",
      count: 8,
    },
    {
      id: "performance",
      name: "Performance Reports",
      icon: TrendingUp,
      description: "Service quality and provider performance",
      color: "bg-orange-50 text-orange-700 border-orange-200",
      count: 15,
    },
    {
      id: "compliance",
      name: "Compliance Reports",
      icon: Shield,
      description: "Regulatory and compliance tracking",
      color: "bg-red-50 text-red-700 border-red-200",
      count: 6,
    },
  ];

  const reportTemplates: ReportTemplate[] = [
    {
      id: "daily",
      name: "Daily Summary",
      category: "Business",
      description: "Daily business performance snapshot",
      icon: Calendar,
    },
    {
      id: "weekly",
      name: "Weekly Summary",
      category: "Business",
      description: "Week-over-week performance analysis",
      icon: Calendar,
    },
    {
      id: "monthly",
      name: "Monthly Summary",
      category: "Business",
      description: "Monthly comprehensive report",
      icon: Calendar,
    },
    {
      id: "custom",
      name: "Custom Report Builder",
      category: "Custom",
      description: "Build your own custom report",
      icon: FileText,
    },
  ];

  const recentReports: RecentReport[] = [
    {
      id: "REP-001",
      name: "March 2026 Financial Report",
      generatedDate: "2026-03-30 08:45 AM",
      format: "PDF",
      size: "2.4 MB",
      category: "Financial",
    },
    {
      id: "REP-002",
      name: "Q1 2026 Business Performance",
      generatedDate: "2026-03-29 02:30 PM",
      format: "Excel",
      size: "1.8 MB",
      category: "Business",
    },
    {
      id: "REP-003",
      name: "Provider Performance - Week 13",
      generatedDate: "2026-03-29 10:15 AM",
      format: "PDF",
      size: "956 KB",
      category: "Performance",
    },
    {
      id: "REP-004",
      name: "User Activity Report - March",
      generatedDate: "2026-03-28 03:20 PM",
      format: "Excel",
      size: "1.2 MB",
      category: "User",
    },
    {
      id: "REP-005",
      name: "Compliance Audit - Q1 2026",
      generatedDate: "2026-03-27 11:00 AM",
      format: "PDF",
      size: "3.1 MB",
      category: "Compliance",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-1">
            Generate, schedule, and download business reports
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setScheduleModalOpen(true)}
          >
            <Clock className="w-4 h-4 mr-2" />
            Schedule Report
          </Button>
          <Button
            size="sm"
            className="bg-[#16A34A] hover:bg-[#15803D]"
            onClick={() => setGenerateModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Generate New Report
          </Button>
        </div>
      </div>

      {/* Report Categories */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Categories</h2>
        <div className="grid grid-cols-5 gap-4">
          {reportCategories.map((category) => (
            <Card
              key={category.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {category.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {category.count} templates
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Report Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {reportTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 border rounded-lg hover:border-[#16A34A] hover:bg-[#F0FDF4] transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <template.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {template.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {template.description}
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-2 text-xs bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {template.category}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Scheduled Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Report Name</TableHead>
                  <TableHead className="w-[200px]">Frequency</TableHead>
                  <TableHead className="w-[300px]">Recipients</TableHead>
                  <TableHead className="w-[150px]">Last Sent</TableHead>
                  <TableHead className="w-[150px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduledReportsState.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {report.name}
                          </p>
                          <p className="text-xs text-gray-500">{report.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {report.frequency}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 flex-wrap">
                        {report.recipients.slice(0, 2).map((email, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs bg-gray-50 text-gray-600 border-gray-200"
                          >
                            <Mail className="w-3 h-3 mr-1" />
                            {email}
                          </Badge>
                        ))}
                        {report.recipients.length > 2 && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-gray-50 text-gray-600 border-gray-200"
                          >
                            +{report.recipients.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-gray-600">
                        {report.lastSent}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={report.status === "active"}
                            onCheckedChange={() => handleToggleReportStatus(report.id)}
                          />
                          <span className="text-xs text-gray-600">
                            {report.status === "active" ? "Active" : "Disabled"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Report Name</TableHead>
                  <TableHead className="w-[200px]">Generated Date</TableHead>
                  <TableHead className="w-[150px]">Category</TableHead>
                  <TableHead className="w-[100px]">Format</TableHead>
                  <TableHead className="w-[100px]">Size</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {report.format === "PDF" ? (
                          <FilePieChart className="w-4 h-4 text-red-500" />
                        ) : (
                          <FileSpreadsheet className="w-4 h-4 text-green-600" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {report.name}
                          </p>
                          <p className="text-xs text-gray-500">{report.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">
                        {report.generatedDate}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {report.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          report.format === "PDF"
                            ? "text-xs bg-red-50 text-red-700 border-red-200"
                            : "text-xs bg-green-50 text-green-700 border-green-200"
                        }
                      >
                        {report.format}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-gray-600">{report.size}</span>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[#16A34A] hover:text-[#15803D]"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Generate Report Modal */}
      <Dialog open={generateModalOpen} onOpenChange={setGenerateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generate New Report</DialogTitle>
            <DialogDescription>
              Select report type and parameters to generate a custom report
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="report-category">Report Category</Label>
              <Select>
                <SelectTrigger id="report-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business Reports</SelectItem>
                  <SelectItem value="financial">Financial Reports</SelectItem>
                  <SelectItem value="user">User Reports</SelectItem>
                  <SelectItem value="performance">Performance Reports</SelectItem>
                  <SelectItem value="compliance">Compliance Reports</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-template">Report Template</Label>
              <Select>
                <SelectTrigger id="report-template">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Summary</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                  <SelectItem value="monthly">Monthly Summary</SelectItem>
                  <SelectItem value="custom">Custom Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date-from">Date From</Label>
                <Input id="date-from" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-to">Date To</Label>
                <Input id="date-to" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Export Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger id="format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setGenerateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-[#16A34A] hover:bg-[#15803D]">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Report Modal */}
      <Dialog open={scheduleModalOpen} onOpenChange={setScheduleModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule Report</DialogTitle>
            <DialogDescription>
              Set up automatic report generation and delivery
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="schedule-name">Report Name</Label>
              <Input
                id="schedule-name"
                placeholder="e.g., Weekly Sales Report"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule-template">Report Template</Label>
              <Select>
                <SelectTrigger id="schedule-template">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Summary</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                  <SelectItem value="monthly">Monthly Summary</SelectItem>
                  <SelectItem value="custom">Custom Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select>
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipients">Recipients (comma-separated emails)</Label>
              <Input
                id="recipients"
                placeholder="email1@example.com, email2@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule-format">Export Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger id="schedule-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setScheduleModalOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-[#16A34A] hover:bg-[#15803D]">
              <Clock className="w-4 h-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}