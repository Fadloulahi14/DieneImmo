import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone, Mail, MessageCircle, MapPin, Ruler, Bed, Bath,
  Car, DollarSign, FileText, Calendar, ChevronDown, ChevronUp,
  Trash2, CheckCircle, Clock, XCircle, RefreshCw, Eye, StickyNote,
  Layers, Tag,
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { getPropertyLeads, updateLeadStatus, deletePropertyLead } from '../../../lib/api';
import type { PropertyLead, LeadStatus } from '../../../lib/types';

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string; icon: any }> = {
  nouveau:   { label: 'Nouveau',   color: 'text-blue-600',  bg: 'bg-blue-50 border-blue-200',   icon: Clock },
  en_cours:  { label: 'En cours',  color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', icon: RefreshCw },
  traite:    { label: 'Traité',    color: 'text-green-600', bg: 'bg-green-50 border-green-200',  icon: CheckCircle },
  rejete:    { label: 'Rejeté',   color: 'text-gray-500',  bg: 'bg-gray-50 border-gray-200',    icon: XCircle },
};

const TABS: { key: LeadStatus | 'tous'; label: string }[] = [
  { key: 'tous',     label: 'Tous' },
  { key: 'nouveau',  label: 'Nouveaux' },
  { key: 'en_cours', label: 'En cours' },
  { key: 'traite',   label: 'Traités' },
  { key: 'rejete',   label: 'Rejetés' },
];

function fmt(n?: number) {
  if (!n) return '—';
  return n.toLocaleString('fr-FR') + ' FCFA';
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${cfg.bg} ${cfg.color}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Icon size={11} /> {cfg.label}
    </span>
  );
}

