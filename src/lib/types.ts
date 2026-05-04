export interface Property {
  id: number;
  title: string;
  price: number;
  priceLabel: string;
  location: string;
  zone: string;
  surface: number;
  surfaceLabel: string;
  bedrooms: number;
  bathrooms: number;
  type: 'Vente' | 'Location';
  category: string;
  img: string;
  badge: string;
  featured: boolean;
  description: string;
  descriptionFull: string;
  features: string[];
  images: string[];
  yearBuilt?: number;
  parking?: number;
  floor?: number;
  availableFrom?: string;
}

export type LeadStatus = 'nouveau' | 'en_cours' | 'traite' | 'rejete';

export interface PropertyLead {
  id: number;
  name: string;
  phone: string;
  email?: string;
  whatsapp?: string;
  type: 'Vente' | 'Location';
  category?: string;
  location?: string;
  zone?: string;
  surface?: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  floor?: number;
  priceExpectation?: number;
  description?: string;
  images: string[];
  status: LeadStatus;
  adminNotes?: string;
  convertedPropertyId?: number;
  createdAt: string;
  updatedAt: string;
}
