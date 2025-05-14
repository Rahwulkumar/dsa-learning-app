import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Playground from './pages/Playground';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>DSA Learning App</h1>
        </header>
        <Routes>
          <Route path="/" element={<Playground />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;