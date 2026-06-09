import { NavLink } from 'react-router-dom'
import '../Styling/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
     <div className="navBrand">
      <NavLink to="/" className="navLogoLink">
          <div className="navLogo">
            <span className="navLogoText">ABSA</span>
          </div>
          <span className="navBrandLabel">NextGen Wealth Studio</span>
        </NavLink>
      </div>

      <ul className="navMenu">
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'navLinkActive' : 'navLink'}
            end>Home</NavLink></li>
        <li><NavLink to="/snapshot" className={({ isActive }) => isActive ? 'navLinkActive' : 'navLink'}
            >Money Snapshot</NavLink></li>
        <li><NavLink to="/simlab" className={({ isActive }) => isActive ? 'navLinkActive' : 'navLink'}
            >Simulation Lab</NavLink></li>
        <li><NavLink to="/tracks" className={({ isActive }) => isActive ? 'navLinkActive' : 'navLink'}
            >Strategy Tracks</NavLink></li>
        <li><NavLink to="/learn" className={({ isActive }) => isActive ? 'navLinkActive' : 'navLink'}
            >Learn+</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar;