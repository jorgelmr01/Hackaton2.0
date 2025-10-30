# 🎯 Finanzas OpenFriends - Resumen del Proyecto

## 📋 Descripción General

**Finanzas OpenFriends** es un módulo completo de gestión de finanzas compartidas diseñado para integrarse perfectamente en la aplicación Openbank. Permite a los usuarios dividir gastos, crear apartados grupales, solicitar créditos compartidos y gestionar deudas con amigos de forma intuitiva y moderna.

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **Frontend Framework:** React 18
- **Routing:** React Router DOM v6
- **Build Tool:** Vite
- **Charts:** Recharts
- **Styling:** CSS3 con variables CSS
- **State Management:** React Hooks (useState, useEffect)

### Estructura de Archivos

```
Finanzas OpenFriends/
│
├── public/                      # Archivos estáticos
├── src/
│   ├── components/
│   │   ├── BottomNav.jsx       # Navegación inferior global
│   │   └── BottomNav.css
│   │
│   ├── screens/                # Pantallas principales (7 pantallas)
│   │   ├── Resumen.jsx         # Pantalla 1: Dashboard principal
│   │   ├── Resumen.css
│   │   ├── ChatOBI.jsx         # Pantalla 2: Chat con asistente
│   │   ├── ChatOBI.css
│   │   ├── OpenSplit.jsx       # Pantalla 3: Dividir gastos
│   │   ├── OpenSplit.css
│   │   ├── DetalleApartado.jsx # Pantalla 4: Detalle de grupo
│   │   ├── DetalleApartado.css
│   │   ├── CreditoCompartido.jsx # Pantalla 5: Crédito grupal
│   │   ├── CreditoCompartido.css
│   │   ├── Historial.jsx       # Pantalla 6: Historial completo
│   │   ├── Historial.css
│   │   ├── CrearGrupo.jsx      # Pantalla 7: Nuevo grupo
│   │   └── CrearGrupo.css
│   │
│   ├── App.jsx                 # Componente raíz + routing
│   ├── App.css
│   ├── main.jsx                # Entry point
│   └── index.css               # Estilos globales + variables
│
├── index.html                  # HTML principal
├── package.json                # Dependencias
├── vite.config.js             # Configuración Vite
├── README.md                   # Documentación principal
├── INSTALLATION_GUIDE.md       # Guía de instalación
├── QUICK_START.txt            # Inicio rápido
├── START.bat                  # Script de inicio (Windows)
└── .gitignore

```

## 🎨 Sistema de Diseño

### Paleta de Colores (Variables CSS)

```css
--bg-primary: #000000          /* Fondo principal */
--bg-secondary: #121212        /* Fondo secundario */
--bg-card: #1E1E1E            /* Fondo tarjetas */
--text-primary: #FFFFFF        /* Texto principal */
--text-secondary: #B0B0B0      /* Texto secundario */

--red-primary: #E60000         /* Botones principales */
--red-hover: #CC0000           /* Hover rojo */
--blue-obi: #0078FF           /* Azul OBI */

--green-dark: #004D40          /* Verde oscuro */
--pink: #E91E63               /* Rosa */
--aqua: #3DDC97               /* Aqua */
--yellow: #FFF176             /* Amarillo */
--purple: #6A1B9A             /* Morado */
```

### Espaciado
- **Base:** 8px
- **2x:** 16px
- **3x:** 24px
- **Border Radius:** 16px
- **Transición:** 0.4s cubic-bezier(0.4, 0, 0.2, 1)

### Tipografía
- **Familia:** Montserrat, SF Pro Display, Open Sans
- **Pesos:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

## 📱 Pantallas Implementadas

### 1️⃣ Pantalla: Resumen OpenFriends (`/openfriends`)

**Componentes principales:**
- Gráfico circular interactivo (Recharts)
- Tarjetas de balance (Te deben / Debes)
- Lista de grupos con scroll horizontal
- Botón flotante OBI
- Link a historial

**Features:**
- Visualización gráfica de deudas
- Click en segmentos para ver detalle
- Navegación a grupos individuales
- Acceso rápido a crear grupo
- Animaciones de entrada

**Estado:**
- `selectedSegment`: Segmento seleccionado del gráfico
- `debtData`: Datos del gráfico
- `grupos`: Lista de grupos activos

