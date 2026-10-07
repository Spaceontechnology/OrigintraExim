import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, ChevronRight, Calendar } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      {/* Main Corporate Header */}
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

          {/* Mobile Hamburger Button & Quick CTA */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => handleLinkClick('meeting')}
              className="sm:hidden text-xs bg-[#0070E0] text-white px-3 py-1.5 rounded-lg font-medium flex items-center space-x-1"
            >
              <Calendar className="w-3 h-3" />
              <span>Meeting</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:text-[#0A1C3E] rounded-lg border border-slate-200 bg-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
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
          </div>
        </div>
      )}
    </header>
  );
};
