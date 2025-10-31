import React, { useState, lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom'
import BottomNav from './components/BottomNav'
import './App.css'

const Resumen = lazy(() => import('./screens/Resumen'))
const ChatOBI = lazy(() => import('./screens/ChatOBI'))
const OpenSplit = lazy(() => import('./screens/OpenSplit'))
const DetalleApartado = lazy(() => import('./screens/DetalleApartado'))
const CreditoCompartido = lazy(() => import('./screens/CreditoCompartido'))
const Historial = lazy(() => import('./screens/Historial'))
const CrearGrupo = lazy(() => import('./screens/CrearGrupo'))
const Tarjetas = lazy(() => import('./screens/Tarjetas'))

function AppContent() {
  const [showBottomNav, setShowBottomNav] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="app-container">
      {location.pathname !== '/chat-obi' && (
        <button
          className="obi-button-fixed"
          onClick={() => navigate('/chat-obi')}
          aria-label="Chat con OBI"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      <Suspense fallback={<div className="screen-content" aria-busy="true">Cargando…</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/openfriends" replace />} />
          <Route path="/openfriends" element={<Resumen setShowBottomNav={setShowBottomNav} />} />
          <Route path="/chat-obi" element={<ChatOBI setShowBottomNav={setShowBottomNav} />} />
          <Route path="/opensplit" element={<OpenSplit setShowBottomNav={setShowBottomNav} />} />
          <Route path="/apartado/:id" element={<DetalleApartado setShowBottomNav={setShowBottomNav} />} />
          <Route path="/credito/:id" element={<CreditoCompartido setShowBottomNav={setShowBottomNav} />} />
          <Route path="/historial" element={<Historial setShowBottomNav={setShowBottomNav} />} />
          <Route path="/crear-grupo" element={<CrearGrupo setShowBottomNav={setShowBottomNav} />} />
          <Route path="/tarjetas" element={<Tarjetas setShowBottomNav={setShowBottomNav} />} />
        </Routes>
      </Suspense>

      {showBottomNav && <BottomNav />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