function LeadCard({ lead, onStatusChange, onDelete }: {
  lead: PropertyLead;
  onStatusChange: (id: number, status: LeadStatus, notes?: string) => void;
  onDelete: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState(lead.adminNotes || '');
  const [changing, setChanging] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const changeStatus = async (status: LeadStatus) => {
    setChanging(true);
    await onStatusChange(lead.id, status, note || undefined);
    setChanging(false);
  };

  const doDelete = async () => {
    if (!confirm(`Supprimer la demande de ${lead.name} ?`)) return;
    setDeleting(true);
    await onDelete(lead.id);
    setDeleting(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Top stripe by status */}
      <div className={`h-1 w-full ${
        lead.status === 'nouveau' ? 'bg-blue-400' :
        lead.status === 'en_cours' ? 'bg-orange-400' :
        lead.status === 'traite' ? 'bg-green-400' : 'bg-gray-300'
      }`} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {lead.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>{lead.name}</p>
              <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-xs text-[#D30000] hover:underline" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Phone size={11} /> {lead.phone}
                </a>
                {lead.whatsapp && (
                  <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-green-600 hover:underline" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <MessageCircle size={11} /> WhatsApp
                  </a>
                )}
                {lead.email && (
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-xs text-blue-600 hover:underline" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Mail size={11} /> {lead.email}
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <StatusBadge status={lead.status} />
            <button onClick={() => setExpanded(!expanded)} className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        </div>

        {/* Quick info pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {lead.type && (
            <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${lead.type === 'Vente' ? 'bg-[#D30000]/10 text-[#D30000]' : 'bg-[#0273A7]/10 text-[#0273A7]'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              {lead.type}
            </span>
          )}
          {lead.category && (
            <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <Tag size={10} className="inline mr-1" />{lead.category}
            </span>
          )}
          {lead.zone && (
            <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 flex items-center gap-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <MapPin size={10} />{lead.zone}
            </span>
          )}
          {lead.surface && (
            <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <Ruler size={10} className="inline mr-1" />{lead.surface} m²
            </span>
          )}
          {lead.priceExpectation && (
            <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {fmt(lead.priceExpectation)}
            </span>
          )}
        </div>

        {/* Date */}
        <p className="text-[11px] text-gray-400 mt-3 flex items-center gap-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Calendar size={11} /> {fmtDate(lead.createdAt)}
        </p>

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
              <div className="pt-5 mt-4 border-t border-gray-100 space-y-4">

                {/* Caractéristiques */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: Bed,    label: 'Chambres',      value: lead.bedrooms },
                    { icon: Bath,   label: 'Salle de bain', value: lead.bathrooms },
                    { icon: Car,    label: 'Parkings',       value: lead.parking },
                    { icon: Layers, label: 'Étage',          value: lead.floor !== undefined ? lead.floor : '—' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                      <Icon size={16} className="text-gray-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-800">{value ?? '—'}</p>
                      <p className="text-[10px] text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</p>
                    </div>
                  ))}
                </div>

                {/* Adresse */}
                {lead.location && (
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin size={15} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <span style={{ fontFamily: 'Poppins, sans-serif' }}>{lead.location}</span>
                  </div>
                )}

                {/* Description */}
                {lead.description && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <FileText size={12} /> Description
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>{lead.description}</p>
                  </div>
                )}

                {/* Photos */}
                {lead.images.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <Eye size={12} /> Photos ({lead.images.length})
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {lead.images.map((img, i) => (
                        <a key={i} href={img} target="_blank" rel="noreferrer" className="rounded-lg overflow-hidden aspect-square bg-gray-100 block">
                          <img src={img} alt={`Photo ${i + 1}`} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Note admin */}
                <div>
                  <button
                    onClick={() => setNoteOpen(!noteOpen)}
                    className="flex items-center gap-1.5 text-xs text-[#0273A7] hover:underline"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <StickyNote size={12} />
                    {lead.adminNotes ? 'Modifier la note' : 'Ajouter une note interne'}
                  </button>
                  {lead.adminNotes && !noteOpen && (
                    <p className="mt-2 text-xs text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 italic" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {lead.adminNotes}
                    </p>
                  )}
                  {noteOpen && (
                    <div className="mt-2 space-y-2">
                      <textarea
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        rows={3}
                        placeholder="Note interne (visible uniquement par l'admin)..."
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        className="w-full px-3 py-2 text-sm border border-yellow-200 bg-yellow-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none"
                      />
                    </div>
                  )}
                </div>

                {/* Actions statut */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs text-gray-500 mr-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Changer statut :</span>
                  {(Object.keys(STATUS_CONFIG) as LeadStatus[])
                    .filter(s => s !== lead.status)
                    .map(s => {
                      const cfg = STATUS_CONFIG[s];
                      const Icon = cfg.icon;
                      return (
                        <button
                          key={s}
                          onClick={() => changeStatus(s)}
                          disabled={changing}
                          className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all disabled:opacity-50 ${cfg.bg} ${cfg.color} hover:opacity-80`}
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          <Icon size={11} /> {cfg.label}
                        </button>
                      );
                    })}
                  <button
                    onClick={doDelete}
                    disabled={deleting}
                    className="ml-auto flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <Trash2 size={11} /> Supprimer
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function LeadsManagement() {
  const [leads, setLeads] = useState<PropertyLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<LeadStatus | 'tous'>('tous');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setLeads(await getPropertyLeads());
    } catch {
      setError('Impossible de charger les demandes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id: number, status: LeadStatus, notes?: string) => {
    await updateLeadStatus(id, status, notes);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status, adminNotes: notes ?? l.adminNotes } : l));
  };

  const handleDelete = async (id: number) => {
    await deletePropertyLead(id);
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const counts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1;
    return acc;
  }, {});

  const filtered = activeTab === 'tous' ? leads : leads.filter(l => l.status === activeTab);

  const headerActions = (
    <button
      onClick={load}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors border border-gray-200 hover:border-gray-300 px-4 py-2 rounded-lg"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <RefreshCw size={15} /> Actualiser
    </button>
  );

  return (
    <AdminLayout
      title="Demandes de vente"
      subtitle={`${leads.length} demande${leads.length !== 1 ? 's' : ''} reçue${leads.length !== 1 ? 's' : ''}`}
      actions={headerActions}
    >
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {TABS.map(tab => {
          const count = tab.key === 'tous' ? leads.length : (counts[tab.key] || 0);
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {tab.label}
              {count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl h-32 animate-pulse border border-gray-100" />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-gray-500 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {activeTab === 'tous' ? 'Aucune demande pour le moment.' : `Aucune demande "${TABS.find(t => t.key === activeTab)?.label}".`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map(lead => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </AdminLayout>
  );
}
