// src/pages/Home.jsx
import { Link } from 'react-router-dom';

function Home() {
  const categories = [
    { name: 'Array', path: '/array' },
    { name: 'Linked List', path: '/linked-list' },
    { name: 'Stack', path: '/stack' },
    { name: 'Queue', path: '/queue' },
    { name: 'Sorting', path: '/sorting' },
    { name: 'Searching', path: '/searching' },
  ];

  return (
    <div className="container">
      <h2 className="text-center text-primary fw-bold mb-5">Data Structure Visualizations</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {categories.map((category) => (
          <div className="col" key={category.name}>
            <Link to={category.path} className="text-decoration-none">
              <div className="card h-100 shadow-sm text-center">
                <div className="card-body">
                  <h3 className="card-title text-primary">{category.name}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;