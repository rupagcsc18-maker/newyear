import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
// Ensure the path to your image is correct (src/assets/letter.png)
import letterImg from '../assets/image1.png';

// 1. Define Props for the Heart Overlay
interface ImageOverlayHeartProps {
  delay: number;
  style: React.CSSProperties; // Use React's built-in CSS type
}

// 1. Background Floating Symbols (High Brightness & Glow)
const BackgroundSymbols: React.FC = () => {
  const symbols = Array.from({ length: 25 });
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {symbols.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: "110vh", 
            x: `${Math.random() * 100}vw`, 
            opacity: 0,
            rotate: 0,
            scale: 0.5
          }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, 0.8, 0.8, 0], 
            rotate: 360,
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{ 
            duration: 12 + Math.random() * 8, 
            repeat: Infinity, 
            delay: Math.random() * 20,
            ease: "linear" 
          }}
          className="absolute text-[#FFCC00] drop-shadow-[0_0_8px_rgba(255,204,0,0.6)]"
        >
          {i % 3 === 0 ? <Heart fill="currentColor" size={30} /> : 
           i % 3 === 1 ? <Star fill="currentColor" size={26} /> : 
           <Sparkles size={28} />}
        </motion.div>
      ))}
    </div>
  );
};

// 2. Hearts Floating specifically over the PNG image
// Typed the props here
const ImageOverlayHeart: React.FC<ImageOverlayHeartProps> = ({ delay, style }) => (
  <motion.div
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: [-20, -150], 
      opacity: [0, 1, 0],
      scale: [0.8, 1.3, 0.8],
      x: [0, (Math.random() - 0.5) * 60] 
    }}
    transition={{ 
      duration: 3 + Math.random() * 2, 
      repeat: Infinity, 
      delay: delay,
      ease: "easeOut"
    }}
    className="absolute text-[#FFD700] drop-shadow-md pointer-events-none"
    style={style}
  >
    <Heart fill="currentColor" size={Math.random() * 25 + 15} />
  </motion.div>
);

const LetterPage: React.FC = () => {
  const overlayHearts = Array.from({ length: 15 });

  return (
    <div className="relative min-h-screen bg-[#FFFDF5] py-10 px-4 flex flex-col items-center overflow-x-hidden">
      
      {/* Background Layer */}
      <BackgroundSymbols />

      {/* Navigation Header */}
      <div className="max-w-4xl w-full mb-6 flex justify-between items-center z-20">
        {/* Back Button (Top Left) */}
        <Link 
          to="/" 
          className="text-[#D97706] flex items-center gap-2 hover:font-bold transition-all"
        >
          <ArrowLeft size={24} /> 
          <span className="text-lg font-bold">Back</span>
        </Link>

        {/* About You Link (Top Right) */}
        <Link 
          to="/about" 
          className="bg-[#FFB800] text-white px-5 py-2 rounded-full flex items-center gap-2 shadow-md hover:bg-[#EAB308] hover:scale-105 transition-all group"
        >
          <span className="font-bold">About You</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart size={18} fill="white" />
          </motion.div>
        </Link>
      </div>

      {/* Main Letter Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full bg-white/95 backdrop-blur-sm shadow-[0_20px_50px_rgba(255,184,0,0.2)] rounded-2xl border-t-[14px] border-[#FFB800] z-10 overflow-hidden flex flex-col"
      >
        <div className="p-8 md:p-12 overflow-y-auto max-h-[85vh] relative">
          
          {/* Centered Large Image with Heart Overlay */}
          <div className="flex justify-center mb-10 relative">
            <div className="relative w-full max-w-2xl">
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {overlayHearts.map((_, i) => (
                        <ImageOverlayHeart 
                            key={i} 
                            delay={i * 0.4} 
                            style={{ 
                                left: `${Math.random() * 100}%`, 
                                bottom: '20%' 
                            }} 
                        />
                    ))}
                </div>

                <img 
                  src={letterImg} 
                  alt="Our Letter" 
                  className="w-full h-auto rounded-xl shadow-lg border-2 border-amber-100 relative z-0"
                  onError={(e) => { 
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x400?text=Letter+Image+Not+Found"; 
                  }}
                />
            </div>
          </div>

          {/* Letter Content */}
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#D97706] mb-8 italic font-serif tracking-tight">
              To My Dearest...
            </h2>

            <div className="space-y-6 text-gray-800 leading-relaxed text-xl md:text-2xl font-semibold">
              <p>
                As we step into 2026, I wanted to take a moment to tell you how much 
                you mean to me. Looking back at this past year, my favorite memories 
                are all the ones we shared together.
              </p>
              
              <p>
                You bring so much <span className="text-[#FFB800] font-extrabold underline decoration-amber-300 decoration-4">yellow</span>—warmth, 
                sunshine, and happiness—into my life every single day. 
                Thank you for being my person.
              </p>
              
              <div className="pt-12 pb-6">
                <p className="text-[#FFB800] font-black text-4xl italic drop-shadow-sm">
                  Always yours,
                </p>
                <p className="text-[#D97706] text-3xl font-bold mt-2">
                  Rupa
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

export default LetterPage;