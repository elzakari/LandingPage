import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search, Filter, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
  category: string;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen, category, index }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);
  
  return (
    <motion.div 
      className="border-b border-gray-200 last:border-b-0 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex items-center">
        <span className={`text-xs font-medium px-2 py-1 rounded-full mr-3 ${
          category === 'Booking' ? 'bg-blue-100 text-blue-700' :
          category === 'Amenities' ? 'bg-green-100 text-green-700' :
          category === 'Events' ? 'bg-purple-100 text-purple-700' :
          'bg-orange-100 text-orange-700'
        }`}>
          {category}
        </span>
        <button
          className="flex justify-between items-center w-full py-5 px-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 rounded-lg transition-colors hover:bg-gray-50"
          onClick={toggleOpen}
          aria-expanded={isOpen}
        >
          <h3 className="text-lg font-medium text-gray-800">{question}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={20} className={isOpen ? "text-blue-600" : "text-gray-600"} />
          </motion.div>
        </button>
      </div>
      <div 
        ref={contentRef}
        style={{ height }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="py-4 px-10 text-gray-600 bg-gray-50 rounded-b-lg">
          <p className="leading-relaxed">{answer}</p>
        </div>
      </div>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showContactForm, setShowContactForm] = useState(false);
  
  const faqs = [
    {
      question: "What is the minimum stay requirement?",
      answer: "Our minimum stay requirement varies by season. During peak season (June-August and December-January), we require a minimum of 3 nights. During the rest of the year, the minimum stay is 2 nights. For special events or holidays, minimum stays may be longer.",
      category: "Booking"
    },
    {
      question: "Are the properties suitable for events?",
      answer: "Yes, both properties are suitable for events. The Russell Heights Property includes a dedicated event space that can accommodate up to 120 people. The White Sands Property has entertainment areas suitable for smaller gatherings. Please note that additional fees may apply for events, and prior approval is required.",
      category: "Events"
    },
    {
      question: "Is there parking available?",
      answer: "Yes, both properties offer parking. White Sands Property has parking for up to 15 vehicles, while Russell Heights Property can accommodate up to 30 vehicles. Additional street parking may be available depending on local regulations.",
      category: "Amenities"
    },
    {
      question: "Do you offer any concierge services?",
      answer: "Yes, we offer concierge services for both properties. Our concierge can assist with transportation arrangements, restaurant reservations, activity bookings, grocery delivery, and special requests. The Russell Heights Property includes full-time concierge service, while White Sands Property offers on-demand concierge assistance.",
      category: "Services"
    },
    {
      question: "What amenities are included?",
      answer: "Both properties include fully equipped kitchens, high-speed WiFi, smart TVs, air conditioning, washer/dryer units, and premium linens and towels. Outdoor amenities include rooftop pools, BBQ areas, and outdoor seating. The Russell Heights Property additionally features a fitness center and dedicated event space.",
      category: "Amenities"
    },
    {
      question: "How far are the properties from the beach?",
      answer: "The Russell Heights Property offers direct beach access. The White Sands Property is located approximately 200 meters (a 3-minute walk) from the beach.",
      category: "Location"
    },
    {
      question: "What is your cancellation policy?",
      answer: "Our standard cancellation policy allows for a full refund if cancelled 30 days before check-in. Cancellations made 14-29 days before check-in receive a 50% refund. Cancellations less than 14 days before check-in are not eligible for a refund. Please note that special events may have different cancellation terms.",
      category: "Booking"
    },
    {
      question: "Do you offer group discounts?",
      answer: "Yes, we offer discounts for extended stays and for booking both properties together. Groups booking 5+ nights may qualify for a 10% discount, and booking both properties together may qualify for a 15% discount. Contact us for more details on group rates.",
      category: "Booking"
    }
  ];
  
  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const filteredFAQs = faqs
    .filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(faq => activeCategory === 'All' || faq.category === activeCategory);
  
  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">QUESTIONS & ANSWERS</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our properties
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden divide-y divide-gray-200">
            <AnimatePresence>
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    toggleOpen={() => toggleFAQ(index)}
                    category={faq.category}
                    index={index}
                  />
                ))
              ) : (
                <motion.div 
                  className="p-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-gray-500 mb-4">No questions found matching your search.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('All');
                    }}
                    className="text-blue-600 underline"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <AnimatePresence>
          {!showContactForm ? (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="text-gray-600 mb-4">
                Can't find what you're looking for?
              </p>
              <button 
                onClick={() => setShowContactForm(true)}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <MessageCircle size={18} className="mr-2" />
                <span className="font-medium">Ask a Question</span>
              </button>
            </motion.div>
          ) : (
            <motion.div 
              className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">Ask Your Question</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Question</label>
                  <textarea 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                    placeholder="Type your question here..."
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit Question
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center bg-blue-50 px-6 py-4 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mr-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-700">
              For urgent inquiries, please call us at <span className="font-medium text-blue-700">+1 (555) 123-4567</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;