-- Table des demandes de rendez-vous investisseur
-- À exécuter dans la console SQL de Neon

CREATE TABLE IF NOT EXISTS investor_rdv (
  id         SERIAL PRIMARY KEY,
  nom        TEXT NOT NULL,
  telephone  TEXT NOT NULL,
  email      TEXT NOT NULL,
  budget     TEXT NOT NULL,
  package    TEXT NOT NULL,
  message    TEXT,
  statut     TEXT NOT NULL DEFAULT 'nouvelle',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_investor_rdv_statut  ON investor_rdv(statut);
CREATE INDEX IF NOT EXISTS idx_investor_rdv_created ON investor_rdv(created_at DESC);
