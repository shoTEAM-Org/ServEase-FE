"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { CSS_CLASSES, DESIGN } from "../constants/design";
import { BaseButton } from "../components/BaseButton";
import Link from "next/link";

const faqs = [
  {
    question: "What is ServEase?",
    answer: "ServEase is a mobile service marketplace that connects customers with verified professionals across multiple categories including home maintenance, beauty & wellness, education, cleaning, pet services, events, and tech support. You can browse, compare, and book services all from one app.",
  },
  {
    question: "How do I book a service on ServEase?",
    answer: "Booking is simple! Download the ServEase app, browse or search for the service you need, select a provider based on ratings and availability, choose your preferred time slot, and confirm your booking. You'll receive a confirmation notification instantly.",
  },
  {
    question: "How are service providers verified?",
    answer: "All service providers on ServEase go through a thorough verification process. This includes identity verification, background checks, skills assessment, and review of professional credentials. We continuously monitor provider performance through customer ratings and feedback.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "ServEase supports multiple payment methods including credit/debit cards, mobile wallets, and in-app wallet top-ups. All transactions are processed securely through our encrypted payment system. You can also pay cash for certain services where available.",
  },
  {
    question: "Can I cancel or reschedule a booking?",
    answer: "Yes, you can cancel or reschedule bookings through the app. Free cancellation is available up to a certain time before the scheduled service. Late cancellations may incur a small fee. To reschedule, simply go to your bookings and select a new time slot.",
  },
  {
    question: "How do I become a ServEase service provider?",
    answer: "To join as a provider, download the ServEase app and select 'Join as a Provider.' Complete the registration form, submit your credentials and ID for verification, and once approved, you can start accepting bookings and earning. The process typically takes 2-3 business days.",
  },
  {
    question: "Is ServEase available in my area?",
    answer: "ServEase is expanding rapidly across multiple cities and regions. Download the app and enter your location to check availability in your area. We're constantly adding new service areas to reach more customers and providers.",
  },
  {
    question: "What happens if I'm not satisfied with a service?",
    answer: "Customer satisfaction is our priority. If you're not happy with a service, you can report the issue through the app within 24 hours. Our support team will review your case and take appropriate action, which may include a refund, re-service, or credit to your account.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="bg-[#00BF63] py-16 md:py-24 px-6 md:px-16">
        <div className={CSS_CLASSES.containerMd}>
          <div className="text-center">
            <h1 className={`${CSS_CLASSES.heading1} text-white mb-6 text-4xl md:text-5xl lg:text-6xl`}>
              Frequently Asked Questions
            </h1>
            <p className="font-['Poppins',sans-serif] text-base md:text-lg text-white/90 max-w-xl mx-auto">
              Find answers to the most common questions about ServEase
            </p>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className={`bg-white ${CSS_CLASSES.paddingSection}`}>
        <div className={CSS_CLASSES.containerSm}>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 ${CSS_CLASSES.cardShadow}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-300"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-['Poppins',sans-serif] text-base md:text-lg font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    style={{ color: DESIGN.colors.primary }}
                    className={`flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="font-['Poppins',sans-serif] text-sm text-gray-600 leading-relaxed px-6 pb-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="bg-[#f1f1f1] py-16 md:py-24 px-6 md:px-16">
        <div className={CSS_CLASSES.containerSm}>
          <div className="text-center">
            <h2 className={`${CSS_CLASSES.heading2} text-gray-900 mb-4`}>
              Still Have Questions?
            </h2>
            <p className="font-['Poppins',sans-serif] text-base text-gray-600 mb-8">
              Can't find what you're looking for? Reach out to our support team.
            </p>
            <Link href="/contact" passHref legacyBehavior>
              <BaseButton variant="primary" size="md">
                Contact Support
              </BaseButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
