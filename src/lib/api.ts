import { neon } from '@neondatabase/serverless';
import type { Property } from './types';

// Cache simple en mémoire
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache: Map<string, CacheEntry<any>> = new Map();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    console.log(`[API] Cache hit: ${key}`);
    return entry.data as T;
  }
  cache.delete(key);
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// Create Neon database client
const createDatabase = () => {
  const host = import.meta.env.VITE_PGHOST || 'ep-odd-rice-amoakyt7-pooler.c-5.us-east-1.aws.neon.tech';
  const user = import.meta.env.VITE_PGUSER || 'neondb_owner';
  const password = import.meta.env.VITE_PGPASSWORD || 'npg_LipQ3Bkv8Otm';
  const database = import.meta.env.VITE_PGDATABASE || 'neondb';
  
  return neon(`postgresql://${user}:${password}@${host}/${database}?sslmode=require`);
};

// Database instance
const database = createDatabase();

// Mapper snake_case → camelCase
function mapProperty(row: any): Property {
  return {
    id: row.id,
    title: row.title,
    price: Number(row.price),
    priceLabel: row.price_label,
    location: row.location,
    zone: row.zone,
    surface: row.surface,
    surfaceLabel: row.surface_label,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    type: row.type,
    category: row.category,
    img: row.img,
    badge: row.badge,
    featured: row.featured,
    description: row.description,
    descriptionFull: row.description_full,
    features: typeof row.features === 'string' ? JSON.parse(row.features) : (row.features || []),
    images: typeof row.images === 'string' ? JSON.parse(row.images) : (row.images || []),
    yearBuilt: row.year_built,
    parking: row.parking,
    floor: row.floor,
    availableFrom: row.available_from,
  };
}

export async function getProperties(): Promise<Property[]> {
  const cacheKey = 'properties';
  const cached = getCached<Property[]>(cacheKey);
  if (cached) return cached;
  
  try {
    const result = await database`SELECT * FROM properties ORDER BY id`;
    const properties = result.map(mapProperty);
    setCache(cacheKey, properties);
    return properties;
  } catch (error) {
    console.error('API Error getProperties:', error);
    throw new Error('Erreur chargement propriétés');
  }
}

export async function getPropertyById(id: number): Promise<Property | null> {
  const cacheKey = `property_${id}`;
  const cached = getCached<Property | null>(cacheKey);
  if (cached) return cached;
  
  try {
    const result = await database`SELECT * FROM properties WHERE id = ${id}`;
    const property = result.length > 0 ? mapProperty(result[0]) : null;
    if (property) setCache(cacheKey, property);
    return property;
  } catch (error) {
    console.error('API Error getPropertyById:', error);
    throw new Error('Erreur chargement propriété');
  }
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const cacheKey = 'featured_properties';
  const cached = getCached<Property[]>(cacheKey);
  if (cached) return cached;
  
  try {
    const result = await database`SELECT * FROM properties WHERE featured = true ORDER BY id`;
    const properties = result.map(mapProperty);
    setCache(cacheKey, properties);
    return properties;
  } catch (error) {
    console.error('API Error getFeaturedProperties:', error);
    throw new Error('Erreur chargement propriétés vedettes');
  }
}

export async function createProperty(property: Omit<Property, 'id'>): Promise<Property> {
  try {
    const result = await database`
      INSERT INTO properties (
        title, price, price_label, location, zone, surface, surface_label,
        bedrooms, bathrooms, type, category, img, badge, featured,
        description, description_full, features, images, year_built, parking, floor, available_from
      ) VALUES (
        ${property.title}, ${property.price}, ${property.priceLabel}, ${property.location},
        ${property.zone}, ${property.surface}, ${property.surfaceLabel}, ${property.bedrooms},
        ${property.bathrooms}, ${property.type}, ${property.category}, ${property.img},
        ${property.badge}, ${property.featured}, ${property.description},
        ${property.descriptionFull}, ${JSON.stringify(property.features)},
        ${JSON.stringify(property.images)}, ${property.yearBuilt}, ${property.parking},
        ${property.floor}, ${property.availableFrom}
      )
      RETURNING *
    `;
    
    // Invalidate cache
    cache.clear();
    
    return mapProperty(result[0]);
  } catch (error) {
    console.error('API Error createProperty:', error);
    throw new Error('Erreur création propriété');
  }
}

export async function updateProperty(id: number, property: Partial<Property>): Promise<Property> {
  try {
    // First get the current property
    const currentResult = await database`SELECT * FROM properties WHERE id = ${id}`;
    
    if (currentResult.length === 0) {
      throw new Error('Propriété non trouvée');
    }

    // Merge with current values
    const current = currentResult[0];
    const updated = {
      title: property.title ?? current.title,
      price: property.price ?? current.price,
      price_label: property.priceLabel ?? current.price_label,
      location: property.location ?? current.location,
      zone: property.zone ?? current.zone,
      surface: property.surface ?? current.surface,
      surface_label: property.surfaceLabel ?? current.surface_label,
      bedrooms: property.bedrooms ?? current.bedrooms,
      bathrooms: property.bathrooms ?? current.bathrooms,
      type: property.type ?? current.type,
      category: property.category ?? current.category,
      img: property.img ?? current.img,
      badge: property.badge ?? current.badge,
      featured: property.featured ?? current.featured,
      description: property.description ?? current.description,
      description_full: property.descriptionFull ?? current.description_full,
      features: property.features ? JSON.stringify(property.features) : (typeof current.features === 'string' ? current.features : JSON.stringify(current.features || [])),
      images: property.images ? JSON.stringify(property.images) : (typeof current.images === 'string' ? current.images : JSON.stringify(current.images || [])),
      year_built: property.yearBuilt ?? current.year_built,
      parking: property.parking ?? current.parking,
      floor: property.floor ?? current.floor,
      available_from: property.availableFrom ?? current.available_from,
    };

    // Update using template literal
    const result = await database`
      UPDATE properties SET
        title = ${updated.title},
        price = ${updated.price},
        price_label = ${updated.price_label},
        location = ${updated.location},
        zone = ${updated.zone},
        surface = ${updated.surface},
        surface_label = ${updated.surface_label},
        bedrooms = ${updated.bedrooms},
        bathrooms = ${updated.bathrooms},
        type = ${updated.type},
        category = ${updated.category},
        img = ${updated.img},
        badge = ${updated.badge},
        featured = ${updated.featured},
        description = ${updated.description},
        description_full = ${updated.description_full},
        features = ${updated.features},
        images = ${updated.images},
        year_built = ${updated.year_built},
        parking = ${updated.parking},
        floor = ${updated.floor},
        available_from = ${updated.available_from},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;
    
    // Invalidate cache
    cache.clear();
    
    return mapProperty(result[0]);
  } catch (error) {
    console.error('API Error updateProperty:', error);
    throw new Error('Erreur mise à jour propriété');
  }
}

export async function deleteProperty(id: number): Promise<void> {
  try {
    await database`DELETE FROM properties WHERE id = ${id}`;
    
    // Invalidate cache
    cache.clear();
  } catch (error) {
    console.error('API Error deleteProperty:', error);
    throw new Error('Erreur suppression propriété');
  }
}

// Fonction pour vider le cache (utilisée lors des mises à jour)
export function clearCache(): void {
  cache.clear();
}

export const categories = ['Tous', 'Appartement', 'Villa', 'Maison', 'Studio', 'Bureau', 'Penthouse', 'Duplex'];
export const zones = ['Toutes', 'Almadies', 'Plateau', 'Corniche', 'Fann', 'Mermoz', 'Liberté', 'Ouakam', 'Point E'];
