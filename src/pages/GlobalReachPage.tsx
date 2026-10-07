import React, { useState } from 'react';
import { Globe, ArrowUpRight, Ship, Compass, Anchor, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/company';

interface GlobalReachPageProps {
  onNavigate: (page: string) => void;
  onOpenQuote: () => void;
}

export const GlobalReachPage: React.FC<GlobalReachPageProps> = ({ onNavigate, onOpenQuote }) => {
  const [selectedRegion, setSelectedRegion] = useState<number>(0);

  const marketRegions = [
    {
      name: 'Middle East & GCC',
      countries: 'United Arab Emirates, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain',
      gateway: 'Mundra & JNPT (Nhava Sheva)',
      transitTime: 'Approx. 4 – 8 days ocean voyage',
      focusCommodities: 'Whole Red Chilli (Teja / Sanam), Cumin Seeds, Turmeric, Coriander',
      description: 'The Gulf Cooperation Council (GCC) represents a traditional and vibrant commercial corridor for Indian agricultural exports. With high-frequency direct liner connections from Western Indian ports, containers arrive with minimal transit lead times.'
    },
    {
      name: 'Europe & United Kingdom',
      countries: 'United Kingdom, Germany, Netherlands, France, Spain, Italy, Poland',
      gateway: 'Mundra & JNPT (Nhava Sheva)',
      transitTime: 'Approx. 18 – 25 days ocean voyage',
      focusCommodities: 'Sortex 99.5% Cumin Seeds, Low-Moisture Turmeric, High-Purity Ground Spices',
      description: 'European food processors, tea blenders, and industrial grinders maintain stringent requirements regarding Maximum Residue Limits (MRLs), aflatoxins, and physical cleanliness. We coordinate analytical laboratory testing with accredited NABL facilities to support import clearance.'
    },
    {
      name: 'North America',
      countries: 'United States & Canada',
      gateway: 'Mundra & JNPT',
      transitTime: 'Approx. 24 – 32 days ocean voyage',
      focusCommodities: 'Dry Red Chilli Flakes, Finger Turmeric, Whole Cumin, Botanical Leaf Powders',
      description: 'North American food manufacturing demands adherence to strict foreign matter tolerances, microbiological standards, and container sweat prevention. Our container stuffing protocol incorporates heavy-duty moisture-absorbing desiccant poles.'
    },
    {
      name: 'Asia-Pacific',
      countries: 'Singapore, Malaysia, Indonesia, Vietnam, Japan, Australia',
      gateway: 'Cochin, Chennai & Nhava Sheva',
      transitTime: 'Approx. 8 – 16 days ocean voyage',
      focusCommodities: 'Stemless Red Chilli, Coriander Seeds, Curcumin-Rich Turmeric',
      description: 'Direct maritime shipping links from Southern and Western Indian ports service leading food preparation, seasoning sauce manufacturing, and spice re-export hubs across Southeast and East Asia.'
    },
    {
      name: 'Africa',
      countries: 'Egypt, South Africa, Kenya, Nigeria, Morocco',
      gateway: 'Mundra & JNPT',
      transitTime: 'Approx. 12 – 22 days ocean voyage',
      focusCommodities: 'Bulk Cumin Seeds, Whole Red Chilli Bales, Coriander Seeds',
      description: 'Servicing wholesale spice markets and institutional repackers across North and Sub-Saharan Africa with cost-effective container freight options and high-durability woven bag packing.'
    }
  ];

  const tradePorts = [
    {
      name: 'Mundra Port (INMUN1)',
      location: 'Gulf of Kutch, Gujarat',
      profile: 'India’s largest commercial deep-water container terminal with automated handling, direct berthing, and unmatched connectivity to the spice growing tracts of Gujarat and Rajasthan.'
    },
    {
      name: 'Jawaharlal Nehru Port - Nhava Sheva (INNSA1)',
      location: 'Navi Mumbai, Maharashtra',
      profile: 'Premier international gateway container port handling major maritime trade corridors for Europe, the Mediterranean, the Americas, and the Far East.'
    },
    {
      name: 'Cochin Port (INCOK1)',
      location: 'Kerala, South-West Coast',
      profile: 'The historic heart of the global spice trade, offering proximity to the high-range pepper, cardamom, and southern agricultural belts.'
    }
  ];

  return (
    <div className="bg-white text-[#0F172A]">
      
      {/* Page Hero */}
      <section className="bg-[#0A1C3E] text-white py-20 sm:py-28">
        <div className="container-x mx-auto max-w-[1440px]">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
              International Trade Corridors
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold tracking-tight text-white">
              From India to Global Markets<span className="text-[#38BDF8]">.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed pt-2">
              Our global market focus: Connecting India’s agricultural heartlands with commercial importers, food manufacturers, and wholesalers across key trade regions.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                onClick={onOpenQuote}
                className="btn-pill btn-pill-dark bg-[#0070E0] hover:bg-[#005bb5] text-white px-7 py-3 text-xs sm:text-sm font-semibold flex items-center space-x-2 cursor-pointer shadow-md self-start"
              >
                <span>Start a Global Sourcing Conversation</span>
                <ArrowUpRight className="w-4 h-4 ml-0.5" />
              </button>
            </div>

            {/* Accreditations Strip (FSSAI, APEDA, Spice Board, IEC, GST, MSME) */}
            <div className="pt-3">
              <div 
                onClick={() => onNavigate('quality')}
                className="inline-flex items-center bg-white/95 backdrop-blur-md rounded-2xl py-2 px-4 shadow-xl border border-white/90 gap-4 max-w-full cursor-pointer hover:bg-white transition-all group"
                title="View Full Government of India Accreditations & Licenses"
              >
                <div className="flex items-center space-x-3 sm:space-x-5 overflow-x-auto py-0.5">
                  <div className="flex items-center space-x-1 shrink-0" title="FSSAI - Food Safety and Standards Authority of India">
                    <img src="/assets/certificates/fssai.png" alt="FSSAI" className="h-5 sm:h-7 w-auto object-contain transition-transform group-hover:scale-105" />
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 font-mono hidden md:inline">FSSAI</span>
                  </div>
                  <div className="flex items-center space-x-1 shrink-0" title="APEDA - Agricultural and Processed Food Products Export Development Authority">
                    <img src="/assets/certificates/apeda.png" alt="APEDA" className="h-6 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105" />
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 font-mono hidden md:inline">APEDA</span>
                  </div>
                  <div className="flex items-center space-x-1 shrink-0" title="Spices Board India - Ministry of Commerce and Industry">
                    <img src="/assets/certificates/spices-board.png" alt="Spices Board India" className="h-6 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105" />
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 font-mono hidden md:inline">SPICES BOARD</span>
                  </div>
                  <div className="flex items-center space-x-1 shrink-0" title="IEC - Import Export Code (DGFT, Govt. of India)">
                    <img src="/assets/certificates/iec.png" alt="IEC" className="h-6 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105" />
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 font-mono hidden md:inline">IEC</span>
                  </div>
                  <div className="flex items-center space-x-1 shrink-0" title="GST - Registered Indian Exporter">
                    <img src="/assets/certificates/gst-transparent.png" alt="GST" className="h-4 sm:h-6 w-auto object-contain transition-transform group-hover:scale-105" />
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 font-mono hidden md:inline">GST</span>
                  </div>
                  <div className="flex items-center space-x-1 shrink-0" title="MSME - Ministry of Micro, Small and Medium Enterprises">
                    <img src="/assets/certificates/msme.svg" alt="MSME" className="h-5 sm:h-7 w-auto object-contain transition-transform group-hover:scale-105" />
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 font-mono hidden md:inline">MSME</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Regional Focus Interactive Selector */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
        <div className="container-x mx-auto max-w-[1440px]">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0070E0]">
              Market Focus
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#0F172A] tracking-tight mt-2">
              Markets We Aim to Serve<span className="text-[#0070E0]">.</span>
            </h2>
            <p className="text-base text-slate-600 mt-3">
              We structure our export preparations around destination market food regulations, consumer preferences, and container logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Region Nav Tabs */}
            <div className="lg:col-span-5 space-y-3">
              {marketRegions.map((region, idx) => {
                const isSelected = selectedRegion === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedRegion(idx)}
                    className={`w-full p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#0070E0] bg-white shadow-sm ring-1 ring-[#0070E0]'
                        : 'border-slate-200 bg-white/70 hover:bg-white text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <Globe className={`w-4 h-4 ${isSelected ? 'text-[#0070E0]' : 'text-slate-400'}`} />
                        <h3 className={`text-base font-semibold ${isSelected ? 'text-[#0F172A]' : 'text-slate-700'}`}>
                          {region.name}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{region.countries}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-[#0070E0]' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>

            {/* Region Detailed Focus Card */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0070E0]">
                    Destination Market Profile
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-500">
                    {marketRegions[selectedRegion].transitTime}
                  </span>
                </div>

                <h3 className="text-2xl font-display font-semibold text-[#0F172A]">
                  {marketRegions[selectedRegion].name}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {marketRegions[selectedRegion].description}
                </p>

                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs sm:text-sm">
                  <div>
                    <span className="font-semibold text-slate-700 block">Focus Countries:</span>
                    <p className="text-slate-600 mt-0.5">{marketRegions[selectedRegion].countries}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 block">Common Gateway Loading Ports:</span>
                    <p className="text-slate-600 mt-0.5">{marketRegions[selectedRegion].gateway}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 block">High Demand Commodities:</span>
                    <p className="text-slate-600 mt-0.5">{marketRegions[selectedRegion].focusCommodities}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Customs documentation tailored to regional standards</span>
                <button
                  onClick={onOpenQuote}
                  className="px-5 py-2.5 rounded-full bg-[#0A1C3E] hover:bg-[#0070E0] text-white text-xs font-semibold transition cursor-pointer flex items-center space-x-1"
                >
                  <span>Enquire for this Market</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Gateway Ports in India */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200">
        <div className="container-x mx-auto max-w-[1440px]">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0070E0]">
              Maritime Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#0F172A] tracking-tight mt-2">
              Indian Gateway Ports & Container Clearances<span className="text-[#0070E0]">.</span>
            </h2>
            <p className="text-base text-slate-600 mt-3">
              Direct containerized sea freight links from India's most modern maritime infrastructure to international hub ports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tradePorts.map((port, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0070E0] flex items-center justify-center">
                  <Anchor className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-display font-semibold text-[#0F172A]">
                  {port.name}
                </h3>
                <p className="text-xs font-semibold text-[#0070E0]">
                  Location: {port.location}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {port.profile}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Commercial Incoterms & Container Logistics */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
        <div className="container-x mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0070E0]">
                Commercial Terms
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#0F172A] tracking-tight">
                Supported Trade Incoterms (Incoterms® 2020)
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                We accommodate buyer commercial preferences with full transparency regarding costs, risks, and documentation responsibilities:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <h4 className="text-sm font-bold text-[#0F172A]">FOB (Free On Board — Indian Port)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We deliver cargo cleared for export aboard the vessel nominated by the buyer at Indian gateway ports (Mundra, JNPT, Cochin).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <h4 className="text-sm font-bold text-[#0F172A]">CFR / CIF (Cost & Freight / Cost, Insurance & Freight)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We arrange and pay ocean freight charges up to your specified destination discharge port, with comprehensive marine transit insurance included under CIF terms.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 text-[#0070E0]">
                <Ship className="w-6 h-6" />
                <h3 className="text-xl font-display font-semibold text-[#0F172A]">
                  Maritime Container Stowage Standards
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Agricultural spices require precise protection during ocean voyages across fluctuating equatorial temperature zones:
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0070E0] shrink-0 mt-0.5" />
                  <span><strong>Desiccant Protection:</strong> Heavy-duty calcium chloride dry poles suspended along container walls to absorb condensation sweat.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0070E0] shrink-0 mt-0.5" />
                  <span><strong>Kraft Floor Lining:</strong> Heavy corrugated kraft paper placed along container decking and walls to isolate cargo from surface condensation.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0070E0] shrink-0 mt-0.5" />
                  <span><strong>Container Inspection:</strong> Rigorous pre-stuffing inspections ensuring zero structural leaks, rust, or residual odors from previous cargo.</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full py-3 rounded-full bg-[#0A1C3E] hover:bg-[#0070E0] text-white text-xs font-semibold transition"
                >
                  Discuss Shipping Arrangements with Our Desk
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0A1C3E] text-white text-center">
        <div className="container-x mx-auto max-w-[1440px] space-y-6">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight">
            Connect with Our International Trade Desk
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto">
            Tell us your destination port and required commodity specifications for a prompt commercial proforma.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenQuote}
              className="btn-pill btn-pill-dark bg-[#0070E0] hover:bg-[#005bb5] text-white px-8 py-3.5 text-sm font-semibold cursor-pointer shadow-md inline-flex items-center space-x-2"
            >
              <span>Request Proforma Indication</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
