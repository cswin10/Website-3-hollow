import { Html } from '@react-three/drei';
import { hotspots } from '../data/hotspots';

export default function Hotspots({ onSelect, selectedId }) {
  return (
    <>
      {hotspots.map((hotspot) => (
        <Html
          key={hotspot.id}
          position={hotspot.position}
          center
          distanceFactor={8}
          occlude={false}
          zIndexRange={[100, 0]}
        >
          <button
            className={`hotspot ${selectedId === hotspot.id ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(hotspot);
            }}
            aria-label={hotspot.title}
          />
        </Html>
      ))}
    </>
  );
}
