"use client";

import { useState } from "react";
import { Search, Filter, MapPin, Calendar, Clock, ChevronRight, X, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";

type TabType = "new-requests" | "upcoming" | "in-progress" | "completed" | "cancelled" | "declined";

interface Item {
  id: string;
  customerName: string;
  serviceType: string;
  date: string;
  time: string;
  location: string;
  distance?: string;
  price: number;
  status: TabType;
}

export default function BookingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("new-requests");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Mock data
  const items: Item[] = [
    {
      id: "1",
      customerName: "Maria Santos",
      serviceType: "Plumbing Repair",
      date: "March 25, 2024",
      time: "2:00 PM",
      location: "123 Quezon Ave, Quezon City",
      price: 1500,
      status: "new-requests",
    },
    {
      id: "2",
      customerName: "Juan dela Cruz",
      serviceType: "Pipe Installation",
      date: "March 26, 2024",
      time: "10:00 AM",
      location: "456 Taft Avenue, Manila",
      price: 3500,
      status: "new-requests",
    },
    {
      id: "3",
      customerName: "Anna Reyes",
      serviceType: "Toilet Repair",
      date: "March 27, 2024",
      time: "9:00 AM",
      location: "789 Rizal Street, Makati",
      distance: "2.5 km",
      price: 800,
      status: "upcoming",
    },
    {
      id: "4",
      customerName: "Carlos Mendoza",
      serviceType: "Water Heater Installation",
      date: "March 24, 2024",
      time: "1:00 PM",
      location: "321 EDSA, Pasig City",
      price: 4200,
      status: "in-progress",
    },
    {
      id: "5",
      customerName: "Sofia Garcia",
      serviceType: "Drain Cleaning",
      date: "March 22, 2024",
      time: "3:00 PM",
      location: "555 Aurora Blvd, San Juan",
      price: 600,
      status: "completed",
    },
    {
      id: "6",
      customerName: "Roberto Cruz",
      serviceType: "Pipe Leak Repair",
      date: "March 21, 2024",
      time: "11:00 AM",
      location: "888 Shaw Blvd, Mandaluyong",
      price: 1000,
      status: "cancelled",
    },
    {
      id: "7",
      customerName: "Linda Torres",
      serviceType: "Faucet Installation",
      date: "March 23, 2024",
      time: "4:00 PM",
      location: "999 Ortigas Ave, Pasig",
      price: 750,
      status: "declined",
    },
  ];

  const filteredItems = items.filter((item) => {
    if (item.status !== activeTab) return false;
    if (
      searchQuery &&
      !item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const counts = {
    "new-requests": items.filter((i) => i.status === "new-requests").length,
    upcoming: items.filter((i) => i.status === "upcoming").length,
    "in-progress": items.filter((i) => i.status === "in-progress").length,
    completed: items.filter((i) => i.status === "completed").length,
    cancelled: items.filter((i) => i.status === "cancelled").length,
    declined: items.filter((i) => i.status === "declined").length,
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "new-requests": return { label: "New Request", color: "bg-blue-100 text-blue-700", icon: Clock };
      case "upcoming": return { label: "Upcoming", color: "bg-indigo-100 text-indigo-700", icon: Calendar };
      case "in-progress": return { label: "In Progress", color: "bg-amber-100 text-amber-700", icon: TrendingUp };
      case "completed": return { label: "Completed", color: "bg-green-100 text-green-700", icon: CheckCircle };
      case "cancelled": return { label: "Cancelled", color: "bg-red-100 text-red-700", icon: X };
      case "declined": return { label: "Declined", color: "bg-gray-100 text-gray-700", icon: AlertCircle };
      default: return { label: status, color: "bg-gray-100 text-gray-700", icon: Clock };
    }
  };

  return (
    <div className="space-y-8 font-['Inter',sans-serif]">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-black text-gray-900 font-['Poppins',sans-serif] tracking-tight">Bookings & Requests</h1>
          <p className="text-gray-500 font-medium">Manage your service pipeline and respond to new opportunities.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00BF63] transition-colors" />
            <Input
              placeholder="Search by name or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 w-full md:w-80 rounded-2xl border-none shadow-sm group-focus-within:shadow-md transition-all"
            />
          </div>
          <Button variant="outline" className="h-12 px-6 rounded-2xl border-none shadow-sm font-bold gap-2 bg-white hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex flex-wrap items-center gap-2 bg-white/50 backdrop-blur-sm p-1.5 rounded-[2rem] border border-gray-100/50 w-fit">
        {(["new-requests", "upcoming", "in-progress", "completed", "cancelled", "declined"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              flex items-center gap-2 px-6 py-3.5 rounded-[1.5rem] text-sm font-black transition-all
              ${activeTab === tab
                ? "bg-[#00BF63] text-white shadow-lg shadow-green-100"
                : "text-gray-400 hover:text-gray-600 hover:bg-white"
              }
            `}
          >
            {tab.replace("-", " ").charAt(0).toUpperCase() + tab.replace("-", " ").slice(1)}
            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${activeTab === tab ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* List Section */}
      <div className="grid grid-cols-1 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const config = getStatusConfig(item.status);
            const initials = item.customerName.split(" ").map(n => n[0]).join("");
            
            return (
              <Card key={item.id} className="border-none shadow-xl shadow-gray-100/50 rounded-[2.5rem] overflow-hidden group hover:scale-[1.01] transition-all duration-300">
                <CardContent className="p-8 flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                  <div className="flex-1 flex flex-col md:flex-row md:items-center gap-6">
                    {/* Avatar & Basic Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-xl font-black text-gray-400 border border-gray-50">
                        {initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xl font-black text-gray-900 font-['Poppins',sans-serif] tracking-tight">{item.customerName}</span>
                        <span className="text-sm font-bold text-[#00BF63] uppercase tracking-widest">{item.serviceType}</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block h-12 w-px bg-gray-100 mx-4" />

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1">
                      <div className="flex items-center gap-3 text-gray-500 group">
                        <div className="p-2.5 rounded-xl bg-gray-50 group-hover:bg-blue-50 transition-colors">
                           <Calendar className="w-5 h-5 group-hover:text-blue-500" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Date</span>
                           <span className="text-sm font-bold text-gray-700">{item.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500 group">
                        <div className="p-2.5 rounded-xl bg-gray-50 group-hover:bg-amber-50 transition-colors">
                           <Clock className="w-5 h-5 group-hover:text-amber-500" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Time</span>
                           <span className="text-sm font-bold text-gray-700">{item.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500 group">
                        <div className="p-2.5 rounded-xl bg-gray-50 group-hover:bg-red-50 transition-colors">
                           <MapPin className="w-5 h-5 group-hover:text-red-500" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Location</span>
                           <span className="text-sm font-bold text-gray-700 line-clamp-1">{item.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Status & Actions */}
                  <div className="flex items-center gap-10">
                    <div className="flex flex-col items-end">
                      <Badge className={`${config.color} border-none font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg mb-2`}>
                        <config.icon className="w-3 h-3 mr-1.5" />
                        {config.label}
                      </Badge>
                      <span className="text-2xl font-black text-gray-900">₱{item.price.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                       {item.status === "new-requests" ? (
                         <>
                           <Button className="h-14 px-8 rounded-2xl bg-[#00BF63] hover:bg-[#00A055] text-white font-black shadow-lg shadow-green-100 transition-all hover:scale-[1.05]">
                             Accept
                           </Button>
                           <Button variant="outline" className="h-14 px-6 rounded-2xl border-2 border-gray-100 font-bold hover:bg-gray-50">
                             Counter
                           </Button>
                         </>
                       ) : (
                         <Button variant="ghost" className="h-14 w-14 rounded-2xl text-gray-300 hover:text-[#00BF63] hover:bg-green-50 p-0" onClick={() => router.push(`/bookings/${item.id}`)}>
                            <ChevronRight className="w-8 h-8" />
                         </Button>
                       )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="py-32 flex flex-col items-center justify-center text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-6">
               <Calendar className="w-10 h-10 text-gray-200" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 font-['Poppins',sans-serif]">No bookings found</h3>
            <p className="text-gray-400 font-medium mt-2">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
