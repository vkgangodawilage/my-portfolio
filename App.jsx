import { useEffect, useState } from 'react';
import CustomCursor from './components/CustomCursor';
import CyberCanvas from './components/CyberCanvas';
import MouseGlow from './components/MouseGlow';
import ScrollProgress from './components/ScrollProgress';
import HUD from './components/HUD';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import Projects from './sections/Projects';
import Timeline from './sections/Timeline';
import Contact from './sections/Contact';
import GitCerts from './sections/GitCerts';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.overflowX = 'hidden';
    }
  }, [isLoaded]);

  useEffect(() => {
    const sections = ['hero', 'stats', 'projects', 'gitcerts', 'timeline', 'contact'];
    
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectId) => {
      const el = document.getElementById(sectId);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative bg-cyber-black min-h-screen text-white crt-overlay overflow-x-hidden">
      {/* Scroll completion progress line */}
      {isLoaded && <ScrollProgress />}

      {/* 3D WebGL Background (passes loaded state and active section coordinates) */}
      <CyberCanvas activeSection={activeSection} isLoaded={isLoaded} />

      {/* Ambient background mouse tracking glow */}
      <MouseGlow />

      {/* Cyber cursor trail */}
      <CustomCursor />

      {/* Gaming HUD UI (reveals after loading completes) */}
      {isLoaded && <HUD activeSection={activeSection} />}

      {/* Page Content Layout */}
      <main className="relative z-10 w-full">
        <Hero onLoaded={() => setIsLoaded(true)} />
        
        {isLoaded && (
          <>
            <Stats />
            <Projects />
            <GitCerts />
            <Timeline />
            <Contact />
          </>
        )}
      </main>

      {/* Cyber footer */}
      {isLoaded && (
        <footer className="relative z-10 border-t border-red-500/20 shadow-[0_-5px_15px_rgba(255,30,39,0.06)] py-8 bg-cyber-black/90 backdrop-blur-md text-center font-mono text-[10px] text-gray-500 tracking-wider">
          {/* Glowing central HUD status light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-1 bg-red-500 shadow-[0_0_8px_#ff1e27] rounded-full animate-pulse"></div>

          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              &copy; {new Date().getFullYear()} V.K. GANGODAWILAGE // SYSTEM MATRIX SECURE
            </div>
            <div>
              GRID_BEACON: <span className="text-green-500 animate-pulse font-bold">ONLINE</span> // SYSTEM: STABLE
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
