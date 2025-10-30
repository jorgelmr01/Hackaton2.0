import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './CreditoCompartido.css'
import { formatCurrency } from '../utils/format'

const CreditoCompartido = ({ setShowBottomNav }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [monto, setMonto] = useState(50000)
  const [plazo, setPlazo] = useState(6)
  const [firmas, setFirmas] = useState([])
  
  const maxMonto = 200000
  const tasaAnual = 12.5
  
  useEffect(() => {
    setShowBottomNav(true)
  }, [setShowBottomNav])

  const grupo = {
    id: 1,
    nombre: 'Viaje Cancún',
    color: '#E91E63',
    miembros: [
      { id: 1, nombre: 'Jorge Luis', initials: 'JL', firmado: false },
      { id: 2, nombre: 'María García', initials: 'MG', firmado: false },
      { id: 3, nombre: 'Carlos Ruiz', initials: 'CR', firmado: false },
      { id: 4, nombre: 'Ana López', initials: 'AL', firmado: false },
      { id: 5, nombre: 'Pedro Sánchez', initials: 'PS', firmado: false },
      { id: 6, nombre: 'Laura Martínez', initials: 'LM', firmado: false },
    ]
  }

  const calcularPagoMensual = () => {
    const tasaMensual = (tasaAnual / 100) / 12
    const pagoMensual = monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1)
    return pagoMensual
  }

  const calcularPagoPorPersona = () => {
    return calcularPagoMensual() / grupo.miembros.length
  }

  const handleSliderChange = (e) => {
    setMonto(parseInt(e.target.value))
  }

  const toggleFirma = (memberId) => {
    if (firmas.includes(memberId)) {
      setFirmas(firmas.filter(id => id !== memberId))
    } else {
      setFirmas([...firmas, memberId])
      // Simular vibración
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50)
      }
    }
  }

  const handleSolicitar = () => {
    if (firmas.length === grupo.miembros.length) {
      alert('¡Solicitud de crédito enviada! Recibirás una respuesta en 24-48 horas.')
      navigate('/openfriends')
    } else {
      alert(`Faltan ${grupo.miembros.length - firmas.length} firmas para completar la solicitud.`)
    }
  }

  return (
    <div className="screen credito-screen">
      <div className="screen-header">
        <button className="icon-button" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h1 className="screen-title">Crédito compartido</h1>
        <div style={{ width: '40px' }}></div>
      </div>

      <div className="screen-content">
        {/* Grupo Info */}
        <div className="credito-grupo-info">
          <div className="grupo-badge" style={{ backgroundColor: grupo.color }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div>
            <div className="grupo-label">Grupo</div>
            <div className="grupo-name">{grupo.nombre}</div>
          </div>
        </div>

        {/* Monto Slider */}
        <div className="card credito-calculator">
          <div className="calculator-section">
            <label className="calculator-label">Monto del crédito</label>
            <div className="monto-display">{formatCurrency(monto)}</div>
            <input
              type="range"
              min="10000"
              max={maxMonto}
              step="5000"
              value={monto}
              onChange={handleSliderChange}
              className="monto-slider"
              style={{ 
                background: `linear-gradient(to right, ${grupo.color} 0%, ${grupo.color} ${(monto / maxMonto) * 100}%, rgba(255,255,255,0.1) ${(monto / maxMonto) * 100}%, rgba(255,255,255,0.1) 100%)` 
              }}
            />
            <div className="slider-labels">
              <span>$10,000</span>
              <span>${maxMonto.toLocaleString('es-MX')}</span>
            </div>
          </div>

          {/* Plazo */}
          <div className="calculator-section">
            <label className="calculator-label">Plazo</label>
            <div className="plazo-buttons">
              <button
                className={`plazo-button ${plazo === 3 ? 'active' : ''}`}
                onClick={() => setPlazo(3)}
              >
                3 meses
              </button>
              <button
                className={`plazo-button ${plazo === 6 ? 'active' : ''}`}
                onClick={() => setPlazo(6)}
              >
                6 meses
              </button>
              <button
                className={`plazo-button ${plazo === 12 ? 'active' : ''}`}
                onClick={() => setPlazo(12)}
              >
                12 meses
              </button>
            </div>
          </div>

          {/* Tasa */}
          <div className="calculator-section">
            <div className="tasa-info">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              <span>Tasa anual {tasaAnual}% - fija</span>
            </div>
          </div>

          {/* Pago Mensual */}
          <div className="pago-result">
            <div className="pago-label">Pago mensual grupal</div>
            <div className="pago-amount">{formatCurrency(calcularPagoMensual())}</div>
            <div className="pago-per-person">
              {formatCurrency(calcularPagoPorPersona())} por persona
            </div>
          </div>
        </div>

        {/* Firmas */}
        <div className="firmas-section">
          <div className="section-title">
            Firmas digitales
            <span className="firmas-count">{firmas.length}/{grupo.miembros.length}</span>
          </div>
          <div className="firmas-grid">
            {grupo.miembros.map((miembro) => {
              const haFirmado = firmas.includes(miembro.id)
              return (
                <button
                  key={miembro.id}
                  className={`firma-item ${haFirmado ? 'firmado' : ''}`}
                  onClick={() => toggleFirma(miembro.id)}
                >
                  <div 
                    className="firma-avatar"
                    style={{ backgroundColor: haFirmado ? grupo.color : 'rgba(255,255,255,0.1)' }}
                  >
                    {haFirmado ? '✓' : miembro.initials}
                  </div>
                  <div className="firma-nombre">{miembro.nombre}</div>
                  {haFirmado && (
                    <div className="firma-badge">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Información adicional */}
        <div className="info-card">
          <div className="info-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-obi)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            <span>Información importante</span>
          </div>
          <ul className="info-list">
            <li>Todos los miembros deben firmar para procesar la solicitud</li>
            <li>La responsabilidad del crédito es compartida</li>
            <li>Cada miembro pagará su parte mensualmente</li>
            <li>Aprobación en 24-48 horas hábiles</li>
          </ul>
        </div>

        {/* Botón Solicitar */}
        <button
          className="primary-button"
          onClick={handleSolicitar}
          style={{ 
            opacity: firmas.length === grupo.miembros.length ? 1 : 0.6,
            backgroundColor: firmas.length === grupo.miembros.length ? grupo.color : 'var(--red-primary)'
          }}
        >
          {firmas.length === grupo.miembros.length 
            ? '✓ Solicitar crédito' 
            : `Solicitar (${firmas.length}/${grupo.miembros.length} firmas)`}
        </button>
      </div>
    </div>
  )
}

export default CreditoCompartido

