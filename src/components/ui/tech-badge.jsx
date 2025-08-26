import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const TechBadge = ({ 
  tech, 
  className, 
  size = 'md',
  glowColor = '#00ffff'
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-xl',
    lg: 'w-20 h-20 text-2xl'
  };

  const techConfigs = {
    JS: {
      color: '#f7df1e',
      bgColor: '#323330',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="currentColor" d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.775l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-.998l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z"/>
        </svg>
      )
    },
    PY: {
      color: '#3776ab',
      bgColor: '#ffd43b',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="currentColor" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.58-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.58.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
        </svg>
      )
    },
    AI: {
      color: '#ff6b6b',
      bgColor: '#4ecdc4',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.7"/>
        </svg>
      )
    }
  };

  const config = techConfigs[tech] || techConfigs.JS;

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl font-bold flex items-center justify-center cursor-pointer overflow-hidden shadow-lg",
        sizeClasses[size],
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${config.color}, ${config.bgColor})`,
        boxShadow: `0 0 20px ${config.color}40`
      }}
      whileHover={{ 
        scale: 1.1,
        rotateY: 15,
        z: 50
      }}
      whileTap={{ scale: 0.95 }}
      animate={{
        y: [0, -5, 0],
        rotateX: [0, 5, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Fond avec dégradé animé */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background: `conic-gradient(from 0deg, ${config.color}, ${config.bgColor}, ${config.color})`
        }}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Overlay brillant */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white">
        <motion.div
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {config.icon}
        </motion.div>
        <motion.span
          className="font-black mt-1"
          animate={{
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {tech}
        </motion.span>
      </div>

      {/* Particules qui flottent */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${20 + i * 20}%`,
            top: `${20 + i * 15}%`
          }}
          animate={{
            y: [-10, -20, -10],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Bordure lumineuse */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-white/30"
        animate={{
          borderColor: [`${config.color}30`, `${config.bgColor}30`, `${config.color}30`]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default TechBadge;
