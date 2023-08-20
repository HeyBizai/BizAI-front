import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const Dropzone = ({ className }) => {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [...previousFiles, ...acceptedFiles]);
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.csv, .xls, .xlsx',
    maxSize: 1024 * 1000,
    onDrop
  });

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
  
    if (!files?.length) return;
  
    const formData = new FormData();
    files.forEach(file => formData.append('file', file));
  
    try {
      const response = await axios.post('http://3.27.181.32/uploads', formData);
      console.log('Upload response:', response.data);
  
      // Open the vanilla JavaScript file after successful upload
      window.open('https://client-lake-three.vercel.app', '_self');
    } catch (error) {
      console.error('Upload error:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
      <div
        className={`bg-gray-100 border-4 border-white border-solid rounded-xl ${
          isDragActive ? 'bg-gray-200' : ''
        } p-8 w-4/5 h-96 mx-auto my-10 flex flex-col justify-center items-center`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p className="text-gray-500 text-lg">
          {isDragActive
            ? 'Drop the files here ...'
            : 'Drag & drop files here, or click to select files'}
        </p>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="mt-8">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded-md">
              <div className="text-gray-700">{file.name}</div>
              <button
                type="button"
                className="text-sm text-red-500 hover:text-red-700"
                onClick={() => removeFile(file.name)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* File names */}
      {files.length > 0 && (
        <section className="mt-8">
          <div className="flex gap-4">
            <h2 className="text-3xl font-semibold">Uploaded Files</h2>
            <button
              type="button"
              onClick={removeAll}
              className="mt-1 text-sm font-bold text-gray-600 border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-300 hover:text-white transition-colors"
            >
              Remove all files
            </button>
            <button
              type="submit"
              className="mt-1 text-sm font-bold text-white bg-purple-500 rounded-md px-3 py-1 hover:bg-purple-600 transition-colors"
            >
              Upload to Flask
            </button>
          </div>
        </section>
      )}
    </form>
  );
};

export default Dropzone;
