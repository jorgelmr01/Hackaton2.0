import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './ChatOBI.css'

const ChatOBI = ({ setShowBottomNav }) => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'obi',
      text: '¡Hola! 👋 Soy OBI, tu asistente financiero. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [showActions, setShowActions] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setShowBottomNav(false)
    return () => setShowBottomNav(true)
  }, [setShowBottomNav])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = (text) => {
    if (!text.trim()) return

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: text,
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInputValue('')
    setShowActions(false)

    // Simulate OBI response
    setTimeout(() => {
      let obiResponse = {
        id: messages.length + 2,
        sender: 'obi',
        timestamp: new Date()
      }

      if (text.toLowerCase().includes('dividir') || text.toLowerCase().includes('split')) {
        obiResponse.text = 'Perfecto 🍕, ¿entre quiénes quieres dividirla?'
        obiResponse.actions = [
          { label: 'Seleccionar amigos', action: 'select-friends' },
          { label: 'Ver transacciones', action: () => navigate('/opensplit') }
        ]
      } else if (text.toLowerCase().includes('grupo') || text.toLowerCase().includes('apartado')) {
        obiResponse.text = '¡Excelente idea! 💰 ¿Quieres crear un nuevo grupo de ahorro o ver los existentes?'
        obiResponse.actions = [
          { label: 'Crear grupo', action: () => navigate('/crear-grupo') },
          { label: 'Ver mis grupos', action: () => navigate('/openfriends') }
        ]
      } else if (text.toLowerCase().includes('crédito') || text.toLowerCase().includes('préstamo')) {
        obiResponse.text = 'Puedo ayudarte con un crédito compartido 🏦. ¿Para qué grupo es?'
        obiResponse.actions = [
          { label: 'Viaje Cancún', action: () => navigate('/credito/1') },
          { label: 'Roomies Depto', action: () => navigate('/credito/2') }
        ]
      } else {
        obiResponse.text = 'Entiendo. Puedo ayudarte con:'
        obiResponse.cards = [
          { icon: '🧮', title: 'Dividir gasto', desc: 'Split entre amigos', action: () => navigate('/opensplit') },
          { icon: '💰', title: 'Crear grupo', desc: 'Apartado compartido', action: () => navigate('/crear-grupo') },
          { icon: '🏦', title: 'Crédito grupal', desc: 'Solicitar juntos', action: () => navigate('/credito/1') }
        ]
      }

      setMessages(prev => [...prev, obiResponse])
    }, 1000)
  }

  const handleAction = (action) => {
    if (typeof action === 'function') {
      action()
    } else if (action === 'select-friends') {
      const obiMessage = {
        id: messages.length + 1,
        sender: 'obi',
        text: 'Aquí están tus contactos de OpenFriends:',
        contacts: [
          { id: 1, name: 'María García', initials: 'MG' },
          { id: 2, name: 'Carlos Ruiz', initials: 'CR' },
          { id: 3, name: 'Ana López', initials: 'AL' }
        ],
        timestamp: new Date()
      }
      setMessages([...messages, obiMessage])
    }
  }

  return (
    <div className="screen chat-obi-screen">
      <div className="chat-header">
        <button className="icon-button" onClick={() => navigate(-1)} aria-label="Regresar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div className="obi-avatar">OBI</div>
        <div style={{ width: '40px' }}></div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.sender === 'obi' && (
              <div className="message-avatar">
                <div className="obi-icon">🤖</div>
              </div>
            )}
            
            <div className="message-content">
              {message.text && <div className="message-bubble">{message.text}</div>}
              
              {message.actions && (
                <div className="message-actions">
                  {message.actions.map((action, idx) => (
                    <button
                      key={idx}
                      className="action-button"
                      onClick={() => handleAction(action.action)}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              {message.cards && (
                <div className="message-cards">
                  {message.cards.map((card, idx) => (
                    <button
                      key={idx}
                      className="mini-card"
                      onClick={() => handleAction(card.action)}
                    >
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
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showActions && (
        <div className="quick-actions">
          <button 
            className="quick-action-chip"
            onClick={() => sendMessage('Quiero dividir mi última compra')}
          >
            Dividir gasto
          </button>
          <button 
            className="quick-action-chip"
            onClick={() => sendMessage('Crear un nuevo grupo')}
          >
            Crear grupo
          </button>
          <button 
            className="quick-action-chip"
            onClick={() => sendMessage('Solicitar crédito')}
          >
            Crédito grupal
          </button>
        </div>
      )}

      <div className="chat-input-container">
        <button className="input-icon-button">
          🙂
        </button>
        <input
          type="text"
          className="chat-input"
          placeholder="Escribe un mensaje..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
        />
        <button 
          className="input-icon-button"
          onClick={() => sendMessage(inputValue)}
        >
          🎙️
        </button>
      </div>
    </div>
  )
}

export default ChatOBI

