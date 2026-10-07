import React from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, MessageSquare, ShieldCheck } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/company';
import { getHref } from '../utils/routes';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenQuote: () => void;
  onOpenLegal?: (type: 'privacy' | 'terms' | 'shipping' | 'cookies') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenQuote,
  onOpenLegal
}) => {
  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLegal = (type: 'privacy' | 'terms' | 'shipping' | 'cookies') => {
    if (onOpenLegal) {
      onOpenLegal(type);
    } else {
      onNavigate(`legal-${type}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A1C3E] text-slate-300 border-t border-slate-800">
      {/* Upper Main Footer Grid */}
      <div className="container-x mx-auto max-w-[1440px] py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Logo & Short Company Description (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <a 
                href={getHref('home')} 
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                    e.preventDefault();
                    handleNav('home');
                  }
                }}
              >
                <img
                  src="/assets/logo/logo-full-white.png"
                  alt="Origintra Exim — Connecting Markets. Moving Possibilities."
                  className="h-12 w-auto max-h-12 object-contain"
                  style={{ aspectRatio: 'auto' }}
                />
              </a>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Origintra Exim is an India-based international trading and export company. We connect global buyers with carefully sourced Indian spices and agricultural products, focused on quality consistency, transparent communication, and export-ready documentation.
            </p>

            <div className="pt-2 text-xs text-slate-500 font-sans border-t border-slate-800/80">
              <p className="text-slate-400 font-medium">Domain: {COMPANY_CONFIG.domain}</p>
              <p className="mt-1">Primary Export Ports: Mundra, Nhava Sheva & Cochin</p>
            </div>
          </div>

          {/* Column 2: Company (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-sans">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={getHref('about')}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      handleNav('about');
                    }
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href={getHref('products')}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      handleNav('products');
                    }
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href={getHref('global-reach')}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      handleNav('global-reach');
                    }
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Global Reach
                </a>
              </li>
              <li>
                <a
                  href={getHref('quality')}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      handleNav('quality');
                    }
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Quality & Compliance
                </a>
              </li>
              <li>
                <a
                  href={getHref('about')}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      handleNav('about');
                    }
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Team
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-sans">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={getHref('blog')}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      handleNav('blog');
                    }
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href={getHref('blog')}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      handleNav('blog');
                    }
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Export Insights
                </a>
              </li>
              <li>
                <a
                  href={getHref('quality')}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      handleNav('quality');
                    }
                  }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Documentation & FAQs
                </a>
              </li>
              <li>
                <a
                  href={getHref('meeting')}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                      e.preventDefault();
                      handleNav('meeting');
                    }
                  }}
                  className="text-[#38BDF8] hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1 font-semibold"
                >
                  <span>Schedule Meeting (30 Min)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenQuote}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1 font-medium"
                >
                  <span>Request a Commercial Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-sans">Contact</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`mailto:${COMPANY_CONFIG.primaryEmail}`}
                    className="hover:text-white transition-colors block text-slate-300"
                  >
                    {COMPANY_CONFIG.primaryEmail}
                  </a>
                  <span className="text-xs text-slate-500">Commercial Inquiries</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${COMPANY_CONFIG.phone}`}
                    className="hover:text-white transition-colors block text-slate-300"
                  >
                    {COMPANY_CONFIG.phoneDisplay}
                  </a>
                  <span className="text-xs text-slate-500">Trade Desk (09:00 - 18:30 IST)</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={COMPANY_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors block text-slate-300 font-medium"
                  >
                    WhatsApp Trade Desk
                  </a>
                  <span className="text-xs text-slate-500">{COMPANY_CONFIG.whatsappDisplay}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-400 leading-relaxed">
                  <p className="text-slate-300 font-medium">{COMPANY_CONFIG.headOffice.title}</p>
                  <p>{COMPANY_CONFIG.headOffice.city}, {COMPANY_CONFIG.headOffice.state}, India</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Compliance Notice Bar */}
      <div className="border-t border-slate-800/80 bg-[#07152E] py-4">
        <div className="container-x mx-auto max-w-[1440px] text-xs text-slate-400 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <span>{COMPANY_CONFIG.complianceStatement}</span>
          </p>
          <span className="text-slate-500 text-[11px]">Serving Verified B2B Commercial Buyers Worldwide</span>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Legal Links */}
      <div className="border-t border-slate-800/60 py-6">
        <div className="container-x mx-auto max-w-[1440px] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Origintra Exim. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={getHref('legal-privacy')}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  handleLegal('privacy');
                }
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <a
              href={getHref('legal-terms')}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  handleLegal('terms');
                }
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </a>
            <a
              href={getHref('legal-shipping')}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  handleLegal('shipping');
                }
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Shipping Policy
            </a>
            <a
              href={getHref('legal-cookies')}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  handleLegal('cookies');
                }
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookie Policy
            </a>
            <a
              href={getHref('admin')}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                  e.preventDefault();
                  handleNav('admin');
                }
              }}
              className="text-[#38BDF8] hover:text-white transition-colors cursor-pointer font-medium flex items-center space-x-1"
            >
              <span>Admin Portal</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