---

### 2️⃣ Pantalla: Chat OBI (`/chat-obi`)

**Componentes principales:**
- Header con avatar OBI
- Área de mensajes con scroll
- Burbujas de chat (usuario/OBI)
- Tarjetas interactivas
- Botones de acción contextual
- Chips de contactos
- Quick actions
- Input con emoji y voz

**Features:**
- Conversación fluida
- Respuestas contextuales según keywords
- Mini-tarjetas para acciones
- Selección de amigos
- Navegación desde el chat
- Auto-scroll a último mensaje

**Estado:**
- `messages`: Array de mensajes
- `inputValue`: Texto actual
- `showActions`: Mostrar acciones rápidas

---

### 3️⃣ Pantalla: OpenSplit (`/opensplit`)

**Componentes principales:**
- Lista de transacciones seleccionables
- Configurador de split (3 pasos)
- Selector de amigos
- Radio buttons para tipo de división
- Resumen de monto
- Confirmación con detalles

**Features:**
- Selección múltiple de transacciones
- División equitativa/proporcional
- Agregar contactos externos
- Cálculo automático por persona
- Preview de envío WhatsApp

**Estado:**
- `selectedTransactions`: IDs seleccionados
- `step`: 'select' | 'configure' | 'confirm'
- `friends`: Lista de amigos con estado
- `splitType`: 'equal' | 'proportional'

**Flujo:**
1. **Select:** Seleccionar transacciones
2. **Configure:** Elegir amigos y tipo
3. **Confirm:** Revisar y enviar

---

### 4️⃣ Pantalla: Detalle Apartado (`/apartado/:id`)

**Componentes principales:**
- Header con foto de grupo
- Barra de progreso animada
- Grid de participantes con aportes
- Botones de acción (Aportar, Proponer, Votar)
- Panel de votaciones expandible
- Historial de movimientos
- Botón solicitar crédito

**Features:**
- Progreso visual del objetivo
- Lista de miembros con aportes
- Sistema de votaciones
- Historial de transacciones
- Navegación a crédito grupal

**Estado:**
- `showVotaciones`: Mostrar panel votaciones
- `apartado`: Datos del grupo

**Datos mostrados:**
- Objetivo y progreso
- Participantes y aportes
- Votaciones pendientes
- Movimientos recientes

---

### 5️⃣ Pantalla: Crédito Compartido (`/credito/:id`)

**Componentes principales:**
- Grupo info badge
- Slider de monto (range input)
- Botones de plazo (3, 6, 12 meses)
- Card de tasa de interés
- Resultado de pago mensual
- Grid de firmas digitales
- Info card con detalles

**Features:**
- Simulador en tiempo real
- Slider con gradiente dinámico
- Selección de plazo
- Cálculo automático de pagos
- Sistema de firmas con animación
- Vibración al firmar
- Validación de firmas completas

**Estado:**
- `monto`: Monto del crédito
- `plazo`: Meses del crédito
- `firmas`: Array de IDs firmados

**Cálculos:**
```javascript
tasaMensual = (tasaAnual / 100) / 12
pagoMensual = monto × (tasaMensual × (1 + tasaMensual)^plazo) / ((1 + tasaMensual)^plazo - 1)
pagoPorPersona = pagoMensual / numeroMiembros
```

---

### 6️⃣ Pantalla: Historial (`/historial`)

**Componentes principales:**
- Barra de búsqueda con clear
- Panel de filtros expandible
- Lista de transacciones
- Íconos por tipo
- Badges de estado
- Estado vacío

**Features:**
- Búsqueda por texto
- Filtros por tipo (splits, apartados, créditos)
- Estados visuales (completado, procesando, pendiente)
- Montos positivos/negativos
- Iconografía contextual

**Estado:**
- `filterOpen`: Mostrar filtros
- `searchQuery`: Texto de búsqueda
- `selectedType`: Tipo seleccionado

**Tipos de movimientos:**
- 🧮 Split (verde aqua)
- 💰 Apartado (amarillo)
- 🏦 Crédito (rosa)

---

### 7️⃣ Pantalla: Crear Grupo (`/crear-grupo`)

