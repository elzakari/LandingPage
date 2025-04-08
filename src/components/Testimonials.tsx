import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Mavin Johnson",
      role: "Corporate Retreat Organizer",
      image: "/images/testimonial-1.jpg",
      content: "Some relatives and I stayed in one of the apartments at the Skylar Gated Complex and the place was amazing. All the rooms were well kept and clean. A slight issue was an AC unit that was not working properly, however it was fixed the next day. My mom and Aunt enjoyed picking mangoes from the lovely mango trees and capturing quite a lot of pictures with the beautiful suroundings. My cousin also took pictures by the pool in which the water had just the right temperature. My stepfather has already bookmarked it to stay on his next vacation to Jamaica next year lol. Topnotch place! Highly recommended!",
      rating: 5,
      property: "Skylar Gated Complex",
      date: "March 2024"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Family Reunion Coordinator",
      image: "/images/testimonial-2.jpg",
      content: "We booked the 11-unit property for our family reunion and it was absolutely perfect. Everyone had their own space while still being able to gather together. The views were breathtaking and the amenities were top-notch.",
      rating: 5,
      property: "Russell Heights",
      date: "July 2023"
    },
    {
      id: 3,
      name: "Jennifer Williams",
      role: "Wedding Planner",
      image: "/images/testimonial-3.jpg",
      content: "The beachfront property was the perfect venue for our destination wedding guests. Everyone was comfortable and the communal spaces allowed for pre and post-wedding gatherings. Highly recommend!",
      rating: 4,
      property: "White Sands",
      date: "May 2023"
    },
    {
      id: 4,
      name: "David Chen",
      role: "Tech Conference Organizer",
      image: "/images/testimonial-4.jpg",
      content: "Russell Heights Property provided the perfect backdrop for our tech conference. The event spaces were versatile, and the accommodations impressed all our attendees. The staff went above and beyond to ensure everything ran smoothly.",
      rating: 5,
      property: "Russell Heights",
      date: "October 2023"
    },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const filteredTestimonials = activeFilter === 'All' 
    ? testimonials 
    : testimonials.filter(t => t.property === activeFilter);
  
  // Wrap goToNext in useCallback
  const goToNext = useCallback(() => {
    if (isAnimating || filteredTestimonials.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredTestimonials.length);
  }, [isAnimating, filteredTestimonials.length]);
  
  // Wrap goToPrev in useCallback
  const goToPrev = useCallback(() => {
    if (isAnimating || filteredTestimonials.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  }, [isAnimating, filteredTestimonials.length]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [currentIndex]);
  
  // Auto-advance carousel
  // Fix the useEffect dependency array
  useEffect(() => {
    if (isPaused || filteredTestimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, filteredTestimonials.length, goToNext]);
  
  // Fix the touch events useEffect
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    let startX: number;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      setIsPaused(true);
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
      
      setTimeout(() => setIsPaused(false), 1000);
    };
    
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchend', handleTouchEnd);
    };
  }, [filteredTestimonials.length, goToNext, goToPrev]);
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">GUEST EXPERIENCES</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">What Our Guests Say</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from groups who have experienced our properties
          </p>
          
          {/* Property Filter */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['All', 'White Sands', 'Russell Heights'].map(filter => (
              <motion.button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>
        
        {filteredTestimonials.length > 0 ? (
          <div 
            className="relative max-w-5xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            ref={carouselRef}
          >
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {filteredTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <motion.div 
                      className="bg-white rounded-2xl shadow-xl p-8 md:p-10 relative overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Quote 
                        size={120} 
                        className="absolute -top-10 -left-10 text-blue-100 opacity-50 rotate-180" 
                      />
                      
                      <div className="flex flex-col md:flex-row md:items-center mb-6 relative z-10">
                        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-md"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                          <p className="text-gray-600">{testimonial.role}</p>
                          <div className="flex items-center mt-1">
                            <div className="flex mr-3">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={16} 
                                  fill={i < testimonial.rating ? "#FFC107" : "none"} 
                                  stroke={i < testimonial.rating ? "#FFC107" : "#CBD5E0"} 
                                  className="mr-1"
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{testimonial.date}</span>
                          </div>
                        </div>
                        <div className="md:ml-auto mt-3 md:mt-0">
                          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                            {testimonial.property} Property
                          </span>
                        </div>
                      </div>
                      
                      <div className="relative z-10">
                        <p className="text-gray-700 italic text-lg leading-relaxed mb-4">"{testimonial.content}"</p>
                        <div className="flex items-center text-blue-600 text-sm font-medium">
                          <MessageSquare size={16} className="mr-2" />
                          <span>Read full review</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            {filteredTestimonials.length > 1 && (
              <>
                <motion.button 
                  onClick={goToPrev}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  aria-label="Previous testimonial"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={24} className="text-blue-600" />
                </motion.button>
                
                <motion.button 
                  onClick={goToNext}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  aria-label="Next testimonial"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={24} className="text-blue-600" />
                </motion.button>
                
                <div className="flex justify-center mt-8">
                  {filteredTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (!isAnimating) {
                          setIsAnimating(true);
                          setCurrentIndex(index);
                        }
                      }}
                      className={`mx-1 rounded-full transition-all focus:outline-none ${
                        currentIndex === index 
                          ? 'bg-blue-600 w-8 h-3' 
                          : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-500">No testimonials available for this property.</p>
          </div>
        )}
        
        <div className="text-center mt-12">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span className="font-medium">Share Your Experience</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;