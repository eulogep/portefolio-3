import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const AnimatedIcon = ({
  icon: Icon,
  className,
  size = 20,
  animation = 'hover',
  color = 'currentColor',
  delay = 0,
  ...props
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Vérifier les préférences de motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEnd = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2;

    if (prefersReducedMotion || isLowEnd) {
      setShouldAnimate(false);
    }
  }, []);
  
  // Différents types d'animations
  const animations = {
    hover: {
      rest: { scale: 1, rotate: 0 },
      hover: { 
        scale: 1.1, 
        rotate: 5,
        transition: { duration: 0.2, ease: "easeOut" }
      },
      tap: { scale: 0.95 }
    },
    
    pulse: {
      animate: {
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }
    },
    
    spin: {
      animate: {
        rotate: 360
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
        delay
      }
    },
    
    bounce: {
      animate: {
        y: [0, -3, 0],
        scale: [1, 0.98, 1]
      },
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }
    },
    
    glow: {
      animate: {
        filter: [
          'drop-shadow(0 0 0px currentColor)',
          'drop-shadow(0 0 8px currentColor)',
          'drop-shadow(0 0 0px currentColor)'
        ]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }
    },
    
    shake: {
      animate: {
        x: [0, -1, 1, -1, 1, 0],
        rotate: [0, -1, 1, -1, 1, 0]
      },
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut",
        delay
      }
    },
    
    float: {
      animate: {
        y: [0, -2, 0],
        rotate: [0, 1, 0]
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }
    },
    
    morph: {
      animate: {
        scale: [1, 1.1, 0.9, 1],
        rotate: [0, 90, 180, 360]
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }
    },
    
    magnetic: {
      rest: { scale: 1, x: 0, y: 0 },
      hover: { 
        scale: 1.15,
        transition: { duration: 0.3, ease: "easeOut" }
      },
      tap: { scale: 0.9 }
    }
  };

  // Sélection de l'animation
  const currentAnimation = animations[animation] || animations.hover;

  // Version statique pour devices moins performants
  if (!shouldAnimate) {
    return (
      <div
        className={cn("inline-flex items-center justify-center", className)}
        style={{ color }}
        {...props}
      >
        <Icon size={size} />
      </div>
    );
  }

  // Si c'est une animation continue (pas hover/tap)
  if (animation !== 'hover' && animation !== 'magnetic') {
    return (
      <motion.div
        className={cn("inline-flex items-center justify-center performance-optimized", className)}
        animate={currentAnimation.animate}
        transition={currentAnimation.transition}
        style={{ color, willChange: 'transform' }}
        {...props}
      >
        <Icon size={size} />
      </motion.div>
    );
  }

  // Pour les animations hover/magnetic
  return (
    <motion.div
      className={cn("inline-flex items-center justify-center cursor-pointer", className)}
      variants={currentAnimation}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      style={{ color }}
      {...props}
    >
      <Icon size={size} />
      
      {/* Effet de particules pour magnetic */}
      {animation === 'magnetic' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-current rounded-full opacity-40"
              style={{
                left: `${30 + i * 20}%`,
                top: `${30 + i * 20}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
                x: [0, Math.random() * 10 - 5],
                y: [0, Math.random() * 10 - 5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AnimatedIcon;
