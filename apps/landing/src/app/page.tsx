"use client";

import Link from "next/link";
import { Wrench, Sparkles, GraduationCap, Home, PawPrint, PartyPopper, MonitorSmartphone, CalendarCheck, ShieldCheck, Bell } from "lucide-react";
import imgPhone1 from "../assets/31e1a9b3084d9b3a61818bce08df43798ed241ff.png";
import imgPhone2 from "../assets/40ea87bb94f3a643b9de997535180f56ab898fbc.png";
import imgPhone3 from "../assets/46855b1e12ab8a84b80859405140be0d0321b1ab.png";
import imgPattern from "../assets/a79220d8871d1f9af80d841a247e73ebeca14b3f.png";
import imgHero from "../assets/a4d966e5771b713b7efb636298efbe07c97c3719.png";
import imgRider from "../assets/54bbb76b72deba23df9571249e0739677a0faed5.png";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { GooglePlayBadge, AppStoreBadge } from "./components/StoreBadges";
import { SectionHeading } from "./components/SectionHeading";
import { DESIGN, CSS_CLASSES } from "./constants/design";
import { BaseButton } from "./components/BaseButton";

const serviceCategories = [
  {
    icon: Wrench,
    title: "Home Maintenance & Repair",
    description: "Fix, install, or maintain your home with trusted electricians, plumbers, and technicians.",
    image: "https://images.unsplash.com/photo-1723847165390-f45ef02f6b86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVwYWlyJTIwbWFpbnRlbmFuY2UlMjBwbHVtYmVyfGVufDF8fHx8MTc3MjczOTg1MHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: Sparkles,
    title: "Beauty, Wellness & Personal Care",
    description: "Book professionals for hair, nails, massage, skincare, and personal wellness services.",
    image: "https://images.unsplash.com/photo-1731514771613-991a02407132?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMHdlbGxuZXNzJTIwc3BhfGVufDF8fHx8MTc3MjczOTg1MHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: GraduationCap,
    title: "Education & Professional Services",
    description: "Connect with tutors, trainers, and professionals who help you learn and grow.",
    image: "https://images.unsplash.com/photo-1565688420536-11a4ddfa246f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXRvcmluZyUyMGVkdWNhdGlvbiUyMGByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzI3Mzk4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: Home,
    title: "Domestic & Cleaning Services",
    description: "Hire reliable cleaners and house helpers to keep your home comfortable and organized.",
    image: "https://images.unsplash.com/photo-1758272421751-963195322eaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwZG9tZXN0aWMlMjBzZXJ2aWNlfGVufDF8fHx8MTc3MjczOTg1MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: PawPrint,
    title: "Pet Services",
    description: "Find trusted pet groomers, walkers, trainers, and pet care specialists.",
    image: "https://images.unsplash.com/photo-1735597403677-2029485b4547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBncm9vbWluZyUyMGRvZyUyMGNhcmV8ZW58MXx8fHwxNzcyNzM5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: PartyPopper,
    title: "Events & Entertainment",
    description: "Book photographers, hosts, performers, decorators, and event planners.",
    image: "https://images.unsplash.com/photo-1766719628920-854680a92c22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHBsYW5uaW5nJTIwZW50ZXJ0YWlubWVudCUyMHBhcnR5fGVufDF8fHx8MTc3MjczOTg1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: MonitorSmartphone,
    title: "Automotive & Tech Support",
    description: "Get help with car maintenance, device troubleshooting, installation, and technical support.",
    image: "https://images.unsplash.com/photo-1729843606560-e41b0be7fc7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwbWVjaGFuaWMlMjB0ZWNoJTIwc3VwcG9ydHxlbnwxfHx8fDE3NzI3Mzk4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const featureCards = [
  {
    icon: CalendarCheck,
    title: "Easy Service Booking",
    description: "Browse services, compare providers, and book appointments in minutes.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description: "All service providers on ServEase are verified to ensure quality and reliability.",
  },
  {
    icon: Bell,
    title: "Real-Time Updates",
    description: "Track your booking status and service updates directly in the app.",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="bg-[#00BF63] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none">
          <img src={imgPattern.src || imgPattern} alt="" className="w-full h-full object-cover" />
        </div>
        <div className={`relative ${CSS_CLASSES.container} px-6 md:px-16 pt-8 pb-16 md:pb-0`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left py-8">
              <h1 className={`${CSS_CLASSES.heading1} text-white leading-tight mb-6`}>
                Book Trusted Services Anytime, Anywhere
              </h1>
              <p className="font-['Poppins',sans-serif] text-base md:text-lg text-white/90 leading-relaxed mb-8 max-w-xl">
                ServEase connects you with verified professionals for everyday services. Easily book home repairs, beauty services, tutoring, cleaning, pet care, events support, and tech help in just a few taps.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <GooglePlayBadge />
                <AppStoreBadge />
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full max-w-lg mx-auto">
                <ImageWithFallback
                  src={typeof imgHero === 'string' ? imgHero : imgHero.src}
                  alt="ServEase App Interface"
                  className="w-full h-auto object-contain rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`bg-white ${CSS_CLASSES.paddingSection}`}>
        <div className={CSS_CLASSES.container}>
          <SectionHeading
            title="Explore Our Service Categories"
            subtitle="A complete suite of services across multiple categories, all available at your fingertips"
            align="center"
            maxWidth="max-w-2xl"
            color="text-gray-900"
          />

          {/* Feature Cards */}
          <div className={`${CSS_CLASSES.gridCols3} mb-16 mt-12`}>
            {featureCards.map((card) => (
              <div
                key={card.title}
                className={`${CSS_CLASSES.cardBase} bg-[${DESIGN.colors.backgroundAlt}] hover:shadow-lg`}
              >
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4">
                  <card.icon size={32} style={{ color: DESIGN.colors.primary }} />
                </div>
                <h3 className={`font-['Poppins',sans-serif] text-xl font-semibold mb-3`} style={{ color: DESIGN.colors.primary }}>
                  {card.title}
                </h3>
                <p className={`font-['Poppins',sans-serif] text-sm text-gray-700 leading-relaxed`}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Service Categories Scrollable */}
          <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide">
            {serviceCategories.map((cat) => (
              <div
                key={cat.title}
                className={`min-w-[280px] md:min-w-[320px] ${CSS_CLASSES.cardBase} bg-white ${CSS_CLASSES.cardShadow} overflow-hidden snap-start flex-shrink-0`}
              >
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <cat.icon size={20} className="text-[#00BF63]" />
                    <h4 className="font-['Poppins',sans-serif] text-base text-gray-900">
                      {cat.title}
                    </h4>
                  </div>
                  <p className="font-['Poppins',sans-serif] text-sm text-gray-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - Growing Network */}
      <section className="bg-[#00BF63] relative py-16 md:py-24 px-6 md:px-16">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none">
          <img src={imgPattern.src || imgPattern} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="font-['Poppins',sans-serif] text-3xl md:text-4xl text-white mb-6">
                Growing Network of Service Professionals
              </h2>
              <p className="font-['Poppins',sans-serif] text-base md:text-lg text-white/90 leading-relaxed max-w-xl">
                ServEase connects customers with skilled professionals across many service industries. Our platform helps users find reliable services quickly while helping providers reach more clients and grow their businesses.
              </p>
            </div>
            <div className="flex-1">
              <div className="bg-[#f1f1f1] rounded-[40px] overflow-hidden max-w-md mx-auto">
                <img
                  src={typeof imgPhone2 === 'string' ? imgPhone2 : imgPhone2.src}
                  alt="ServEase App Screenshot"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-[#00BF63] relative py-16 md:py-24 px-6 md:px-16">
        <div className="relative max-w-7xl mx-auto space-y-24">
          {/* Track Your Bookings */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1 text-center md:text-right">
              <h2 className="font-['Poppins',sans-serif] text-3xl md:text-4xl text-white mb-6">
                Track Your Bookings
              </h2>
              <p className="font-['Poppins',sans-serif] text-base md:text-lg text-white/90 leading-relaxed">
                Stay updated with real-time notifications about your service bookings and provider arrival times.
              </p>
            </div>
            <div className="flex-1">
              <div className="bg-[#f1f1f1] rounded-[40px] overflow-hidden max-w-md mx-auto">
                <img
                  src={typeof imgPhone1 === 'string' ? imgPhone1 : imgPhone1.src}
                  alt="Track Bookings"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Book for Family or Friends */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-['Poppins',sans-serif] text-3xl md:text-4xl text-white mb-6">
                Book for Family or Friends
              </h2>
              <p className="font-['Poppins',sans-serif] text-base md:text-lg text-white/90 leading-relaxed max-w-xl">
                Easily schedule services for family members or friends using your ServEase account.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-[#f1f1f1] rounded-[40px] overflow-hidden max-w-md mx-auto">
                <img
                  src={typeof imgPhone3 === 'string' ? imgPhone3 : imgPhone3.src}
                  alt="Book for Family"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Provider image */}
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-full overflow-hidden bg-white/20 p-2 backdrop-blur-sm">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src={typeof imgRider === 'string' ? imgRider : imgRider.src} alt="Service Provider" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-['Poppins',sans-serif] text-3xl md:text-4xl text-black mb-4">
            Become a ServEase Service Provider
          </h2>
          <p className="font-['Inter',sans-serif] text-base md:text-lg text-gray-600 leading-relaxed mb-8">
            Turn your skills into opportunities. Join ServEase and connect with customers who need your services.
          </p>
          <Link
            href="/provider-registration"
            className="inline-block bg-[#00BF63] hover:bg-[#00a855] text-white font-['Inter',sans-serif] px-8 py-3 rounded-xl transition-colors font-semibold"
          >
            Join as a Provider
          </Link>
        </div>
      </section>
    </div>
  );
}
