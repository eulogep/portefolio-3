import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import useSmartAnimations from '@/hooks/useSmartAnimations';

// Wrapper optimisé pour les animations Framer Motion
const OptimizedMotion = forwardRef(({ 
  children, 
  className, 
  animation = 'fadeIn',
  delay = 0,
  duration,
  shouldAnimate = true,
  viewport = { once: true },
  ...props 
}, ref) => {
  const { shouldAnimate: deviceShouldAnimate, getOptimizedConfig } = useSmartAnimations();
  
  // Animations prédéfinies optimisées
  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 }
    },
    fadeInDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    slideInLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -30 }
    },
    slideInRight: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 30 }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 }
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -180 },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: 180 }
    }
  };

  const currentAnimation = animations[animation] || animations.fadeIn;
  
  // Configuration optimisée
  const optimizedConfig = getOptimizedConfig({
    duration: duration || 0.6,
    delay: delay,
    ease: "easeOut"
  });

  // Si les animations sont désactivées, retourner un div simple
  if (!deviceShouldAnimate || !shouldAnimate) {
    return (
      <div 
        ref={ref}
        className={cn("performance-optimized", className)} 
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("performance-optimized", className)}
      initial={currentAnimation.initial}
      whileInView={currentAnimation.animate}
      exit={currentAnimation.exit}
      viewport={viewport}
      transition={optimizedConfig}
      style={{ willChange: 'transform, opacity' }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

OptimizedMotion.displayName = 'OptimizedMotion';

// Composant pour les animations d'hover optimisées
export const OptimizedHover = forwardRef(({
  children,
  className,
  hoverScale = 1.05,
  tapScale = 0.95,
  ...props
}, ref) => {
  const { shouldAnimate } = useSmartAnimations();

  if (!shouldAnimate) {
    return (
      <div 
        ref={ref}
        className={cn("cursor-pointer", className)} 
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("cursor-pointer performance-optimized", className)}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ willChange: 'transform' }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

OptimizedHover.displayName = 'OptimizedHover';

// Composant pour les animations de background
export const OptimizedBackground = ({ 
  children, 
  className, 
  variant = 'cosmic' 
}) => {
  const { animationQuality } = useSmartAnimations();
  
  const backgroundVariants = {
    cosmic: {
      low: "bg-gradient-to-br from-slate-900 to-purple-900",
      medium: "bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900",
      high: "bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"
    },
    simple: {
      low: "bg-slate-900",
      medium: "bg-gradient-to-b from-slate-900 to-slate-800",
      high: "bg-gradient-to-br from-slate-900 to-slate-800"
    }
  };
  
  const backgroundClass = backgroundVariants[variant]?.[animationQuality] || backgroundVariants.cosmic.high;
  
  return (
    <div className={cn(backgroundClass, "performance-optimized", className)}>
      {children}
    </div>
  );
};

export default OptimizedMotion;
