import { useRef } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import Model from './Model';
import Hotspots from './Hotspots';
import FloatingParticles from './FloatingParticles';
import useAutoRotate from '../hooks/useAutoRotate';

// Rotating environment wrapper for dynamic lighting
function RotatingEnvironment() {
  const envRef = useRef();

  useFrame((state, delta) => {
    if (envRef.current) {
      envRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={envRef}>
      <Environment preset="city" />
    </group>
  );
}

export default function Scene({ onHotspotSelect, selectedHotspot, onBackgroundClick }) {
  const controlsRef = useRef();
  const { pauseRotation } = useAutoRotate(controlsRef, 3000);

  return (
    <>
      {/* Lighting - Cinematic setup */}
      {/* Key light - main illumination from upper right */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Fill light - softer, from the left */}
      <directionalLight
        position={[-5, 2, 2]}
        intensity={0.4}
      />

      {/* Rim light - from behind for edge definition */}
      <directionalLight
        position={[0, 3, -5]}
        intensity={0.8}
      />

      {/* Ambient - subtle shadow lift */}
      <ambientLight intensity={0.1} />

      {/* Floating dust particles for atmosphere */}
      <FloatingParticles count={60} />

      {/* Model */}
      <Model />

      {/* Hotspots */}
      <Hotspots
        onSelect={onHotspotSelect}
        selectedId={selectedHotspot?.id}
      />

      {/* Controls */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={2.5}
        maxDistance={6}
        autoRotate={true}
        autoRotateSpeed={0.4}
        dampingFactor={0.05}
        enableDamping={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI - Math.PI / 4}
        onStart={pauseRotation}
      />

      {/* Rotating environment for dynamic reflections */}
      <RotatingEnvironment />

      {/* Invisible click catcher for dismissing panels */}
      <mesh
        position={[0, 0, 0]}
        onClick={onBackgroundClick}
        visible={false}
      >
        <sphereGeometry args={[20, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} side={2} />
      </mesh>
    </>
  );
}
