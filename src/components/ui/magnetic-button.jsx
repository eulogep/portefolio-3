import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';

const MagneticButton = ({ 
  children, 
  className, 
  strength = 0.3,
  range = 100,
  ...props 
}) => {
  const buttonRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < range) {
        const factor = (range - distance) / range;
        const moveX = deltaX * strength * factor;
        const moveY = deltaY * strength * factor;
        
        controls.start({
          x: moveX,
          y: moveY,
          scale: 1 + factor * 0.1,
          transition: { 
            type: "spring", 
            stiffness: 150, 
            damping: 15 
          }
        });
      }
    };

    const handleMouseLeave = () => {
      controls.start({
        x: 0,
        y: 0,
        scale: 1,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [controls, strength, range]);

  return (
    <motion.div
      ref={buttonRef}
      animate={controls}
      className={cn("inline-block", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
