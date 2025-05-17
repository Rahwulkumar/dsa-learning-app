// src/pages/ArrayPage.jsx
import { useState } from 'react';
import PrimaryVisualization from '../components/PrimaryVisualization/PrimaryVisualization';

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

  const handleCreate = () => {
    const values = createValues.split(',').map(val => parseInt(val.trim())).filter(val => !isNaN(val));
    if (values.length === 0) return;
    setArrayData(values);
    setEvents([
      { type: 'array_state', data: values },
      { type: 'step', action: 'create', values }
    ]);
    setCreateValues('');
  };

  const handleInsert = () => {
    const value = parseInt(insertValue);
    const index = parseInt(insertIndex);
    if (isNaN(value) || isNaN(index) || index < 0 || index > arrayData.length) return;
    const newArray = [...arrayData];
    newArray.splice(index, 0, value);
    setArrayData(newArray);
    setEvents([
      { type: 'array_state', data: newArray },
      { type: 'step', action: 'insert', index, value }
    ]);
    setInsertValue('');
    setInsertIndex('');
  };

  const handleDelete = () => {
    const index = parseInt(deleteIndex);
    if (isNaN(index) || index < 0 || index >= arrayData.length) return;
    const newArray = [...arrayData];
    newArray.splice(index, 1);
    setArrayData(newArray);
    setEvents([
      { type: 'array_state', data: newArray },
      { type: 'step', action: 'delete', index }
    ]);
    setDeleteIndex('');
  };

  const handleSearch = () => {
    const value = parseInt(searchValue);
    if (isNaN(value)) return;
    const index = arrayData.indexOf(value);
    const newEvents = [
      { type: 'array_state', data: arrayData },
      { type: 'highlight', action: 'search', index: index !== -1 ? index : null, value }
    ];
    setEvents(newEvents);
    setSearchValue('');
  };

  const handleUpdate = () => {
    const value = parseInt(updateValue);
    const index = parseInt(updateIndex);
    if (isNaN(value) || isNaN(index) || index < 0 || index >= arrayData.length) return;
    const newArray = [...arrayData];
    newArray[index] = value;
    setArrayData(newArray);
    setEvents([
      { type: 'array_state', data: newArray },
      { type: 'highlight', action: 'update', index, value }
    ]);
    setUpdateValue('');
    setUpdateIndex('');
  };

  return (
    <div className="container">
      <h2 className="text-center text-primary fw-bold mb-5">Array Operations</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h4 className="text-primary mb-3">Operations</h4>
            {/* Create */}
            <div className="mb-3">
              <h5>Create Array</h5>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Values (e.g., 1,2,3)"
                  value={createValues}
                  onChange={(e) => setCreateValues(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleCreate}>Create</button>
              </div>
            </div>
            {/* Insert */}
            <div className="mb-3">
              <h5>Insert</h5>
              <div className="d-flex gap-2">
                <input
                  type="number"
                  className="form-control w-auto"
                  placeholder="Value"
                  value={insertValue}
                  onChange={(e) => setInsertValue(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control w-auto"
                  placeholder="Index"
                  value={insertIndex}
                  onChange={(e) => setInsertIndex(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleInsert}>Insert</button>
              </div>
            </div>
            {/* Delete */}
            <div className="mb-3">
              <h5>Delete</h5>
              <div className="d-flex gap-2">
                <input
                  type="number"
                  className="form-control w-auto"
                  placeholder="Index"
                  value={deleteIndex}
                  onChange={(e) => setDeleteIndex(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleDelete}>Delete</button>
              </div>
            </div>
            {/* Search */}
            <div className="mb-3">
              <h5>Search</h5>
              <div className="d-flex gap-2">
                <input
                  type="number"
                  className="form-control w-auto"
                  placeholder="Value"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
              </div>
            </div>
            {/* Update */}
            <div className="mb-3">
              <h5>Update</h5>
              <div className="d-flex gap-2">
                <input
                  type="number"
                  className="form-control w-auto"
                  placeholder="Value"
                  value={updateValue}
                  onChange={(e) => setUpdateValue(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control w-auto"
                  placeholder="Index"
                  value={updateIndex}
                  onChange={(e) => setUpdateIndex(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
              </div>
            </div>
            <p className="mt-3">Current Array: {JSON.stringify(arrayData)}</p>
          </div>
        </div>
        <div className="col-md-8">
          <PrimaryVisualization events={events} />
        </div>
      </div>
    </div>
  );
}

export default ArrayPage;