import Link from "next/link";
import imgLogo from "../../assets/f5a6a28739bed7a9af038e3bf55db0c6b4b73bfc.png";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { DESIGN } from "../constants/design";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Facebook, label: "Facebook", href: "#" },
    { Icon: Instagram, label: "Instagram", href: "#" },
    { Icon: Twitter, label: "Twitter", href: "#" },
    { Icon: Linkedin, label: "LinkedIn", href: "#" },
  ];

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <img 
                src={typeof imgLogo === 'string' ? imgLogo : imgLogo.src} 
                alt="ServEase Logo" 
                className="h-10 object-contain group-hover:opacity-80 transition-opacity" 
              />
            </Link>
            <p className="font-['Inter',sans-serif] text-sm text-gray-400 leading-relaxed">
              ServEase connects you with verified service professionals. Your trust and satisfaction are our top priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Poppins',sans-serif] text-white font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className="font-['Inter',sans-serif] text-sm text-gray-400 hover:text-white transition-colors duration-300 no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-['Poppins',sans-serif] text-white font-semibold mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="font-['Inter',sans-serif] text-sm text-gray-400 hover:text-white transition-colors duration-300 no-underline"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-['Inter',sans-serif] text-sm text-gray-400 hover:text-white transition-colors duration-300 no-underline"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-['Inter',sans-serif] text-sm text-gray-400 hover:text-white transition-colors duration-300 no-underline"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-['Poppins',sans-serif] text-white font-semibold mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#00BF63] flex items-center justify-center text-white transition-colors duration-300"
                  title={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 pt-8 mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-['Inter',sans-serif] text-xs text-gray-500 text-center md:text-left">
            &copy; {currentYear} ServEase. All rights reserved.
          </p>
          <p className="font-['Inter',sans-serif] text-xs text-gray-500">
            Made with ❤️ for better service experiences
          </p>
        </div>
      </div>
    </footer>
  );
}
