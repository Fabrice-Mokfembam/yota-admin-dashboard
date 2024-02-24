import React, { useState } from "react";
import FileBase64 from 'react-file-base64';

function ImageUploader() {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (files) => {
  
    const newImages = [...selectedImages, ...files.map(item => item.base64)];
    setSelectedImages(newImages);
  };

  return (
    <div>
      <FileBase64
        type='file'
        multiple={true}
        onDone={handleImageChange}
      />

      {
        selectedImages.map((item, index) => (
          <img key={index} src={item} alt={`Image ${index + 1}`} />
        ))
      }
    </div>
  );
}

export default ImageUploader;
