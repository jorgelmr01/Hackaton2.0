import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Tarjetas.css'
import { formatCurrency, formatCurrency0 } from '../utils/format'

const Tarjetas = ({ setShowBottomNav }) => {
  const navigate = useNavigate()
  const [selectedTransactions, setSelectedTransactions] = useState([])

  useEffect(() => {
    setShowBottomNav(true)
  }, [setShowBottomNav])

  const transactions = [
    { id: 1, name: 'Compra En Línea En Uber Eats Help.Uber.C, Cmx, Upm20022OLk5', amount: 217.22, date: 'oct 28 2025', status: 'Liquidado' },
    { id: 2, name: 'Compra En Línea En Uber Eats, Ciudad De Mex, Upm20022OLk5', amount: 130.53, date: 'oct 27 2025', status: 'Liquidado' },
    { id: 3, name: 'Compra En Línea En Uber Trip, Ciudad De Mex, Upm20022OLk5', amount: 310.38, date: 'oct 27 2025', status: 'Liquidado' },
    { id: 4, name: 'Compra En Línea En Dlo Didi Rides, Mexico, Dmm 171208Lt4', amount: 200.00, date: 'oct 20 2025', status: 'Liquidado' },
  ]

  const toggleTransaction = (id) => {
    setSelectedTransactions(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
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
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h1 className="screen-title">Tarjeta de Crédito Open</h1>
        <div style={{ width: '40px' }} aria-hidden="true"></div>
      </div>

      <div className="screen-content">
        {/* Credit Card Status */}
        <div className="card-status">
          <div className="card-visual">
            <div className="card-brand">
              <div className="openbank-logo">
                <span>Openbank</span>
                <span className="credito-text">crédito</span>
              </div>
            </div>
            <div className="card-details">
              <div className="card-type">Tarjeta de crédito |</div>
              <div className="card-name">Tarjeta de Crédito Open</div>
              <div className="card-number">***9799</div>
            </div>
          </div>

          <div className="credit-info">
            <div className="credit-line">
              <span>Línea de crédito</span>
              <span className="credit-amount">{formatCurrency0(200000)}</span>
            </div>
            
            <div className="credit-progress">
              <div className="progress-bar-card">
                <div className="progress-fill-card" style={{ width: '6.8%' }}></div>
              </div>
            </div>

            <div className="credit-balances">
              <div className="balance-info">
                <div className="balance-icon used">●</div>
                <span>Saldo al día</span>
                <span className="balance-value">{formatCurrency0(13605.73)}</span>
              </div>
              <div className="balance-info">
                <div className="balance-icon available">○</div>
                <span>Disponible</span>
                <span className="balance-value">{formatCurrency0(186394.27)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="card-actions">
            <button className="action-btn" aria-label="Pagar tarjeta">
              <div className="action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2"/>
                  <path d="M2 10h20"/>
                </svg>
              </div>
              <span>Pagar tarjeta</span>
            </button>
            <button className="action-btn" aria-label="Consultar CVV">
              <div className="action-icon">CVV</div>
              <span>Consultar CVV</span>
            </button>
            <button className="action-btn" aria-label="Prender o apagar tarjeta">
              <div className="action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v10m0 0l4-4m-4 4l-4-4"/>
                  <rect x="4" y="14" width="16" height="8" rx="2"/>
                </svg>
              </div>
              <span>Prender / apagar tarjeta</span>
            </button>
          </div>
        </div>

        {/* Movements Section */}
        <div className="movements-section">
          <div className="movements-header">
            <h2>Movimientos</h2>
            <button className="filter-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
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
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
                <div className="transaction-icon-card">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12h18M3 6h18M3 18h18"/>
                  </svg>
                </div>
                <div className="transaction-details">
                  <div className="transaction-name">{transaction.name}</div>
                  <div className="transaction-date">{transaction.date}</div>
                  <div className="transaction-status">{transaction.status}</div>
                </div>
                <div className="transaction-amount-card">
                  -{formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>

          {selectedTransactions.length > 0 && (
            <button 
              className="split-button"
              onClick={handleSplit}
            >
              Dividir transacciones seleccionadas ({selectedTransactions.length})
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tarjetas

