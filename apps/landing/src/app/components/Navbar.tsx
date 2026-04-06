"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import imgLogo from "../../assets/f5a6a28739bed7a9af038e3bf55db0c6b4b73bfc.png";
import { DESIGN, CSS_CLASSES } from "../constants/design";

export function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full px-6 md:px-16 py-4 flex items-center justify-between relative z-50 bg-[#00BF63] shadow-md">
      <Link href="/" className="flex items-center gap-2 group">
        <img 
          src={imgLogo.src || imgLogo} 
          alt="ServEase Logo" 
          className="h-10 object-contain group-hover:opacity-80 transition-opacity duration-300" 
        />
      </Link>
      <div className="hidden md:flex items-center bg-black/20 backdrop-blur-sm rounded-full px-8 py-3 gap-8">
        <Link
          href="/"
          className={`font-['Poppins',sans-serif] text-base no-underline transition-colors duration-300 ${
            isActive("/") ? "text-white font-semibold" : "text-white/80 hover:text-white"
          }`}
          aria-current={isActive("/") ? "page" : undefined}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`font-['Poppins',sans-serif] text-base no-underline transition-colors duration-300 ${
            isActive("/about") ? "text-white font-semibold" : "text-white/80 hover:text-white"
          }`}
          aria-current={isActive("/about") ? "page" : undefined}
        >
          About Us
        </Link>
        <Link
          href="/faq"
          className={`font-['Poppins',sans-serif] text-base no-underline transition-colors duration-300 ${
            isActive("/faq") ? "text-white font-semibold" : "text-white/80 hover:text-white"
          }`}
          aria-current={isActive("/faq") ? "page" : undefined}
        >
          FAQ
        </Link>
        <Link
          href="/contact"
          className={`font-['Poppins',sans-serif] text-base no-underline transition-colors duration-300 ${
            isActive("/contact") ? "text-white font-semibold" : "text-white/80 hover:text-white"
          }`}
          aria-current={isActive("/contact") ? "page" : undefined}
        >
          Contact
        </Link>
      </div>
      {/* Mobile menu */}
      <MobileMenu />
    </nav>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Toggle navigation menu"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm flex flex-col items-center gap-4 py-6 z-50 border-t border-white/10">
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About Us" },
            { path: "/faq", label: "FAQ" },
            { path: "/contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              className={`font-['Poppins',sans-serif] text-lg no-underline transition-colors duration-300 ${
                isActive(item.path) ? "text-white font-semibold" : "text-white/80 hover:text-white"
              }`}
              aria-current={isActive(item.path) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
