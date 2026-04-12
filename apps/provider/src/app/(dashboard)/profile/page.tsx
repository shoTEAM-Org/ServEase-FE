"use client";

import { useState } from "react";
import {
  Star,
  CheckCircle2,
  Shield,
  Award,
  MessageCircle,
  Clock,
  MapPin,
  Edit2,
  Briefcase,
  Calendar,
  Camera,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Target
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useProviderData } from "../../context/ProviderDataContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export default function ProfilePage() {
  const router = useRouter();
  const { providerData } = useProviderData();
  const [activeTab, setActiveTab] = useState("About");
  
  const tabs = ["About", "Services & Pricing", "Portfolio", "Reviews", "Availability"];

  const badges = [
    { icon: CheckCircle2, label: "Verified", color: "text-[#00BF63]", bg: "bg-[#DCFCE7]" },
    { icon: Shield, label: "Licensed", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Award, label: "Top Rated", color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-10 font-['Inter',sans-serif]">
      {/* Hero Section: Cover & Identity */}
      <div className="relative group">
        <div className="h-[350px] w-full rounded-[3rem] overflow-hidden relative shadow-2xl">
          <img
            src={providerData.profile.coverPhotoUrl}
            alt="Cover"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <Button variant="outline" className="active:scale-95 absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border-white/20 text-white font-black rounded-2xl h-12 px-6 uppercase tracking-widest text-[10px] hover:bg-white/20">
             <Camera className="w-4 h-4 mr-2" />
             Edit Cover
          </Button>
        </div>

        <div className="px-10 -mt-24 relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
           <div className="flex flex-col lg:flex-row lg:items-end gap-10">
              <div className="relative">
                 <div className="w-48 h-48 rounded-[2.5rem] bg-white p-2 shadow-2xl relative overflow-hidden">
                    <img
                      src={providerData.profile.profilePhotoUrl}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-[2rem]"
                    />
                 </div>
                 <button className="active:scale-90 absolute -bottom-2 -right-2 w-12 h-12 bg-[#00BF63] rounded-2xl flex items-center justify-center text-white shadow-xl hover:bg-[#00A055] transition-all border-4 border-white">
                    <Camera className="w-5 h-5" />
                 </button>
              </div>

              <div className="pb-4 space-y-4">
                 <div className="flex flex-col gap-1">
                    <h1 className="text-5xl font-black text-white font-['Poppins',sans-serif] tracking-tight drop-shadow-lg">
                       {providerData.profile.businessName}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-white/80 font-bold">
                       <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#00BF63]" />
                          <span className="text-sm">{providerData.profile.serviceAreas}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm">4.9 (247 Reviews)</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-[#00BF63]" />
                          <span className="text-sm">{providerData.profile.yearsExperience} Years Exp.</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex flex-wrap gap-2">
                    {badges.map((badge, idx) => (
                      <Badge key={idx} className={`${badge.bg} ${badge.color} border-none font-black text-[10px] px-4 py-1.5 rounded-xl uppercase tracking-tighter shadow-sm`}>
                         <badge.icon className="w-3 h-3 mr-1.5" />
                         {badge.label}
                      </Badge>
                    ))}
                 </div>
              </div>
           </div>

           <div className="pb-4 flex items-center gap-3">
              <Button variant="outline" className="active:scale-95 h-14 px-8 rounded-2xl bg-white border-transparent shadow-xl font-black text-gray-900 uppercase tracking-widest text-xs hover:bg-gray-50">
                 <ExternalLink className="w-4 h-4 mr-2" /> Share Profile
              </Button>
              <Button className="active:scale-95 h-14 px-10 rounded-2xl bg-[#00BF63] hover:bg-[#00A055] text-white font-black shadow-2xl shadow-green-200 uppercase tracking-widest text-xs">
                 <Edit2 className="w-4 h-4 mr-3" /> Edit Profile
              </Button>
           </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-4">
         {[
           { label: "Rating", value: "4.9/5", sub: "Top 5% in Manila", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
           { label: "Completion", value: "98.2%", sub: "Highly Reliable", icon: CheckCircle2, color: "text-[#00BF63]", bg: "bg-green-50" },
           { label: "Response", value: "< 15m", sub: "Lightning Fast", icon: MessageCircle, color: "text-blue-500", bg: "bg-blue-50" },
           { label: "Experience", value: "8 Years", sub: "Industry Expert", icon: Briefcase, color: "text-indigo-500", bg: "bg-indigo-50" }
         ].map((stat, idx) => (
           <Card key={idx} className="border-none shadow-xl shadow-gray-100/50 rounded-[2rem] group hover:scale-105 transition-all">
              <CardContent className="p-8 flex items-center gap-6">
                 <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform`}>
                    <stat.icon className={`w-7 h-7 ${stat.color}`} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                    <p className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</p>
                    <p className="text-[10px] font-bold text-gray-400 italic">{stat.sub}</p>
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        
        {/* Left Column: Details */}
        <div className="xl:col-span-2 space-y-10">
           {/* Navigation Tabs */}
           <div className="flex flex-wrap items-center gap-2 bg-gray-100 p-2 rounded-[2rem] w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-8 py-3.5 rounded-[1.5rem] text-xs font-black transition-all uppercase tracking-widest
                    ${activeTab === tab 
                      ? "bg-white text-[#00BF63] shadow-xl" 
                      : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
           </div>

           {/* Tab Views */}
           <Card className="border-none shadow-2xl shadow-gray-200/50 rounded-[3rem] overflow-hidden">
              <CardContent className="p-12">
                 {activeTab === "About" && (
                   <div className="space-y-10 animate-in fade-in duration-500">
                      <div className="space-y-6">
                         <div className="flex items-center gap-4">
                            <div className="w-2 h-8 bg-[#00BF63] rounded-full" />
                            <h2 className="text-3xl font-black text-gray-900 font-['Poppins',sans-serif]">Biography</h2>
                         </div>
                         <p className="text-lg text-gray-500 leading-relaxed font-medium">
                            {providerData.profile.bio}
                         </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-gray-50">
                         <div className="space-y-6">
                            <h3 className="text-xl font-black text-gray-900 font-['Poppins',sans-serif] uppercase tracking-tight">Languages</h3>
                            <div className="flex flex-wrap gap-3">
                               {providerData.profile.languages.map(lang => (
                                 <Badge key={lang} variant="outline" className="border-gray-200 h-10 px-6 rounded-2xl font-bold text-gray-500">
                                    {lang}
                                 </Badge>
                               ))}
                            </div>
                         </div>
                         <div className="space-y-6">
                            <h3 className="text-xl font-black text-gray-900 font-['Poppins',sans-serif] uppercase tracking-tight">Certification</h3>
                            <div className="flex items-center gap-4 p-5 rounded-3xl bg-amber-50/50 border border-amber-100">
                               <Award className="w-10 h-10 text-amber-500" />
                               <div>
                                  <p className="text-sm font-black text-amber-900">Elite Service Award</p>
                                  <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Global Standards Verified</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                 )}

                 {activeTab === "Services & Pricing" && (
                   <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-500">
                      <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-4">
                            <div className="w-2 h-8 bg-blue-500 rounded-full" />
                            <h2 className="text-3xl font-black text-gray-900 font-['Poppins',sans-serif]">Offerings</h2>
                         </div>
                         <Button variant="ghost" className="text-[#00BF63] font-black uppercase text-[10px] tracking-widest">
                            Manager Services <ChevronRight className="w-4 h-4 ml-1" />
                         </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {providerData.services.map((service, idx) => (
                           <div key={idx} className="p-8 rounded-[2.5rem] bg-gray-50 border border-transparent hover:border-blue-100 transition-all group">
                              <div className="flex items-center justify-between mb-4">
                                 <Badge className="bg-blue-100 text-blue-600 border-none font-black text-[10px] px-3 py-1 rounded-lg uppercase">
                                    {service.category}
                                 </Badge>
                                 <span className="text-lg font-black text-blue-900">₱{service.baseRate}<small className="text-xs font-bold text-blue-400">/{service.priceUnit.split(' ')[1]}</small></span>
                              </div>
                              <h4 className="text-xl font-black text-gray-900 font-['Poppins',sans-serif] mb-2">{service.name}</h4>
                              <p className="text-sm text-gray-500 font-medium line-clamp-2">{service.description}</p>
                              <div className="mt-8 flex items-center justify-between">
                                 <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                                    <Clock className="w-3.5 h-3.5" /> {service.estimatedDuration}
                                 </div>
                                 <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:border-blue-100 transition-all">
                                    <Edit2 className="w-4 h-4" />
                                 </button>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}

                 {activeTab === "Portfolio" && (
                   <div className="space-y-8 animate-in fade-in duration-500">
                      <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-4">
                            <div className="w-2 h-8 bg-indigo-500 rounded-full" />
                            <h2 className="text-3xl font-black text-gray-900 font-['Poppins',sans-serif]">Work Highlights</h2>
                         </div>
                         <Button variant="ghost" className="text-[#00BF63] font-black uppercase text-[10px] tracking-widest">
                            Add Gallery <Plus className="w-4 h-4 ml-1" />
                         </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                         {providerData.portfolioItems.map((item, idx) => (
                           <div key={idx} className="group relative h-72 rounded-[2rem] overflow-hidden shadow-xl">
                              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                                 <span className="text-[10px] font-black text-[#00BF63] uppercase tracking-[0.2em] mb-2">{item.category}</span>
                                 <h4 className="text-xl font-black text-white font-['Poppins',sans-serif]">{item.title}</h4>
                                 <p className="text-white/60 text-xs font-medium mt-1">{item.description}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}
              </CardContent>
           </Card>
        </div>

        {/* Right Column: Performance & Insights */}
        <div className="space-y-10">
           <Card className="border-none shadow-2xl shadow-gray-200/50 rounded-[2.5rem] overflow-hidden bg-gray-900 text-white p-10">
              <div className="space-y-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#00BF63] rounded-[1.5rem] flex items-center justify-center">
                       <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black font-['Poppins',sans-serif] tracking-tight">Elite Profile</h3>
                       <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Current Status</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span>Profile Maturity</span>
                          <span>92%</span>
                       </div>
                       <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#00BF63] to-green-400 w-[92%]" />
                       </div>
                    </div>
                    <p className="text-sm font-medium text-white/60 leading-relaxed">
                       Your profile is in the top <span className="text-white font-black">2%</span> of performing accounts. Keep your reviews high to maintain <span className="text-[#00BF63] font-black">Elite</span> status.
                    </p>
                 </div>

                 <Button className="w-full h-14 rounded-2xl bg-white/10 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                    View Analytics
                 </Button>
              </div>
           </Card>

           <Card className="border-none shadow-2xl shadow-gray-200/50 rounded-[2.5rem] overflow-hidden bg-white p-10">
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] mb-10 text-center">Milestones & Goals</h4>
              <div className="space-y-8">
                 {[
                   { label: "1,000 Bookings", current: 532, target: 1000, color: "bg-[#00BF63]" },
                   { label: "Elite Rating", current: 4.9, target: 5.0, color: "bg-amber-400" },
                   { label: "Review Count", current: 247, target: 500, color: "bg-blue-500" }
                 ].map((milestone, idx) => (
                   <div key={idx} className="space-y-4">
                      <div className="flex justify-between items-center">
                         <div className="flex items-center gap-3">
                            <Target className="w-4 h-4 text-gray-300" />
                            <span className="text-xs font-black text-gray-900 uppercase tracking-tight">{milestone.label}</span>
                         </div>
                         <span className="text-[10px] font-black text-gray-400">{Math.round((milestone.current/milestone.target)*100)}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                         <div className={`h-full ${milestone.color} transition-all duration-1000`} style={{ width: `${(milestone.current/milestone.target)*100}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </Card>

           <div className="relative overflow-hidden rounded-[2.5rem] p-10 bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-2xl group cursor-pointer">
              <div className="relative z-10 space-y-4">
                 <h4 className="text-2xl font-black font-['Poppins',sans-serif] italic tracking-tighter">BOOST YOUR VISIBILITY</h4>
                 <p className="text-sm font-medium text-white/70 leading-relaxed">Promote your profile to appear at the top of search results for specific neighborhoods.</p>
                 <ChevronRight className="w-8 h-8 opacity-40 group-hover:translate-x-2 transition-transform" />
              </div>
              <TrendingUp className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-12" />
           </div>
        </div>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  )
}
