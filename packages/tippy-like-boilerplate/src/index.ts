// Funciones básicas (compatibilidad hacia atrás)
export type HelloOptions = { name?: string };

export function hello(opts: HelloOptions = {}) {
  const name = opts.name ?? "World";
  return `Hello, ${name}!`;
}

// (opcional) helper que podría usar Popper si quisieras extender
export function noop() {}

// Exportaciones de React
export { Tooltip } from './components/Tooltip';
export type { TooltipProps } from './components/Tooltip';
export { useTooltip } from './hooks/useTooltip';
export type { UseTooltipOptions, UseTooltipReturn } from './hooks/useTooltip';

// Re-exportar tipos útiles de floating-ui
export type { Placement, Strategy } from '@floating-ui/dom';