**Componentes principales:**
- Preview del grupo (actualización en tiempo real)
- Input de nombre
- Input de meta con prefijo/sufijo
- Grid de selección de colores
- Lista de participantes
- Chips de amigos Openbank
- Form para agregar externos
- Botón crear (color dinámico)

**Features:**
- Preview en vivo
- Selector de colores visual
- Agregar amigos Openbank
- Agregar externos con teléfono
- Eliminar participantes
- Validación de campos
- Color del botón según selección

**Estado:**
- `nombre`: Nombre del grupo
- `metaAhorro`: Meta numérica
- `colorSeleccionado`: Color hex
- `participantes`: Array de miembros
- `showAddExternal`: Mostrar form externo

---

## 🎯 Componentes Reutilizables

### BottomNav
Navegación inferior global con 5 items:
- Inicio
- Billetera
- Tarjetas
- Movimientos
- **Amigos** (OpenFriends)

Estado activo con highlight rojo.

---

## 🔄 Sistema de Navegación

### Rutas Principales
```javascript
/openfriends          → Resumen
/chat-obi             → Chat OBI
/opensplit            → Dividir gastos
/apartado/:id         → Detalle apartado
/credito/:id          → Crédito grupal
/historial            → Historial
/crear-grupo          → Crear grupo
```

### Navegación Programática
```javascript
navigate('/ruta')           // Ir a ruta
navigate(-1)                // Volver atrás
navigate(`/apartado/${id}`) // Con parámetros
```

### Control de Bottom Nav
```javascript
setShowBottomNav(true)   // Mostrar
setShowBottomNav(false)  // Ocultar (solo en Chat OBI)
```

---

## ✨ Animaciones y Microinteracciones

### Animaciones CSS

**FadeIn:**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**SlideIn:**
```css
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
```

**Pulse:**
```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
```

### Clases Utilitarias
- `.fade-in` - Animación de entrada
- `.slide-in-right` - Deslizamiento lateral
- `button:active { transform: scale(0.98) }` - Feedback táctil

### Transiciones
- Duración: 0.4s
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Propiedades: all, background, transform, color

---

## 🎨 Patrones de Diseño

### Cards
```css
.card {
  background-color: var(--bg-card);
  border-radius: var(--border-radius);
  padding: var(--spacing-2x);
  box-shadow: var(--shadow);
}
```

### Botones Principales
```css
.primary-button {
  background-color: var(--red-primary);
  color: var(--text-primary);
  padding: var(--spacing-2x) var(--spacing-3x);
  border-radius: 12px;
}
```

### Botones Secundarios
```css
.secondary-button {
  background-color: var(--bg-card);
  color: var(--text-primary);
}
```

### Floating Button
```css
.floating-button {
  position: fixed;
  bottom: 100px;
  right: var(--spacing-2x);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--blue-obi);
}
```

---

## 📊 Datos de Ejemplo

### Transacciones
```javascript
{
  id: 1,
  name: 'Compra En Línea En Uber Eats',
  amount: 217.22,
  date: 'oct 28 2025',
  location: 'Help.Uber.C, Cmx'
}
```

### Grupos
```javascript
{
  id: 1,
  nombre: 'Viaje Cancún',
  color: '#E91E63',
  objetivo: 20000,
  actual: 12000,
  progreso: 60,
  miembros: [...]
}
```

### Amigos
```javascript
{
  id: 1,
  nombre: 'María García',
  initials: 'MG',
  tipo: 'openbank'
}
```

---

## 🚀 Características Avanzadas

### 1. Gráfico Circular Interactivo
- Librería: Recharts
- Click para ver detalle
- Tooltip personalizado
- Animación de entrada (800ms)
- Colores de la paleta Openbank

### 2. Chat Conversacional
- Reconocimiento de keywords
- Respuestas dinámicas
- Navegación integrada
- Scroll automático
- Quick actions

### 3. Slider con Gradiente
- Input range personalizado
- Gradiente dinámico según valor
- Thumb customizado
- Vibración en cambio

### 4. Sistema de Firmas
- Click para firmar/des-firmar
- Animación pulse
- Badge de confirmación
- Validación completa
- Vibración táctil

