// Remove or use the motion import
import React, { useState, useEffect } from 'react';
import { Home, Users, Calendar, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
// Remove this line since it's not being used
// import { motion } from 'framer-motion';
import './App.css';
import './utils/parallaxEffect';

// Import components
import PropertyShowcase from './components/PropertyShowcase';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';
import Testimonials from './components/Testimonials';
import PropertyComparison from './components/PropertyComparison';
import FAQ from './components/FAQ';
import StickyBookingBar from './components/StickyBookingBar';
import VirtualTour from './components/VirtualTour';
import LoadingScreen from './components/LoadingScreen';
import CookieConsent from './components/CookieConsent';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle loading screen
  const handleLoadComplete = () => {
    setIsLoading(false);
    setTimeout(() => setIsLoaded(true), 100);
  };

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Properties data
  const properties = [
    {
      id: 1,
      name: "White Sands Property",
      units: 11,
      capacity: "Up to 44 guests",
      image: "/images/White_Sands_property/main.jpg",
      features: ["Rooftop Pool", "Ocean Views", "Entertainment Area", "Full Kitchen"],
      description: "Luxurious beachfront units with stunning ocean views, perfect for large group retreats and corporate events.",
      rating: 4.9,
      price: 299,
      location: "Miami, FL",
      airbnbLink: "https://airbnb.com/property1",
      gallery: [
        "/images/White_Sands_property/Double_Unit_Bathroom.jpg",
        "/images/White_Sands_property/Double_Unit_Bedroom.jpg",
        "/images/White_Sands_property/Double_Unit_Kitchen.jpg",
        "/images/White_Sands_property/Double_Unit_Livingroom.jpg",
        "/images/White_Sands_property/Gym.jpg",
        "/images/White_Sands_property/Main.jpg",
        "/images/White_Sands_property/Pool.jpg",
        "/images/White_Sands_property/Single_Unit_Bathroom.jpg",
        "/images/White_Sands_property/Single_Unit_Bedroom.jpg",
        "/images/White_Sands_property/Single_Unit_Kitchen.jpg",
        "/images/White_Sands_property/Single_Unit_Livingroom.jpg"
      ],
      unitTypes: [
        {
          name: "Double Unit",
          capacity: "4-8 guests",
          bedrooms: 2,
          bathrooms: 2,
          price: 299,
          features: ["Ocean View", "Full Kitchen", "Living Area", "Private Balcony"],
          image: "/images/White_Sands_property/double_unit.jpg"
        },
        {
          name: "Single Unit",
          capacity: "2-4 guests",
          bedrooms: 1,
          bathrooms: 1,
          price: 199,
          features: ["Kitchenette", "Cozy Living Space", "Work Area", "City View"],
          image: "/images/White_Sands_property/single_unit.jpg"
        }
      ]
    },
    {
      id: 2,
      name: "Russell Heights Property",
      units: 25,
      capacity: "Up to 100 guests",
      image: "/images/Russell_Heights_property/main.jpg",
      features: ["Infinity Pool", "Panoramic Views", "Event Space", "Private Balconies"],
      description: "Spacious hillside retreat with panoramic city views, featuring modern amenities and versatile event spaces.",
      rating: 4.8,
      price: 299,
      location: "Orlando, FL",
      airbnbLink: "https://airbnb.com/property2",
      gallery: [
        "/images/Russell_Heights_property/Balcony view 1.jpg",
        "/images/Russell_Heights_property/Bathroom-1 view 3.jpg",
        "/images/Russell_Heights_property/Bedroom-2 view 2.jpg",
        "/images/Russell_Heights_property/Dining room view 2.jpg",
        "/images/Russell_Heights_property/Half bath.jpg",
        "/images/Russell_Heights_property/Kitchen view 4.jpg",
        "/images/Russell_Heights_property/Living room view 7.png",
        "/images/Russell_Heights_property/main.jpg",
        "/images/Russell_Heights_property/Outside of the building.jpg",
        "/images/Russell_Heights_property/Pool side view 10.jpg",
        "/images/Russell_Heights_property/Pool side view 4.jpg",
        "/images/Russell_Heights_property/Roof top view 2.jpg",
        "/images/Russell_Heights_property/Russell_Heights_Property_Balcony.jpg",
        "/images/Russell_Heights_property/Russell_Heights_Property_Bathroom.jpg",
        "/images/Russell_Heights_property/Russell_Heights_Property_Bedroom.jpg",
        "/images/Russell_Heights_property/Russell_Heights_Property_Bedroom2.jpg",
        "/images/Russell_Heights_property/Russell_Heights_Property_Diningroom.jpg",
        "/images/Russell_Heights_property/Russell_Heights_Property_Kitchen.jpg",
        "/images/Russell_Heights_property/Russell_Heights_Property_Laundry.jpg",
        "/images/Russell_Heights_property/Russell_Heights_Property_Livingroom.jpg",
        "/images/Russell_Heights_property/Russell_Heights_Property_Livingroom2.jpg"
      ],
      unitTypes: [
        {
          name: "Double Unit",
          capacity: "4-8 guests",
          bedrooms: 2,
          bathrooms: 2,
          price: 299,
          features: ["City View", "Full Kitchen", "Living Area", "Private Balcony"],
          image: "/images/Russell_Heights_property/double_unit.jpg"
        },
        {
          name: "Single Unit",
          capacity: "2-4 guests",
          bedrooms: 1,
          bathrooms: 1,
          price: 199,
          features: ["Kitchenette", "Cozy Living Space", "Work Area", "City View"],
          image: "/images/Russell_Heights_property/single_unit.jpg"
        }
      ]
    }
  ];
  
  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      
      <div className={`app ${isLoaded ? 'loaded' : ''}`}>
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="/images/Reign Hosting Services Logos/Contentless_Logo.png" 
                alt="Reign Hosting Services Logo" 
                className={`h-10 mr-3 transition-all duration-300 ${isScrolled ? 'opacity-100' : 'opacity-90'}`}
              />
              <div className={`font-bold transition-all duration-300 ${isScrolled ? 'text-blue-700 text-xl' : 'text-white text-2xl'}`}>
                Reign Hosting Services
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <a href="#properties" className={`transition-colors ${isScrolled ? 'text-gray-700 hover:text-blue-700' : 'text-white hover:text-blue-200'}`}>Properties</a>
              <a href="#why-us" className={`transition-colors ${isScrolled ? 'text-gray-700 hover:text-blue-700' : 'text-white hover:text-blue-200'}`}>Why Choose Us</a>
              <a href="#gallery" className={`transition-colors ${isScrolled ? 'text-gray-700 hover:text-blue-700' : 'text-white hover:text-blue-200'}`}>Gallery</a>
              <a href="#virtual-tour" className={`transition-colors ${isScrolled ? 'text-gray-700 hover:text-blue-700' : 'text-white hover:text-blue-200'}`}>Virtual Tour</a>
              <a href="#contact" className={`transition-colors ${isScrolled ? 'text-gray-700 hover:text-blue-700' : 'text-white hover:text-blue-200'}`}>Contact</a>
            </div>
            
            <button className={`hidden md:block px-4 py-2 rounded-lg transition-colors ${
              isScrolled 
                ? 'bg-blue-700 text-white hover:bg-blue-800' 
                : 'bg-white text-blue-700 hover:bg-blue-50'
            }`}>
              Book Now
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Mobile Menu */}
          <div className={`md:hidden bg-white absolute w-full transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 shadow-lg' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="container mx-auto px-4 py-2">
              <div className="flex flex-col space-y-3 pb-4">
                <a 
                  href="#properties" 
                  className="py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Properties
                </a>
                <a 
                  href="#why-us" 
                  className="py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Why Choose Us
                </a>
                <a 
                  href="#gallery" 
                  className="py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Gallery
                </a>
                <a 
                  href="#virtual-tour" 
                  className="py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Virtual Tour
                </a>
                <a 
                  href="#contact" 
                  className="py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section with parallax effect */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="parallax-bg" style={{backgroundImage: "url('/images/hero-bg.jpg')"}}></div>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight">
              Exceptional Group <span className="text-blue-300">Accommodations</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 animate-fade-in animation-delay-300 max-w-3xl mx-auto">
              Luxury properties designed for unforgettable group experiences with premium amenities and stunning locations
            </p>
            
            {/* Advanced Search Bar */}
            <div className="bg-white bg-opacity-95 rounded-xl p-4 shadow-2xl mb-10 animate-fade-in animation-delay-300 transform hover:scale-[1.01] transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-medium mb-1 text-left">Location</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={18} className="text-blue-600" />
                    </div>
                    <select className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none text-gray-700">
                      <option value="">All Locations</option>
                      <option value="miami">Miami, FL</option>
                      <option value="orlando">Orlando, FL</option>
                      <option value="tampa">Tampa, FL</option>
                    </select>
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-medium mb-1 text-left">Check-in Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={18} className="text-blue-600" />
                    </div>
                    <input 
                      type="date" 
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-700"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-medium mb-1 text-left">Group Size</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users size={18} className="text-blue-600" />
                    </div>
                    <select className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none text-gray-700">
                      <option value="">Select size</option>
                      <option value="10-20">10-20 people</option>
                      <option value="21-40">21-40 people</option>
                      <option value="41-60">41-60 people</option>
                      <option value="61+">61+ people</option>
                    </select>
                  </div>
                </div>
                
                <div className="relative flex items-end">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center font-medium">
                    Search Properties
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in animation-delay-600">
              <a href="#properties" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center">
                <span>View Properties</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center">
                <span>Contact Us</span>
                <Mail size={18} className="ml-2" />
              </a>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#properties" className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </section>

        {/* Properties Showcase */}
        <PropertyShowcase properties={properties} />

        {/* Why Choose Us Section */}
        <section id="why-us" className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">OUR ADVANTAGES</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Why Choose Reign Hosting Services</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We specialize in creating unforgettable group experiences
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-500">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Users size={36} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Perfect for Groups</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our properties are specifically designed to accommodate large groups while providing privacy and comfort for each guest.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="text-blue-600 font-medium text-sm flex items-center justify-center">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-500">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Home size={36} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Premium Amenities</h3>
                <p className="text-gray-600 leading-relaxed">
                  From rooftop pools to fully equipped kitchens, our properties offer everything you need for a luxurious and comfortable stay.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="text-blue-600 font-medium text-sm flex items-center justify-center">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-500">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Calendar size={36} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Dedicated Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our team is available 24/7 to ensure your group has everything they need for a seamless and enjoyable experience.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="text-blue-600 font-medium text-sm flex items-center justify-center">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <a href="#properties" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
                <span className="font-medium">Explore Our Properties</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Property Comparison */}
        <PropertyComparison />

        {/* Gallery */}
        <Gallery />

        {/* Virtual Tour */}
        <VirtualTour tourUrl="https://my.matterport.com/show/?m=example-tour-id" />

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ */}
        <FAQ />

        {/* Contact Form */}
        <ContactForm />

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Reign Hosting Services</h3>
                <p className="text-gray-400 mb-4">
                  Luxury group accommodations with stunning views and premium amenities.
                </p>
                <div className="flex space-x-4">
                  <a href="https://facebook.com/reignhosting" className="text-gray-400 hover:text-white transition-colors">
                    <Facebook size={20} />
                  </a>
                  <a href="https://instagram.com/reignhosting" className="text-gray-400 hover:text-white transition-colors">
                    <Instagram size={20} />
                  </a>
                  <a href="https://twitter.com/reignhosting" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Properties</h4>
                <ul className="space-y-2">
                  <li><a href="#properties" className="text-gray-400 hover:text-white transition-colors">White Sands Property</a></li>
                  <li><a href="#properties" className="text-gray-400 hover:text-white transition-colors">Russell Heights Property</a></li>
                  <li><a href="#virtual-tour" className="text-gray-400 hover:text-white transition-colors">Virtual Tours</a></li>
                  <li><a href="#gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Information</h4>
                <ul className="space-y-2">
                  <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                  <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a></li>
                  <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/booking-policy" className="text-gray-400 hover:text-white transition-colors">Booking Policy</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <MapPin size={18} className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-400">5, 6 Gladstone Dr, Kingston, Jamaica</span>
                  </li>
                  <li className="flex items-center">
                    <Phone size={18} className="text-gray-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-400">+1 876-309-9016</span>
                  </li>
                  <li className="flex items-center">
                    <Mail size={18} className="text-gray-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-400">support@reignhosting.com</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Reign Hosting Services. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Sticky Booking Bar */}
        <StickyBookingBar />
      </div>
      
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}

export default App;