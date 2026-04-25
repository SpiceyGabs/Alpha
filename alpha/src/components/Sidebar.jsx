import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">ABSA NextGen Studio </h2>
      <nav>
        <ul>
          <li><NavLink to="/">🏠Home</NavLink></li>
          <li><NavLink to="/snapshot">💰Money Snapshot</NavLink></li>
          <li><NavLink to="/strategyTracks">🏆Strategy Tracks</NavLink></li>
          <li><NavLink to="/simulationLab">🧪Simulation Lab</NavLink></li>
          <li><NavLink to="/learn">📘Learn +</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;



