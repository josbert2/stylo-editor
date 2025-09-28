import React from 'react';
import { createRoot } from 'react-dom/client';

// Si publicaste el wrapper como paquete interno, importa desde ahí.
// Si no, importa directo de tu código local (ajusta la ruta):
// import { Tooltip } from '../../src/react';
import { Tooltip } from '../../src/react/Tooltip'; // o '../../src/react'

function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Playground React</h1>
      <Tooltip content="Hola desde React" placement="top">
        <button>Hover aquí</button>
      </Tooltip>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
