// src/pages/Home.jsx
import { useState } from 'react';
import DataStructureSelector from '../components/DataStructureSelector/DataStructureSelector';
import PrimaryVisualization from '../components/PrimaryVisualization/PrimaryVisualization';
import LinkedListVisualization from '../components/LinkedListVisualization/LinkedListVisualization';
import SortingVisualization from '../components/SortingVisualization/SortingVisualization';
import SearchingVisualization from '../components/SearchingVisualization/SearchingVisualization';
import './Home.css';

function Home() {
  const [events, setEvents] = useState([]);
  const [selectedStructure, setSelectedStructure] = useState('array');

  const handleOperation = (newEvents) => {
    setEvents(newEvents);
  };

  const handleStructureChange = (structure) => {
    setSelectedStructure(structure);
    setEvents([]);
  };

  return (
    <div className="home">
      <h2>Data Structure Visualizations</h2>
      <div className="home-container">
        <DataStructureSelector
          onOperation={handleOperation}
          onStructureChange={handleStructureChange}
        />
        <div className="visualization-area">
          {selectedStructure === 'array' && <PrimaryVisualization events={events} />}
          {selectedStructure === 'linked_list' && <LinkedListVisualization events={events} />}
          {selectedStructure === 'sorting' && <SortingVisualization events={events} />}
          {selectedStructure === 'searching' && <SearchingVisualization events={events} />}
        </div>
      </div>
    </div>
  );
}

export default Home;