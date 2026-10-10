import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, ChevronRight, Calendar, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/company';
import { getHref } from '../utils/routes';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenQuote
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'global-reach', label: 'Global Reach' },
    { id: 'quality', label: 'Quality & Compliance' },
    { id: 'meeting', label: 'Meeting' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* Top Utility Information Bar */}
      <div className="w-full bg-[#0A1C3E] text-slate-300 border-b border-blue-900/50 text-[11px] sm:text-xs">
        <div className="container-x mx-auto max-w-[1440px] py-1.5 sm:py-2 flex items-center justify-between gap-x-4">
          {/* Left: Contact Info & Hub Location */}
          <div className="flex items-center space-x-3 sm:space-x-5 md:space-x-6 overflow-hidden">
            <a
              href={`mailto:${COMPANY_CONFIG.primaryEmail}`}
              className="flex items-center space-x-1.5 text-slate-300 hover:text-white transition-colors group shrink-0"
            >
              <Mail className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-medium truncate">{COMPANY_CONFIG.primaryEmail}</span>
            </a>

            <a
              href={`tel:${COMPANY_CONFIG.phone}`}
              className="hidden sm:flex items-center space-x-1.5 text-slate-300 hover:text-white transition-colors group shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{COMPANY_CONFIG.phoneDisplay}</span>
            </a>

            <div className="hidden md:flex items-center space-x-1.5 text-slate-300 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
              <span>Sabarkantha, Gujarat</span>
            </div>
          </div>

          {/* Right: Operating Hours & Social Channels */}
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            <div className="hidden lg:flex items-center space-x-1.5 text-slate-300 shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
              <span>Mon – Sat: 10:00 – 18:00 IST</span>
            </div>

            {/* Mobile-only quick phone link */}
            <a
              href={`tel:${COMPANY_CONFIG.phone}`}
              className="sm:hidden flex items-center space-x-1 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="font-medium">{COMPANY_CONFIG.phoneDisplay}</span>
            </a>

            <div className="hidden sm:flex items-center space-x-2 text-slate-400 border-l border-blue-900/60 pl-3">
              <a
                href={COMPANY_CONFIG.facebookUrl || "https://www.facebook.com/origintra.exim"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-[#38BDF8] transition-colors"
                title="Facebook"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={COMPANY_CONFIG.linkedinUrl || "https://www.linkedin.com/company/origintra-exim"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-[#38BDF8] transition-colors"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={COMPANY_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-[#38BDF8] transition-colors"
                title="Instagram (@origintra.exim)"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Corporate Header */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="container-x mx-auto max-w-[1440px]">
          <div className="flex h-20 items-center justify-between">
          
          {/* Logo with strict proportion preservation and SEO clean URL */}
          <a
            href={getHref('home')}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                e.preventDefault();
                handleLinkClick('home');
              }
            }}
            className="flex items-center group py-1"
            title="Origintra Exim — Home"
          >
            <img
              src="/assets/logo/logo-full-color.png"
              alt="Origintra Exim — Connecting Markets. Moving Possibilities."
              className="h-11 sm:h-12 w-auto max-h-12 object-contain transition-transform duration-200 group-hover:opacity-90"
              style={{ aspectRatio: 'auto' }}
            />
          </a>

          {/* Desktop Navigation Links (SEO Crawlable Semantic Links) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id || (link.id === 'products' && currentPage === 'product-detail');
              return (
                <a
                  key={link.id}
                  href={getHref(link.id)}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      handleLinkClick(link.id);
                    }
                  }}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#0070E0] font-semibold bg-blue-50/60'
                      : 'text-slate-700 hover:text-[#0A1C3E] hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Prominent CTA: Schedule Meeting & Request a Quote */}
          <div className="hidden lg:flex items-center space-x-2.5">
            <button
              onClick={() => handleLinkClick('meeting')}
              className="rounded-xl bg-[#0070E0] hover:bg-[#005bb5] text-white text-xs font-semibold py-2.5 px-4 shadow-sm shadow-blue-900/30 transition-all flex items-center space-x-1.5 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Meeting</span>
            </button>
            <button
              onClick={onOpenQuote}
              className="rounded-xl border border-slate-300 hover:border-[#0A1C3E] text-slate-700 hover:text-[#0A1C3E] text-xs font-semibold py-2.5 px-3.5 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <span>Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

          {/* Mobile/Tablet Controls & Quick CTAs */}
          <div className="lg:hidden flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => handleLinkClick('meeting')}
              className="text-xs bg-[#0070E0] hover:bg-[#005bb5] text-white px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg font-medium flex items-center space-x-1 sm:space-x-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Schedule Meeting</span>
              <span className="sm:hidden">Meeting</span>
            </button>
            <button
              onClick={onOpenQuote}
              className="hidden sm:flex text-xs border border-slate-300 hover:border-[#0A1C3E] text-slate-700 hover:text-[#0A1C3E] px-3 py-2 rounded-lg font-medium items-center space-x-1 transition-colors cursor-pointer"
            >
              <span>Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 text-slate-700 hover:text-[#0A1C3E] rounded-lg border border-slate-200 bg-white cursor-pointer transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>
    </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="container-x mx-auto px-4 py-6 space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id || (link.id === 'products' && currentPage === 'product-detail');
              return (
                <a
                  key={link.id}
                  href={getHref(link.id)}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      handleLinkClick(link.id);
                    }
                  }}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-50 text-[#0070E0] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#0070E0]' : 'text-slate-400'}`} />
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLinkClick('meeting');
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#0070E0] text-white text-sm font-semibold hover:bg-[#005bb5] transition shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Meeting (30 Min)</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
              >
                <span>Request a Commercial Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Drawer Quick Contact & Hub Info */}
            <div className="pt-4 mt-2 border-t border-slate-100 text-xs text-slate-500 space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-[#0070E0]" />
                  <span>Sabarkantha, Gujarat</span>
                </span>
                <span className="flex items-center space-x-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>10:00 - 18:00 IST</span>
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 text-slate-400">
                <span>Follow Origintra:</span>
                <div className="flex items-center space-x-3 text-slate-600">
                  <a href={COMPANY_CONFIG.facebookUrl || "https://www.facebook.com/origintra.exim"} target="_blank" rel="noopener noreferrer" className="hover:text-[#0070E0] p-1" aria-label="Facebook">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a href={COMPANY_CONFIG.linkedinUrl || "https://www.linkedin.com/company/origintra-exim"} target="_blank" rel="noopener noreferrer" className="hover:text-[#0070E0] p-1" aria-label="LinkedIn">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </a>
                  <a href={COMPANY_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#0070E0] p-1" aria-label="Instagram">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
