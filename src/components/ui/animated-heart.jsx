import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const AnimatedHeart = ({ className, size = 20 }) => {
  return (
    <motion.div
      className={cn("inline-flex items-center justify-center", className)}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="cursor-pointer"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          fill="url(#heartGradient)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <defs>
          <motion.linearGradient
            id="heartGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            animate={{
              x1: ["0%", "100%", "0%"],
              x2: ["100%", "0%", "100%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </motion.linearGradient>
        </defs>
        
        {/* Particules de cœur */}
        {[...Array(3)].map((_, i) => (
          <motion.circle
            key={i}
            cx={12 + Math.sin(i * 2) * 3}
            cy={12 + Math.cos(i * 2) * 3}
            r="1"
            fill="#ff6b9d"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [-2, -8, -2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
};

export default AnimatedHeart;
