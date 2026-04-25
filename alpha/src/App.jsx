import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import MoneySnapshot from './pages/MoneySnapshot'
import SimLab from './pages/SimLab'
import StrategyTracks from './pages/StrategyTracks'
import Learn from './pages/Learn'

function App() {
 
  return <Navbar/> 
  (
    <div className="App" > 
      {/* <Sidebar /> */}
      <Home />
      <MoneySnapshot />
      <SimLab />
      <StrategyTracks />
      <Learn />

    </div>
  )
}

export default App
