"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  Settings, 
  BarChart3, 
  Bell, 
  User, 
  Menu, 
  Star, 
  Search, 
  HelpCircle, 
  TrendingUp, 
  Briefcase 
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { path: '/dashboard', icon: Home, label: 'Dashboard' },
      ]
    },
    {
      title: 'BOOKINGS',
      items: [
        { path: '/calendar', icon: Calendar, label: 'Calendar' },
        { path: '/bookings', icon: Briefcase, label: 'My Bookings' },
      ]
    },
    {
      title: 'BUSINESS',
      items: [
        { path: '/earningsdashboard', icon: BarChart3, label: 'Earnings' },
        { path: '/reviews', icon: Star, label: 'Reviews' },
        { path: '/performanceinsights', icon: TrendingUp, label: 'Performance Insights' },
        { path: '/analytics', icon: BarChart3, label: 'Analytics' },
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { path: '/messages', icon: MessageSquare, label: 'Messages' },
        { path: '/profile', icon: User, label: 'Profile' },
        { path: '/settings', icon: Settings, label: 'Settings' },
        { path: '/help-center', icon: HelpCircle, label: 'Help & Support' },
      ]
    }
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 font-['Inter',sans-serif]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00BF63] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl tracking-tighter italic">S</span>
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tighter font-['Poppins',sans-serif]">ServEase</span>
            </div>
            <div className="hidden md:block ml-8">
              <p className="text-lg font-bold text-gray-900 font-['Poppins',sans-serif]">Welcome back, Sarah Johnson</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden lg:flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2.5 w-80 border border-transparent focus-within:border-[#00BF63] focus-within:bg-white transition-all">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources, bookings..."
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full font-medium"
              />
            </div>

            <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors group">
              <Bell className="w-6 h-6 text-gray-500 group-hover:text-[#00BF63]" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center ring-2 ring-[#00BF63]/10">
                <User className="w-5 h-5 text-[#00BF63]" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-bold text-gray-900">Sarah Johnson</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#00BF63] rounded-full animate-pulse"></span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Provider</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 z-30
          w-72 transition-transform duration-300 lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0 layer-shadow' : '-translate-x-full'}
        `}>
          <nav className="p-4 pt-20 lg:pt-6 space-y-8 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
            {navSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-[10px] font-black text-gray-400 mb-4 px-4 tracking-[0.2em] uppercase">{section.title}</h3>
                <div className="space-y-1.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`
                          flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm
                          ${active 
                            ? 'bg-[#00BF63] text-white shadow-lg shadow-green-100 scale-[1.02]' 
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                          }
                        `}
                      >
                        <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-400'}`} />
                        <span>{item.label}</span>
                        {active && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
