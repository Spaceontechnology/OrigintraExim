export interface PortOption {
  code: string;
  name: string;
  country: string;
  region: 'Middle East' | 'Europe' | 'North America' | 'Asia Pacific' | 'Africa' | 'Latin America';
  transitDaysFromIndia: number;
  freeDetentionDays: number;
}

export const DESTINATION_PORTS: PortOption[] = [
  { code: 'DXB-JBL', name: 'Jebel Ali Port (Dubai)', country: 'United Arab Emirates', region: 'Middle East', transitDaysFromIndia: 4, freeDetentionDays: 14 },
  { code: 'SA-JED', name: 'Jeddah Islamic Port', country: 'Saudi Arabia', region: 'Middle East', transitDaysFromIndia: 7, freeDetentionDays: 14 },
  { code: 'NL-RTM', name: 'Port of Rotterdam', country: 'Netherlands', region: 'Europe', transitDaysFromIndia: 22, freeDetentionDays: 10 },
  { code: 'DE-HAM', name: 'Port of Hamburg', country: 'Germany', region: 'Europe', transitDaysFromIndia: 24, freeDetentionDays: 10 },
  { code: 'GB-FXT', name: 'Port of Felixstowe / London Gateway', country: 'United Kingdom', region: 'Europe', transitDaysFromIndia: 25, freeDetentionDays: 10 },
  { code: 'US-NYC', name: 'Port of New York / New Jersey', country: 'United States', region: 'North America', transitDaysFromIndia: 26, freeDetentionDays: 7 },
  { code: 'US-LAX', name: 'Port of Los Angeles / Long Beach', country: 'United States', region: 'North America', transitDaysFromIndia: 32, freeDetentionDays: 7 },
  { code: 'CA-VAN', name: 'Port of Vancouver', country: 'Canada', region: 'North America', transitDaysFromIndia: 30, freeDetentionDays: 7 },
  { code: 'SG-SIN', name: 'Port of Singapore', country: 'Singapore', region: 'Asia Pacific', transitDaysFromIndia: 6, freeDetentionDays: 14 },
  { code: 'JP-TYO', name: 'Port of Tokyo / Yokohama', country: 'Japan', region: 'Asia Pacific', transitDaysFromIndia: 16, freeDetentionDays: 14 },
  { code: 'AU-SYD', name: 'Port of Sydney / Melbourne', country: 'Australia', region: 'Asia Pacific', transitDaysFromIndia: 21, freeDetentionDays: 10 },
  { code: 'ZA-DUR', name: 'Port of Durban', country: 'South Africa', region: 'Africa', transitDaysFromIndia: 15, freeDetentionDays: 14 },
];

export const CONTAINER_SPECS = {
  '20FCL': {
    name: "20' Standard Dry Container",
    maxPayloadKg: 21800,
    volumeCBM: 33.2,
    internalLengthM: 5.9,
    idealFor: 'Dense, heavy whole spices (Pepper, Turmeric, Cumin, Cardamom)'
  },
  '40FCL': {
    name: "40' Standard Dry Container",
    maxPayloadKg: 26500,
    volumeCBM: 67.7,
    internalLengthM: 12.0,
    idealFor: 'Volume & bulky spices (Chilli loose bags, Cinnamon quills, Star Anise)'
  },
  '40HC': {
    name: "40' High Cube Container",
    maxPayloadKg: 26300,
    volumeCBM: 76.4,
    internalLengthM: 12.0,
    idealFor: 'Maximum volumetric cargo and high stack palletization'
  },
  'LCL': {
    name: 'LCL (Less than Container Load)',
    maxPayloadKg: 8000,
    volumeCBM: 15.0,
    internalLengthM: 0,
    idealFor: 'Trial consignments, ultra-premium spices (Cardamom, Saffron, Vanilla)'
  }
};

