# 🎯 Tippy-like Boilerplate

Boilerplate estilo Tippy.js con Rollup: ESM/CJS/UMD, CSS separado y variante headless. Disponible como npm package y CDN con soporte completo para React.

## 📦 Instalación

### NPM
```bash
npm install tippy-like-boilerplate
```

### CDN
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tippy-like-boilerplate@1.0.0/dist/tippy.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/tippy-like-boilerplate@1.0.0/dist/tippy-bundle.umd.min.js"></script>
```

## 🚀 Uso

### ES6 Modules / TypeScript
```typescript
import { hello, Tooltip, useTooltip } from 'tippy-like-boilerplate';
import 'tippy-like-boilerplate/dist/tippy.css';

// Función básica
console.log(hello({ name: 'React' })); // "Hello, React!"

// React Component
function App() {
  return (
    <Tooltip content="¡Hola mundo!" placement="top">
      <button>Hover me</button>
    </Tooltip>
  );
}
```

### CommonJS
```javascript
const { hello, Tooltip, useTooltip } = require('tippy-like-boilerplate');
require('tippy-like-boilerplate/dist/tippy.css');

console.log(hello({ name: 'Node.js' }));
```

### CDN (UMD Global)
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tippy-like-boilerplate@1.0.0/dist/tippy.css">
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
</head>
<body>
    <div id="root"></div>
    
    <script src="https://cdn.jsdelivr.net/npm/tippy-like-boilerplate@1.0.0/dist/tippy-bundle.umd.min.js"></script>
    <script>
        // Función básica
        console.log(window.tippy.hello({ name: 'CDN' }));
        
        // React components disponibles en window.tippy
        const { Tooltip, useTooltip } = window.tippy;
    </script>
</body>
</html>
```

## ⚛️ React Components

### Tooltip Component

```tsx
import { Tooltip } from 'tippy-like-boilerplate';

function MyComponent() {
  return (
    <div>
      {/* Tooltip básico */}
      <Tooltip content="¡Hola mundo!">
        <button>Hover me</button>
      </Tooltip>
      
      {/* Con diferentes opciones */}
      <Tooltip 
        content="Tooltip personalizado"
        placement="bottom"
        trigger="click"
        delay={300}
        className="custom-theme"
      >
        <span>Click me</span>
      </Tooltip>
    </div>
  );
}
```

#### Props del Tooltip

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `content` | `string` | - | Contenido del tooltip |
| `children` | `React.ReactElement` | - | Elemento que activa el tooltip |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Posición del tooltip |
| `trigger` | `'hover' \| 'click'` | `'hover'` | Evento que activa el tooltip |
| `delay` | `number` | `0` | Delay en ms antes de mostrar |
| `className` | `string` | `''` | Clase CSS adicional |

### useTooltip Hook

```tsx
import { useTooltip } from 'tippy-like-boilerplate';

function MyComponent() {
  const tooltip = useTooltip({
    placement: 'top',
    trigger: 'hover',
    delay: 200
  });

  return (
    <div>
      <button ref={tooltip.triggerRef}>
        Hover me
      </button>
      
      {tooltip.isVisible && (
        <div
          ref={tooltip.tooltipRef}
          className="tippy-tooltip"
          style={{
            position: 'absolute',
            top: tooltip.position.y,
            left: tooltip.position.x,
            zIndex: 9999
          }}
        >
          <div className="tippy-content">
            ¡Tooltip con hook!
          </div>
          <div ref={tooltip.arrowRef} className="tippy-arrow" />
        </div>
      )}
    </div>
  );
}
```

#### useTooltip Options

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Posición del tooltip |
| `trigger` | `'hover' \| 'click' \| 'manual'` | `'hover'` | Evento que activa el tooltip |
| `delay` | `number` | `0` | Delay en ms antes de mostrar |
| `offset` | `number` | `8` | Distancia del elemento trigger |

