import { Target, Eye, Search, UserCheck, CalendarCheck, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionHeading } from "./SectionHeading";
import { CSS_CLASSES, DESIGN } from "../constants/design";

export function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className={`bg-[${DESIGN.colors.primary}] ${CSS_CLASSES.paddingSection}`}>
        <div className={CSS_CLASSES.containerMd}>
          <div className="text-center">
            <h1 className={`${CSS_CLASSES.heading1} text-white mb-6`}>
              About ServEase
            </h1>
            <p className="font-['Poppins',sans-serif] text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
              ServEase is a service marketplace platform that simplifies finding and booking trusted professionals. We bridge the gap between customers who need services and skilled providers ready to deliver.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={`bg-white ${CSS_CLASSES.paddingSection}`}>
        <div className={`${CSS_CLASSES.container} grid grid-cols-1 md:grid-cols-2 gap-12`}>
          <div className={`${CSS_CLASSES.cardBase} bg-[${DESIGN.colors.backgroundAlt}] ${CSS_CLASSES.cardShadow}`}>
            <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: DESIGN.colors.primary }}>
              <Target size={32} className="text-white" />
            </div>
            <h2 className={`${CSS_CLASSES.heading3} text-gray-900 mb-4`}>
              Our Mission
            </h2>
            <p className="font-['Poppins',sans-serif] text-base text-gray-700 leading-relaxed">
              To make quality services accessible to everyone by connecting customers with verified, reliable professionals through a seamless mobile platform. We aim to simplify service booking so that anyone can get the help they need, whenever they need it.
            </p>
          </div>
          <div className={`${CSS_CLASSES.cardBase} bg-[${DESIGN.colors.backgroundAlt}] ${CSS_CLASSES.cardShadow}`}>
            <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: DESIGN.colors.primary }}>
              <Eye size={32} className="text-white" />
            </div>
            <h2 className={`${CSS_CLASSES.heading3} text-gray-900 mb-4`}>
              Our Vision
            </h2>
            <p className="font-['Poppins',sans-serif] text-base text-gray-700 leading-relaxed">
              To become the leading service marketplace that empowers both customers and service providers globally. We envision a world where finding trusted help for any task is as simple as a few taps on your phone.
            </p>
          </div>
        </div>
      </section>

      {/* How ServEase Works */}
      <section className={`bg-[${DESIGN.colors.primary}] ${CSS_CLASSES.paddingSection}`}>
        <div className={CSS_CLASSES.container}>
          <SectionHeading
            title="How ServEase Works"
            subtitle="Getting started with ServEase is quick and easy"
            align="center"
            maxWidth="max-w-xl"
            color="text-white"
          />
          <div className={`${CSS_CLASSES.gridCols3} mt-12`}>
            {[
              {
                icon: Search,
                step: "1",
                title: "Browse & Search",
                description: "Explore service categories or search for the specific service you need. Compare providers based on ratings, pricing, and availability.",
              },
              {
                icon: CalendarCheck,
                step: "2",
                title: "Book a Service",
                description: "Select your preferred provider, choose a time slot, and confirm your booking. It only takes a few taps to schedule any service.",
              },
              {
                icon: Star,
                step: "3",
                title: "Get Served & Review",
                description: "Your verified professional arrives on time. After the service is complete, rate your experience to help others in the community.",
              },
            ].map((item) => (
              <div key={item.step} className={`${CSS_CLASSES.cardBase} bg-white/10 backdrop-blur-sm text-center`}>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon size={28} style={{ color: DESIGN.colors.primary }} />
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white" style={{ backgroundColor: DESIGN.colors.primary }}>
                  <span className="font-['Poppins',sans-serif] text-white font-bold">{item.step}</span>
                </div>
                <h3 className="font-['Poppins',sans-serif] text-xl text-white font-semibold mb-3">{item.title}</h3>
                <p className="font-['Poppins',sans-serif] text-sm text-white/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`bg-white ${CSS_CLASSES.paddingSection}`}>
        <div className={CSS_CLASSES.containerMd}>
          <SectionHeading
            title="Why Choose ServEase?"
            align="center"
            color="text-gray-900"
          />
          <div className={`${CSS_CLASSES.gridCols3} mt-12`}>
            {[
              { icon: UserCheck, title: "Verified Providers", desc: "Every service provider undergoes a verification process to ensure reliability and quality." },
              { icon: CalendarCheck, title: "Easy Booking", desc: "Book any service in just a few taps. Our intuitive interface makes scheduling effortless." },
              { icon: Star, title: "Community Ratings", desc: "Real reviews from real customers help you choose the best provider for your needs." },
            ].map((v) => (
              <div key={v.title} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${DESIGN.colors.primary}20` }}>
                  <v.icon size={32} style={{ color: DESIGN.colors.primary }} />
                </div>
                <h3 className={`font-['Poppins',sans-serif] text-lg font-semibold text-gray-900 mb-2`}>{v.title}</h3>
                <p className="font-['Poppins',sans-serif] text-sm text-gray-600 max-w-xs">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
