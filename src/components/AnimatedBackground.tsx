import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/80 mix-blend-overlay" />
      
      {/* Animated elements */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-100 to-blue-200 opacity-20 blur-3xl"
        animate={{
          x: ['-10%', '5%', '-5%'],
          y: ['5%', '15%', '10%'],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: "easeInOut",
        }}
        style={{ top: '-15%', left: '60%' }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-indigo-100 to-blue-100 opacity-20 blur-3xl"
        animate={{
          x: ['5%', '-8%', '3%'],
          y: ['3%', '-5%', '8%'],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: "easeInOut",
        }}
        style={{ top: '40%', left: '10%' }}
      />
      
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-br from-blue-200 to-indigo-100 opacity-15 blur-3xl"
        animate={{
          x: ['-3%', '5%', '-5%'],
          y: ['5%', '-3%', '5%'],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: "easeInOut",
        }}
        style={{ bottom: '5%', right: '15%' }}
      />
      
      {/* Subtle floating particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-blue-400 opacity-10"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [`${Math.random() * 20 + 40}%`, `${Math.random() * 20 + 60}%`],
              x: [`${Math.random() * 20 + 40}%`, `${Math.random() * 20 + 60}%`],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Light mesh grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(to right, #a5b4fc 1px, transparent 1px), linear-gradient(to bottom, #a5b4fc 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;