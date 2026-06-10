import { useState } from 'react';
import '../Styling/Nudge.css';

function Nudge({ type = 'info', title, message, onDismiss, dismissible = true }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!isVisible) return null;

  const icons = {
    info: '🛈',
    warning: '⚠',
    success: '☻',
    critical: '✪',
    tip: '►'
  };

  return (
    <div className={`nudge nudge-${type}`}>
      <div className="nudgeIcon">{icons[type] || icons.info}</div>
      <div className="nudgeContent">
        {title && <div className="nudgeTitle">{title}</div>}
        <div className="nudgeMessage">{message}</div>
      </div>
      {dismissible && (
        <button className="nudgeDismiss" onClick={handleDismiss} aria-label="Dismiss">
       ✕
        </button>
      )}
    </div>
  );
}

export default Nudge;