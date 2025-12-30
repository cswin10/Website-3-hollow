import { useState, useRef, useEffect } from 'react';

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Create ambient drone using Web Audio API (no external file needed)
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const initAudio = () => {
    if (audioContextRef.current) return;

    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = audioContextRef.current;

    // Create gain node for volume control
    gainNodeRef.current = ctx.createGain();
    gainNodeRef.current.gain.value = 0;
    gainNodeRef.current.connect(ctx.destination);

    // Create a low drone oscillator
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 60;

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 90;

    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.value = 120;

    // Create filter for warmth
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 200;

    // Connect oscillators through filter to gain
    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(gainNodeRef.current);

    osc1.start();
    osc2.start();
    osc3.start();

    oscillatorRef.current = { osc1, osc2, osc3 };
    setIsLoaded(true);
  };

  const toggleSound = () => {
    if (!isLoaded) {
      initAudio();
    }

    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }

    if (gainNodeRef.current) {
      const targetGain = isPlaying ? 0 : 0.15;
      gainNodeRef.current.gain.linearRampToValueAtTime(
        targetGain,
        audioContextRef.current.currentTime + 0.5
      );
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <button
      className={`sound-toggle ${isPlaying ? 'active' : ''}`}
      onClick={toggleSound}
      aria-label={isPlaying ? 'Mute sound' : 'Play ambient sound'}
    >
      {isPlaying ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}
