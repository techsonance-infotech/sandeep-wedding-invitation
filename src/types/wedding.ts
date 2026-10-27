export interface WeddingEvent {
  id: string;
  name: string;
  title: string;
  day: string;
  date: string; // e.g. "19th November 2026"
  isoDate: string; // "2026-11-19"
  time: string;
  venueName: string;
  venueAddress: string;
  city: string;
  state: string;
  pincode?: string;
  googleMapsUrl: string;
  dressCode?: string;
  iconName: string;
  cardImage: string;
  themeColor: string;
  description: string;
  rituals: string[];
}

export interface FamilyMember {
  role: string;
  name: string;
  title?: string;
}

export interface FamilySide {
  side: 'groom' | 'bride';
  familyName: string;
  parents: {
    mother: string;
    father: string;
  };
  grandparents?: {
    grandmother?: string;
    grandfather?: string;
  };
  blessingQuote: string;
}

export interface InvitationCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: 'invocation' | 'main' | 'haldi' | 'sangeet' | 'marriage' | 'reception' | 'rsvp';
  aspectRatio: string;
  altText: string;
}

export interface RSVPSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  attendingEvents: string[];
  guestsCount: number;
  dietaryPreference: 'pure-veg' | 'jain' | 'standard';
  blessingMessage: string;
  submittedAt: string;
}

export interface BlessingItem {
  id: string;
  author: string;
  relation: string;
  message: string;
  date: string;
  likes: number;
}
