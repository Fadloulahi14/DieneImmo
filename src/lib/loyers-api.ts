import { neon } from '@neondatabase/serverless';

const sql = neon(
  `postgresql://${import.meta.env.VITE_PGUSER || 'neondb_owner'}:${import.meta.env.VITE_PGPASSWORD || 'npg_LipQ3Bkv8Otm'}@${import.meta.env.VITE_PGHOST || 'ep-odd-rice-amoakyt7-pooler.c-5.us-east-1.aws.neon.tech'}/${import.meta.env.VITE_PGDATABASE || 'neondb'}?sslmode=require`
);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Building {
  id: number;
  name: string;
  address?: string;
  active: boolean;
  createdAt: string;
}

export interface Tenant {
  id: number;
  buildingId: number;
  buildingName?: string;
  name: string;
  unit?: string;
  baseRent: number;
  status: 'actif' | 'inactif' | 'exonere';
  phone?: string;
  startDate?: string;
  notes?: string;
  createdAt: string;
}

export interface RentPayment {
  id: number;
  tenantId: number;
  tenantName?: string;
  buildingId?: number;
  buildingName?: string;
  periodMonth: number;
  periodYear: number;
  loyerDu: number;
  arrieres: number;
  montantPaye: number;
  datePaiement?: string;
  modePaiement?: string;
  statut: 'paye' | 'impaye' | 'exonere' | 'partiel';
  observations?: string;
  justificatifUrl?: string;
  solde: number;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  id: number;
  buildingId?: number;
  buildingName?: string;
  mois?: number;
  annee?: number;
  dateDepense?: string;
  designation: string;
  categorie?: string;
  prestataire?: string;
  montant: number;
  justificatifUrl?: string;
  observations?: string;
  createdAt: string;
}

export interface BuildingSummary {
  buildingId: number;
  buildingName: string;
  masseLoc: number;
  arrieres: number;
  encaisse: number;
  impayes: number;
  tauxRecouvrement: number;
  netAVerser: number;
}

// ─── Mappers ─────────────────────────────────────────────────────────────────

function mapBuilding(r: any): Building {
  return { id: r.id, name: r.name, address: r.address, active: r.active, createdAt: r.created_at };
}

function mapTenant(r: any): Tenant {
  return {
    id: r.id, buildingId: r.building_id, buildingName: r.building_name,
    name: r.name, unit: r.unit, baseRent: Number(r.base_rent),
    status: r.status, phone: r.phone, startDate: r.start_date,
    notes: r.notes, createdAt: r.created_at,
  };
}

function mapPayment(r: any): RentPayment {
  const loyerDu   = Number(r.loyer_du   || 0);
  const arrieres  = Number(r.arrieres   || 0);
  const paye      = Number(r.montant_paye || 0);
  return {
    id: r.id, tenantId: r.tenant_id, tenantName: r.tenant_name,
    buildingId: r.building_id, buildingName: r.building_name,
    periodMonth: r.period_month, periodYear: r.period_year,
    loyerDu, arrieres, montantPaye: paye,
    datePaiement: r.date_paiement,
    modePaiement: r.mode_paiement,
    statut: r.statut,
    observations: r.observations,
    justificatifUrl: r.justificatif_url,
    solde: loyerDu + arrieres - paye,
    createdAt: r.created_at, updatedAt: r.updated_at,
  };
}

function mapExpense(r: any): Expense {
  return {
    id: r.id, buildingId: r.building_id, buildingName: r.building_name,
    mois: r.mois, annee: r.annee, dateDepense: r.date_depense,
    designation: r.designation, categorie: r.categorie,
    prestataire: r.prestataire, montant: Number(r.montant),
    justificatifUrl: r.justificatif_url, observations: r.observations,
    createdAt: r.created_at,
  };
}

// ─── Buildings ────────────────────────────────────────────────────────────────

export async function getBuildings(): Promise<Building[]> {
  const rows = await sql`SELECT * FROM buildings WHERE active = true ORDER BY name`;
  return rows.map(mapBuilding);
}

export async function createBuilding(name: string, address?: string): Promise<Building> {
  const [r] = await sql`INSERT INTO buildings (name, address) VALUES (${name}, ${address ?? null}) RETURNING *`;
  return mapBuilding(r);
}

export async function updateBuilding(id: number, name: string, address?: string): Promise<Building> {
  const [r] = await sql`UPDATE buildings SET name=${name}, address=${address ?? null} WHERE id=${id} RETURNING *`;
  return mapBuilding(r);
}

export async function deleteBuilding(id: number): Promise<void> {
  await sql`UPDATE buildings SET active=false WHERE id=${id}`;
}

// ─── Tenants ──────────────────────────────────────────────────────────────────

