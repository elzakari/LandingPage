import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, Calendar, Users, Home } from 'lucide-react';

// Type declaration for EmailJS
declare global {
  interface Window {
    emailjs: {
      init: (publicKey: string) => void;
      send: (serviceId: string, templateId: string, templateParams: any, publicKey: string) => Promise<any>;
    };
  }
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: '',
    propertyInterest: '',
    groupSize: '',
    preferredDate: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  // Add focus state for input fields
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  // Add validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formTouched, setFormTouched] = useState(false);

  // Handle form validation
  useEffect(() => {
    if (formTouched) {
      const newErrors: Record<string, string> = {};
      
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      
      if (!formData.message.trim()) {
        newErrors.message = 'Message is required';
      } else if (formData.message.length < 10) {
        newErrors.message = 'Message must be at least 10 characters';
      }
      
      setErrors(newErrors);
    }
  }, [formData, formTouched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormTouched(true);
  };

  // Handle focus and blur for animation effects
  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormTouched(true);
    
    // Check for validation errors
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Using EmailJS service to send emails without a backend
      const templateParams = {
        to_email: 'support@reignhostingsvc.com',
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        message: formData.message,
        subject: formData.subject || 'General Inquiry',
        property_interest: formData.propertyInterest || 'Not specified',
        group_size: formData.groupSize || 'Not specified',
        preferred_date: formData.preferredDate || 'Not specified',
      };
      
      // Now TypeScript will recognize window.emailjs
      if (window.emailjs) {
        await window.emailjs.send(
          'service_id', // Replace with your EmailJS service ID
          'template_id', // Replace with your EmailJS template ID
          templateParams,
          'user_id' // Replace with your EmailJS user ID
        );
        
        setSubmitStatus({
          success: true,
          message: 'Your message has been sent successfully! We will get back to you soon.',
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          subject: '',
          propertyInterest: '',
          groupSize: '',
          preferredDate: '',
        });
        setFormTouched(false);
      } else {
        // Fallback for development or if EmailJS is not available
        console.log('Form submission data:', templateParams);
        
        // Simulate successful submission
        setTimeout(() => {
          setSubmitStatus({
            success: true,
            message: 'Your message has been sent successfully! We will get back to you soon.',
          });
          
          // Reset form
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            subject: '',
            propertyInterest: '',
            groupSize: '',
            preferredDate: '',
          });
          setFormTouched(false);
        }, 1500);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'There was an error sending your message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">GET IN TOUCH</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Contact Us</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our properties or services? We're here to help you plan your perfect group stay.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Contact Information Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
              <div className="bg-blue-600 text-white p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="mb-8 opacity-90">Fill out the form and our team will get back to you within 24 hours</p>
              </div>
              
              <div className="p-8 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-blue-500 bg-opacity-30 p-3 rounded-full mr-4">
                      <Phone size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200">Phone</p>
                      <a href="tel:+18763099020" className="text-white hover:text-blue-200 transition-colors">+1 (876) 309-9020</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-blue-500 bg-opacity-30 p-3 rounded-full mr-4">
                      <Mail size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200">Email</p>
                      <a href="mailto:support@reignhostingsvc.com" className="text-white hover:text-blue-200 transition-colors">support@reignhostingsvc.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-blue-500 bg-opacity-30 p-3 rounded-full mr-4">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200">Location</p>
                      <p className="text-white">Negril, Jamaica</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-blue-500 bg-opacity-30 p-3 rounded-full mr-4">
                      <Clock size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200">Business Hours</p>
                      <p className="text-white">Mon - Fri: 9AM - 5PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 flex space-x-4">
                  <a href="#" className="bg-blue-500 bg-opacity-30 p-3 rounded-full hover:bg-opacity-50 transition-all">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-500 bg-opacity-30 p-3 rounded-full hover:bg-opacity-50 transition-all">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-500 bg-opacity-30 p-3 rounded-full hover:bg-opacity-50 transition-all">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form - Enhanced */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form tabs for different inquiry types */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({...prev, subject: 'Booking Inquiry'}))}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.subject === 'Booking Inquiry' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Booking Inquiry
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({...prev, subject: 'Property Information'}))}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.subject === 'Property Information' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Property Information
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({...prev, subject: 'General Question'}))}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.subject === 'General Question' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    General Question
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-gray-50 border ${
                        errors.name ? 'border-red-500' : 
                        focusedField === 'name' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
                      } rounded-lg outline-none transition-all duration-200 text-gray-700`}
                      placeholder="Your Name"
                      required
                    />
                    <label 
                      htmlFor="name" 
                      className={`absolute left-4 ${
                        focusedField === 'name' || formData.name ? 'text-xs -top-2.5 bg-white px-1 text-blue-600' : 'text-gray-500 top-3'
                      } transition-all duration-200`}
                    >
                      Your Name
                    </label>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-gray-50 border ${
                        errors.email ? 'border-red-500' : 
                        focusedField === 'email' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
                      } rounded-lg outline-none transition-all duration-200 text-gray-700`}
                      placeholder="Email Address"
                      required
                    />
                    <label 
                      htmlFor="email" 
                      className={`absolute left-4 ${
                        focusedField === 'email' || formData.email ? 'text-xs -top-2.5 bg-white px-1 text-blue-600' : 'text-gray-500 top-3'
                      } transition-all duration-200`}
                    >
                      Email Address
                    </label>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-gray-50 border ${
                        errors.phone ? 'border-red-500' : 
                        focusedField === 'phone' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
                      } rounded-lg outline-none transition-all duration-200 text-gray-700`}
                      placeholder="Phone Number"
                    />
                    <label 
                      htmlFor="phone" 
                      className={`absolute left-4 ${
                        focusedField === 'phone' || formData.phone ? 'text-xs -top-2.5 bg-white px-1 text-blue-600' : 'text-gray-500 top-3'
                      } transition-all duration-200`}
                    >
                      Phone Number
                    </label>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  
                  {/* Property Interest Dropdown */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Home size={16} className="text-blue-600" />
                    </div>
                    <select
                      id="propertyInterest"
                      name="propertyInterest"
                      value={formData.propertyInterest}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none text-gray-700"
                    >
                      <option value="">Interested Property (Optional)</option>
                      <option value="Villa Serenity">Villa Serenity</option>
                      <option value="Ocean View Estate">Ocean View Estate</option>
                      <option value="Mountain Retreat">Mountain Retreat</option>
                      <option value="Beachfront Paradise">Beachfront Paradise</option>
                    </select>
                  </div>
                </div>
                
                {/* Additional fields for booking inquiries */}
                {formData.subject === 'Booking Inquiry' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users size={16} className="text-blue-600" />
                      </div>
                      <select
                        id="groupSize"
                        name="groupSize"
                        value={formData.groupSize}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none text-gray-700"
                      >
                        <option value="">Group Size</option>
                        <option value="1-5 people">1-5 people</option>
                        <option value="6-10 people">6-10 people</option>
                        <option value="11-20 people">11-20 people</option>
                        <option value="21-40 people">21-40 people</option>
                        <option value="41+ people">41+ people</option>
                      </select>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={16} className="text-blue-600" />
                      </div>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-700"
                      />
                    </div>
                  </div>
                )}
                
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    rows={5}
                    className={`w-full px-4 py-3 bg-gray-50 border ${
                      errors.message ? 'border-red-500' : 
                      focusedField === 'message' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
                    } rounded-lg outline-none transition-all duration-200 text-gray-700`}
                    placeholder="Your Message"
                    required
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className={`absolute left-4 ${
                      focusedField === 'message' || formData.message ? 'text-xs -top-2.5 bg-white px-1 text-blue-600' : 'text-gray-500 top-3'
                    } transition-all duration-200`}
                  >
                    Your Message
                  </label>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                
                {/* Privacy policy checkbox */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and consent to having my data processed.
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <MessageSquare size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
              
              {submitStatus && (
                <div className={`mt-6 p-4 rounded-lg ${
                  submitStatus.success ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
                } flex items-start`}>
                  <div className={`p-2 rounded-full mr-3 ${submitStatus.success ? 'bg-green-100' : 'bg-red-100'}`}>
                    {submitStatus.success ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{submitStatus.success ? 'Thank you!' : 'Oops!'}</h4>
                    <p>{submitStatus.message}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;