import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Target, Eye, Heart, Trophy, Users, Building, Handshake,
  ArrowRight, CheckCircle2, Phone, Star
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const manImg = '/images/immo2.jpeg';
const womanImg = '/images/immo1.jpeg';
const officeImg = '/images/immo3.jpeg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const values = [
  { icon: Heart, title: 'Confiance', desc: 'Nous construisons des relations durables basées sur la transparence et l\'honnêteté avec chacun de nos clients.', color: '#D30000' },
  { icon: Trophy, title: 'Excellence', desc: 'Nous visons l\'excellence dans chaque prestation, en offrant des services de qualité premium à tous nos clients.', color: '#0273A7' },
  { icon: Handshake, title: 'Engagement', desc: 'Nous nous engageons pleinement dans chaque projet, de la première consultation jusqu\'à la signature finale.', color: '#D30000' },
  { icon: Users, title: 'Proximité', desc: 'Nous sommes à l\'écoute de vos besoins et adaptons nos services pour vous offrir la meilleure expérience possible.', color: '#0273A7' },
  { icon: Building, title: 'Expertise', desc: 'Fort de plus de 10 ans d\'expérience sur le marché dakarois, notre expertise est votre meilleur atout.', color: '#D30000' },
  { icon: Eye, title: 'Vision', desc: 'Nous anticipons les tendances du marché pour vous proposer les meilleures opportunités au bon moment.', color: '#0273A7' },
];

const team = [
  {
    name: 'Elhadji Diene',
    role: 'Directeur Général et Fondateur',
    img: manImg,
    bio: 'Fondateur de DIÈNE IMMOBILIER, courtier chevronné reconnu dans le milieu immobilier sénégalais avec plus de 10 ans d\'expérience.',
  },
  {
    name: 'Ndeye Saly & Thierno',
    role: 'Comptable et Commerciale / Courtier collaborateur',
    img: womanImg,
    bio: 'Experte en gestion comptable et commerciale, elle accompagne nos clients avec rigueur et professionnalisme.',
  }
];

const milestones = [
  { year: '2010', title: 'Création de DIÈNE IMMOBILIER', desc: 'Fondation de l\'agence par Monsieur Elhadji Diene, courtier reconnu dans le milieu immobilier sénégalais.' },
  { year: '2015', title: 'Expansion du réseau', desc: 'Développement d\'un réseau de partenaires couvrant tous les quartiers de Dakar.' },
  { year: '2018', title: '500ème transaction', desc: 'DIÈNE IMMOBILIER célèbre sa 500ème transaction immobilière réussie.' },
  { year: '2022', title: 'Certification nationale', desc: 'Obtention de la certification d\'excellence des agences immobilières du Sénégal.' },
  { year: '2024', title: '1200+ clients satisfaits', desc: 'Plus de 1200 familles et investisseurs ont fait confiance à notre expertise.' },
];

