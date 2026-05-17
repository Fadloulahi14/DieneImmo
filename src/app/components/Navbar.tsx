import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/biens', label: 'Biens disponibles' },
  { href: '/investissement', label: 'Investissement' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="/images/logorouge.png" 
              alt="Diene Immo" 
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group
                    ${isActive
                      ? 'text-[#D30000]'
                      : 'text-gray-800 hover:text-[#D30000]'
                    }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#D30000] transition-all duration-300
                    ${isActive ? 'w-4/5' : 'w-0 group-hover:w-4/5'}`} />
                </Link>
              );
            })}
            <Link
              to="/admin/login"
              className="ml-2 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-[#D30000] border border-gray-200 hover:border-[#D30000]/40 transition-all duration-200"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <Lock size={13} />
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg transition-colors text-gray-800 hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white shadow-xl border-t border-gray-100 overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors
                      ${isActive
                        ? 'bg-[#D30000]/10 text-[#D30000]'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#D30000]'
                      }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}