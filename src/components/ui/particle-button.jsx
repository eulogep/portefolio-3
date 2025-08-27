import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const ParticleButton = ({ 
  children, 
  className,
  particleCount = 12,
  particleColor = "#00ffff",
  onClick,
  ...props 
}) => {
  const [particles, setParticles] = useState([]);
  const buttonRef = useRef(null);

  const createParticles = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (Math.PI * 2 * i) / particleCount,
      velocity: 2 + Math.random() * 3,
      size: 2 + Math.random() * 3,
      life: 1
    }));

    setParticles(newParticles);

    // Appeler onClick si fourni
    if (onClick) onClick(e);

    // Nettoyer les particules après animation
    setTimeout(() => setParticles([]), 1000);
  };

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        className
      )}
      onClick={createParticles}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
      
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particleColor,
              boxShadow: `0 0 ${particle.size * 2}px ${particleColor}`,
            }}
            initial={{
              scale: 0,
              x: 0,
              y: 0,
              opacity: 1
            }}
            animate={{
              scale: [0, 1, 0],
              x: Math.cos(particle.angle) * particle.velocity * 20,
              y: Math.sin(particle.angle) * particle.velocity * 20,
              opacity: [1, 1, 0]
            }}
            exit={{
              scale: 0,
              opacity: 0
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
};

export default ParticleButton;
