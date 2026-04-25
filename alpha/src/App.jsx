import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import MoneySnapshot from './pages/MoneySnapshot'
import SimLab from './pages/SimLab'
import StrategyTracks from './pages/StrategyTracks'
import Learn from './pages/Learn'

function App() {
  return (
    <div className="app">
      <Navbar />

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
  )
}

export default App;