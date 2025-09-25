import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { StyloEditor } from './index';

const { createElement } = React;

// Función para inicializar en HTML vanilla
function initStyloEditor(element, props = {}) {
  const root = createRoot(element);
  root.render(createElement(StyloEditor, props));
  return root;
}

// Para uso en browser (UMD)
if (typeof window !== 'undefined') {
  window.StyloEditor = {
    init: initStyloEditor,
    Component: StyloEditor,
    React, // Exponer React también
  };
}

// Para ES modules
export { initStyloEditor as init, StyloEditor as Component };
export default { init: initStyloEditor, Component: StyloEditor };