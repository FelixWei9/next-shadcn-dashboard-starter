// src/FileUpload.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // upload to server
    console.log(acceptedFiles);
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: acceptedFiles[0],
    });
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="mx-auto py-8">
      <div
        {...getRootProps({
          className: 'border-dashed border-2 border-gray-400 py-4 rounded-md',
        })}
      >
        <input {...getInputProps()} />
        <p className="text-center">Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside className="mt-0 invisible">
        <h4 className="text-lg font-semibold">Files</h4>
        <ul>
          {files.map((file, index) => (
            <li key={index} className="mt-2">
              {file.name} - {file.size} bytes
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default FileUpload;
