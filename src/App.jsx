import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';

function App() {
  return (
    <div className="min-h-screen text-gray-900 bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      <Router>
        <div className="container px-4 py-8 mx-auto">
          <nav className="flex items-center justify-between p-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div>
              <Link to="/" className="mr-4 hover:underline">
                Home
              </Link>
              <Link to="/upload" className="mr-4 hover:underline">
                Upload
              </Link>
            </div>
            <button
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="px-3 py-2 text-white bg-blue-600 rounded-lg focus:outline-none"
            >
              Toggle Dark Mode
            </button>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
