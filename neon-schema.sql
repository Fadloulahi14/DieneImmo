-- Neon Database Schema for Real Estate Agency
-- Execute this file in the Neon SQL Console first

CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price BIGINT NOT NULL,
  price_label VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  zone VARCHAR(100) NOT NULL,
  surface INTEGER NOT NULL,
  surface_label VARCHAR(50) NOT NULL,
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 1,
  type VARCHAR(20) CHECK (type IN ('Vente', 'Location')) NOT NULL,
  category VARCHAR(100) NOT NULL,
  img TEXT NOT NULL,
  badge VARCHAR(50),
  featured BOOLEAN DEFAULT false,
  description TEXT,
  description_full TEXT,
  features JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  year_built INTEGER,
  parking INTEGER DEFAULT 0,
  floor INTEGER,
  available_from VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for common queries
CREATE INDEX IF NOT EXISTS idx_properties_zone ON properties(zone);
CREATE INDEX IF NOT EXISTS idx_properties_category ON properties(category);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
