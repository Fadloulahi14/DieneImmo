import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2, Users, ChevronDown, ChevronUp, Plus, Trash2,
  Download, RefreshCw, CheckCircle, AlertCircle, Clock,
  FileText, Edit2, Save, X, Loader2, BarChart3,
  Receipt, TrendingDown, TrendingUp, Wallet, Upload,
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import {
  getBuildings, getTenants, getRentPayments, getExpenses,
  generatePeriod, upsertRentPayment, createTenant, updateTenant,
  deleteTenant, createBuilding, deleteBuilding, createExpense,
  deleteExpense, computeSummary,
  MONTHS_FR, MODES_PAIEMENT, CATEGORIES_DEPENSES,
  type Building, type Tenant, type RentPayment, type Expense, type BuildingSummary,
} from '../../../lib/loyers-api';
import { uploadToImgBB } from '../../../lib/imgbb';

// ─── Formatters ───────────────────────────────────────────────────────────────

const fc = (n: number) => n.toLocaleString('fr-FR') + ' F';
const pct = (n: number) => n.toFixed(1) + '%';

// ─── Statut cell ──────────────────────────────────────────────────────────────

const STATUT_CFG = {
  paye:    { label: 'Payé',    bg: 'bg-green-50',  text: 'text-green-700',  icon: CheckCircle,  row: 'bg-green-50/40' },
  impaye:  { label: 'Impayé', bg: 'bg-red-50',    text: 'text-red-600',    icon: AlertCircle,  row: 'bg-red-50/40' },
  exonere: { label: 'Exonéré', bg: 'bg-yellow-50', text: 'text-yellow-700', icon: Clock,        row: 'bg-yellow-50/40' },
  partiel: { label: 'Partiel', bg: 'bg-orange-50', text: 'text-orange-600', icon: TrendingUp,   row: 'bg-orange-50/40' },
};

// ─── Mini input ───────────────────────────────────────────────────────────────

function Cell({ value, onChange, type = 'text', className = '' }: {
  value: string; onChange: (v: string) => void; type?: string; className?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ fontFamily: 'Poppins, sans-serif' }}
      className={`w-full px-2 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D30000]/40 focus:border-[#D30000] bg-white ${className}`}
    />
  );
}

// ─── Modal Building ───────────────────────────────────────────────────────────

function BuildingModal({ onClose, onSave }: { onClose: () => void; onSave: (name: string, address: string) => void }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Nouvel immeuble</h3>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block" style={{ fontFamily: 'Poppins, sans-serif' }}>Nom *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: IMM FASS"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000]"
              style={{ fontFamily: 'Poppins, sans-serif' }} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block" style={{ fontFamily: 'Poppins, sans-serif' }}>Adresse</label>
            <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Quartier, rue..."
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000]"
              style={{ fontFamily: 'Poppins, sans-serif' }} />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>Annuler</button>
            <button onClick={() => { if (name.trim()) onSave(name.trim(), address.trim()); }}
              className="flex-1 px-4 py-2.5 bg-[#D30000] text-white rounded-xl text-sm font-semibold hover:bg-[#b00000]" style={{ fontFamily: 'Poppins, sans-serif' }}>Ajouter</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Modal Tenant ─────────────────────────────────────────────────────────────

