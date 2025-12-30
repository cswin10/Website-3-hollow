import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export default function Model() {
  const { scene } = useGLTF('/model.glb');

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

  return (
    <primitive
      object={scene}
      scale={1.8}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// Preload the model
useGLTF.preload('/model.glb');