### 5. Búsqueda y Filtros
- Búsqueda en tiempo real
- Filtros múltiples
- Clear button
- Estado vacío
- Destacado de resultados

---

## 🔐 Validaciones

### Crear Grupo
- ✅ Nombre no vacío
- ✅ Meta numérica > 0
- ✅ Al menos 1 participante

### OpenSplit
- ✅ Al menos 1 transacción
- ✅ Al menos 1 amigo seleccionado
- ✅ Tipo de división elegido

### Crédito
- ✅ Monto dentro del rango
- ✅ Plazo seleccionado
- ✅ Todas las firmas completadas

---

## 📱 Responsive Design

### Breakpoints
- **Max Width:** 480px (contenedor principal)
- **Min Width:** 320px (soporte)

### Mobile First
- Diseño optimizado para móvil
- Touch friendly (44px min touch target)
- Scroll vertical natural
- Bottom navigation fixed

---

## 🎯 UX Highlights

1. **Feedback Visual Inmediato**
   - Cambios de color al hover/tap
   - Animaciones de confirmación
   - Progress bars animadas

2. **Navegación Intuitiva**
   - Back buttons consistentes
   - Bottom nav siempre visible
   - Breadcrumbs visuales

3. **Estados Claros**
   - Loading states (skeleton)
   - Empty states
   - Error states
   - Success confirmations

4. **Microinteracciones**
   - Button press scale
   - Slider feedback
   - Firma animation
   - Progress animation

---

## 🧪 Testing Checklist

- [ ] Navegación entre todas las pantallas
- [ ] Botón atrás funcional
- [ ] Bottom nav highlighting correcto
- [ ] Chat OBI respuestas correctas
- [ ] Splits cálculo correcto
- [ ] Crédito cálculo correcto
- [ ] Firmas digitales funcionales
- [ ] Búsqueda y filtros funcionales
- [ ] Animaciones fluidas
- [ ] Responsive en diferentes viewports

---

## 📈 Métricas del Proyecto

- **Total de Pantallas:** 7
- **Componentes:** 8
- **Rutas:** 7
- **Archivos CSS:** 9
- **Líneas de Código:** ~3000+
- **Animaciones:** 15+
- **Colores de Paleta:** 9
- **Estados Manejados:** 20+

---

## 🎨 Decisiones de Diseño

### ¿Por qué React?
- Componentización natural
- Estado reactivo
- Ecosistema robusto
- Performance óptimo

### ¿Por qué Vite?
- Build ultra rápido
- HMR instantáneo
- Configuración simple
- Desarrollo moderno

### ¿Por qué Recharts?
- Integración perfecta con React
- Gráficos responsivos
- Personalización completa
- Animaciones built-in

### ¿Por qué CSS puro (sin frameworks)?
- Control total
- Peso mínimo
- Performance óptimo
- Flexibilidad máxima

---

## 🚧 Posibles Mejoras Futuras

1. **Backend Integration**
   - API REST para datos reales
   - Autenticación JWT
   - WebSockets para chat real

2. **Funcionalidades**
   - Notificaciones push
   - Modo offline con service workers
   - Exportar PDF de historial
   - Recordatorios automáticos

3. **UX Enhancements**
   - Gestos swipe
   - Pull to refresh
   - Skeleton loaders más elaborados
   - Onboarding tour

4. **Tecnología**
   - TypeScript para type safety
   - Redux para estado global
   - Testing con Jest/React Testing Library
   - PWA capabilities

---

## 📚 Recursos Utilizados

- **React Docs:** https://react.dev/
- **Recharts:** https://recharts.org/
- **React Router:** https://reactrouter.com/
- **Vite:** https://vitejs.dev/
- **MDN CSS:** https://developer.mozilla.org/es/docs/Web/CSS

---

## 🎉 Conclusión

**Finanzas OpenFriends** es una aplicación móvil completa y funcional que demuestra:
- ✅ Arquitectura React moderna
- ✅ Diseño UI/UX profesional
- ✅ Animaciones y microinteracciones pulidas
- ✅ Navegación fluida y lógica
- ✅ Código limpio y mantenible
- ✅ Responsive design optimizado
- ✅ Experiencia de usuario excepcional

---

**Desarrollado con ❤️ para Hackatón Jorge - Openbank 2025**

