import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

// Seeded PRNG for deterministic random values
function seededRandom(seed) {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

export default function FloatingParticles({ count = 50 }) {
  const pointsRef = useRef();

  const particles = useMemo(() => {
    const random = seededRandom(42);
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (random() - 0.5) * 20;
      positions[i * 3 + 1] = (random() - 0.5) * 20;
      positions[i * 3 + 2] = (random() - 0.5) * 20;
      speeds[i] = random() * 0.02 + 0.005;
    }

    return { positions, speeds };
  }, [count]);

  // Animate particles drifting slowly
  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;

      for (let i = 0; i < count; i++) {
        // Slow upward drift
        positions[i * 3 + 1] += particles.speeds[i] * delta * 10;

        // Reset particles that drift too high
        if (positions[i * 3 + 1] > 10) {
          positions[i * 3 + 1] = -10;
        }

        // Subtle horizontal sway
        positions[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
