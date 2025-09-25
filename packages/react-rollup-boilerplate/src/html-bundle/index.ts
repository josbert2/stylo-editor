import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '../components/Button';
import { Tabs, TabsList, Tab, TabPanel } from '../components/Tabs';

// Importar estilos
import '../components/Button/Button.scss';
import '../components/Tabs/Tabs.scss';

// Interfaz global para el objeto ReactComponents
declare global {
  interface Window {
    ReactComponents: {
      Button: typeof Button;
      Tabs: typeof Tabs;
      TabsList: typeof TabsList;
      Tab: typeof Tab;
      TabPanel: typeof TabPanel;
      render: typeof renderComponent;
      React: typeof React;
    };
  }
}

// Función helper para renderizar componentes
function renderComponent(component: React.ReactElement, containerId: string) {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(component);
  } else {
    console.error(`Container with id "${containerId}" not found`);
  }
}

// Función helper para crear elementos React
function createElement(type: any, props: any = {}, ...children: any[]) {
  return React.createElement(type, props, ...children);
}

// Exponer componentes y utilidades globalmente
window.ReactComponents = {
  Button,
  Tabs,
  TabsList,
  Tab,
  TabPanel,
  render: renderComponent,
  React: {
    ...React,
    createElement,
  },
};

// También exportar para uso con módulos
export {
  Button,
  Tabs,
  TabsList,
  Tab,
  TabPanel,
  renderComponent as render,
  React,
};