#### useTooltip Return

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `isVisible` | `boolean` | Si el tooltip está visible |
| `show` | `() => void` | Función para mostrar el tooltip |
| `hide` | `() => void` | Función para ocultar el tooltip |
| `toggle` | `() => void` | Función para alternar visibilidad |
| `triggerRef` | `RefObject<HTMLElement>` | Ref para el elemento trigger |
| `tooltipRef` | `RefObject<HTMLDivElement>` | Ref para el tooltip |
| `arrowRef` | `RefObject<HTMLDivElement>` | Ref para la flecha |
| `position` | `{x: number, y: number}` | Posición calculada |

## 🎨 Temas CSS

El paquete incluye varios temas predefinidos:

```css
/* Tema por defecto (oscuro) */
.tippy-tooltip { }

/* Tema claro */
.tippy-tooltip.light { }

/* Tema de error */
.tippy-tooltip.error { }

/* Tema de éxito */
.tippy-tooltip.success { }
```

### Personalización

```scss
// Personalizar variables
$tooltip-bg: #your-color;
$tooltip-color: #your-text-color;
$tooltip-border-radius: 8px;

// O crear tu propio tema
.tippy-tooltip.my-theme {
  .tippy-content {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    border-radius: 12px;
  }
}
```

## 📚 API Básica

### hello(options?)
```typescript
type HelloOptions = { name?: string };
function hello(opts?: HelloOptions): string;

// Ejemplos
hello(); // "Hello, World!"
hello({ name: 'React' }); // "Hello, React!"
```

### noop()
```typescript
function noop(): void;
```

## 📁 Formatos Disponibles

| Formato | Archivo | Descripción |
|---------|---------|-------------|
| **ESM** | `dist/tippy.esm.js` | ES Modules |
| **CJS** | `dist/tippy.cjs.js` | CommonJS |
| **UMD** | `dist/tippy.umd.js` | UMD sin CSS |
| **UMD Bundle** | `dist/tippy-bundle.umd.js` | UMD con CSS incluido |
| **UMD Bundle Min** | `dist/tippy-bundle.umd.min.js` | UMD minificado |
| **Headless ESM** | `headless/dist/tippy-headless.esm.js` | Sin estilos |
| **Headless CJS** | `headless/dist/tippy-headless.cjs.js` | Sin estilos |
| **CSS** | `dist/tippy.css` | Estilos separados |

## 🌐 CDN Links

### jsDelivr
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tippy-like-boilerplate@1.0.0/dist/tippy.css">

<!-- JS Bundle (recomendado) -->
<script src="https://cdn.jsdelivr.net/npm/tippy-like-boilerplate@1.0.0/dist/tippy-bundle.umd.min.js"></script>

<!-- JS sin CSS -->
<script src="https://cdn.jsdelivr.net/npm/tippy-like-boilerplate@1.0.0/dist/tippy.umd.min.js"></script>
```

### unpkg
```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/tippy-like-boilerplate@1.0.0/dist/tippy.css">

<!-- JS Bundle -->
<script src="https://unpkg.com/tippy-like-boilerplate@1.0.0/dist/tippy-bundle.umd.min.js"></script>
```

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo con watch
npm run dev

# Build de producción
npm run build

# Build solo tipos TypeScript
npm run build:types

# Test del bundle
npm run test:bundle
```

## 📋 Dependencias

### Runtime
- `@floating-ui/dom` - Posicionamiento de tooltips
- `@popperjs/core` - Peer dependency alternativa

### Peer Dependencies (React)
- `react` >= 16.8.0
- `react-dom` >= 16.8.0

## 📄 Licencia

MIT © [Tu Nombre](https://github.com/tu-usuario)

---

**¿Necesitas ayuda?** Abre un [issue](https://github.com/tu-usuario/tippy-like-boilerplate/issues) o revisa la [documentación completa](https://github.com/tu-usuario/tippy-like-boilerplate#readme).