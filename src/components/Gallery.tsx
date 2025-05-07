import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, ZoomIn, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [propertyFilter, setPropertyFilter] = useState<'All' | 'WhiteSands' | 'RussellHeights' | 'AdinaVilla'>('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const galleryImages = [
    // White Sands Property
    { 
      id: 1,
      src: `${process.env.PUBLIC_URL}/images/White_Sands_property/Double_Unit_Bathroom.jpg`,
      alt: "Bathroom",
      category: "Bathroom",
      property: "WhiteSands"
    },
    { 
      id: 2,
      src: `${process.env.PUBLIC_URL}/images/White_Sands_property/Double_Unit_Bedroom.jpg`,
      alt: "Bedroom",
      category: "Bedroom",
      property: "WhiteSands"
    },
    { 
      id: 3,
      src: `${process.env.PUBLIC_URL}/images/White_Sands_property/Double_Unit_Kitchen.jpg`,
      alt: "Kitchen",
      category: "Kitchen",
      property: "WhiteSands"
    },
    { 
      id: 4,
      src: `${process.env.PUBLIC_URL}/images/White_Sands_property/Double_Unit_Livingroom.jpg`,
      alt: "Living Room",
      category: "Living Room",
      property: "WhiteSands"
    },
    { 
      id: 5,
      src: `${process.env.PUBLIC_URL}/images/White_Sands_property/Gym.jpg`,
      alt: "Gym",
      category: "Amenities",
      property: "WhiteSands"
    },
    { 
      id: 6,
      src: `${process.env.PUBLIC_URL}/images/White_Sands_property/Main.jpg`,
      alt: "Main",
      category: "Property",
      property: "WhiteSands"
    },
    { 
      id: 7,
      src: `${process.env.PUBLIC_URL}/images/White_Sands_property/Pool.jpg`,
      alt: "Pool",
      category: "Amenities",
      property: "WhiteSands"
    },
    { 
      id: 8,
      src: `${process.env.PUBLIC_URL}/images/White_Sands_property/Single_Unit_Bathroom.jpg`,
      alt: "Bathroom",
      category: "Bathroom",
      property: "WhiteSands"
    },
    { 
      id: 9,
      src: `${process.env.PUBLIC_URL}/images/White_Sands_property/Single_Unit_Bedroom.jpg`,
      alt: "Bedroom",
      category: "Bedroom",
      property: "WhiteSands"
    },
    { 
      id: 10,
      src: `${process.env.PUBLIC_URL}/images/White_Sands_property/Single_Unit_Kitchen.jpg`,
      alt: "Kitchen",
      category: "Kitchen",
      property: "WhiteSands"
    },
    { 
      id: 11,
      src: `${process.env.PUBLIC_URL}/images/White_Sands_property/Single_Unit_Livingroom.jpg`,
      alt: "Living Room",
      category: "Living Room",
      property: "WhiteSands"
    },
    
    { 
      id: 12,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Balcony_View.jpg`,
      alt: "Balcony View",
      category: "Amenities",
      property: "RussellHeights"
    },
    { 
      id: 13,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Bathroom_View.jpg`,
      alt: "Bathroom",
      category: "Bathroom",
      property: "RussellHeights"
    },
    { 
      id: 14,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Bedroom_View.jpg`,
      alt: "Bedroom",
      category: "Bedroom",
      property: "RussellHeights"
    },
    { 
      id: 15,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Dining_Room_View.jpg`,
      alt: "Dining Room",
      category: "Dining Room",
      property: "RussellHeights"
    },
    { 
      id: 16,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Half_Bath.jpg`,
      alt: "Half Bath",
      category: "Bathroom",
      property: "RussellHeights"
    },
    { 
      id: 17,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Kitchen_View4.jpg`,
      alt: "Kitchen",
      category: "Kitchen",
      property: "RussellHeights"
    },
    { 
      id: 18,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Living_Room_View.png`,
      alt: "Living Room",
      category: "Living Room",
      property: "RussellHeights"
    },
    { 
      id: 19,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Outside_Of_The_Building.jpg`,
      alt: "Building Exterior",
      category: "Amenities",
      property: "RussellHeights"
    },
    { 
      id: 20,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Pool_Side_View.jpg`,
      alt: "Pool Area",
      category: "Amenities",
      property: "RussellHeights"
    },
    { 
      id: 21,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Pool_Side_View2.jpg`,
      alt: "Pool Area",
      category: "Amenities",
      property: "RussellHeights"
    },
    { 
      id: 22,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Roof_Top_View.jpg`,
      alt: "Roof Top",
      category: "Amenities",
      property: "RussellHeights"
    },
    { 
      id: 23,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Russell_Heights_Property_Balcony.jpg`,
      alt: "Property Balcony",
      category: "Amenities",
      property: "RussellHeights"
    },
    { 
      id: 24,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Russell_Heights_Property_Bathroom.jpg`,
      alt: "Property Bathroom",
      category: "Bathroom",
      property: "RussellHeights"
    },
    { 
      id: 25,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Russell_Heights_Property_Bedroom.jpg`,
      alt: "Property Bedroom",
      category: "Bedroom",
      property: "RussellHeights"
    },
    { 
      id: 26,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Russell_Heights_Property_Bedroom2.jpg`,
      alt: "Property Bedroom",
      category: "Bedroom",
      property: "RussellHeights"
    },
    { 
      id: 27,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Russell_Heights_Property_Diningroom.jpg`,
      alt: "Property Dining Room",
      category: "Dining Room",
      property: "RussellHeights"
    },
    { 
      id: 28,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Russell_Heights_Property_Kitchen.jpg`,
      alt: "Property Kitchen",
      category: "Kitchen",
      property: "RussellHeights"
    },
    { 
      id: 29,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Russell_Heights_Property_Laundry.jpg`,
      alt: "Property Laundry",
      category: "Laundry",
      property: "RussellHeights"
    },
    { 
      id: 30,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Russell_Heights_Property_Livingroom.jpg`,
      alt: "Property Living Room",
      category: "Living Room",
      property: "RussellHeights"
    },
    { 
      id: 31,
      src: `${process.env.PUBLIC_URL}/images/Russell_heights_property/Russell_Heights_Property_Livingroom2.jpg`,
      alt: "Property Living Room",
      category: "Living Room",
      property: "RussellHeights"
    },

    // Adina Villa Property
    { 
      id: 32,
      src: `${process.env.PUBLIC_URL}/images/Adina_Villa/main.jpg`,
      alt: "Main View",
      category: "Property",
      property: "AdinaVilla"
    },
    { 
      id: 33,
      src: `${process.env.PUBLIC_URL}/images/Adina_Villa/bedroom.jpg`,
      alt: "Bedroom",
      category: "Bedroom",
      property: "AdinaVilla"
    },
    { 
      id: 34,
      src: `${process.env.PUBLIC_URL}/images/Adina_Villa/bathroom.jpg`,
      alt: "Bathroom",
      category: "Bathroom",
      property: "AdinaVilla"
    },
    { 
      id: 35,
      src: `${process.env.PUBLIC_URL}/images/Adina_Villa/kitchen.jpg`,
      alt: "Kitchen",
      category: "Kitchen",
      property: "AdinaVilla"
    },
    { 
      id: 36,
      src: `${process.env.PUBLIC_URL}/images/Adina_Villa/pool.jpg`,
      alt: "Pool",
      category: "Amenities",
      property: "AdinaVilla"
    },
    { 
      id: 37,
      src: `${process.env.PUBLIC_URL}/images/Adina_Villa/gym.jpg`,
      alt: "Gym",
      category: "Property",
      property: "AdinaVilla"
    },
    { 
      id: 38,
      src: `${process.env.PUBLIC_URL}/images/Adina_Villa/livingroom.jpg`,
      alt: "Living Room",
      category: "Living Room",
      property: "AdinaVilla"
    },
    { 
      id: 39,
      src: `${process.env.PUBLIC_URL}/images/Adina_Villa/dining_hall.jpg`,
      alt: "Dining Area",
      category: "Dining Room",
      property: "AdinaVilla"
    },
    { 
      id: 40,
      src: `${process.env.PUBLIC_URL}/images/Adina_Villa/balcony.jpg`,
      alt: "Balcony",
      category: "Amenities",
      property: "AdinaVilla"
    }
  ];

  // Get unique categories
  const categories = ['All', ...new Set(galleryImages.map(img => img.category))];
  
  // Filter images based on both property and category
  const filteredImages = galleryImages.filter(img => 
    (propertyFilter === 'All' || img.property === propertyFilter) && 
    (categoryFilter === 'All' || img.category === categoryFilter)
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        case 'Escape':
          setSelectedImage(null);
          setIsZoomed(false);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedIndex, filteredImages]);

  const openLightbox = (src: string) => {
    setSelectedImage(src);
    const index = filteredImages.findIndex(img => img.src === src);
    setSelectedIndex(index);
    setIsZoomed(false);
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setSelectedIndex(prevIndex => 
        prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setSelectedIndex(prevIndex => 
        prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
      );
    }
    setSelectedImage(filteredImages[
      direction === 'next' 
        ? (selectedIndex === filteredImages.length - 1 ? 0 : selectedIndex + 1)
        : (selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1)
    ].src);
    setIsZoomed(false);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">VISUAL TOUR</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Property Gallery</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our properties through our detailed gallery
          </p>
          
          {/* Property Filter */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 mb-4">
            <div className="w-full text-center mb-2">
              <span className="text-sm font-medium text-gray-600">PROPERTY</span>
            </div>
            {[
              {id: 'All', label: 'All Properties'},
              {id: 'WhiteSands', label: 'White Sands'},
              {id: 'RussellHeights', label: 'Russell Heights'},
              {id: 'AdinaVilla', label: 'Adina Villa'}
            ].map(property => (
              <motion.button
                key={property.id}
                onClick={() => setPropertyFilter(property.id as 'All' | 'WhiteSands' | 'RussellHeights' | 'AdinaVilla')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                  propertyFilter === property.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {property.id !== 'All' ? <Home size={14} className="mr-1" /> : null}
                {property.label}
              </motion.button>
            ))}
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <div className="w-full text-center mb-2">
              <span className="text-sm font-medium text-gray-600">CATEGORY</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
              {categories.map(category => (
                <motion.button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    categoryFilter === category 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Property Heading - Only show when a specific property is selected */}
        {propertyFilter !== 'All' && (
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
              <Home size={20} className="mr-2 text-blue-600" />
              {propertyFilter === 'WhiteSands' 
                ? 'White Sands Property' 
                : propertyFilter === 'RussellHeights' 
                  ? 'Russell Heights Property'
                  : 'Adina Villa Property'}
            </h3>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              {propertyFilter === 'WhiteSands' 
                ? 'Our White Sands Property offers stunning views and premium amenities for up to 44 guests.'
                : propertyFilter === 'RussellHeights'
                  ? 'Russell Heights Property features luxury accommodations and exclusive amenities for up to 100 guests.'
                  : 'Adina Villa offers a luxurious private villa experience with ocean views, infinity pool, and full staff including a chef.'}
            </p>
          </div>
        )}
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredImages.map((image, index) => (
            <motion.div 
              key={image.id} 
              className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              onClick={() => openLightbox(image.src)}
            >
              <div className="overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className={`inline-block px-3 py-1 text-white text-xs rounded-full w-fit ${
                    image.property === 'WhiteSands' 
                      ? 'bg-blue-600' 
                      : image.property === 'RussellHeights'
                        ? 'bg-blue-700'
                        : 'bg-blue-800'
                  }`}>
                    {image.property === 'WhiteSands' 
                      ? 'White Sands' 
                      : image.property === 'RussellHeights'
                        ? 'Russell Heights'
                        : 'Adina Villa'}
                  </span>
                  <span className="inline-block px-3 py-1 bg-gray-700 text-white text-xs rounded-full">
                    {image.category}
                  </span>
                </div>
                <h3 className="text-white font-medium">{image.alt}</h3>
              </div>
              <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={16} className="text-blue-600" />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {filteredImages.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-2">No images found for the selected filters.</p>
            <button 
              onClick={() => {
                setPropertyFilter('All');
                setCategoryFilter('All');
              }}
              className="text-blue-600 underline text-sm"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
      
      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!isZoomed) setSelectedImage(null);
              setIsZoomed(false);
            }}
          >
            <button 
              className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-50 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
                setIsZoomed(false);
              }}
            >
              <X size={24} />
            </button>
            
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
            >
              <ChevronRight size={24} />
            </button>
            
            <button 
              className="absolute bottom-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
            >
              <ZoomIn size={24} />
            </button>
            
            <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-lg text-white text-sm">
              {selectedIndex + 1} / {filteredImages.length}
            </div>
            
            <motion.div 
              className="relative max-w-5xl max-h-[85vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src={selectedImage} 
                alt={filteredImages[selectedIndex]?.alt || "Gallery preview"} 
                className={`max-w-full max-h-[85vh] object-contain ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                animate={{ 
                  scale: isZoomed ? 1.5 : 1,
                  transition: { duration: 0.3 }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex gap-2 mb-1">
                  <span className={`inline-block px-3 py-1 text-white text-xs rounded-full ${
                    filteredImages[selectedIndex]?.property === 'WhiteSands' 
                      ? 'bg-blue-600' 
                      : filteredImages[selectedIndex]?.property === 'RussellHeights'
                        ? 'bg-blue-700'
                        : 'bg-blue-800'
                  }`}>
                    {filteredImages[selectedIndex]?.property === 'WhiteSands' 
                      ? 'White Sands' 
                      : filteredImages[selectedIndex]?.property === 'RussellHeights'
                        ? 'Russell Heights'
                        : 'Adina Villa'}
                  </span>
                  <span className="inline-block px-3 py-1 bg-gray-700 text-white text-xs rounded-full">
                    {filteredImages[selectedIndex]?.category}
                  </span>
                </div>
                <h3 className="text-white font-medium text-lg">
                  {filteredImages[selectedIndex]?.alt}
                </h3>
              </div>
            </motion.div>
            
            {/* Thumbnails */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 overflow-x-auto max-w-[90%] pb-2">
              {filteredImages.map((img, idx) => (
                <div 
                  key={img.id}
                  className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer transition-all ${
                    idx === selectedIndex ? 'ring-2 ring-blue-500 scale-110' : 'ring-1 ring-white/30 opacity-60 hover:opacity-100'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(idx);
                    setSelectedImage(img.src);
                    setIsZoomed(false);
                  }}
                >
                  <img src={img.src} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
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
      </AnimatePresence>
    </section>
  );
};

export default Gallery;