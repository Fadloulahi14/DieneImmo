import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[#D30000]/30 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[#0273A7]/30 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-2xl"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[180px] font-bold leading-none text-white/10 mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            404
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-[#D30000] text-sm font-semibold tracking-widest uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Page introuvable
          </span>
        </div>

        <h1 className="text-4xl lg:text-5xl text-white mb-6 leading-tight font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Cette page <span className="text-[#D30000] italic">n'existe pas</span>
        </h1>

        <p className="text-gray-300 text-lg mb-12 max-w-md mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil pour continuer votre navigation.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#D30000] hover:bg-[#b00000] text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <Home size={18} />
            Retour à l'accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <ArrowLeft size={18} />
            Page précédente
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Vous cherchez quelque chose en particulier ?
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { to: '/biens', label: 'Biens disponibles' },
              { to: '/services', label: 'Nos services' },
              { to: '/a-propos', label: 'À propos' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }, i) => (
              <span key={to} className="flex items-center gap-3">
                {i > 0 && <span className="text-gray-600">•</span>}
                <Link
                  to={to}
                  className="text-[#0273A7] hover:text-white text-sm font-medium transition-colors"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}