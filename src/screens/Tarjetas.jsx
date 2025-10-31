import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './Tarjetas.css'
import { formatCurrency, formatCurrency0 } from '../utils/format'

const CREDIT_LINE = 200000
const CURRENT_BALANCE = 13605.73
const AVAILABLE_BALANCE = CREDIT_LINE - CURRENT_BALANCE
const NEXT_CUTOFF = '15 NOV · 11:00 h'
const NEXT_PAYMENT = '31 OCT · $13,606'

const Tarjetas = ({ setShowBottomNav }) => {
  const navigate = useNavigate()
  const [selectedTransactions, setSelectedTransactions] = useState([])

  useEffect(() => {
    setShowBottomNav(true)
  }, [setShowBottomNav])

  const transactions = useMemo(
    () => [
      { id: 1, name: 'Uber Eats · Roadtrip planeación', amount: 217.22, date: '28 oct 2025 · 22:30 h', status: 'Liquidado' },
      { id: 2, name: 'Uber Eats · Pizza Cancún', amount: 130.53, date: '27 oct 2025 · 21:05 h', status: 'Liquidado' },
      { id: 3, name: 'Uber Trip · Aeropuerto', amount: 310.38, date: '27 oct 2025 · 08:45 h', status: 'Liquidado' },
      { id: 4, name: 'Didi Rides · Oficina', amount: 200.0, date: '20 oct 2025 · 09:10 h', status: 'Liquidado' }
    ],
    []
  )

  const usagePercentage = Math.min(100, Math.round((CURRENT_BALANCE / CREDIT_LINE) * 1000) / 10)

  const toggleTransaction = (id) => {
    setSelectedTransactions((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))
  }

  const handleSplit = () => {
    if (selectedTransactions.length > 0) {
      navigate('/opensplit', { state: { selectedIds: selectedTransactions } })
    }
  }

  return (
    <div className="screen tarjetas-screen">
      <div className="screen-header">
        <button className="icon-button" onClick={() => navigate(-1)} aria-label="Regresar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="screen-title">Tarjeta de Crédito Open</h1>
        <div style={{ width: '40px' }} aria-hidden="true"></div>
      </div>

      <div className="screen-content light">
        <section className="card-status" aria-labelledby="credit-card-overview">
          <div className="credit-card" role="img" aria-label="Tarjeta Openbank crédito">
            <div className="card-top">
              <div className="card-brand">
                <span className="bank-name">Openbank</span>
                <span className="card-tier">Crédito · Mastercard</span>
              </div>
              <div className="card-chip" aria-hidden="true">
                <span className="chip-light"></span>
                <span className="chip-wave"></span>
              </div>
            </div>
            <div className="card-number">**** 9799</div>
            <div className="card-meta">
              <div>
                <span className="meta-label">Corte</span>
                <span className="meta-value">{NEXT_CUTOFF}</span>
              </div>
              <div>
                <span className="meta-label">Pago próximo</span>
                <span className="meta-value">{NEXT_PAYMENT}</span>
              </div>
            </div>
          </div>

          <div className="card-summary" id="credit-card-overview">
            <div className="summary-header">
              <span className="summary-label">Línea de crédito</span>
              <span className="summary-amount">{formatCurrency0(CREDIT_LINE)}</span>
            </div>

            <div className="summary-progress">
              <div className="summary-progress-bar">
                <div className="summary-progress-fill" style={{ width: `${usagePercentage}%` }}></div>
              </div>
              <div className="summary-progress-meta">
                <div className="progress-item">
                  <span className="progress-label">
                    <span className="progress-dot used" aria-hidden="true"></span>
                    Saldo al día
                  </span>
                  <span className="progress-value">{formatCurrency0(CURRENT_BALANCE)}</span>
                </div>
                <div className="progress-item">
                  <span className="progress-label">
                    <span className="progress-dot available" aria-hidden="true"></span>
                    Disponible
                  </span>
                  <span className="progress-value">{formatCurrency0(AVAILABLE_BALANCE)}</span>
                </div>
              </div>
            </div>

            <div className="summary-highlights">
              <div className="highlight-card">
                <span className="highlight-label">Pagos programados</span>
                <span className="highlight-value">1 recordatorio</span>
                <span className="highlight-helper">Automático hoy 19:00 h</span>
              </div>
              <div className="highlight-card">
                <span className="highlight-label">Uso del mes</span>
                <span className="highlight-value">{usagePercentage}%</span>
                <span className="highlight-helper">Por debajo del límite sugerido (30%)</span>
              </div>
            </div>
          </div>

          <div className="card-actions" role="group" aria-label="Acciones rápidas">
            <button className="action-chip" aria-label="Pagar tarjeta">
              <div className="action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </div>
              <span>Pagar tarjeta</span>
            </button>
            <button className="action-chip" aria-label="Consultar CVV">
              <div className="action-icon">CVV</div>
              <span>Consultar CVV</span>
            </button>
            <button className="action-chip" aria-label="Prender o apagar tarjeta">
              <div className="action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v10m0 0l4-4m-4 4l-4-4" />
                  <rect x="4" y="14" width="16" height="8" rx="2" />
                </svg>
              </div>
              <span>Prender / apagar</span>
            </button>
          </div>
        </section>

        <section className="movements-section">
          <div className="movements-header">
            <h2>Movimientos</h2>
            <button className="filter-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <span>Filtros</span>
            </button>
          </div>

          <div className="month-badge">ESTE MES</div>

          <div className="transactions-list">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`transaction-card ${selectedTransactions.includes(transaction.id) ? 'selected' : ''}`}
                onClick={() => toggleTransaction(transaction.id)}
              >
                <div className="transaction-checkbox">
                  {selectedTransactions.includes(transaction.id) && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div className="transaction-icon-card">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  </svg>
                </div>
                <div className="transaction-details">
                  <div className="transaction-name">{transaction.name}</div>
                  <div className="transaction-date">{transaction.date}</div>
                  <div className="transaction-status">{transaction.status}</div>
                </div>
                <div className="transaction-amount-card">-{formatCurrency(transaction.amount)}</div>
              </div>
            ))}
          </div>

          {selectedTransactions.length > 0 && (
            <button className="split-button" onClick={handleSplit}>
              Dividir transacciones seleccionadas ({selectedTransactions.length})
            </button>
          )}
        </section>
      </div>
    </div>
  )
}

export default Tarjetas

