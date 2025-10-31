import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './CreditoCompartido.css'
import { formatCurrency } from '../utils/format'

const grupos = {
  1: { nombre: 'Viaje Cancún', icono: '🌴', integrantes: ['Tú', 'María', 'Carlos', 'Ana'] },
  2: { nombre: 'Roomies Depto', icono: '🏠', integrantes: ['Tú', 'Pedro', 'Fer'] }
}

const plazosDisponibles = [3, 6, 12]

const tasaInteres = 0.125

const estadoInicialFirmas = (integrantes) =>
  integrantes.map((nombre, index) => ({
    nombre,
    estado: index === 0 ? 'firmado' : 'pendiente'
  }))

const CreditoCompartido = ({ setShowBottomNav }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const grupo = grupos[id] || grupos[1]
  const [monto, setMonto] = useState(85000)
  const [plazo, setPlazo] = useState(6)
  const [contratoEnviado, setContratoEnviado] = useState(false)
  const [firmas, setFirmas] = useState(() => estadoInicialFirmas(grupo.integrantes))

  useEffect(() => {
    setShowBottomNav(false)
    return () => setShowBottomNav(true)
  }, [setShowBottomNav])

  const calculos = useMemo(() => {
    const interesMensual = tasaInteres / 12
    const numeroPagos = plazo
    const pagoMensual =
      monto === 0
        ? 0
        : (monto * interesMensual) / (1 - Math.pow(1 + interesMensual, -numeroPagos))
    const pagoPorPersona = pagoMensual / grupo.integrantes.length
    const totalAPagar = pagoMensual * numeroPagos
    return {
      pagoMensual,
      pagoPorPersona,
      totalAPagar
    }
  }, [monto, plazo, grupo.integrantes.length])

  const pendientes = firmas.filter((firma) => firma.estado !== 'firmado').length
  const todosFirmaron = pendientes === 0

  const handleAccionContrato = () => {
    if (!contratoEnviado) {
      setContratoEnviado(true)
      setFirmas((prev) =>
        prev.map((firma, index) =>
          index === 0 ? firma : { ...firma, estado: 'en-proceso' }
        )
      )
      alert('Contrato enviado. Cada integrante recibirá la solicitud de firma digital en su app Openbank.')
      return
    }

    if (!todosFirmaron) {
      setFirmas((prev) => prev.map((firma) => ({ ...firma, estado: 'firmado' })))
      alert('Firmas capturadas. Contrato consolidado y fondos listos para liberarse.')
      return
    }

    alert('Fondos liberados a la cuenta del grupo. Notificamos por chat a todos los integrantes.')
    navigate(-1)
  }

  const ctaLabel = !contratoEnviado
    ? 'Enviar contrato para firma digital'
    : !todosFirmaron
      ? 'Registrar firmas recibidas'
      : 'Liberar fondos al grupo'

  return (
    <div className="screen credito-screen">
      <div className="screen-header">
        <button className="icon-button" onClick={() => navigate(-1)} aria-label="Regresar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="screen-title">Crédito compartido</h1>
        <div style={{ width: '40px' }}></div>
      </div>

      <div className="screen-content light">
        <section className="credit-hero">
          <div className="credit-hero-meta">
            <span className="credit-tag">Financiamiento colectivo</span>
            <h2>{grupo.icono} {grupo.nombre}</h2>
            <p>
              Gestiona el crédito con tasa preferente de {(tasaInteres * 100).toFixed(1)}% anual. Al completar las firmas, enviamos contrato y liberamos los fondos al instante.
            </p>
          </div>
          <div className="credit-hero-pills">
            <span className="pill">Sin comisión por apertura</span>
            <span className="pill">Pagos automáticos coordinados</span>
            <span className="pill">Adelantos sin penalización</span>
          </div>
        </section>

        <section className="calculator">
          <div className="calculator-block">
            <span className="block-label">Monto que necesita el grupo</span>
            <div className="amount-display">{formatCurrency(monto)}</div>
            <input
              id="monto-credito"
              className="amount-slider"
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={monto}
              onChange={(e) => setMonto(Number(e.target.value))}
            />
            <div className="slider-range">
              <span>{formatCurrency(10000)}</span>
              <span>{formatCurrency(200000)}</span>
            </div>
          </div>

          <div className="calculator-block">
            <span className="block-label">Selecciona el plazo</span>
            <div className="term-options">
              {plazosDisponibles.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`term-button ${plazo === p ? 'active' : ''}`}
                  onClick={() => setPlazo(p)}
                >
                  {p} meses
                </button>
              ))}
            </div>
          </div>

          <div className="overview-grid">
            <div className="overview-card">
              <span className="overview-label">Pago por persona</span>
              <span className="overview-value">{formatCurrency(calculos.pagoPorPersona)}</span>
              <span className="overview-helper">{grupo.integrantes.length} integrantes firmantes</span>
            </div>
            <div className="overview-card">
              <span className="overview-label">Tasa de financiamiento</span>
              <span className="overview-value">{(tasaInteres * 100).toFixed(1)}%</span>
              <span className="overview-helper">Incluye intereses fijos y seguro</span>
            </div>
          </div>
        </section>

        <section className="signatures-section">
          <header>
            <h3>Firmas digitales</h3>
            <span className={todosFirmaron ? 'status success' : contratoEnviado ? 'status pending' : 'status draft'}>
              {todosFirmaron ? 'Contrato consolidado' : contratoEnviado ? `${pendientes} pendientes` : 'Borrador listo'}
            </span>
          </header>
          <div className="signatures-grid">
            {firmas.map((firma) => (
              <article key={firma.nombre} className={`signature-card ${firma.estado}`}>
                <div className="signature-avatar" aria-hidden="true">
                  {firma.nombre
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <span className="signature-name">{firma.nombre}</span>
                <span className="signature-state">
                  {firma.estado === 'firmado' && 'Firmado digitalmente'}
                  {firma.estado === 'en-proceso' && 'Esperando firma'}
                  {firma.estado === 'pendiente' && 'Invita a firmar'}
                </span>
              </article>
            ))}
          </div>
          {todosFirmaron && (
            <div className="success-banner">
              <strong>¡Todo listo!</strong>
              <span>El contrato está completo. Los fondos se depositarán en la cuenta colectiva en minutos.</span>
            </div>
          )}
        </section>

        <section className="credit-info">
          <strong>Resumen del proceso</strong>
          <span>1. Enviamos el contrato digital a cada integrante (firma con FaceID/biometría).</span>
          <span>2. Confirmamos la recepción de firmas y centralizamos el pagaré.</span>
          <span>3. Depositamos los fondos en la cuenta del grupo y notificamos por chat.</span>
        </section>

        <button className="primary-button" style={{ marginTop: '24px' }} onClick={handleAccionContrato}>
          {ctaLabel}
        </button>
      </div>
    </div>
  )
}

export default CreditoCompartido
