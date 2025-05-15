// src/components/DataStructureSelector/DataStructureSelector.jsx
import { useState } from 'react';
import './DataStructureSelector.css';

function DataStructureSelector({ onOperation, onStructureChange }) {
  const [selectedStructure, setSelectedStructure] = useState('array');
  const [arrayData, setArrayData] = useState([]);
  const [linkedListData, setLinkedListData] = useState([]);
  const [sortData, setSortData] = useState([3, 1, 4]);
  const [searchData, setSearchData] = useState([1, 2, 3, 4]);
  const [arrayInsertValue, setArrayInsertValue] = useState('');
  const [arrayInsertIndex, setArrayInsertIndex] = useState('');
  const [arrayDeleteIndex, setArrayDeleteIndex] = useState('');
  const [linkedListAppendValue, setLinkedListAppendValue] = useState('');
  const [linkedListRemoveIndex, setLinkedListRemoveIndex] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleStructureChangeInternal = (structure) => {
    setSelectedStructure(structure);
    onStructureChange(structure);
  };

  const handleArrayInsert = () => {
    const value = parseInt(arrayInsertValue);
    const index = parseInt(arrayInsertIndex);
    if (isNaN(value) || isNaN(index)) return;
    const newArray = [...arrayData];
    newArray.splice(index, 0, value);
    setArrayData(newArray);
    onOperation([
      { type: 'array_state', data: newArray },
      { type: 'step', action: 'insert', index, value }
    ]);
    setArrayInsertValue('');
    setArrayInsertIndex('');
  };

  const handleArrayDelete = () => {
    const index = parseInt(arrayDeleteIndex);
    if (isNaN(index) || index < 0 || index >= arrayData.length) return;
    const newArray = [...arrayData];
    newArray.splice(index, 1);
    setArrayData(newArray);
    onOperation([
      { type: 'array_state', data: newArray },
      { type: 'step', action: 'delete', index }
    ]);
    setArrayDeleteIndex('');
  };

  const handleLinkedListAppend = () => {
    const value = parseInt(linkedListAppendValue);
    if (isNaN(value)) return;
    const newList = [...linkedListData, value];
    setLinkedListData(newList);
    onOperation([
      { type: 'list_state', data: newList },
      { type: 'step', action: 'append', value }
    ]);
    setLinkedListAppendValue('');
  };

  const handleLinkedListRemove = () => {
    const index = parseInt(linkedListRemoveIndex);
    if (isNaN(index) || index < 0 || index >= linkedListData.length) return;
    const newList = [...linkedListData];
    newList.splice(index, 1);
    setLinkedListData(newList);
    onOperation([
      { type: 'list_state', data: newList },
      { type: 'step', action: 'remove', index }
    ]);
    setLinkedListRemoveIndex('');
  };

  const handleBubbleSort = () => {
    let arr = [...sortData];
    const events = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          events.push({
            type: 'sort_step',
            data: [...arr],
            highlight: [j, j + 1]
          });
        }
      }
    }
    setSortData(arr);
    onOperation(events);
  };

  const handleLinearSearch = () => {
    const value = parseInt(searchValue);
    if (isNaN(value)) return;
    const events = [];
    for (let i = 0; i < searchData.length; i++) {
      events.push({
        type: 'search_step',
        data: [...searchData],
        currentIndex: i,
        found: searchData[i] === value
      });
      if (searchData[i] === value) break;
    }
    onOperation(events);
    setSearchValue('');
  };

  return (
    <div className="data-structure-selector">
      <h3>Select Data Structure/Algorithm</h3>
      <div className="selector-buttons">
        <button
          onClick={() => handleStructureChangeInternal('array')}
          style={{ backgroundColor: selectedStructure === 'array' ? '#6B48FF' : '#B0B0B0' }}
        >
          Array
        </button>
        <button
          onClick={() => handleStructureChangeInternal('linked_list')}
          style={{ backgroundColor: selectedStructure === 'linked_list' ? '#6B48FF' : '#B0B0B0' }}
        >
          Linked List
        </button>
        <button
          onClick={() => handleStructureChangeInternal('sorting')}
          style={{ backgroundColor: selectedStructure === 'sorting' ? '#6B48FF' : '#B0B0B0' }}
        >
          Sorting
        </button>
        <button
          onClick={() => handleStructureChangeInternal('searching')}
          style={{ backgroundColor: selectedStructure === 'searching' ? '#6B48FF' : '#B0B0B0' }}
        >
          Searching
        </button>
      </div>

      {selectedStructure === 'array' && (
        <div className="operation-controls">
          <h4>Array Operations</h4>
          <div className="operation">
            <input
              type="number"
              placeholder="Value"
              value={arrayInsertValue}
              onChange={(e) => setArrayInsertValue(e.target.value)}
            />
            <input
              type="number"
              placeholder="Index"
              value={arrayInsertIndex}
              onChange={(e) => setArrayInsertIndex(e.target.value)}
            />
            <button onClick={handleArrayInsert}>Insert</button>
          </div>
          <div className="operation">
            <input
              type="number"
              placeholder="Index"
              value={arrayDeleteIndex}
              onChange={(e) => setArrayDeleteIndex(e.target.value)}
            />
            <button onClick={handleArrayDelete}>Delete</button>
          </div>
          <p>Current Array: {JSON.stringify(arrayData)}</p>
        </div>
      )}

      {selectedStructure === 'linked_list' && (
        <div className="operation-controls">
          <h4>Linked List Operations</h4>
          <div className="operation">
            <input
              type="number"
              placeholder="Value"
              value={linkedListAppendValue}
              onChange={(e) => setLinkedListAppendValue(e.target.value)}
            />
            <button onClick={handleLinkedListAppend}>Append</button>
          </div>
          <div className="operation">
            <input
              type="number"
              placeholder="Index"
              value={linkedListRemoveIndex}
              onChange={(e) => setLinkedListRemoveIndex(e.target.value)}
            />
            <button onClick={handleLinkedListRemove}>Remove</button>
          </div>
          <p>Current Linked List: {JSON.stringify(linkedListData)}</p>
        </div>
      )}

      {selectedStructure === 'sorting' && (
        <div className="operation-controls">
          <h4>Sorting (Bubble Sort)</h4>
          <p>Array to Sort: {JSON.stringify(sortData)}</p>
          <button onClick={handleBubbleSort}>Run Bubble Sort</button>
        </div>
      )}

      {selectedStructure === 'searching' && (
        <div className="operation-controls">
          <h4>Searching (Linear Search)</h4>
          <p>Array to Search: {JSON.stringify(searchData)}</p>
          <div className="operation">
            <input
              type="number"
              placeholder="Value to Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={handleLinearSearch}>Run Linear Search</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataStructureSelector;