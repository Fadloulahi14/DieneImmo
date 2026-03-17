import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Image as ImageIcon, CheckSquare } from 'lucide-react';
import { allProperties, categories, zones } from '../../data/properties';
import { AdminLayout } from '../../components/AdminLayout';

export function PropertyForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const existingProperty = isEdit ? allProperties.find((p) => p.id === Number(id)) : null;

  const [formData, setFormData] = useState({
    title: existingProperty?.title || '',
    type: (existingProperty?.type || 'Vente') as 'Vente' | 'Location',
    category: existingProperty?.category || 'Appartement',
    price: existingProperty?.price || 0,
    location: existingProperty?.location || '',
    zone: existingProperty?.zone || 'Almadies',
    surface: existingProperty?.surface || 0,
    bedrooms: existingProperty?.bedrooms || 0,
    bathrooms: existingProperty?.bathrooms || 1,
    description: existingProperty?.description || '',
    badge: existingProperty?.badge || '',
    featured: existingProperty?.featured || false,
    yearBuilt: existingProperty?.yearBuilt || new Date().getFullYear(),
    parking: existingProperty?.parking || 0,
    floor: existingProperty?.floor ?? '',
    availableFrom: existingProperty?.availableFrom || 'Immédiat',
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      navigate('/admin/properties');
    }, 1200);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const headerActions = (
    <button
      onClick={() => navigate('/admin/properties')}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors border border-gray-200 hover:border-gray-300 px-4 py-2 rounded-lg"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <ArrowLeft size={16} />
      Retour à la liste
    </button>
  );

  return (
    <AdminLayout
      title={isEdit ? 'Modifier le bien' : 'Nouveau bien'}
      subtitle={isEdit ? `Modification de : ${existingProperty?.title}` : 'Ajoutez un nouveau bien immobilier'}
      actions={headerActions}
    >
      <form onSubmit={handleSubmit} className="max-w-4xl">
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <CheckSquare size={20} className="text-green-500" />
            {isEdit ? 'Bien mis à jour avec succès !' : 'Nouveau bien créé avec succès !'} Redirection...
          </motion.div>
        )}

        <div className="space-y-6">
          {/* Images */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Images du bien
            </h2>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#D30000] transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-[#D30000]/10 flex items-center justify-center mx-auto mb-3 transition-colors">
                <ImageIcon size={22} className="text-gray-400 group-hover:text-[#D30000] transition-colors" />
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Cliquez pour télécharger ou glissez-déposez
              </p>
              <p className="text-xs text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
                PNG, JPG jusqu'à 10 MB · Max 5 images
              </p>
            </div>
          </div>

          {/* Informations principales */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Informations principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Titre */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Titre du bien <span className="text-[#D30000]">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Villa Moderne Almadies"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 text-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  required
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Type <span className="text-[#D30000]">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 text-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  required
                >
                  <option value="Vente">Vente</option>
                  <option value="Location">Location</option>
                </select>
              </div>

              {/* Catégorie */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Catégorie <span className="text-[#D30000]">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 text-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  required
                >
                  {categories.filter((c) => c !== 'Tous').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Prix */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Prix (FCFA) <span className="text-[#D30000]">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min={0}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 text-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  required
                />
              </div>

              {/* Badge */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Badge
                </label>
                <input
                  type="text"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  placeholder="Nouveau, Premium, Exclusif..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 text-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>
            </div>
          </div>

          {/* Localisation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Localisation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Adresse complète <span className="text-[#D30000]">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Ex: Les Almadies, Dakar"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 text-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Zone <span className="text-[#D30000]">*</span>
                </label>
                <select
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 text-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  required
                >
                  {zones.filter((z) => z !== 'Toutes').map((zone) => (
                    <option key={zone} value={zone}>{zone}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Disponible à partir de
                </label>
                <input
                  type="text"
                  name="availableFrom"
                  value={formData.availableFrom}
                  onChange={handleChange}
                  placeholder="Immédiat, 1er avril 2026..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 text-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>
            </div>
          </div>

          {/* Caractéristiques */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Caractéristiques
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                { label: 'Surface (m²)', name: 'surface', required: true },
                { label: 'Chambres', name: 'bedrooms', required: false },
                { label: 'Salles de bain', name: 'bathrooms', required: true },
                { label: 'Places parking', name: 'parking', required: false },
                { label: 'Étage', name: 'floor', required: false },
                { label: 'Année construction', name: 'yearBuilt', required: false },
              ].map(({ label, name, required }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {label} {required && <span className="text-[#D30000]">*</span>}
                  </label>
                  <input
                    type="number"
                    name={name}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                    min={0}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 text-sm"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    required={required}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Description
            </h2>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Décrivez le bien en détail : emplacement, qualité des finitions, environnement, points forts..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D30000]/30 focus:border-[#D30000] bg-gray-50 text-sm resize-none"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              required
            />
          </div>

          {/* Options */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`w-10 h-6 rounded-full transition-colors ${formData.featured ? 'bg-[#D30000]' : 'bg-gray-200'}`}
                />
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${formData.featured ? 'translate-x-4' : 'translate-x-0'}`}
                />
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Mettre en avant (Featured)
                </span>
                <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Ce bien apparaîtra dans les sections "biens mis en avant" du site
                </p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/admin/properties')}
              className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saved}
              className="flex items-center gap-2 bg-[#D30000] hover:bg-[#b00000] disabled:opacity-60 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-md hover:shadow-lg"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <Save size={18} />
              {isEdit ? 'Mettre à jour' : 'Créer le bien'}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}