export default function TourButton({ onClick, isActive }) {
  return (
    <button
      className={`tour-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
      aria-label={isActive ? 'Stop tour' : 'Start cinematic tour'}
    >
      {isActive ? (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
          <span>Stop Tour</span>
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
          </svg>
          <span>Cinematic Tour</span>
        </>
      )}
    </button>
  );
}
