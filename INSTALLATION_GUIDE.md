# 📦 Guía de Instalación - Finanzas OpenFriends

## Prerrequisitos

Antes de ejecutar la aplicación, necesitas instalar Node.js y npm.

### Opción 1: Instalación de Node.js (Recomendado)

1. **Descargar Node.js:**
   - Ve a https://nodejs.org/
   - Descarga la versión LTS (recomendada)
   - Ejecuta el instalador y sigue las instrucciones

2. **Verificar instalación:**
   ```bash
   node --version
   npm --version
   ```

3. **Instalar dependencias del proyecto:**
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador:**
   - La aplicación se abrirá automáticamente en `http://localhost:3000`
   - Para mejor experiencia, usa las DevTools (F12) y activa la vista móvil

### Opción 2: Usar un CDN (Sin instalación)

Si no puedes instalar Node.js, puedes abrir el archivo `index-standalone.html` directamente en tu navegador. Esta versión usa CDNs para cargar React y las dependencias.

## 🚀 Pasos Rápidos

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar desarrollo
npm run dev

# 3. Abrir http://localhost:3000
```

## 📱 Configuración de Vista Móvil

Para ver la aplicación como se vería en un teléfono:

1. Abre las DevTools (F12 o Click derecho > Inspeccionar)
2. Click en el ícono de teléfono/tablet (o Ctrl+Shift+M)
3. Selecciona un dispositivo:
   - iPhone 12/13/14 (390x844)
   - iPhone SE (375x667)
   - Pixel 5 (393x851)
   - O configura viewport custom: 375-480px ancho

## 🎨 Características Implementadas

✅ **Pantalla 1 - Resumen OpenFriends**
- Gráfico circular interactivo con Recharts
- Balance de deudas y créditos
- Lista de grupos activos
- Botón flotante de OBI

✅ **Pantalla 2 - Chat OBI**
- Conversación con asistente AI
- Tarjetas interactivas
- Acciones rápidas
- Respuestas contextuales

✅ **Pantalla 3 - OpenSplit**
- Selección múltiple de transacciones
- Configuración de splits
- División equitativa/proporcional
- Confirmación y envío

✅ **Pantalla 4 - Detalle Apartado**
- Progreso visual del grupo
- Lista de participantes
- Sistema de votaciones
- Historial de movimientos

✅ **Pantalla 5 - Crédito Compartido**
- Simulador de crédito con slider
- Cálculo en tiempo real
- Sistema de firmas digitales
- Información detallada

✅ **Pantalla 6 - Historial**
- Lista completa de transacciones
- Filtros por tipo
- Búsqueda
- Estados visuales

✅ **Pantalla 7 - Crear Grupo**
- Formulario completo
- Selector de colores
- Agregar participantes
- Vista previa en tiempo real

## 🎯 Navegación

- **Menú inferior:** Navega entre secciones principales
- **Ícono "Amigos":** Acceso a Finanzas OpenFriends
- **Botón flotante OBI:** Chat asistente desde cualquier pantalla
- **Botones de retroceso:** Volver a pantalla anterior

## 🐛 Solución de Problemas

### Error: "npm no se reconoce"
- Necesitas instalar Node.js primero
- Descarga desde https://nodejs.org/

### Error: "Cannot find module"
- Ejecuta `npm install` primero
- Si persiste, elimina `node_modules` y ejecuta `npm install` nuevamente

### Puerto 3000 ocupado
- Vite te preguntará si quieres usar otro puerto
- O especifica uno: `npm run dev -- --port 3001`

### La app no se ve bien
- Asegúrate de estar usando la vista móvil (DevTools)
- Máximo ancho: 480px
- Mínimo ancho: 320px

## 📞 Soporte

Para cualquier problema o pregunta:
- Revisa el README.md para más información
- Verifica que todas las dependencias estén instaladas
- Asegúrate de usar una versión moderna de Node.js (v16+)

## 🎨 Personalización

Puedes personalizar colores en `src/index.css`:

```css
:root {
  --red-primary: #E60000;  /* Botones principales */
  --blue-obi: #0078FF;     /* Chat OBI */
  --aqua: #3DDC97;         /* Positivo */
  --pink: #E91E63;         /* Negativo */
}
```

## 🚀 Build para Producción

```bash
# Crear build optimizado
npm run build

# Preview del build
npm run preview
```

Los archivos se generan en la carpeta `dist/`.

---

**¿Listo para empezar? Ejecuta `npm install` y luego `npm run dev`!** 🎉

