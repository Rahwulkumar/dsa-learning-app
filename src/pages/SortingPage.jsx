// src/pages/SortingPage.jsx
import { useState } from 'react';
import SortingVisualization from '../components/SortingVisualization/SortingVisualization';

function SortingPage() {
  const [events, setEvents] = useState([]);
  const [sortData, setSortData] = useState([3, 1, 4]);

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
    setEvents(events);
  };

  return (
    <div className="container">
      <h2 className="text-center text-primary fw-bold mb-5">Sorting Operations</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <p className="mb-3">Array to Sort: {JSON.stringify(sortData)}</p>
            <button className="btn btn-primary" onClick={handleBubbleSort}>Run Bubble Sort</button>
          </div>
        </div>
        <div className="col-md-8">
          <SortingVisualization events={events} />
        </div>
      </div>
    </div>
  );
}

export default SortingPage;