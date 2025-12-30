import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LetterPage from './components/LetterPage';
import AboutYou from './components/AboutYou';
import Timeline from './components/Timeline';

// Import the specific audio file you uploaded
import song from './assets/Prema-Velluva.mp3'; 

function App() {
  // 1. Define the ref inside the component function
  const audioRef = useRef(null);

  // 2. Define the play function
  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log("Playback error (usually requires user interaction first):", err);
      });
    }
  };

  return (
    <Router>
      {/* 3. The audio element with the ref attached */}
      <audio 
        ref={audioRef} 
        src={song} 
        loop 
        preload="auto"
      />
      
      <Routes>
        {/* Pass the playMusic function as a prop to Home */}
        <Route path="/" element={<Home onUnlock={playMusic} />} />
        <Route path="/letter" element={<LetterPage />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/about" element={<AboutYou />} />
      </Routes>
    </Router>
  );
}

export default App;