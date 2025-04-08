import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  color?: string;
  pathCount?: number;
  opacity?: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  color = '#3b82f6', 
  pathCount = 24,
  opacity = 0.05
}) => {
  const paths = Array.from({ length: pathCount }, (_, i) => ({
    id: i,
    d: `M${-200 + i * 20} ${100 + i * 15} C ${-100 + i * 25} ${150 + i * 20}, ${100 + i * 30} ${200 - i * 10}, ${300 + i * 40} ${250 - i * 15}`,
    delay: i * 0.1,
    duration: 20 + i * 0.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={color}
            strokeWidth={1 + path.id * 0.08}
            strokeOpacity={opacity - path.id * 0.001}
            fill="transparent"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 1, 0],
              pathOffset: [0, 1, 0]
            }}
            transition={{
              duration: path.duration,
              delay: path.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedBackground;