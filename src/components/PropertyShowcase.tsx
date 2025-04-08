import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Home, MapPin, Waves, Mountain, Utensils, Users, Award } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

// Add unitTypes to the Property interface
interface UnitType {
  name: string;
  capacity: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
  features: string[];
  image: string;
}

interface Property {
  id: number;
  name: string;
  units: number;
  capacity: string;
  image: string;
  features: string[];
  description?: string;
  rating?: number;
  price?: number;
  location?: string;
  airbnbLink: string;
  gallery?: string[];
  unitTypes?: UnitType[];
}

interface PropertyShowcaseProps {
  properties: Property[];
}

const PropertyShowcase: React.FC<PropertyShowcaseProps> = ({ properties }) => {
  const [activeProperty, setActiveProperty] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Add keyboard navigation for gallery
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeProperty === null || activeImage === null) return;
      
      const gallery = properties.find(p => p.id === activeProperty)?.gallery;
      if (!gallery) return;
      
      const currentIndex = gallery.indexOf(activeImage);
      
      switch (e.key) {
        case 'ArrowLeft':
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : gallery.length - 1;
          setActiveImage(gallery[prevIndex]);
          break;
        case 'ArrowRight':
          const nextIndex = currentIndex < gallery.length - 1 ? currentIndex + 1 : 0;
          setActiveImage(gallery[nextIndex]);
          break;
        case 'Escape':
          closeGallery();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProperty, activeImage, properties]);

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Map property features to icons
  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes('pool')) return <div className="bg-blue-100 p-2 rounded-full"><Waves size={16} className="text-blue-600" /></div>;
    if (feature.toLowerCase().includes('view')) return <div className="bg-green-100 p-2 rounded-full"><Mountain size={16} className="text-green-600" /></div>;
    if (feature.toLowerCase().includes('kitchen')) return <div className="bg-yellow-100 p-2 rounded-full"><Utensils size={16} className="text-yellow-600" /></div>;
    if (feature.toLowerCase().includes('space') || feature.toLowerCase().includes('area')) return <div className="bg-purple-100 p-2 rounded-full"><Users size={16} className="text-purple-600" /></div>;
    if (feature.toLowerCase().includes('balcon')) return <div className="bg-indigo-100 p-2 rounded-full"><Home size={16} className="text-indigo-600" /></div>;
    return <div className="bg-gray-100 p-2 rounded-full"><Award size={16} className="text-gray-600" /></div>;
  };

  // Handle image gallery
  const openGallery = (propertyId: number, image: string) => {
    setActiveProperty(propertyId);
    setActiveImage(image);
  };

  const closeGallery = () => {
    setActiveProperty(null);
    setActiveImage(null);
  };

  // Add image preloading
  useEffect(() => {
    // Preload all gallery images
    properties.forEach(property => {
      // Preload main property image
      const mainImage = new Image();
      mainImage.src = property.image;
      mainImage.onload = () => {
        setLoadedImages(prev => {
          const newSet = new Set(prev);
          newSet.add(property.image);
          return newSet;
        });
      };
      
      // Preload gallery images
      if (property.gallery) {
        property.gallery.forEach(img => {
          const image = new Image();
          image.src = img;
          image.onload = () => {
            setLoadedImages(prev => {
              const newSet = new Set(prev);
              newSet.add(img);
              return newSet;
            });
          };
        });
      }
      
      // Preload unit type images
      if (property.unitTypes) {
        property.unitTypes.forEach(unit => {
          const unitImage = new Image();
          unitImage.src = unit.image;
          unitImage.onload = () => {
            setLoadedImages(prev => {
              const newSet = new Set(prev);
              newSet.add(unit.image);
              return newSet;
            });
          };
        });
      }
    });
  }, [properties]);

  return (
    <section id="properties" className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-blue-50">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
            Exceptional Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our collection of premium group accommodations designed for unforgettable experiences
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto"
        >
          {properties.map((property) => (
            <motion.div 
              key={property.id}
              variants={itemVariants}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="relative h-[600px] overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600 shadow-md z-10">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 mr-1" fill="#FACC15" />
                    <span>{property.rating || 4.9}</span>
                  </div>
                </div>
                
                {/* Location Badge */}
                {property.location && (
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-md z-10">
                    <div className="flex items-center">
                      <MapPin size={14} className="text-blue-600 mr-1" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                )}
                
                {/* Always Visible Property Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-md">{property.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {property.features.slice(0, 3).map((feature, i) => (
                      <span key={i} className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                        {feature}
                      </span>
                    ))}
                    {property.features.length > 3 && (
                      <span className="bg-blue-500/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                        +{property.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Content Overlay on Hover - Improved Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 overflow-y-auto">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 backdrop-blur-sm bg-black/30 rounded-xl p-4">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">{property.name}</h3>
                    
                    <div className="flex items-center text-gray-200 mb-3">
                      <Home size={14} className="mr-1" />
                      <p className="text-sm">{property.units} units • {property.capacity}</p>
                    </div>
                    
                    {property.description && (
                      <p className="text-gray-100 mb-4 line-clamp-2 text-sm leading-relaxed">{property.description}</p>
                    )}
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">Key Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {property.features.map((feature, i) => (
                          <span key={i} className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Unit Types - Dropdown Implementation */}
                    {property.unitTypes && property.unitTypes.length > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">Unit Types</h4>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const element = document.getElementById(`unit-types-${property.id}`);
                              if (element) {
                                element.classList.toggle('hidden');
                              }
                            }}
                            className="text-xs text-blue-300 hover:text-blue-200 flex items-center"
                          >
                            View {property.unitTypes.length} {property.unitTypes.length === 1 ? 'type' : 'types'}
                            <ArrowRight size={12} className="ml-1 transform rotate-90" />
                          </button>
                        </div>
                        <div id={`unit-types-${property.id}`} className="space-y-2 hidden mt-2 transition-all duration-300">
                          {property.unitTypes.map((unit, i) => (
                            <div key={i} className="bg-white/20 p-3 rounded-lg">
                              <div className="flex justify-between items-center mb-1">
                                <h5 className="font-semibold text-white text-sm">{unit.name}</h5>
                                <span className="text-blue-200 font-bold">${unit.price}/night</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <span className="bg-blue-500/30 text-white text-xs px-2 py-0.5 rounded-md">{unit.capacity}</span>
                                <span className="bg-blue-500/30 text-white text-xs px-2 py-0.5 rounded-md">{unit.bedrooms} {unit.bedrooms === 1 ? 'BR' : 'BRs'}</span>
                                <span className="bg-blue-500/30 text-white text-xs px-2 py-0.5 rounded-md">{unit.bathrooms} {unit.bathrooms === 1 ? 'BA' : 'BAs'}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Gallery Thumbnails - Improved Readability */}
                    {property.gallery && property.gallery.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">Gallery</h4>
                        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
                          {property.gallery.map((img, index) => (
                            <div 
                              key={index}
                              className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 border-white/30 hover:border-white hover:scale-105 transition-all relative"
                              onClick={() => openGallery(property.id, img)}
                            >
                              {loadedImages.has(img) ? (
                                <img src={img} alt={`${property.name} gallery ${index + 1}`} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-gray-700 animate-pulse flex items-center justify-center">
                                  <span className="text-xs text-white/70">Loading</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <span className="text-xs text-gray-300">Starting from</span>
                        <p className="text-xl font-bold text-white">${property.price || (199 + property.id * 100)}<span className="text-xs font-normal text-gray-300">/night</span></p>
                      </div>
                      
                      {property.airbnbLink && (
                        <motion.a 
                          href={property.airbnbLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details <ArrowRight size={14} className="ml-1" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.a 
            href="#contact" 
            className="inline-flex items-center justify-center px-8 py-3 border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-300 font-medium"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Properties</span>
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
      
      {/* Image Gallery Modal - Enhanced with Navigation */}
      {activeProperty !== null && activeImage !== null && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <div className="relative max-w-5xl w-full">
            {/* Close button */}
            <button 
              onClick={closeGallery}
              className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-all z-10 group"
            >
              <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Main image container */}
            <div className="relative">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={activeImage} 
                alt="Property gallery" 
                className="w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Navigation buttons */}
              {activeProperty && 
                properties.find(p => p.id === activeProperty)?.gallery && 
                (properties.find(p => p.id === activeProperty)?.gallery?.length || 0) > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const gallery = properties.find(p => p.id === activeProperty)?.gallery;
                      if (gallery) {
                        const currentIndex = gallery.indexOf(activeImage);
                        const prevIndex = currentIndex > 0 ? currentIndex - 1 : gallery.length - 1;
                        setActiveImage(gallery[prevIndex]);
                      }
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all group"
                  >
                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const gallery = properties.find(p => p.id === activeProperty)?.gallery;
                      if (gallery) {
                        const currentIndex = gallery.indexOf(activeImage);
                        const nextIndex = currentIndex < gallery.length - 1 ? currentIndex + 1 : 0;
                        setActiveImage(gallery[nextIndex]);
                      }
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all group"
                  >
                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            
            {/* Image counter */}
            {activeProperty && properties.find(p => p.id === activeProperty)?.gallery && (
              <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                {(properties.find(p => p.id === activeProperty)?.gallery?.indexOf(activeImage ?? '') ?? 0) + 1} / {properties.find(p => p.id === activeProperty)?.gallery?.length ?? 0}
              </div>
            )}
            
            {/* Property name */}
            {activeProperty && (
              <div className="absolute bottom-20 left-0 right-0 text-center">
                <h3 className="text-white text-xl font-bold drop-shadow-lg">
                  {properties.find(p => p.id === activeProperty)?.name}
                </h3>
              </div>
            )}
            
            {/* Thumbnails */}
            {activeProperty && (
              <div className="flex justify-center mt-6 space-x-2 overflow-x-auto pb-2 px-4 max-w-full">
                {properties.find(p => p.id === activeProperty)?.gallery?.map((img, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer transition-all ${
                      img === activeImage ? 'ring-2 ring-blue-500 scale-105' : 'ring-1 ring-white/30 opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setActiveImage(img)}
                  >
                    {loadedImages.has(img) ? (
                      <img src={img} alt={`Gallery thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-700 animate-pulse flex items-center justify-center">
                        <span className="text-xs text-white/70">Loading</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          {/* Keyboard navigation hint */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/50 text-xs flex items-center space-x-4">
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-gray-800 rounded-md mr-1">←</kbd>
              <span>Previous</span>
            </span>
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-gray-800 rounded-md mr-1">→</kbd>
              <span>Next</span>
            </span>
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-gray-800 rounded-md mr-1">ESC</kbd>
              <span>Close</span>
            </span>
          </div>
        </motion.div>
      )}
      
      {/* Remove this problematic code block that's outside of any component context */}
      {/* 
      // Then in the component's return statement, after the property features section:
      {property.unitTypes && property.unitTypes.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Unit Types</h4>
          <div className="space-y-3">
            {property.unitTypes.map((unit, i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-semibold text-gray-800">{unit.name}</h5>
                  <span className="text-blue-600 font-semibold">${unit.price}/night</span>
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
                  <span className="bg-blue-50 px-2 py-1 rounded">{unit.capacity}</span>
                  <span className="bg-blue-50 px-2 py-1 rounded">{unit.bedrooms} {unit.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                  <span className="bg-blue-50 px-2 py-1 rounded">{unit.bathrooms} {unit.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                </div>
                <div className="flex flex-wrap gap-1 text-xs">
                  {unit.features.map((feature, j) => (
                    <span key={j} className="bg-gray-100 px-2 py-1 rounded">{feature}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      */}
    </section>
  );
};

export default PropertyShowcase;