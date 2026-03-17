import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { Home, BarChart3, Building2, LogOut, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const navItems = [
  { icon: BarChart3, label: 'Tableau de bord', path: '/admin/dashboard' },
  { icon: Building2, label: 'Biens immobiliers', path: '/admin/properties' },
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
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('adminSidebarOpen');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    if (localStorage.getItem('adminAuth') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleToggle = () => {
    const next = !sidebarOpen;
    setSidebarOpen(next);
    localStorage.setItem('adminSidebarOpen', String(next));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    if (path === '/admin/properties') {
      return location.pathname.startsWith('/admin/properties');
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 72 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="bg-gradient-to-b from-gray-900 to-gray-800 text-white flex-shrink-0 flex flex-col overflow-hidden"
        style={{ minHeight: '100vh', height: '100%', position: 'relative' }}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 min-h-[72px]">
          <div className="w-9 h-9 rounded-lg bg-[#D30000] flex items-center justify-center flex-shrink-0 shadow-md">
            <Home size={17} className="text-white" />
          </div>
          {sidebarOpen && (
            <div className="flex flex-col leading-none overflow-hidden">
              <span
                className="text-white font-bold truncate"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem' }}
              >
                Diene <span className="text-[#0273A7]">Immo</span>
              </span>
              <span className="text-gray-400 text-[10px] uppercase tracking-widest" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Administration
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                title={!sidebarOpen ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  active
                    ? 'bg-[#D30000] text-white shadow-lg shadow-red-900/30'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <button
            onClick={() => window.open('/', '_blank')}
            title={!sidebarOpen ? 'Voir le site' : undefined}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <ExternalLink size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Voir le site</span>}
          </button>
          <button
            onClick={handleLogout}
            title={!sidebarOpen ? 'Déconnexion' : undefined}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Déconnexion</span>}
          </button>
        </div>

        {/* Toggle button */}
        <button
          onClick={handleToggle}
          className="absolute -right-3 top-[68px] w-6 h-6 bg-gray-700 hover:bg-[#D30000] border border-white/10 rounded-full flex items-center justify-center text-white transition-colors shadow-md z-10"
          title={sidebarOpen ? 'Réduire' : 'Agrandir'}
        >
          {sidebarOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        </button>
      </motion.aside>

      {/* Main area */}
      <div className="flex-1 overflow-auto min-w-0">
        {/* Sticky page header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
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

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}