export function About() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#D30000]/30 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-[#0273A7]/30 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#D30000] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Notre histoire
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
              À <span className="text-[#D30000] italic">propos</span> de nous
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              DIÈNE IMMOBILIER, c'est plus de 10 ans d'expertise au service de votre patrimoine immobilier à Dakar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Histoire */}
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
                  Notre histoire
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                DIÈNE <span className="text-[#0273A7]">IMMOBILIER</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                DIÈNE IMMOBILIER, anciennement D.I.S, est une agence immobilière fondée dans les années 2010 par Monsieur Elhadji Diene, un courtier chevronné reconnu dans le milieu immobilier sénégalais.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Grâce à son expérience de terrain, son sens du relationnel et sa grande disponibilité, Mr Elhadji Diene s'est imposé au fil des années comme un acteur respecté et très appréciée par ses clients. Sa sympathie, sa rigueur et son professionnalisme lui ont permis de bâtir une solide réputation dans le secteur.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Depuis sa création, DIÈNE IMMOBILIER accompagne particuliers et investisseurs dans leurs projets immobiliers avec sérieux et transparence. L'agence intervene dans plusieurs domaines :
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#D30000]" />
                  <span className="text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Achat et vente de biens immobiliers</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#D30000]" />
                  <span className="text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Location d'appartements, maisons et locaux commerciaux</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#D30000]" />
                  <span className="text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Gestion immobilière</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#D30000]" />
                  <span className="text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Conseil et accompagnement immobilier</span>
                </li>
              </ul>

              <div className="bg-gray-50 rounded-2xl p-6 border-l-4 border-[#D30000]">
                <p className="text-gray-800 font-semibold italic" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  "À chacun son Toit"
                </p>
                <p className="text-gray-600 text-sm mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Notre mission est simple : aider chacun à trouver le bien qui lui correspond, tout en garantissant sécurité, confiance et rentabilité.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-8">
                {[
                  { value: '10+', label: 'Années d\'expérience' },
                  { value: '500+', label: 'Biens vendus' },
                  { value: '1200+', label: 'Clients satisfaits' },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-3xl font-bold text-[#D30000] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{stat.value}</div>
                    <div className="text-xs text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={officeImg}
                  alt="Bureau Diene Immo"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: 'Notre Mission',
                color: '#D30000',
                desc: 'Accompagner chaque client dans la réalisation de son projet immobilier avec professionnalisme, transparence et dévouement. Nous nous engageons à rendre l\'immobilier accessible à tous, en offrant des services sur mesure adaptés à chaque situation.',
                points: [
                  'Conseil personnalisé et adapté',
                  'Transparence totale dans les transactions',
                  'Accompagnement de A à Z',
                ],
              },
              {
                icon: Eye,
                title: 'Notre Devise',
                color: '#0273A7',
                desc: '"À chacun son Toit" - Notre mission est simple : aider chacun à trouver le bien qui lui correspond, tout en garantissant sécurité, confiance et rentabilité.',
                points: [
                  'DIÈNE IMMOBILIER met son expertise à votre service',
                  'Un réseau au service de votre patrimoine',
                  'Garantie de confiance et de transparence',
                ],
              },
            ].map(({ icon: Icon, title, color, desc, points }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon size={28} style={{ color }} />
                </div>
                <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>{desc}</p>
                <ul className="space-y-2">
                  {points.map((p, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <CheckCircle2 size={15} style={{ color }} />
                      <span className="text-gray-700 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#D30000] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Ce qui nous définit
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Nos <span className="text-[#D30000]">Valeurs</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-7 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 group bg-white"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="text-xl text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#D30000] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Notre parcours
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Notre <span className="text-[#0273A7]">parcours</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div
                      className="inline-block bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                    >
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{ color: i % 2 === 0 ? '#D30000' : '#0273A7', fontFamily: 'Poppins, sans-serif' }}
                      >
                        {m.year}
                      </div>
                      <h4 className="text-gray-900 font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{m.title}</h4>
                      <p className="text-gray-500 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>{m.desc}</p>
                    </div>
                  </div>
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 z-10 border-4 border-white shadow-md"
                    style={{ backgroundColor: i % 2 === 0 ? '#D30000' : '#0273A7' }}
                  />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#D30000] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                L'équipe
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Des <span className="text-[#D30000]">experts</span> à votre service
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Notre équipe de professionnels passionnés est dédiée à la réussite de vos projets immobiliers.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {team.map((member, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-5 shadow-md">
                  <ImageWithFallback
                    src={member.img}
                    alt={member.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>{member.bio}</p>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{member.name}</h3>
                  <p className="text-[#0273A7] text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>{member.role}</p>
                  <div className="flex justify-center gap-1 mt-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-[#D30000] to-[#0273A7]">
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Rejoignez la famille DIÈNE IMMOBILIER
            </h2>
            <p className="text-white/85 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Confiez-nous votre projet immobilier et bénéficiez de l'expertise de notre équipe dédiée.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#D30000] hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition-all duration-200 shadow-lg"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Phone size={18} />
                Nous contacter
              </Link>
              <Link
                to="/biens"
                className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold transition-all duration-200"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Voir nos biens <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}