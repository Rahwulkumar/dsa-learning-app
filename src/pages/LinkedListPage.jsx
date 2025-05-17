// src/pages/LinkedListPage.jsx
import { useState } from 'react';
import LinkedListVisualization from '../components/LinkedListVisualization/LinkedListVisualization';

function LinkedListPage() {
  const [events, setEvents] = useState([]);
  const [linkedListData, setLinkedListData] = useState([]);
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
    setLinkedListData(values);
    setEvents([
      { type: 'list_state', data: values },
      { type: 'step', action: 'create', values }
    ]);
    setCreateValues('');
  };

  const handleInsert = () => {
    const value = parseInt(insertValue);
    const index = parseInt(insertIndex);
    if (isNaN(value) || isNaN(index) || index < 0 || index > linkedListData.length) return;
    const newList = [...linkedListData];
    newList.splice(index, 0, value);
    setLinkedListData(newList);
    setEvents([
      { type: 'list_state', data: newList },
      { type: 'step', action: 'insert', index, value }
    ]);
    setInsertValue('');
    setInsertIndex('');
  };

  const handleDelete = () => {
    const index = parseInt(deleteIndex);
    if (isNaN(index) || index < 0 || index >= linkedListData.length) return;
    const newList = [...linkedListData];
    newList.splice(index, 1);
    setLinkedListData(newList);
    setEvents([
      { type: 'list_state', data: newList },
      { type: 'step', action: 'delete', index }
    ]);
    setDeleteIndex('');
  };

  const handleSearch = () => {
    const value = parseInt(searchValue);
    if (isNaN(value)) return;
    const index = linkedListData.indexOf(value);
    const newEvents = [
      { type: 'list_state', data: linkedListData },
      { type: 'highlight', action: 'search', index: index !== -1 ? index : null, value }
    ];
    setEvents(newEvents);
    setSearchValue('');
  };

  const handleUpdate = () => {
    const value = parseInt(updateValue);
    const index = parseInt(updateIndex);
    if (isNaN(value) || isNaN(index) || index < 0 || index >= linkedListData.length) return;
    const newList = [...linkedListData];
    newList[index] = value;
    setLinkedListData(newList);
    setEvents([
      { type: 'list_state', data: newList },
      { type: 'highlight', action: 'update', index, value }
    ]);
    setUpdateValue('');
    setUpdateIndex('');
  };

  return (
    <div className="container">
      <h2 className="text-center text-primary fw-bold mb-5">Linked List Operations</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h4 className="text-primary mb-3">Operations</h4>
            {/* Create */}
            <div className="mb-3">
              <h5>Create Linked List</h5>
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
            <p className="mt-3">Current Linked List: {JSON.stringify(linkedListData)}</p>
          </div>
        </div>
        <div className="col-md-8">
          <LinkedListVisualization events={events} />
        </div>
      </div>
    </div>
  );
}

export default LinkedListPage;