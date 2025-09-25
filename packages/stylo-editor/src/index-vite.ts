import React from "react";
import ReactDOM from "react-dom/client";

// Export components
export { StyloApp } from "./components/StyloApp/StyloAppw";

// Export hooks
export * from "./hooks";

// Export utilities
export * from "./utils";

type InitOptions = {
  target: string | HTMLElement;
  theme?: string;
};

function init({ target, theme }: InitOptions) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) throw new Error("Target no encontrado");

  const root = ReactDOM.createRoot(el);
  root.render(React.createElement(StyloApp, { theme }));
}

export default { init };
