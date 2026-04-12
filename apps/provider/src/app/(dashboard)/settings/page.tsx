"use client";

import { useState } from "react";
import { 
  User, 
  Bell, 
  Lock, 
  Shield, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  CreditCard, 
  MapPin, 
  Clock, 
  DollarSign, 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  HelpCircle, 
  FileText, 
  Users, 
  LogOut, 
  Smartphone, 
  Mail,
  CheckCircle2,
  Globe,
  Trash2,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Switch } from "../../components/ui/switch";
import { Badge } from "../../components/ui/badge";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    push: true,
    sms: false,
    email: true,
    security: true
  });
  
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false
  });

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const settingsOptions = [
    { label: "Profile Information", icon: User, path: "/profile", color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Services & Pricing", icon: DollarSign, path: "/bookings", color: "text-[#00BF63]", bg: "bg-green-50" },
    { label: "Payout Methods", icon: CreditCard, path: "/earningsdashboard", color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Availability Hooks", icon: Clock, path: "/calendar", color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-10 font-['Inter',sans-serif]">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black text-gray-900 font-['Poppins',sans-serif] tracking-tight">System Configuration</h1>
        <p className="text-gray-500 font-medium font-['Inter',sans-serif]">Manage your operational parameters and security protocols.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
         
         {/* Left Column: Quick Links & Identity */}
         <div className="space-y-8">
            <Card className="border-none shadow-xl shadow-gray-100/50 rounded-[2.5rem] overflow-hidden bg-white">
               <CardHeader className="p-8 pb-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Business Identity</span>
               </CardHeader>
               <CardContent className="p-8 pt-0 space-y-4">
                  {settingsOptions.map((opt, idx) => (
                    <Link key={idx} href={opt.path} className="group">
                       <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-[#00BF63] hover:bg-white transition-all group-hover:shadow-lg group-hover:shadow-green-50">
                          <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 ${opt.bg} ${opt.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <opt.icon className="w-5 h-5" />
                             </div>
                             <span className="text-sm font-black text-gray-900 leading-none">{opt.label}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#00BF63] group-hover:translate-x-1 transition-all" />
                       </div>
                    </Link>
                  ))}
               </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-gray-100/50 rounded-[2.5rem] overflow-hidden bg-gray-900 text-white p-8">
               <h3 className="text-xl font-black font-['Poppins',sans-serif] mb-6 tracking-tight">Security Status</h3>
               <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                     <ShieldCheck className="w-8 h-8 text-[#00BF63]" />
                     <div>
                        <p className="text-xs font-black uppercase tracking-widest text-[#00BF63]">Level: High</p>
                        <p className="text-[10px] font-bold text-white/40">2FA is currently active on your account.</p>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase">
                        <span>Shield Integrity</span>
                        <span>100%</span>
                     </div>
                     <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00BF63] w-full" />
                     </div>
                  </div>
               </div>
            </Card>
         </div>

         {/* Middle Column: Core Settings */}
         <div className="xl:col-span-2 space-y-10">
            {/* Notifications Section */}
            <Card className="border-none shadow-2xl shadow-gray-200/50 rounded-[3rem] overflow-hidden">
               <CardHeader className="p-10 border-b border-gray-50 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-8 bg-[#00BF63] rounded-full" />
                     <CardTitle className="text-2xl font-black font-['Poppins',sans-serif]">Alert Preferences</CardTitle>
                  </div>
                  <Badge variant="outline" className="border-gray-200 text-gray-400 font-black h-8 px-4 rounded-xl text-[10px] uppercase tracking-widest">Real-time Synchronization</Badge>
               </CardHeader>
               <CardContent className="p-10 space-y-8">
                  {[
                    { id: 'push', label: 'Push Notifications', sub: 'Instant alerts on your mobile device for new bookings.', icon: Smartphone },
                    { id: 'sms', label: 'SMS Notifications', sub: 'Direct text messages for critical schedule updates.', icon: Smartphone },
                    { id: 'email', label: 'Email Summaries', sub: 'Weekly performance reports and financial statements.', icon: Mail },
                    { id: 'security', label: 'Critical Security', sub: 'Alerts regarding logins from unrecognized devices.', icon: Shield }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between group">
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-[#00BF63] group-hover:text-white transition-all">
                             <item.icon className="w-6 h-6" />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-lg font-black text-gray-900 font-['Poppins',sans-serif] leading-none mb-1">{item.label}</span>
                             <span className="text-sm font-medium text-gray-400">{item.sub}</span>
                          </div>
                       </div>
                       <Switch 
                         checked={notifications[item.id as keyof typeof notifications]} 
                         onCheckedChange={(checked) => setNotifications(prev => ({...prev, [item.id]: checked}))}
                         className="data-[state=checked]:bg-[#00BF63]"
                       />
                    </div>
                  ))}
               </CardContent>
            </Card>

            {/* Security Section: Password Change */}
            <Card className="border-none shadow-2xl shadow-gray-200/50 rounded-[3rem] overflow-hidden">
               <CardHeader className="p-10 border-b border-gray-50">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-8 bg-amber-500 rounded-full" />
                     <CardTitle className="text-2xl font-black font-['Poppins',sans-serif]">Privacy & Credentials</CardTitle>
                  </div>
               </CardHeader>
               <CardContent className="p-10 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Current Authentication</label>
                           <div className="relative group">
                              <Input 
                                type={showPassword.current ? "text" : "password"} 
                                placeholder="••••••••••••" 
                                className="h-14 px-6 rounded-2xl border-2 border-gray-100 bg-gray-50/30 focus:bg-white focus:border-amber-500 transition-all font-bold placeholder:text-gray-200"
                              />
                              <button 
                                onClick={() => setShowPassword(p => ({...p, current: !p.current}))}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-amber-500"
                              >
                                {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">New Password Key</label>
                           <div className="relative group">
                              <Input 
                                type={showPassword.new ? "text" : "password"} 
                                placeholder="Min. 8 characters" 
                                className="h-14 px-6 rounded-2xl border-2 border-gray-100 bg-gray-50/30 focus:bg-white focus:border-amber-500 transition-all font-bold placeholder:text-gray-200"
                              />
                              <button 
                                onClick={() => setShowPassword(p => ({...p, new: !p.new}))}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-amber-500"
                              >
                                {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                           </div>
                        </div>
                     </div>

                     <div className="bg-amber-50/30 p-8 rounded-[2rem] border border-amber-100 space-y-6">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                              <Lock className="w-5 h-5 text-amber-600" />
                           </div>
                           <h4 className="text-sm font-black text-amber-900 uppercase tracking-widest leading-none">Security Tip</h4>
                        </div>
                        <p className="text-sm text-amber-700 font-medium leading-relaxed italic">
                           "Rotate your credentials every 90 days of operation to ensure maximum protection against unauthorized access to your earnings dashboard."
                        </p>
                        <Button className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl shadow-lg shadow-amber-100 uppercase text-[10px] tracking-widest">
                           Update Security Key
                        </Button>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* General Preferences */}
            <Card className="border-none shadow-2xl shadow-gray-200/50 rounded-[3rem] overflow-hidden">
               <CardHeader className="p-10 border-b border-gray-50">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-8 bg-indigo-500 rounded-full" />
                     <CardTitle className="text-2xl font-black font-['Poppins',sans-serif]">System Experience</CardTitle>
                  </div>
               </CardHeader>
               <CardContent className="p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-10">
                        <div className="space-y-4">
                           <div className="flex items-center gap-2">
                              <Globe className="w-5 h-5 text-indigo-500" />
                              <span className="text-sm font-black text-gray-900 uppercase ml-2 tracking-widest">Display Region</span>
                           </div>
                           <select className="w-full h-14 px-6 rounded-2xl border-2 border-gray-100 bg-white font-bold text-gray-900 shadow-sm focus:border-indigo-500 outline-none">
                              <option>Philippines (PHP)</option>
                              <option>United States (USD)</option>
                              <option>European Union (EUR)</option>
                           </select>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                               <Sun className="w-5 h-5 text-indigo-500" />
                               <span className="text-sm font-black text-gray-900 uppercase ml-2 tracking-widest">Interface Skin</span>
                            </div>
                            <div className="flex gap-4">
                               <button 
                                 onClick={() => setTheme('light')}
                                 className={`flex-1 h-14 rounded-2xl border-2 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all ${theme === 'light' ? "bg-indigo-50 border-indigo-500 text-indigo-600 shadow-lg" : "bg-white border-gray-100 text-gray-400 hover:border-indigo-200"}`}
                               >
                                  <Sun className="w-4 h-4" /> Light
                               </button>
                               <button 
                                 onClick={() => setTheme('dark')}
                                 className={`flex-1 h-14 rounded-2xl border-2 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all ${theme === 'dark' ? "bg-indigo-50 border-indigo-500 text-indigo-600 shadow-lg" : "bg-white border-gray-100 text-gray-400 hover:border-indigo-200"}`}
                               >
                                  <Moon className="w-4 h-4" /> Dark
                               </button>
                            </div>
                        </div>
                     </div>

                     <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 flex flex-col justify-between">
                        <div className="space-y-4">
                           <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Account Control</h4>
                           <Button variant="outline" className="w-full h-12 rounded-xl bg-white border-gray-100 text-gray-500 font-bold hover:bg-gray-100">
                              <Smartphone className="w-4 h-4 mr-2" /> Download Mobile App
                           </Button>
                           <Button variant="outline" className="w-full h-12 rounded-xl bg-white border-gray-100 text-red-500 font-bold hover:bg-red-50 hover:border-red-100">
                              <LogOut className="w-4 h-4 mr-2" /> Sign Out from All Devices
                           </Button>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-200">
                           <Button variant="ghost" className="w-full h-12 text-red-300 font-black uppercase text-[9px] tracking-[0.3em] hover:text-red-500 hover:bg-red-50">
                              <Trash2 className="w-4 h-4 mr-2" /> Permanently Delete Account
                           </Button>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>

      {/* Footer Support Banner */}
      <div className="p-10 rounded-[2.5rem] bg-[#00BF63] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-green-100 relative overflow-hidden group h-32">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
         <div className="relative z-10 flex items-center gap-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 rotate-12 group-hover:rotate-0 transition-transform duration-500">
               <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <div>
               <h3 className="text-2xl font-black font-['Poppins',sans-serif] tracking-tight mb-1 uppercase italic">Need System Assistance?</h3>
               <p className="text-green-50/80 font-bold text-sm">Our engineering support team is available 24/7 for operational inquiries.</p>
            </div>
         </div>
         <Button className="relative z-10 h-14 bg-white text-[#00BF63] hover:bg-green-50 font-black rounded-2xl px-10 shadow-xl shadow-green-900/20 uppercase tracking-widest text-xs">
            Open Support Ticket
         </Button>
      </div>
    </div>
  );
}
