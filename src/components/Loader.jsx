import { Html, useProgress } from '@react-three/drei';

export default function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="loader">
        <div className="loader-bar">
          <div
            className="loader-progress"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span>{Math.round(progress)}%</span>
      </div>
    </Html>
  );
}
