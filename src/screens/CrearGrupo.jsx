import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './CrearGrupo.css'
import { formatCurrency } from '../utils/format'

const palette = [
  { id: 'pink', label: 'Viaje Cancún', value: '#E91E63' },
  { id: 'aqua', label: 'Roomies', value: '#3DDC97' },
  { id: 'yellow', label: 'Apartados', value: '#FFF176' },
  { id: 'purple', label: 'Fiesta', value: '#6A1B9A' },
  { id: 'green', label: 'Inversión', value: '#004D40' },
  { id: 'blue', label: 'Otros', value: '#0078FF' }
]

const amigosCatalogo = [
  { id: 1, nombre: 'María García', telefono: '+52 55 1234 5678', interno: true },
  { id: 2, nombre: 'Carlos Ruiz', telefono: '+52 55 8765 4321', interno: true },
  { id: 3, nombre: 'Ana López', telefono: '+52 55 9988 7766', interno: true }
]

const CrearGrupo = ({ setShowBottomNav }) => {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [meta, setMeta] = useState('')
  const [color, setColor] = useState(palette[0])
  const [amigos, setAmigos] = useState(() => amigosCatalogo.map((amigo) => ({ ...amigo, selected: false })))
  const [externos, setExternos] = useState([])
  const [externo, setExterno] = useState({ nombre: '', telefono: '' })
  const [previewActive, setPreviewActive] = useState(false)

  useEffect(() => {
    setShowBottomNav(false)
    return () => setShowBottomNav(true)
  }, [setShowBottomNav])

  const participantes = useMemo(
    () => [...amigos.filter((amigo) => amigo.selected), ...externos],
    [amigos, externos]
  )

  const metaNumerica = Number(meta)
  const metaLegible = metaNumerica > 0 ? formatCurrency(metaNumerica) : '$0.00'

  const toggleAmigo = (id) => {
    setAmigos((prev) =>
      prev.map((amigo) =>
        amigo.id === id
          ? {
              ...amigo,
              selected: !amigo.selected
            }
          : amigo
      )
    )
  }

  const agregarExterno = () => {
    const nombreLimpio = externo.nombre.trim()
    const telefonoLimpio = externo.telefono.trim()

    if (!nombreLimpio || !telefonoLimpio) return

    const nuevo = {
      id: Date.now(),
      nombre: nombreLimpio,
      telefono: telefonoLimpio,
      interno: false
    }

    setExternos((prev) => [...prev, nuevo])
    setExterno({ nombre: '', telefono: '' })
  }

  const eliminarParticipante = (id, interno) => {
    if (interno) {
      setAmigos((prev) => prev.map((amigo) => (amigo.id === id ? { ...amigo, selected: false } : amigo)))
      return
    }

    setExternos((prev) => prev.filter((participante) => participante.id !== id))
  }

  const handleCrearGrupo = () => {
    if (!nombre.trim() || !metaNumerica || participantes.length === 0) return

    setPreviewActive(true)
    setTimeout(() => {
      alert('¡Grupo creado! Ya puedes comenzar a invitar a tus amigos.')
      navigate('/openfriends')
    }, 600)
  }

  const getIniciales = (texto) =>
    texto
      .split(' ')
      .map((n) => n[0])
      .filter(Boolean)
      .join('')
      .toUpperCase()
      .slice(0, 2)

  return (
    <div className="screen crear-grupo-screen">
      <div className="screen-header">
        <button className="icon-button" aria-label="Regresar" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="screen-title">Crear grupo</h1>
        <div style={{ width: '40px' }} aria-hidden="true"></div>
      </div>

      <div className="screen-content light">
        <div
          className="grupo-preview"
          style={{
            background: `linear-gradient(135deg, ${color.value} 0%, rgba(17, 24, 39, 0.92) 100%)`
          }}
        >
          <div className="preview-icon" role="img" aria-label="Icono del grupo">
            🥳
          </div>
          <div className="preview-name">{nombre || 'Nombre del grupo'}</div>
          <div className="preview-meta">Meta colectiva: {metaLegible}</div>
          <div className="preview-meta">Participantes: {participantes.length}</div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="nombre-grupo">
            Nombre del grupo <span className="required">*</span>
          </label>
          <input
            id="nombre-grupo"
            className="form-input"
            placeholder="Ej. Roadtrip a Valle"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="meta-grupo">
            Meta de ahorro
            <span className="participants-count">Editable por todos</span>
          </label>
          <div className="input-with-prefix">
            <span className="input-prefix">$</span>
            <input
              id="meta-grupo"
              className="form-input with-prefix"
              placeholder="0.00"
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              type="number"
              min="0"
              step="100"
              inputMode="decimal"
            />
            <span className="input-suffix">MXN</span>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Color del grupo</label>
          <div className="colores-grid">
            {palette.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`color-option ${color.id === option.id ? 'selected' : ''}`}
                style={{ backgroundColor: option.value }}
                onClick={() => setColor(option)}
                aria-label={`Color ${option.label}`}
                aria-pressed={color.id === option.id}
              >
                {color.id === option.id ? '✓' : ''}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Selecciona amigos</label>
          <div className="amigos-chips">
            {amigos.map((amigo) => (
              <button
                key={amigo.id}
                type="button"
                className={`amigo-chip ${amigo.selected ? 'selected' : ''}`}
                onClick={() => toggleAmigo(amigo.id)}
                aria-pressed={amigo.selected}
              >
                <div className="amigo-avatar" aria-hidden="true">
                  {getIniciales(amigo.nombre)}
                </div>
                <div className="amigo-info">
                  <span className="amigo-nombre">{amigo.nombre}</span>
                  <span className="amigo-telefono">{amigo.telefono}</span>
                </div>
                <span className="add-icon" aria-hidden="true">{amigo.selected ? '✓' : '+'}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Participantes
            <span className="participants-count">{participantes.length} miembros</span>
          </label>

          {participantes.length === 0 ? (
            <p className="empty-participants" role="status">
              Selecciona al menos un amigo para comenzar tu grupo.
            </p>
          ) : (
            <div className="participantes-list">
              {participantes.map((participante) => (
                <div key={participante.id} className="participante-item">
                  <div
                    className="participante-avatar"
                    style={{ backgroundColor: participante.interno ? color.value : '#0078FF' }}
                  >
                    {getIniciales(participante.nombre)}
                  </div>
                  <div className="participante-info">
                    <span className="participante-nombre">{participante.nombre}</span>
                    <span className="participante-telefono">{participante.telefono}</span>
                  </div>
                  <span className={`participante-badge ${participante.interno ? '' : 'externo'}`}>
                    {participante.interno ? 'Openbank' : 'Externo'}
                  </span>
                  <button
                    className="delete-button"
                    aria-label={`Eliminar ${participante.nombre} del grupo`}
                    onClick={() => eliminarParticipante(participante.id, participante.interno)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-group agregar-amigos">
          <div className="subsection-label">Agregar externos</div>
          <div className="add-external-form">
            <input
              className="form-input"
              placeholder="Nombre completo"
              value={externo.nombre}
              onChange={(e) => setExterno((prev) => ({ ...prev, nombre: e.target.value }))}
            />
            <input
              className="form-input"
              placeholder="Teléfono (WhatsApp)"
              value={externo.telefono}
              onChange={(e) => setExterno((prev) => ({ ...prev, telefono: e.target.value }))}
              inputMode="tel"
            />
            <div className="form-actions">
              <button
                className="secondary-button"
                type="button"
                onClick={() => setExterno({ nombre: '', telefono: '' })}
              >
                Limpiar
              </button>
              <button className="primary-button" type="button" onClick={agregarExterno}>
                Agregar
              </button>
            </div>
          </div>
        </div>

        <button
          className="primary-button large"
          type="button"
          onClick={handleCrearGrupo}
          disabled={!nombre.trim() || !metaNumerica || participantes.length === 0}
        >
          Lanzar grupo
        </button>

        {previewActive && <div aria-live="polite" style={{ marginTop: 16 }}>Preparando invitaciones…</div>}
      </div>
    </div>
  )
}

export default CrearGrupo

