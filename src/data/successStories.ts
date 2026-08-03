export interface SuccessStory {
  id: string;
  coupleNames: string;
  weddingDate: string;
  location: string;
  matchScore: number;
  coverImage: string;
  quote: string;
  story: string;
  timeline: {
    phase: string;
    date: string;
    title: string;
    details: string;
  }[];
}

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 's1',
    coupleNames: 'Sebastian & Evelyn',
    weddingDate: 'June 2025',
    location: 'Villa d’Este, Lake Como, Italy',
    matchScore: 99,
    coverImage: '/assets/3d/success_stories_couple.png',
    quote: 'Éternité brought together two souls separated by oceans. From our first AI compatibility match to our Lake Como vows, every moment felt destined.',
    story: 'Sebastian, an investment director from Zurich, and Evelyn, an art conservator from London, matched with a 99% AI compatibility rating on Éternité. Their shared vision for family, art, and timeless values transformed virtual conversations into a magical European romance.',
    timeline: [
      { phase: 'Match', date: 'Oct 2024', title: 'AI Matchmaker Discovery', details: '99% compatibility score highlighted their mutual love for classical art.' },
      { phase: 'First Date', date: 'Nov 2024', title: 'Parisian Coffee', details: 'Met at Le Meurice, Paris. Ended up talking for 6 uninterrupted hours.' },
      { phase: 'Proposal', date: 'Feb 2025', title: 'Sunset at Amalfi Coast', details: 'Sebastian proposed during a private boat cruise in Positano.' },
      { phase: 'Wedding', date: 'June 2025', title: 'Royal Lake Como Wedding', details: 'Celebrated with 120 loved ones at Villa d’Este.' }
    ]
  },
  {
    id: 's2',
    coupleNames: 'Vikram & Isabel',
    weddingDate: 'September 2025',
    location: 'Château de Chantilly, France',
    matchScore: 97,
    coverImage: '/assets/3d/wedding_journey_timeline.png',
    quote: 'Our families immediately bonded over shared values and warm traditions. Éternité is truly the gold standard of meaningful matrimony.',
    story: 'Vikram, a tech entrepreneur from San Francisco, met Isabel, a pediatric surgeon from Geneva. Through Éternité’s Family Access shield and VIP Concierge, both families were involved from day one, laying a foundation of unconditional trust.',
    timeline: [
      { phase: 'Match', date: 'Dec 2024', title: 'Verified VIP Match', details: 'Matched through Diamond VIP Concierge.' },
      { phase: 'Family Meeting', date: 'Jan 2025', title: 'Geneva Family Dinner', details: 'Both families gathered in Switzerland.' },
      { phase: 'Engagement', date: 'May 2025', title: 'Royal Ring Ceremony', details: 'Exchanged heirloom rings in Rajasthan.' },
      { phase: 'Wedding', date: 'Sept 2025', title: 'Fairytale Castle Nuptials', details: 'Grand celebration at Château de Chantilly.' }
    ]
  }
];
