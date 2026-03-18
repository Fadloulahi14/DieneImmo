import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams } from 'react-router';
import { MapPin, Maximize, Bed, Bath, Search, SlidersHorizontal, X, ArrowRight, Phone } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useProperties } from '../../lib/useProperties';
import { categories, zones } from '../../lib/api';

export function Properties() {
  const { properties: allProperties, loading } = useProperties();
  const [searchParams] = useSearchParams();
  const urlType = searchParams.get('type');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'Tous' | 'Vente' | 'Location'>(
    urlType === 'Vente' || urlType === 'Location' ? urlType : 'Tous'
  );
  const [categoryFilter, setCategoryFilter] = useState('Tous');
  const [zoneFilter, setZoneFilter] = useState('Toutes');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = allProperties.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'Tous' || p.type === typeFilter;
    const matchCategory = categoryFilter === 'Tous' || p.category === categoryFilter;
    const matchZone = zoneFilter === 'Toutes' || p.zone === zoneFilter;
    return matchSearch && matchType && matchCategory && matchZone;
  });

  const clearFilters = () => {
    setSearch('');
    setTypeFilter('Tous');
    setCategoryFilter('Tous');
    setZoneFilter('Toutes');
  };

  const activeFilters = [
    typeFilter !== 'Tous' && typeFilter,
    categoryFilter !== 'Tous' && categoryFilter,
    zoneFilter !== 'Toutes' && zoneFilter,
  ].filter(Boolean);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-[#0273A7]/30 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#D30000]/30 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#D30000] text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Notre catalogue
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl text-white mb-4 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Biens <span className="text-[#D30000] italic">Disponibles</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Découvrez notre sélection de biens immobiliers à Dakar, disponibles à la vente et à la location.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search + Filters Bar */}
      <section className="sticky top-[72px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un bien, une adresse..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              />
            </div>

            {/* Type Tabs */}
            <div className="flex rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
              {(['Tous', 'Vente', 'Location'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-4 py-2.5 text-sm font-semibold transition-colors ${typeFilter === t
                    ? 'bg-[#D30000] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors flex-shrink-0 ${showFilters ? 'bg-[#0273A7] text-white border-[#0273A7]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <SlidersHorizontal size={16} />
              Filtres
              {activeFilters.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#D30000] text-white text-xs flex items-center justify-center font-bold">
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 mt-3">
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Catégorie
                    </label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 bg-white font-medium"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* Zone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Zone
                    </label>
                    <select
                      value={zoneFilter}
                      onChange={(e) => setZoneFilter(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 bg-white font-medium"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {zones.map((z) => <option key={z}>{z}</option>)}
                    </select>
                  </div>

                  {/* Clear */}
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#D30000] transition-colors"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <X size={16} />
                      Réinitialiser les filtres
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Count + active filters */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <span className="font-bold text-gray-900">{filtered.length}</span> bien{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
            </p>
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((f, i) => (
                  <span key={i} className="text-xs bg-[#D30000]/10 text-[#D30000] px-3 py-1 rounded-full font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>

          {filtered.length === 0 || loading ? (
            <div className="text-center py-20">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-96" />
                  ))}
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                    <Search size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Aucun bien trouvé</h3>
                  <p className="text-gray-500 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Essayez de modifier vos critères de recherche.</p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 bg-[#D30000] hover:bg-[#b00000] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <X size={16} />
                    Réinitialiser les filtres
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((prop) => (
                <motion.div
                  key={prop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <Link
                    to={`/biens/${prop.id}`}
                    className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-56 flex-shrink-0">
                      <ImageWithFallback
                        src={prop.img}
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                      {/* Badges top-left */}
                      <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                        <span
                          className="text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
                          style={{ backgroundColor: prop.type === 'Vente' ? '#D30000' : '#0273A7', fontFamily: 'Poppins, sans-serif' }}
                        >
                          {prop.type}
                        </span>
                        {prop.badge && (
                          <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {prop.badge}
                          </span>
                        )}
                      </div>

                      {/* Category badge bottom-right */}
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-white/95 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {prop.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#D30000] transition-colors leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {prop.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <MapPin size={13} className="text-[#D30000] flex-shrink-0" />
                        <span>{prop.location}</span>
                      </div>

                      {/* Stats row */}
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 flex-wrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
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

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                        <div>
                          <span className="text-[#D30000] font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {prop.priceLabel}
                          </span>
                        </div>
                        <span
                          className="inline-flex items-center gap-1.5 bg-gray-900 group-hover:bg-[#D30000] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors duration-200"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          Voir détails <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Contact */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Vous ne trouvez pas ce que vous cherchez ?
            </h2>
            <p className="text-gray-500 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Contactez-nous et nous trouverons le bien parfait selon vos critères spécifiques.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#D30000] hover:bg-[#b00000] text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <Phone size={18} />
              Contacter un conseiller
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}