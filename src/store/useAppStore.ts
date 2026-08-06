import { create } from 'zustand';
import { MOCK_PROFILES, Profile } from '../data/profiles';

export type ScreenType =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'home'
  | 'discover'
  | 'profile'
  | 'match-details'
  | 'chat'
  | 'membership'
  | 'success-stories'
  | 'notifications'
  | 'settings'
  | 'complete-profile'
  | 'terms-conditions'
  | 'our-speciality'
  | 'system-guarantees';

export type DiscoverViewMode = 'swipe' | 'grid' | 'map';

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isVoiceNote?: boolean;
  duration?: string;
  isGiftSticker?: boolean;
  giftName?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'like' | 'match' | 'concierge' | 'system';
  read: boolean;
  avatar?: string;
}

interface AppState {
  currentScreen: ScreenType;
  selectedProfileId: string;
  discoverMode: DiscoverViewMode;
  swipeIndex: number;
  shortlistedIds: string[];
  likedIds: string[];
  passedIds: string[];
  filterModalOpen: boolean;
  datePlannerOpen: boolean;
  videoCallActive: boolean;
  userTier: 'Gold' | 'Platinum' | 'Diamond';
  incognitoMode: boolean;
  searchQuery: string;
  isProfileVerified: boolean;
  isEmailVerified: boolean;
  
  // Filter settings
  ageRange: [number, number];
  selectedReligion: string;
  selectedCountry: string;
  minAstroScore: number;

  // Notifications
  notifications: AppNotification[];

  // Chat State
  activeChatProfileId: string;
  messagesMap: Record<string, ChatMessage[]>;

  // Actions
  setScreen: (screen: ScreenType) => void;
  setSelectedProfileId: (id: string) => void;
  setDiscoverMode: (mode: DiscoverViewMode) => void;
  nextSwipe: () => void;
  toggleShortlist: (id: string) => void;
  likeProfile: (id: string) => void;
  passProfile: (id: string) => void;
  setFilterModalOpen: (open: boolean) => void;
  setDatePlannerOpen: (open: boolean) => void;
  setVideoCallActive: (active: boolean) => void;
  setUserTier: (tier: 'Gold' | 'Platinum' | 'Diamond') => void;
  toggleIncognito: () => void;
  setSearchQuery: (query: string) => void;
  setAgeRange: (range: [number, number]) => void;
  setSelectedReligion: (religion: string) => void;
  setSelectedCountry: (country: string) => void;
  setMinAstroScore: (score: number) => void;
  markNotificationAsRead: (id: string) => void;
  sendMessage: (profileId: string, message: ChatMessage) => void;
  setProfileVerified: (verified: boolean) => void;
  setEmailVerified: (verified: boolean) => void;
  currentUserProfile: Profile;
  updateCurrentUserProfile: (profile: Partial<Profile>) => void;
  updateUserPhoto: (index: number, url: string) => void;
  
