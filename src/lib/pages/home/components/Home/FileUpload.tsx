'use client';

// import React, { useState } from 'react';

const FileUpload: React.FC<{ onFileUpload: (file: File) => void }> = ({
  onFileUpload,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onFileUpload(file); // Passa o arquivo para a função de callback
    }
  };

  return (
    <div>
      <input type="file" accept=".tif" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
