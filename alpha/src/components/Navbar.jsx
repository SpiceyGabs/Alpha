import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/money">Money Snapshot</Link></li>
        <li><Link to="/simlab">Simulation Lab</Link></li>
        <li><Link to="/tracks">Strategy Tracks</Link></li>
        <li><Link to="/learn">Learn+</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar