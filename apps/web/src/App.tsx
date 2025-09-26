
import { Label, StyloApp } from 'stylo-editor';
import './App.css';
import 'stylo-editor/dist/styles.css';
import { sleep } from 'test-stylo-editor';
function App() {
  console.log(sleep)
  return (
    <div className="app">
      <div className="editor-container">
        <h1>Stylo Editor Demo</h1>
        <Label>
          Click me
        </Label>
        <StyloApp />
          
   
      </div>
    </div>
  );
}

export default App;