import React from 'react';
import { ArrowUpRight, ArrowRight, ShieldCheck, CheckCircle2, Compass, Layers, Truck, Globe, Mail, Phone } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/company';
import { TEAM_EXPANSION_NOTICE, TEAM_MEMBERS as DEFAULT_TEAM_MEMBERS } from '../data/team';
import { TeamMember } from '../types';
import { AdminStorage } from '../services/adminStorage';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenQuote }) => {
  const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>(() => AdminStorage.getTeamMembers());

  React.useEffect(() => {
    const handleUpdate = () => setTeamMembers(AdminStorage.getTeamMembers());
    window.addEventListener('origintra_team_updated', handleUpdate);
    return () => window.removeEventListener('origintra_team_updated', handleUpdate);
  }, []);
  return (
    <div className="bg-white text-[#0F172A]">
      
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-[#0A1C3E] text-white py-20 sm:py-28">
        <div className="container-x mx-auto max-w-[1440px] relative">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
              About Origintra Exim
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold tracking-tight text-white">
              Built for Global Trade. Driven by Trust<span className="text-[#0070E0]">.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed pt-2">
              Connecting trusted Indian agricultural sourcing with international commercial markets, supplying quality spices and agro commodities to buyers across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Sourcing Ethos & Philosophy */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200">
        <div className="container-x mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0070E0]">
                Our Philosophy
              </span>

              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#0F172A] tracking-tight">
                Global Trade Works Best When Quality, Transparency, and Reliability Move Together<span className="text-[#0070E0]">.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Origintra Exim was founded on the recognition that overseas spice importers face persistent challenges: inconsistent product lots, fluctuating moisture levels, unpredictable shipping delays, and ambiguous communications.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                We approach export as a long-term discipline. By establishing direct sourcing links across key agricultural mandis and farmer clusters—from the red chilli yards of Guntur to the turmeric fields of Salem and the cumin belts of Gujarat—we maintain oversight over harvest quality, mechanical cleaning, and seaworthy packing.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={onOpenQuote}
                  className="btn-pill btn-pill-dark bg-[#0A1C3E] hover:bg-[#0070E0] text-white px-6 py-3 text-xs sm:text-sm font-semibold flex items-center space-x-2 cursor-pointer"
                >
                  <span>Request a Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('products')}
                  className="btn-pill btn-pill-outline border-slate-300 text-slate-700 hover:text-[#0A1C3E] px-6 py-3 text-xs sm:text-sm font-semibold flex items-center space-x-2 cursor-pointer"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-4/5 border border-slate-200">
                <img
                  src="/assets/about/spice-harvest-sourcing.jpg"
                  alt="Spice harvesting and agricultural mandi sourcing in India"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-4/5 border border-slate-200 mt-8">
                <img
                  src="/assets/about/spice-processing-plant.jpg"
                  alt="Modern spice processing plant and optical sorting line"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sourcing Footprint */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
        <div className="container-x mx-auto max-w-[1440px]">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0070E0]">
              Agricultural Footprint
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#0F172A] tracking-tight mt-2">
              Sourcing From India's Prime Cultivation Zones<span className="text-[#0070E0]">.</span>
            </h2>
            <p className="text-base text-slate-600 mt-3">
              We operate across key regional spice ecosystems to ensure batch consistency and genuine single-origin integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0070E0] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-xl font-display font-semibold text-[#0F172A]">
                Andhra Pradesh & Telangana
              </h3>
              <p className="text-sm font-semibold text-[#0070E0]">
                Commodities: Red Chilli (Teja, Sanam) & Turmeric
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Direct connections to major chilli terminal mandis in Guntur and Warangal, providing controlled heat options from mild color extract to high Scoville fire.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0070E0] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-xl font-display font-semibold text-[#0F172A]">
                Gujarat & Rajasthan
              </h3>
              <p className="text-sm font-semibold text-[#0070E0]">
                Commodities: Cumin Seeds & Coriander Seeds
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Access to the prominent Unjha seed spice corridor and Kota coriander trading networks, delivering Sortex-cleaned seed spices with low foreign matter.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0070E0] flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-xl font-display font-semibold text-[#0F172A]">
                Tamil Nadu & Southern Belts
              </h3>
              <p className="text-sm font-semibold text-[#0070E0]">
                Commodities: Salem Turmeric & Pure Moringa Leaf Powder
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Rich agricultural soils dedicated to high-curcumin finger turmeric and low-temperature dehydrated moringa leaf powder.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Gateway Port Infrastructure */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200">
        <div className="container-x mx-auto max-w-[1440px]">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0070E0]">
              Logistics & Gateway Ports
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#0F172A] tracking-tight mt-2">
              Seaworthy Container Stuffing & Fast Port Clearances<span className="text-[#0070E0]">.</span>
            </h2>
            <p className="text-base text-slate-600 mt-3">
              We dispatch export consignments through India's premier international container ports with verified surveyor inspection and moisture-barrier protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COMPANY_CONFIG.operationalPorts.map((port, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#0070E0] uppercase tracking-wider">
                    Port Code: {port.code}
                  </span>
                  <span className="text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-500">
                    {port.location}
                  </span>
                </div>
                <h3 className="text-xl font-display font-semibold text-[#0F172A]">
                  {port.name}
                </h3>
                <p className="text-xs font-semibold text-slate-700">
                  {port.type}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {port.transitFocus}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Leadership & Executive Team Section */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200">
        <div className="container-x mx-auto max-w-[1440px]">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0070E0]">
              Leadership & Key People
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-[#0F172A] tracking-tight mt-2">
              The Leadership Behind Origintra Exim<span className="text-[#0070E0]">.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              Seasoned agro-commodity export leaders combining decades of hands-on farmgate mandi procurement, NABL laboratory food compliance, and disciplined maritime logistics.
            </p>
          </div>

          {/* Leaders 4-Column Grid with Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Photo container */}
                <div className="relative aspect-4/5 overflow-hidden bg-slate-100">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-85" />
                  
                  {/* Position Pill Overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block bg-[#0070E0]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                      {member.position}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-display font-bold text-[#0F172A]">
                        {member.name}
                      </h3>
                      <ShieldCheck className="w-4 h-4 text-[#0070E0] shrink-0" />
                    </div>

                    <p className="text-xs font-semibold text-[#0070E0]">
                      {member.role}
                    </p>

                    <div className="pt-1">
                      <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md inline-block">
                        {member.credentials}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-2">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                    <span className="text-slate-400 font-normal">Focus: </span>
                    {member.specialization}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Operational Culture & Ground Execution Pillars */}
          <div className="pt-12 border-t border-slate-200">
            <div className="max-w-2xl mb-8">
              <h3 className="text-xl font-display font-semibold text-[#0F172A]">
                Our Operational Commitments
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                How our procurement, inspection, and port operations teams work daily on international consignments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TEAM_EXPANSION_NOTICE.culturePoints.map((point, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0070E0] flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                  <h4 className="text-base font-display font-semibold text-[#0F172A]">
                    {point.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-700 font-medium">
                {TEAM_EXPANSION_NOTICE.joinCallout}
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="btn-pill btn-pill-dark bg-[#0A1C3E] hover:bg-[#0070E0] text-white px-5 py-2.5 text-xs font-semibold shrink-0 cursor-pointer"
              >
                <span>Connect with Commercial Desk</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-20 bg-[#0A1C3E] text-white">
        <div className="container-x mx-auto max-w-[1440px] text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight">
            Start a Reliable Indian Sourcing Partnership
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto">
            Discuss your target specifications and delivery schedules with our trade team.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenQuote}
              className="btn-pill btn-pill-dark bg-[#0070E0] hover:bg-[#005bb5] text-white px-8 py-3 text-sm font-semibold flex items-center space-x-2 cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="btn-pill btn-pill-outline border-white/30 text-white hover:bg-white hover:text-[#0A1C3E] px-8 py-3 text-sm font-semibold cursor-pointer"
            >
              <span>Contact Trade Desk</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
