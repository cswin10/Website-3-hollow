import { Suspense, useState, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import ProductHeader from './components/ProductHeader';
import FeaturePanel from './components/FeaturePanel';
import InteractionHint from './components/InteractionHint';
import SoundToggle from './components/SoundToggle';
import Loader from './components/Loader';
import IntroAnimation from './components/IntroAnimation';
import CinematicTour from './components/CinematicTour';
import TourButton from './components/TourButton';
import ExplorationProgress from './components/ExplorationProgress';
import useSoundEffects from './hooks/useSoundEffects';
import { hotspots } from './data/hotspots';
import './styles/global.css';

export default function App() {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [exploredIds, setExploredIds] = useState(new Set());
  const [soundEnabled, setSoundEnabled] = useState(false);

  const { playClick, playHover, playSuccess, playWhoosh } = useSoundEffects(soundEnabled);

  const selectHotspot = useCallback((hotspot) => {
    playClick();
    setSelectedHotspot((prev) => {
      if (prev?.id === hotspot.id) {
        return null;
      }
      setExploredIds(ids => new Set([...ids, hotspot.id]));
      return hotspot;
    });
  }, [playClick]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!introComplete) return;

      const currentIndex = selectedHotspot
        ? hotspots.findIndex(h => h.id === selectedHotspot.id)
        : -1;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % hotspots.length;
        selectHotspot(hotspots[nextIndex]);
        playWhoosh();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentIndex <= 0 ? hotspots.length - 1 : currentIndex - 1;
        selectHotspot(hotspots[prevIndex]);
        playWhoosh();
      } else if (e.key === 'Escape') {
        setSelectedHotspot(null);
        setIsTourActive(false);
      } else if (e.key === ' ' && !isTourActive) {
        e.preventDefault();
        setIsTourActive(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [introComplete, selectedHotspot, isTourActive, playWhoosh, selectHotspot]);

  const handleHotspotHover = useCallback((hotspot) => {
    if (hotspot) {
      playHover();
    }
  }, [playHover]);

  const handleClose = useCallback(() => {
    setSelectedHotspot(null);
  }, []);

  const handleBackgroundClick = useCallback(() => {
    if (selectedHotspot) {
      setSelectedHotspot(null);
    }
  }, [selectedHotspot]);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  const handleTourComplete = useCallback(() => {
    setIsTourActive(false);
    playSuccess();
  }, [playSuccess]);

  const handleTourHotspotFocus = useCallback((hotspot) => {
    setSelectedHotspot(hotspot);
    setExploredIds(ids => new Set([...ids, hotspot.id]));
    playWhoosh();
  }, [playWhoosh]);

  const toggleTour = useCallback(() => {
    if (isTourActive) {
      setIsTourActive(false);
      setSelectedHotspot(null);
    } else {
      setIsTourActive(true);
    }
  }, [isTourActive]);

  const handleSoundToggle = useCallback((enabled) => {
    setSoundEnabled(enabled);
  }, []);

  return (
    <div className="app">
      {/* Cinematic intro overlay */}
      <IntroAnimation onComplete={handleIntroComplete} />

      {/* Header - visible after intro */}
      <ProductHeader visible={introComplete} />

      {/* Sound toggle */}
      <SoundToggle onToggle={handleSoundToggle} />

      {/* Exploration progress */}
      {introComplete && (
        <ExplorationProgress exploredIds={exploredIds} />
      )}

      {/* Tour button */}
      {introComplete && !selectedHotspot && (
        <TourButton onClick={toggleTour} isActive={isTourActive} />
      )}

      {/* Cinematic tour controls */}
      <CinematicTour
        isActive={isTourActive}
        onHotspotFocus={handleTourHotspotFocus}
        onComplete={handleTourComplete}
      />

      {/* Vignette overlay for depth */}
      <div className="vignette" />

      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 2, 10], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#000000']} />
          <Suspense fallback={<Loader />}>
            <Scene
              onHotspotSelect={selectHotspot}
              onHotspotHover={handleHotspotHover}
              selectedHotspot={selectedHotspot}
              onBackgroundClick={handleBackgroundClick}
              introComplete={introComplete}
              isTourActive={isTourActive}
            />
          </Suspense>
        </Canvas>
      </div>

      <FeaturePanel feature={selectedHotspot} onClose={handleClose} />

      {/* Interaction hint - shows after intro */}
      {introComplete && !isTourActive && <InteractionHint />}

      {/* Keyboard hints */}
      {introComplete && (
        <div className="keyboard-hints">
          <span>←→ Navigate</span>
          <span>Space Tour</span>
          <span>Esc Close</span>
        </div>
      )}
    </div>
  );
}
