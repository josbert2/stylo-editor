
export { attachFloating } from './floating';
export type { FloatingOptions } from './floating';

export type HelloOptions = { name?: string };



export function hello(opts: HelloOptions = {}) {
  const name = opts.name ?? "World";
  return `Hello, ${name}!`;
}

// (opcional) helper que podría usar Popper si quisieras extender
export function noop() {}
