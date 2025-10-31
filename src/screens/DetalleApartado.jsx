import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './DetalleApartado.css'
import { formatCurrency } from '../utils/format'

const apartados = {
  1: {
    nombre: 'Viaje Cancún',
    descripcion: 'Objetivo compartido para reservar vuelos y hospedaje',
    meta: 20000,
    ahorrado: 14250,
    color: '#E91E63',
    miembros: [
      { id: 1, nombre: 'Tú', aporte: 5250, progreso: 70 },
      { id: 2, nombre: 'María García', aporte: 4500, progreso: 60 },
      { id: 3, nombre: 'Carlos Ruiz', aporte: 3500, progreso: 50 },
      { id: 4, nombre: 'Ana López', aporte: 3000, progreso: 45 }
    ],
    actividades: [
      { id: 1, tipo: 'aporte', titulo: 'Aporte mensual', detalle: 'María aportó $1,500', fecha: 'oct 25 2025', monto: 1500 },
      { id: 2, tipo: 'votacion', titulo: 'Votación · Hotel seleccionado', detalle: '3/4 votos a favor', fecha: 'oct 23 2025', monto: 0 },
      { id: 3, tipo: 'aporte', titulo: 'Pago recibido', detalle: 'Carlos aportó $1,200', fecha: 'oct 18 2025', monto: 1200 },
      { id: 4, tipo: 'nota', titulo: 'Meta intermedia alcanzada', detalle: '70% completado', fecha: 'oct 10 2025', monto: 0 }
    ]
  },
  2: {
    nombre: 'Roomies Depto',
    descripcion: 'Fondo compartido para renta y servicios',
    meta: 12000,
    ahorrado: 8800,
    color: '#3DDC97',
    miembros: [
      { id: 1, nombre: 'Tú', aporte: 4400, progreso: 73 },
      { id: 2, nombre: 'Pedro Sánchez', aporte: 2400, progreso: 40 },
      { id: 3, nombre: 'Fer Martínez', aporte: 2000, progreso: 33 }
    ],
    actividades: [
      { id: 1, tipo: 'aporte', titulo: 'Pago de renta', detalle: 'Pedro aportó $2,400', fecha: 'oct 20 2025', monto: 2400 },
      { id: 2, tipo: 'nota', titulo: 'Límite ajustado', detalle: 'Meta mensual actualizada a $12,000', fecha: 'oct 02 2025', monto: 0 }
    ]
  }
}

