import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import CoinDetailsPage from './pages/CoinDetailsPage'
import CoinPage from './pages/CoinPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link to="/coin">Coin</Link>
          </li>
          <li>
            <Link to="/coin-details">Coin Details</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/coin" element={<CoinPage />} />
        <Route path="/coin-details" element={<CoinDetailsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  )
}

export default App
