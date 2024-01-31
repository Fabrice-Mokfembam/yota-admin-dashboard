import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

import PageDetail from "../../../components/PageAlert/PageDetail";

const page = 'Add Products'

function AddProduct({ fetchData, setData }) {
  const [image, setImage] = useState(null);
  const [imagesArray, setImagesArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Wheel");
  const [selectedFitPosition, setSelectedFitPosition] = useState("");
  const [description, setDescription] = useState("");
  const [selectCarModel, setSelectModel] = useState("");
  const [CarBrand, setCarBrand] = useState("");
  const [MakeMaterial, setMakeMaterial] = useState("");
  const [fitment, setFitment] = useState("");
  const [Price, setPrice] = useState(0);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleFitPositionChange = (event) => {
    setSelectedFitPosition(event.target.value);
  };

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files;
    const arrImage = Array.from(uploadedImage).map(image => URL.createObjectURL(image));
    setImagesArray(arrImage);
    setImage(arrImage[0]);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleCarModelChange = (e) => {
    setSelectModel(e.target.value);
  };

  const handleCarBrand = (e) => {
    setCarBrand(e.target.value);
  };

  const handleMakeMaterial = (e) => {
    setMakeMaterial(e.target.value);
  };
  const handleFitment = (e) => {
    setFitment(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      const postData = {
        image,
        selectedCategory,
        selectedFitPosition,
        description,
        selectCarModel,
        CarBrand,
        MakeMaterial,
        fitment,
      };

      const response = await axios.post(
        "http://localhost:5000/api/blog",
        postData
      );
      console.log("product cretead", response.data);
    } catch (error) {
      console.log("error", error.response.data);
    }

    setImage("");
    setSelectedCategory("");
    selectedFitPosition("");
    setDescription("");
    setSelectModel("");
    setCarBrand("");
    setFitment("");
  };

  const retrieveProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/blog");
      setData(response.data);
      console.log("added latest product to database", response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="home-container">
      <PageDetail page={page} />
      <div className="main-add-product-conatainer">
       
        <div className="firstpart part">
          <div className="product-info">Product-Info</div>
          <div className="image-name">
            <div className="image-add-product">
              {image ? (
                <img src={image} alt="Uploaded Image" />
              ) : (
                <label htmlFor="uploadImage" className="loadimg">
                  <div>upload image</div>
                  <input
                    type="file"
                    id="uploadImage"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
            <div className="name">
              <label htmlFor="name">
                Name:
                <input type="text" placeholder="name" id="name" />
              </label>
            </div>
          </div>

          <div className="carbrand-and-details">
            <div className="category title">
              Category
              <div className="category-input ">
                <label htmlFor="Bumpers">
                  <input
                    type="radio"
                    id="Bumpers"
                    value="Bumpers"
                    checked={selectedCategory === "Bumpers"}
                    onChange={handleCategoryChange}
                  />
                  Bumpers
                </label>
                <label htmlFor="Hood">
                  <input
                    type="radio"
                    id="Hood"
                    value="Hood"
                    checked={selectedCategory === "Hood"}
                    onChange={handleCategoryChange}
                  />
                  Hood
                </label>
                <label htmlFor="Exhaust">
                  <input
                    type="radio"
                    id="Exhaust"
                    value="Exhaust"
                    checked={selectedCategory === "Exhaust"}
                    onChange={handleCategoryChange}
                  />
                  Exhaust
                </label>
                <label htmlFor="Wheel">
                  <input
                    type="radio"
                    id="Wheel"
                    value="Wheel"
                    checked={selectedCategory === "Wheel"}
                    onChange={handleCategoryChange}
                  />
                  Wheel
                </label>
                <label htmlFor="Fenders">
                  <input
                    type="radio"
                    id="Fenders"
                    value="Fenders"
                    checked={selectedCategory === "Fenders"}
                    onChange={handleCategoryChange}
                  />
                  Fenders
                </label>
              </div>
            </div>

            <div className="Model title">
              Model
              <div className="category-input Model ">
                <label >
                  <input
                    type="radio"
                    value="Corrola"
                    checked={selectCarModel === "Corrola"}
                    onChange={handleCarModelChange}
                  />
                  Corrola
                </label>
                <label >
                  <input
                    type="radio"
                    value="Camrry"
                    checked={ selectCarModel === "Camrry"}
                    onChange={handleCarModelChange}
                  />
                  Camrry
                </label>
              </div>
            </div>

            <div className="Carbrand title">
              Car Brand
              <div className="category-input Model ">
                <label >
                  <input
                    type="radio"
                    value="Toyota Corrola"
                    checked={CarBrand === "Toyota Corrola"}
                    onChange={handleCarBrand}
                  />
                   Toyota Corrola
                </label>
                <label >
                  <input
                    type="radio"
                    value="Toyota Camrry"
                    checked={ CarBrand === "Toyota Camrry"}
                    onChange={handleCarBrand}
                  />
                   Toyota Camrry
                </label>
              </div>
            </div>

            <div className="Carbrand title">
              Price($)
              <div className="number ">
                <label htmlFor="number">
                  <input type="number"  id="number" onChange={handlePriceChange}/>
                  </label>
              </div>
            </div>

            
          </div>
        </div>

        <div className="secondpart part">
              <div className="category title">
              FitPossition
              <div className="category-input ">
                <label >
                  <input
                    type="radio"
                    value="lighting"
                    checked={selectedFitPosition === "lighting"}
                    onChange={handleFitPositionChange}
                  />
                  Lighting
                </label>
                <label >
                  <input
                    type="radio"
                    value="exterior"
                    checked={selectedFitPosition === "exterior"}
                    onChange={handleFitPositionChange}
                  />
                  Exterior
                </label>
                <label>
                  <input
                    type="radio"
                    value="interior"
                    checked={selectedFitPosition === "interior"}
                    onChange={handleFitPositionChange}
                  />
                  Interior
                </label>
                <label>
                  <input
                    type="radio"
                    value="other"
                    checked={selectedFitPosition === "other"}
                    onChange={handleFitPositionChange}
                  />
                  Other
                </label>
              </div>
          </div>
          
          
            <div className="Carbrand title">
              Make Material
              <div className="category-input Model ">
                <label >
                  <input
                    type="radio"
                    value="carbon fibre"
                    checked={MakeMaterial === "carbon fibre"}
                    onChange={handleMakeMaterial}
                  />
                   Carbon Fibre
                </label>
                <label >
                  <input
                    type="radio"
                    value="Other"
                    checked={ MakeMaterial === "Other"}
                    onChange={handleMakeMaterial}
                  />
                   Other
                </label>
              </div>
          </div>
          
           <div className="Carbrand title ">
              Fitment
              <div className="number ">
                <label htmlFor="fitment">
                  <input type="text" id="fitment" placeholder="Enter Fitment" onChange={handleFitment} />
                  </label>
              </div>
          </div>
          
           <div className="Carbrand title">
              Description
              <div className="description">
                <label htmlFor="description">
                  <input type="textarea" id="description" onChange={handleDescription} placeholder="Product Description" />
                  </label>
              </div>
            </div>
          
          <div className="imagges">selected images
            <div className="selected-images"> 
            {
              imagesArray.map(image => {
                return (
                  <img src={image} alt="" />
                )
              })
            }
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
