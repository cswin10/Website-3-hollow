import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function DynamicLighting({ focusPosition, intensity = 1 }) {
  const spotlightRef = useRef();
  const targetIntensity = useRef(0);

  useFrame((state, delta) => {
    if (spotlightRef.current) {
      // Smooth intensity transition
      const target = focusPosition ? 2 : 0;
      targetIntensity.current += (target - targetIntensity.current) * delta * 3;
      spotlightRef.current.intensity = targetIntensity.current * intensity;

      // Move spotlight to focus position
      if (focusPosition) {
        spotlightRef.current.target.position.lerp(
          { x: focusPosition[0], y: focusPosition[1], z: focusPosition[2] },
          delta * 5
        );
        spotlightRef.current.target.updateMatrixWorld();
      }
    }
  });

  return (
    <>
      <spotLight
        ref={spotlightRef}
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={0.8}
        intensity={0}
        color="#ffffff"
        castShadow
      />
    </>
  );
}
