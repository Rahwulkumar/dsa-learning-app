// src/pages/SearchingPage.jsx
import { useState } from 'react';
import SearchingVisualization from '../components/SearchingVisualization/SearchingVisualization';

function SearchingPage() {
  const [events, setEvents] = useState([]);
  const [searchData, setSearchData] = useState([1, 2, 3, 4]);
  const [searchValue, setSearchValue] = useState('');

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
    setEvents(events);
    setSearchValue('');
  };

  return (
    <div className="container">
      <h2 className="text-center text-primary fw-bold mb-5">Searching Operations</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <p className="mb-3">Array to Search: {JSON.stringify(searchData)}</p>
            <div className="d-flex gap-2">
              <input
                type="number"
                className="form-control w-auto"
                placeholder="Value to Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleLinearSearch}>Run Linear Search</button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <SearchingVisualization events={events} />
        </div>
      </div>
    </div>
  );
}

export default SearchingPage;