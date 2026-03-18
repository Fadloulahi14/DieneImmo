import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Home, MessageSquare, TrendingUp, Eye, Plus,
  BarChart3, Calendar, DollarSign
} from 'lucide-react';
import { useProperties } from '../../../lib/useProperties';
import { AdminLayout } from '../../components/AdminLayout';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { properties: allProperties, loading } = useProperties();

  const stats = loading ? [] : [
    {
      label: 'Total Biens',
      value: allProperties.length.toString(),
      change: '+2 ce mois',
      icon: Home,
      color: '#D30000',
    },
    {
      label: 'Biens en Vente',
      value: allProperties.filter(p => p.type === 'Vente').length.toString(),
      change: `${Math.round(allProperties.filter(p => p.type === 'Vente').length / allProperties.length * 100)}% du total`,
      icon: DollarSign,
      color: '#0273A7',
    },
    {
      label: 'Biens en Location',
      value: allProperties.filter(p => p.type === 'Location').length.toString(),
      change: `${Math.round(allProperties.filter(p => p.type === 'Location').length / allProperties.length * 100)}% du total`,
      icon: TrendingUp,
      color: '#D30000',
    },
    {
      label: 'Demandes Contact',
      value: '24',
      change: '+8 cette semaine',
      icon: MessageSquare,
      color: '#0273A7',
    },
    {
      label: 'Visites Prévues',
      value: '12',
      change: 'Cette semaine',
      icon: Calendar,
      color: '#D30000',
    },
    {
      label: 'Vues Totales',
      value: '1 847',
      change: '+15% ce mois',
      icon: Eye,
      color: '#0273A7',
    },
  ];

  const recentActivities = [
    { type: 'Nouveau bien', title: 'Villa Moderne Almadies ajoutée', time: 'Il y a 2h', color: '#D30000' },
    { type: 'Demande', title: 'Contact reçu pour Penthouse Vue Mer', time: 'Il y a 3h', color: '#0273A7' },
    { type: 'Visite', title: 'Visite programmée pour Appartement Luxe Plateau', time: 'Il y a 5h', color: '#D30000' },
    { type: 'Modification', title: 'Prix mis à jour pour Duplex Moderne Ouakam', time: 'Il y a 1j', color: '#0273A7' },
    { type: 'Demande', title: 'Contact reçu pour Bureau Commercial', time: 'Il y a 1j', color: '#D30000' },
  ];

  const topProperties = loading ? [] : allProperties.slice(0, 5);

  const headerActions = (
    <button
      onClick={() => navigate('/admin/properties/new')}
      className="flex items-center gap-2 bg-[#D30000] hover:bg-[#b00000] text-white px-4 py-2.5 rounded-lg font-semibold transition-colors shadow-md"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <Plus size={18} />
      Nouveau bien
    </button>
  );

  return (
    <AdminLayout
      title="Tableau de bord"
      subtitle="Vue d'ensemble de votre activité"
      actions={headerActions}
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon size={22} style={{ color: stat.color }} />
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${stat.color}10`, color: stat.color, fontFamily: 'Poppins, sans-serif' }}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 size={18} className="text-[#D30000]" />
            <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Activités récentes
            </h2>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: activity.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {activity.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${activity.color}15`,
                        color: activity.color,
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      {activity.type}
                    </span>
                    <span className="text-xs text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Properties */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Home size={18} className="text-[#0273A7]" />
              <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Biens populaires
              </h2>
            </div>
            <button
              onClick={() => navigate('/admin/properties')}
              className="text-sm text-[#D30000] hover:underline font-medium"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Voir tout
            </button>
          </div>
          <div className="space-y-2">
            {topProperties.map((property) => (
              <div
                key={property.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                onClick={() => navigate(`/admin/properties/edit/${property.id}`)}
              >
                <div className="w-12 h-12 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                  <img src={property.img} alt={property.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm font-medium text-gray-900 truncate group-hover:text-[#D30000] transition-colors"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {property.title}
                  </div>
                  <div className="text-xs text-gray-500 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {property.location}
                  </div>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: property.type === 'Vente' ? '#D3000015' : '#0273A715',
                    color: property.type === 'Vente' ? '#D30000' : '#0273A7',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {property.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}