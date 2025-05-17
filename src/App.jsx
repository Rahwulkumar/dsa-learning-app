// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import Home from './pages/Home';
import ArrayPage from './pages/ArrayPage';
import LinkedListPage from './pages/LinkedListPage';
import StackPage from './pages/StackPage';
import QueuePage from './pages/QueuePage';
import SortingPage from './pages/SortingPage';
import SearchingPage from './pages/SearchingPage';
import Playground from './pages/Playground';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="text-center mb-5">
          <h1 className="display-4 text-primary fw-bold">DSA Learning App</h1>
          <nav className="d-flex justify-content-center gap-3">
            <Link to="/" className="btn btn-outline-info">Home</Link>
            <Link to="/playground" className="btn btn-outline-info">Playground</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/array" element={<ArrayPage />} />
          <Route path="/linked-list" element={<LinkedListPage />} />
          <Route path="/stack" element={<StackPage />} />
          <Route path="/queue" element={<QueuePage />} />
          <Route path="/sorting" element={<SortingPage />} />
          <Route path="/searching" element={<SearchingPage />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;