// src/pages/Playground.jsx
import { useState } from 'react';
import CodeEditor from '../components/CodeEditor/CodeEditor';
import PrimaryVisualization from '../components/PrimaryVisualization/PrimaryVisualization';
import './Playground.css';

function Playground() {
  const [events, setEvents] = useState([]);

  return (
    <div className="playground">
      <div className="playground-container">
        <CodeEditor onEventsChange={setEvents} />
        <PrimaryVisualization events={events} />
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