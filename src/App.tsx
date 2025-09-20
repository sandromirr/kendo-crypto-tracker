import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import CoinDetailsPage from './pages/CoinDetailsPage'
import CoinListPage from './pages/CoinListPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

const AppContent: React.FC = () => {
  return (
    <div className="App" style={{ 
      width: '100%', 
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      backgroundColor: '#ffffff',
      color: '#212121'
    }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/coin-list" element={<CoinListPage />} />
        <Route path="/coin/:id" element={<CoinDetailsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

function App() {
  return <AppContent />;
}

export default App