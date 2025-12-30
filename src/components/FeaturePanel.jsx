import { useState, useRef } from 'react';

export default function FeaturePanel({ feature, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const currentFeatureId = useRef(null);

  // Reset closing state when feature changes (using ref comparison instead of useEffect)
  if (feature?.id !== currentFeatureId.current) {
    currentFeatureId.current = feature?.id;
    if (isClosing) {
      setIsClosing(false);
    }
  }

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!feature) return null;

  return (
    <div className={`feature-panel ${isClosing ? 'closing' : ''}`}>
      <button className="feature-panel-close" onClick={handleClose} aria-label="Close">
        ×
      </button>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  );
}
