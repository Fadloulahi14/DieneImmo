import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, MapPin, Maximize, Bed, Bath, Calendar, Car, Building2,
  CheckCircle2, Phone, Share2, Heart, Home, ArrowRight, X,
  ChevronLeft, ChevronRight, ZoomIn, Tag, Clock, MessageCircle
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { allProperties } from '../data/properties';

export function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = allProperties.find(p => p.id === Number(id));

  const [activeImg, setActiveImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <Home size={40} className="text-gray-400" />
          </div>
          <h1 className="text-3xl text-gray-900 mb-4 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Bien non trouvé
          </h1>
          <p className="text-gray-500 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Le bien que vous recherchez n'existe pas ou n'est plus disponible.
          </p>
          <Link
            to="/biens"
            className="inline-flex items-center gap-2 bg-[#D30000] hover:bg-[#b00000] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <ArrowLeft size={18} />
            Retour aux biens
          </Link>
        </div>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const prevLightbox = () => setLightboxIndex((i) => (i - 1 + property.images.length) % property.images.length);
  const nextLightbox = () => setLightboxIndex((i) => (i + 1) % property.images.length);

  const similarProperties = allProperties
    .filter(p => p.id !== property.id && (p.type === property.type || p.category === property.category))
    .slice(0, 3);

  const descLines = property.descriptionFull.split('\n\n');
  const shortDesc = descLines.slice(0, 2).join('\n\n');
  const hasMore = descLines.length > 2;

  return (
    <div className="bg-white min-h-screen">

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={() => setLightboxOpen(false)}
            >
              <X size={22} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
            >
              <ChevronLeft size={24} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              src={property.images[lightboxIndex]}
              alt={property.title}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {property.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`w-2 h-2 rounded-full transition-colors ${i === lightboxIndex ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky breadcrumb bar */}
      <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <button
                onClick={() => navigate('/biens')}
                className="flex items-center gap-1.5 text-gray-500 hover:text-[#D30000] transition-colors font-medium"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Biens disponibles</span>
                <span className="sm:hidden">Retour</span>
              </button>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-sm">
                {property.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 ${liked ? 'bg-[#D30000] border-[#D30000] text-white' : 'border-gray-200 text-gray-500 hover:border-[#D30000] hover:text-[#D30000]'}`}
              >
                <Heart size={14} fill={liked ? 'white' : 'none'} />
              </button>
              <button
                onClick={() => navigator.share ? navigator.share({ title: property.title, url: window.location.href }) : navigator.clipboard.writeText(window.location.href)}
                className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:border-[#0273A7] hover:text-[#0273A7] transition-all duration-200"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Gallery ─── */}
      <section className="bg-gray-50 pt-5 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 rounded-2xl overflow-hidden shadow-lg h-auto lg:h-[460px]">
            {/* Main image */}
            <div
              className="lg:col-span-3 relative overflow-hidden cursor-pointer group h-64 lg:h-full"
              onClick={() => openLightbox(0)}
            >
              <ImageWithFallback
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <ZoomIn size={26} className="text-white" />
                </div>
              </div>
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                <span
                  className="text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg"
                  style={{ backgroundColor: property.type === 'Vente' ? '#D30000' : '#0273A7', fontFamily: 'Poppins, sans-serif' }}
                >
                  {property.type}
                </span>
                {property.badge && (
                  <span className="bg-white text-gray-800 text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {property.badge}
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <ZoomIn size={12} />
                Voir toutes les photos
              </div>
            </div>

            {/* Thumbnails */}
            <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-2 h-32 lg:h-full">
              {property.images.slice(1, 3).map((img, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(i + 1)}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${property.title} ${i + 2}`}
                    className="w-full h-32 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                  {/* +N badge on last thumb if more images exist */}
                  {i === 1 && property.images.length > 3 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        +{property.images.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── Left column ── */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

                {/* Title block */}
                <div className="mb-8">
                  <span
                    className="inline-flex items-center gap-1.5 bg-[#D30000]/10 text-[#D30000] px-3 py-1 rounded-full text-sm font-semibold mb-3"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <Tag size={13} />
                    {property.category}
                  </span>
                  <h1 className="text-3xl lg:text-4xl text-gray-900 mb-3 font-bold leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <MapPin size={16} className="text-[#D30000] flex-shrink-0" />
                    <span>{property.location}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-gray-400">Réf. DI-{property.id.toString().padStart(4, '0')}</span>
                  </div>

                  {/* Price + availability */}
                  <div className="flex flex-wrap items-end gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>Prix</div>
                      <div className="text-3xl font-bold text-[#D30000]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {property.priceLabel}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      {property.availableFrom && (
                        <div className="flex items-center gap-1.5 text-sm bg-white border border-gray-200 rounded-xl px-3 py-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          <Clock size={14} className="text-[#0273A7]" />
                          <span className="text-gray-700">
                            {property.availableFrom === 'Immédiat'
                              ? 'Disponible immédiatement'
                              : property.availableFrom === 'Négociable'
                              ? 'Disponibilité négociable'
                              : `Dispo. le ${property.availableFrom}`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Key stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                  {[
                    { icon: Maximize, label: 'Surface', value: property.surfaceLabel, color: '#0273A7' },
                    ...(property.bedrooms > 0 ? [{ icon: Bed, label: 'Chambres', value: String(property.bedrooms), color: '#D30000' }] : []),
                    { icon: Bath, label: 'Salles de bain', value: String(property.bathrooms), color: '#0273A7' },
                    ...(property.parking && property.parking > 0 ? [{ icon: Car, label: 'Parking', value: String(property.parking), color: '#D30000' }] : []),
                  ].map(({ icon: Icon, label, value, color }, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 text-center hover:border-gray-200 hover:shadow-sm transition-all">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${color}12` }}>
                        <Icon size={20} style={{ color }} />
                      </div>
                      <div className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{value}</div>
                      <div className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Description du bien
                  </h2>
                  <div className="relative">
                    <div
                      className="text-gray-600 leading-relaxed whitespace-pre-line text-sm"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {showFullDesc ? property.descriptionFull : shortDesc}
                    </div>

                    {/* Fade-out gradient when collapsed */}
                    {!showFullDesc && hasMore && (
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                    )}
                  </div>

                  {hasMore && (
                    <button
                      onClick={() => setShowFullDesc(!showFullDesc)}
                      className="mt-3 inline-flex items-center gap-1.5 text-[#D30000] font-semibold text-sm hover:gap-2.5 transition-all duration-200"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {showFullDesc ? (
                        <>Lire moins <ChevronLeft size={15} className="rotate-90" /></>
                      ) : (
                        <>Lire la description complète <ChevronRight size={15} className="-rotate-0" /></>
                      )}
                    </button>
                  )}
                </div>

                {/* Divider */}
                <hr className="border-gray-100 mb-10" />

                {/* Features */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Équipements & prestations
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 bg-gray-50 hover:bg-[#D30000]/5 rounded-xl px-4 py-3 transition-colors group">
                        <CheckCircle2 size={17} className="text-[#D30000] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-gray-700 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-gray-100 mb-10" />

                {/* Technical info */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Informations techniques
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { icon: Tag, label: 'Référence', value: `DI-${property.id.toString().padStart(4, '0')}`, color: '#D30000' },
                      { icon: Maximize, label: 'Surface habitable', value: property.surfaceLabel, color: '#0273A7' },
                      { icon: Building2, label: 'Catégorie', value: property.category, color: '#D30000' },
                      ...(property.yearBuilt ? [{ icon: Calendar, label: 'Année de construction', value: String(property.yearBuilt), color: '#0273A7' }] : []),
                      ...(property.floor !== undefined ? [{ icon: Building2, label: 'Étage', value: property.floor === 0 ? 'Rez-de-chaussée' : `${property.floor}ème étage`, color: '#D30000' }] : []),
                      ...(property.parking !== undefined ? [{ icon: Car, label: 'Places de parking', value: property.parking === 0 ? 'Aucune' : String(property.parking), color: '#0273A7' }] : []),
                    ].map(({ icon: Icon, label, value, color }, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}12` }}>
                          <Icon size={15} style={{ color }} />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</div>
                          <div className="text-sm font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-gray-100 mb-10" />

                {/* Location map */}
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Localisation
                  </h2>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <MapPin size={16} className="text-[#D30000]" />
                    <span>{property.location}, Sénégal</span>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    <iframe
                      title={`Localisation ${property.title}`}
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-17.4692%2C14.6908%2C-17.4592%2C14.6978&layer=mapnik&marker=14.6943%2C-17.4642"
                      className="w-full h-60 border-0"
                      loading="lazy"
                    />
                    <div className="px-5 py-4 flex items-center gap-3 bg-white">
                      <div className="w-8 h-8 rounded-full bg-[#D30000]/10 flex items-center justify-center flex-shrink-0">
                        <MapPin size={14} className="text-[#D30000]" />
                      </div>
                      <div>
                        <p className="text-gray-800 text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {property.location}
                        </p>
                        <p className="text-gray-400 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Dakar, Sénégal — La position exacte sera communiquée lors de la visite
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── Right sidebar ── */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-[130px] space-y-5"
              >
                {/* Contact card */}
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Card header */}
                  <div className="px-6 pt-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#D30000] flex items-center justify-center flex-shrink-0">
                        <Home size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Diene Immo</p>
                        <p className="text-gray-400 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>Agence de confiance depuis 2013</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Intéressé par ce bien ?
                    </h3>
                    <p className="text-gray-400 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Notre conseiller vous répond dans les 2 heures.
                    </p>
                  </div>

                  {/* Price recap */}
                  <div className="px-6 py-4 bg-white/5">
                    <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>Prix affiché</div>
                    <div className="text-2xl font-bold text-[#D30000]" style={{ fontFamily: 'Poppins, sans-serif' }}>{property.priceLabel}</div>
                    {property.availableFrom && (
                      <div className="text-xs text-gray-400 mt-1 flex items-center gap-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <Clock size={11} />
                        {property.availableFrom === 'Immédiat' ? 'Disponible immédiatement'
                          : property.availableFrom === 'Négociable' ? 'Disponibilité à négocier'
                          : `Disponible le ${property.availableFrom}`}
                      </div>
                    )}
                  </div>

                  {/* Contact infos */}
                  <div className="px-6 py-4 space-y-3">
                    <a
                      href="tel:+221771234567"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Phone size={14} className="text-[#D30000]" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>Téléphone</div>
                        <div className="text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>+221 77 123 45 67</div>
                      </div>
                    </a>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <MapPin size={14} className="text-[#D30000]" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>Adresse</div>
                        <div className="text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Fann Hock rue 59 x 68</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <div className="px-6 pb-6 space-y-3">
                    <Link
                      to="/contact"
                      className="flex items-center justify-center gap-2 w-full bg-[#D30000] hover:bg-[#b00000] text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <Phone size={17} />
                      Demander une visite
                    </Link>
                    <a
                      href={`https://wa.me/221771234567?text=${encodeURIComponent(`Bonjour, je suis intéressé par le bien : ${property.title} (réf. DI-${property.id.toString().padStart(4,'0')}). Pouvez-vous me donner plus d'informations ?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-200"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Contacter sur WhatsApp
                    </a>
                    <Link
                      to="/contact"
                      className="flex items-center justify-center gap-2 w-full border border-white/20 hover:border-white/50 hover:bg-white/10 text-white px-6 py-3.5 rounded-xl font-medium transition-all duration-200"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <MessageCircle size={17} />
                      Envoyer un message
                    </Link>
                  </div>
                </div>

                {/* Financement card */}
                <div className="bg-[#0273A7]/8 rounded-2xl p-5 border border-[#0273A7]/20">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0273A7]/15 flex items-center justify-center flex-shrink-0">
                      <Building2 size={18} className="text-[#0273A7]" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Besoin d'un financement ?
                      </h4>
                      <p className="text-gray-500 text-sm mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Nous vous mettons en relation avec nos partenaires bancaires pour faciliter votre acquisition.
                      </p>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1.5 text-[#0273A7] text-sm font-semibold hover:gap-2.5 transition-all duration-200"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        En savoir plus <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Ref card */}
                <div className="bg-gray-50 rounded-xl px-5 py-3 flex items-center justify-between border border-gray-100">
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>Référence du bien</div>
                    <div className="text-gray-800 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>DI-{property.id.toString().padStart(4, '0')}</div>
                  </div>
                  <div className="text-xs text-gray-400 bg-white border border-gray-200 px-3 py-1.5 rounded-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {property.zone}
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Similar Properties ─── */}
      {similarProperties.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-[#D30000] text-sm font-semibold tracking-wider uppercase mb-2 block" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Recommandés
                </span>
                <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Biens <span className="text-[#D30000]">similaires</span>
                </h2>
              </div>
              <Link
                to="/biens"
                className="hidden sm:inline-flex items-center gap-1.5 text-[#D30000] font-semibold text-sm hover:gap-2.5 transition-all duration-200"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Voir tout <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <Link
                  key={p.id}
                  to={`/biens/${p.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="relative overflow-hidden h-52">
                    <ImageWithFallback
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span
                        className="text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md"
                        style={{ backgroundColor: p.type === 'Vente' ? '#D30000' : '#0273A7', fontFamily: 'Poppins, sans-serif' }}
                      >
                        {p.type}
                      </span>
                      {p.badge && (
                        <span className="bg-white/95 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {p.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#D30000] transition-colors leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <MapPin size={12} className="text-[#D30000]" />
                      {p.location}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1"><Maximize size={11} className="text-[#0273A7]" />{p.surfaceLabel}</span>
                      {p.bedrooms > 0 && <span className="flex items-center gap-1"><Bed size={11} className="text-[#0273A7]" />{p.bedrooms} ch.</span>}
                      <span className="flex items-center gap-1"><Bath size={11} className="text-[#0273A7]" />{p.bathrooms} sdb</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-[#D30000] font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {p.priceLabel}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-gray-900 group-hover:bg-[#D30000] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors duration-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Voir <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/biens"
                className="inline-flex items-center gap-2 bg-[#D30000] hover:bg-[#b00000] text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Voir tous nos biens disponibles
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
