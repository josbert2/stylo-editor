import { StyloEditor } from "../../src/index.ts";
import "../../src/styles.scss";



StyloEditor.init({
  container: document.body,
  panelOptions: {
    minimized: false,
    position: { x: 20, y: 20 }
  },
  excludeSelectors: ['.controls', '.controls *']
});