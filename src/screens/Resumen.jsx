import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import './Resumen.css'
import { formatCurrency } from '../utils/format'

const COLORS = ['#E60000', '#FF5733', '#FFC300', '#3DDC97']

const gruposMock = [
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

const personasDebes = [
  { name: 'María García', value: 250 },
  { name: 'Carlos Ruiz', value: 300 },
  { name: 'Ana López', value: 150 },
  { name: 'Pedro Sánchez', value: 500 }
]

const personasTeDeben = [
  { name: 'Laura Martínez', value: 450 },
  { name: 'José Ramírez', value: 530 }
]

const Resumen = ({ setShowBottomNav }) => {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState('grupo')
  const [debtMode, setDebtMode] = useState('debes')

  useEffect(() => {
    setShowBottomNav(true)
  }, [setShowBottomNav])

  const getChartData = () => {
    if (viewMode === 'persona') {
      return debtMode === 'debes' ? personasDebes : personasTeDeben
    }
    return gruposMock
      .filter((item) => (debtMode === 'debes' ? item.tipo === 'debes' : item.tipo === 'te deben'))
      .map((item) => ({ name: item.nombre, value: item.saldo }))
  }

  const chartData = getChartData()
  const totalDebes =
    personasDebes.reduce((sum, p) => sum + p.value, 0) +
    gruposMock.filter((g) => g.tipo === 'debes').reduce((sum, g) => sum + g.saldo, 0)
  const totalTeDeben =
    personasTeDeben.reduce((sum, p) => sum + p.value, 0) +
    gruposMock.filter((g) => g.tipo === 'te deben').reduce((sum, g) => sum + g.saldo, 0)

  return (
    <div className="screen resumen-screen">
      <div className="screen-header resumen-header">
        <button className="menu-button" aria-label="Abrir menú">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <h1 className="screen-title">Finanzas OpenAmigos</h1>
        <div className="header-icons">
          <button className="icon-button" aria-label="Ocultar o mostrar saldos">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button className="icon-button" aria-label="Notificaciones">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
        </div>
      </div>

      <div className="screen-content light resumen-content">
        <div className="user-info">
          <h1 className="user-name">Jorge Luis Martinez Rodriguez</h1>
          <div className="user-balance">
            <div className="user-avatar">JM</div>
            <div className="balance-text">
              <span className="balance-masked">$----</span>
              <span className="balance-label">
                Saldo de <span className="balance-masked">$----</span>
              </span>
            </div>
          </div>
        </div>

        <div className="balance-summary-new">
          <button className={`balance-card ${debtMode === 'debes' ? 'active' : ''}`} onClick={() => setDebtMode('debes')}>
            <span className="balance-label-new">Total que debes</span>
            <span className="balance-amount-new debes">{formatCurrency(totalDebes)}</span>
          </button>
          <button className={`balance-card ${debtMode === 'te_deben' ? 'active' : ''}`} onClick={() => setDebtMode('te_deben')}>
            <span className="balance-label-new">Total que te deben</span>
            <span className="balance-amount-new te-deben">{formatCurrency(totalTeDeben)}</span>
          </button>
        </div>

        <div className="chart-section">
          <h2 className="section-title-new">Resumen por {viewMode === 'grupo' ? 'grupo' : 'persona'}</h2>
          <div className="view-toggles">
            <button className={`toggle-btn ${viewMode === 'grupo' ? 'active' : ''}`} onClick={() => setViewMode('grupo')}>
              Por grupo
            </button>
            <button className={`toggle-btn ${viewMode === 'persona' ? 'active' : ''}`} onClick={() => setViewMode('persona')}>
              Por persona
            </button>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={chartData} innerRadius={65} outerRadius={95} paddingAngle={3} dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="chart-legend">
              {chartData.map((entry, index) => (
                <div key={entry.name} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <div className="legend-text">
                    <span className="legend-name">{entry.name}</span>
                    <span className="legend-value">{formatCurrency(entry.value)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grupos-section">
          <div className="section-header">
            <h2 className="section-title-new">Tus grupos</h2>
            <button className="ver-todos" onClick={() => navigate('/historial')}>
              Ver todos &gt;
            </button>
          </div>
          <div className="grupos-scroll">
            {gruposMock.map((grupo) => (
              <div key={grupo.id} className="grupo-card-new" onClick={() => navigate(`/apartado/${grupo.id}`)}>
                <div className="grupo-icon-new" style={{ backgroundColor: grupo.color }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="grupo-info-new">
                  <div className="grupo-nombre-new">{grupo.nombre}</div>
                  <div className="grupo-meta">Split · En curso</div>
                </div>
                <div className="grupo-amount">{grupo.tipo === 'debes' ? '-' : '+'}${grupo.saldo.toLocaleString('es-MX')}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <button className="action-button primary" onClick={() => navigate('/crear-grupo')}>
            <div className="action-icon-new">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
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
