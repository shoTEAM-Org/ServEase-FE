"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Calendar, DollarSign, Star } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        // Success - navigate to dashboard
        router.push('/dashboard');
      } else {
        setError('Please enter both email and password');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-['Inter',sans-serif]">
      <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-[#00BF63] via-[#16A34A] to-[#15803D] text-white relative overflow-hidden">
          {/* Decorative Shapes */}
          <div className="absolute -top-[10%] -right-[15%] w-[500px] h-[500px] rounded-full bg-white opacity-[0.08] blur-[80px]" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-white opacity-[0.05] blur-[60px]" />
          
          <div className="relative z-10 max-w-[500px] mx-auto">
            <h1 className="text-5xl font-bold mb-6 leading-tight font-['Poppins',sans-serif]">
              Welcome to <br /> ServEase
            </h1>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Empowering service providers to grow their business and manage everything in one place.
            </p>

            <div className="space-y-8">
              {[
                { title: "Manage Bookings", desc: "Easy-to-use calendar and scheduling tools to streamline your workflow", icon: Calendar },
                { title: "Track Earnings", desc: "Real-time insights into your income and financial performance", icon: DollarSign },
                { title: "Build Reputation", desc: "Collect reviews and showcase your work to attract more clients", icon: Star }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/20">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                    <p className="text-white/80 leading-relaxed text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex flex-col justify-center items-center p-8 bg-white overflow-y-auto">
          <div className="w-full max-w-[440px]">
            {/* Mobile Branding Placeholder */}
            <div className="lg:hidden mb-8 text-center">
              <div className="text-3xl font-black text-[#00BF63] tracking-tighter">ServEase</div>
            </div>

            <div className="mb-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight font-['Poppins',sans-serif]">Provider Login</h2>
              <p className="text-gray-500 font-medium">Welcome back! Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 font-bold text-sm flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email or Phone Number</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00BF63] transition-colors" size={20} />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email or phone"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 outline-none focus:border-[#00BF63] focus:ring-4 focus:ring-green-50 transition-all font-medium text-gray-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00BF63] transition-colors" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-100 outline-none focus:border-[#00BF63] focus:ring-4 focus:ring-green-50 transition-all font-medium text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-gray-200 text-[#00BF63] focus:ring-[#00BF63] pointer-events-none"
                  />
                  <span className="text-sm font-bold text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
                </label>
                <button type="button" className="text-sm font-bold text-[#00BF63] hover:text-[#16A34A] transition-colors">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00BF63] to-[#16A34A] text-white font-bold text-lg shadow-lg shadow-green-100 hover:shadow-green-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:pointer-events-none"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Log In
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-gray-500 font-medium">
                New provider?{' '}
                <button
                  onClick={() => router.push('/apply')}
                  className="text-[#00BF63] font-bold hover:underline"
                >
                  Apply now
                </button>
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-center gap-8 text-[13px] font-bold text-gray-400">
              <button className="hover:text-gray-600 transition-colors">Terms of Service</button>
              <button className="hover:text-gray-600 transition-colors">Privacy Policy</button>
              <button className="hover:text-gray-600 transition-colors">Help Center</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function XCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