  // Auth state
  authToken: string | null;
  currentUser: any | null;
  setAuthToken: (token: string | null) => void;
  setCurrentUser: (user: any | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentScreen: 'splash', // Start at Splash screen -> Onboarding -> Login -> Home
  selectedProfileId: 'p1',
  discoverMode: 'swipe',
  swipeIndex: 0,
  shortlistedIds: ['p1', 'p3'],
  likedIds: ['p1'],
  passedIds: [],
  filterModalOpen: false,
  datePlannerOpen: false,
  videoCallActive: false,
  userTier: 'Diamond',
  incognitoMode: false,
  searchQuery: '',
  isProfileVerified: false,
  isEmailVerified: false,
  currentUserProfile: MOCK_PROFILES[1],

  ageRange: [24, 35],
  selectedReligion: 'All Religions',
  selectedCountry: 'Global Elite',
  minAstroScore: 30,

  notifications: [
    {
      id: 'n1',
      title: '✨ 98% AI Soulmate Match',
      message: 'Aria D’Souza fits your lifestyle and astro chart criteria exceptionally well.',
      time: '10m ago',
      type: 'match',
      read: false,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'n2',
      title: '👑 Diamond Concierge Update',
      message: 'Your personal matchmaker curated 3 new verified royal profiles for you.',
      time: '1h ago',
      type: 'concierge',
      read: false
    },
    {
      id: 'n3',
      title: '💖 Super Like Received',
      message: 'Devan M. Kapoor sent you a Super Like with a personalized message.',
      time: '3h ago',
      type: 'like',
      read: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    }
  ],

  activeChatProfileId: 'p1',
  messagesMap: {
    p1: [
      { id: 'm1', senderId: 'p1', text: 'Hello! I noticed our shared passion for European art and architecture. I loved your recent travel notes.', timestamp: '10:14 AM' },
      { id: 'm2', senderId: 'user', text: 'Good morning, Aria! Thank you so much. It is rare to meet someone who appreciates classical design as much.', timestamp: '10:18 AM' },
      { id: 'm3', senderId: 'p1', text: 'I am actually heading to London next week for a gallery opening in Mayfair. Would love to share a coffee!', timestamp: '10:22 AM' }
    ]
  },

  setScreen: (screen) => set({ currentScreen: screen }),
  setSelectedProfileId: (id) => set({ selectedProfileId: id }),
  setDiscoverMode: (mode) => set({ discoverMode: mode }),
  nextSwipe: () => set((state) => ({ swipeIndex: (state.swipeIndex + 1) % MOCK_PROFILES.length })),

  toggleShortlist: (id) => set((state) => {
    const exists = state.shortlistedIds.includes(id);
    return {
      shortlistedIds: exists ? state.shortlistedIds.filter(i => i !== id) : [...state.shortlistedIds, id]
    };
  }),

  likeProfile: (id) => set((state) => ({
    likedIds: state.likedIds.includes(id) ? state.likedIds : [...state.likedIds, id]
  })),

  passProfile: (id) => set((state) => ({
    passedIds: state.passedIds.includes(id) ? state.passedIds : [...state.passedIds, id]
  })),

  setFilterModalOpen: (open) => set({ filterModalOpen: open }),
  setDatePlannerOpen: (open) => set({ datePlannerOpen: open }),
  setVideoCallActive: (active) => set({ videoCallActive: active }),
  setUserTier: (tier) => set({ userTier: tier }),
  toggleIncognito: () => set((state) => ({ incognitoMode: !state.incognitoMode })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setAgeRange: (range) => set({ ageRange: range }),
  setSelectedReligion: (religion) => set({ selectedReligion: religion }),
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setMinAstroScore: (score) => set({ minAstroScore: score }),
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  sendMessage: (profileId, message) => set((state) => {
    const list = state.messagesMap[profileId] || [];
    return {
      messagesMap: {
        ...state.messagesMap,
        [profileId]: [...list, message]
      }
    };
  }),
  setProfileVerified: (verified) => set({ isProfileVerified: verified }),
  setEmailVerified: (verified) => set({ isEmailVerified: verified }),
  updateCurrentUserProfile: (profile) => set((state) => ({
    currentUserProfile: {
      ...state.currentUserProfile,
      ...profile,
      familyDetails: profile.familyDetails ? { ...state.currentUserProfile.familyDetails, ...profile.familyDetails } : state.currentUserProfile.familyDetails,
      horoscope: profile.horoscope ? { ...state.currentUserProfile.horoscope, ...profile.horoscope } : state.currentUserProfile.horoscope,
    }
  })),
  updateUserPhoto: (index, url) => set((state) => {
    const updatedPhotos = [...state.currentUserProfile.photos];
    updatedPhotos[index] = url;
    return {
      currentUserProfile: {
        ...state.currentUserProfile,
        photos: updatedPhotos
      }
    };
  }),

  // Auth Store implementation
  authToken: null,
  currentUser: null,
  setAuthToken: (token) => set({ authToken: token }),
  setCurrentUser: (user) => set((state) => ({
    currentUser: user,
    isEmailVerified: user?.isEmailVerified ?? state.isEmailVerified,
  })),
}));
