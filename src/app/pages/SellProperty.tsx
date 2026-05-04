import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User, Phone, Mail, MessageCircle, Home, Building2,
  MapPin, Ruler, Bed, Bath, Car, Layers, DollarSign,
  FileText, Camera, ArrowRight, ArrowLeft, CheckCircle,
  Upload, X, Loader2,
} from 'lucide-react';
import { Link } from 'react-router';
import { createPropertyLead } from '../../lib/api';
import { uploadToImgBB } from '../../lib/imgbb';
import { categories } from '../../lib/api';

const STEPS = ['Coordonnées', 'Votre bien', 'Photos & détails', 'Confirmation'];

const categoryIcons: Record<string, string> = {
  Villa: '🏡', Appartement: '🏢', Maison: '🏠',
  Studio: '🛋️', Bureau: '💼', Penthouse: '🌆', Duplex: '🏗️',
};

const fadeVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

type FormData = {
  name: string;
  phone: string;
  email: string;
  whatsapp: string;
  samePhone: boolean;
  type: 'Vente' | 'Location';
  category: string;
  zone: string;
  location: string;
  surface: string;
  bedrooms: string;
  bathrooms: string;
  parking: string;
  floor: string;
  priceExpectation: string;
  description: string;
  images: string[];
};

const initial: FormData = {
  name: '', phone: '', email: '', whatsapp: '', samePhone: true,
  type: 'Vente', category: 'Villa', zone: '', location: '',
  surface: '', bedrooms: '0', bathrooms: '1', parking: '0', floor: '',
  priceExpectation: '', description: '', images: [],
};

function Counter({ value, onChange, min = 0, max = 20 }: { value: string; onChange: (v: string) => void; min?: number; max?: number }) {
  const n = Number(value) || 0;
  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={() => onChange(String(Math.max(min, n - 1)))}
        className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#D30000] hover:text-[#D30000] transition-colors font-bold">−</button>
      <span className="w-6 text-center font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>{n}</span>
      <button type="button" onClick={() => onChange(String(Math.min(max, n + 1)))}
        className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#D30000] hover:text-[#D30000] transition-colors font-bold">+</button>
    </div>
  );
}

function FieldLabel({ icon: Icon, label, required }: { icon: any; label: string; required?: boolean }) {
  return (
    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Icon size={14} className="text-gray-400" />
      {label} {required && <span className="text-[#D30000]">*</span>}
    </label>
  );
}

