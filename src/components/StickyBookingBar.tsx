import React, { useState, useEffect } from 'react';
import { Calendar, Users, ArrowRight } from 'lucide-react';

const StickyBookingBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show the booking bar after scrolling past 70% of the hero section
      // Reduced threshold to make it appear earlier
      setIsVisible(window.scrollY > window.innerHeight * 0.7);
    };
    
    // Initial check in case page is loaded scrolled down
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40 transition-all duration-500 ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-full opacity-0'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-3 md:mb-0">
            <h3 className="text-lg font-bold text-gray-800">Ready to book your group stay?</h3>
            <p className="text-gray-600">Check availability for your preferred dates</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="date"
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users size={18} className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none"
              >
                <option value="">Group size</option>
                <option value="10-20">10-20 people</option>
                <option value="21-40">21-40 people</option>
                <option value="41-60">41-60 people</option>
                <option value="61+">61+ people</option>
              </select>
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center">
              Check Availability <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyBookingBar;