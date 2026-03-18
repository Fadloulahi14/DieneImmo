import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Key, Home, TrendingUp, ShieldCheck, Lightbulb,
  ArrowRight, CheckCircle2, Phone, Star
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const services = [
  {
    icon: Key,
    title: 'Location',
    color: '#D30000',
    bgColor: '#D3000015',
    desc: 'Nous vous accompagnons dans la recherche de votre logement en location, qu\'il s\'agisse d\'un appartement, d\'une villa ou d\'un local commercial. Notre portefeuille de biens est régulièrement mis à jour pour vous offrir les meilleures opportunités.',
    features: [
      'Recherche personnalisée selon vos critères',
      'Visites organisées avec flexibilité',
      'Rédaction et vérification du contrat de bail',
      'État des lieux professionnel',
      'Suivi après emménagement',
    ],
    cta: 'Trouver une location',
    link: '/biens?type=Location',
  },
  {
    icon: Home,
    title: 'Vente',
    color: '#0273A7',
    bgColor: '#0273A715',
    desc: 'Vous souhaitez vendre votre bien immobilier ? Notre équipe met son expertise au service de votre projet pour obtenir le meilleur prix dans les meilleurs délais. Nous prenons en charge l\'ensemble du processus de mise en vente.',
    features: [
      'Estimation gratuite et précise de votre bien',
      'Stratégie de commercialisation ciblée',
      'Photos professionnelles et visites virtuelles',
      'Sélection des acquéreurs sérieux',
      'Accompagnement jusqu\'à la signature',
    ],
    cta: 'Vendre mon bien',
    link: '/contact',
  },
  {
    icon: TrendingUp,
    title: 'Achat',
    color: '#D30000',
    bgColor: '#D3000015',
    desc: 'Investir dans l\'immobilier est une décision importante. Nos experts vous guident à chaque étape, de la définition de votre projet jusqu\'à la signature de l\'acte authentique, en vous assurant la meilleure transaction possible.',
    features: [
      'Analyse de vos besoins et budget',
      'Sélection de biens correspondant à vos critères',
      'Négociation du prix en votre faveur',
      'Vérification juridique du bien',
      'Assistance au financement',
    ],
    cta: 'Acheter un bien',
    link: '/biens?type=Vente',
  },
  {
    icon: ShieldCheck,
    title: 'Gérance',
    color: '#0273A7',
    bgColor: '#0273A715',
    desc: 'Confiez la gestion de vos biens immobiliers à notre équipe de professionnels. Nous nous occupons de tout : recherche de locataires, encaissement des loyers, entretien, et suivi administratif, pour vous garantir une tranquillité totale.',
    features: [
      'Recherche et sélection des locataires',
      'Encaissement et reversement des loyers',
      'Gestion des travaux et entretien',
      'Suivi des obligations légales',
      'Reporting mensuel détaillé',
    ],
    cta: 'Confier mon bien',
    link: '/contact',
  },
  {
    icon: Lightbulb,
    title: 'Conseils Immobiliers',
    color: '#D30000',
    bgColor: '#D3000015',
    desc: 'Notre expertise du marché immobilier dakarois nous permet de vous offrir des conseils personnalisés et stratégiques pour optimiser vos investissements ou prendre les meilleures décisions pour votre patrimoine immobilier.',
    features: [
      'Analyse du marché immobilier local',
      'Conseil en investissement locatif',
      'Optimisation fiscale immobilière',
      'Évaluation de la rentabilité',
      'Accompagnement en défiscalisation',
    ],
    cta: 'Demander un conseil',
    link: '/contact',
  },
];

const processSteps = [
  { num: '01', title: 'Contact Initial', desc: 'Prenez rendez-vous avec l\'un de nos conseillers pour discuter de votre projet.' },
  { num: '02', title: 'Analyse du Besoin', desc: 'Nous étudions votre situation et définissons ensemble la meilleure stratégie.' },
  { num: '03', title: 'Proposition', desc: 'Nous vous soumettons une sélection de biens ou solutions adaptés à vos critères.' },
  { num: '04', title: 'Concrétisation', desc: 'Nous vous accompagnons jusqu\'à la signature pour finaliser votre projet.' },
];

export function Services() {
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
                Ce que nous proposons
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
              Nos <span className="text-[#D30000] italic">Services</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Une gamme complète de services immobiliers pensés pour vous offrir la meilleure expérience à chaque étape de votre projet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16"
          >
            {services.map((service, i) => {
              const Icon = service.icon;
              const isEven = i % 2 === 1;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  {/* Content */}
                  <div className={isEven ? 'lg:col-start-2' : ''}>
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: service.bgColor }}
                    >
                      <Icon size={30} style={{ color: service.color }} />
                    </div>
                    <h2 className="text-4xl text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {service.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {service.desc}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <CheckCircle2 size={17} style={{ color: service.color }} className="flex-shrink-0" />
                          <span className="text-gray-700 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      style={{ backgroundColor: service.color, fontFamily: 'Poppins, sans-serif' }}
                    >
                      {service.cta} <ArrowRight size={18} />
                    </Link>
                  </div>

                  {/* Card Visual */}
                  <div className={`${isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div
                      className="rounded-3xl p-10 relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)` }}
                    >
                      <div
                        className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 -translate-y-1/4 translate-x-1/4"
                        style={{ backgroundColor: service.color }}
                      />
                      <div className="relative z-10 text-center py-8">
                        <div
                          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                          style={{ backgroundColor: service.color }}
                        >
                          <Icon size={44} className="text-white" />
                        </div>
                        <h3 className="text-3xl text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {service.title}
                        </h3>
                        <div className="flex justify-center gap-1 mt-4">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-500 text-sm mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Service 5 étoiles</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process */}
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
                Comment ça marche
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Notre <span className="text-[#0273A7]">processus</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-[#D30000] text-white flex items-center justify-center mx-auto mb-5 text-xl font-bold shadow-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {step.num}
                  </div>
                  <h3 className="text-xl text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-[#D30000] to-[#0273A7]">
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-white/85 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Contactez-nous dès maintenant pour une consultation gratuite avec l'un de nos experts.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#D30000] hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition-all duration-200 shadow-lg"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <Phone size={18} />
              Contacter un expert
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}