import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronUp, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (position >= sectionTop && position < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      closeMenu();
      setActiveSection(sectionId);
    }
  };

  // Calculate header background opacity based on scroll position
  const headerBgClass = scrollPosition > 50 
    ? 'bg-white/80 backdrop-blur-md shadow-md' 
    : 'bg-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="#home" className="text-2xl font-bold text-blue-600">
              REIGN
              <span className="text-gray-800">Stays</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink 
              href="#home" 
              label="Home" 
              isActive={activeSection === 'home'} 
              onClick={() => scrollToSection('home')} 
            />
            <NavLink 
              href="#about" 
              label="About" 
              isActive={activeSection === 'about'} 
              onClick={() => scrollToSection('about')} 
            />
            <div className="relative">
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                  activeSection === 'properties' || activeSection === 'gallery' || activeSection === 'virtual-tour'
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={toggleDropdown}
              >
                Properties
                {isDropdownOpen ? (
                  <ChevronUp size={16} className="ml-1" />
                ) : (
                  <ChevronDown size={16} className="ml-1" />
                )}
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="py-1">
                      <DropdownItem 
                        href="#properties" 
                        label="Our Properties" 
                        isActive={activeSection === 'properties'} 
                        onClick={() => {
                          scrollToSection('properties');
                          setIsDropdownOpen(false);
                        }} 
                      />
                      <DropdownItem 
                        href="#gallery" 
                        label="Gallery" 
                        isActive={activeSection === 'gallery'} 
                        onClick={() => {
                          scrollToSection('gallery');
                          setIsDropdownOpen(false);
                        }} 
                      />
                      <DropdownItem 
                        href="#virtual-tour" 
                        label="Virtual Tour" 
                        isActive={activeSection === 'virtual-tour'} 
                        onClick={() => {
                          scrollToSection('virtual-tour');
                          setIsDropdownOpen(false);
                        }} 
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <NavLink 
              href="#testimonials" 
              label="Testimonials" 
              isActive={activeSection === 'testimonials'} 
              onClick={() => scrollToSection('testimonials')} 
            />
            <NavLink 
              href="#faq" 
              label="FAQ" 
              isActive={activeSection === 'faq'} 
              onClick={() => scrollToSection('faq')} 
            />
            <NavLink 
              href="#contact" 
              label="Contact" 
              isActive={activeSection === 'contact'} 
              onClick={() => scrollToSection('contact')} 
            />
          </nav>
          
          {/* Contact Button */}
          <div className="hidden md:block">
            <a 
              href="tel:+15551234567" 
              className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                scrollPosition > 50
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white/90 text-blue-600 hover:bg-white'
              } shadow-md hover:shadow-lg`}
            >
              <Phone size={16} className="mr-2" />
              <span className="font-medium">Call Us</span>
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                scrollPosition > 50 ? 'text-gray-800' : 'text-gray-800'
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white/95 backdrop-blur-lg shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                <MobileNavLink 
                  href="#home" 
                  label="Home" 
                  isActive={activeSection === 'home'} 
                  onClick={() => scrollToSection('home')} 
                />
                <MobileNavLink 
                  href="#about" 
                  label="About" 
                  isActive={activeSection === 'about'} 
                  onClick={() => scrollToSection('about')} 
                />
                <div className="border-b border-gray-200 py-2">
                  <button 
                    className={`flex justify-between items-center w-full px-4 py-2 rounded-lg text-left ${
                      activeSection === 'properties' || activeSection === 'gallery' || activeSection === 'virtual-tour'
                        ? 'text-blue-600 font-medium' 
                        : 'text-gray-700'
                    }`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span>Properties</span>
                    {isDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        className="mt-2 pl-4 border-l-2 border-blue-100"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MobileNavLink 
                          href="#properties" 
                          label="Our Properties" 
                          isActive={activeSection === 'properties'} 
                          onClick={() => scrollToSection('properties')} 
                        />
                        <MobileNavLink 
                          href="#gallery" 
                          label="Gallery" 
                          isActive={activeSection === 'gallery'} 
                          onClick={() => scrollToSection('gallery')} 
                        />
                        <MobileNavLink 
                          href="#virtual-tour" 
                          label="Virtual Tour" 
                          isActive={activeSection === 'virtual-tour'} 
                          onClick={() => scrollToSection('virtual-tour')} 
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <MobileNavLink 
                  href="#testimonials" 
                  label="Testimonials" 
                  isActive={activeSection === 'testimonials'} 
                  onClick={() => scrollToSection('testimonials')} 
                />
                <MobileNavLink 
                  href="#faq" 
                  label="FAQ" 
                  isActive={activeSection === 'faq'} 
                  onClick={() => scrollToSection('faq')} 
                />
                <MobileNavLink 
                  href="#contact" 
                  label="Contact" 
                  isActive={activeSection === 'contact'} 
                  onClick={() => scrollToSection('contact')} 
                />
                
                <div className="pt-2">
                  <a 
                    href="tel:+15551234567" 
                    className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Phone size={18} className="mr-2" />
                    <span className="font-medium">Call Us Now</span>
                  </a>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, isActive, onClick }) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
      }`}
    >
      {label}
      {isActive && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full mx-4"
          layoutId="activeIndicator"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </a>
  );
};

interface DropdownItemProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ href, label, isActive, onClick }) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`block px-4 py-2 text-sm ${
        isActive 
          ? 'bg-blue-50 text-blue-600 font-medium' 
          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
      }`}
    >
      {label}
    </a>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ href, label, isActive, onClick }) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`block px-4 py-2 rounded-lg ${
        isActive 
          ? 'bg-blue-50 text-blue-600 font-medium' 
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {label}
    </a>
  );
};

export default Header;