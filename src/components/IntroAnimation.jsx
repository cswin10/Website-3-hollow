import { useState, useEffect } from 'react';

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => {
        setPhase(4);
        onComplete?.();
      }, 3500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase >= 4) return null;

  return (
    <div className={`intro-animation phase-${phase}`}>
      <div className="intro-content">
        <div className="intro-line intro-line-1" />
        <h1 className="intro-title">Hollow</h1>
        <div className="intro-line intro-line-2" />
        <p className="intro-tagline">Beyond Protection</p>
      </div>
      <div className="intro-backdrop" />
    </div>
  );
}
