import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
        const response = await axios.post('http://localhost:8000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

      setText(response.data.text);
    } catch (error) {
      console.error(error);
      alert('An error occurred during the upload.');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>

      {text && (
        <div>
          <h2>Extracted Text:</h2>
          <pre>{text}</pre>
        </div>
      )}
    </div>
  );
};

export default Upload;
