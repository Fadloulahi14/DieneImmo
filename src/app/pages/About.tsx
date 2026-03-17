import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Target, Eye, Heart, Trophy, Users, Building, Handshake,
  ArrowRight, CheckCircle2, Phone, Star
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const manImg = 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjM0OTIwNnww&ixlib=rb-4.1.0&q=80&w=400';
const womanImg = 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXQlMjBzbWlsZXxlbnwxfHx8fDE3NzIzNzYyNzR8MA&ixlib=rb-4.1.0&q=80&w=400';
const man2Img = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjM0OTIwNnww&ixlib=rb-4.1.0&q=80&w=400';
const woman2Img = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXQlMjBzbWlsZXxlbnwxfHx8fDE3NzIzNzYyNzR8MA&ixlib=rb-4.1.0&q=80&w=400';
const officeImg = 'https://images.unsplash.com/photo-1758630737361-ca7532fb5e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbmN5JTIwb2ZmaWNlJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MjM3NjI3Mnww&ixlib=rb-4.1.0&q=80&w=800';

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
    name: 'Mamadou Diene',
    role: 'Directeur Général et Fondateur',
    img: manImg,
    bio: 'Avec plus de 15 ans d\'expérience dans l\'immobilier dakarois, Mamadou a fondé Diene Immo avec la vision de rendre le marché immobilier accessible et transparent.',
  },
  {
    name: 'Fatou Diallo',
    role: 'Directrice Commerciale',
    img: womanImg,
    bio: 'Experte en négociation et en conseil client, Fatou apporte son excellence et sa passion pour l\'immobilier au service de chaque projet.',
  },
  {
    name: 'Ibrahima Ndiaye',
    role: 'Conseiller Immobilier Senior',
    img: man2Img,
    bio: 'Spécialiste des transactions immobilières haut de gamme, Ibrahima accompagne une clientèle premium avec discrétion et professionnalisme.',
  },
  {
    name: 'Aïssatou Sall',
    role: 'Gestionnaire de Patrimoine',
    img: woman2Img,
    bio: 'Aïssatou gère le patrimoine immobilier de nos clients propriétaires avec rigueur, optimisant la rentabilité et la valorisation des biens.',
  },
];

const milestones = [
  { year: '2013', title: 'Création de Diene Immo', desc: 'Fondation de l\'agence à Fann Hock, Dakar, avec une équipe de 3 personnes.' },
  { year: '2016', title: 'Expansion du réseau', desc: 'Développement d\'un réseau de partenaires couvrant tous les quartiers de Dakar.' },
  { year: '2019', title: '500ème transaction', desc: 'Diene Immo célèbre sa 500ème transaction immobilière réussie.' },
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
              Diene Immo, c'est plus de 10 ans d'expertise au service de votre patrimoine immobilier à Dakar.
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
                Une décennie au service{' '}
                <span className="text-[#0273A7]">de l'immobilier</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Fondée en 2013 par Mamadou Diene à Fann Hock, Dakar, notre agence est née d'une conviction simple : chaque Sénégalais mérite un accompagnement de qualité dans son projet immobilier.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Depuis nos débuts, nous avons construit une réputation solide basée sur la confiance, le professionnalisme et l'écoute de nos clients. Notre profonde connaissance du marché dakarois nous permet d'identifier les meilleures opportunités et de vous conseiller avec précision.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Aujourd'hui, Diene Immo est fière d'avoir accompagné plus de 1 200 clients dans leurs projets immobiliers, des premières acquisitions aux investissements les plus ambitieux.
              </p>

              <div className="grid grid-cols-3 gap-6">
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
                title: 'Notre Vision',
                color: '#0273A7',
                desc: 'Devenir l\'agence immobilière de référence au Sénégal, reconnue pour son expertise, son intégrité et son engagement envers l\'excellence. Nous voulons contribuer au développement du marché immobilier dakarois en offrant des services innovants et de qualité.',
                points: [
                  'Leader de l\'immobilier à Dakar',
                  'Innovation et digitalisation des services',
                  'Contribution au développement urbain',
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
              Notre <span className="text-[#0273A7]">expertise</span>
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
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
              Rejoignez la famille Diene Immo
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