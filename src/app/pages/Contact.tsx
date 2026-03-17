import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Facebook, Instagram } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Notre Adresse',
      lines: ['Fann Hock rue 59 x 68', 'En face Canal 4, Dakar', 'Sénégal'],
      color: '#D30000',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      lines: ['+221 XX XXX XX XX', '+221 XX XXX XX XX'],
      color: '#0273A7',
    },
    {
      icon: Mail,
      title: 'Email',
      lines: ['contact@dieneimmo.sn', 'info@dieneimmo.sn'],
      color: '#D30000',
    },
    {
      icon: Clock,
      title: 'Horaires',
      lines: ['Lun. au Ven. : 08h00 à 18h00', 'Samedi : 09h00 à 14h00', 'Dimanche : Fermé'],
      color: '#0273A7',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#D30000]/30 blur-3xl" />
          <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-[#0273A7]/30 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#D30000] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Parlons de votre projet
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
              <span className="text-[#D30000] italic">Contactez</span>-nous
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans votre projet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map(({ icon: Icon, title, lines, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="text-gray-900 font-semibold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
                {lines.map((line, j) => (
                  <p key={j} className="text-gray-500 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>{line}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-3xl text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Envoyez-nous un message
                  </h2>
                  <p className="text-gray-500 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Remplissez le formulaire et nous vous répondrons dans les 24 heures.
                  </p>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Message envoyé !
                    </h3>
                    <p className="text-gray-500 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Merci pour votre message. Notre équipe vous contactera très prochainement.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ nom: '', email: '', telephone: '', sujet: '', message: '' }); }}
                      className="bg-[#D30000] text-white px-6 py-3 rounded-lg font-medium transition-colors hover:bg-[#b00000]"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Nom complet <span className="text-[#D30000]">*</span>
                        </label>
                        <input
                          type="text"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          required
                          placeholder="Votre nom"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Adresse email <span className="text-[#D30000]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="votre@email.com"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 transition-colors"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        placeholder="+221 XX XXX XX XX"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 transition-colors"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Sujet <span className="text-[#D30000]">*</span>
                      </label>
                      <select
                        name="sujet"
                        value={formData.sujet}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 transition-colors"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <option value="">Choisissez un sujet</option>
                        <option value="achat">Achat d'un bien</option>
                        <option value="vente">Vente d'un bien</option>
                        <option value="location">Location</option>
                        <option value="gerance">Gérance</option>
                        <option value="conseil">Conseil immobilier</option>
                        <option value="autre">Autre demande</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Message <span className="text-[#D30000]">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Décrivez votre projet immobilier..."
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 transition-colors resize-none"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full flex items-center justify-center gap-2 py-4 rounded-lg font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg
                        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#D30000] hover:bg-[#b00000] hover:-translate-y-0.5'}`}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Envoyer le message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Map + Info */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Map */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="text-xl text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Notre localisation
                  </h3>
                  <p className="text-gray-500 text-sm mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Fann Hock rue 59 x 68, En face Canal 4, Dakar
                  </p>
                </div>
                <div className="relative w-full h-72">
                  <iframe
                    title="Localisation Diene Immo - Fann Hock Dakar"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-17.4692%2C14.6908%2C-17.4592%2C14.6978&layer=mapnik&marker=14.6943%2C-17.4642"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#D30000]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin size={15} className="text-[#D30000]" />
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Fann Hock rue 59 x 68
                      </p>
                      <p className="text-gray-500 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        En face Canal 4, Dakar, Sénégal
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coordonnées Rapides */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl text-gray-900 mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Contactez-nous directement
                </h3>
                <div className="space-y-4">
                  <a href="tel:+221000000000" className="flex items-center gap-4 p-4 rounded-xl bg-[#D30000]/5 hover:bg-[#D30000]/10 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-[#D30000]/15 flex items-center justify-center">
                      <Phone size={18} className="text-[#D30000]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>Téléphone</div>
                      <div className="text-gray-800 font-medium text-sm group-hover:text-[#D30000] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>+221 XX XXX XX XX</div>
                    </div>
                  </a>
                  <a href="mailto:contact@dieneimmo.sn" className="flex items-center gap-4 p-4 rounded-xl bg-[#0273A7]/5 hover:bg-[#0273A7]/10 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-[#0273A7]/15 flex items-center justify-center">
                      <Mail size={18} className="text-[#0273A7]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>Email</div>
                      <div className="text-gray-800 font-medium text-sm group-hover:text-[#0273A7] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>contact@dieneimmo.sn</div>
                    </div>
                  </a>
                </div>

                {/* Social */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Suivez-nous sur les réseaux</p>
                  <div className="flex gap-3">
                    {[
                      { icon: <Facebook size={16} />, href: '#', color: '#1877F2' },
                      { icon: <Instagram size={16} />, href: '#', color: '#E1306C' },
                      {
                        icon: (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                          </svg>
                        ),
                        href: '#',
                        color: '#010101',
                      },
                    ].map(({ icon, href, color }, i) => (
                      <a
                        key={i}
                        href={href}
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 hover:border-transparent hover:text-white transition-all duration-200"
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = color;
                          (e.currentTarget as HTMLElement).style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = '';
                          (e.currentTarget as HTMLElement).style.color = '';
                        }}
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ rapide */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Questions <span className="text-[#D30000]">fréquentes</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: 'Quels sont vos délais de réponse ?',
                a: 'Nous nous engageons à répondre à toutes les demandes dans un délai de 24 heures ouvrables. Pour les urgences, n\'hésitez pas à nous appeler directement.',
              },
              {
                q: 'Proposez-vous des estimations gratuites ?',
                a: 'Oui, nous proposons des estimations gratuites pour votre bien immobilier. Contactez-nous pour prendre rendez-vous avec l\'un de nos experts.',
              },
              {
                q: 'Dans quelles zones intervenez-vous ?',
                a: 'Nous intervenons principalement à Dakar et ses environs : Plateau, Almadies, Fann, Mermoz, Ouakam, Point E, Liberté, Corniche, et plus encore.',
              },
              {
                q: 'Comment se déroule une transaction immobilière ?',
                a: 'Nous vous accompagnons à chaque étape : recherche, visites, négociation, vérifications juridiques et signature. Notre équipe gère tout pour vous.',
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <h4 className="text-gray-900 font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{faq.q}</h4>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}