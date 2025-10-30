import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './BottomNav.css'

const BottomNav = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-item ${isActive('/home') ? 'active' : ''}`}
        onClick={() => navigate('/home')}
        aria-label="Inicio"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
        </svg>
        <span>Inicio</span>
      </button>

      <button 
        className={`nav-item ${isActive('/wallet') ? 'active' : ''}`}
        onClick={() => navigate('/wallet')}
        aria-label="Billetera"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="6" width="18" height="12" rx="2"/>
          <path d="M3 10h18"/>
        </svg>
        <span>Billetera</span>
      </button>

      <button 
        className={`nav-item ${isActive('/tarjetas') ? 'active' : ''}`}
        onClick={() => navigate('/tarjetas')}
        aria-label="Tarjetas"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <path d="M2 10h20"/>
        </svg>
        <span>Tarjetas</span>
      </button>

      <button 
        className={`nav-item ${isActive('/movements') ? 'active' : ''}`}
        onClick={() => navigate('/movements')}
        aria-label="Movimientos"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12H3M21 6H3M21 18H3"/>
        </svg>
        <span>Movimientos</span>
      </button>

      <button 
        className={`nav-item ${isActive('/openfriends') ? 'active' : ''}`}
        onClick={() => navigate('/openfriends')}
        aria-label="Amigos"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <span>Amigos</span>
      </button>
    </nav>
  )
}

export default BottomNav