const DetalleApartado = ({ setShowBottomNav }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const apartado = apartados[id] || apartados[1]
  const [mostrarVotaciones, setMostrarVotaciones] = useState(false)

  useEffect(() => {
    setShowBottomNav(false)
    return () => setShowBottomNav(true)
  }, [setShowBottomNav])

  const progresoTotal = Math.round((apartado.ahorrado / apartado.meta) * 100)
  const faltante = Math.max(apartado.meta - apartado.ahorrado, 0)
  const aportePromedio = apartado.ahorrado / apartado.miembros.length
  const proximaMeta = Math.min(apartado.meta, apartado.ahorrado + 2500)

  const quickActions = [
    {
      icono: '💸',
      titulo: 'Aportar',
      descripcion: 'Actualiza el saldo del grupo',
      accion: () => alert('Demo: registro de aporte en desarrollo')
    },
    {
      icono: '🏷️',
      titulo: 'Autorizar gasto',
      descripcion: mostrarVotaciones ? 'Ocultar solicitudes de retiro' : 'Aprueba retiros del apartado',
      accion: () => setMostrarVotaciones((prev) => !prev)
    }
  ]

  return (
    <div className="screen detalle-apartado-screen">
      <div className="screen-header">
        <button className="icon-button" onClick={() => navigate(-1)} aria-label="Regresar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="screen-title">{apartado.nombre}</h1>
        <div style={{ width: '40px' }} aria-hidden="true"></div>
      </div>

      <div className="screen-content light">
        <section
          className="group-hero"
          style={{ background: `linear-gradient(135deg, ${apartado.color} 0%, rgba(15, 23, 42, 0.92) 100%)` }}
        >
          <div className="hero-top">
            <span className="hero-chip">Meta {formatCurrency(apartado.meta)}</span>
            <h2>{apartado.descripcion}</h2>
            <p>
              Ahorrado {formatCurrency(apartado.ahorrado)} · {progresoTotal}% completado
            </p>
          </div>
          <div className="hero-progress">
            <div className="hero-progress-bar">
              <div className="hero-progress-fill" style={{ width: `${progresoTotal}%` }}></div>
            </div>
            <span className="hero-progress-label">{progresoTotal}% completado</span>
          </div>
          <div className="hero-metrics">
            <div className="metric-card">
              <span className="metric-label">Meta inmediata</span>
              <span className="metric-value">{formatCurrency(proximaMeta)}</span>
              <span className="metric-helper">Próximo hito sugerido</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">Restante</span>
              <span className="metric-value">{formatCurrency(faltante)}</span>
              <span className="metric-helper">Contribuye con {formatCurrency(Math.ceil(faltante / apartado.miembros.length / 100) * 100)} c/u</span>
            </div>
          </div>
        </section>

        <section className="members-section">
          <header className="section-header">
            <h3>Participantes</h3>
            <span>{apartado.miembros.length} personas involucradas</span>
          </header>
          <div className="members-grid">
            {apartado.miembros.map((miembro) => (
              <article key={miembro.id} className="member-card">
                <div className="member-avatar" aria-hidden="true">
                  {miembro.nombre
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <div className="member-info">
                  <span className="member-name">{miembro.nombre}</span>
                  <span className="member-amount">Aportado {formatCurrency(miembro.aporte)}</span>
                  <div className="member-progress">
                    <div className="member-progress-fill" style={{ width: `${miembro.progreso}%` }}></div>
                  </div>
                  <span className="member-progress-label">{miembro.progreso}% del compromiso</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="actions-section" role="group" aria-label="Acciones rápidas del grupo">
          {quickActions.map((accion) => (
            <button key={accion.titulo} className="action-card" type="button" onClick={accion.accion}>
              <span className="action-icon" aria-hidden="true">{accion.icono}</span>
              <span className="action-title">{accion.titulo}</span>
              <span className="action-desc">{accion.descripcion}</span>
            </button>
          ))}
        </section>

        {mostrarVotaciones && (
          <section className="votes-section">
            <header>
              <h3>Retiros pendientes</h3>
              <span>Autoriza antes del 30 oct</span>
            </header>
            <div className="vote-card">
              <div className="vote-title">Pago de hospedaje · $4,200 · 3/4 firmas</div>
              <div className="vote-progress">
                <div className="vote-progress-fill" style={{ width: '75%' }}></div>
              </div>
              <button className="secondary-button" onClick={() => setMostrarVotaciones(false)}>
                Autorizar retiro
              </button>
            </div>
            <div className="vote-card subdued">
              <div className="vote-title">Tour isla Mujeres · $1,800 · 2/4 firmas</div>
              <div className="vote-progress">
                <div className="vote-progress-fill" style={{ width: '50%' }}></div>
              </div>
            </div>
          </section>
        )}

        <section className="timeline-section">
          <header className="section-header">
            <h3>Actividades recientes</h3>
          </header>
          <div className="timeline">
            {apartado.actividades.map((actividad) => (
              <article key={actividad.id} className="timeline-item">
                <div className={`timeline-dot ${actividad.tipo}`} aria-hidden="true"></div>
                <div className="timeline-content">
                  <div className="timeline-title">{actividad.titulo}</div>
                  <div className="timeline-detail">{actividad.detalle}</div>
                  <div className="timeline-meta">
                    <span>{actividad.fecha}</span>
                    {actividad.monto !== 0 && (
                      <span className={`timeline-amount ${actividad.monto > 0 ? 'positive' : 'negative'}`}>
                        {actividad.monto > 0 ? '+' : ''}
                        {formatCurrency(actividad.monto)}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <button className="primary-button primary-white" onClick={() => navigate(`/credito/${id}`)}>
          Solicitar crédito grupal
        </button>
      </div>
    </div>
  )
}

export default DetalleApartado

