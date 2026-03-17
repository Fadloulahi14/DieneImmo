import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight, Home as HomeIcon, Key, TrendingUp, ShieldCheck,
  Star, ChevronRight, MapPin, Maximize, Bed, Bath, Phone,
  CheckCircle2, Users, Award, Clock
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { allProperties } from '../data/properties';

const heroImage = 'https://images.unsplash.com/photo-1746458258536-b9ee5db20a73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MjI5Mjc3N3ww&ixlib=rb-4.1.0&q=80&w=1080';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const services = [
  { icon: Key, title: 'Location', desc: 'Trouvez le logement idéal en location selon vos besoins et votre budget.', color: '#D30000' },
  { icon: HomeIcon, title: 'Vente', desc: 'Valorisez votre bien et vendez au meilleur prix avec notre expertise.', color: '#0273A7' },
  { icon: TrendingUp, title: 'Achat', desc: 'Investissez sereinement grâce à nos conseils personnalisés et notre réseau.', color: '#D30000' },
  { icon: ShieldCheck, title: 'Gérance', desc: 'Confiez la gestion de vos biens à nos experts pour une tranquillité totale.', color: '#0273A7' },
];

// Use real data from the centralized properties store
const recentProperties = allProperties.filter(p => p.featured).slice(0, 3);

const testimonials = [
  {
    name: 'Moussa Diallo',
    role: 'Client acheteur',
    text: 'Diene Immo a transformé notre recherche de maison en une expérience agréable. Service professionnel et équipe à l\'écoute. Je recommande vivement !',
    rating: 5,
  },
  {
    name: 'Aminata Sow',
    role: 'Propriétaire',
    text: 'Grâce à Diene Immo, j\'ai vendu mon appartement en moins de 3 semaines au prix souhaité. Excellent accompagnement du début à la fin.',
    rating: 5,
  },
  {
    name: 'Ibrahim Ndiaye',
    role: 'Investisseur',
    text: 'Une agence sérieuse qui connaît parfaitement le marché dakarois. Leurs conseils m\'ont permis de faire un excellent investissement.',
    rating: 5,
  },
];

const stats = [
  { icon: Award, value: '10+', label: 'Années d\'expérience' },
  { icon: HomeIcon, value: '500+', label: 'Biens vendus' },
  { icon: Users, value: '1200+', label: 'Clients satisfaits' },
  { icon: Clock, value: '24h', label: 'Support client' },
];

