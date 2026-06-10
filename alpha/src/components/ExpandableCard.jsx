import { useState } from 'react';
import '../Styling/ExpandableCard.css';

function ExpandableCard({ title, icon, children, defaultExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="expandableCard">
      <button 
        className="expandableCardHeader"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="expandableCardTitle">
          {icon && <span className="expandableIcon">{icon}</span>}
          <h3>{title}</h3>
        </div>
        <span className={`expandableArrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </button>
      {isExpanded && (
        <div className="expandableCardContent">
          {children}
        </div>
      )}
    </div>
  );
}

export default ExpandableCard;