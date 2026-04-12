"use client";

import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  X, 
  DollarSign, 
  Users, 
  CheckCircle, 
  XCircle, 
  MinusCircle,
  Plus,
  MoreHorizontal,
  MapPin,
  Filter
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useProviderData } from "../../context/ProviderDataContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

interface Booking {
  id: number;
  time: string;
  service: string;
  customer: string;
  location: string;
}

export default function CalendarPage() {
  const router = useRouter();
  const { blockedDates, providerData } = useProviderData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"Month" | "Week" | "Day">("Month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showEventModal, setShowEventModal] = useState(false);

  // Sample data (In a real app, this would come from an API or Context)
  const bookings: { [key: string]: Booking[] } = {
    "2026-03-20": [
      { id: 1, time: "9:00 AM", service: "House Cleaning", customer: "John Miller", location: "123 Oak St" },
      { id: 2, time: "2:00 PM", service: "Plumbing", customer: "Sarah Johnson", location: "456 Pine Ave" },
    ],
    "2026-03-22": [
      { id: 3, time: "10:00 AM", service: "Electrical", customer: "Michael Brown", location: "789 Maple Dr" },
    ],
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getWeekDays = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    const sunday = new Date(date.getFullYear(), date.getMonth(), diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(sunday);
      currentDay.setDate(sunday.getDate() + i);
      days.push(currentDay);
    }
    return days;
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isTodayDate = (date: Date) => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const isBlockedDate = (date: Date) => {
    const dateStr = formatDate(date);
    return blockedDates.includes(dateStr);
  };

  const isAvailable = (date: Date) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    if (
      providerData?.availability &&
      providerData.availability[dayName] &&
      providerData.availability[dayName].available === false
    ) {
      return false;
    }
    return true;
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const selectedDateStr = selectedDate ? formatDate(selectedDate) : "";
  const selectedBookings = selectedDateStr ? bookings[selectedDateStr] || [] : [];

  const timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
  ];

  const weekDays = getWeekDays(currentDate);

  const navigateDate = (direction: number) => {
    const newDate = new Date(currentDate);
    if (view === "Month") {
      newDate.setMonth(currentDate.getMonth() + direction);
    } else if (view === "Week") {
      newDate.setDate(currentDate.getDate() + (direction * 7));
    } else {
      newDate.setDate(currentDate.getDate() + direction);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-8 font-['Inter',sans-serif]">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-black text-gray-900 font-['Poppins',sans-serif] tracking-tight">Calendar</h1>
          <p className="text-gray-500 font-medium">Schedule control and booking synchronizations.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-200 font-bold text-gray-600 hover:bg-gray-50" onClick={() => setCurrentDate(new Date())}>
             Today
          </Button>
          <Button className="h-12 px-6 rounded-2xl bg-[#00BF63] hover:bg-[#00A055] text-white font-bold shadow-lg shadow-green-100" onClick={() => setShowEventModal(true)}>
             <Plus className="w-5 h-5 mr-2" />
             Set Availability
          </Button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        
        {/* Calendar Column */}
        <div className="xl:col-span-3 space-y-6">
           <Card className="border-none shadow-2xl shadow-gray-200/50 rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 border-b border-gray-50 flex flex-row items-center justify-between bg-white sticky top-0 z-10">
                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1 bg-gray-100 p-1.5 rounded-2xl">
                       {["Month", "Week", "Day"].map((v) => (
                         <button
                           key={v}
                           onClick={() => setView(v as any)}
                           className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === v ? "bg-white text-[#00BF63] shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                         >
                           {v}
                         </button>
                       ))}
                    </div>
                    <div className="flex items-center gap-2">
                       <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl" onClick={() => navigateDate(-1)}>
                          <ChevronLeft className="w-5 h-5" />
                       </Button>
                       <h2 className="text-xl font-black text-gray-900 font-['Poppins',sans-serif] min-w-[200px] text-center capitalize">
                          {view === "Month" && `${monthName} ${year}`}
                          {view === "Week" && `Week of ${weekDays[0].toLocaleDateString("default", { month: "short", day: "numeric" })}`}
                          {view === "Day" && currentDate.toLocaleDateString("default", { weekday: "long", month: "long", day: "numeric" })}
                       </h2>
                       <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl" onClick={() => navigateDate(1)}>
                          <ChevronRight className="w-5 h-5" />
                       </Button>
                    </div>
                 </div>
                 <Button variant="outline" className="rounded-xl font-bold bg-white/50 border-gray-100">
                    <Filter className="w-4 h-4 mr-2" /> Filter
                 </Button>
              </CardHeader>

              <CardContent className="p-0">
                 {view === "Month" && (
                   <div className="p-8">
                      <div className="grid grid-cols-7 gap-px bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-inner">
                         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                           <div key={d} className="bg-white py-4 text-center">
                              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{d}</span>
                           </div>
                         ))}
                         {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                           <div key={`empty-${i}`} className="bg-white/50 aspect-square border-t border-l border-gray-50" />
                         ))}
                         {Array.from({ length: daysInMonth }).map((_, i) => {
                           const day = i + 1;
                           const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                           const dStr = formatDate(date);
                           const isSelected = selectedDateStr === dStr;
                           const isT = isTodayDate(date);
                           const isB = isBlockedDate(date);
                           const isA = isAvailable(date);
                           const dayBookings = bookings[dStr] || [];

                           return (
                             <div
                               key={day}
                               onClick={() => setSelectedDate(date)}
                               className={`bg-white aspect-square border-t border-l border-gray-50 relative p-4 cursor-pointer transition-all hover:bg-gray-50/50 group ${isSelected ? "ring-2 ring-inset ring-[#00BF63] bg-green-50/10" : ""}`}
                             >
                                <span className={`text-sm font-black transition-colors ${isT ? "text-[#00BF63]" : isB ? "text-gray-300" : "text-gray-900 group-hover:text-[#00BF63]"}`}>
                                   {day}
                                </span>
                                
                                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1">
                                   {isB ? (
                                     <Badge className="bg-red-50 text-red-500 border-none text-[8px] font-black uppercase tracking-tighter px-1.5 py-0">Blocked</Badge>
                                   ) : dayBookings.length > 0 ? (
                                     <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        <span className="text-[9px] font-bold text-gray-400">{dayBookings.length} Book</span>
                                     </div>
                                   ) : !isA ? (
                                     <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                                   ) : null}
                                </div>
                             </div>
                           )
                         })}
                      </div>
                   </div>
                 )}

                 {view === "Day" && (
                   <div className="p-8 space-y-4 max-h-[700px] overflow-y-auto">
                      {timeSlots.map(slot => {
                        const dStr = formatDate(currentDate);
                        const dayBookings = bookings[dStr] || [];
                        const b = dayBookings.find(x => x.time === slot);

                        return (
                          <div key={slot} className="flex gap-8 group">
                             <span className="w-20 text-xs font-black text-gray-300 uppercase tracking-widest pt-4">{slot}</span>
                             <div className={`flex-1 min-h-[100px] rounded-[1.5rem] border-2 border-dashed transition-all p-6 flex flex-col justify-center ${b ? "bg-blue-50 border-blue-100" : "bg-white border-gray-50 hover:border-[#00BF63] hover:bg-green-50/30"}`}>
                                {b ? (
                                  <div className="flex items-center justify-between">
                                     <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                           <Users className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <div className="flex flex-col">
                                           <span className="text-lg font-black text-blue-900 font-['Poppins',sans-serif] tracking-tight">{b.customer}</span>
                                           <span className="text-sm font-bold text-blue-500 uppercase tracking-widest">{b.service}</span>
                                        </div>
                                     </div>
                                     <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2 text-blue-400">
                                           <MapPin className="w-4 h-4" />
                                           <span className="text-xs font-bold">{b.location}</span>
                                        </div>
                                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl text-blue-300">
                                           <MoreHorizontal className="w-5 h-5" />
                                        </Button>
                                     </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 text-gray-200 font-black text-sm uppercase tracking-widest group-hover:text-[#00BF63] transition-colors">
                                     <Plus className="w-4 h-4" /> Open Slot
                                  </div>
                                )}
                             </div>
                          </div>
                        )
                      })}
                   </div>
                 )}
                 
                 {view === "Week" && (
                   <div className="p-8">
                      <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-4">
                         <div />
                         {weekDays.map(d => (
                            <div key={d.toISOString()} className={`p-4 rounded-2xl text-center flex flex-col gap-1 border ${isTodayDate(d) ? "bg-[#00BF63] border-[#00BF63] text-white" : "bg-gray-50 border-transparent"}`}>
                               <span className={`text-[10px] font-black uppercase tracking-widest ${isTodayDate(d) ? "text-white/70" : "text-gray-300"}`}>{d.toLocaleDateString("default", { weekday: "short" })}</span>
                               <span className="text-xl font-black">{d.getDate()}</span>
                            </div>
                         ))}
                         
                         {timeSlots.slice(0, 8).map(slot => (
                           <>
                              <div key={slot} className="text-[10px] font-black text-gray-300 uppercase tracking-widest pt-2 flex items-center justify-end">{slot}</div>
                              {weekDays.map(d => {
                                const b = (bookings[formatDate(d)] || []).find(x => x.time === slot);
                                return (
                                  <div key={`${d.toISOString()}-${slot}`} className={`h-24 rounded-2xl border transition-all relative group ${b ? "bg-blue-500 border-blue-400 shadow-lg shadow-blue-100" : "bg-white border-gray-50 hover:border-gray-200"}`}>
                                     {b && (
                                       <div className="p-3">
                                          <div className="text-[9px] font-black text-white/50 uppercase tracking-tighter truncate leading-none mb-1">{b.service}</div>
                                          <div className="text-[11px] font-black text-white truncate leading-none">{b.customer}</div>
                                       </div>
                                     )}
                                     {!b && <Plus className="absolute top-2 right-2 w-4 h-4 text-gray-100 group-hover:text-[#00BF63] opacity-0 group-hover:opacity-100 transition-all" />}
                                  </div>
                                )
                              })}
                           </>
                         ))}
                      </div>
                   </div>
                 )}
              </CardContent>
           </Card>
        </div>

        {/* Side Details Panel */}
        <div className="space-y-8">
           <Card className="border-none shadow-xl shadow-gray-100/50 rounded-[2.5rem] overflow-hidden bg-white">
              <CardHeader className="p-8 bg-gray-900 text-white relative">
                 <div className="absolute top-0 right-0 p-4">
                    <CalendarIcon className="w-12 h-12 text-white/5" />
                 </div>
                 <div className="relative z-10">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2 font-['Inter',sans-serif]">Selected Date</p>
                    <h3 className="text-3xl font-black font-['Poppins',sans-serif] tracking-tight">
                       {selectedDate ? selectedDate.toLocaleDateString("default", { month: "short", day: "numeric" }) : "Pick a date"}
                    </h3>
                 </div>
              </CardHeader>
              <CardContent className="p-8">
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Schedule</h4>
                       <Badge className="bg-[#DCFCE7] text-[#00BF63] border-none font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter">
                          {selectedBookings.length} Bookings
                       </Badge>
                    </div>
                    
                    {selectedBookings.length > 0 ? (
                      <div className="space-y-4">
                         {selectedBookings.map(b => (
                           <div key={b.id} className="p-5 rounded-[1.5rem] bg-gray-50 border border-transparent hover:border-blue-100 transition-all group">
                              <div className="flex items-center justify-between mb-3">
                                 <div className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                                    <span className="text-xs font-black text-blue-900">{b.time}</span>
                                 </div>
                                 <Badge variant="outline" className="text-[9px] font-black border-blue-100 text-blue-500 uppercase px-2 py-0">Active</Badge>
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-sm font-black text-gray-900 leading-tight mb-1">{b.customer}</span>
                                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{b.service}</span>
                              </div>
                              <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                 <MapPin className="w-3 h-3" /> {b.location}
                              </div>
                           </div>
                         ))}
                      </div>
                    ) : (
                      <div className="py-20 flex flex-col items-center justify-center text-center">
                         <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Clock className="w-8 h-8 text-gray-200" />
                         </div>
                         <p className="text-gray-400 font-bold text-sm italic">Clear schedule on this day.</p>
                      </div>
                    )}
                 </div>

                 <div className="mt-10 pt-10 border-t border-gray-50 space-y-6">
                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Today's Performance</h4>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-5 rounded-3xl bg-blue-50 flex flex-col gap-1 overflow-hidden relative">
                          <DollarSign className="absolute -bottom-2 -right-2 w-12 h-12 text-blue-100/50" />
                          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Revenue</span>
                          <span className="text-xl font-black text-blue-900">₱4,500</span>
                       </div>
                       <div className="p-5 rounded-3xl bg-green-50 flex flex-col gap-1 overflow-hidden relative">
                          <CheckCircle className="absolute -bottom-2 -right-2 w-12 h-12 text-green-100/50" />
                          <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Done</span>
                          <span className="text-xl font-black text-[#00BF63]">3/8</span>
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
