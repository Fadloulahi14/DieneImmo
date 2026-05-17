import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { BarChart3, Building2, PlusCircle, LogOut, ExternalLink, Menu, X, Inbox, KeyRound, TrendingUp } from 'lucide-react';
import { getPropertyLeads } from '../../lib/api';

const navItems = [
  { icon: BarChart3,   label: 'Tableau de bord',   path: '/admin/dashboard',      badge: null },
  { icon: Building2,   label: 'Biens immobiliers',  path: '/admin/properties',     badge: null },
  { icon: PlusCircle,  label: 'Ajouter un bien',    path: '/admin/properties/new', badge: null },
  { icon: Inbox,       label: 'Demandes de vente',  path: '/admin/leads',          badge: 'leads' },
  { icon: TrendingUp,  label: 'Investisseurs',       path: '/admin/investisseur',   badge: null },
  { icon: KeyRound,    label: 'Suivi Loyers',        path: '/admin/loyers',         badge: null },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  headerExtra?: React.ReactNode;
}

export function AdminLayout({ children, title, subtitle, actions, headerExtra }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newLeads, setNewLeads] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('adminAuth') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    getPropertyLeads()
      .then(leads => setNewLeads(leads.filter(l => l.status === 'nouveau').length))
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    if (path === '/admin/properties') {
      return location.pathname.startsWith('/admin/properties') && !location.pathname.startsWith('/admin/leads');
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Simple fixed position */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen
          w-[260px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 
          text-white flex flex-col 
          shadow-2xl overflow-hidden
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 h-[72px] flex-shrink-0">
          <img 
            src="/images/logorouge.png" 
            alt="Diene Immo" 
            className="h-10 w-auto object-contain"
          />
          <div className="flex flex-col leading-none overflow-hidden">
            <span
              className="text-white font-bold text-lg truncate"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Diene <span className="text-[#D30000]">Immo</span>
            </span>
            <span className="text-gray-400 text-[10px] uppercase tracking-widest" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Administration
            </span>
          </div>
        </div>

        {/* Close button (mobile) */}
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-1 rounded-lg hover:bg-white/10"
        >
          <X size={20} />
        </button>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const badgeCount = item.badge === 'leads' ? newLeads : 0;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  active
                    ? 'bg-gradient-to-r from-[#D30000] to-[#b00000] text-white shadow-lg shadow-red-500/20'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Icon size={20} className={`flex-shrink-0 transition-transform ${!active && 'group-hover:scale-110'}`} />
                <span className="text-sm font-medium truncate flex-1 text-left">{item.label}</span>
                {badgeCount > 0 && (
                  <span className="flex-shrink-0 bg-[#D30000] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {badgeCount > 9 ? '9+' : badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Stats */}
        <div className="px-4 py-3 mx-3 mb-3 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 border border-white/5 flex-shrink-0">
          <div className="text-xs text-gray-400 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Statut du système</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-green-400 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Connecté</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 space-y-1 flex-shrink-0">
          <button
            onClick={() => window.open('/', '_blank')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <ExternalLink size={20} className="flex-shrink-0" />
            <span className="text-sm">Voir le site</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span className="text-sm">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 min-w-0 lg:ml-0">
        {/* Mobile header */}
        <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-10 px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Diene Immo</span>
          </div>
          <div className="w-10" />
        </header>

        {/* Desktop sticky page header */}
        <header className="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1
                className="text-2xl font-bold text-gray-900 truncate"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-gray-500 mt-0.5 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {subtitle}
                </p>
              )}
            </div>
            {actions && <div className="flex-shrink-0">{actions}</div>}
          </div>
          {headerExtra && (
            <div className="px-6 pb-4 border-t border-gray-100 pt-3">
              {headerExtra}
            </div>
          )}
        </header>

        {/* Mobile title */}
        <div className="lg:hidden px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
