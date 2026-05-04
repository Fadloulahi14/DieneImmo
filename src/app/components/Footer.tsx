import { Link } from 'react-router';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img 
                src="/images/logorouge.png" 
                alt="DIÈNE IMMOBILIER" 
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
              « À chacun son toit »
            </p>
            <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Votre partenaire de confiance pour tous vos projets immobiliers à Dakar et ses environs.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                {
                  href: '#',
                  icon: <Facebook size={16} className="text-white" />,
                },
                {
                  href: '#',
                  icon: <Instagram size={16} className="text-white" />,
                },
                {
                  href: '#',
                  icon: (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                    </svg>
                  ),
                },
              ].map(({ href, icon }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D30000] transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Liens Rapides */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Liens Rapides
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/services', label: 'Services' },
                { to: '/biens', label: 'Biens disponibles' },
                { to: '/a-propos', label: 'À propos' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-[#D30000] text-sm transition-colors duration-200 flex items-center gap-2 group"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#D30000] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Nos Services
            </h4>
            <ul className="space-y-3">
              {['Location', 'Vente', 'Achat', 'Gérance', 'Conseils immobiliers'].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-[#D30000] text-sm transition-colors duration-200 flex items-center gap-2 group"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#D30000] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#D30000] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Fann Hock rue 59 x 68<br />
                  En face Canal 4, Dakar
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#D30000] flex-shrink-0" />
                <a href="tel:+221000000000" className="text-gray-400 hover:text-white text-sm transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  +221 XX XXX XX XX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#D30000] flex-shrink-0" />
                <a href="mailto:contact@dieneimmo.sn" className="text-gray-400 hover:text-white text-sm transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  contact@dieneimmo.sn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
            © {year} Diene Immo. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              developper par Fadloullahi
            </p>
            <span className="text-gray-700">•</span>
            <Link
              to="/admin"
              className="text-gray-600 hover:text-[#D30000] text-xs transition-colors"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}