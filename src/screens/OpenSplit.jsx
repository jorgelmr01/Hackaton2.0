import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './OpenSplit.css'
import { formatCurrency } from '../utils/format'

const OpenSplit = ({ setShowBottomNav }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedTransactions, setSelectedTransactions] = useState([])
  const [step, setStep] = useState('select')

  useEffect(() => {
    setShowBottomNav(true)
  }, [setShowBottomNav])

  useEffect(() => {
    if (location.state && Array.isArray(location.state.selectedIds)) {
      setSelectedTransactions(location.state.selectedIds)
      setStep('configure')
    }
  }, [location.state])

  const transactions = [
    { id: 1, name: 'Compra En Línea En Uber Eats', amount: 217.22, date: 'oct 28 2025', location: 'Help.Uber.C, Cmx' },
    { id: 2, name: 'Compra En Línea En Uber Eats', amount: 130.53, date: 'oct 27 2025', location: 'Ciudad De Mex' },
    { id: 3, name: 'Compra En Línea En Uber Trip', amount: 310.38, date: 'oct 27 2025', location: 'Ciudad De Mex' },
    { id: 4, name: 'Compra En Línea En Dlo Didi Rides', amount: 200.0, date: 'oct 20 2025', location: 'Mexico, Dmm' }
  ]

  const [friends, setFriends] = useState([
    { id: 1, name: 'María García', initials: 'MG', selected: false },
    { id: 2, name: 'Carlos Ruiz', initials: 'CR', selected: false },
    { id: 3, name: 'Ana López', initials: 'AL', selected: false }
  ])

  const [splitType, setSplitType] = useState('equal')
  const [showAddExternal, setShowAddExternal] = useState(false)
  const [externalName, setExternalName] = useState('')
  const [externalPhone, setExternalPhone] = useState('')
  const [amounts, setAmounts] = useState({})

  const toggleTransaction = (id) => {
    setSelectedTransactions((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  const toggleFriend = (id) => {
    setFriends((prev) =>
      prev.map((f) => (f.id === id ? { ...f, selected: !f.selected } : f))
    )
  }

  const getTotalAmount = () =>
    transactions
      .filter((t) => selectedTransactions.includes(t.id))
      .reduce((sum, t) => sum + t.amount, 0)

  const getAmountPerPerson = () => {
    const selectedFriendsCount = friends.filter((f) => f.selected).length + 1
    return selectedFriendsCount > 0 ? getTotalAmount() / selectedFriendsCount : 0
  }

  const handleAmountChange = (id, value) => {
    const num = parseFloat(value.replace(/[^0-9.]/g, '')) || 0
    setAmounts((prev) => ({ ...prev, [id]: num }))
  }

  const proportionalSum = () => {
    const friendSum = friends
      .filter((f) => f.selected)
      .reduce((sum, f) => sum + (amounts[f.id] || 0), 0)
    const me = amounts.me || 0
    return friendSum + me
  }

  const canContinueFromConfigure = () => {
    if (splitType === 'equal') return friends.some((f) => f.selected)
    return Math.abs(proportionalSum() - getTotalAmount()) < 0.01 && friends.some((f) => f.selected)
  }

  const handleNext = () => {
    if (step === 'select' && selectedTransactions.length > 0) {
      setStep('configure')
    } else if (step === 'configure' && canContinueFromConfigure()) {
      setStep('confirm')
    }
  }

  const handleConfirm = () => {
    alert('¡Solicitudes enviadas! Los splits han sido compartidos por WhatsApp.')
    navigate('/openfriends')
  }

  return (
    <div className="screen opensplit-screen">
      <div className="screen-header">
        <button className="icon-button" onClick={() => navigate(-1)} aria-label="Regresar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="screen-title">
          {step === 'select' && 'Seleccionar transacciones'}
          {step === 'configure' && 'Dividir gasto'}
          {step === 'confirm' && 'Confirmar split'}
        </h1>
        <div style={{ width: '40px' }}></div>
      </div>

      <div className="screen-content light">
        {step === 'select' && (
          <div className="transactions-list">
            <p className="info-text">Selecciona las transacciones que deseas dividir</p>
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`transaction-item ${selectedTransactions.includes(transaction.id) ? 'selected' : ''}`}
                onClick={() => toggleTransaction(transaction.id)}
              >
                <div className="transaction-checkbox">
                  {selectedTransactions.includes(transaction.id) && '✓'}
                </div>
                <div className="transaction-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12H3M21 6H3M21 18H3" />
                  </svg>
                </div>
                <div className="transaction-info">
                  <div className="transaction-name">{transaction.name}</div>
                  <div className="transaction-details">
                    {transaction.location} · {transaction.date}
                  </div>
                </div>
                <div className="transaction-amount">-${transaction.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}

        {step === 'configure' && (
          <div className="configure-split">
            <div className="card">
              <div className="split-summary">
                <div className="summary-label">Total a dividir</div>
                <div className="summary-amount">{formatCurrency(getTotalAmount())}</div>
                <div className="summary-transactions">{selectedTransactions.length} transacción(es)</div>
              </div>
            </div>

            <div className="split-options">
              <div className="section-title">Tipo de división</div>
              <div className="radio-group">
                <button
                  className={`radio-option ${splitType === 'equal' ? 'selected' : ''}`}
                  onClick={() => setSplitType('equal')}
                >
                  <div className="radio-circle">{splitType === 'equal' && '●'}</div>
                  <div>
                    <div className="radio-label">Por monto igual</div>
                    <div className="radio-desc">Dividir equitativamente entre todos</div>
                  </div>
                </button>
                <button
                  className={`radio-option ${splitType === 'proportional' ? 'selected' : ''}`}
                  onClick={() => setSplitType('proportional')}
                >
                  <div className="radio-circle">{splitType === 'proportional' && '●'}</div>
                  <div>
                    <div className="radio-label">Proporcional a consumo</div>
                    <div className="radio-desc">Asignar montos específicos</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="friends-selection">
              <div className="section-title">
                Seleccionar amigos
                <button className="text-button" onClick={() => setShowAddExternal(!showAddExternal)}>
                  + Agregar externo
                </button>
              </div>
              {showAddExternal && (
                <div className="add-external-panel">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Nombre completo"
                    value={externalName}
                    onChange={(e) => setExternalName(e.target.value)}
                  />
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="Teléfono (WhatsApp)"
                    value={externalPhone}
                    onChange={(e) => setExternalPhone(e.target.value)}
                    inputMode="tel"
                    pattern="[0-9\s+-]+"
                  />
                  <div className="add-external-actions">
                    <button
                      className="secondary-button"
                      onClick={() => {
                        setShowAddExternal(false)
                        setExternalName('')
                        setExternalPhone('')
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      className="primary-button"
                      onClick={() => {
                        if (!externalName.trim() || !externalPhone.trim()) return
                        const id = Date.now()
                        const initials = externalName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)
                        setFriends((prev) => [
                          ...prev,
                          {
                            id,
                            name: externalName.trim(),
                            initials,
                            selected: true,
                            externo: true,
                            phone: externalPhone.trim()
                          }
                        ])
                        setShowAddExternal(false)
                        setExternalName('')
                        setExternalPhone('')
                      }}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              )}
              <div className="friends-grid">
                {friends.map((friend) => (
                  <button
                    key={friend.id}
                    className={`friend-chip ${friend.selected ? 'selected' : ''}`}
                    onClick={() => toggleFriend(friend.id)}
                  >
                    <div className="friend-avatar">{friend.initials}</div>
                    <span>{friend.name}</span>
                    {friend.selected && <span className="check-icon">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {friends.some((f) => f.selected) && (
              <div className="card fade-in">
                {splitType === 'equal' ? (
                  <div className="split-detail">
                    <div className="detail-row">
                      <span>Monto por persona:</span>
                      <span className="highlight">{formatCurrency(getAmountPerPerson())}</span>
                    </div>
                    <div className="detail-row">
                      <span>Personas:</span>
                      <span>{friends.filter((f) => f.selected).length + 1}</span>
                    </div>
                  </div>
                ) : (
                  <div className="proportional-detail">
                    <div className="detail-row">
                      <span>Total a asignar</span>
                      <span className="highlight">{formatCurrency(getTotalAmount())}</span>
                    </div>
                    <div className="amounts-grid">
                      <div className="amount-row">
                        <div className="friend-avatar">TÚ</div>
                        <span>Tú</span>
                        <input
                          type="number"
                          className="amount-input"
                          placeholder="0.00"
                          value={amounts.me || ''}
                          onChange={(e) => handleAmountChange('me', e.target.value)}
                          inputMode="decimal"
                          step="0.01"
                        />
                      </div>
                      {friends.filter((f) => f.selected).map((friend) => (
                        <div key={friend.id} className="amount-row">
                          <div className="friend-avatar">{friend.initials}</div>
                          <span>{friend.name}</span>
                          <input
                            type="number"
                            className="amount-input"
                            placeholder="0.00"
                            value={amounts[friend.id] || ''}
                            onChange={(e) => handleAmountChange(friend.id, e.target.value)}
                            inputMode="decimal"
                            step="0.01"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="detail-row" style={{ marginTop: 8 }}>
                      <span>Restante por asignar</span>
                      <span className="highlight">{formatCurrency(getTotalAmount() - proportionalSum())}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {step === 'confirm' && (
          <div className="confirm-split">
            <div className="card">
              <div className="confirm-icon">✅</div>
              <h2>Confirmar split</h2>
              <p className="confirm-text">
                Se enviará una solicitud de pago por WhatsApp a cada persona seleccionada con:
              </p>
              <ul className="confirm-list">
                <li>Monto a pagar: ${getAmountPerPerson().toFixed(2)} MXN</li>
                <li>Detalle del gasto</li>
                <li>Tu cuenta Openbank para transferir</li>
                <li>Link para pago SPEI</li>
              </ul>
            </div>

            <div className="participants-preview">
              <div className="section-title">Participantes</div>
              <div className="participants-list">
                <div className="participant-item">
                  <div className="friend-avatar">TÚ</div>
                  <span>Tú</span>
                  <span className="participant-amount">${getAmountPerPerson().toFixed(2)}</span>
                </div>
                {friends.filter((f) => f.selected).map((friend) => (
                  <div key={friend.id} className="participant-item">
                    <div className="friend-avatar">{friend.initials}</div>
                    <span>{friend.name}</span>
                    <span className="participant-amount">${getAmountPerPerson().toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <button
          className="primary-button"
          onClick={step === 'confirm' ? handleConfirm : handleNext}
          disabled={step === 'select' && selectedTransactions.length === 0}
          style={{ opacity: step === 'select' && selectedTransactions.length === 0 ? 0.5 : 1 }}
        >
          {step === 'select' && `Dividir seleccionadas (${selectedTransactions.length})`}
          {step === 'configure' && 'Continuar'}
          {step === 'confirm' && 'Enviar solicitudes'}
        </button>
      </div>
    </div>
  )
}

export default OpenSplit

