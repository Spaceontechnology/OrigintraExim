import { TeamMember } from '../types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'director-ceo',
    name: 'Rajesh V. Patel',
    position: 'Founder & Managing Director',
    role: 'Global Trade Strategy & Commercial Partnerships',
    photo: '/assets/team/director.jpg',
    specialization: 'International Trade Finance, Export Compliance & Foreign Buyer Relations',
    credentials: '18+ Years in Agri-Commodity Exports',
    bio: 'Leads Origintra Exim’s global expansion, institutional buyer negotiations across the Middle East, Europe, and Asia, and long-term farmgate-to-port supply integrity.',
    linkedIn: 'https://linkedin.com'
  },
  {
    id: 'procurement-head',
    name: 'Vikramaditya Sharma',
    position: 'Head of Agricultural Procurement',
    role: 'Farmgate Mandi Clusters & Sourcing',
    photo: '/assets/team/procurement.jpg',
    specialization: 'Origin Mandi Inspections, Harvest Crop Forecasting & Farmer Alliances',
    credentials: '15+ Years Direct Mandi Sourcing',
    bio: 'Oversees on-ground procurement across prime agricultural mandis in Guntur, Unjha, Ramganj, and Erode, ensuring direct farmgate access and fresh seasonal crop selections.',
    linkedIn: 'https://linkedin.com'
  },
  {
    id: 'qa-director',
    name: 'Dr. Ananya Deshmukh',
    position: 'Director of Quality & Food Safety',
    role: 'Laboratory Testing & Regulatory Compliance',
    photo: '/assets/team/quality.jpg',
    specialization: 'ASTA / ESA Purity Standards, Aflatoxin & MRL Pesticide Screening',
    credentials: 'Ph.D. in Food Chemistry & Technology',
    bio: 'Directs Origintra’s stringent quality assurance protocols, third-party NABL laboratory testing, Sortex mechanical purity standards, and destination country phytosanitary compliance.',
    linkedIn: 'https://linkedin.com'
  },
  {
    id: 'logistics-head',
    name: 'Karan Malhotra',
    position: 'Head of International Logistics',
    role: 'Maritime Operations & Port Staging',
    photo: '/assets/team/logistics.jpg',
    specialization: 'FCL Container Staging, Mundra / Nhava Sheva / Cochin Corridors',
    credentials: '12+ Years Maritime Freight Logistics',
    bio: 'Manages seamless container stuffing, fumigation protocols, surveyor seals, ocean carrier bookings, and timely export document dispatches for zero-delay clearance at discharge ports.',
    linkedIn: 'https://linkedin.com'
  }
];

export const TEAM_EXPANSION_NOTICE = {
  heading: 'The People Behind Origintra',
  subheading: 'Experienced leadership steering trusted Indian spice exports worldwide.',
  description: 'Origintra Exim combines veteran agricultural mandi sourcing with rigorous food testing and disciplined maritime logistics to guarantee dependable B2B execution for overseas importers.',
  culturePoints: [
    {
      title: 'Direct Sourcing Relationships',
      description: 'Our sourcing representatives operate directly in key agricultural belts, inspecting crops at regional mandis and processing clusters.'
    },
    {
      title: 'Rigorous Quality Oversight',
      description: 'Quality specialists coordinate with certified testing laboratories to ensure every export lot matches agreed analytical parameters.'
    },
    {
      title: 'End-to-End Maritime Coordination',
      description: 'Our logistics personnel supervise container stuffing, surveyor seal validation, and export documentation at gateway ports.'
    }
  ],
  joinCallout: 'Interested in partnering with our international trade network? Contact our commercial desk.'
};
