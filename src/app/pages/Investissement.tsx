import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import {
  TrendingUp, Building2, Users, ShieldCheck, CheckCircle2,
  ChevronRight, ArrowRight, Phone, Star, BarChart3, Landmark,
  Home, Clock, ArrowLeft,
} from 'lucide-react';
import { createInvestorRdv } from '../../lib/api';

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { icon: TrendingUp,  value: '10–13%', label: 'Rendement annuel net', color: '#D30000' },
  { icon: Building2,   value: '9+',     label: 'Immeubles gérés',       color: '#0273A7' },
  { icon: Users,       value: '94%',    label: "Taux d'occupation",     color: '#16a34a' },
  { icon: Clock,       value: '10+',    label: "Années d'expérience",   color: '#d97706' },
];

const packages = [
  {
    name: 'Essentiel',
    rate: '8%',
    subtitle: 'Rendement garanti',
    color: '#0273A7',
    bg: 'from-blue-50 to-blue-100/50',
    border: 'border-blue-200',
    features: [
      'Gestion locative complète',
      'Reversement mensuel régulier',
      'Rapport trimestriel',
      'Assistance juridique de base',
      'Entretien courant inclus',
    ],
    tag: null,
  },
  {
    name: 'Patrimonial',
    rate: '10%',
    subtitle: 'Rendement optimisé',
    color: '#D30000',
    bg: 'from-red-50 to-red-100/50',
    border: 'border-red-300',
    features: [
      'Tout le pack Essentiel',
      'Optimisation fiscale',
      'Rapport mensuel détaillé',
      'Gestion des travaux',
      'Conseils patrimoniaux dédiés',
      'Suivi personnalisé',
    ],
    tag: 'Populaire',
  },
  {
    name: 'Premium',
    rate: '12–15%',
    subtitle: 'Rendement performant',
    color: '#030213',
    bg: 'from-gray-800 to-gray-900',
    border: 'border-gray-700',
    dark: true,
    features: [
      'Tout le pack Patrimonial',
      'Accès immeubles premium',
      'Rendement boosté garanti',
      'Gestionnaire dédié exclusif',
      'Rapport hebdomadaire',
      'Priorité sur nouvelles acquisitions',
    ],
    tag: 'Premium',
  },
];

const steps = [
  { icon: Phone,      num: '01', title: 'Rendez-vous',      desc: 'Échange découverte sans engagement pour comprendre votre projet.' },
  { icon: BarChart3,  num: '02', title: 'Étude personnalisée', desc: 'Simulation de rendement sur mesure selon votre budget.' },
  { icon: Landmark,   num: '03', title: 'Investissement',   desc: 'Formalisation et mise en gestion de votre bien.' },
  { icon: TrendingUp, num: '04', title: 'Revenus réguliers', desc: 'Reversement mensuel et suivi de performance.' },
];

const buildings = [
  'IMM FASS', 'IMM RUE 62 GT', 'IMM SACRÉ-CŒUR',
  'IMM FANN HOCK', 'IMM LIBERTÉ 6', 'IMM OUAKAM',
  'IMM MERMOZ', 'IMM POINT E', 'IMM ALMADIES',
];

const BUDGETS = [
  { value: 'moins_50m',   label: '< 50 millions FCFA' },
  { value: '50_100m',     label: '50 – 100 millions FCFA' },
  { value: '100_200m',    label: '100 – 200 millions FCFA' },
  { value: 'plus_200m',   label: '200 millions+ FCFA' },
];

const PACKAGES_OPTIONS = [
  { value: 'Essentiel',   label: 'Essentiel — 8% garanti' },
  { value: 'Patrimonial', label: 'Patrimonial — 10% optimisé' },
  { value: 'Premium',     label: 'Premium — 12–15% performant' },
  { value: 'Indécis',     label: 'Pas encore décidé' },
];

// ─── Form ─────────────────────────────────────────────────────────────────────

interface FormData {
  nom: string;
  telephone: string;
  email: string;
  budget: string;
  package: string;
  message: string;
}

interface FormErrors {
  nom?: string;
  telephone?: string;
  email?: string;
  budget?: string;
  package?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.nom.trim()) errors.nom = 'Le nom est requis.';
  if (!data.telephone.trim()) errors.telephone = 'Le téléphone est requis.';
  if (!data.email.trim()) errors.email = "L'e-mail est requis.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "L'adresse e-mail n'est pas valide.";
  if (!data.budget) errors.budget = 'Veuillez sélectionner un budget.';
  if (!data.package) errors.package = 'Veuillez choisir un package.';
  return errors;
}

// ─── Input helper ─────────────────────────────────────────────────────────────

function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-600" style={{ fontFamily: 'Poppins, sans-serif' }}>{error}</p>
      )}
    </div>
  );
}

const inputClass = (error?: string) =>
  `w-full px-4 py-3 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 transition-colors ${
    error
      ? 'border-red-400 focus:ring-red-200'
      : 'border-gray-200 focus:ring-[#D30000]/20 focus:border-[#D30000]'
  }`;

// ─── Main page ────────────────────────────────────────────────────────────────

export function Investissement() {
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [form, setForm] = useState<FormData>({
    nom: '', telephone: '', email: '', budget: '', package: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [networkError, setNetworkError] = useState('');

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePackageClick = (pkgName: string) => {
    setSelectedPackage(pkgName);
    setForm(f => ({ ...f, package: pkgName }));
    scrollToForm();
  };

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const val = e.target.value.replace(/^\s+/, '');
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field as keyof FormErrors]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleBlur = (field: keyof FormData) => () => {
    setForm(f => ({ ...f, [field]: f[field].trim() }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNetworkError('');
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await createInvestorRdv({
        nom: form.nom,
        telephone: form.telephone,
        email: form.email,
        budget: form.budget,
        package: form.package,
        message: form.message || undefined,
      });
      setSuccess(true);
    } catch {
      setNetworkError("Une erreur réseau est survenue. Veuillez réessayer ou nous appeler directement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#030213] via-[#0c1433] to-[#030213] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#D30000] blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#0273A7] blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,.3) 40px,rgba(255,255,255,.3) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,.3) 40px,rgba(255,255,255,.3) 41px)' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 bg-[#D30000]/20 border border-[#D30000]/30 text-[#ff6b6b] text-xs font-semibold px-4 py-1.5 rounded-full mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <TrendingUp size={13} />
              Dossier investisseur
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Investissez dans{' '}
              <span className="text-[#D30000]">l'immobilier</span>{' '}
              à Dakar
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Confiez votre patrimoine à DIENE IMMOBILIER et profitez de rendements stables de
              <strong className="text-white"> 10 à 13% par an</strong>, sans les contraintes
              de la gestion locative.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 bg-[#D30000] hover:bg-[#b00000] text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-[#D30000]/40 hover:-translate-y-0.5"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Demander un rendez-vous
                <ArrowRight size={18} />
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:bg-white/5"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Phone size={16} />
                Nous appeler
              </Link>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16"
          >
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-5 py-4">
                  <Icon size={20} style={{ color: s.color }} className="mb-2" />
                  <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{s.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>{s.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Packages ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#030213] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Nos packages d'investissement
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Choisissez le niveau d'engagement qui correspond à vos objectifs patrimoniaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  pkg.dark
                    ? 'bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700'
                    : `bg-gradient-to-b ${pkg.bg} ${pkg.border}`
                }`}
                onClick={() => handlePackageClick(pkg.name)}
              >
                {pkg.tag && (
                  <div
                    className="absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: pkg.color, fontFamily: 'Poppins, sans-serif' }}
                  >
                    {pkg.tag}
                  </div>
                )}
                <div className="p-7">
                  <h3 className={`text-xl font-bold mb-1 ${pkg.dark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {pkg.name}
                  </h3>
                  <p className={`text-sm mb-5 ${pkg.dark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {pkg.subtitle}
                  </p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-5xl font-extrabold" style={{ color: pkg.dark ? '#fff' : pkg.color, fontFamily: 'Poppins, sans-serif' }}>
                      {pkg.rate}
                    </span>
                    <span className={`text-sm mb-2 ${pkg.dark ? 'text-gray-400' : 'text-gray-500'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                      /an
                    </span>
                  </div>
                  <ul className="space-y-2.5 mb-7">
                    {pkg.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2.5 text-sm ${pkg.dark ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: pkg.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                    style={{ backgroundColor: pkg.color, fontFamily: 'Poppins, sans-serif' }}
                  >
                    Choisir ce package
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#030213] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Comment ça marche ?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Un processus simple, transparent et sans surprise.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-[#030213] flex items-center justify-center shadow-lg">
                      <Icon size={28} className="text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#D30000] text-white text-xs font-bold flex items-center justify-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {step.num}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{step.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>{step.desc}</p>
                  {i < steps.length - 1 && (
                    <ChevronRight size={20} className="text-gray-300 mt-4 hidden lg:block absolute right-0 top-1/2 -translate-y-1/2" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Immeubles ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <div className="flex items-center gap-2 text-gray-400 text-sm mr-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <Home size={16} />
              Immeubles sous gestion
            </div>
            {buildings.map((b) => (
              <div
                key={b}
                className="flex items-center gap-1.5 bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-semibold text-gray-700 shadow-sm"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Star size={10} className="text-[#D30000]" fill="#D30000" />
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulaire ──────────────────────────────────────────────────── */}
      <section ref={formRef} className="py-24 bg-white scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[#D30000]/10 text-[#D30000] text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <ShieldCheck size={13} />
                Premier rendez-vous sans engagement
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#030213] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Demander un rendez-vous
              </h2>
              <p className="text-gray-500 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Notre équipe vous recontacte sous 24h pour un premier échange découverte.
              </p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 size={40} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Demande envoyée !
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Merci pour votre intérêt. Notre équipe vous contactera sous <strong>24h</strong> pour organiser votre rendez-vous investisseur — sans engagement de votre part.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#D30000] text-white rounded-xl text-sm font-semibold hover:bg-[#b00000] transition-colors"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <ArrowLeft size={15} />
                        Retour à l'accueil
                      </Link>
                      <Link
                        to="/biens"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Voir nos biens
                        <ChevronRight size={15} />
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {networkError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {networkError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Nom complet *" error={errors.nom}>
                        <input
                          type="text"
                          value={form.nom}
                          onChange={set('nom')}
                          onBlur={handleBlur('nom')}
                          className={inputClass(errors.nom)}
                          placeholder="Ex : Mamadou Diallo"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        />
                      </Field>
                      <Field label="Téléphone *" error={errors.telephone}>
                        <input
                          type="tel"
                          value={form.telephone}
                          onChange={set('telephone')}
                          onBlur={handleBlur('telephone')}
                          className={inputClass(errors.telephone)}
                          placeholder="+221 7X XXX XX XX"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        />
                      </Field>
                    </div>

                    <Field label="Adresse e-mail *" error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        onBlur={handleBlur('email')}
                        className={inputClass(errors.email)}
                        placeholder="votre@email.com"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      />
                    </Field>

                    <Field label="Budget d'investissement *" error={errors.budget}>
                      <select
                        value={form.budget}
                        onChange={set('budget')}
                        className={inputClass(errors.budget)}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <option value="">Sélectionnez une tranche</option>
                        {BUDGETS.map(b => (
                          <option key={b.value} value={b.value}>{b.label}</option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Package souhaité *" error={errors.package}>
                      <select
                        value={form.package}
                        onChange={set('package')}
                        className={inputClass(errors.package)}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <option value="">Choisissez un package</option>
                        {PACKAGES_OPTIONS.map(p => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                      {selectedPackage && selectedPackage !== form.package && (
                        <p className="mt-1 text-xs text-blue-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Vous avez sélectionné le package <strong>{selectedPackage}</strong> ci-dessus.
                        </p>
                      )}
                    </Field>

                    <Field label="Message (optionnel)">
                      <textarea
                        value={form.message}
                        onChange={set('message')}
                        onBlur={handleBlur('message')}
                        className={`${inputClass()} resize-none`}
                        rows={3}
                        placeholder="Précisez votre projet, vos questions, vos disponibilités…"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-[#D30000] hover:bg-[#b00000] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Envoi en cours…
                        </>
                      ) : (
                        <>
                          Demander mon rendez-vous
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Premier rendez-vous sans engagement · Réponse sous 24h
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
