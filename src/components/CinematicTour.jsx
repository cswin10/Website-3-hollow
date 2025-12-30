import { useState, useEffect, useRef } from 'react';
import { hotspots } from '../data/hotspots';

export default function CinematicTour({ isActive, onHotspotFocus, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);

  // Track callbacks in refs to avoid stale closures
  const onHotspotFocusRef = useRef(onHotspotFocus);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onHotspotFocusRef.current = onHotspotFocus;
    onCompleteRef.current = onComplete;
  }, [onHotspotFocus, onComplete]);

  // Main tour controller
  useEffect(() => {
    if (!isActive) {
      const resetTimer = setTimeout(() => setCurrentIndex(-1), 0);
      return () => clearTimeout(resetTimer);
    }

    // Start tour at index 0
    if (currentIndex === -1) {
      const startTimer = setTimeout(() => {
        setCurrentIndex(0);
        onHotspotFocusRef.current?.(hotspots[0]);
      }, 0);
      return () => clearTimeout(startTimer);
    }

    if (isPaused) return;

    // Advance to next hotspot after delay
    const advanceTimer = setTimeout(() => {
      const next = currentIndex + 1;
      if (next >= hotspots.length) {
        onCompleteRef.current?.();
        setCurrentIndex(-1);
      } else {
        setCurrentIndex(next);
        onHotspotFocusRef.current?.(hotspots[next]);
      }
    }, 4000);

    return () => clearTimeout(advanceTimer);
  }, [isActive, currentIndex, isPaused]);

  if (!isActive) return null;

  return (
    <div className="cinematic-tour-controls">
      <div className="tour-progress">
        {hotspots.map((_, i) => (
          <div
            key={i}
            className={`tour-dot ${i === currentIndex ? 'active' : ''} ${i < currentIndex ? 'completed' : ''}`}
          />
        ))}
      </div>
      <div className="tour-buttons">
        <button
          className="tour-btn"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            </svg>
          )}
        </button>
        <button
          className="tour-btn"
          onClick={() => onComplete?.()}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