export const PACKAGING_SPECS = [
  { id: 'jute-25', name: '25 KG Traditional Eco Jute / Gunny Bag', unitWeightKg: 25, tareKg: 0.5, cbmPerUnit: 0.055 },
  { id: 'pp-25', name: '25 KG PP Woven Bag (Moisture Resistant Poly-Liner)', unitWeightKg: 25, tareKg: 0.15, cbmPerUnit: 0.050 },
  { id: 'pp-50', name: '50 KG PP Woven Industrial Bag', unitWeightKg: 50, tareKg: 0.25, cbmPerUnit: 0.098 },
  { id: 'vac-5', name: '5 KG x 4 Nitrogen Vacuum Pouches in 20 KG Master Carton', unitWeightKg: 20, tareKg: 0.8, cbmPerUnit: 0.042 },
  { id: 'kraft-25', name: '25 KG Multiwall Kraft Paper Bag with Barrier', unitWeightKg: 25, tareKg: 0.3, cbmPerUnit: 0.048 },
];

export const SAMPLE_SHIPMENTS = [
  {
    trackingNumber: 'OTX-992-ROTTERDAM',
    vesselName: 'MSC ANNA (Voyage 2604W)',
    shippingLine: 'Mediterranean Shipping Company (MSC)',
    originPort: 'Mundra Port (INMUN1), India',
    destinationPort: 'Port of Rotterdam (NLRTM), Netherlands',
    etd: '2026-09-24',
    eta: '2026-10-16',
    currentStatus: 'Vessel In Transit' as const,
    progressPercentage: 62,
    currentLocation: 'Bab-el-Mandeb / Red Sea Maritime Corridor',
    containerTemp: '22.4°C (Optimal)',
    containerHumidity: '58% RH (Dry & Ventilated)',
    phytosanitaryCertStatus: 'Verified by Plant Quarantine India (E-Phyto: IN26PQ8841)',
    cargoDescription: '2 x 20FT FCL - Tellicherry Extra Bold Black Pepper (TGSEB) & Salem Turmeric',
    weightMT: '34.00 MT'
  },
  {
    trackingNumber: 'OTX-741-JEBELALI',
    vesselName: 'MAERSK KINLOSS (Voyage 811S)',
    shippingLine: 'A.P. Moller – Maersk',
    originPort: 'JNPT Nhava Sheva (INNSA1), Mumbai',
    destinationPort: 'Jebel Ali Port (AEJEA), Dubai, UAE',
    etd: '2026-10-01',
    eta: '2026-10-05',
    currentStatus: 'Customs Clearance' as const,
    progressPercentage: 90,
    currentLocation: 'Approaching Berth 4, Jebel Ali Terminal 2',
    containerTemp: '24.1°C',
    containerHumidity: '52% RH',
    phytosanitaryCertStatus: 'Pre-Cleared Dubai Municipality Food Safety',
    cargoDescription: '1 x 20FT FCL - Alleppey Bold Green Cardamom (8mm+)',
    weightMT: '14.50 MT'
  },
  {
    trackingNumber: 'OTX-318-NEWYORK',
    vesselName: 'CMA CGM MARCO POLO (Voyage 0ME9E1MA)',
    shippingLine: 'CMA CGM Group',
    originPort: 'Cochin Port (INCOK1), Kerala',
    destinationPort: 'Port of New York / Newark (USNYC), USA',
    etd: '2026-09-12',
    eta: '2026-10-08',
    currentStatus: 'Vessel In Transit' as const,
    progressPercentage: 88,
    currentLocation: 'North Atlantic Ocean - 350 NM East of Cape Hatteras',
    containerTemp: '21.0°C',
    containerHumidity: '55% RH',
    phytosanitaryCertStatus: 'US FDA Prior Notice ID: PN-2026-991823 Confirmed',
    cargoDescription: '1 x 40FT HC - Guntur Teja Stemless Red Chilli & Cumin Seeds',
    weightMT: '22.80 MT'
  }
];