function Input({ className = '', onChange, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.type !== 'number' && props.type !== 'tel') {
      e.target.value = e.target.value.replace(/^\s+/, '');
    }
    onChange?.(e);
  };
  return (
    <input
      {...props}
      onChange={handleChange}
      onBlur={e => { e.target.value = e.target.value.trim(); onChange?.({ ...e, target: { ...e.target, value: e.target.value.trim() } } as any); }}
      style={{ fontFamily: 'Poppins, sans-serif' }}
      className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 text-sm transition-all ${className}`}
    />
  );
}

export function SellProperty() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<FormData>(initial);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (field: keyof FormData, value: any) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const f of files) {
        if (f.type.startsWith('image/')) urls.push(await uploadToImgBB(f));
      }
      set('images', [...form.images, ...urls]);
    } catch {
      setError('Erreur upload photo. Réessayez.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      await createPropertyLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        whatsapp: form.samePhone ? form.phone.trim() : (form.whatsapp.trim() || undefined),
        type: form.type,
        category: form.category || undefined,
        location: form.location || undefined,
        zone: form.zone || undefined,
        surface: form.surface ? Number(form.surface) : undefined,
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        parking: Number(form.parking),
        floor: form.floor ? Number(form.floor) : undefined,
        priceExpectation: form.priceExpectation ? Number(form.priceExpectation) : undefined,
        description: form.description || undefined,
        images: form.images,
      });
      setDone(true);
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Demande envoyée !
          </h2>
          <p className="text-gray-500 mb-2 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Merci <strong>{form.name}</strong>. Nous avons bien reçu votre demande et vous contacterons au <strong>{form.phone}</strong> dans les plus brefs délais.
          </p>
          <p className="text-xs text-gray-400 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Un agent Diene Immo analysera votre bien et vous fera une estimation gratuite.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-[#D30000] hover:bg-[#b00000] text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Retour à l'accueil
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Retour */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#D30000] transition-colors"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <ArrowLeft size={15} />
            Retour à l'accueil
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#D30000]/10 text-[#D30000] px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <Home size={13} /> Estimation gratuite
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Vendez ou louez votre bien
          </h1>
          <p className="text-gray-500 mt-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Remplissez ce formulaire et notre équipe vous contacte sous 24h.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((label, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className={`h-1.5 w-full rounded-full transition-all duration-500 ${i <= step ? 'bg-[#D30000]' : 'bg-gray-200'}`} />
              <span className={`text-[10px] font-medium hidden sm:block transition-colors ${i === step ? 'text-[#D30000]' : 'text-gray-400'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Step header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#D30000] flex items-center justify-center text-white font-bold text-sm">
              {step + 1}
            </div>
            <div>
              <p className="text-white font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>{STEPS[step]}</p>
              <p className="text-gray-400 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>Étape {step + 1} sur {STEPS.length}</p>
            </div>
          </div>

          {/* Animated step content */}
          <div className="p-6 sm:p-8 overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={fadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {step === 0 && (
                  <div className="space-y-5">
                    <div>
                      <FieldLabel icon={User} label="Prénom et Nom" required />
                      <Input
                        value={form.name}
                        onChange={e => set('name', e.target.value)}
                        placeholder="Ex: Moussa Diallo"
                        required
                      />
                    </div>
                    <div>
                      <FieldLabel icon={Phone} label="Téléphone" required />
                      <Input
                        value={form.phone}
                        onChange={e => set('phone', e.target.value)}
                        placeholder="+221 77 000 00 00"
                        type="tel"
                        required
                      />
                    </div>
                    <div>
                      <FieldLabel icon={Mail} label="Email" />
                      <Input
                        value={form.email}
                        onChange={e => set('email', e.target.value)}
                        placeholder="votre@email.com"
                        type="email"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <FieldLabel icon={MessageCircle} label="WhatsApp" />
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          <div
                            onClick={() => set('samePhone', !form.samePhone)}
                            className={`w-8 h-4 rounded-full transition-colors cursor-pointer ${form.samePhone ? 'bg-[#D30000]' : 'bg-gray-200'}`}
                          >
                            <div className={`w-3.5 h-3.5 bg-white rounded-full shadow mt-0.5 transition-transform ${form.samePhone ? 'translate-x-4 ml-0' : 'ml-0.5'}`} />
                          </div>
                          Même que téléphone
                        </label>
                      </div>
                      {!form.samePhone && (
                        <Input
                          value={form.whatsapp}
                          onChange={e => set('whatsapp', e.target.value)}
                          placeholder="+221 77 000 00 00"
                          type="tel"
                        />
                      )}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    {/* Type transaction */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Type de transaction <span className="text-[#D30000]">*</span>
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {(['Vente', 'Location'] as const).map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => set('type', t)}
                            className={`py-3 rounded-xl font-semibold text-sm border-2 transition-all ${
                              form.type === t
                                ? 'border-[#D30000] bg-[#D30000] text-white shadow-md'
                                : 'border-gray-200 text-gray-600 hover:border-[#D30000]/50'
                            }`}
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Catégorie */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Type de bien <span className="text-[#D30000]">*</span>
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {categories.filter(c => c !== 'Tous').map(cat => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => set('category', cat)}
                            className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 transition-all text-center ${
                              form.category === cat
                                ? 'border-[#D30000] bg-[#D30000]/5 text-[#D30000]'
                                : 'border-gray-200 text-gray-500 hover:border-gray-300'
                            }`}
                          >
                            <span className="text-xl">{categoryIcons[cat] || '🏠'}</span>
                            <span className="text-[10px] font-medium leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>{cat}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Zone + Adresse */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel icon={MapPin} label="Quartier / Zone" />
                        <Input
                          value={form.zone}
                          onChange={e => set('zone', e.target.value)}
                          placeholder="Ex: Almadies, Sacré-Cœur, Ngor..."
                        />
                      </div>
                      <div>
                        <FieldLabel icon={MapPin} label="Adresse" />
                        <Input
                          value={form.location}
                          onChange={e => set('location', e.target.value)}
                          placeholder="Rue, numéro, repère..."
                        />
                      </div>
                    </div>

                    {/* Surface */}
                    <div>
                      <FieldLabel icon={Ruler} label="Surface (m²)" />
                      <Input
                        type="number"
                        min="0"
                        value={form.surface}
                        onChange={e => set('surface', e.target.value)}
                        placeholder="Ex: 120"
                      />
                    </div>

                    {/* Compteurs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { icon: Bed, label: 'Chambres', field: 'bedrooms' },
                        { icon: Bath, label: 'Salles de bain', field: 'bathrooms' },
                        { icon: Car, label: 'Parkings', field: 'parking' },
                      ].map(({ icon: Icon, label, field }) => (
                        <div key={field} className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            <Icon size={13} /> {label}
                          </div>
                          <Counter
                            value={(form as any)[field]}
                            onChange={v => set(field as keyof FormData, v)}
                            min={field === 'bathrooms' ? 1 : 0}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Étage + Prix */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel icon={Layers} label="Étage (optionnel)" />
                        <Input
                          type="number"
                          min="0"
                          value={form.floor}
                          onChange={e => set('floor', e.target.value)}
                          placeholder="Rez-de-chaussée = 0"
                        />
                      </div>
                      <div>
                        <FieldLabel icon={DollarSign} label="Prix souhaité (FCFA)" />
                        <Input
                          type="number"
                          min="0"
                          value={form.priceExpectation}
                          onChange={e => set('priceExpectation', e.target.value)}
                          placeholder="Ex: 150000000"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <FieldLabel icon={FileText} label="Description du bien" />
                      <textarea
                        value={form.description}
                        onChange={e => set('description', e.target.value)}
                        rows={5}
                        placeholder="Décrivez votre bien : état général, points forts, travaux récents, équipements..."
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 text-sm resize-none transition-all"
                      />
                    </div>

                    {/* Photos */}
                    <div>
                      <FieldLabel icon={Camera} label="Photos du bien (optionnel)" />
                      <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleImages} className="hidden" />
                      <div
                        onClick={() => fileRef.current?.click()}
                        className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#D30000] transition-colors cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-[#D30000]/10 flex items-center justify-center mx-auto mb-3 transition-colors">
                          <Upload size={20} className="text-gray-400 group-hover:text-[#D30000] transition-colors" />
                        </div>
                        <p className="text-sm font-medium text-gray-600 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Cliquez pour ajouter des photos
                        </p>
                        <p className="text-xs text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>PNG, JPG — max 10 MB par photo</p>
                      </div>

                      {uploading && (
                        <div className="flex items-center gap-2 text-sm text-[#D30000] mt-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          <Loader2 size={16} className="animate-spin" /> Upload en cours...
                        </div>
                      )}

                      {form.images.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {form.images.map((img, i) => (
                            <div key={i} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
                              <img src={img} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => set('images', form.images.filter((_, j) => j !== i))}
                                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Vérifiez vos informations avant d'envoyer la demande.
                    </p>

                    {/* Récapitulatif */}
                    <div className="space-y-3">
                      {[
                        { label: 'Nom', value: form.name },
                        { label: 'Téléphone', value: form.phone },
                        { label: 'Email', value: form.email || '—' },
                        { label: 'WhatsApp', value: form.samePhone ? form.phone : (form.whatsapp || '—') },
                        { label: 'Transaction', value: form.type },
                        { label: 'Type de bien', value: form.category },
                        { label: 'Zone', value: form.zone },
                        { label: 'Adresse', value: form.location || '—' },
                        { label: 'Surface', value: form.surface ? `${form.surface} m²` : '—' },
                        { label: 'Chambres', value: form.bedrooms },
                        { label: 'Salles de bain', value: form.bathrooms },
                        { label: 'Parkings', value: form.parking },
                        { label: 'Prix souhaité', value: form.priceExpectation ? `${Number(form.priceExpectation).toLocaleString('fr-FR')} FCFA` : '—' },
                        { label: 'Photos', value: form.images.length > 0 ? `${form.images.length} photo(s)` : 'Aucune' },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</span>
                          <span className="text-sm font-medium text-gray-800 text-right ml-4" style={{ fontFamily: 'Poppins, sans-serif' }}>{value}</span>
                        </div>
                      ))}
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {error}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="px-6 sm:px-8 py-5 border-t border-gray-100 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => go(step - 1)}
              disabled={step === 0}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-0 disabled:pointer-events-none"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <ArrowLeft size={16} /> Précédent
            </button>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 0 && !form.name.trim()) { setError('Le nom est requis.'); return; }
                  if (step === 0 && !form.phone.trim()) { setError('Le téléphone est requis.'); return; }
                  if (step === 0) {
                    set('name', form.name.trim());
                    set('phone', form.phone.trim());
                    if (form.email) set('email', form.email.trim());
                    if (form.whatsapp) set('whatsapp', form.whatsapp.trim());
                  }
                  setError('');
                  go(step + 1);
                }}
                className="flex items-center gap-2 bg-[#D30000] hover:bg-[#b00000] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-md"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Suivant <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 bg-[#D30000] hover:bg-[#b00000] disabled:opacity-60 text-white px-8 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-md"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {submitting ? <><Loader2 size={16} className="animate-spin" /> Envoi...</> : <><CheckCircle size={16} /> Envoyer ma demande</>}
              </button>
            )}
          </div>
        </div>

        {/* Reassurance */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: '🔒', label: 'Confidentiel', sub: 'Vos données sont sécurisées' },
            { icon: '⚡', label: 'Rapide', sub: 'Réponse sous 24h' },
            { icon: '🎯', label: 'Gratuit', sub: 'Estimation sans engagement' },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-2xl mb-1">{icon}</div>
              <p className="text-xs font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
