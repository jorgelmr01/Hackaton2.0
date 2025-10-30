import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts'
import './Resumen.css'
import { formatCurrency } from '../utils/format'

const Resumen = ({ setShowBottomNav }) => {
  const navigate = useNavigate()
  const [selectedSegment, setSelectedSegment] = useState(null)
  const [viewMode, setViewMode] = useState('grupo') // 'grupo' or 'persona'
  const [debtMode, setDebtMode] = useState('debes') // 'debes' or 'te_deben'

  useEffect(() => {
    setShowBottomNav(true)
  }, [setShowBottomNav])

  // Data for people and groups
  const personasDebes = [
    { name: 'María García', value: 250, type: 'debes' },
    { name: 'Carlos Ruiz', value: 300, type: 'debes' },
    { name: 'Ana López', value: 150, type: 'debes' },
    { name: 'Pedro Sánchez', value: 500, type: 'debes' },
  ]

  const personasTeDeben = [
    { name: 'Laura Martínez', value: 450, type: 'te_deben' },
    { name: 'José Ramírez', value: 530, type: 'te_deben' },
  ]

  const gruposDebes = [
    { name: 'Viaje Cancún', value: 600, type: 'debes' },
    { name: 'Fiesta Cumpleaños', value: 350, type: 'debes' },
  ]

  const gruposTeDeben = [
    { name: 'Roomies Depto', value: 480, type: 'te_deben' },
  ]

  const getChartData = () => {
    let data = []
    if (viewMode === 'persona') {
      data = debtMode === 'debes' ? personasDebes : personasTeDeben
    } else {
      data = debtMode === 'debes' ? gruposDebes : gruposTeDeben
    }
    
    // Use red for debes, blue for te_deben
    return data.map(item => ({
      ...item,
      color: debtMode === 'debes' ? '#E60000' : '#0078FF'
    }))
  }

  const getTotalDebes = () => {
    return [...personasDebes, ...gruposDebes].reduce((sum, item) => sum + item.value, 0)
  }

  const getTotalTeDeben = () => {
    return [...personasTeDeben, ...gruposTeDeben].reduce((sum, item) => sum + item.value, 0)
  }

  // Custom label renderer for pie sections
  const RADIAN = Math.PI / 180
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max)
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
    const radius = outerRadius + 22
    const sx = cx + Math.cos(-midAngle * RADIAN) * (outerRadius + 6)
    const sy = cy + Math.sin(-midAngle * RADIAN) * (outerRadius + 6)
    const ex = cx + Math.cos(-midAngle * RADIAN) * radius
    const ey = cy + Math.sin(-midAngle * RADIAN) * radius
    const isRight = ex >= cx

    // Label sizing and content
    const labelWidth = 130
    const labelHeight = 40
    const nameText = name.length > 18 ? name.slice(0, 17) + '…' : name
    const amountText = `${formatCurrency(value)}`

    // Keep labels inside the chart card using relative clamps around the pie
    const padding = 16
    const minX = cx - outerRadius - padding
    const maxX = cx + outerRadius + padding - labelWidth
    const minY = cy - outerRadius - padding
    const maxY = cy + outerRadius + padding - labelHeight
    let rx = isRight ? ex + 8 : ex - (labelWidth + 8)
    let ry = ey - labelHeight / 2
    rx = clamp(rx, minX, maxX)
    ry = clamp(ry, minY, maxY)

    return (
      <g>
        <path d={`M${sx},${sy} L${ex},${ey}`} stroke="#D0D0D0" fill="none"/>
        <rect x={rx} y={ry} rx={12} ry={12} width={labelWidth} height={labelHeight} fill="#FFFFFF" stroke="#E6E6E6"/>
        <text x={rx + labelWidth / 2} y={ry + 16} textAnchor="middle" fill="#000" fontSize="11" fontWeight="600">
          {nameText}
        </text>
        <text x={rx + labelWidth / 2} y={ry + 31} textAnchor="middle" fill="#000" fontSize="11" fontWeight="700">
          {amountText}
        </text>
      </g>
    )
  }

  const grupos = [
    {
      id: 1,
      nombre: 'Viaje Cancún',
      color: '#E91E63',
      saldo: 600,
      tipo: 'debes',
      progreso: 75
    },
    {
      id: 2,
      nombre: 'Roomies Depto',
      color: '#3DDC97',
      saldo: 480,
      tipo: 'te deben',
      progreso: 60
    },
    {
      id: 3,
      nombre: 'Fiesta Cumpleaños',
      color: '#FFF176',
      saldo: 350,
      tipo: 'debes',
      progreso: 45
    }
  ]

  const splitsActivos = [
    {
      id: 1,
      concepto: 'Uber Eats - Comida',
      fecha: 'oct 28 2025',
      total: 217.22,
      tuParte: 108.61,
      participantes: [
        { nombre: 'María García', pagado: true },
        { nombre: 'Tú', pagado: true },
        { nombre: 'Carlos Ruiz', pagado: false }
      ]
    },
    {
      id: 2,
      concepto: 'DiDi Ride - Centro',
      fecha: 'oct 20 2025',
      total: 200.00,
      tuParte: 100.00,
      participantes: [
        { nombre: 'Pedro Sánchez', pagado: true },
        { nombre: 'Tú', pagado: true },
      ]
    }
  ]

  return (
    <div className="screen resumen-screen">
      {/* User Header */}
      <div className="user-header">
        <button className="menu-button" aria-label="Abrir menú">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
        <div className="header-icons">
          <button className="icon-button" aria-label="Ocultar o mostrar saldos">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
          <button className="icon-button" aria-label="Notificaciones">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="screen-content">
        {/* User Info */}
        <div className="user-info">
          <h1 className="user-name">Jorge Luis Martinez Rodriguez</h1>
          <div className="user-balance">
            <div className="user-avatar">JM</div>
            <div className="balance-text">
              <span className="balance-masked">$----</span>
              <span className="balance-label">Saldo de <span className="balance-masked">$----</span></span>
            </div>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="balance-summary-new">
          <button 
            className={`balance-card ${debtMode === 'debes' ? 'active' : ''}`}
            onClick={() => setDebtMode('debes')}
          >
            <span className="balance-label-new">Total que debes</span>
            <span className="balance-amount-new debes">{formatCurrency(getTotalDebes())}</span>
          </button>
          <button 
            className={`balance-card ${debtMode === 'te_deben' ? 'active' : ''}`}
            onClick={() => setDebtMode('te_deben')}
          >
            <span className="balance-label-new">Total que te deben</span>
            <span className="balance-amount-new te-deben">{formatCurrency(getTotalTeDeben())}</span>
          </button>
        </div>

        {/* Chart Section */}
        <div className="chart-section">
          <h2 className="section-title-new">Resumen por grupo</h2>
          
          {/* Toggle Buttons */}
          <div className="view-toggles">
            <button 
              className={`toggle-btn ${viewMode === 'grupo' ? 'active' : ''}`}
              onClick={() => setViewMode('grupo')}
            >
              Por grupo
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'persona' ? 'active' : ''}`}
              onClick={() => setViewMode('persona')}
            >
              Por persona
            </button>
          </div>

          <div className="portipo-label">Portipo</div>

          {/* Circular Chart */}
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={getChartData()}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                  onClick={(data) => setSelectedSegment(data)}
                  label={renderLabel}
                  labelLine={false}
                >
                  {getChartData().map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend below chart */}
            <div className="chart-legend">
              {getChartData().map((entry, index) => (
                <div key={index} className="legend-item">
                  <div 
                    className="legend-color" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <div className="legend-text">
                    <span className="legend-name">{entry.name}</span>
                    <span className="legend-value">{formatCurrency(entry.value)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grupos Section */}
        <div className="grupos-section">
          <div className="section-header">
            <h2 className="section-title-new">Tus grupos</h2>
            <button className="ver-todos" onClick={() => navigate('/historial')}>
              Ver todos &gt;
            </button>
          </div>
          <div className="grupos-scroll">
            {grupos.map((grupo) => (
              <div 
                key={grupo.id} 
                className="grupo-card-new"
                onClick={() => navigate(`/apartado/${grupo.id}`)}
              >
                <div 
                  className="grupo-icon-new"
                  style={{ backgroundColor: grupo.color }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="grupo-info-new">
                  <div className="grupo-nombre-new">{grupo.nombre}</div>
                  <div className="grupo-meta">Split · En curso</div>
                </div>
                <div className="grupo-amount">
                  {grupo.tipo === 'debes' ? '-' : '+'}${grupo.saldo.toLocaleString('es-MX')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Splits Activos Section */}
        <div className="splits-section">
          <h2 className="section-title-new">Splits activos</h2>
          <div className="splits-list">
            {splitsActivos.map((split) => (
              <div key={split.id} className="split-card">
                <div className="split-header">
                  <div>
                    <div className="split-concepto">{split.concepto}</div>
                    <div className="split-fecha">{split.fecha}</div>
                  </div>
                  <div className="split-amounts">
                    <div className="split-total">${split.total.toFixed(2)}</div>
                    <div className="split-tu-parte">Tu parte: ${split.tuParte.toFixed(2)}</div>
                  </div>
                </div>
                <div className="split-participants">
                  {split.participantes.map((participante, idx) => (
                    <div key={idx} className="participant-chip">
                      <div className={`participant-status ${participante.pagado ? 'paid' : 'pending'}`}>
                        {participante.pagado ? '✓' : '○'}
                      </div>
                      <span>{participante.nombre}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className="action-button primary"
            onClick={() => navigate('/crear-grupo')}
          >
            <div className="action-icon-new">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </div>
            <span>Crear grupo</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Resumen
