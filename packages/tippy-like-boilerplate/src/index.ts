




import { div } from './utils/dom-libs';




export type HelloOptions = { name?: string };



export function hello(opts: HelloOptions = {}) {
  console.log(div());
  const name = opts.name ?? "World";
  return `Hello, ${name}!`;
}

// (opcional) helper que podría usar Popper si quisieras extender
export function noop() {}
