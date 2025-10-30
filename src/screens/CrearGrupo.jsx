import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './CrearGrupo.css'

const CrearGrupo = ({ setShowBottomNav }) => {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [metaAhorro, setMetaAhorro] = useState('')
  const [colorSeleccionado, setColorSeleccionado] = useState('#E91E63')
  const [participantes, setParticipantes] = useState([
    { id: 1, nombre: 'Jorge Luis (Tú)', initials: 'JL', tipo: 'yo', selected: true }
  ])
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevoTelefono, setNuevoTelefono] = useState('')
  const [showAddExternal, setShowAddExternal] = useState(false)

  useEffect(() => {
    setShowBottomNav(true)
  }, [setShowBottomNav])

  const colores = [
    { color: '#E91E63', nombre: 'Rosa' },
    { color: '#3DDC97', nombre: 'Aqua' },
    { color: '#0078FF', nombre: 'Azul' },
    { color: '#FFF176', nombre: 'Amarillo' },
    { color: '#6A1B9A', nombre: 'Morado' },
    { color: '#004D40', nombre: 'Verde oscuro' },
  ]

  const amigosOpenbank = [
    { id: 2, nombre: 'María García', initials: 'MG', tipo: 'openbank' },
    { id: 3, nombre: 'Carlos Ruiz', initials: 'CR', tipo: 'openbank' },
    { id: 4, nombre: 'Ana López', initials: 'AL', tipo: 'openbank' },
    { id: 5, nombre: 'Pedro Sánchez', initials: 'PS', tipo: 'openbank' },
  ]

  const toggleParticipante = (id) => {
    setParticipantes(prev =>
      prev.map(p => p.id === id ? { ...p, selected: !p.selected } : p)
    )
  }

  const agregarAmigo = (amigo) => {
    if (!participantes.find(p => p.id === amigo.id)) {
      setParticipantes([...participantes, { ...amigo, selected: true }])
    }
  }

  const agregarExterno = () => {
    if (nuevoNombre.trim() && nuevoTelefono.trim()) {
      const nuevoParticipante = {
        id: Date.now(),
        nombre: nuevoNombre,
        initials: nuevoNombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        tipo: 'externo',
        telefono: nuevoTelefono,
        selected: true
      }
      setParticipantes([...participantes, nuevoParticipante])
      setNuevoNombre('')
      setNuevoTelefono('')
      setShowAddExternal(false)
    }
  }

  const eliminarParticipante = (id) => {
    if (participantes.find(p => p.id === id)?.tipo !== 'yo') {
      setParticipantes(participantes.filter(p => p.id !== id))
    }
  }

  const handleCrear = () => {
    if (nombre.trim() && metaAhorro && participantes.filter(p => p.selected).length > 0) {
      alert(`¡Grupo "${nombre}" creado exitosamente!`)
      navigate('/openfriends')
    } else {
      alert('Por favor completa todos los campos requeridos')
    }
  }

  return (
    <div className="screen crear-grupo-screen">
      <div className="screen-header">
        <button className="icon-button" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h1 className="screen-title">Nuevo grupo</h1>
        <div style={{ width: '40px' }}></div>
      </div>

      <div className="screen-content">
        {/* Preview del grupo */}
        <div className="grupo-preview" style={{ backgroundColor: colorSeleccionado }}>
          <div className="preview-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div className="preview-name">{nombre || 'Nombre del grupo'}</div>
          {metaAhorro && (
            <div className="preview-meta">Meta: ${parseInt(metaAhorro).toLocaleString('es-MX')}</div>
          )}
        </div>

        {/* Nombre del grupo */}
        <div className="form-group">
          <label className="form-label">
            📝 Nombre del grupo
            <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Ej: Viaje a Cancún, Roomies, etc."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        {/* Meta de ahorro */}
        <div className="form-group">
          <label className="form-label">
            💰 Meta de ahorro
            <span className="required">*</span>
          </label>
          <div className="input-with-prefix">
            <span className="input-prefix">$</span>
            <input
              type="number"
              className="form-input with-prefix"
              placeholder="0"
              value={metaAhorro}
              onChange={(e) => setMetaAhorro(e.target.value)}
            />
            <span className="input-suffix">MXN</span>
          </div>
        </div>

        {/* Color del grupo */}
        <div className="form-group">
          <label className="form-label">🎨 Color del grupo</label>
          <div className="colores-grid">
            {colores.map((c) => (
              <button
                key={c.color}
                className={`color-option ${colorSeleccionado === c.color ? 'selected' : ''}`}
                style={{ backgroundColor: c.color }}
                onClick={() => setColorSeleccionado(c.color)}
              >
                {colorSeleccionado === c.color && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Participantes */}
        <div className="form-group">
          <label className="form-label">
            👥 Participantes
            <span className="participants-count">({participantes.filter(p => p.selected).length})</span>
          </label>
          
          {/* Participantes agregados */}
          <div className="participantes-list">
            {participantes.map((p) => (
              <div key={p.id} className="participante-item">
                <div className="participante-avatar" style={{ backgroundColor: colorSeleccionado }}>
                  {p.initials}
                </div>
                <div className="participante-info">
                  <div className="participante-nombre">{p.nombre}</div>
                  {p.telefono && <div className="participante-telefono">{p.telefono}</div>}
                  {p.tipo === 'openbank' && <div className="participante-badge">Openbank</div>}
                  {p.tipo === 'externo' && <div className="participante-badge externo">Externo</div>}
                </div>
                {p.tipo !== 'yo' && (
                  <button
                    className="delete-button"
                    onClick={() => eliminarParticipante(p.id)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Agregar amigos de Openbank */}
          {amigosOpenbank.filter(a => !participantes.find(p => p.id === a.id)).length > 0 && (
            <div className="agregar-amigos">
              <div className="subsection-label">Agregar de Openbank</div>
              <div className="amigos-chips">
                {amigosOpenbank
                  .filter(a => !participantes.find(p => p.id === a.id))
                  .map((amigo) => (
                    <button
                      key={amigo.id}
                      className="amigo-chip"
                      onClick={() => agregarAmigo(amigo)}
                    >
                      <div className="amigo-avatar">{amigo.initials}</div>
                      <span>{amigo.nombre}</span>
                      <span className="add-icon">+</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Agregar externo */}
          {!showAddExternal ? (
            <button
              className="secondary-button"
              onClick={() => setShowAddExternal(true)}
            >
              + Agregar persona externa
            </button>
          ) : (
            <div className="add-external-form fade-in">
              <div className="subsection-label">Agregar persona externa</div>
              <input
                type="text"
                className="form-input"
                placeholder="Nombre completo"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
              />
              <input
                type="tel"
                className="form-input"
                placeholder="Teléfono (para WhatsApp)"
                value={nuevoTelefono}
                onChange={(e) => setNuevoTelefono(e.target.value)}
              />
              <div className="form-actions">
                <button
                  className="secondary-button"
                  onClick={() => {
                    setShowAddExternal(false)
                    setNuevoNombre('')
                    setNuevoTelefono('')
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="primary-button"
                  onClick={agregarExterno}
                  disabled={!nuevoNombre.trim() || !nuevoTelefono.trim()}
                  style={{ opacity: (!nuevoNombre.trim() || !nuevoTelefono.trim()) ? 0.5 : 1 }}
                >
                  Agregar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Botón crear */}
        <button
          className="primary-button large"
          onClick={handleCrear}
          style={{ 
            backgroundColor: colorSeleccionado,
            marginTop: 'var(--spacing-3x)'
          }}
        >
          Crear grupo
        </button>
      </div>
    </div>
  )
}

export default CrearGrupo

