import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

import PageDetail from "../../../components/PageAlert/PageDetail";

function AddProduct( { fetchData,setData}) {
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Wheel");
  const [selectedFitPosition, setSelectedFitPosition] = useState("");
  const [description, setDescription] = useState("");
  const [selectCarModel, setSelectModel] = useState("");
  const [CarBrand, setCarBrand] = useState("");
  const [MakeMaterial, setMakeMaterial] = useState("");
  const [fitment, setFitment] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleFitPositionChange = (event) => {
    setSelectedFitPosition(event.target.value);
  };

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    setImage(URL.createObjectURL(uploadedImage));
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
      console.log('added latest product to database',response.data);
      
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="home-container">
      <PageDetail />
      <div
        className="title-page add-products"
        onClick={() => {
          handleSubmit();
          setTimeout(retrieveProducts, 1000);
          // fetchData();
        }}
      >
        Add Product
      </div>
      <div className="add-box-container">
        <div className="add-box addbox1">
          {image ? (
            <img src={image} alt="Uploaded Image" />
          ) : (
            <label htmlFor="uploadImage" className="loadimg">
              <div>upload image</div>
              <input
                type="file"
                id="uploadImage"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>

        <div className="add-box addbox2">
          <div className="title-addbox2">Category</div>
          <div className="radio-inputs">
            <label htmlFor="wheel">
              <input
                type="radio"
                id="wheel"
                value="Wheel"
                checked={selectedCategory === "Wheel"}
                onChange={handleCategoryChange}
              />
              Wheel
            </label>
            <label htmlFor="exhaust">
              <input
                type="radio"
                id="exhaust"
                value="exhaust"
                checked={selectedCategory === "exhaust"}
                onChange={handleCategoryChange}
              />
              Exhaust
            </label>
            <label htmlFor="bumpers">
              <input
                type="radio"
                id="bumpers"
                value="bumpers"
                checked={selectedCategory === "bumpers"}
                onChange={handleCategoryChange}
              />
              Bumpers
            </label>
            <label htmlFor="fenders">
              <input
                type="radio"
                id="fenders"
                value="Fenders"
                checked={selectedCategory === "Fenders"}
                onChange={handleCategoryChange}
              />
              Fenders
            </label>
            <label htmlFor="hood">
              <input
                type="radio"
                id="hood"
                value="Hood"
                checked={selectedCategory === "Hood"}
                onChange={handleCategoryChange}
              />
              Hood
            </label>
          </div>
        </div>

        <div className="add-box addbox3">
          <div className="title-addbox2">Name:</div>
          <input type="text" id="input-add-product" />
        </div>

        <div className="add-box addbox4">
          <div className="title-addbox2">Fit Position</div>
          <div className="radio-inputs">
            <label htmlFor="lighting">
              <input
                type="checkbox"
                id="lighting"
                value="lighting"
                checked={selectedFitPosition === "lighting"}
                onChange={handleFitPositionChange}
              />
              Lighting
            </label>
            <label htmlFor="exterior">
              <input
                type="checkbox"
                id="exterior"
                value="exterior"
                checked={selectedFitPosition === "exterior"}
                onChange={handleFitPositionChange}
              />
              Exterior
            </label>
            <label htmlFor="interior">
              <input
                type="checkbox"
                id="interior"
                value="interior"
                checked={selectedFitPosition === "interior"}
                onChange={handleFitPositionChange}
              />
              Interior
            </label>
            <label htmlFor="other">
              <input
                type="checkbox"
                id="other"
                value="other"
                checked={selectedFitPosition === "other"}
                onChange={handleFitPositionChange}
              />
              Other
            </label>
          </div>
        </div>

        <div className="add-box addbox5">
          <div className="title-addbox2">Car Model</div>
          <div>
            <label htmlFor="model-1">
              <input
                type="radio"
                value={"Corolla"}
                checked={selectCarModel === "Corolla"}
                onChange={handleCarModelChange}
              />
              Corrola
            </label>
          </div>
          <div>
            <label htmlFor="model-2">
              <input
                type="radio"
                value={"Camrry"}
                checked={selectCarModel === "Camrry"}
                onChange={handleCarModelChange}
              />
              Camrry
            </label>
          </div>
        </div>
        <div className="add-box addbox6">
          <div className="title-addbox2">Car Brand</div>
          <div>
            <label htmlFor="model-1">
              <input
                type="radio"
                value={"Toyota Corolla"}
                checked={CarBrand === "Toyota Corolla"}
                onChange={handleCarBrand}
              />
              Toyota Corrola
            </label>
          </div>
          <div>
            <label htmlFor="model-2">
              <input
                type="radio"
                value={"Camrry"}
                checked={CarBrand === "Camrry"}
                onChange={handleCarBrand}
              />
              Toyota Camrry
            </label>
          </div>
        </div>
        <div className="add-box addbox7">
          <div className="title-addbox2">Make Material</div>
          <div>
            <label htmlFor="model-1">
              <input
                type="checkbox"
                value={"Carbon Fibre"}
                checked={MakeMaterial === "Carbon Fibre"}
                onChange={handleMakeMaterial}
              />
              Carbon Fibre
            </label>
          </div>
          <div>
            <label htmlFor="model-2">
              <input
                type="checkbox"
                value={"Other"}
                checked={MakeMaterial === "Other"}
                onChange={handleMakeMaterial}
              />
              Other
            </label>
          </div>
        </div>
        <div className="add-box addbox8">
          <div className="title-addbox2">Description</div>
          <div className="description">{description}</div>
          <div className="input-textArea">
            <input type="textarea" id="textArea" onChange={handleDescription} />
          </div>
        </div>
        <div className="add-box addbox9">
          <div className="title-addbox2">Fitment</div>
          <div className="description">{fitment}</div>
          <div className="input-textArea">
            <input type="textarea" id="textArea" onChange={handleFitment} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
