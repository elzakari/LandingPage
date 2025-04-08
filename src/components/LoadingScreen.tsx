import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => {
          const increment = Math.random() * 10 + 5;
          const newProgress = Math.min(prev + increment, 100);
          
          if (newProgress === 100) {
            setTimeout(() => {
              onLoadComplete();
            }, 500);
          }
          
          return newProgress;
        });
      }
    }, 200);
    
    return () => clearTimeout(timer);
  }, [progress, onLoadComplete]);
  
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-white z-50 flex flex-col items-center justify-center">
      <div className="mb-10 flex flex-col items-center">
        <img 
          src="/images/Reign Hosting Services Logos/Main_Logo.png" 
          alt="Reign Hosting Services Logo" 
          className="w-64 h-auto mb-6 rounded-lg shadow-md"
        />
        <h1 className="text-4xl font-bold text-blue-700">Reign Hosting Services</h1>
        <p className="text-lg text-blue-500 mt-2">Premium Property Rental</p>
      </div>
      
      <div className="w-80 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="mt-6 text-gray-600 font-medium">
        {progress < 30 ? "Preparing your experience..." : 
         progress < 60 ? "Loading property details..." : 
         progress < 90 ? "Almost ready..." : 
         "Welcome to Reign Hosting Services!"}
        <span className="ml-2 text-blue-700">{Math.round(progress)}%</span>
      </p>
      
      <div className="absolute bottom-6 left-0 right-0 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Reign Hosting Services. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;