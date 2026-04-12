import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FormInput, FormTextarea } from "./FormInput";
import { BaseButton } from "./BaseButton";
import { SectionHeading } from "./SectionHeading";
import { CSS_CLASSES, DESIGN } from "../constants/design";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<typeof form> = {};
    
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "support@servease.app" },
    { icon: Phone, label: "Phone", value: "+1 (800) 555-EASE" },
    { icon: MapPin, label: "Address", value: "123 Service Lane, Tech City, TC 10001" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className={`bg-[${DESIGN.colors.primary}] ${CSS_CLASSES.paddingSection}`}>
        <div className={CSS_CLASSES.containerMd}>
          <div className="text-center">
            <h1 className={`${CSS_CLASSES.heading1} text-white mb-6`}>
              Get in Touch
            </h1>
            <p className="font-['Poppins',sans-serif] text-base md:text-lg text-white/90 max-w-xl mx-auto">
              Have a question, feedback, or need support? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className={`bg-white ${CSS_CLASSES.paddingSection}`}>
        <div className={`${CSS_CLASSES.container} grid grid-cols-1 md:grid-cols-2 gap-12`}>
          {/* Contact Form */}
          <div>
            <h2 className={`${CSS_CLASSES.heading3} text-gray-900 mb-8`}>
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="Full Name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                error={errors.name}
                required
              />
              <FormInput
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                error={errors.email}
                required
              />
              <FormInput
                label="Subject"
                placeholder="How can we help?"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                error={errors.subject}
                required
              />
              <FormTextarea
                label="Message"
                placeholder="Tell us more..."
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                error={errors.message}
                required
              />
              <BaseButton
                type="submit"
                variant="primary"
                size="md"
                icon={<Send size={18} />}
                fullWidth
              >
                Send Message
              </BaseButton>
              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg font-['Poppins',sans-serif] text-sm">
                  ✓ Thank you! Your message has been sent. We'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info & Map */}
          <div>
            <h2 className={`${CSS_CLASSES.heading3} text-gray-900 mb-8`}>
              Contact Information
            </h2>
            <div className="space-y-6 mb-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div style={{ backgroundColor: `${DESIGN.colors.primary}20` }} className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon size={22} style={{ color: DESIGN.colors.primary }} />
                  </div>
                  <div>
                    <p className="font-['Poppins',sans-serif] text-sm text-gray-500">{item.label}</p>
                    <p className="font-['Poppins',sans-serif] text-base font-medium text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className={`${CSS_CLASSES.cardBase} bg-[${DESIGN.colors.backgroundAlt}] h-64 flex items-center justify-center`}>
              <div className="text-center">
                <MapPin size={40} style={{ color: DESIGN.colors.primary }} className="mx-auto mb-2" />
                <p className="font-['Poppins',sans-serif] text-sm text-gray-500">Interactive Map</p>
                <p className="font-['Poppins',sans-serif] text-xs text-gray-400">123 Service Lane, Tech City</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
