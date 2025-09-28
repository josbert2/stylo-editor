import { hello } from "../../src/index.ts";
import { attachFloating } from "../../src/floating";

import "../../src/styles.scss";

const app = document.getElementById("app");
const box = document.createElement("div");
box.className = "demo";
box.innerHTML = `
  <div class="demo__title">Boilerplate listo</div>
  <div>Result: ${hello({ name: "FunPark" })}</div>
`;
app.appendChild(box);