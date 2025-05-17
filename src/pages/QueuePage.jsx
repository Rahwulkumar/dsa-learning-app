// src/pages/QueuePage.jsx
import { useState } from 'react';
import QueueVisualization from '../components/QueueVisualization/QueueVisualization';

function QueuePage() {
  const [events, setEvents] = useState([]);
  const [queueData, setQueueData] = useState([]);
  const [enqueueValue, setEnqueueValue] = useState('');

  const handleEnqueue = () => {
    const value = parseInt(enqueueValue);
    if (isNaN(value)) return;
    const newQueue = [...queueData, value];
    setQueueData(newQueue);
    setEvents([
      { type: 'queue_state', data: newQueue },
      { type: 'step', action: 'enqueue', value }
    ]);
    setEnqueueValue('');
  };

  const handleDequeue = () => {
    if (queueData.length === 0) return;
    const newQueue = [...queueData];
    newQueue.shift();
    setQueueData(newQueue);
    setEvents([
      { type: 'queue_state', data: newQueue },
      { type: 'step', action: 'dequeue' }
    ]);
  };

  return (
    <div className="container">
      <h2 className="text-center text-primary fw-bold mb-5">Queue Operations</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <div className="mb-3">
              <div className="d-flex gap-2 mb-2">
                <input
                  type="number"
                  className="form-control w-auto"
                  placeholder="Value"
                  value={enqueueValue}
                  onChange={(e) => setEnqueueValue(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleEnqueue}>Enqueue</button>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={handleDequeue}>Dequeue</button>
              </div>
            </div>
            <p>Current Queue: {JSON.stringify(queueData)}</p>
          </div>
        </div>
        <div className="col-md-8">
          <QueueVisualization events={events} />
        </div>
      </div>
    </div>
  );
}

export default QueuePage;