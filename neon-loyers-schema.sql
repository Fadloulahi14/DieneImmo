-- ═══════════════════════════════════════════════════════════════
-- DIENE IMMOBILIER — Suivi Loyers & Gestion Locative
-- À exécuter dans la console SQL Neon
-- ═══════════════════════════════════════════════════════════════

-- Immeubles
CREATE TABLE IF NOT EXISTS buildings (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  address     TEXT,
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Locataires
CREATE TABLE IF NOT EXISTS tenants (
  id          SERIAL PRIMARY KEY,
  building_id INTEGER REFERENCES buildings(id) ON DELETE CASCADE,
  name        VARCHAR(255) NOT NULL,
  unit        VARCHAR(100),
  base_rent   BIGINT NOT NULL DEFAULT 0,
  status      VARCHAR(20) DEFAULT 'actif'
                CHECK (status IN ('actif', 'inactif', 'exonere')),
  phone       VARCHAR(50),
  start_date  DATE,
  notes       TEXT,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Paiements de loyers mensuels
CREATE TABLE IF NOT EXISTS rent_payments (
  id              SERIAL PRIMARY KEY,
  tenant_id       INTEGER REFERENCES tenants(id) ON DELETE CASCADE,
  period_month    INTEGER NOT NULL CHECK (period_month BETWEEN 1 AND 12),
  period_year     INTEGER NOT NULL,
  loyer_du        BIGINT DEFAULT 0,
  arrieres        BIGINT DEFAULT 0,
  montant_paye    BIGINT DEFAULT 0,
  date_paiement   DATE,
  mode_paiement   VARCHAR(50),
  statut          VARCHAR(20) DEFAULT 'impaye'
                    CHECK (statut IN ('paye', 'impaye', 'exonere', 'partiel')),
  observations    TEXT,
  justificatif_url TEXT,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW(),
  UNIQUE (tenant_id, period_month, period_year)
);

-- Dépenses
CREATE TABLE IF NOT EXISTS expenses (
  id              SERIAL PRIMARY KEY,
  building_id     INTEGER REFERENCES buildings(id) ON DELETE SET NULL,
  mois            INTEGER CHECK (mois BETWEEN 1 AND 12),
  annee           INTEGER,
  date_depense    DATE,
  designation     VARCHAR(255) NOT NULL,
  categorie       VARCHAR(100),
  prestataire     VARCHAR(255),
  montant         BIGINT NOT NULL DEFAULT 0,
  justificatif_url TEXT,
  observations    TEXT,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_tenants_building   ON tenants(building_id);
CREATE INDEX IF NOT EXISTS idx_payments_tenant    ON rent_payments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_payments_period    ON rent_payments(period_year, period_month);
CREATE INDEX IF NOT EXISTS idx_expenses_period    ON expenses(annee, mois);

-- ═══════════════════════════════════════════════════════════════
-- Données initiales : Immeubles
-- ═══════════════════════════════════════════════════════════════
INSERT INTO buildings (name) VALUES
  ('IMM FASS'),
  ('IMM RUE 62 GT'),
  ('IMM RUE 65 GT'),
  ('TOUBA FANN'),
  ('ITECOM'),
  ('PA U8 VILLA 144'),
  ('GOLF SUD RUE GS112'),
  ('HLM GT VILLA 136'),
  ('VILLA VDN 3 EXT'),
  ('RUE 6X25 MEDINA'),
  ('RUE 26X27 MEDINA')
ON CONFLICT DO NOTHING;
