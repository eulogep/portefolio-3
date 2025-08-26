import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ShinyText = ({ 
  children, 
  className = "", 
  shimmerWidth = 100,
  ...props 
}) => {
  return (
    <motion.div
      className={cn("relative inline-block overflow-hidden", className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.6) 50%, transparent 75%)`,
          width: `${shimmerWidth}%`,
          transform: 'translateX(-100%)',
        }}
        animate={{
          transform: ['translateX(-100%)', 'translateX(200%)'],
        }}
        transition={{
          duration: 2,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />
    </motion.div>
  );
};

export default ShinyText;
