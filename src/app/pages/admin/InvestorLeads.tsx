import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AdminLayout } from '../../components/AdminLayout';
import {
  getInvestorRdvs, updateInvestorRdvStatut, deleteInvestorRdv,
  type InvestorRdv, type InvestorStatut,
} from '../../../lib/api';
import {
  TrendingUp, Phone, Mail, Calendar, Trash2,
  ChevronDown, ChevronUp, CheckCircle2, Clock, AlertCircle, RefreshCw,
} from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUT_CONFIG: Record<InvestorStatut, { label: string; color: string; bg: string; icon: typeof Clock }> = {
  nouvelle:  { label: 'Nouvelle',   color: 'text-blue-700',  bg: 'bg-blue-100',  icon: AlertCircle },
  en_cours:  { label: 'En cours',   color: 'text-amber-700', bg: 'bg-amber-100', icon: Clock },
  traitee:   { label: 'Traitée',    color: 'text-green-700', bg: 'bg-green-100', icon: CheckCircle2 },
};

const BUDGET_LABELS: Record<string, string> = {
  moins_50m:  '< 50M FCFA',
  '50_100m':  '50–100M FCFA',
  '100_200m': '100–200M FCFA',
  plus_200m:  '200M+ FCFA',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function StatutBadge({ statut }: { statut: InvestorStatut }) {
  const cfg = STATUT_CONFIG[statut];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Icon size={11} />
      {cfg.label}
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function RdvCard({
  rdv, onStatutChange, onDelete,
}: {
  rdv: InvestorRdv;
  onStatutChange: (id: number, statut: InvestorStatut) => void;
  onDelete: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loadingStatut, setLoadingStatut] = useState<InvestorStatut | null>(null);

  const cfg = STATUT_CONFIG[rdv.statut];
  const stripeColor = rdv.statut === 'nouvelle' ? '#0273A7' : rdv.statut === 'en_cours' ? '#d97706' : '#16a34a';

  const changeStatut = async (statut: InvestorStatut) => {
    setLoadingStatut(statut);
    try { onStatutChange(rdv.id, statut); }
    finally { setLoadingStatut(null); }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
    >
      {/* Stripe */}
      <div className="h-1" style={{ backgroundColor: stripeColor }} />

      {/* Header row */}
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#030213] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {rdv.nom.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>{rdv.nom}</p>
            <p className="text-xs text-gray-400 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>{rdv.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 ml-3">
          <div className="hidden sm:flex gap-2 items-center">
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {rdv.package}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {BUDGET_LABELS[rdv.budget] ?? rdv.budget}
            </span>
          </div>
          <StatutBadge statut={rdv.statut} />
          {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-5">

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href={`tel:${rdv.telephone}`} className="flex items-center gap-2.5 text-sm text-gray-700 hover:text-[#D30000] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Phone size={14} className="text-[#D30000] flex-shrink-0" />
                  {rdv.telephone}
                </a>
                <a href={`mailto:${rdv.email}`} className="flex items-center gap-2.5 text-sm text-gray-700 hover:text-[#D30000] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Mail size={14} className="text-[#0273A7] flex-shrink-0" />
                  {rdv.email}
                </a>
                <div className="flex items-center gap-2.5 text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <TrendingUp size={14} className="text-gray-400 flex-shrink-0" />
                  Package : <strong className="text-gray-700 ml-1">{rdv.package}</strong>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Calendar size={14} className="text-gray-400 flex-shrink-0" />
                  {formatDate(rdv.createdAt)}
                </div>
              </div>

              {/* Budget pill */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#030213] bg-gray-100 px-3 py-1.5 rounded-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Budget : {BUDGET_LABELS[rdv.budget] ?? rdv.budget}
                </span>
              </div>

              {/* Message */}
              {rdv.message && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>Message</p>
                  <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>{rdv.message}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(STATUT_CONFIG) as InvestorStatut[])
                    .filter(s => s !== rdv.statut)
                    .map(s => {
                      const c = STATUT_CONFIG[s];
                      return (
                        <button
                          key={s}
                          onClick={() => changeStatut(s)}
                          disabled={loadingStatut !== null}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${c.bg} ${c.color} border-transparent hover:opacity-80 disabled:opacity-50`}
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {loadingStatut === s ? <RefreshCw size={11} className="animate-spin" /> : null}
                          Marquer : {c.label}
                        </button>
                      );
                    })}
                </div>

                {confirmDelete ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>Confirmer ?</span>
                    <button onClick={() => onDelete(rdv.id)} className="text-xs font-semibold text-red-600 hover:text-red-800 px-3 py-1.5 bg-red-50 rounded-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>Supprimer</button>
                    <button onClick={() => setConfirmDelete(false)} className="text-xs font-semibold text-gray-500 hover:text-gray-700 px-3 py-1.5 bg-gray-100 rounded-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>Annuler</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <Trash2 size={13} />
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

type FilterTab = 'toutes' | InvestorStatut;

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'toutes',   label: 'Toutes' },
  { key: 'nouvelle', label: 'Nouvelles' },
  { key: 'en_cours', label: 'En cours' },
  { key: 'traitee',  label: 'Traitées' },
];

export function InvestorLeads() {
  const [rdvs, setRdvs] = useState<InvestorRdv[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<FilterTab>('toutes');

  const load = async () => {
    setLoading(true);
    setError('');
    try { setRdvs(await getInvestorRdvs()); }
    catch { setError('Erreur de chargement. Vérifiez la connexion à la base de données.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleStatutChange = async (id: number, statut: InvestorStatut) => {
    await updateInvestorRdvStatut(id, statut);
    setRdvs(prev => prev.map(r => r.id === id ? { ...r, statut } : r));
  };

  const handleDelete = async (id: number) => {
    await deleteInvestorRdv(id);
    setRdvs(prev => prev.filter(r => r.id !== id));
  };

  const filtered = tab === 'toutes' ? rdvs : rdvs.filter(r => r.statut === tab);
  const counts: Record<FilterTab, number> = {
    toutes:   rdvs.length,
    nouvelle: rdvs.filter(r => r.statut === 'nouvelle').length,
    en_cours: rdvs.filter(r => r.statut === 'en_cours').length,
    traitee:  rdvs.filter(r => r.statut === 'traitee').length,
  };

  return (
    <AdminLayout
      title="Demandes investisseurs"
      subtitle={`${counts.nouvelle} nouvelle${counts.nouvelle > 1 ? 's' : ''} demande${counts.nouvelle > 1 ? 's' : ''}`}
      actions={
        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <RefreshCw size={15} />
          Actualiser
        </button>
      }
    >
      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: counts.toutes,   color: '#030213', bg: 'bg-gray-100' },
          { label: 'Nouvelles', value: counts.nouvelle, color: '#0273A7', bg: 'bg-blue-50' },
          { label: 'En cours',  value: counts.en_cours, color: '#d97706', bg: 'bg-amber-50' },
          { label: 'Traitées',  value: counts.traitee,  color: '#16a34a', bg: 'bg-green-50' },
        ].map(k => (
          <div key={k.label} className={`${k.bg} rounded-xl px-5 py-4`}>
            <p className="text-2xl font-extrabold" style={{ color: k.color, fontFamily: 'Poppins, sans-serif' }}>{k.value}</p>
            <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>{k.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit flex-wrap">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.key ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${tab === t.key ? 'bg-[#D30000] text-white' : 'bg-gray-200 text-gray-600'}`}>
              {counts[t.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <RefreshCw size={24} className="animate-spin text-gray-400" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <TrendingUp size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Aucune demande dans cette catégorie.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(rdv => (
            <RdvCard
              key={rdv.id}
              rdv={rdv}
              onStatutChange={handleStatutChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
