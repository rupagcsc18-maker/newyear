import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, Gift, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

// 1. Define types for the FlipCard Props
interface FlipCardProps {
  title: string;
  message: string;
}

// 2. Define the shape of your Qualities objects
interface Quality {
  title: string;
  message: string;
}

const BackgroundSymbols: React.FC = () => {
  const symbols = Array.from({ length: 30 });
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#FFFDF5]">
      {symbols.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.9, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 15 }}
          className="absolute text-[#FFCC00] drop-shadow-[0_0_10px_rgba(255,204,0,0.6)]"
        >
          <Heart fill="currentColor" size={Math.random() * 20 + 15} />
        </motion.div>
      ))}
    </div>
  );
};

const FlipCard: React.FC<FlipCardProps> = ({ title, message }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false); // Type the state
  return (
    <div className="w-full h-64 cursor-pointer [perspective:1000px]" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full [transform-style:preserve-3d] shadow-2xl rounded-2xl"
      >
        <div className="absolute inset-0 [backface-visibility:hidden] bg-[#FFB800] rounded-2xl flex flex-col items-center justify-center p-4 border-4 border-white">
          <Sparkles className="text-white mb-2" size={40} />
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{title}</h3>
          <p className="text-white/90 text-sm mt-3 font-bold italic">Tap to flip</p>
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-2xl flex items-center justify-center p-8 border-4 border-[#FFB800] text-center" style={{ transform: 'rotateY(180deg)' }}>
          <p className="text-[#D97706] text-xl md:text-2xl font-bold italic font-serif leading-tight">"{message}"</p>
        </div>
      </motion.div>
    </div>
  );
};

const AboutYou: React.FC = () => {
  const [showSurprise, setShowSurprise] = useState<boolean>(false);

  const qualities: Quality[] = [
    { title: "Love", message: "Your love is the anchor that keeps me grounded." },
    { title: "Care", message: "Every little thing you do shows me how much I matter." },
    { title: "Affection", message: "Your touch and kind words make my world brighter." },
    { title: "Priority", message: "Thank you for always making me feel like your number one." },
    { title: "Smile", message: "Your laugh is my favorite song in the entire world." },
    { title: "Support", message: "I am so grateful to have you by my side through it all." },
  ];

  const triggerSurprise = (): void => {
    setShowSurprise(true);
    const end = Date.now() + (5 * 1000);
    const colors = ['#FFCC00', '#D97706', '#FFFFFF'];

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  return (
    <div className="relative min-h-screen py-12 px-6 overflow-hidden">
      <BackgroundSymbols />

      <AnimatePresence>
        {showSurprise && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-6"
          >
            <motion.div 
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-[0_0_50px_rgba(255,184,0,0.5)] border-t-8 border-[#FFB800] relative"
            >
              <button 
                onClick={() => setShowSurprise(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
              
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-[#FFB800] flex justify-center mb-6"
              >
                <Heart fill="currentColor" size={64} />
              </motion.div>

              <h2 className="text-4xl font-black text-[#D97706] mb-4 uppercase">Happy New Year 2026!</h2>
              <p className="text-xl text-gray-700 font-medium italic leading-relaxed">
                "I like you more than words can say. Every year with you is a new favorite chapter in my life. ❤️"
              </p>
              
              <button 
                onClick={() => setShowSurprise(false)}
                className="mt-8 bg-[#FFB800] text-white font-bold py-3 px-8 rounded-full hover:bg-[#D97706] transition-all"
              >
                Close with Love
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-12">
          <Link to="/letter" className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-[#D97706] flex items-center gap-2 font-bold shadow-md">
            <ArrowLeft size={20} /> Back
          </Link>
        </div>

        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-[#D97706] uppercase tracking-tighter">
            What You <span className="text-[#FFB800]">Mean</span> To Me
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {qualities.map((item, index) => (
            <FlipCard key={index} title={item.title} message={item.message} />
          ))}
        </div>

        <div className="flex flex-col items-center pb-24">
          <h3 className="text-[#D97706] text-xl font-black mb-6 uppercase">Ready for your New Year's Surprise?</h3>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerSurprise}
            className="group flex items-center gap-4 bg-[#FFB800] text-white font-black py-6 px-12 rounded-full text-2xl shadow-xl transition-all cursor-pointer border-b-8 border-amber-600 active:border-b-0"
          >
            <Gift size={32} />
            Click for Surprise
            <Heart size={32} fill="white" className="group-hover:animate-ping" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AboutYou;