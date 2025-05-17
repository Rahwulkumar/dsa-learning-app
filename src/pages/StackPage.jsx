// src/pages/StackPage.jsx
import { useState } from 'react';
import StackVisualization from '../components/StackVisualization/StackVisualization';

function StackPage() {
  const [events, setEvents] = useState([]);
  const [stackData, setStackData] = useState([]);
  const [pushValue, setPushValue] = useState('');

  const handlePush = () => {
    const value = parseInt(pushValue);
    if (isNaN(value)) return;
    const newStack = [...stackData, value];
    setStackData(newStack);
    setEvents([
      { type: 'stack_state', data: newStack },
      { type: 'step', action: 'push', value }
    ]);
    setPushValue('');
  };

  const handlePop = () => {
    if (stackData.length === 0) return;
    const newStack = [...stackData];
    newStack.pop();
    setStackData(newStack);
    setEvents([
      { type: 'stack_state', data: newStack },
      { type: 'step', action: 'pop' }
    ]);
  };

  return (
    <div className="container">
      <h2 className="text-center text-primary fw-bold mb-5">Stack Operations</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <div className="mb-3">
              <div className="d-flex gap-2 mb-2">
                <input
                  type="number"
                  className="form-control w-auto"
                  placeholder="Value"
                  value={pushValue}
                  onChange={(e) => setPushValue(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handlePush}>Push</button>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={handlePop}>Pop</button>
              </div>
            </div>
            <p>Current Stack: {JSON.stringify(stackData)}</p>
          </div>
        </div>
        <div className="col-md-8">
          <StackVisualization events={events} />
        </div>
      </div>
    </div>
  );
}

export default StackPage;