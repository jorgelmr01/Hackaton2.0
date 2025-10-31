import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Historial.css'
import { formatCurrency } from '../utils/format'

const historialBase = [
  {
    id: 1,
    tipo: 'split',
    titulo: 'Split Uber Eats',
    grupo: 'María García, Carlos Ruiz',
    monto: -217.22,
    fecha: 'oct 28 2025',
    estado: 'completado'
  },
  {
    id: 2,
    tipo: 'apartado',
    titulo: 'Aporte Viaje Cancún',
    grupo: 'Viaje Cancún',
    monto: -1500,
    fecha: 'oct 25 2025',
    estado: 'procesando'
  },
  {
    id: 3,
    tipo: 'split',
    titulo: 'Pago recibido',
    grupo: 'Ana López',
    monto: 550,
    fecha: 'oct 24 2025',
    estado: 'completado'
  },
  {
    id: 4,
    tipo: 'credito',
    titulo: 'Pago crédito grupal',
    grupo: 'Roomies Depto',
    monto: -1416.66,
    fecha: 'oct 21 2025',
    estado: 'completado'
  },
  {
    id: 5,
    tipo: 'apartado',
    titulo: 'Creación de grupo',
    grupo: 'Fiesta Cumpleaños',
    monto: 0,
    fecha: 'oct 20 2025',
    estado: 'completado'
  },
  {
    id: 6,
    tipo: 'split',
    titulo: 'Split DiDi Ride',
    grupo: 'Pedro Sánchez, Laura Martínez',
    monto: -200,
    fecha: 'oct 18 2025',
    estado: 'completado'
  }
]

const tipoIcono = {
  split: '🧮',
  apartado: '💰',
  credito: '🏦',
  default: '📄'
}

const tipoColor = {
  split: '#3DDC97',
  apartado: '#FFF176',
  credito: '#E91E63',
  default: '#0078FF'
}

const estadoConfig = {
  completado: { bg: 'rgba(61, 220, 151, 0.2)', color: '#3DDC97', text: 'Completado' },
  procesando: { bg: 'rgba(255, 241, 118, 0.2)', color: '#FFF176', text: 'Procesando' },
  pendiente: { bg: 'rgba(233, 30, 99, 0.2)', color: '#E91E63', text: 'Pendiente' }
}

const Historial = ({ setShowBottomNav }) => {
  const navigate = useNavigate()
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  useEffect(() => {
    setShowBottomNav(true)
  }, [setShowBottomNav])

  const filteredHistorial = historialBase.filter((item) => {
    const matchesSearch =
      item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.grupo.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'all' || item.tipo === selectedType
    return matchesSearch && matchesType
  })

  return (
    <div className="screen historial-screen">
      <div className="screen-header">
        <button className="icon-button" onClick={() => navigate(-1)} aria-label="Regresar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="screen-title">Historial</h1>
        <button className="icon-button" onClick={() => setFilterOpen(!filterOpen)} aria-label="Abrir filtros">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        </button>
      </div>

      <div className="screen-content light">
        <div className="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre o grupo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')} aria-label="Limpiar búsqueda">
              ✕
            </button>
          )}
        </div>

        {filterOpen && (
          <div className="filters-panel fade-in">
            <div className="filter-label">Tipo de movimiento</div>
            <div className="filter-chips">
              <button
                className={`filter-chip ${selectedType === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedType('all')}
              >
                Todos
              </button>
              <button
                className={`filter-chip ${selectedType === 'split' ? 'active' : ''}`}
                onClick={() => setSelectedType('split')}
              >
                🧮 Splits
              </button>
              <button
                className={`filter-chip ${selectedType === 'apartado' ? 'active' : ''}`}
                onClick={() => setSelectedType('apartado')}
              >
                💰 Apartados
              </button>
              <button
                className={`filter-chip ${selectedType === 'credito' ? 'active' : ''}`}
                onClick={() => setSelectedType('credito')}
              >
                🏦 Créditos
              </button>
            </div>
          </div>
        )}

        <div className="historial-list">
          {filteredHistorial.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <div className="empty-text">No se encontraron resultados</div>
            </div>
          ) : (
            filteredHistorial.map((item) => {
              const icono = tipoIcono[item.tipo] || tipoIcono.default
              const color = tipoColor[item.tipo] || tipoColor.default
              const estado = estadoConfig[item.estado] || estadoConfig.completado

              return (
                <div key={item.id} className="historial-item">
                  <div className="historial-icon" style={{ backgroundColor: color + '33' }}>
                    {icono}
                  </div>
                  <div className="historial-info">
                    <div className="historial-titulo">{item.titulo}</div>
                    <div className="historial-grupo">{item.grupo}</div>
                    <div className="historial-fecha">{item.fecha}</div>
                  </div>
                  <div className="historial-right">
                    {item.monto !== 0 && (
                      <div className={`historial-monto ${item.monto > 0 ? 'positive' : 'negative'}`}>
                        {item.monto > 0 ? '+' : ''}{formatCurrency(Math.abs(item.monto))}
                      </div>
                    )}
                    <div
                      className="estado-badge"
                      style={{ backgroundColor: estado.bg, color: estado.color }}
                    >
                      {estado.text}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default Historial

