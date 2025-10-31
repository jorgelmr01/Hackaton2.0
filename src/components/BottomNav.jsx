import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './BottomNav.css'

const navItems = [
  {
    label: 'Inicio',
    ariaLabel: 'Inicio Openbank',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 3a9 9 0 1 0 9 9" />
        <path d="m12 7-4.5 4.5L12 16" />
      </svg>
    ),
    disabled: true
  },
  {
    label: 'Cuentas',
    ariaLabel: 'Cuentas Openbank',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="3" />
        <path d="M3 10h18" />
        <path d="M7 14h.01M11 14h3" />
      </svg>
    ),
    disabled: true
  },
  {
    path: '/tarjetas',
    label: 'Tarjetas',
    ariaLabel: 'Tarjetas Openbank',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M2 10h20" />
      </svg>
    )
  },
  {
    label: 'Movimientos',
    ariaLabel: 'Movimientos Openbank',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M8 6h13" />
        <path d="m18 9 3-3-3-3" />
        <path d="M16 18H3" />
        <path d="m6 21-3-3 3-3" />
      </svg>
    ),
    disabled: true
  },
  {
    path: '/openfriends',
    label: 'Amigos',
    ariaLabel: 'Finanzas con amigos',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      </svg>
    )
  }
]

const BottomNav = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Navegación principal">
      {navItems.map((item) => {
        const active = item.path ? location.pathname.startsWith(item.path) : false
        const disabled = Boolean(item.disabled)

        return (
          <button
            key={item.path ?? item.label}
            className={`nav-item ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={() => {
              if (!disabled && item.path) {
                navigate(item.path)
              }
            }}
            aria-label={item.ariaLabel}
            aria-current={active ? 'page' : undefined}
            aria-disabled={disabled ? 'true' : undefined}
            disabled={disabled}
            type="button"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default BottomNav

