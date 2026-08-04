export interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  country: string;
  profession: string;
  company: string;
  education: string;
  height: string;
  religion: string;
  community: string;
  motherTongue: string;
  verified: boolean;
  vipTier: 'Gold' | 'Platinum' | 'Diamond';
  aiMatchScore: number; // e.g. 98
  matchReason: string;
  bio: string;
  connectIntro?: string;
  photos: string[];
  coverPhoto: string;
  compatibilityRadar: {
    values: number;
    lifestyle: number;
    communication: number;
    futureGoals: number;
    astroSync: number;
  };
  horoscope: {
    zodiac: string;
    gunaScore: string; // e.g. "34/36"
    nakshatra: string;
    rashi: string;
    manglik: boolean;
  };
  familyDetails: {
    background: string;
    father: string;
    mother: string;
    familyValues: string;
    location: string;
  };
  lifestyle: {
    diet: string;
    fitness: string;
    travel: string;
    drinking: string;
    smoking: string;
    hobbies: string[];
  };
  timeline: {
    year: string;
    title: string;
    description: string;
  }[];
  relationshipGoals: string[];
}

export const MOCK_PROFILES: Profile[] = [
  {
    id: 'p1',
    name: 'Aria D’Souza',
    age: 27,
    location: 'London, UK & Mumbai',
    country: 'United Kingdom',
    profession: 'Architectural Director',
    company: 'Foster + Partners',
    education: 'M.Arch, Royal College of Art, London',
    height: "5'8\"",
    religion: 'Christian / Catholic',
    community: 'Anglo-Indian',
    motherTongue: 'English / Hindi',
    verified: true,
    vipTier: 'Diamond',
    aiMatchScore: 98,
    matchReason: 'Shared passion for European architecture, high value on family traditions, and 34/36 Astro Sync.',
    bio: 'Believer in timeless elegance, quiet luxury, and Sunday family brunches. Designing sustainable skylines by day, playing classical cello by evening. Seeking a soulmate who values intellect, warmth, and lifelong growth.',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'
    ],
    coverPhoto: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    compatibilityRadar: {
      values: 98,
      lifestyle: 95,
      communication: 96,
      futureGoals: 99,
      astroSync: 94
    },
    horoscope: {
      zodiac: 'Libra',
      gunaScore: '34 / 36',
      nakshatra: 'Chitra',
      rashi: 'Tula',
      manglik: false
    },
    familyDetails: {
      background: 'Prominent Industrialist & Educator Family',
      father: 'Senior Partner, Global Legal Firm',
      mother: 'Philanthropist & Art Curator',
      familyValues: 'Modern Liberal with Deep Cultural Roots',
      location: 'Mayfair, London / South Mumbai'
    },
    lifestyle: {
      diet: 'Flexitarian / Gourmet',
      fitness: 'Pilates & Equestrian',
      travel: 'Amalfi Coast, Kyoto & Swiss Alps',
      drinking: 'Socially (Fine Wine)',
      smoking: 'Never',
      hobbies: ['Classical Cello', 'Art History', 'Sailing', 'Wine Tasting']
    },
    timeline: [
      { year: '2021', title: 'Graduated Royal College of Art', description: 'Awarded Gold Medal for Sustainable Architecture.' },
      { year: '2023', title: 'Appointed Associate Partner', description: 'Led flagship museum project in Monaco.' },
      { year: '2026', title: 'Ready for Marriage', description: 'Seeking to build a loving home filled with laughter and art.' }
    ],
    relationshipGoals: [
      'Building a supportive, joyful home',
      'International travel & cultural exploration',
      'Shared commitment to philanthropy'
    ]
  },
  {
    id: 'p2',
    name: 'Devan M. Kapoor',
    age: 30,
    location: 'New York & Dubai',
    country: 'United States',
    profession: 'Venture Capitalist / Founder',
    company: 'Apex Horizon Capital',
    education: 'MBA, Harvard Business School',
    height: "6'1\"",
    religion: 'Hindu',
    community: 'Punjabi Khatri',
    motherTongue: 'English / Hindi',
    verified: true,
    vipTier: 'Diamond',
    aiMatchScore: 96,
    matchReason: 'Exceptional alignment on global lifestyle, entrepreneurial drive, and family integrity.',
    bio: 'Former athlete turned VC investing in clean tech and health. Raised between NYC and New Delhi with a deep love for family dinners, chess, and weekend tennis.',
    connectIntro: 'Bonjour! I am Devan M. Kapoor, a Venture Capitalist and founder of Apex Horizon Capital. I am looking for an ambitious and elegant partner who values family traditions and intellectual growth. My ambition is to build global ventures while nurturing deep, meaningful personal relationships.',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80'
    ],
    coverPhoto: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    compatibilityRadar: {
      values: 96,
      lifestyle: 97,
      communication: 94,
      futureGoals: 98,
      astroSync: 92
    },
    horoscope: {
      zodiac: 'Leo',
      gunaScore: '33 / 36',
      nakshatra: 'Magha',
      rashi: 'Simha',
      manglik: false
    },
    familyDetails: {
      background: 'Business Royalty & Real Estate Developers',
      father: 'Chairman, Kapoor Enterprises',
      mother: 'Former Managing Director, Tech Group',
      familyValues: 'Warm, Hospitable, Progressive Values',
      location: 'Manhattan, NYC / Palm Jumeirah, Dubai'
    },
    lifestyle: {
      diet: 'Healthy / Organic',
      fitness: 'Tennis, Marathon & Golf',
      travel: 'Lake Como, Aspen & Maldives',
      drinking: 'Socially',
      smoking: 'Never',
      hobbies: ['Tennis', 'Private Pilot', 'Piano', 'Watch Collecting']
    },
    timeline: [
      { year: '2020', title: 'Harvard Business School', description: 'Co-founded Tech Impact Fund.' },
      { year: '2024', title: 'Forbes 30 Under 30', description: 'Featured in finance & innovation.' },
      { year: '2026', title: 'Seeking Life Partner', description: 'Ready to build a lifelong bond with mutual respect.' }
    ],
    relationshipGoals: [
      'Creating a loving, stable family',
      'Supporting each other’s ambitions',
      'Fostering strong family ties'
    ]
  },
  {
    id: 'p3',
    name: 'Natasha V. Singhania',
    age: 28,
    location: 'Geneva, Switzerland & Mumbai',
    country: 'Switzerland',
    profession: 'Pediatric Surgeon',
    company: 'Hôpitaux Universitaires de Genève',
    education: 'MD, University of Geneva',
    height: "5'7\"",
    religion: 'Hindu',
    community: 'Marwari',
    motherTongue: 'English / French / Hindi',
    verified: true,
    vipTier: 'Platinum',
    aiMatchScore: 94,
    matchReason: 'Empathetic personality, medical dedication, and harmonized astrological birth charts.',
    bio: 'Healer at heart, ocean lover by soul. Splitting time between Geneva medical research and family estates. Looking for someone grounded, humorous, and emotionally mature.',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80'
    ],
    coverPhoto: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    compatibilityRadar: {
      values: 95,
      lifestyle: 92,
      communication: 97,
      futureGoals: 94,
      astroSync: 95
    },
    horoscope: {
      zodiac: 'Taurus',
      gunaScore: '35 / 36',
      nakshatra: 'Rohini',
      rashi: 'Vrishabha',
      manglik: false
    },
    familyDetails: {
      background: 'Healthcare Pioneers & Philanthropists',
      father: 'Chief Cardiologist',
      mother: 'Author & Clinical Psychologist',
      familyValues: 'Intellectual, Compassionate, Family-Focused',
      location: 'Geneva / New Delhi'
    },
    lifestyle: {
      diet: 'Vegetarian',
      fitness: 'Yoga & Alpine Hiking',
      travel: 'Swiss Alps, Tuscany, Bali',
      drinking: 'Non-drinker',
      smoking: 'Never',
      hobbies: ['Violin', 'Pottery', 'Alpine Skiing', 'Scuba Diving']
    },
    timeline: [
      { year: '2022', title: 'Surgical Fellowship', description: 'Specialized in pediatric cardiology.' },
      { year: '2025', title: 'Humanitarian Mission', description: 'Led children’s surgical initiative in Kenya.' }
    ],
    relationshipGoals: [
      'Deep emotional connection',
      'Shared values of service & joy',
      'Warm European-Indian family life'
    ]
  },
  {
    id: 'p4',
    name: 'Rohan E. De Silva',
    age: 31,
    location: 'Paris, France & Singapore',
    country: 'France',
    profession: 'Luxury Brand Managing Director',
    company: 'LVMH Group',
    education: 'MSc Luxury Management, INSEAD',
    height: "6'2\"",
    religion: 'Christian',
    community: 'Eurasian',
    motherTongue: 'English / French',
    verified: true,
    vipTier: 'Diamond',
    aiMatchScore: 97,
    matchReason: 'Refined artistic taste, cultural versatility, and high emotional intelligence.',
    bio: 'Passionate about haute horlogerie, gastronomy, and classical architecture. Appreciates quiet evenings, genuine conversation, and timeless commitments.',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80'
    ],
    coverPhoto: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    compatibilityRadar: {
      values: 97,
      lifestyle: 98,
      communication: 95,
      futureGoals: 96,
      astroSync: 93
    },
    horoscope: {
      zodiac: 'Pisces',
      gunaScore: '32 / 36',
      nakshatra: 'Revati',
      rashi: 'Meena',
      manglik: false
    },
    familyDetails: {
      background: 'Diplomatic & Hospitality Lineage',
      father: 'Former Ambassador',
      mother: 'Boutique Hotelier',
      familyValues: 'Gracious, Cultured, Global Mindset',
      location: 'Paris 8th Arrondissement / Singapore'
    },
    lifestyle: {
      diet: 'Gourmet / Seafood',
      fitness: 'Fencing & Rowing',
      travel: 'Bordeaux, St. Tropez, Monaco',
      drinking: 'Socially (Sommelier Trained)',
      smoking: 'Never',
      hobbies: ['Gastronomy', 'Vintage Watches', 'Opera', 'Polo']
    },
    timeline: [
      { year: '2021', title: 'INSEAD Graduate', description: 'Graduated top of class.' },
      { year: '2024', title: 'Director at LVMH', description: 'Managing luxury watches division.' }
    ],
    relationshipGoals: [
      'Timeless romance & partnership',
      'Building an inspiring household',
      'Laughter and lifelong devotion'
    ]
  }
];
