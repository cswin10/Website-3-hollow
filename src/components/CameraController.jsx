import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

export default function CameraController({
  introComplete,
  focusTarget,
  onFocusComplete
}) {
  const { camera } = useThree();
  const targetPosition = useRef(new Vector3(0, 0, 4));
  const targetLookAt = useRef(new Vector3(0, 0, 0));
  const isAnimating = useRef(false);
  const animationProgress = useRef(0);

  // Intro animation - camera starts far and zooms in
  useEffect(() => {
    if (!introComplete) {
      camera.position.set(0, 2, 10);
      camera.lookAt(0, 0, 0);
    }
  }, [camera, introComplete]);

  // Focus on hotspot
  useEffect(() => {
    if (focusTarget) {
      const [x, y, z] = focusTarget;
      // Position camera to look at the hotspot from an angle
      const offset = new Vector3(x, y, z).normalize().multiplyScalar(2);
      targetPosition.current.set(
        x + offset.x + 2,
        y + offset.y + 0.5,
        z + offset.z + 3
      );
      targetLookAt.current.set(x * 0.5, y * 0.5, z * 0.5);
      isAnimating.current = true;
      animationProgress.current = 0;
    } else {
      targetPosition.current.set(0, 0, 4);
      targetLookAt.current.set(0, 0, 0);
      isAnimating.current = true;
      animationProgress.current = 0;
    }
  }, [focusTarget]);

  useFrame((state, delta) => {
    // Intro zoom animation
    if (!introComplete) {
      const progress = Math.min(1, state.clock.elapsedTime / 2);
      const eased = 1 - Math.pow(1 - progress, 3);

      camera.position.lerp(new Vector3(0, 0, 4), eased * 0.02);
      return;
    }

    // Focus animation
    if (isAnimating.current) {
      animationProgress.current += delta * 2;
      const t = Math.min(1, animationProgress.current);
      const eased = 1 - Math.pow(1 - t, 3);

      camera.position.lerp(targetPosition.current, eased * 0.05);

      if (t >= 1) {
        isAnimating.current = false;
        onFocusComplete?.();
      }
    }
  });

  return null;
}
