import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/biens', label: 'Biens disponibles' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navBg = scrolled || !isHome
    ? 'bg-white shadow-lg'
    : 'bg-transparent';

  const textColor = scrolled || !isHome ? 'text-gray-800' : 'text-white';
  const logoColor = scrolled || !isHome ? 'text-[#D30000]' : 'text-white';
  const logoSubColor = scrolled || !isHome ? 'text-[#0273A7]' : 'text-white/90';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-[#D30000] flex items-center justify-center flex-shrink-0 shadow-md group-hover:bg-[#0273A7] transition-colors duration-300">
              <Home size={20} className="text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${logoColor}`}
                style={{ fontFamily: 'Poppins, sans-serif' }}>
                Diene
                <span className={`transition-colors duration-300 ${scrolled || !isHome ? 'text-[#0273A7]' : 'text-white/80'}`}> Immo</span>
              </span>
              <span className={`text-[10px] tracking-widest uppercase transition-colors duration-300 ${logoSubColor}`}
                style={{ fontFamily: 'Poppins, sans-serif' }}>
                Agence Immobilière
              </span>
            </div>
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
                      : `${textColor} hover:text-[#D30000]`
                    }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#D30000] transition-all duration-300
                    ${isActive ? 'w-4/5' : 'w-0 group-hover:w-4/5'}`} />
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${textColor} hover:bg-white/10`}
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