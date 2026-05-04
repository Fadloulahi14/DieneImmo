-- Table pour les demandes de vente/location des utilisateurs
-- Exécuter dans la console SQL de Neon après neon-schema.sql

CREATE TABLE IF NOT EXISTS property_leads (
  id SERIAL PRIMARY KEY,

  -- Coordonnées du propriétaire
  name        VARCHAR(255) NOT NULL,
  phone       VARCHAR(50)  NOT NULL,
  email       VARCHAR(255),
  whatsapp    VARCHAR(50),

  -- Informations sur le bien
  type              VARCHAR(20) DEFAULT 'Vente' CHECK (type IN ('Vente', 'Location')),
  category          VARCHAR(100),
  location          VARCHAR(255),
  zone              VARCHAR(100),
  surface           INTEGER,
  bedrooms          INTEGER DEFAULT 0,
  bathrooms         INTEGER DEFAULT 1,
  parking           INTEGER DEFAULT 0,
  floor             INTEGER,
  price_expectation BIGINT,
  description       TEXT,
  images            JSONB DEFAULT '[]',

  -- Gestion admin
  status      VARCHAR(20) DEFAULT 'nouveau'
                CHECK (status IN ('nouveau', 'en_cours', 'traite', 'rejete')),
  admin_notes TEXT,
  converted_property_id INTEGER REFERENCES properties(id) ON DELETE SET NULL,

  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_status   ON property_leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created  ON property_leads(created_at DESC);
