import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MoneySnapshot from './pages/MoneySnapshot'
import SimLab from './pages/SimLab'
import StrategyTracks from './pages/StrategyTracks'
import Learn from './pages/Learn'

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}


function App() {
  return (
  <div className="app">
        <Navbar />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute >} />
          <Route path="/money" element={<ProtectedRoute><MoneySnapshot /></ProtectedRoute >} />
          <Route path="/simlab" element={<ProtectedRoute><SimLab /></ProtectedRoute >} />
          <Route path="/tracks" element={<ProtectedRoute><StrategyTracks /></ProtectedRoute >} />
          <Route path="/learn" element={<ProtectedRoute><Learn /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}

export default App;