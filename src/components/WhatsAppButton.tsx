import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const phoneNumber = '+1 876-309-9020'; // Updated phone number
  const message = 'Hello! I\'m interested in booking a property for my group.';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl mb-4 w-72 overflow-hidden transform transition-all duration-300 origin-bottom-right">
          <div className="bg-green-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle size={20} className="mr-2" />
              <span className="font-medium">WhatsApp Chat</span>
            </div>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              Have questions about our properties? Chat with us directly on WhatsApp!
            </p>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-lg transition-colors"
            >
              Start Chat
            </a>
          </div>
        </div>
      )}
      
      <button 
        onClick={toggleChat}
        className={`bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all transform hover:scale-110 ${
          isOpen ? 'rotate-90' : ''
        }`}
        aria-label="WhatsApp Chat"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageCircle size={24} />
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;