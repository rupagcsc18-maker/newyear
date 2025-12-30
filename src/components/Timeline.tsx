import React, { ReactNode } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Calendar, Camera, Heart, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// 1. Import your local images
import tirumalaImg from '../assets/tirumala.png';
import arunachalamImg from '../assets/arunachalam.png';
import fightsImg from '../assets/fights.png';

// 2. Define the Milestone Interface
interface Milestone {
  date: string;
  title: string;
  desc: string;
  icon: ReactNode; // Since it holds a Lucide component
  image: string;
}

// 3. Define Props for TimelineItem
interface TimelineItemProps {
  milestone: Milestone;
  index: number;
}

const milestones: Milestone[] = [
  {
    date: "August 2025",
    title: "Endless Talks & Games",
    desc: "We talked a lot, laughed more, and played games all the time. XOX moments that made us closer.",
    icon: <Heart fill="currentColor" />,
    image: "https://images.pexels.com/photos/6054173/pexels-photo-6054173.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  {
    date: "September 2025",
    title: "Tirumala",
    desc: "The place where our journey truly began. A sacred start to something meaningful.",
    icon: <Star fill="currentColor" />,
    image: tirumalaImg 
  },
  {
    date: "October 2025",
    title: "Streets & Silent Nights",
    desc: "Roaming the streets and staying late in the park. Those nights made our bond stronger.",
    icon: <Camera />,
    image: "https://images.pexels.com/photos/210764/pexels-photo-210764.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  {
    date: "November 2025",
    title: "Arunachalam Trip",
    desc: "A journey full of memories, faith, and moments that stayed in our hearts.",
    icon: <Star />,
    image: arunachalamImg 
  },
  {
    date: "December 2025",
    title: "Fights & Feelings",
    desc: "Continuous fights, misunderstandings, and emotions. Still, it showed how deeply we cared.",
    icon: <Heart />,
    image: fightsImg 
  }
];

const TimelineItem: React.FC<TimelineItemProps> = ({ milestone, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col md:flex-row items-center justify-between mb-24 w-full relative ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Content Card */}
      <div className="w-full md:w-[45%] bg-white p-6 rounded-3xl shadow-[0_10px_30px_rgba(217,119,6,0.1)] border-b-4 border-[#FFB800]">
        <img 
          src={milestone.image} 
          alt={milestone.title} 
          className="w-full h-48 object-cover rounded-2xl mb-4 border border-amber-50"
        />
        <div className="flex items-center gap-2 text-[#D97706] font-bold mb-1">
          <Calendar size={16} />
          <span>{milestone.date}</span>
        </div>
        <h3 className="text-2xl font-black text-[#D97706] mb-2 uppercase tracking-tighter">{milestone.title}</h3>
        <p className="text-gray-700 font-medium italic">"{milestone.desc}"</p>
      </div>

      {/* Center Icon */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 bg-[#FFB800] rounded-full border-4 border-white shadow-lg text-white z-10">
        {milestone.icon}
      </div>

      {/* Empty space for layout */}
      <div className="hidden md:block w-[45%]" />
    </motion.div>
  );
};

const Timeline: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Typing the transform result
  const bgColor: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 1],
    ["#FFFDF5", "#FFBF00"] 
  );

  return (
    <motion.div style={{ backgroundColor: bgColor }} className="min-h-screen py-20 px-6 transition-colors duration-500">
      <div className="max-w-5xl mx-auto relative">
        
        <header className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-[#D97706] uppercase tracking-tighter">
            Our <span className="text-[#FFB800] drop-shadow-md">Road Map</span>
          </h1>
          <p className="text-amber-900/60 font-bold mt-4 italic">The moments that led us to 2026</p>
        </header>

        {/* Vertical Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-40 bottom-0 w-1 bg-gradient-to-b from-[#FFB800] to-[#D97706] hidden md:block rounded-full opacity-30" />

        <div className="relative">
          {milestones.map((m, i) => (
            <TimelineItem key={i} milestone={m} index={i} />
          ))}
        </div>

        {/* Ending Section with Navigation */}
        <div className="flex flex-col items-center gap-8 mt-20">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center p-10 bg-white/40 backdrop-blur-md rounded-full border-2 border-dashed border-amber-400 w-full"
            >
              <p className="text-2xl font-serif italic text-[#D97706]">"And the best is yet to come..."</p>
            </motion.div>

            <Link to="/letter">
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-[#D97706] text-white px-12 py-4 rounded-full font-black text-xl shadow-2xl flex items-center gap-3 uppercase tracking-widest"
                >
                    Read My Letter <ArrowRight />
                </motion.button>
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;