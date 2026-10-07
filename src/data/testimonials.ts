export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  country: string;
  destinationPort: string;
  commodity: string;
  testimonial: string;
  volumeOrType: string;
  rating?: number;
  avatar?: string;
  createdAt?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Tariq Al-Mansoor',
    role: 'Head of Agricultural Procurement',
    company: 'Al-Ameen Food Distribution LLC',
    country: 'United Arab Emirates',
    destinationPort: 'Port of Jebel Ali, UAE',
    commodity: 'Guntur S17 Whole Chillies & Powder',
    volumeOrType: 'Commercial FCL Containers',
    rating: 5,
    testimonial: 'In the Middle Eastern spice import trade, consistency in heat levels (SHU) and moisture ceiling is non-negotiable. Origintra Exim delivered our containerized red chilli shipments directly to Jebel Ali on schedule, with fumigation certificates and original bills of lading dispatched without delay. The Sortex cleaning quality and 25kg multi-wall packing met our exact re-packing specifications.'
  },
  {
    id: 't-2',
    author: 'Lars Van Der Meer',
    role: 'Senior Supply Chain Director',
    company: 'Nordic Spice & Seasoning Blends B.V.',
    country: 'Netherlands',
    destinationPort: 'Port of Rotterdam, Netherlands',
    commodity: 'Salem Turmeric Fingers & 100-Mesh Powder',
    volumeOrType: 'Industrial Ingredient Lots',
    rating: 5,
    testimonial: 'Sourcing single-origin turmeric with verified curcumin content and complete pesticide residue compliance for the European market requires dependable partners. Origintra’s pre-shipment laboratory COA matched the delivered container lots precisely. Zero caking, clean palletization, and prompt commercial coordination from Mundra port.'
  },
  {
    id: 't-3',
    author: 'Mei-Ling Chen',
    role: 'Import & Quality Assurance Manager',
    company: 'Nusantara Food Ingredients Pte Ltd',
    country: 'Singapore',
    destinationPort: 'Port of Singapore (PSA)',
    commodity: 'Sortex Cumin Seeds 99.5% & Coriander',
    volumeOrType: 'Scheduled Quarterly Contracts',
    rating: 5,
    testimonial: 'For our commercial curry powder manufacturing facility, extraneous matter and foreign seeds must be strictly absent. Origintra’s Sortex-cleaned cumin seed consignments arrived with pristine purity and robust essential oil aroma. Their team maintained transparent weekly vessel tracking from container stuffing to discharge.'
  },
  {
    id: 't-4',
    author: 'Dr. Klaus Weber',
    role: 'Head of Botanical Procurement',
    company: 'Bavarian Seasonings & Herbals GmbH',
    country: 'Germany',
    destinationPort: 'Port of Hamburg, Germany',
    commodity: 'Alleppey Green Cardamom (8mm Bold)',
    volumeOrType: 'Vacuum Packed 5kg Cartons',
    rating: 5,
    testimonial: 'European Union MRL standards require uncompromising purity and zero pesticide residue tolerance. Origintra provided certified batch testing from NABL accredited laboratories before vessel loading. The cardamom arrived in pristine aroma-sealed foil boxes with unbroken emerald hue.'
  },
  {
    id: 't-5',
    author: 'Marcus Sterling',
    role: 'Commercial Import Director',
    company: 'Commonwealth Seasoning Mills Ltd',
    country: 'United Kingdom',
    destinationPort: 'Port of Felixstowe, UK',
    commodity: 'Malabar Black Pepper (TGSEB 570 g/L)',
    volumeOrType: 'Spot & Annual Contract Orders',
    rating: 5,
    testimonial: 'We import Tellicherry bold black pepper for retail grinding across Britain. Origintra delivered exceptional bulk density and piperine punch with perfectly dry 10.5% moisture ceiling. Container stuffing was well-ventilated with moisture traps, preventing any ship-hold condensation.'
  }
];
