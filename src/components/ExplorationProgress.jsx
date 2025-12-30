import { hotspots } from '../data/hotspots';

export default function ExplorationProgress({ exploredIds }) {
  const progress = (exploredIds.size / hotspots.length) * 100;
  const isComplete = exploredIds.size === hotspots.length;

  return (
    <div className={`exploration-progress ${isComplete ? 'complete' : ''}`}>
      <div className="progress-ring">
        <svg viewBox="0 0 36 36">
          <path
            className="progress-ring-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="progress-ring-fill"
            strokeDasharray={`${progress}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="progress-text">
          {exploredIds.size}/{hotspots.length}
        </span>
      </div>
      {isComplete && (
        <div className="progress-complete-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      )}
    </div>
  );
}
