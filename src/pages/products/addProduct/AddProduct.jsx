import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

import PageDetail from "../../../components/PageAlert/PageDetail";

const page = "Add Products";

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
  const [quantity_left, setQuantity_left] = useState(0);
  const [WheelSize, setWheelSize] = useState("no size");
  const [product_name, setProduct_Name] = useState("");
  const [category_brand, setCategoryBrand] = useState("");

  // states for conditional rendering
  const [wheel, setWheel] = useState(true);
  const [Exhaust, setExhaust] = useState(false);
  const [parts, setParts] = useState(false);
  const [cfibre, setCfibre] = useState(false);
  const [showDetails, setShowProductDetails] = useState(false);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleCategorybrandChange = (event) => {
    setCategoryBrand(event.target.value);
  };

  const handleFitPositionChange = (event) => {
    setSelectedFitPosition(event.target.value);
  };

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files;
    const arrImage = Array.from(uploadedImage).map((image) =>
      URL.createObjectURL(image)
    );
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

  const handleQuantityChange = (e) => {
    setQuantity_left(e.target.value);
  };

  const handleWheelSize = (e) => {
    setWheelSize(e.target.value);
  };
  const handleProductName = (e) => {
    setProduct_Name(e.target.value);
  };

  const alerttext = "update the category brand section";

  const handleSubmit = async (e) => {
    try {
      const postData = {
        product_name,
        images: imagesArray,
        category: selectedCategory,
        fit_position: selectedFitPosition,
        description,
        car_model: selectCarModel,
        car_brand: CarBrand,
        category_brand,
        make_material: MakeMaterial,
        wheel_size: WheelSize,
        price: Price,
        fitment,
        quantity_left,
        rating: 1,
        reviews: [
          {
            user_text: "Sample review",
            user_rating: 5,
            user_name: "John Doe",
            user_id: "123456789",
          },
        ],
      };

      const response = await axios.post(
        "http://localhost:5000/create/product/",
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
      const response = await axios.get("http://localhost:5000/create/product/");
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
                <input
                  type="text"
                  placeholder="name"
                  id="name"
                  onChange={handleProductName}
                />
              </label>
            </div>
          </div>

          <div className="carbrand-and-details">
            <div className="category title">
              Category
              <div className="category-input ">
                <label htmlFor="Exhaust">
                  <input
                    type="radio"
                    id="Exhaust"
                    value="Exhaust"
                    checked={selectedCategory === "Exhaust"}
                    onChange={handleCategoryChange}
                    onClick={() => {
                      setParts(false);
                      setExhaust(true);
                      setWheel(false);
                      setCfibre(false);
                    }}
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
                    onClick={() => {
                      setParts(false);
                      setExhaust(false);
                      setWheel(true);
                      setCfibre(false);
                    }}
                  />
                  Wheel
                </label>
                <label htmlFor="suspension parts">
                  <input
                    type="radio"
                    value="suspension parts"
                    checked={selectedCategory === "suspension parts"}
                    onChange={handleCategoryChange}
                    onClick={() => {
                      setParts(true);
                      setExhaust(false);
                      setWheel(false);
                      setCfibre(false);
                    }}
                  />
                  Suspension parts
                </label>
              </div>
            </div>

            <div className="category title">
              Category Brand
              {wheel && (
                <select
                  name="wheel"
                  id="wheels"
                  onChange={handleCategorybrandChange}
                >
                  <option value="" className="unbrand">
                    select the category brand:wheel
                  </option>
                  <option value="Kansei">Kansei</option>
                  <option value="Enkei">Enkei</option>
                  <option value="Advan Racing">Advan Racing</option>
                  <option value="Bc Forged">Bc Forged</option>
                  <option value="Volk Racing">Volk Racing</option>
                  <option value="FR1">FR1</option>
                </select>
              )}
              {wheel && (
                <div className="Carbrand title wheel">
                  Wheel Size
                  <div className="number">
                    <label htmlFor="wheel-size">
                      <input
                        type="text"
                        id="wheel-size"
                        placeholder="Enter Wheel size"
                        onChange={handleWheelSize}
                      />
                    </label>
                  </div>
                </div>
              )}
              {Exhaust && (
                <select
                  name="wheel"
                  id="wheels"
                  onChange={handleCategorybrandChange}
                >
                  <option value="" className="unbrand">
                    select the category brand:Exhaust
                  </option>
                  <option value="Corolla GR">Corolla GR</option>
                  <option value="12th gen Toyota Corrola(2019+)">
                    12th gen Toyota Corrola
                  </option>
                  <option value="11th gen Toyota Corrola">
                    11th gen Toyota Corrola
                  </option>
                  <option value="8th gen Toyota Cammry">
                    8th gen Toyota Cammry
                  </option>
                  <option value="7th gen Toyota Cammry">
                    7th gen Toyota Cammry
                  </option>
                </select>
              )}
              {parts && (
                <select
                  name="wheel"
                  id="wheels"
                  onChange={handleCategorybrandChange}
                >
                  <option value="" className="unbrand">
                    select the category brand:suspension-parts
                  </option>
                  <option value="Corolla GR">Corolla GR</option>
                  <option value="12th gen Toyota Corrola(2019+)">
                    12th gen Toyota Corrola
                  </option>
                  <option value="11th gen Toyota Corrola">
                    11th gen Toyota Corrola
                  </option>
                  <option value="8th gen Toyota Cammry">
                    8th gen Toyota Cammry
                  </option>
                  <option value="7th gen Toyota Cammry">
                    7th gen Toyota Cammry
                  </option>
                </select>
              )}
              {cfibre && (
                <select
                  name="wheel"
                  id="wheels"
                  onChange={handleCategorybrandChange}
                >
                  <option value="" className="unbrand">
                    select the category brand:carbon fibre
                  </option>
                  <option value="Hood">Hood</option>
                  <option value="Bumpers">Bumpers</option>
                  <option value="Fenders">Fenders</option>
                  <option value="Front LIP">Front LIP</option>
                  <option value="Steering wheel">Steering Wheel</option>
                  <option value="Rear Spoiler">Rear Spoiler</option>
                </select>
              )}
            </div>

            <div className="Model title">
              Model
              <div className="category-input Model ">
                <label>
                  <input
                    type="radio"
                    value="Corrola"
                    checked={selectCarModel === "Corrola"}
                    onChange={handleCarModelChange}
                  />
                  Corrola
                </label>
                <label>
                  <input
                    type="radio"
                    value="Camrry"
                    checked={selectCarModel === "Camrry"}
                    onChange={handleCarModelChange}
                  />
                  Camrry
                </label>
              </div>
            </div>

            <div className="Carbrand title">
              Car Brand
              <div className="category-input Model ">
                <label>
                  <input
                    type="radio"
                    value="Toyota Corrola"
                    checked={CarBrand === "Toyota Corrola"}
                    onChange={handleCarBrand}
                  />
                  Toyota Corrola
                </label>
                <label>
                  <input
                    type="radio"
                    value="Toyota Camrry"
                    checked={CarBrand === "Toyota Camrry"}
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
                  <input
                    type="number"
                    id="number"
                    onChange={handlePriceChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="secondpart part">
          <div className="category title">
            FitPossition
            <div className="category-input ">
              <label>
                <input
                  type="radio"
                  value="lighting"
                  checked={selectedFitPosition === "lighting"}
                  onChange={handleFitPositionChange}
                />
                Lighting
              </label>
              <label>
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
              <label>
                <input
                  type="radio"
                  value="carbon fibre"
                  checked={MakeMaterial === "carbon fibre"}
                  onChange={handleMakeMaterial}
                  onClick={() => {
                    setParts(false);
                    setExhaust(false);
                    setWheel(false);
                    setCfibre(true);
                    handleCategoryChange();
                  }}
                />
                Carbon Fibre
              </label>
              <label>
                <input
                  type="radio"
                  value="Other"
                  checked={MakeMaterial === "Other"}
                  onChange={handleMakeMaterial}
                />
                Other
              </label>
            </div>
          </div>
          {MakeMaterial === "carbon fibre" && (
            <div className="text-alert">{alerttext}</div>
          )}

          <div className="Carbrand title ">
            Fitment
            <div className="number">
              <label htmlFor="fitment">
                <input
                  type="text"
                  id="fitment"
                  placeholder="Enter Fitment"
                  onChange={handleFitment}
                />
              </label>
            </div>
          </div>

          <div className="Carbrand title">
            Description
            <div className="description">
              <label htmlFor="description">
                <input
                  type="textarea"
                  id="description"
                  onChange={handleDescription}
                  placeholder="Product Description"
                />
              </label>
            </div>
          </div>

          <div className="Carbrand title">
            Quantity Avalaible
            <div className="quantity">
              <label htmlFor="quantity">
                <input
                  type="quantity"
                  id="quantity"
                  onChange={handleQuantityChange}
                />
              </label>
            </div>
          </div>

          <div className="imagges">
            selected images
            <div className="selected-images">
              {imagesArray.map((image) => {
                return <img src={image} alt="" />;
              })}
            </div>
          </div>

          <button
            className="product-save-btn"
            onClick={() => {
              setShowProductDetails(true);
            }}
          >
            save
          </button>
        </div>
      </div>
      {showDetails && (
        <div className="details-container">
          Product Detail
          <button
            className="detail-btn"
            onClick={() => {
              setShowProductDetails(false);
            }}
          >
            X
          </button>
          {
            <div className="detail-wrapper">
              <div className="detail-part1">
                <div className="imagges">
                  Product Name
                  <div className="selected-images">{product_name}</div>
                </div>

                <div className="imagges">
                  selected images
                  <div className="selected-images">
                    {imagesArray.map((image) => {
                      return <img src={image} alt="" />;
                    })}
                  </div>
                </div>

                <div className="imagges">
                  Car Brand
                  <div className="selected-images"> {CarBrand}</div>
                </div>
                <div className="imagges">
                  Car Model
                  <div className="selected-images"> {selectCarModel}</div>
                </div>
                <div className="imagges">
                  Make Material
                  <div className="selected-images"> {MakeMaterial}</div>
                </div>
                <div className="imagges">
                  Category Brand
                  <div className="selected-images"> {category_brand}</div>
                </div>
                <div className="imagges">
                  Category
                  <div className="selected-images"> {selectedCategory}</div>
                </div>
              </div>
              <div className="detail-part2">
                <div className="imagges">
                  Wheel Size
                  <div className="selected-images">{WheelSize}</div>
                </div>

                <div className="imagges">
                  Fit-Position
                  <div className="selected-images">{selectedFitPosition}</div>
                </div>

                <div className="imagges">
                  Description
                  <div className="selected-images"> {description}</div>
                </div>
                <div className="imagges">
                  Fitment
                  <div className="selected-images"> {fitment}</div>
                </div>
                <div className="imagges">
                  Price
                  <div className="selected-images"> {Price}</div>
                </div>
                <div className="imagges">
                  Quantity
                  <div className="selected-images"> {quantity_left}</div>
                </div>

                <button
                  className="Add-to-db"
                  onClick={() => {
                    handleSubmit();
                    setShowProductDetails(false);
                    setTimeout(retrieveProducts,1000);
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default AddProduct;
