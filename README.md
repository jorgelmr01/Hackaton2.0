# Finanzas OpenFriends - Openbank

Una aplicación móvil moderna para gestionar finanzas compartidas dentro del ecosistema Openbank.

## 🌟 Características

### 📊 Pantalla 1 - Resumen OpenFriends
- Gráfico circular interactivo mostrando deudas y créditos
- Vista general de grupos y splits activos
- Balance de "Te deben" vs "Debes"
- Acceso rápido al chat OBI

### 💬 Pantalla 2 - Chat OBI
- Asistente conversacional inteligente
- Creación de splits y grupos mediante chat
- Tarjetas interactivas y botones contextuales
- Respuestas dinámicas basadas en el contexto

### 🧮 Pantalla 3 - OpenSplit
- Dividir transacciones entre amigos
- Selección múltiple de transacciones
- División equitativa o proporcional
- Envío por WhatsApp a contactos externos

### 💰 Pantalla 4 - Detalle de Apartado Compartido
- Visualización de progreso del grupo
- Gestión de aportes y gastos
- Sistema de votaciones para gastos grupales
- Historial completo de movimientos

### 🏦 Pantalla 5 - Cotización de Crédito Compartido
- Simulador de crédito grupal
- Slider interactivo para monto
- Cálculo en tiempo real de pagos
- Sistema de firmas digitales

### 📜 Pantalla 6 - Historial
- Lista completa de transacciones
- Filtros por tipo (splits, apartados, créditos)
- Búsqueda por nombre o grupo
- Estados de transacciones

### ➕ Pantalla 7 - Creación de Grupo
- Formulario completo para nuevos grupos
- Selección de color personalizada
- Agregar contactos Openbank o externos
- Vista previa en tiempo real

## 🎨 Diseño

### Paleta de Colores
- **Fondo principal:** `#000000 - #121212`
- **Fondo secundario:** `#1E1E1E`
- **Rojo principal:** `#E60000`
- **Azul OBI:** `#0078FF`
- **Verde aqua:** `#3DDC97`
- **Rosa:** `#E91E63`
- **Amarillo:** `#FFF176`
- **Morado:** `#6A1B9A`
- **Verde oscuro:** `#004D40`

### Tipografía
- **Fuente principal:** Montserrat, SF Pro Display, Open Sans
- **Pesos:** 400, 500, 600, 700

### Espaciado
- Sistema de grid de 8px
- Espaciado base: 8px, 16px, 24px
- Border radius: 16px
- Transiciones: 0.4s ease-out

## 🚀 Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

3. **Abrir en el navegador:**
La aplicación se abrirá automáticamente en `http://localhost:3000`

## 📱 Visualización Óptima

Para la mejor experiencia:
1. Abre las herramientas de desarrollador (F12)
2. Activa la vista de dispositivo móvil (Ctrl+Shift+M)
3. Selecciona un dispositivo móvil o configura el viewport a 375x812 px

## 🛠️ Tecnologías

- **React 18** - Framework UI
- **React Router** - Navegación
- **Recharts** - Gráficos circulares
- **Vite** - Build tool
- **CSS3** - Estilos y animaciones

## 📂 Estructura del Proyecto

```
src/
├── components/
│   └── BottomNav.jsx        # Navegación inferior
├── screens/
│   ├── Resumen.jsx           # Pantalla principal
│   ├── ChatOBI.jsx           # Chat asistente
│   ├── OpenSplit.jsx         # Dividir gastos
│   ├── DetalleApartado.jsx   # Detalle de grupo
│   ├── CreditoCompartido.jsx # Crédito grupal
│   ├── Historial.jsx         # Historial
│   └── CrearGrupo.jsx        # Crear grupo
├── App.jsx                   # Componente principal
├── main.jsx                  # Entry point
└── index.css                 # Estilos globales
```

## ✨ Microinteracciones

- **Hover/Tap:** Resaltado con colores temáticos
- **Transiciones:** Deslizamiento lateral entre pantallas
- **Animaciones:** Fade in, slide in, pulse
- **Feedback:** Vibraciones y notificaciones visuales
- **Skeleton loaders:** Carga suave de contenido

## 🎯 Características Especiales

### Chat OBI Inteligente
- Reconocimiento de intenciones
- Respuestas contextuales
- Mini tarjetas interactivas
- Selección de contactos

### Sistema de Splits
- División equitativa o proporcional
- Envío por WhatsApp
- Link SPEI automático
- Tracking de pagos

### Apartados Compartidos
- Progreso visual
- Sistema de votaciones
- Aportes individuales
- Propuestas de gastos

### Créditos Grupales
- Simulador en tiempo real
- Firmas digitales
- Responsabilidad compartida
- Aprobación coordinada

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de build
npm run preview
```

## 📝 Notas de Desarrollo

- Diseño mobile-first optimizado para 480px max width
- Todas las animaciones respetan `prefers-reduced-motion`
- Componentes reutilizables y modulares
- Estado local con React hooks
- Navegación con React Router v6

## 🎨 Detalles de UX

- **Grid layout:** 8px base
- **Redondeo:** 16px para tarjetas
- **Sombras:** rgba(0, 0, 0, 0.4) blur 12px
- **Transiciones:** cubic-bezier(0.4, 0, 0.2, 1)
- **Iconos:** SVG monolínea en blanco

## 📱 Compatibilidad

- Chrome (recomendado)
- Firefox
- Safari
- Edge

## 🚀 Próximas Mejoras

- [ ] Integración con API real de Openbank
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Biometría para firmas
- [ ] Compartir por otras plataformas
- [ ] Exportar historial PDF
- [ ] Recordatorios de pagos
- [ ] Chat grupal integrado

---

**Desarrollado para Hackatón Jorge - Openbank 2025**

