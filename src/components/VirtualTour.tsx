import React, { useState, useEffect, useRef } from 'react';
import { Maximize, Minimize, Play, Info, ChevronLeft, ChevronRight, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VirtualTourProps {
  tourUrl?: string;
}

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const VirtualTour: React.FC<VirtualTourProps> = ({ tourUrl }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [currentTour, setCurrentTour] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  
  // Change this line to use the Window['YT']['Player'] type instead of YT.Player
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const tours = [
    {
      id: 1,
      name: "White Sands Property",
      url: "https://www.youtube.com/watch?v=B4o8PvcqHC4",
      description: "Explore our stunning White Sands Property with ocean views and premium amenities. This virtual tour showcases the spacious living areas, modern kitchen, and breathtaking ocean views from the balcony.",
      thumbnail: "/images/White_Sands_property/main.jpg"
    },
    {
      id: 2,
      name: "Russell Heights Property",
      url: "https://www.youtube.com/watch?v=iIqVn1uDGuk",
      description: "Take a virtual walk through our luxurious Russell Heights Property with panoramic city views. Discover the infinity pool, entertainment areas, and elegantly designed interiors perfect for group stays.",
      thumbnail: "/images/Russell_Heights_property/main.jpg"
    }
  ];

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Add this effect to style the YouTube iframe
  useEffect(() => {
    const styleYouTubeIframe = () => {
      const iframe = document.querySelector('#youtube-player iframe');
      if (iframe) {
        const iframeElement = iframe as HTMLElement;
        iframeElement.style.width = '100%';
        iframeElement.style.height = '100%';
        iframeElement.style.position = 'absolute';
        iframeElement.style.top = '0';
        iframeElement.style.left = '0';
      }
    };

    // Apply styles immediately and then check periodically
    styleYouTubeIframe();
    const intervalId = setInterval(styleYouTubeIframe, 300);
    
    // Clear interval on cleanup
    return () => clearInterval(intervalId);
  }, [currentTour]);

  // Fix ESLint warnings by including initializePlayer in dependencies
  // Load YouTube API
  useEffect(() => {
    // Create YouTube API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = initializePlayer;

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-initialize player when current tour changes
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initializePlayer();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTour]);

  const initializePlayer = () => {
    setIsLoading(true);
    
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    const videoId = getYouTubeVideoId(tours[currentTour].url);
    if (!videoId) return;

    const playerElement = document.getElementById('youtube-player');
    if (!playerElement) return;

    playerRef.current = new window.YT.Player('youtube-player', {
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        mute: isMuted ? 1 : 0,
        enablejsapi: 1,
        origin: window.location.origin
      },
      events: {
        onReady: () => {
          setIsLoading(false);
        },
        onStateChange: (event) => {
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          if (event.data === window.YT.PlayerState.PLAYING) {
            setShowThumbnail(false);
          }
        },
        onError: () => {
          console.error('YouTube player error');
          setIsLoading(false);
        }
      }
    });
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const togglePlayPause = () => {
    if (!playerRef.current) return;
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
      setShowThumbnail(false);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    
    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  const changeTour = (direction: 'next' | 'prev') => {
    setIsLoading(true);
    setShowThumbnail(true);
    if (direction === 'next') {
      setCurrentTour(prev => (prev + 1) % tours.length);
    } else {
      setCurrentTour(prev => (prev - 1 + tours.length) % tours.length);
    }
  };
  
  return (
    <section id="virtual-tour" className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">IMMERSIVE EXPERIENCE</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Experience Our Properties Virtually</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a virtual tour of our properties and imagine your next group retreat
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Tour Selection Tabs */}
          <div className="flex flex-wrap justify-center mb-6 gap-4">
            {tours.map((tour, index) => (
              <motion.button
                key={tour.id}
                onClick={() => {
                  setIsLoading(true);
                  setShowThumbnail(true);
                  setCurrentTour(index);
                }}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  currentTour === index 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {tour.name}
              </motion.button>
            ))}
          </div>
          
          <div ref={containerRef} className="relative rounded-xl overflow-hidden shadow-2xl bg-black">
            {/* Loading Overlay */}
            <AnimatePresence>
              {isLoading && (
                <motion.div 
                  className="absolute inset-0 bg-gray-900/80 z-20 flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-white text-lg">Loading virtual tour...</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Thumbnail Overlay */}
            <AnimatePresence>
              {showThumbnail && (
                <motion.div 
                  className="absolute inset-0 z-10 bg-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <img 
                    src={tours[currentTour].thumbnail} 
                    alt={tours[currentTour].name}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-center justify-center">
                    <motion.button
                      onClick={togglePlayPause}
                      className="bg-blue-600/90 hover:bg-blue-700 text-white p-6 rounded-full shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play size={32} fill="white" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* YouTube Player */}
            <div className="relative w-full aspect-video bg-black">
              <div id="youtube-player" className="absolute inset-0 w-full h-full"></div>
              
              {/* Custom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center z-10">
                <div className="text-white flex items-center space-x-4">
                  <button 
                    onClick={togglePlayPause}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white" />}
                  </button>
                  
                  <button 
                    onClick={toggleMute}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
                  </button>
                  
                  <h3 className="font-medium ml-2">{tours[currentTour].name}</h3>
                </div>
                
                <div className="flex space-x-3">
                  <motion.button 
                    onClick={() => setShowInfo(!showInfo)}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Show information"
                  >
                    <Info size={18} className="text-white" />
                  </motion.button>
                  
                  <motion.button 
                    onClick={toggleFullscreen}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    {isFullscreen ? (
                      <Minimize size={18} className="text-white" />
                    ) : (
                      <Maximize size={18} className="text-white" />
                    )}
                  </motion.button>
                </div>
              </div>
              
              {/* Tour Navigation */}
              <button 
                onClick={() => changeTour('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors z-10"
                aria-label="Previous tour"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                onClick={() => changeTour('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors z-10"
                aria-label="Next tour"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          
          {/* Tour Information Panel */}
          <AnimatePresence>
            {showInfo && (
              <motion.div 
                className="mt-4 bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{tours[currentTour].name}</h3>
                  <button 
                    onClick={() => setShowInfo(false)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close information"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{tours[currentTour].description}</p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Video Controls</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                        <Play size={12} className="text-blue-700" />
                      </span>
                      Play/Pause: Control video playback
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                        <Volume2 size={12} className="text-blue-700" />
                      </span>
                      Mute/Unmute: Toggle audio
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                        <Maximize size={12} className="text-blue-700" />
                      </span>
                      Fullscreen: Expand for immersive viewing
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              For a more immersive experience, click the fullscreen button or visit us in person
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span className="font-medium">Schedule an In-Person Tour</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Add TypeScript declaration for YouTube API
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          playerVars?: {
            autoplay?: number;
            controls?: number;
            modestbranding?: number;
            rel?: number;
            showinfo?: number;
            mute?: number;
            enablejsapi?: number;
            origin?: string;
          };
          events?: {
            onReady?: () => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: () => void;
          };
        }
      ) => {
        destroy: () => void;
        playVideo: () => void;
        pauseVideo: () => void;
        mute: () => void;
        unMute: () => void;
      };
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady: (() => void) | null;
  }
}

export default VirtualTour;