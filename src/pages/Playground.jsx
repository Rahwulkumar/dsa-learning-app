// src/pages/Playground.jsx
import { useState } from 'react';
import CodeEditor from '../components/CodeEditor/CodeEditor';
import './Playground.css';

function Playground() {
  const [events, setEvents] = useState([]);

  return (
    <div className="playground">
      <div className="playground-container">
        <CodeEditor onEventsChange={setEvents} />
        <div className="visualization-placeholder">
          <h3>Primary Visualization</h3>
          <p>Coming Soon (Events: {events.length})</p>
        </div>
        <div className="memory-placeholder">
          <h3>Memory Visualization</h3>
          <p>Coming Soon</p>
        </div>
        <div className="trace-placeholder">
          <h3>Trace Log</h3>
          <p>Coming Soon</p>
        </div>
      </div>
    </div>
  );
}

export default Playground;