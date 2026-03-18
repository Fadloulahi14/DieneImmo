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
