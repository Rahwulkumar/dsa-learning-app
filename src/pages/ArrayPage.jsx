import { useState } from 'react';
import PrimaryVisualization from '../components/PrimaryVisualization/PrimaryVisualization';
import TracePanel from '../components/TracePanel/TracePanel';
import traceData from '../data/traceData';
import './ArrayPage.css';

function ArrayPage() {
  const [events, setEvents] = useState([]);
  const [arrayData, setArrayData] = useState([]);
  const [createValues, setCreateValues] = useState('');
  const [insertValue, setInsertValue] = useState('');
  const [insertIndex, setInsertIndex] = useState('');
  const [deleteIndex, setDeleteIndex] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [updateValue, setUpdateValue] = useState('');
  const [updateIndex, setUpdateIndex] = useState('');
  const [createError, setCreateError] = useState('');
  const [insertError, setInsertError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [searchError, setSearchError] = useState('');
  const [updateError, setUpdateError] = useState('');

  const [isTraceModeEnabled, setIsTraceModeEnabled] = useState(false);
  const [isTracing, setIsTracing] = useState(false);
  const [currentOperation, setCurrentOperation] = useState(null);
  const [traceSteps, setTraceSteps] = useState([]);
  const [timeComplexity, setTimeComplexity] = useState('');
  const [currentTraceStep, setCurrentTraceStep] = useState(0);
  const [traceEvents, setTraceEvents] = useState([]);

  const handleCreate = () => {
    const values = createValues.split(',').map(val => parseInt(val.trim())).filter(val => !isNaN(val));
    if (values.length === 0) {
      setCreateError('Enter valid numbers (e.g., 1,2,3)');
      return;
    }

    if (isTraceModeEnabled) {
      setIsTracing(true);
      setCurrentOperation('create');
      const steps = traceData.create.steps(values);
      setTraceSteps(steps);
      setTimeComplexity(traceData.create.timeComplexity);
      setCurrentTraceStep(0);

      const traceEvents = [
        { type: 'no_op' },
        { type: 'no_op' },
        { type: 'array_state', data: values }
      ];
      setTraceEvents(traceEvents);
    } else {
      setArrayData(values);
      setEvents([
        { type: 'array_state', data: values },
        { type: 'step', action: 'create', values }
      ]);
    }

    setCreateValues('');
    setCreateError('');
  };

  const handleInsert = () => {
    const value = parseInt(insertValue);
    const index = parseInt(insertIndex);
    if (isNaN(value)) {
      setInsertError('Value must be a number');
      return;
    }
    if (isNaN(index) || index < 0 || index > arrayData.length) {
      setInsertError(`Index must be between 0 and ${arrayData.length}`);
      return;
    }

    if (isTraceModeEnabled) {
      setIsTracing(true);
      setCurrentOperation('insert');
      const steps = traceData.insert.steps(value, index, arrayData.length);
      setTraceSteps(steps);
      setTimeComplexity(traceData.insert.timeComplexity);
      setCurrentTraceStep(0);

      const traceEvents = [];
      traceEvents.push({ type: 'no_op' });
      const tempArray = [...arrayData, null];
      traceEvents.push({ type: 'array_state', data: tempArray });
      let currentArray = [...arrayData];
      for (let i = arrayData.length - 1; i >= index; i--) {
        currentArray[i + 1] = currentArray[i];
        traceEvents.push({ type: 'array_state', data: [...currentArray, currentArray[i]], highlight: i + 1 });
      }
      currentArray[index] = value;
      traceEvents.push({ type: 'array_state', data: currentArray, highlight: index });

      setTraceEvents(traceEvents);
    } else {
      const newArray = [...arrayData];
      newArray.splice(index, 0, value);
      setArrayData(newArray);
      setEvents([
        { type: 'array_state', data: newArray },
        { type: 'step', action: 'insert', index, value }
      ]);
    }

    setInsertValue('');
    setInsertIndex('');
    setInsertError('');
  };

  const handleDelete = () => {
    const index = parseInt(deleteIndex);
    if (isNaN(index) || index < 0 || index >= arrayData.length) {
      setDeleteError(`Index must be between 0 and ${arrayData.length - 1}`);
      return;
    }

    if (isTraceModeEnabled) {
      setIsTracing(true);
      setCurrentOperation('delete');
      const steps = traceData.delete.steps(index, arrayData.length);
      setTraceSteps(steps);
      setTimeComplexity(traceData.delete.timeComplexity);
      setCurrentTraceStep(0);

      const traceEvents = [];
      traceEvents.push({ type: 'no_op' });
      let currentArray = [...arrayData];
      for (let i = index; i < arrayData.length - 1; i++) {
        currentArray[i] = currentArray[i + 1];
        traceEvents.push({ type: 'array_state', data: [...currentArray], highlight: i });
      }
      currentArray.pop();
      traceEvents.push({ type: 'array_state', data: currentArray });

      setTraceEvents(traceEvents);
    } else {
      const newArray = [...arrayData];
      newArray.splice(index, 1);
      setArrayData(newArray);
      setEvents([
        { type: 'array_state', data: newArray },
        { type: 'step', action: 'delete', index }
      ]);
    }

    setDeleteIndex('');
    setDeleteError('');
  };

  const handleSearch = () => {
    const value = parseInt(searchValue);
    if (isNaN(value)) {
      setSearchError('Value must be a number');
      return;
    }
    const index = arrayData.indexOf(value);
    if (index === -1) {
      setSearchError(`Value ${value} not found in array`);
    } else {
      setSearchError('');
    }

    if (isTraceModeEnabled) {
      setIsTracing(true);
      setCurrentOperation('search');
      const steps = traceData.search.steps(value);
      setTraceSteps(steps);
      setTimeComplexity(traceData.search.timeComplexity);
      setCurrentTraceStep(0);

      const traceEvents = [
        { type: 'no_op' },
        { type: 'no_op' },
        { type: 'highlight', action: 'search', index: index !== -1 ? index : null, value }
      ];
      setTraceEvents(traceEvents);
    } else {
      const newEvents = [
        { type: 'array_state', data: arrayData },
        { type: 'highlight', action: 'search', index: index !== -1 ? index : null, value }
      ];
      setEvents(newEvents);
    }

    setSearchValue('');
  };

  const handleUpdate = () => {
    const value = parseInt(updateValue);
    const index = parseInt(updateIndex);
    if (isNaN(value)) {
      setUpdateError('Value must be a number');
      return;
    }
    if (isNaN(index) || index < 0 || index >= arrayData.length) {
      setUpdateError(`Index must be between 0 and ${arrayData.length - 1}`);
      return;
    }

    if (isTraceModeEnabled) {
      setIsTracing(true);
      setCurrentOperation('update');
      const steps = traceData.update.steps(value, index, arrayData.length);
      setTraceSteps(steps);
      setTimeComplexity(traceData.update.timeComplexity);
      setCurrentTraceStep(0);

      const traceEvents = [
        { type: 'no_op' },
        { type: 'array_state', data: [...arrayData], highlight: index }
      ];
      const newArray = [...arrayData];
      newArray[index] = value;
      traceEvents.push({ type: 'array_state', data: newArray, highlight: index });

      setTraceEvents(traceEvents);
    } else {
      const newArray = [...arrayData];
      newArray[index] = value;
      setArrayData(newArray);
      setEvents([
        { type: 'array_state', data: newArray },
        { type: 'highlight', action: 'update', index, value }
      ]);
    }

    setUpdateValue('');
    setUpdateIndex('');
    setUpdateError('');
  };

  const handleNextTraceStep = () => {
    if (currentTraceStep < traceSteps.length - 1) {
      setCurrentTraceStep(currentTraceStep + 1);
    }
  };

  const handlePreviousTraceStep = () => {
    if (currentTraceStep > 0) {
      setCurrentTraceStep(currentTraceStep - 1);
    }
  };

  const handleCompleteTrace = () => {
    const finalEvent = traceEvents[traceEvents.length - 1];
    if (finalEvent.type === 'array_state') {
      setArrayData(finalEvent.data);
      setEvents([
        { type: 'array_state', data: finalEvent.data },
        { type: 'step', action: currentOperation, ...finalEvent }
      ]);
    } else if (finalEvent.type === 'highlight') {
      setEvents([finalEvent]);
    }

    setIsTracing(false);
    setCurrentOperation(null);
    setTraceSteps([]);
    setTimeComplexity('');
    setCurrentTraceStep(0);
    setTraceEvents([]);
  };

  return (
    <div className="container">
      <h2 className="header fw-bold">Array Operations</h2>
      <div className="row g-4">
        {/* Operations Section */}
        <div className="col-md-4 operations-column">
          <div className="card shadow-sm p-3">
            <h4 className="text-primary mb-3">Operations</h4>
            {/* Tracing Toggle */}
            <div className="toggle-wrapper mb-3" onClick={() => setIsTraceModeEnabled(!isTraceModeEnabled)}>
              <div className={`toggle-icon ${isTraceModeEnabled ? 'enabled' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#F8FAFC" stroke="#666666" strokeWidth="1" />
                  <polygon
                    points="6,18 12,6 18,18"
                    fill={isTraceModeEnabled ? '#26A69A' : '#2D2D2D'}
                  />
                </svg>
              </div>
              <span className={`toggle-label ${isTraceModeEnabled ? 'enabled' : ''}`}>
                Enable Tracing Mode
              </span>
            </div>
            {arrayData.length === 0 && (
              <p className="text-warning mb-3">Array is empty—create an array first!</p>
            )}
            {/* Create */}
            <div className="mb-3">
              <h5>Create Array</h5>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Values (e.g., 1,2,3)"
                  value={createValues}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCreateValues(value);
                    const values = value.split(',').map(val => parseInt(val.trim())).filter(val => !isNaN(val));
                    if (value && values.length === 0) {
                      setCreateError('Enter valid numbers (e.g., 1,2,3)');
                    } else {
                      setCreateError('');
                    }
                  }}
                />
                <button className="btn btn-primary" onClick={handleCreate}>Create</button>
              </div>
              {createError && <span className="text-danger mt-1 d-block">{createError}</span>}
            </div>
            {/* Insert */}
            <div className="mb-3">
              <h5>Insert</h5>
              <div className="d-flex flex-column flex-md-row gap-2">
                <div className="d-flex flex-column w-100">
                  <input
                    type="number"
                    className="form-control w-100 mb-2"
                    placeholder="Value"
                    value={insertValue}
                    onChange={(e) => {
                      const value = e.target.value;
                      setInsertValue(value);
                      const parsedValue = parseInt(value);
                      const parsedIndex = parseInt(insertIndex);
                      if (value && isNaN(parsedValue)) {
                        setInsertError('Value must be a number');
                      } else if (insertIndex && (isNaN(parsedIndex) || parsedIndex < 0 || parsedIndex > arrayData.length)) {
                        setInsertError(`Index must be between 0 and ${arrayData.length}`);
                      } else {
                        setInsertError('');
                      }
                    }}
                  />
                  <input
                    type="number"
                    className="form-control w-100"
                    placeholder="Index"
                    value={insertIndex}
                    onChange={(e) => {
                      const value = e.target.value;
                      setInsertIndex(value);
                      const parsedIndex = parseInt(value);
                      const parsedValue = parseInt(insertValue);
                      if (value && (isNaN(parsedIndex) || parsedIndex < 0 || parsedIndex > arrayData.length)) {
                        setInsertError(`Index must be between 0 and ${arrayData.length}`);
                      } else if (insertValue && isNaN(parsedValue)) {
                        setInsertError('Value must be a number');
                      } else {
                        setInsertError('');
                      }
                    }}
                  />
                </div>
                <button className="btn btn-primary align-self-start" onClick={handleInsert} disabled={arrayData.length === 0}>Insert</button>
              </div>
              {insertError && <span className="text-danger mt-1 d-block">{insertError}</span>}
            </div>
            {/* Delete */}
            <div className="mb-3">
              <h5>Delete</h5>
              <div className="d-flex flex-column flex-md-row gap-2">
                <div className="d-flex flex-column w-100">
                  <input
                    type="number"
                    className="form-control w-100"
                    placeholder="Index"
                    value={deleteIndex}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDeleteIndex(value);
                      const parsedIndex = parseInt(value);
                      if (value && (isNaN(parsedIndex) || parsedIndex < 0 || parsedIndex >= arrayData.length)) {
                        setDeleteError(`Index must be between 0 and ${arrayData.length - 1}`);
                      } else {
                        setDeleteError('');
                      }
                    }}
                  />
                </div>
                <button className="btn btn-primary align-self-start" onClick={handleDelete} disabled={arrayData.length === 0}>Delete</button>
              </div>
              {deleteError && <span className="text-danger mt-1 d-block">{deleteError}</span>}
            </div>
            {/* Search */}
            <div className="mb-3">
              <h5>Search</h5>
              <div className="d-flex flex-column flex-md-row gap-2">
                <div className="d-flex flex-column w-100">
                  <input
                    type="number"
                    className="form-control w-100"
                    placeholder="Value"
                    value={searchValue}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearchValue(value);
                      const parsedValue = parseInt(value);
                      if (value && isNaN(parsedValue)) {
                        setSearchError('Value must be a number');
                      } else {
                        setSearchError('');
                      }
                    }}
                  />
                </div>
                <button className="btn btn-primary align-self-start" onClick={handleSearch} disabled={arrayData.length === 0}>Search</button>
              </div>
              {searchError && <span className="text-danger mt-1 d-block">{searchError}</span>}
            </div>
            {/* Update */}
            <div className="mb-3">
              <h5>Update</h5>
              <div className="d-flex flex-column flex-md-row gap-2">
                <div className="d-flex flex-column w-100">
                  <input
                    type="number"
                    className="form-control w-100 mb-2"
                    placeholder="Value"
                    value={updateValue}
                    onChange={(e) => {
                      const value = e.target.value;
                      setUpdateValue(value);
                      const parsedValue = parseInt(value);
                      const parsedIndex = parseInt(updateIndex);
                      if (value && isNaN(parsedValue)) {
                        setUpdateError('Value must be a number');
                      } else if (updateIndex && (isNaN(parsedIndex) || parsedIndex < 0 || parsedIndex >= arrayData.length)) {
                        setUpdateError(`Index must be between 0 and ${arrayData.length - 1}`);
                      } else {
                        setUpdateError('');
                      }
                    }}
                  />
                  <input
                    type="number"
                    className="form-control w-100"
                    placeholder="Index"
                    value={updateIndex}
                    onChange={(e) => {
                      const value = e.target.value;
                      setUpdateIndex(value);
                      const parsedIndex = parseInt(value);
                      const parsedValue = parseInt(updateValue);
                      if (value && (isNaN(parsedIndex) || parsedIndex < 0 || parsedIndex >= arrayData.length)) {
                        setUpdateError(`Index must be between 0 and ${arrayData.length - 1}`);
                      } else if (updateValue && isNaN(parsedValue)) {
                        setUpdateError('Value must be a number');
                      } else {
                        setUpdateError('');
                      }
                    }}
                  />
                </div>
                <button className="btn btn-primary align-self-start" onClick={handleUpdate} disabled={arrayData.length === 0}>Update</button>
              </div>
              {updateError && <span className="text-danger mt-1 d-block">{updateError}</span>}
            </div>
            <p className="mt-3">Current Array: {JSON.stringify(arrayData)}</p>
            {/* Removed TracePanel from here */}
          </div>
        </div>
        {/* Visualization and TracePanel */}
        <div className="col-md-8 visualization-column">
          {/* Array Visualization (fixed position) */}
          <PrimaryVisualization
            events={isTraceModeEnabled && isTracing ? [traceEvents[currentTraceStep]] : events}
          />
          {/* TracePanel below Visualization with fade animation */}
          {isTraceModeEnabled && isTracing && (
            <div className="trace-panel-wrapper fade-in">
              <TracePanel
                traceSteps={traceSteps}
                currentTraceStep={currentTraceStep}
                timeComplexity={timeComplexity}
                onNext={handleNextTraceStep}
                onPrevious={handlePreviousTraceStep}
                onComplete={handleCompleteTrace}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArrayPage;