import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './ChatOBI.css'

const FINANCE_METRICS = {
  totalTeDeben: 1460,
  totalPagosTarjeta: 858.13,
  splitsActivos: 2,
  ultimoUberTotal: 217.22,
  ultimoUberParte: 108.61,
  pendientes: [
    { nombre: 'Carlos Ruiz', monto: 300, dias: 7, concepto: 'Viaje Cancún' },
    { nombre: 'Pedro Sánchez', monto: 500, dias: 3, concepto: 'Viaje Cancún' }
  ]
}

const INITIAL_MESSAGES = (navigate) => [
  {
    id: 'obi-1',
    sender: 'obi',
    text: '¡Hola Jorge! 👋 Soy OBI, tu copiloto financiero.',
    timestamp: new Date('2025-10-29T09:30:00')
  },
  {
    id: 'obi-2',
    sender: 'obi',
    text: 'Esto es lo que encontré hoy 👇',
    highlights: [
      { label: 'Te deben', value: `$${FINANCE_METRICS.totalTeDeben.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`, helper: '3 amigos pendientes', tone: 'positive' },
      { label: 'Pagaste con tarjeta', value: `$${FINANCE_METRICS.totalPagosTarjeta.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`, helper: '4 movimientos este mes', tone: 'neutral' },
      { label: 'Splits activos', value: `${FINANCE_METRICS.splitsActivos} grupos`, helper: 'Viaje Cancún · Roomies', tone: 'alert' }
    ],
    timestamp: new Date('2025-10-29T09:30:20')
  },
  {
    id: 'obi-3',
    sender: 'obi',
    text: '¿Qué quieres hacer primero?',
    cards: [
      {
        icon: '🧮',
        title: 'Dividir Uber Eats',
        desc: `${FINANCE_METRICS.ultimoUberTotal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} entre 3 personas`,
        action: () => navigate('/opensplit')
      },
      {
        icon: '💰',
        title: 'Crear grupo ahorro',
        desc: 'Impulsa metas compartidas con recompensas OpenFriends',
        action: () => navigate('/crear-grupo')
      },
      {
        icon: '🏦',
        title: 'Crédito compartido',
        desc: 'Simula firma con tu grupo',
        action: () => navigate('/credito/1')
      }
    ],
    quickReplies: [
      'Divide el último Uber Eats entre mis amigos',
      'Envíale un recordatorio de pago a Carlos Ruiz',
      'Quiero crear un nuevo grupo de ahorro'
    ],
    timestamp: new Date('2025-10-29T09:30:35')
  }
]

const ChatOBI = ({ setShowBottomNav }) => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState(() => INITIAL_MESSAGES(navigate))
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setShowBottomNav(false)
    return () => setShowBottomNav(true)
  }, [setShowBottomNav])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleAction = (action) => {
    if (typeof action === 'function') {
      action()
      return
    }

    if (action === 'select-friends') {
      const now = new Date()
      setMessages((prev) => [
        ...prev,
        {
          id: `obi-${now.getTime()}`,
          sender: 'obi',
          text: 'Sugerí a quienes ya han participado en tus últimos splits:',
          contacts: [
            { id: 1, name: 'María García', initials: 'MG' },
            { id: 2, name: 'Carlos Ruiz', initials: 'CR' },
            { id: 3, name: 'Ana López', initials: 'AL' }
          ],
          timestamp: now
        }
      ])
    }

    if (action === 'send-reminder') {
      const now = new Date()
      setMessages((prev) => [
        ...prev,
        {
          id: `obi-${now.getTime()}`,
          sender: 'obi',
          text: 'Listo, agendé recordatorios automáticos para Carlos y Pedro por WhatsApp.',
          highlights: FINANCE_METRICS.pendientes.map((pendiente) => ({
            label: pendiente.nombre,
            value: `$${pendiente.monto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`,
            helper: 'Les aviso hoy 19:00 h',
            tone: 'positive'
          })),
          timestamp: now
        }
      ])
    }
  }

  const buildObiResponse = (rawText) => {
    const text = rawText.toLowerCase()
    const now = new Date()
    const base = { id: `obi-${now.getTime()}`, sender: 'obi', timestamp: now }

    if (text.includes('dividir') || text.includes('split')) {
      return {
        ...base,
        text: 'Perfecto, tomo la última compra de Uber Eats y preparo el split en 3 pasos.',
        highlights: [
          { label: 'Total', value: `$${FINANCE_METRICS.ultimoUberTotal.toFixed(2)}`, helper: 'Uber Eats · 28 oct', tone: 'neutral' },
          { label: 'Tu parte estimada', value: `$${FINANCE_METRICS.ultimoUberParte.toFixed(2)}`, helper: 'Incluye propina sugerida', tone: 'positive' },
          { label: 'Personas', value: 'Tú + 2 amigos', helper: 'María y Carlos', tone: 'neutral' }
        ],
        actions: [
          { label: 'Elegir participantes', action: 'select-friends' },
          { label: 'Dividir ahora', action: () => navigate('/opensplit') }
        ]
      }
    }

    if (text.includes('grupo') || text.includes('apartado')) {
      return {
        ...base,
        text: 'Tus grupos activos están listos para moverse.',
        highlights: [
          { label: 'Viaje Cancún', value: '$600.00', helper: 'Necesita 25% para meta', tone: 'alert' },
          { label: 'Roomies Depto', value: '$480.00', helper: 'Te deben 2 roomies', tone: 'positive' }
        ],
        actions: [
          { label: 'Crear nuevo grupo', action: () => navigate('/crear-grupo') },
          { label: 'Ver mis grupos', action: () => navigate('/openfriends') }
        ]
      }
    }

    if (text.includes('crédito') || text.includes('credito') || text.includes('préstamo') || text.includes('prestamo')) {
      return {
        ...base,
        text: 'Tengo la simulación del crédito grupal lista para revisarla.',
        highlights: [
          { label: 'Monto sugerido', value: '$85,000.00', helper: 'Pago mensual desde $2,520 MXN', tone: 'neutral' },
          { label: 'Tasa fija', value: '12.5%', helper: 'Sin penalización por prepago', tone: 'positive' }
        ],
        actions: [
          { label: 'Simular con Viaje Cancún', action: () => navigate('/credito/1') },
          { label: 'Ver otros plazos', action: () => navigate('/credito/1') }
        ]
      }
    }

    if (text.includes('recordar') || text.includes('recordatorio')) {
      return {
        ...base,
        text: 'Estos son los pagos pendientes con más días vencidos:',
        highlights: FINANCE_METRICS.pendientes.map((pendiente) => ({
          label: pendiente.nombre,
          value: `$${pendiente.monto.toFixed(2)}`,
          helper: `${pendiente.dias} días · ${pendiente.concepto}`,
          tone: 'alert'
        })),
        actions: [
          { label: 'Enviar recordatorio automático', action: 'send-reminder' },
          { label: 'Abrir historial', action: () => navigate('/historial') }
        ]
      }
    }

    if (text.includes('pago') || text.includes('siguiente pago')) {
      return {
        ...base,
        text: 'Tu próximo pago grande es el de la tarjeta de crédito.',
        highlights: [
          { label: 'Vence', value: '31 oct · 11:00 h', helper: 'Recordatorio programado', tone: 'neutral' },
          { label: 'Pago sugerido', value: '$13,605.73', helper: 'Saldo al día actual', tone: 'alert' }
        ],
        actions: [
          { label: 'Pagar tarjeta', action: () => navigate('/tarjetas') },
          { label: 'Ver detalle', action: () => navigate('/tarjetas') }
        ]
      }
    }

    if (text.includes('quién me debe') || text.includes('quien me debe')) {
      const mayorDeudor = FINANCE_METRICS.pendientes.reduce((prev, current) =>
        current.monto > prev.monto ? current : prev
      )
      return {
        ...base,
        text: 'El monto más grande que te deben hoy es este:',
        highlights: [
          {
            label: mayorDeudor.nombre,
            value: `$${mayorDeudor.monto.toFixed(2)}`,
            helper: `${mayorDeudor.dias} días pendiente · ${mayorDeudor.concepto}`,
            tone: 'alert'
          }
        ],
        actions: [
          { label: 'Enviar recordatorio automático', action: 'send-reminder' },
          { label: 'Ver todos los pendientes', action: () => navigate('/historial') }
        ]
      }
    }

    return {
      ...base,
      text: 'Puedo ayudarte con cualquiera de estas tareas:',
      cards: [
        { icon: '🧮', title: 'Dividir gasto', desc: 'Calcula split inteligente', action: () => navigate('/opensplit') },
        { icon: '💬', title: 'Cobrar pendientes', desc: 'Envía recordatorios automáticos', action: 'send-reminder' },
        { icon: '💰', title: 'Crear grupo', desc: 'Configura meta y miembros', action: () => navigate('/crear-grupo') }
      ]
    }
  }

  const sendMessage = (value) => {
    if (!value.trim()) return

    const cleanValue = value.trim()
    const now = new Date()

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${now.getTime()}`,
        sender: 'user',
        text: cleanValue,
        timestamp: now
      }
    ])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const response = buildObiResponse(cleanValue)
      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 700)
  }

  return (
    <div className="screen chat-obi-screen">
      <div className="chat-header">
        <button className="icon-button" onClick={() => navigate(-1)} aria-label="Regresar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="obi-profile">
          <div className="obi-avatar">OBI</div>
          <div className="obi-info">
            <span className="obi-name">OBI</span>
            <span className="obi-status-text">En línea · responde en &lt; 1 min</span>
          </div>
        </div>
        <div className="header-placeholder" aria-hidden="true"></div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => {
          const timeLabel = message.timestamp ? message.timestamp.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) : null
          return (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.sender === 'obi' && (
                <div className="message-avatar">
                  <div className="obi-icon">🤖</div>
                </div>
              )}

              <div className="message-content">
                {message.text && <div className="message-bubble">{message.text}</div>}

                {message.highlights && (
                  <div className="message-highlights">
                    {message.highlights.map((highlight, idx) => (
                      <div key={idx} className={`highlight-card ${highlight.tone || 'neutral'}`}>
                        <span className="highlight-label">{highlight.label}</span>
                        <span className="highlight-value">{highlight.value}</span>
                        {highlight.helper && <span className="highlight-helper">{highlight.helper}</span>}
                      </div>
                    ))}
                  </div>
                )}

                {message.actions && (
                  <div className="message-actions">
                    {message.actions.map((action, idx) => (
                      <button key={idx} className="action-button" onClick={() => handleAction(action.action)}>
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}

                {message.cards && (
                  <div className="message-cards">
                    {message.cards.map((card, idx) => (
                      <button key={idx} className="mini-card" onClick={() => handleAction(card.action)}>
                        <div className="card-icon">{card.icon}</div>
                        <div className="card-text">
                          <div className="card-title">{card.title}</div>
                          <div className="card-desc">{card.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {message.contacts && (
                  <div className="message-contacts">
                    {message.contacts.map((contact) => (
                      <button key={contact.id} className="contact-chip">
                        <div className="contact-avatar">{contact.initials}</div>
                        <span>{contact.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                {message.quickReplies && (
                  <div className="message-quick-replies">
                    {message.quickReplies.map((reply, idx) => (
                      <button key={idx} className="quick-reply-chip" onClick={() => sendMessage(reply)}>
                        {reply}
                      </button>
                    ))}
                  </div>
                )}

                {timeLabel && <span className="message-meta">{timeLabel}</span>}
              </div>
            </div>
          )
        })}

        {isTyping && (
          <div className="message obi typing">
            <div className="message-avatar">
              <div className="obi-icon">🤖</div>
            </div>
            <div className="message-content">
              <div className="typing-bubble">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <button className="input-icon-button" aria-label="Agregar emoji">
          🙂
        </button>
        <input
          type="text"
          className="chat-input"
          placeholder="Escribe un mensaje..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              sendMessage(inputValue)
            }
          }}
        />
        <button className="input-icon-button" onClick={() => sendMessage(inputValue)} aria-label="Enviar mensaje">
          ➤
        </button>
      </div>
    </div>
  )
}

export default ChatOBI

