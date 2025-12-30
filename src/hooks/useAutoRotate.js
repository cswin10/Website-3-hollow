import { useRef, useCallback } from 'react';

export default function useAutoRotate(controlsRef, timeout = 3000) {
  const timeoutRef = useRef(null);

  const pauseRotation = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = false;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Resume after timeout
    timeoutRef.current = setTimeout(() => {
      if (controlsRef.current) {
        controlsRef.current.autoRotate = true;
      }
    }, timeout);
  }, [controlsRef, timeout]);

  return { pauseRotation };
}
