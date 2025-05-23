import React from 'react';
import './TracePanel.css';

function TracePanel({ traceSteps, currentTraceStep, timeComplexity, onNext, onPrevious, onComplete }) {
  return (
    <div className="trace-panel">
      <h4 className="trace-title">Tracing Steps</h4>
      <ol className="trace-steps">
        {traceSteps.map((step, index) => (
          <li
            key={index}
            className={`trace-step ${index === currentTraceStep ? 'active' : ''}`}
          >
            {step}
          </li>
        ))}
      </ol>
      <p className="time-complexity">Time Complexity: {timeComplexity}</p>
      <div className="trace-controls">
        <button
          className="btn btn-secondary"
          onClick={onPrevious}
          disabled={currentTraceStep === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          onClick={onNext}
          disabled={currentTraceStep === traceSteps.length - 1}
        >
          Next
        </button>
        <button className="btn btn-primary" onClick={onComplete}>
          Complete
        </button>
      </div>
    </div>
  );
}

export default TracePanel;