export async function getTenants(buildingId?: number): Promise<Tenant[]> {
  if (buildingId) {
    const rows = await sql`
      SELECT t.*, b.name as building_name FROM tenants t
      JOIN buildings b ON b.id = t.building_id
      WHERE t.building_id = ${buildingId} ORDER BY t.name`;
    return rows.map(mapTenant);
  }
  const rows = await sql`
    SELECT t.*, b.name as building_name FROM tenants t
    JOIN buildings b ON b.id = t.building_id
    ORDER BY b.name, t.name`;
  return rows.map(mapTenant);
}

export async function createTenant(data: {
  buildingId: number; name: string; unit?: string;
  baseRent: number; status: string; phone?: string; startDate?: string; notes?: string;
}): Promise<Tenant> {
  const [r] = await sql`
    INSERT INTO tenants (building_id, name, unit, base_rent, status, phone, start_date, notes)
    VALUES (${data.buildingId}, ${data.name}, ${data.unit ?? null}, ${data.baseRent},
            ${data.status}, ${data.phone ?? null}, ${data.startDate ?? null}, ${data.notes ?? null})
    RETURNING *`;
  return mapTenant(r);
}

export async function updateTenant(id: number, data: Partial<{
  name: string; unit: string; baseRent: number; status: string;
  phone: string; notes: string; buildingId: number;
}>): Promise<Tenant> {
  const cur = await sql`SELECT * FROM tenants WHERE id=${id}`;
  const c = cur[0];
  const [r] = await sql`
    UPDATE tenants SET
      building_id = ${data.buildingId ?? c.building_id},
      name        = ${data.name ?? c.name},
      unit        = ${data.unit ?? c.unit},
      base_rent   = ${data.baseRent ?? c.base_rent},
      status      = ${data.status ?? c.status},
      phone       = ${data.phone ?? c.phone},
      notes       = ${data.notes ?? c.notes}
    WHERE id=${id} RETURNING *`;
  return mapTenant(r);
}

export async function deleteTenant(id: number): Promise<void> {
  await sql`DELETE FROM tenants WHERE id=${id}`;
}

// ─── Rent Payments ────────────────────────────────────────────────────────────

export async function getRentPayments(month: number, year: number): Promise<RentPayment[]> {
  const rows = await sql`
    SELECT rp.*, t.name as tenant_name, t.building_id,
           b.name as building_name
    FROM rent_payments rp
    JOIN tenants t ON t.id = rp.tenant_id
    JOIN buildings b ON b.id = t.building_id
    WHERE rp.period_month = ${month} AND rp.period_year = ${year}
    ORDER BY b.name, t.name`;
  return rows.map(mapPayment);
}

export async function generatePeriod(month: number, year: number): Promise<number> {
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear  = month === 1 ? year - 1 : year;

  const tenants = await sql`SELECT * FROM tenants WHERE status != 'inactif'`;
  let created = 0;

  for (const t of tenants) {
    // Arriérés = solde du mois précédent
    const prev = await sql`
      SELECT loyer_du, arrieres, montant_paye FROM rent_payments
      WHERE tenant_id=${t.id} AND period_month=${prevMonth} AND period_year=${prevYear}`;

    const arrieres = prev.length > 0
      ? Math.max(0, Number(prev[0].loyer_du) + Number(prev[0].arrieres) - Number(prev[0].montant_paye))
      : 0;

    const statutInit = t.status === 'exonere' ? 'exonere' : 'impaye';
    const loyerDu    = t.status === 'exonere' ? 0 : Number(t.base_rent);

    await sql`
      INSERT INTO rent_payments (tenant_id, period_month, period_year, loyer_du, arrieres, statut)
      VALUES (${t.id}, ${month}, ${year}, ${loyerDu}, ${arrieres}, ${statutInit})
      ON CONFLICT (tenant_id, period_month, period_year) DO NOTHING`;
    created++;
  }
  return created;
}

export async function upsertRentPayment(data: {
  tenantId: number; periodMonth: number; periodYear: number;
  loyerDu?: number; arrieres?: number; montantPaye?: number;
  datePaiement?: string; modePaiement?: string;
  statut?: string; observations?: string; justificatifUrl?: string;
}): Promise<RentPayment> {
  const [r] = await sql`
    INSERT INTO rent_payments
      (tenant_id, period_month, period_year, loyer_du, arrieres, montant_paye,
       date_paiement, mode_paiement, statut, observations, justificatif_url)
    VALUES
      (${data.tenantId}, ${data.periodMonth}, ${data.periodYear},
       ${data.loyerDu ?? 0}, ${data.arrieres ?? 0}, ${data.montantPaye ?? 0},
       ${data.datePaiement ?? null}, ${data.modePaiement ?? null},
       ${data.statut ?? 'impaye'}, ${data.observations ?? null},
       ${data.justificatifUrl ?? null})
    ON CONFLICT (tenant_id, period_month, period_year) DO UPDATE SET
      loyer_du         = EXCLUDED.loyer_du,
      arrieres         = EXCLUDED.arrieres,
      montant_paye     = EXCLUDED.montant_paye,
      date_paiement    = EXCLUDED.date_paiement,
      mode_paiement    = EXCLUDED.mode_paiement,
      statut           = EXCLUDED.statut,
      observations     = EXCLUDED.observations,
      justificatif_url = EXCLUDED.justificatif_url,
      updated_at       = NOW()
    RETURNING *`;
  return mapPayment(r);
}

