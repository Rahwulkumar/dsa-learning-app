// src/pages/Playground.jsx
import CodeEditor from '../components/CodeEditor/CodeEditor';
import './Playground.css';

function Playground() {
  return (
    <div className="playground">
      <h2>Playground</h2>
      <div className="playground-container">
        <CodeEditor />
      </div>
    </div>
  );
}

export default Playground;