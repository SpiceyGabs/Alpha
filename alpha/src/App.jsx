import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import MoneySnapshot from './pages/MoneySnapshot'
import SimLab from './pages/SimLab'
import StrategyTracks from './pages/StrategyTracks'
import Learn from './pages/Learn'

function App() {
 
  return (
    <div className="App" > 
    <h1>My App</h1>
      
      <Home />
      <MoneySnapshot />
      <SimLab />
      <StrategyTracks />
      <Learn />

    </div>
  )
}

export default App
