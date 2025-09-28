
export type HelloOptions = { name?: string };

export function hello(opts: HelloOptions = {}) {
  const name = opts.name ?? 'World';
  return `Hello, ${name}!`;
}

export function noop() {}