import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ParticleButton = ({ 
  children, 
  className = "",
  particleCount = 8,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const particles = Array.from({ length: particleCount }, (_, i) => i);

  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg overflow-hidden transition-all duration-300",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Particle Effects */}
      {isHovered && particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 0.8,
            delay: particle * 0.1,
            ease: "easeOut",
          }}
          style={{
            left: '50%',
            top: '50%',
          }}
        />
      ))}
      
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: '100%' } : { x: '-100%' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

export default ParticleButton;
