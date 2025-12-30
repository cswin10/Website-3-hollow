import { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import ProductHeader from './components/ProductHeader';
import FeaturePanel from './components/FeaturePanel';
import InteractionHint from './components/InteractionHint';
import SoundToggle from './components/SoundToggle';
import Loader from './components/Loader';
import './styles/global.css';

export default function App() {
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const handleHotspotSelect = useCallback((hotspot) => {
    setSelectedHotspot((prev) => {
      // If clicking the same hotspot, close it
      if (prev?.id === hotspot.id) {
        return null;
      }
      return hotspot;
    });
  }, []);

  const handleClose = useCallback(() => {
    setSelectedHotspot(null);
  }, []);

  const handleBackgroundClick = useCallback(() => {
    if (selectedHotspot) {
      setSelectedHotspot(null);
    }
  }, [selectedHotspot]);

  return (
    <div className="app">
      <ProductHeader />
      <SoundToggle />

      {/* Vignette overlay for depth */}
      <div className="vignette" />

      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#000000']} />
          <Suspense fallback={<Loader />}>
            <Scene
              onHotspotSelect={handleHotspotSelect}
              selectedHotspot={selectedHotspot}
              onBackgroundClick={handleBackgroundClick}
            />
          </Suspense>
        </Canvas>
      </div>

      <FeaturePanel feature={selectedHotspot} onClose={handleClose} />
      <InteractionHint />
    </div>
  );
}
