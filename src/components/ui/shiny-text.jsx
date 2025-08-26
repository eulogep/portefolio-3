import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ShinyText = ({ 
  children, 
  className,
  shimmerWidth = 100,
  shimmerColor = "rgba(255, 255, 255, 0.3)",
  duration = 2,
  ...props 
}) => {
  return (
    <motion.div
      className={cn(
        "relative inline-block overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
      <motion.div
        className="absolute inset-0 -top-2 -bottom-2"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
          width: `${shimmerWidth}px`,
        }}
        animate={{
          x: [-shimmerWidth, '100%', '100%']
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default ShinyText;
