import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { optimizeAnimations } from '../utils/performance';

const OptimizedCosmicBackground = () => {
  const [deviceCapabilities, setDeviceCapabilities] = useState(null);

  useEffect(() => {
    const capabilities = optimizeAnimations();
    setDeviceCapabilities(capabilities);
  }, []);

  // Calcul optimisé du nombre d'étoiles selon les capacités
  const starCount = useMemo(() => {
    if (!deviceCapabilities) return 50; // Valeur par défaut
    
    if (deviceCapabilities.isLowEnd) return 20;
    if (deviceCapabilities.reducedMotion) return 30;
    return 80; // Réduit de 100 à 80 pour de meilleures performances
  }, [deviceCapabilities]);

  // Configuration des animations selon les capacités
  const animationConfig = useMemo(() => {
    if (!deviceCapabilities) return {};
    
    if (deviceCapabilities.isLowEnd) {
      return {
        duration: 40, // Plus lent
        blur: 'blur-xl', // Moins de blur
        opacity: 0.05
      };
    }
    
    if (deviceCapabilities.reducedMotion) {
      return {
        duration: 60,
        blur: 'blur-2xl',
        opacity: 0.08
      };
    }
    
    return {
      duration: 20,
      blur: 'blur-3xl',
      opacity: 0.1
    };
  }, [deviceCapabilities]);

  // Ne pas rendre si les données ne sont pas encore chargées
  if (!deviceCapabilities) return null;

  return (
    <div className="fixed inset-0 z-0 will-change-transform">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900" />
      
      {/* Étoiles optimisées */}
      {!deviceCapabilities.reducedMotion && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: starCount }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: deviceCapabilities.isLowEnd 
                  ? 'none' 
                  : `twinkle ${2 + Math.random() * 2}s infinite ${Math.random() * 3}s`,
                willChange: 'opacity'
              }}
            />
          ))}
        </div>
      )}

      {/* Nébuleuses optimisées */}
      {!deviceCapabilities.reducedMotion && (
        <>
          <motion.div
            className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/${Math.round(animationConfig.opacity * 100)} to-purple-400/${Math.round(animationConfig.opacity * 100)} rounded-full ${animationConfig.blur}`}
            animate={deviceCapabilities.isLowEnd ? {} : {
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: animationConfig.duration,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ willChange: 'transform' }}
          />
          
          <motion.div
            className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/${Math.round(animationConfig.opacity * 100)} to-pink-400/${Math.round(animationConfig.opacity * 100)} rounded-full ${animationConfig.blur}`}
            animate={deviceCapabilities.isLowEnd ? {} : {
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: animationConfig.duration + 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ willChange: 'transform' }}
          />
        </>
      )}

      {/* Version statique pour motion réduite */}
      {deviceCapabilities.reducedMotion && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-purple-400/5 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-2xl" />
        </div>
      )}
    </div>
  );
};

export default OptimizedCosmicBackground;
