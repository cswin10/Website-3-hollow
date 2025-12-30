import { useRef, useState, useEffect } from 'react';

export default function CursorSpotlight() {
  const spotlightRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className={`cursor-spotlight ${isVisible ? 'visible' : ''}`}
      style={{
        '--x': `${position.x}px`,
        '--y': `${position.y}px`,
      }}
    />
  );
}
