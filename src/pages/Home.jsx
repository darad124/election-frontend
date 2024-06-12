import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('name');

  useEffect(() => {
    async function fetchStudents() {
      try {
        const params = {};

        if (searchQuery) {
          switch (searchType) {
            case 'name':
            case 'faculty':
              params['search'] = searchQuery;
              break;
            case 'year_of_study':
              const year = parseInt(searchQuery, 10);
              if (!isNaN(year)) {
                params['year_of_study'] = year;
              }
              break;
            case 'is_eligible':
              if (['y', 'ye', 'yes'].includes(searchQuery.toLowerCase())) {
                params['is_eligible'] = 'true';
              } else if (['n', 'no'].includes(searchQuery.toLowerCase())) {
                params['is_eligible'] = 'false';
              } else {
                params['is_eligible'] = null; // or 'none' if you prefer
              }
              break;
            default:
              break;
          }
        }

        console.log('Fetching students with params:', params); // Log params
        const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'; // Use environment variable
        const response = await axios.get(`${apiUrl}/api/students/`, { params }); // Updated API URL
        console.log('API Response:', response.data); // Log the response
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }

    fetchStudents();
  }, [searchQuery, searchType]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 sm:p-8">
      <h1 className="mb-4 text-2xl font-bold text-center text-gray-900 dark:text-gray-100 sm:mb-6 sm:text-3xl">
        Student Voters
      </h1>
      <div className="flex flex-col items-center mb-4 sm:flex-row sm:justify-center sm:mb-6 ">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 text-gray-900 bg-white border border-gray-300 rounded sm:mb-0 sm:mr-2 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 lg:w-1/2"
        />
        <div className="flex flex-col p-2 sm:flex-row sm:items-center sm:space-x-2">
          <label className="flex items-center mb-1 sm:mb-0">
            <input
              type="radio"
              name="searchType"
              value="name"
              checked={searchType === 'name'}
              onChange={handleSearchTypeChange}
              className="mr-1"
            />
            Name
          </label>
          <label className="flex items-center mb-1 sm:mb-0">
            <input
              type="radio"
              name="searchType"
              value="faculty"
              checked={searchType === 'faculty'}
              onChange={handleSearchTypeChange}
              className="mr-1"
            />
            Faculty
          </label>
          <label className="flex items-center mb-1 sm:mb-0">
            <input
              type="radio"
              name="searchType"
              value="year_of_study"
              checked={searchType === 'year_of_study'}
              onChange={handleSearchTypeChange}
              className="mr-1"
            />
            <span className="block md:hidden">Year of Study</span>
            <span className="hidden md:block">YOS</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="searchType"
              value="is_eligible"
              checked={searchType === 'is_eligible'}
              onChange={handleSearchTypeChange}
              className="mr-1"
            />
            Eligible
          </label>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md dark:bg-gray-800">
          <thead className="text-white bg-blue-600 dark:bg-blue-900">
            <tr>
              <th className="px-4 py-3 text-left align-middle">ID</th>
              <th className="px-4 py-3 text-left align-middle">First Name</th>
              <th className="px-4 py-3 text-left align-middle">Last Name</th>
              <th className="px-4 py-3 align-middle text-middle">Email</th>
              <th className="px-4 py-3 text-left align-middle">Year of Study</th>
              <th className="px-4 py-3 align-middle text-middle">Faculty</th>
              <th className="px-4 py-3 text-center align-middle">Eligible</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}>
                <td className="px-4 py-2 align-middle border-t dark:border-gray-700">{student.id}</td>
                <td className="px-4 py-2 align-middle border-t dark:border-gray-700">{student.first_name}</td>
                <td className="px-4 py-2 align-middle border-t dark:border-gray-700">{student.last_name}</td>
                <td className="px-4 py-2 align-middle border-t dark:border-gray-700">{student.email}</td>
                <td className="px-4 py-2 align-middle border-t dark:border-gray-700">{student.year_of_study}</td>
                <td className="px-4 py-2 align-middle border-t dark:border-gray-700">{student.faculty}</td>
                <td className="px-4 py-2 text-center align-middle border-t dark:border-gray-700">{student.is_eligible ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
