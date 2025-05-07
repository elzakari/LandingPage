import React, { useState } from 'react';
import { Check, X, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const PropertyComparison: React.FC = () => {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  
  const toggleFeature = (index: number) => {
    if (expandedFeature === index) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(index);
    }
  };

  const features = [
    { 
      name: "Rooftop Pool", 
      whiteSands: true, 
      russellHeights: true,
      adinaVilla: true,
      description: "Enjoy stunning views from our infinity rooftop pools with comfortable loungers and poolside service."
    },
    { 
      name: "Ocean Views", 
      whiteSands: true, 
      russellHeights: true,
      adinaVilla: true,
      description: "Wake up to breathtaking ocean views from most units, perfect for enjoying sunrises and sunsets."
    },
    { 
      name: "Direct Beach Access", 
      whiteSands: false, 
      russellHeights: true,
      adinaVilla: false,
      description: "Step directly onto the pristine beach from our Russell Heights Property."
    },
    { 
      name: "Full Kitchen", 
      whiteSands: true, 
      russellHeights: true,
      adinaVilla: true,
      description: "All units feature fully equipped kitchens with modern appliances, perfect for group meals."
    },
    { 
      name: "Private Balconies", 
      whiteSands: true, 
      russellHeights: true,
      adinaVilla: true,
      description: "Relax on your own private balcony with comfortable seating and amazing views."
    },
    { 
      name: "Entertainment Area", 
      whiteSands: true, 
      russellHeights: true,
      adinaVilla: true,
      description: "Spacious entertainment areas with large TVs, sound systems, and comfortable seating for group gatherings."
    },
    { 
      name: "Event Space", 
      whiteSands: false, 
      russellHeights: true,
      adinaVilla: true,
      description: "Dedicated event spaces for celebrations, meetings, and special occasions."
    },
    { 
      name: "Fitness Center", 
      whiteSands: false, 
      russellHeights: true,
      adinaVilla: true,
      description: "Stay fit during your vacation with our modern fitness center featuring cardio and strength equipment."
    },
    { 
      name: "BBQ Area", 
      whiteSands: true, 
      russellHeights: true,
      adinaVilla: true,
      description: "Outdoor BBQ areas with premium grills and dining space for enjoyable group cookouts."
    },
    { 
      name: "Concierge Service", 
      whiteSands: false, 
      russellHeights: true,
      adinaVilla: true,
      description: "Our dedicated concierge team is available to assist with reservations, activities, and special requests."
    },
    { 
      name: "Private Chef", 
      whiteSands: false, 
      russellHeights: false,
      adinaVilla: true,
      description: "Enjoy expertly prepared meals by our in-house chef at no additional cost."
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">PROPERTY FEATURES</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Compare Our Properties</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect property for your group's needs
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto overflow-hidden rounded-xl shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-6 text-left bg-gray-50 border-b-2 border-gray-200 rounded-tl-xl"></th>
                  <th className="p-6 text-center bg-blue-50 border-b-2 border-blue-200">
                    <div className="text-xl font-bold text-blue-800 mb-1">White Sands Property</div>
                    <div className="text-blue-600 flex flex-col md:flex-row items-center justify-center gap-2">
                      <span className="bg-blue-100 px-3 py-1 rounded-full text-sm">11 Units</span>
                      <span className="hidden md:inline mx-2">•</span>
                      <span className="bg-blue-100 px-3 py-1 rounded-full text-sm">Up to 44 guests</span>
                    </div>
                    <div className="mt-2 text-sm text-blue-700">Starting from $199/night</div>
                  </th>
                  <th className="p-6 text-center bg-blue-100 border-b-2 border-blue-300">
                    <div className="text-xl font-bold text-blue-800 mb-1">Russell Heights Property</div>
                    <div className="text-blue-600 flex flex-col md:flex-row items-center justify-center gap-2">
                      <span className="bg-blue-200 px-3 py-1 rounded-full text-sm">25 Units</span>
                      <span className="hidden md:inline mx-2">•</span>
                      <span className="bg-blue-200 px-3 py-1 rounded-full text-sm">Up to 100 guests</span>
                    </div>
                    <div className="mt-2 text-sm text-blue-700">Starting from $299/night</div>
                  </th>
                  <th className="p-6 text-center bg-blue-200 border-b-2 border-blue-400 rounded-tr-xl">
                    <div className="text-xl font-bold text-blue-800 mb-1">Adina Villa</div>
                    <div className="text-blue-600 flex flex-col md:flex-row items-center justify-center gap-2">
                      <span className="bg-blue-300 px-3 py-1 rounded-full text-sm">Entire Villa</span>
                      <span className="hidden md:inline mx-2">•</span>
                      <span className="bg-blue-300 px-3 py-1 rounded-full text-sm">Up to 16+ guests</span>
                    </div>
                    <div className="mt-2 text-sm text-blue-700">Starting from $399/night</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <React.Fragment key={index}>
                    <tr 
                      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} cursor-pointer hover:bg-gray-100 transition-colors`}
                      onClick={() => toggleFeature(index)}
                    >
                      <td className="p-5 border-b border-gray-200 font-medium flex items-center">
                        <span>{feature.name}</span>
                        <button className="ml-2 text-blue-500 focus:outline-none">
                          {expandedFeature === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </td>
                      <td className="p-5 text-center border-b border-gray-200">
                        {feature.whiteSands ? (
                          <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                            <Check size={20} className="text-green-600" />
                          </div>
                        ) : (
                          <div className="bg-red-50 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                            <X size={20} className="text-red-500" />
                          </div>
                        )}
                      </td>
                      <td className="p-5 text-center border-b border-gray-200">
                        {feature.russellHeights ? (
                          <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                            <Check size={20} className="text-green-600" />
                          </div>
                        ) : (
                          <div className="bg-red-50 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                            <X size={20} className="text-red-500" />
                          </div>
                        )}
                      </td>
                      <td className="p-5 text-center border-b border-gray-200">
                        {feature.adinaVilla ? (
                          <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                            <Check size={20} className="text-green-600" />
                          </div>
                        ) : (
                          <div className="bg-red-50 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
                            <X size={20} className="text-red-500" />
                          </div>
                        )}
                      </td>
                    </tr>
                    {expandedFeature === index && (
                      <tr className="bg-blue-50">
                        <td colSpan={4} className="p-4 text-sm text-gray-700 border-b border-gray-200">
                          <div className="p-3 bg-white rounded-lg shadow-inner">
                            <p>{feature.description}</p>
                            {feature.name === "Rooftop Pool" && (
                              <div className="mt-2 grid grid-cols-3 gap-2">
                                <div className="bg-gray-100 rounded p-2 text-xs">
                                  <span className="font-semibold">White Sands:</span> Heated infinity pool with ocean views
                                </div>
                                <div className="bg-gray-100 rounded p-2 text-xs">
                                  <span className="font-semibold">Russell Heights:</span> Two pools including a family-friendly option
                                </div>
                                <div className="bg-gray-100 rounded p-2 text-xs">
                                  <span className="font-semibold">Adina Villa:</span> Infinity pool with 180-degree ocean views
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                <tr>
                  <td className="p-6 rounded-bl-xl"></td>
                  <td className="p-6 text-center">
                    <a 
                      href="https://www.airbnb.com/users/show/593152773" 
                      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg group"
                    >
                      <span className="font-medium">View Details</span>
                      <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </td>
                  <td className="p-6 text-center">
                    <a 
                      href="https://www.airbnb.com/users/show/574202830" 
                      className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg group"
                    >
                      <span className="font-medium">View Details</span>
                      <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </td>
                  <td className="p-6 text-center rounded-br-xl">
                    <a 
                      href="https://www.airbnb.com/l/DAvWckre" 
                      className="inline-flex items-center justify-center bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg group"
                    >
                      <span className="font-medium">View Details</span>
                      <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="text-center mt-12 text-gray-600">
          <p className="max-w-2xl mx-auto">
            All properties include complimentary Wi-Fi, air conditioning, and 24/7 customer support.
            <br />Contact us for more detailed information about specific amenities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropertyComparison;