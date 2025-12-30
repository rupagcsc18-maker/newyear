import React, { useState, useEffect, FormEvent } from 'react';
import Lottie from 'lottie-react';
import welcomeAnimation from '../assets/welcome.json';
import { Heart, Timer, Lock, Lightbulb, Volume2, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// 1. Define the Interface for Props
interface HomeProps {
  onUnlock?: () => void; // Optional function that returns nothing
}

// 2. Define the Interface for the Timer state
interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const Home: React.FC<HomeProps> = ({ onUnlock }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });
  const [inputCode, setInputCode] = useState<string>("");
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const CORRECT_CODE = "VSR"; 

  useEffect(() => {
    const target = new Date("January 1, 2026 00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          hours: Math.floor((distance / (1000 * 60 * 60))),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3. Type the Form Event
  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    if (inputCode.toLowerCase() === CORRECT_CODE.toLowerCase()) {
      setIsUnlocked(true);
      setError(false);
      if (onUnlock) onUnlock(); 
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      
      {/* Background Hearts */}
      <div className="fixed top-10 left-10 text-[#FFB800] opacity-20"><Heart size={48} /></div>
      <div className="fixed bottom-10 right-10 text-[#FFB800] opacity-20"><Heart size={64} /></div>

      {/* TOP INSTRUCTION */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 bg-amber-100/50 border border-amber-200 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
      >
        <Info size={16} className="text-[#D97706]" />
        <p className="text-[#D97706] text-xs font-bold italic uppercase tracking-wider">
          song start and end chusii navvadhuuu....🤣🤣🤣🤣🤣🤣
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="w-full max-w-lg mb-4">
        <Lottie animationData={welcomeAnimation} loop={true} className="drop-shadow-2xl" />
      </motion.div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="z-10 w-full max-w-md">
        
        {/* Countdown Timer */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 text-amber-600 font-bold mb-4 uppercase tracking-[0.2em] text-sm">
            <Timer size={18} /> <span>Countdown to 2026</span>
          </div>
          <div className="flex gap-4">
            {(['HRS', 'MIN', 'SEC'] as const).map((label, i) => {
               const values = [timeLeft.hours, timeLeft.minutes, timeLeft.seconds];
               return (
                <div key={i} className="flex flex-col items-center">
                  <div className="bg-white/80 backdrop-blur-sm border-2 border-[#FFB800] rounded-2xl w-16 h-16 flex items-center justify-center shadow-xl">
                    <span className="text-2xl font-black text-[#D97706]">{values[i].toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 mt-2 tracking-widest">{label}</span>
                </div>
               )
            })}
          </div>
        </div>

        <h1 className="text-4xl font-bold text-[#D97706] mb-4 uppercase tracking-tighter">Happy New Year!</h1>

        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.form 
              key="lock"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              onSubmit={handleUnlock}
              className="bg-white/50 p-6 rounded-3xl border-2 border-dashed border-[#FFB800] backdrop-blur-sm shadow-inner relative"
            >
              <p className="text-amber-800 font-bold mb-6 flex items-center justify-center gap-2 italic">
                <Lock size={16} /> Unlock your special gift...
              </p>

              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} className="flex items-center justify-center gap-1 text-[#D97706] text-sm font-bold italic mb-4 bg-amber-50 py-1 px-4 rounded-full w-fit mx-auto border border-amber-100 shadow-sm">
                <Lightbulb size={14} className="text-[#FFB800]" /> Hint: Combination of our Names
              </motion.div>

              <div className="flex flex-col gap-3">
                <input 
                  type="text" 
                  value={inputCode} 
                  onChange={(e) => setInputCode(e.target.value)} 
                  placeholder="Secret code..." 
                  className={`bg-white border-2 ${error ? 'border-red-500 animate-bounce' : 'border-[#FFB800]'} rounded-full py-3 px-6 text-center text-[#D97706] font-bold outline-none focus:ring-2 ring-amber-300 transition-all shadow-md`} 
                />
                <button type="submit" className="bg-[#D97706] text-white font-black py-3 px-8 rounded-full hover:bg-[#B45309] transition-all flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest">Unlock Gift</button>
                {error && <p className="text-red-500 text-xs font-bold italic mt-1">Try again, love! ❤️</p>}
              </div>
            </motion.form>
          ) : (
            <motion.div key="unlock" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-4">
              <div className="bg-green-50 border border-green-200 px-6 py-2 rounded-full flex items-center gap-2 shadow-sm">
                <Volume2 size={20} className="text-green-600 animate-pulse" />
                <p className="text-green-600 font-bold italic text-sm">Playing Prema Velluva...</p>
              </div>

              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.8 }}
                className="flex items-start gap-2 max-w-[280px] bg-amber-50/50 p-3 rounded-2xl border border-amber-200 mb-2"
              >
                <AlertCircle size={16} className="text-amber-600 mt-1 shrink-0" />
                <p className="text-amber-700 text-xs font-bold italic text-left leading-relaxed">
                  Disclaimer: song start and end chusii navvadhuuu....
                </p>
              </motion.div>
              
              <Link to="/timeline" className="w-full">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full bg-[#D97706] text-white font-black py-5 px-10 rounded-full shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer text-xl uppercase tracking-widest border-b-4 border-amber-900 active:border-b-0"
                >
                  See Our Journey
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </Link>

              <Link to="/letter">
                <motion.button whileHover={{ scale: 1.05 }} className="text-[#D97706] font-bold py-2 px-6 flex items-center gap-2 hover:underline transition-all">
                  <Heart size={18} fill="currentColor" /> Or read my letter first
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Home;