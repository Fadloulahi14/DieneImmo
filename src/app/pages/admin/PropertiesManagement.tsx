import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Plus, Edit, Trash2, Eye, CheckCircle, MapPin,
} from 'lucide-react';
import { allProperties } from '../../data/properties';
import { AdminLayout } from '../../components/AdminLayout';

export function PropertiesManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'Tous' | 'Vente' | 'Location'>('Tous');
  const [properties, setProperties] = useState(allProperties);

  const filteredProperties = properties.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'Tous' || p.type === typeFilter;
    return matchSearch && matchType;
  });

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
      setProperties(properties.filter((p) => p.id !== id));
    }
  };

  const headerActions = (
    <button
      onClick={() => navigate('/admin/properties/new')}
      className="flex items-center gap-2 bg-[#D30000] hover:bg-[#b00000] text-white px-4 py-2.5 rounded-lg font-semibold transition-colors shadow-md"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <Plus size={18} />
      Ajouter un bien
    </button>
  );

  const headerExtra = (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher par titre, adresse..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        />
      </div>
      <div className="flex rounded-lg border border-gray-200 overflow-hidden">
        {(['Tous', 'Vente', 'Location'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              typeFilter === t ? 'bg-[#D30000] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <AdminLayout
      title="Gestion des biens"
      subtitle={`${filteredProperties.length} bien${filteredProperties.length !== 1 ? 's' : ''} trouvé${filteredProperties.length !== 1 ? 's' : ''}`}
      actions={headerActions}
      headerExtra={headerExtra}
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Bien', 'Type', 'Prix', 'Localisation', 'Catégorie', 'Actions'].map((h, i) => (
                  <th
                    key={h}
                    className={`px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider ${i === 5 ? 'text-right' : 'text-left'}`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence>
                {filteredProperties.map((property) => (
                  <motion.tr
                    key={property.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Bien */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                          <img
                            src={property.img}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div
                            className="text-sm font-semibold text-gray-900 truncate max-w-[200px]"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            {property.title}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Réf. DI-{property.id.toString().padStart(4, '0')} · {property.surfaceLabel}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: property.type === 'Vente' ? '#D3000015' : '#0273A715',
                          color: property.type === 'Vente' ? '#D30000' : '#0273A7',
                          fontFamily: 'Poppins, sans-serif',
                        }}
                      >
                        {property.type}
                      </span>
                    </td>

                    {/* Prix */}
                    <td className="px-5 py-4">
                      <div
                        className="text-sm font-bold text-gray-900"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {property.priceLabel}
                      </div>
                    </td>

                    {/* Localisation */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <MapPin size={13} className="text-[#D30000] flex-shrink-0" />
                        <span className="truncate max-w-[160px]">{property.location}</span>
                      </div>
                    </td>

                    {/* Catégorie */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                        <CheckCircle size={13} className="text-green-500" />
                        <span style={{ fontFamily: 'Poppins, sans-serif' }}>{property.category}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => window.open(`/biens/${property.id}`, '_blank')}
                          className="p-2 hover:bg-[#0273A7]/10 rounded-lg transition-colors text-gray-500 hover:text-[#0273A7]"
                          title="Voir sur le site"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/properties/edit/${property.id}`)}
                          className="p-2 hover:bg-[#D30000]/10 rounded-lg transition-colors text-gray-500 hover:text-[#D30000]"
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-500 hover:text-red-600"
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search size={26} className="text-gray-400" />
            </div>
            <h3 className="text-lg text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Aucun bien trouvé
            </h3>
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}