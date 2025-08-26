import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const AnimatedCoffee = ({ className, size = 20 }) => {
  return (
    <motion.div
      className={cn("inline-flex items-center justify-center", className)}
      whileHover={{ 
        scale: 1.1,
        rotate: [0, -5, 5, -5, 0]
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="cursor-pointer"
        animate={{
          y: [0, -1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Tasse */}
        <motion.path
          d="M18 8h-1V6c0-2.76-2.24-5-5-5H8c-2.76 0-5 2.24-5 5v6c0 2.76 2.24 5 5 5h4c2.76 0 5-2.24 5-5v-1h1c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2z"
          fill="url(#coffeeGradient)"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
        />
        
        {/* Anse */}
        <motion.path
          d="M18 10v2c0 .55-.45 1-1 1h-1v-4h1c.55 0 1 .45 1 1z"
          fill="#8b4513"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        />

        {/* Café liquide */}
        <motion.ellipse
          cx="12"
          cy="8"
          rx="3"
          ry="1"
          fill="#4a2c2a"
          animate={{
            ry: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Vapeur animée */}
        {[...Array(3)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${9 + i * 1.5} 4 Q${10 + i * 1.5} 2 ${9 + i * 1.5} 1`}
            stroke="url(#steamGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.8, 0],
              y: [0, -2, -4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut"
            }}
          />
        ))}

        <defs>
          {/* Dégradé pour la tasse */}
          <linearGradient id="coffeeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4a261" />
            <stop offset="50%" stopColor="#e76f51" />
            <stop offset="100%" stopColor="#e9c46a" />
          </linearGradient>
          
          {/* Dégradé pour la vapeur */}
          <motion.linearGradient
            id="steamGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            animate={{
              y1: ["0%", "100%", "0%"],
              y2: ["100%", "0%", "100%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#f0f0f0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </motion.svg>
    </motion.div>
  );
};

export default AnimatedCoffee;
