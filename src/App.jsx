// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home'; // New Home page
import Playground from './pages/Playground';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>DSA Learning App</h1>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/playground" className="nav-link">Playground</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;