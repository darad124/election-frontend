import { useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [detailedErrors, setDetailedErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError('');
    setMessage('');
    setUploadSuccess(false);
    setDetailedErrors([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const validExtensions = ['.csv', '.xlsx', '.xls'];
    const fileExtension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);

    if (!validExtensions.includes(`.${fileExtension}`)) {
      setError('Please upload a valid CSV or Excel file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);

      const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'; // Use environment variable
      const response = await axios.post(`${apiUrl}/api/upload/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 && response.data.success_count > 0) {
        setMessage(`File uploaded successfully. ${response.data.success_count} records updated.`);
        setUploadSuccess(true);
        setError('');
        setDetailedErrors(response.data.errors || []);
      } else {
        setError('File upload completed but no new records were added.');
        setDetailedErrors(response.data.errors || []);
      }
    } catch (error) {
      if (error.response) {
        setError('File upload failed. Please see the details below.');
        setDetailedErrors(error.response.data.errors || []);
      } else if (error.request) {
        setError('File upload failed. No response received from the server.');
      } else {
        setError('File upload failed. Unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-700 h-1/4">
        <h1 className="mb-4 text-2xl font-bold text-center">Upload Student Voter Data</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} className="w-full mb-4 text-gray-700 dark:text-gray-200" />
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded">
            Upload
          </button>
          {loading && (
            <div className="flex justify-center mt-4">
              <ThreeDots color="#00BFFF" height={80} width={80} />
            </div>
          )}
          {error && <p className="mt-2 text-red-600">{error}</p>}
          {message && <p className="mt-2 text-green-600">{message}</p>}
        </form>
        {uploadSuccess && (
          <div className="flex items-center justify-center mt-4">
            <svg
              className="w-16 h-16 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM10 16.59l-4.3-4.3 1.41-1.41L10 13.77l6.29-6.29 1.41 1.41L10 16.59z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        {detailedErrors.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Error Details:</h2>
            <ul className="mt-2 text-red-600">
              {detailedErrors.map((error, index) => (
                <li key={index}>Row {error.row}: {JSON.stringify(error.errors)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
