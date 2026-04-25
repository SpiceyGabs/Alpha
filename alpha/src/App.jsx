import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
// import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import MoneySnapshot from './pages/MoneySnapshot'
import SimLab from './pages/SimLab'
import StrategyTracks from './pages/StrategyTracks'
import Learn from './pages/Learn'

function App() {
 
  return (
     <BrowserRouter>
      <div className="app">

      <Navbar />

      {/*Then pages */}
      <main> 
        <Routes>
       <Route path="/" element={<Home />} />
            <Route path="/money" element={<MoneySnapshot />} />
            <Route path="/simlab" element={<SimLab />} />
            <Route path="/tracks" element={<StrategyTracks />} />
            <Route path="/learn" element={<Learn />} />
        </Routes>
      </main>

      </div>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/money">Money Snapshot</Link>
          <Link to="/simlab">Sim Lab</Link>
          <Link to="/tracks">Strategy Tracks</Link>
          <Link to="/learn">Learn</Link>
        </nav>

    </BrowserRouter>
  )
}


export default App