export function Home() {
  return (
    <div className="bg-white">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Maison de luxe Diene Immo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/60 to-gray-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
              <span className="text-[#D30000] text-sm font-semibold tracking-widest uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Agence Immobilière de confiance
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-tight"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
            >
              À chacun{' '}
              <span className="text-[#D30000] italic">son toit</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-gray-200 text-lg sm:text-xl mb-10 leading-relaxed max-w-2xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Diene Immo vous accompagne dans tous vos projets immobiliers à Dakar. Vente, location, gérance : nous trouvons le bien qui correspond à vos rêves.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                to="/biens"
                className="flex items-center gap-2 bg-[#D30000] hover:bg-[#b00000] text-white px-7 py-3.5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Voir les biens
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/services"
                className="flex items-center gap-2 bg-white/15 backdrop-blur-sm hover:bg-white/25 border border-white/40 text-white px-7 py-3.5 rounded-lg font-semibold transition-all duration-200"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Demander un conseil
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 bg-[#0273A7] hover:bg-[#025e8a] text-white px-7 py-3.5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Phone size={18} />
                Nous contacter
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
       
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-[#0273A7] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 text-white"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{value}</div>
                  <div className="text-sm text-white/80" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRESENTATION ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#D30000] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  À propos de nous
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Votre partenaire{' '}
                <span className="text-[#0273A7]">de confiance</span>{' '}
                depuis plus de 10 ans
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Diene Immo est une agence immobilière implantée au cœur de Dakar, engagée à offrir des services premium à chaque client. Notre équipe de professionnels passionnés met son expertise au service de vos projets immobiliers.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Que vous cherchiez à acheter, vendre ou louer un bien, nous vous garantissons un accompagnement personnalisé, transparent et efficace à chaque étape de votre projet.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  'Connaissance approfondie du marché dakarois',
                  'Équipe certifiée et expérimentée',
                  'Réseau de partenaires de confiance',
                  'Accompagnement juridique et administratif',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#D30000] flex-shrink-0" />
                    <span className="text-gray-700 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/a-propos"
                className="inline-flex items-center gap-2 bg-[#D30000] hover:bg-[#b00000] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                En savoir plus <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758630737361-ca7532fb5e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbmN5JTIwb2ZmaWNlJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MjM3NjI3Mnww&ixlib=rb-4.1.0&q=80&w=800"
                  alt="Bureau Diene Immo"
                  className="w-full h-96 object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#D30000]/10 flex items-center justify-center">
                    <Award size={24} className="text-[#D30000]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>N°1</div>
                    <div className="text-xs text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>Agence de confiance</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES APERÇU ===== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#D30000] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Ce que nous faisons
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Nos <span className="text-[#D30000]">Services</span>
            </h2>
            <p className="text-gray-500 text-base max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Une gamme complète de services immobiliers pour répondre à tous vos besoins.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-gray-100"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon size={26} style={{ color }} />
                </div>
                <h3 className="text-xl text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>{desc}</p>
                <Link
                  to="/services"
                  className="flex items-center gap-1 text-sm font-semibold group/link transition-colors"
                  style={{ color, fontFamily: 'Poppins, sans-serif' }}
                >
                  En savoir plus
                  <ChevronRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border-2 border-[#0273A7] text-[#0273A7] hover:bg-[#0273A7] hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Tous nos services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BIENS RÉCENTS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#D30000] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Biens récents
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Nos dernières{' '}
                <span className="text-[#0273A7]">opportunités</span>
              </h2>
            </div>
            <Link
              to="/biens"
              className="flex items-center gap-2 text-[#D30000] font-semibold hover:gap-3 transition-all duration-200"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Voir tout le catalogue <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {recentProperties.map((prop) => (
              <motion.div
                key={prop.id}
                variants={fadeUp}
                className="group"
              >
                <Link
                  to={`/biens/${prop.id}`}
                  className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full"
                >
                  <div className="relative overflow-hidden h-56 flex-shrink-0">
                    <ImageWithFallback
                      src={prop.img}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span
                        className="text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
                        style={{ backgroundColor: prop.type === 'Vente' ? '#D30000' : '#0273A7', fontFamily: 'Poppins, sans-serif' }}
                      >
                        {prop.type}
                      </span>
                      <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {prop.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#D30000] transition-colors leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>{prop.title}</h3>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <MapPin size={13} className="text-[#D30000] flex-shrink-0" />
                      <span>{prop.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 text-xs mb-4 flex-wrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-lg">
                        <Maximize size={12} className="text-[#0273A7]" />
                        <span className="font-medium">{prop.surfaceLabel}</span>
                      </div>
                      {prop.bedrooms > 0 && (
                        <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-lg">
                          <Bed size={12} className="text-[#0273A7]" />
                          <span className="font-medium">{prop.bedrooms} ch.</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-lg">
                        <Bath size={12} className="text-[#0273A7]" />
                        <span className="font-medium">{prop.bathrooms} sdb</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <span className="text-[#D30000] font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{prop.priceLabel}</span>
                      <span className="inline-flex items-center gap-1.5 bg-gray-900 group-hover:bg-[#D30000] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors duration-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Voir détails <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#D30000] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Ils nous font confiance
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Témoignages <span className="text-[#D30000]">clients</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative"
              >
                <div className="text-[#D30000] text-5xl leading-none mb-4" style={{ fontFamily: 'Georgia, serif' }}>"</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>{t.text}</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="w-10 h-10 rounded-full bg-[#D30000]/10 flex items-center justify-center">
                    <span className="text-[#D30000] font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{t.name[0]}</span>
                  </div>
                  <div>
                    <div className="text-gray-900 font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{t.name}</div>
                    <div className="text-gray-500 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D30000] to-[#0273A7]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/20 translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Votre projet immobilier commence ici
            </h2>
            <p className="text-white/85 text-lg mb-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Contactez-nous dès aujourd'hui et laissez nos experts vous guider vers le bien de vos rêves.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="flex items-center gap-2 bg-white text-[#D30000] hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Phone size={18} />
                Nous contacter
              </Link>
              <Link
                to="/biens"
                className="flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold transition-all duration-200"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Voir les biens <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}