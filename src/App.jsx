import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './App.css'; // Import the CSS file for additional styles

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  return (
    <div className="w-full min-h-screen text-gray-900 bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      <Router>
        <div className="container w-full px-4 py-8 mx-auto">
          <nav className="flex items-center justify-between w-full p-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex">
              <Link to="/" className="mr-4 text-lg font-semibold text-gray-800 hover:underline dark:text-gray-100">
                Home
              </Link>
              <Link to="/upload" className="mr-4 text-lg font-semibold text-gray-800 hover:underline dark:text-gray-100">
                Upload
              </Link>
            </div>
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full focus:outline-none"
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
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