function TenantModal({ buildings, tenant, onClose, onSave }: {
  buildings: Building[]; tenant?: Tenant;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState({
    buildingId: tenant?.buildingId?.toString() || (buildings[0]?.id?.toString() || ''),
    name: tenant?.name || '',
    unit: tenant?.unit || '',
    baseRent: tenant?.baseRent?.toString() || '0',
    status: tenant?.status || 'actif',
    phone: tenant?.phone || '',
    notes: tenant?.notes || '',
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{tenant ? 'Modifier locataire' : 'Nouveau locataire'}</h3>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Immeuble *', key: 'buildingId', type: 'select', opts: buildings.map(b => ({ v: b.id.toString(), l: b.name })) },
            { label: 'Statut', key: 'status', type: 'select', opts: [{ v: 'actif', l: 'Actif' }, { v: 'exonere', l: 'Exonéré' }, { v: 'inactif', l: 'Inactif' }] },
            { label: 'Nom *', key: 'name', type: 'text', col: 2 },
            { label: 'Appartement / Unité', key: 'unit', type: 'text' },
            { label: 'Loyer de base (F)', key: 'baseRent', type: 'number' },
            { label: 'Téléphone', key: 'phone', type: 'tel' },
          ].map(({ label, key, type, opts, col }: any) => (
            <div key={key} className={col === 2 ? 'col-span-2' : ''}>
              <label className="text-xs font-medium text-gray-600 mb-1 block" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</label>
              {type === 'select' ? (
                <select value={(form as any)[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {opts.map((o: any) => <option key={o.v} value={o.v}>{o.l}</option>)}
                </select>
              ) : (
                <input type={type} value={(form as any)[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000]"
                  style={{ fontFamily: 'Poppins, sans-serif' }} />
              )}
            </div>
          ))}
          <div className="col-span-2">
            <label className="text-xs font-medium text-gray-600 mb-1 block" style={{ fontFamily: 'Poppins, sans-serif' }}>Notes</label>
            <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] resize-none"
              style={{ fontFamily: 'Poppins, sans-serif' }} />
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>Annuler</button>
          <button onClick={() => { if (form.name.trim()) onSave({ ...form, buildingId: Number(form.buildingId), baseRent: Number(form.baseRent) }); }}
            className="flex-1 px-4 py-2.5 bg-[#D30000] text-white rounded-xl text-sm font-semibold hover:bg-[#b00000]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {tenant ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Expense Row ──────────────────────────────────────────────────────────────

function ExpenseRow({ expense, buildings, onDelete }: {
  expense: Expense; buildings: Building[]; onDelete: (id: number) => void;
}) {
  return (
    <tr className="hover:bg-gray-50 border-b border-gray-100">
      <td className="px-3 py-2 text-xs text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>{expense.buildingName || '—'}</td>
      <td className="px-3 py-2 text-xs text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>{expense.dateDepense || '—'}</td>
      <td className="px-3 py-2 text-xs font-medium text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>{expense.designation}</td>
      <td className="px-3 py-2 text-xs text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>{expense.categorie || '—'}</td>
      <td className="px-3 py-2 text-xs text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>{expense.prestataire || '—'}</td>
      <td className="px-3 py-2 text-xs font-semibold text-right text-[#D30000]" style={{ fontFamily: 'Poppins, sans-serif' }}>{fc(expense.montant)}</td>
      <td className="px-3 py-2 text-xs text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>{expense.observations || '—'}</td>
      <td className="px-3 py-2 text-center">
        {expense.justificatifUrl && (
          <a href={expense.justificatifUrl} target="_blank" rel="noreferrer" className="text-[#0273A7] hover:underline text-xs mr-2">Voir</a>
        )}
        <button onClick={() => onDelete(expense.id)} className="text-red-400 hover:text-red-600"><Trash2 size={13} /></button>
      </td>
    </tr>
  );
}

// ─── Payment Row ──────────────────────────────────────────────────────────────

function PaymentRow({ payment, num, onSave }: {
  payment: RentPayment; num: number;
  onSave: (p: RentPayment, changes: Partial<RentPayment>) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [d, setD] = useState({
    loyerDu:     payment.loyerDu.toString(),
    arrieres:    payment.arrieres.toString(),
    montantPaye: payment.montantPaye.toString(),
    datePaiement: payment.datePaiement || '',
    modePaiement: payment.modePaiement || '',
    statut:      payment.statut,
    observations: payment.observations || '',
  });
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const cfg = STATUT_CFG[d.statut as keyof typeof STATUT_CFG] || STATUT_CFG.impaye;
  const solde = Number(d.loyerDu) + Number(d.arrieres) - Number(d.montantPaye);

  const handleSave = async () => {
    setSaving(true);
    await onSave(payment, {
      loyerDu: Number(d.loyerDu), arrieres: Number(d.arrieres),
      montantPaye: Number(d.montantPaye),
      datePaiement: d.datePaiement || undefined,
      modePaiement: d.modePaiement || undefined,
      statut: d.statut as any,
      observations: d.observations || undefined,
    });
    setSaving(false);
    setEditing(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    try {
      const url = await uploadToImgBB(f);
      await onSave(payment, { justificatifUrl: url });
    } finally { setUploading(false); e.target.value = ''; }
  };

  return (
    <tr className={`border-b border-gray-100 ${cfg.row} transition-colors`}>
      <td className="px-2 py-2 text-xs text-center text-gray-400 font-medium">{num}</td>
      <td className="px-3 py-2 text-xs font-semibold text-gray-800 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>{payment.tenantName}</td>

      {editing ? (
        <>
          <td className="px-2 py-1"><Cell type="number" value={d.loyerDu} onChange={v => setD(p => ({ ...p, loyerDu: v }))} className="w-24" /></td>
          <td className="px-2 py-1"><Cell type="number" value={d.arrieres} onChange={v => setD(p => ({ ...p, arrieres: v }))} className="w-24" /></td>
          <td className="px-2 py-1"><Cell type="number" value={d.montantPaye} onChange={v => setD(p => ({ ...p, montantPaye: v }))} className="w-24" /></td>
          <td className="px-2 py-1"><Cell type="date" value={d.datePaiement} onChange={v => setD(p => ({ ...p, datePaiement: v }))} className="w-32" /></td>
          <td className="px-2 py-1">
            <select value={d.modePaiement} onChange={e => setD(p => ({ ...p, modePaiement: e.target.value }))}
              className="w-full px-2 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D30000]/40"
              style={{ fontFamily: 'Poppins, sans-serif' }}>
              <option value="">—</option>
              {MODES_PAIEMENT.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </td>
          <td className="px-2 py-1">
            <select value={d.statut} onChange={e => setD(p => ({ ...p, statut: e.target.value }))}
              className="w-full px-2 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D30000]/40"
              style={{ fontFamily: 'Poppins, sans-serif' }}>
              <option value="paye">Payé</option>
              <option value="impaye">Impayé</option>
              <option value="partiel">Partiel</option>
              <option value="exonere">Exonéré</option>
            </select>
          </td>
          <td className="px-2 py-1 text-xs font-bold text-right" style={{ color: solde > 0 ? '#D30000' : '#16a34a', fontFamily: 'Poppins, sans-serif' }}>
            {fc(Math.max(0, solde))}
          </td>
          <td className="px-2 py-1"><Cell value={d.observations} onChange={v => setD(p => ({ ...p, observations: v }))} className="w-28" /></td>
          <td className="px-2 py-2 text-center">
            <div className="flex items-center gap-1">
              <button onClick={handleSave} disabled={saving} className="p-1 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-50">
                {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
              </button>
              <button onClick={() => setEditing(false)} className="p-1 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300"><X size={13} /></button>
            </div>
          </td>
        </>
      ) : (
        <>
          <td className="px-3 py-2 text-xs text-right text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>{payment.loyerDu ? fc(payment.loyerDu) : '—'}</td>
          <td className="px-3 py-2 text-xs text-right" style={{ color: payment.arrieres > 0 ? '#D30000' : '#6b7280', fontFamily: 'Poppins, sans-serif' }}>{payment.arrieres ? fc(payment.arrieres) : '—'}</td>
          <td className="px-3 py-2 text-xs text-right text-green-700 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>{payment.montantPaye ? fc(payment.montantPaye) : '—'}</td>
          <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>{payment.datePaiement || '—'}</td>
          <td className="px-3 py-2 text-xs text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>{payment.modePaiement || '—'}</td>
          <td className="px-3 py-2">
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              {cfg.label}
            </span>
          </td>
          <td className="px-3 py-2 text-xs font-bold text-right" style={{ color: payment.solde > 0 ? '#D30000' : '#16a34a', fontFamily: 'Poppins, sans-serif' }}>
            {payment.solde > 0 ? fc(payment.solde) : '0'}
          </td>
          <td className="px-3 py-2 text-xs text-gray-500 max-w-[120px] truncate" title={payment.observations} style={{ fontFamily: 'Poppins, sans-serif' }}>{payment.observations || '—'}</td>
          <td className="px-2 py-2 text-center">
            <div className="flex items-center gap-1 justify-center">
              <button onClick={() => setEditing(true)} className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"><Edit2 size={13} /></button>
              <input ref={fileRef} type="file" accept="image/*,.pdf" onChange={handleUpload} className="hidden" />
              <button onClick={() => fileRef.current?.click()} disabled={uploading} title="Joindre justificatif"
                className="p-1 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-500 disabled:opacity-40">
                {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
              </button>
              {payment.justificatifUrl && (
                <a href={payment.justificatifUrl} target="_blank" rel="noreferrer" title="Voir justificatif"
                  className="p-1 rounded-lg text-[#0273A7] hover:bg-blue-50"><FileText size={13} /></a>
              )}
            </div>
          </td>
        </>
      )}
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function LoyersManagement() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear]   = useState(now.getFullYear());
  const [tab, setTab]     = useState<'dashboard' | 'loyers' | 'depenses' | 'gestion'>('dashboard');

  const [buildings, setBuildings]   = useState<Building[]>([]);
  const [tenants, setTenants]       = useState<Tenant[]>([]);
  const [payments, setPayments]     = useState<RentPayment[]>([]);
  const [expenses, setExpenses]     = useState<Expense[]>([]);
  const [summary, setSummary]       = useState<BuildingSummary[]>([]);
  const [loading, setLoading]       = useState(false);
  const [generating, setGenerating] = useState(false);
  const [msg, setMsg]               = useState('');

  // Modals
  const [showBuildingModal, setShowBuildingModal] = useState(false);
  const [showTenantModal, setShowTenantModal]     = useState(false);
  const [editTenant, setEditTenant]               = useState<Tenant | undefined>();

  // Expense form
  const [expForm, setExpForm] = useState({
    buildingId: '', designation: '', categorie: '', prestataire: '',
    montant: '', dateDepense: '', observations: '',
  });
  const [addingExp, setAddingExp] = useState(false);
  const expFileRef = useRef<HTMLInputElement>(null);
  const [expUploading, setExpUploading] = useState(false);
  const [expJustif, setExpJustif] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [b, t, p, e] = await Promise.all([
        getBuildings(), getTenants(), getRentPayments(month, year), getExpenses(month, year),
      ]);
      setBuildings(b); setTenants(t); setPayments(p); setExpenses(e);
      setSummary(computeSummary(p));
    } catch (err) {
      setMsg('Erreur de chargement. Vérifiez la connexion DB.');
    } finally { setLoading(false); }
  }, [month, year]);

  useEffect(() => { load(); }, [load]);

  const handleGenerate = async () => {
    if (!confirm(`Générer les entrées pour ${MONTHS_FR[month - 1]} ${year} ?`)) return;
    setGenerating(true);
    try {
      const n = await generatePeriod(month, year);
      setMsg(`${n} entrées générées.`);
      await load();
    } finally { setGenerating(false); setTimeout(() => setMsg(''), 3000); }
  };

  const handlePaymentSave = async (p: RentPayment, changes: Partial<RentPayment>) => {
    await upsertRentPayment({
      tenantId:     p.tenantId,
      periodMonth:  p.periodMonth,
      periodYear:   p.periodYear,
      loyerDu:      changes.loyerDu      ?? p.loyerDu,
      arrieres:     changes.arrieres     ?? p.arrieres,
      montantPaye:  changes.montantPaye  ?? p.montantPaye,
      datePaiement: changes.datePaiement ?? p.datePaiement,
      modePaiement: changes.modePaiement ?? p.modePaiement,
      statut:       changes.statut       ?? p.statut,
      observations: changes.observations ?? p.observations,
      justificatifUrl: changes.justificatifUrl ?? p.justificatifUrl,
    });
    await load();
  };

  const handleAddExpense = async () => {
    if (!expForm.designation.trim() || !expForm.montant) return;
    setAddingExp(true);
    try {
      await createExpense({
        buildingId:  expForm.buildingId ? Number(expForm.buildingId) : undefined,
        mois:        month, annee: year,
        dateDepense: expForm.dateDepense || undefined,
        designation: expForm.designation.trim(),
        categorie:   expForm.categorie || undefined,
        prestataire: expForm.prestataire.trim() || undefined,
        montant:     Number(expForm.montant),
        observations: expForm.observations.trim() || undefined,
        justificatifUrl: expJustif || undefined,
      });
      setExpForm({ buildingId: '', designation: '', categorie: '', prestataire: '', montant: '', dateDepense: '', observations: '' });
      setExpJustif('');
      await load();
    } finally { setAddingExp(false); }
  };

  const handleExpUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setExpUploading(true);
    try { setExpJustif(await uploadToImgBB(f)); } finally { setExpUploading(false); e.target.value = ''; }
  };

  // ── PDF generation ────────────────────────────────────────────────────────

  const downloadPDF = async () => {
    const { default: jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const title = `DIENE IMMOBILIER — SUIVI LOYERS ${MONTHS_FR[month - 1].toUpperCase()} ${year}`;

    // Header
    doc.setFillColor(26, 32, 55);
    doc.rect(0, 0, 297, 18, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 148, 11, { align: 'center' });
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('À chacun son toit | Fann Hock, Dakar | +221 78 787 05 81', 148, 16, { align: 'center' });

    // Tableau de bord
    doc.setTextColor(0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('TABLEAU DE BORD SYNTHÈSE', 14, 26);

    autoTable(doc, {
      startY: 29,
      head: [['IMMEUBLE', 'MASSE LOC. (F)', 'ARRIÉRÉS (F)', 'ENCAISSÉ (F)', 'IMPAYÉS (F)', 'TAUX RECOUV.', 'NET À VERSER (F)']],
      body: [
        ...summary.map(s => [
          s.buildingName, fc(s.masseLoc), fc(s.arrieres), fc(s.encaisse),
          fc(s.impayes), pct(s.tauxRecouvrement), fc(s.netAVerser),
        ]),
        ['TOTAL',
          fc(summary.reduce((a, s) => a + s.masseLoc, 0)),
          fc(summary.reduce((a, s) => a + s.arrieres, 0)),
          fc(summary.reduce((a, s) => a + s.encaisse, 0)),
          fc(summary.reduce((a, s) => a + s.impayes, 0)),
          '',
          fc(summary.reduce((a, s) => a + s.netAVerser, 0)),
        ],
      ],
      headStyles: { fillColor: [26, 32, 55], textColor: 255, fontStyle: 'bold', fontSize: 8 },
      bodyStyles: { fontSize: 7.5 },
      columnStyles: { 0: { fontStyle: 'bold' }, 1: { halign: 'right' }, 2: { halign: 'right' }, 3: { halign: 'right', textColor: [22, 163, 74] }, 4: { halign: 'right', textColor: [211, 0, 0] }, 5: { halign: 'right' }, 6: { halign: 'right' } },
      didParseCell: (data: any) => {
        if (data.row.index === summary.length) { data.cell.styles.fontStyle = 'bold'; data.cell.styles.fillColor = [240, 240, 240]; }
      },
    });

    // Suivi détaillé par immeuble
    const grouped = groupPayments(payments);
    let y = (doc as any).lastAutoTable.finalY + 10;

    for (const [bname, rows] of Object.entries(grouped)) {
      if (y > 160) { doc.addPage(); y = 15; }
      doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(26, 32, 55);
      doc.text(`▶ ${bname}`, 14, y); y += 4;

      autoTable(doc, {
        startY: y,
        head: [['#', 'LOCATAIRE', 'LOYER DÛ', 'ARRIÉRÉS', 'PAYÉ', 'DATE', 'MODE', 'STATUT', 'SOLDE', 'OBSERVATIONS']],
        body: (rows as RentPayment[]).map((p, i) => [
          i + 1, p.tenantName || '',
          p.loyerDu ? fc(p.loyerDu) : '—',
          p.arrieres ? fc(p.arrieres) : '—',
          p.montantPaye ? fc(p.montantPaye) : '—',
          p.datePaiement || '—',
          p.modePaiement || '—',
          STATUT_CFG[p.statut]?.label || p.statut,
          p.solde > 0 ? fc(p.solde) : '0',
          p.observations || '',
        ]),
        headStyles: { fillColor: [211, 0, 0], textColor: 255, fontStyle: 'bold', fontSize: 7 },
        bodyStyles: { fontSize: 7 },
        columnStyles: { 2: { halign: 'right' }, 3: { halign: 'right' }, 4: { halign: 'right' }, 8: { halign: 'right' } },
        didParseCell: (data: any) => {
          if (data.section === 'body') {
            const row = rows[data.row.index] as RentPayment;
            if (row?.statut === 'paye')    data.cell.styles.fillColor = [240, 253, 244];
            if (row?.statut === 'impaye')  data.cell.styles.fillColor = [254, 242, 242];
            if (row?.statut === 'exonere') data.cell.styles.fillColor = [254, 252, 232];
          }
        },
        margin: { left: 14, right: 14 },
      });
      y = (doc as any).lastAutoTable.finalY + 6;
    }

    // Dépenses
    if (expenses.length > 0) {
      if (y > 170) { doc.addPage(); y = 15; }
      doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(0);
      doc.text('DÉPENSES', 14, y); y += 4;
      autoTable(doc, {
        startY: y,
        head: [['#', 'IMMEUBLE', 'DATE', 'DÉSIGNATION', 'CATÉGORIE', 'PRESTATAIRE', 'MONTANT (F)', 'OBSERVATIONS']],
        body: [
          ...expenses.map((e, i) => [i + 1, e.buildingName || '—', e.dateDepense || '—', e.designation, e.categorie || '—', e.prestataire || '—', fc(e.montant), e.observations || '']),
          ['', '', '', '', '', 'TOTAL', fc(expenses.reduce((a, e) => a + e.montant, 0)), ''],
        ],
        headStyles: { fillColor: [26, 32, 55], textColor: 255, fontStyle: 'bold', fontSize: 7 },
        bodyStyles: { fontSize: 7 },
        columnStyles: { 6: { halign: 'right' } },
        margin: { left: 14, right: 14 },
      });
    }

    doc.save(`DieneImmo_Loyers_${MONTHS_FR[month - 1]}_${year}.pdf`);
  };

  // ── Group payments by building ─────────────────────────────────────────────

  const groupPayments = (pays: RentPayment[]) => {
    return pays.reduce<Record<string, RentPayment[]>>((acc, p) => {
      const k = p.buildingName || 'Autre';
      if (!acc[k]) acc[k] = [];
      acc[k].push(p);
      return acc;
    }, {});
  };

  const grouped = groupPayments(payments);
  const totalEncaisse  = summary.reduce((a, s) => a + s.encaisse, 0);
  const totalImpayes   = summary.reduce((a, s) => a + s.impayes, 0);
  const totalMasse     = summary.reduce((a, s) => a + s.masseLoc, 0);
  const totalDepenses  = expenses.reduce((a, e) => a + e.montant, 0);

  const years = Array.from({ length: 5 }, (_, i) => now.getFullYear() - 2 + i);

  const headerActions = (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Sélecteur mois/année */}
      <select value={month} onChange={e => setMonth(Number(e.target.value))}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#D30000]/30"
        style={{ fontFamily: 'Poppins, sans-serif' }}>
        {MONTHS_FR.map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
      </select>
      <select value={year} onChange={e => setYear(Number(e.target.value))}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#D30000]/30"
        style={{ fontFamily: 'Poppins, sans-serif' }}>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
      <button onClick={handleGenerate} disabled={generating}
        className="flex items-center gap-1.5 px-3 py-2 bg-[#0273A7] hover:bg-[#025e8a] text-white rounded-lg text-sm font-semibold disabled:opacity-50"
        style={{ fontFamily: 'Poppins, sans-serif' }}>
        {generating ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
        Générer le mois
      </button>
      <button onClick={downloadPDF}
        className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold"
        style={{ fontFamily: 'Poppins, sans-serif' }}>
        <Download size={14} /> Télécharger PDF
      </button>
    </div>
  );

  return (
    <AdminLayout
      title="Suivi Loyers"
      subtitle={`${MONTHS_FR[month - 1]} ${year} — ${payments.length} locataire(s)`}
      actions={headerActions}
    >
      {msg && (
        <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{msg}</div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Masse locative', value: fc(totalMasse),    icon: Wallet,       color: '#0273A7' },
          { label: 'Encaissé',       value: fc(totalEncaisse), icon: TrendingUp,   color: '#16a34a' },
          { label: 'Impayés',        value: fc(totalImpayes),  icon: AlertCircle,  color: '#D30000' },
          { label: 'Dépenses',       value: fc(totalDepenses), icon: TrendingDown, color: '#f59e0b' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                <Icon size={16} style={{ color }} />
              </div>
              <span className="text-xs text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</span>
            </div>
            <p className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
          { key: 'loyers',    label: 'Suivi Loyers',    icon: Receipt },
          { key: 'depenses',  label: 'Dépenses',         icon: TrendingDown },
          { key: 'gestion',   label: 'Gestion',          icon: Users },
        ].map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === key ? 'bg-slate-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            style={{ fontFamily: 'Poppins, sans-serif' }}>
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={32} className="animate-spin text-[#D30000]" />
        </div>
      ) : (
        <>
          {/* ── TAB DASHBOARD ──────────────────────────────────────────────── */}
          {tab === 'dashboard' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <BarChart3 size={16} className="text-[#D30000]" />
                <span className="font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Synthèse par immeuble — {MONTHS_FR[month - 1]} {year}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-800 text-white text-xs">
                      {['IMMEUBLE', 'MASSE LOC. (F)', 'ARRIÉRÉS (F)', 'ENCAISSÉ (F)', 'IMPAYÉS (F)', 'TAUX RECOUV.', 'NET À VERSER (F)'].map(h => (
                        <th key={h} className="px-4 py-3 text-left font-semibold tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {summary.length === 0 ? (
                      <tr><td colSpan={7} className="text-center py-12 text-gray-400 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Aucune donnée. Cliquez sur "Générer le mois" pour créer les entrées.
                      </td></tr>
                    ) : summary.map((s, i) => (
                      <tr key={s.buildingId} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-blue-50/30 transition-colors`}>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>{s.buildingName}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>{fc(s.masseLoc)}</td>
                        <td className="px-4 py-3 text-sm text-right" style={{ color: s.arrieres > 0 ? '#D30000' : '#6b7280', fontFamily: 'Poppins, sans-serif' }}>{fc(s.arrieres)}</td>
                        <td className="px-4 py-3 text-sm text-right font-medium text-green-600" style={{ fontFamily: 'Poppins, sans-serif' }}>{fc(s.encaisse)}</td>
                        <td className="px-4 py-3 text-sm text-right font-medium" style={{ color: s.impayes > 0 ? '#D30000' : '#6b7280', fontFamily: 'Poppins, sans-serif' }}>{fc(s.impayes)}</td>
                        <td className="px-4 py-3 text-sm text-right">
                          <span className={`font-semibold ${s.tauxRecouvrement >= 80 ? 'text-green-600' : s.tauxRecouvrement >= 50 ? 'text-orange-500' : 'text-red-500'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {pct(s.tauxRecouvrement)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{fc(s.netAVerser)}</td>
                      </tr>
                    ))}
                    {summary.length > 0 && (
                      <tr className="bg-slate-900 text-white">
                        <td className="px-4 py-3 text-sm font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>TOTAL {MONTHS_FR[month - 1].toUpperCase()} {year}</td>
                        <td className="px-4 py-3 text-sm text-right font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{fc(totalMasse)}</td>
                        <td className="px-4 py-3 text-sm text-right font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{fc(summary.reduce((a, s) => a + s.arrieres, 0))}</td>
                        <td className="px-4 py-3 text-sm text-right font-bold text-green-300" style={{ fontFamily: 'Poppins, sans-serif' }}>{fc(totalEncaisse)}</td>
                        <td className="px-4 py-3 text-sm text-right font-bold text-red-300" style={{ fontFamily: 'Poppins, sans-serif' }}>{fc(totalImpayes)}</td>
                        <td className="px-4 py-3 text-sm text-right font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {pct(totalMasse > 0 ? Math.round(totalEncaisse / totalMasse * 1000) / 10 : 0)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{fc(summary.reduce((a, s) => a + s.netAVerser, 0))}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 bg-yellow-50 border-t border-yellow-100 text-xs text-yellow-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                ⚠ Honoraires DIENE = 9% (Net = Encaissé × 91%) — Taux calculé automatiquement
              </div>
            </div>
          )}

          {/* ── TAB LOYERS ─────────────────────────────────────────────────── */}
          {tab === 'loyers' && (
            <div className="space-y-6">
              {Object.keys(grouped).length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="text-5xl mb-4">🏠</div>
                  <p className="text-gray-500 font-medium mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Aucune entrée pour ce mois.</p>
                  <button onClick={handleGenerate} disabled={generating}
                    className="flex items-center gap-2 mx-auto bg-[#0273A7] text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <RefreshCw size={15} /> Générer les entrées du mois
                  </button>
                </div>
              ) : Object.entries(grouped).map(([bname, rows]) => (
                <div key={bname} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-5 py-3 bg-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-white" />
                      <span className="font-bold text-white text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{bname}</span>
                      <span className="text-gray-400 text-xs ml-2">{rows.length} locataire(s)</span>
                    </div>
                    <div className="flex gap-4 text-xs">
                      <span className="text-green-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Encaissé: {fc(rows.reduce((a, p) => a + p.montantPaye, 0))}
                      </span>
                      <span className="text-red-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Impayé: {fc(rows.filter(p => p.solde > 0).reduce((a, p) => a + p.solde, 0))}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 text-xs text-gray-500 border-b border-gray-100">
                          {['#', 'LOCATAIRE', 'LOYER DÛ', 'ARRIÉRÉS', 'PAYÉ', 'DATE', 'MODE', 'STATUT', 'SOLDE', 'OBSERVATIONS', ''].map(h => (
                            <th key={h} className="px-3 py-2.5 text-left font-semibold tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((p, i) => (
                          <PaymentRow key={p.id} payment={p} num={i + 1} onSave={handlePaymentSave} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── TAB DÉPENSES ───────────────────────────────────────────────── */}
          {tab === 'depenses' && (
            <div className="space-y-5">
              {/* Formulaire ajout */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Plus size={16} className="text-[#D30000]" /> Ajouter une dépense
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    { label: 'Immeuble', key: 'buildingId', type: 'select', opts: buildings.map(b => ({ v: b.id.toString(), l: b.name })), placeholder: 'Tous' },
                    { label: 'Date', key: 'dateDepense', type: 'date' },
                    { label: 'Désignation *', key: 'designation', type: 'text', placeholder: 'Travaux, réparation...' },
                    { label: 'Catégorie', key: 'categorie', type: 'select', opts: CATEGORIES_DEPENSES.map(c => ({ v: c, l: c })) },
                    { label: 'Prestataire', key: 'prestataire', type: 'text', placeholder: 'Nom prestataire' },
                    { label: 'Montant (F) *', key: 'montant', type: 'number', placeholder: '0' },
                    { label: 'Observations', key: 'observations', type: 'text', placeholder: '...' },
                  ].map(({ label, key, type, opts, placeholder }: any) => (
                    <div key={key}>
                      <label className="text-xs font-medium text-gray-600 mb-1 block" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</label>
                      {type === 'select' ? (
                        <select value={(expForm as any)[key]} onChange={e => setExpForm(p => ({ ...p, [key]: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000]"
                          style={{ fontFamily: 'Poppins, sans-serif' }}>
                          <option value="">{placeholder || '—'}</option>
                          {opts?.map((o: any) => <option key={o.v} value={o.v}>{o.l}</option>)}
                        </select>
                      ) : (
                        <input type={type} value={(expForm as any)[key]} placeholder={placeholder}
                          onChange={e => setExpForm(p => ({ ...p, [key]: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000]"
                          style={{ fontFamily: 'Poppins, sans-serif' }} />
                      )}
                    </div>
                  ))}
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block" style={{ fontFamily: 'Poppins, sans-serif' }}>Justificatif</label>
                    <div className="flex items-center gap-2">
                      <input ref={expFileRef} type="file" accept="image/*" onChange={handleExpUpload} className="hidden" />
                      <button onClick={() => expFileRef.current?.click()} disabled={expUploading}
                        className="flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                        style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {expUploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                        {expJustif ? '✓ Chargé' : 'Joindre'}
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={handleAddExpense} disabled={addingExp || !expForm.designation || !expForm.montant}
                  className="mt-4 flex items-center gap-2 bg-[#D30000] hover:bg-[#b00000] disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {addingExp ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                  Enregistrer la dépense
                </button>
              </div>

              {/* Table dépenses */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <span className="font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Dépenses — {MONTHS_FR[month - 1]} {year}
                  </span>
                  <span className="text-sm font-bold text-[#D30000]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Total : {fc(totalDepenses)}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 text-xs text-gray-500 border-b border-gray-100">
                        {['IMMEUBLE', 'DATE', 'DÉSIGNATION', 'CATÉGORIE', 'PRESTATAIRE', 'MONTANT (F)', 'OBSERVATIONS', ''].map(h => (
                          <th key={h} className="px-3 py-2.5 text-left font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.length === 0 ? (
                        <tr><td colSpan={8} className="text-center py-10 text-gray-400 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Aucune dépense ce mois.</td></tr>
                      ) : expenses.map(e => (
                        <ExpenseRow key={e.id} expense={e} buildings={buildings}
                          onDelete={async (id) => { await deleteExpense(id); await load(); }} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB GESTION ────────────────────────────────────────────────── */}
          {tab === 'gestion' && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Immeubles */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-[#D30000]" />
                    <span className="font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Immeubles ({buildings.length})</span>
                  </div>
                  <button onClick={() => setShowBuildingModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D30000] text-white rounded-lg text-xs font-semibold"
                    style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Plus size={13} /> Ajouter
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {buildings.map(b => (
                    <div key={b.id} className="px-5 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>{b.name}</p>
                        {b.address && <p className="text-xs text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>{b.address}</p>}
                      </div>
                      <button onClick={async () => { if (confirm(`Supprimer ${b.name} ?`)) { await deleteBuilding(b.id); await load(); } }}
                        className="p-1.5 text-gray-300 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locataires */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-[#0273A7]" />
                    <span className="font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Locataires ({tenants.filter(t => t.status !== 'inactif').length})</span>
                  </div>
                  <button onClick={() => { setEditTenant(undefined); setShowTenantModal(true); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0273A7] text-white rounded-lg text-xs font-semibold"
                    style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Plus size={13} /> Ajouter
                  </button>
                </div>
                <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-50">
                  {tenants.map(t => (
                    <div key={t.id} className="px-5 py-3 flex items-center justify-between group">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>{t.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>{t.buildingName}</span>
                          {t.unit && <span className="text-xs text-gray-300">· {t.unit}</span>}
                          <span className={`text-xs font-medium ${t.status === 'actif' ? 'text-green-600' : t.status === 'exonere' ? 'text-yellow-600' : 'text-gray-400'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {t.status === 'actif' ? fc(t.baseRent) + '/mois' : t.status === 'exonere' ? 'Exonéré' : 'Inactif'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditTenant(t); setShowTenantModal(true); }} className="p-1.5 text-gray-300 hover:text-blue-400"><Edit2 size={13} /></button>
                        <button onClick={async () => { if (confirm(`Supprimer ${t.name} ?`)) { await deleteTenant(t.id); await load(); } }}
                          className="p-1.5 text-gray-300 hover:text-red-400"><Trash2 size={13} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      {showBuildingModal && (
        <BuildingModal
          onClose={() => setShowBuildingModal(false)}
          onSave={async (name, address) => { await createBuilding(name, address); setShowBuildingModal(false); await load(); }}
        />
      )}
      {showTenantModal && (
        <TenantModal
          buildings={buildings}
          tenant={editTenant}
          onClose={() => setShowTenantModal(false)}
          onSave={async (data) => {
            if (editTenant) await updateTenant(editTenant.id, data);
            else await createTenant(data);
            setShowTenantModal(false);
            await load();
          }}
        />
      )}
    </AdminLayout>
  );
}
