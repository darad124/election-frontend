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
        const response = await axios.get('http://127.0.0.1:8000/api/students/', { params });
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
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
        Student Voters
      </h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          className="p-2 mx-2 text-gray-900 bg-white border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
        />
        <div className="p-2 mx-2 ">
          <label className="mr-2">
            <input
              type="radio"
              name="searchType"
              value="name"
              checked={searchType === 'name'}
              onChange={handleSearchTypeChange}
            />
            Name
          </label>
          <label className="mr-2">
            <input
              type="radio"
              name="searchType"
              value="faculty"
              checked={searchType === 'faculty'}
              onChange={handleSearchTypeChange}
            />
            Faculty
          </label>
          <label className="mr-2">
            <input
              type="radio"
              name="searchType"
              value="year_of_study"
              checked={searchType === 'year_of_study'}
              onChange={handleSearchTypeChange}
            />
            Year of Study
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="is_eligible"
              checked={searchType === 'is_eligible'}
              onChange={handleSearchTypeChange}
            />
            Eligible
          </label>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <thead className="text-white bg-blue-600 dark:bg-blue-900">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">First Name</th>
              <th className="px-4 py-3 text-left">Last Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Year of Study</th>
              <th className="px-4 py-3 text-left">Faculty</th>
              <th className="px-4 py-3 text-left">Eligible</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}>
                <td className="px-4 py-2 border-t dark:border-gray-700">{student.id}</td>
                <td className="px-4 py-2 border-t dark:border-gray-700">{student.first_name}</td>
                <td className="px-4 py-2 border-t dark:border-gray-700">{student.last_name}</td>
                <td className="px-4 py-2 border-t dark:border-gray-700">{student.email}</td>
                <td className="px-4 py-2 border-t dark:border-gray-700">{student.year_of_study}</td>
                <td className="px-4 py-2 border-t dark:border-gray-700">{student.faculty}</td>
                <td className="px-4 py-2 text-center border-t dark:border-gray-700">{student.is_eligible ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