// ─── Expenses ─────────────────────────────────────────────────────────────────

export async function getExpenses(month: number, year: number): Promise<Expense[]> {
  const rows = await sql`
    SELECT e.*, b.name as building_name FROM expenses e
    LEFT JOIN buildings b ON b.id = e.building_id
    WHERE e.mois = ${month} AND e.annee = ${year}
    ORDER BY e.date_depense`;
  return rows.map(mapExpense);
}

export async function createExpense(data: {
  buildingId?: number; mois: number; annee: number; dateDepense?: string;
  designation: string; categorie?: string; prestataire?: string;
  montant: number; observations?: string; justificatifUrl?: string;
}): Promise<Expense> {
  const [r] = await sql`
    INSERT INTO expenses
      (building_id, mois, annee, date_depense, designation, categorie,
       prestataire, montant, observations, justificatif_url)
    VALUES
      (${data.buildingId ?? null}, ${data.mois}, ${data.annee},
       ${data.dateDepense ?? null}, ${data.designation},
       ${data.categorie ?? null}, ${data.prestataire ?? null},
       ${data.montant}, ${data.observations ?? null},
       ${data.justificatifUrl ?? null})
    RETURNING *`;
  return mapExpense(r);
}

export async function updateExpense(id: number, data: Partial<Omit<Expense, 'id' | 'createdAt'>>): Promise<Expense> {
  const cur = await sql`SELECT * FROM expenses WHERE id=${id}`;
  const c = cur[0];
  const [r] = await sql`
    UPDATE expenses SET
      building_id      = ${data.buildingId ?? c.building_id},
      mois             = ${data.mois ?? c.mois},
      annee            = ${data.annee ?? c.annee},
      date_depense     = ${data.dateDepense ?? c.date_depense},
      designation      = ${data.designation ?? c.designation},
      categorie        = ${data.categorie ?? c.categorie},
      prestataire      = ${data.prestataire ?? c.prestataire},
      montant          = ${data.montant ?? c.montant},
      observations     = ${data.observations ?? c.observations},
      justificatif_url = ${data.justificatifUrl ?? c.justificatif_url}
    WHERE id=${id} RETURNING *`;
  return mapExpense(r);
}

export async function deleteExpense(id: number): Promise<void> {
  await sql`DELETE FROM expenses WHERE id=${id}`;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function computeSummary(payments: RentPayment[]): BuildingSummary[] {
  const map = new Map<number, BuildingSummary>();
  for (const p of payments) {
    if (!p.buildingId || !p.buildingName) continue;
    if (!map.has(p.buildingId)) {
      map.set(p.buildingId, {
        buildingId: p.buildingId, buildingName: p.buildingName,
        masseLoc: 0, arrieres: 0, encaisse: 0, impayes: 0,
        tauxRecouvrement: 0, netAVerser: 0,
      });
    }
    const s = map.get(p.buildingId)!;
    if (p.statut !== 'exonere') {
      s.masseLoc += p.loyerDu;
      s.arrieres += p.arrieres;
      s.encaisse += p.montantPaye;
      if (p.solde > 0) s.impayes += p.solde;
    }
  }
  for (const s of map.values()) {
    const total = s.masseLoc + s.arrieres;
    s.tauxRecouvrement = total > 0 ? Math.round((s.encaisse / total) * 1000) / 10 : 0;
    s.netAVerser = Math.round(s.encaisse * 0.91);
  }
  return Array.from(map.values()).sort((a, b) => a.buildingName.localeCompare(b.buildingName));
}

export const MONTHS_FR = [
  'Janvier','Février','Mars','Avril','Mai','Juin',
  'Juillet','Août','Septembre','Octobre','Novembre','Décembre',
];

export const MODES_PAIEMENT = ['Wave','Orange Money','Free Money','Wari','Cash','Chèque','Virement','Autre'];
export const CATEGORIES_DEPENSES = ['Entretien','Réparation','Nettoyage','Gardiennage','Eau','Électricité','Taxe','Autre'];
