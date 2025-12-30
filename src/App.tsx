import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LetterPage from './components/LetterPage';
import AboutYou from './components/AboutYou';
import Timeline from './components/Timeline';

// Note: If TypeScript shows an error here, see the declaration fix below
import song from './assets/Prema-Velluva.mp3'; 

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playMusic = (): void => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log("Playback error (usually requires user interaction first):", err);
      });
    }
  };

  return (
    <Router>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={song}
        loop
        preload="auto"
      />

      <Routes>
        {/* Pass playMusic to Home so it triggers when the code is correct */}
        <Route path="/" element={<Home onUnlock={playMusic} />} />
        <Route path="/letter" element={<LetterPage />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/about" element={<AboutYou />} />
      </Routes>
    </Router>
  );
}

export default App;