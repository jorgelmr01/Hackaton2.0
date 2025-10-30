import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './DetalleApartado.css'
import { formatCurrency } from '../utils/format'

const DetalleApartado = ({ setShowBottomNav }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [showVotaciones, setShowVotaciones] = useState(false)

  useEffect(() => {
    setShowBottomNav(true)
  }, [setShowBottomNav])

  const apartado = {
    id: 1,
    nombre: 'Viaje Cancún',
    color: '#E91E63',
    objetivo: 20000,
    actual: 12000,
    progreso: 60,
    miembros: [
      { id: 1, nombre: 'Jorge Luis', initials: 'JL', aporte: 3000 },
      { id: 2, nombre: 'María García', initials: 'MG', aporte: 2500 },
      { id: 3, nombre: 'Carlos Ruiz', initials: 'CR', aporte: 3500 },
      { id: 4, nombre: 'Ana López', initials: 'AL', aporte: 2000 },
      { id: 5, nombre: 'Pedro Sánchez', initials: 'PS', aporte: 1000 },
      { id: 6, nombre: 'Laura Martínez', initials: 'LM', aporte: 0 },
    ],
    votaciones: [
      { id: 1, concepto: 'Reserva de hotel', monto: 8000, votos: 3, total: 6 },
      { id: 2, concepto: 'Vuelos', monto: 6000, votos: 5, total: 6 }
    ],
    movimientos: [
      { id: 1, tipo: 'aporte', usuario: 'Carlos Ruiz', monto: 1500, fecha: 'oct 25 2025' },
      { id: 2, tipo: 'aporte', usuario: 'María García', monto: 1000, fecha: 'oct 23 2025' },
      { id: 3, tipo: 'gasto', concepto: 'Anticipo hotel', monto: -2000, fecha: 'oct 20 2025' },
    ]
  }

  return (
    <div className="screen detalle-apartado-screen">
      <div className="screen-header">
        <button className="icon-button" onClick={() => navigate(-1)} aria-label="Regresar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h1 className="screen-title">{apartado.nombre}</h1>
        <button className="icon-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="6" r="1" fill="currentColor"/>
            <circle cx="12" cy="12" r="1" fill="currentColor"/>
            <circle cx="12" cy="18" r="1" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <div className="screen-content">
        {/* Grupo Header */}
        <div className="apartado-header" style={{ borderColor: apartado.color }}>
          <div className="grupo-photo" style={{ backgroundColor: apartado.color }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-text">
              {formatCurrency(apartado.actual)} de {formatCurrency(apartado.objetivo)}
            </span>
            <span className="progress-percentage">{apartado.progreso}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${apartado.progreso}%`,
                backgroundColor: apartado.color 
              }}
            />
          </div>
        </div>

        {/* Miembros */}
        <div className="miembros-section">
          <div className="section-title">Participantes ({apartado.miembros.length})</div>
          <div className="miembros-grid">
            {apartado.miembros.map((miembro) => (
              <div key={miembro.id} className="miembro-chip">
                <div className="miembro-avatar" style={{ backgroundColor: apartado.color }}>
                  {miembro.initials}
                </div>
                <div className="miembro-info">
                  <div className="miembro-nombre">{miembro.nombre}</div>
                  <div className="miembro-aporte">{formatCurrency(miembro.aporte)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones */}
        <div className="acciones-section">
          <button className="accion-button primary">
            <span className="accion-icon">💸</span>
            <span>Aportar</span>
          </button>
          <button className="accion-button secondary">
            <span className="accion-icon">🧾</span>
            <span>Proponer gasto</span>
          </button>
          <button 
            className="accion-button secondary"
            onClick={() => setShowVotaciones(!showVotaciones)}
          >
            <span className="accion-icon">⚖️</span>
            <span>Ver votaciones</span>
          </button>
        </div>

        {/* Votaciones Panel */}
        {showVotaciones && (
          <div className="votaciones-panel fade-in">
            <div className="section-title">Votaciones pendientes</div>
            {apartado.votaciones.map((votacion) => (
              <div key={votacion.id} className="votacion-card">
                <div className="votacion-header">
                  <div className="votacion-concepto">{votacion.concepto}</div>
                  <div className="votacion-monto">{formatCurrency(votacion.monto)}</div>
                </div>
                <div className="votacion-progress">
                  <div className="votos-count">{votacion.votos}/{votacion.total} han votado</div>
                  <div className="votos-bar">
                    <div 
                      className="votos-fill" 
                      style={{ width: `${(votacion.votos / votacion.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="votacion-actions">
                  <button className="vote-button approve">✅ Aprobar</button>
                  <button className="vote-button reject">❌ Rechazar</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Historial */}
        <div className="historial-section">
          <div className="section-title">Historial de movimientos</div>
          <div className="movimientos-list">
            {apartado.movimientos.map((mov) => (
              <div key={mov.id} className="movimiento-item">
                <div 
                  className="movimiento-icon"
                  style={{ 
                    backgroundColor: mov.tipo === 'aporte' ? apartado.color + '33' : 'rgba(233, 30, 99, 0.2)' 
                  }}
                >
                  {mov.tipo === 'aporte' ? '💰' : '🧾'}
                </div>
                <div className="movimiento-info">
                  <div className="movimiento-desc">
                    {mov.tipo === 'aporte' ? `Aporte de ${mov.usuario}` : mov.concepto}
                  </div>
                  <div className="movimiento-fecha">{mov.fecha}</div>
                </div>
                <div className={`movimiento-monto ${mov.tipo === 'aporte' ? 'positive' : 'negative'}`}>
                  {mov.tipo === 'aporte' ? '+' : ''}{formatCurrency(Math.abs(mov.monto))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Crédito Grupal */}
        <button 
          className="primary-button"
          onClick={() => navigate(`/credito/${id}`)}
        >
          Solicitar crédito grupal
        </button>
      </div>
    </div>
  )
}

export default DetalleApartado

