 
// return
 
// (
    
// <nav style={{background:'#141414',padding:'12px 24px',display:'flex'}}></nav>
// )
import { Link } from 'react-router-dom';

function Navbar() {
    return ( 
         <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/snapshot">Money Snapshot</NavLink></li>
          <li><NavLink to="/tracks">Strategy Tracks</NavLink></li>
          <li><NavLink to="/simulation">Simulation Lab</NavLink></li>
          <li><NavLink to="/learn">Learn+</NavLink></li>
        </ul>
      </nav>
    )
};

export default Navbar; 
 