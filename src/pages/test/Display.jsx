import React, { useState } from "react";

function ImageUploader() {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files).map((file) => URL.createObjectURL(file));
    setSelectedImages(imagesArray);
  };

  return (
   <div>
   <  input type="file" multiple onChange={handleImageChange} />
      {selectedImages.map((image, index) => (
      < img key={index} src={image} alt={`Image ${index}`} />
      ))}
    </div>
  );
}

export default ImageUploader;