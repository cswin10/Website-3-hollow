import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Model() {
  const { scene } = useGLTF('/model.glb');
  const modelRef = useRef();
  const [animationProgress, setAnimationProgress] = useState(0);

  // Traverse and enhance materials for better appearance
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.envMapIntensity = 1;
        }
      }
    });
  }, [scene]);

  // Entrance animation using useFrame
  useFrame((state, delta) => {
    if (animationProgress < 1) {
      const newProgress = Math.min(animationProgress + delta * 0.8, 1);
      setAnimationProgress(newProgress);

      if (modelRef.current) {
        // Ease out cubic
        const eased = 1 - Math.pow(1 - newProgress, 3);

        // Animate from below and scaled down
        modelRef.current.position.y = -0.5 * (1 - eased);
        const scale = 1.8 * eased;
        modelRef.current.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={0}
      position={[0, -0.5, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// Preload the model
useGLTF.preload('/model.glb');
