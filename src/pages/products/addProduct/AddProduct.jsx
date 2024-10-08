import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.css";
import FileBase64 from "react-file-base64";
import PageDetail from "../../../components/PageAlert/PageDetail";
import { useContext } from "react";
import { productContext } from "../../../context/productContext";
import Loader from "../../../components/Loader/Loader";
import Modal from "../../../components/modal/Modal";

const page = "Add Products";

function AddProduct() {
  const [image, setImage] = useState(null);
  const [imagesArray, setImagesArray] = useState([]);
  const [imgUrl, setImageUrl] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
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

  const { products, setProducts, setLoading, loading } =
    useContext(productContext);
  // states for conditional rendering
  const [wheel, setWheel] = useState(true);
  const [showDetails, setShowProductDetails] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);

    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("");
    const [showModal, setShowModal] = useState(false);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleCategorybrandChange = (event) => {
    setCategoryBrand(event.target.value);
  };

  const handleFitPositionChange = (event) => {
    setSelectedFitPosition(event.target.value);
  };

  const setImageurlsAndNames = (e) => {
    const urls = [];
    const imageNames = [];
    const files = e.target.files;

    for (const file of files) {
      urls.push(URL.createObjectURL(file));
      imageNames.push(file.name);
      setImgFiles((prev) => [...prev, file]);
    }
    setImageUrl(urls);
    setImage(imgUrl[0]);
    setImagesArray(imageNames);
  };

  const handleImageInsertion =async  () => {
    const formData = new FormData();
    for (const file of imgFiles) {
      formData.append("imageFiles[]", file);
    }
    console.log('formdata',formData)
    try {
      const { data } = await axios.post(
        "https://yotaperformanceshop.com/yps_server/admin/upload_image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data) {
        console.log("success", data);
      } else {
        console.error("Error uploading image:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // const handleImageUpload = (file) => {
  //   console.log(file[0]);
  //   const newArrOfImages = [
  //     ...imagesArray,
  //     ...file.map((item) => {
  //       return item.base64;
  //     }),
  //   ];

  //   setImagesArray(newArrOfImages);
  //   setImage(newArrOfImages[0]);
  // };

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

  const handleSubmit = async () => {
    handleImageInsertion()
    setIsLoading(true)
    
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
        price: Number.parseFloat(Price),
        quantity_left: Number.parseFloat(quantity_left),
        rating: 1,
      };

      console.log(postData);

      const response = await axios.post(
        "https://yotaperformanceshop.com/yps_server/admin/add_products",
        postData,
        { maxContentLength: 1000000 }
      );
      console.log("product created", response.data);
      setStatus('success')
      setIsLoading(false);
      setShowModal(true);
    
       
      setProducts((products2) => [...products2, postData]);
      clearAllFields();
       window.location.reload();
    } catch (error) {
      setStatus('failed')
      setIsLoading(false);
      setModalMessage("failed to add product !");
      setModalType("error"); // or 'deleted', 'edited', 'error' based on the operation
      setShowModal(true);
      console.log("error", error);
    }
  };

  const retrieveProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/create/product/");
      console.log("added latest product to database", response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const clearAllFields = () => {
    setImage(null);
    setImagesArray([]);
    setImageUrl([]);
    setImgFiles([]);
    setSelectedCategory("Wheel");
    setSelectedFitPosition("");
    setDescription("");
    setSelectModel("");
    setCarBrand("");
    setMakeMaterial("");
    setFitment("");
    setPrice(0);
    setQuantity_left(0);
    setWheelSize("no size");
    setProduct_Name("");
    setCategoryBrand("");
  };


  return (
    <div className="home-container add-product-container">
      <PageDetail page={page} />
      {isLoading && <Loader message={'uploading product'} />}
      {showModal && (
        <Modal
          message={modalMessage}
          type={modalType}
          onClose={()=>{setShowModal(false)}}
        />)}
      <div className="main-add-product-conatainer">
        <div className="firstpart part">
          <div className="product-info">Product-Info</div>
          <div className="image-name">
            <div className="image-add-product">
              {image ? (
                <img src={image} alt="Uploaded Image" />
              ) : (
                // <FileBase64
                //   type="file"
                //   id="uploadImage"
                //   multiple={true}
                //   onDone={handleImageUpload}
                // />

                <form>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={setImageurlsAndNames}
                    name="imageFiles"
                  />
                </form>
              )}
            </div>
            {image && (
              // <FileBase64
              //   type="file"
              //   id="uploadImage"
              //   multiple={true}
              //   onDone={handleImageUpload}
              // />
              <form>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={setImageurlsAndNames}
                  name="imageFiles"
                />
              </form>
            )}
            <div className="imagges">
              selected images
              <div className="selected-images">
                {imgUrl.map((image) => {
                  return <img src={image} alt="" />;
                })}
              </div>
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

          <div className="Model title">
            Car Model
            <div className="category-input Model ">
              <label>
                <input
                  type="radio"
                  value="Toyota Corolla GR"
                  checked={selectCarModel === "Toyota Corolla GR"}
                  onChange={handleCarModelChange}
                />
                Toyota Corolla GR
              </label>
              <label>
                <input
                  type="radio"
                  value="12th gen Toyota Corolla"
                  checked={selectCarModel === "12th gen Toyota Corolla"}
                  onChange={handleCarModelChange}
                />
                12th gen Toyota Corolla
              </label>
              <label>
                <input
                  type="radio"
                  value="11th gen Toyota Corolla"
                  checked={selectCarModel === "11th gen Toyota Corolla"}
                  onChange={handleCarModelChange}
                />
                11th gen Toyota Corolla
              </label>
              <label>
                <input
                  type="radio"
                  value=" 8th gen Toyota Camry"
                  checked={selectCarModel === " 8th gen Toyota Camry"}
                  onChange={handleCarModelChange}
                />
                8th gen Toyota Camry
              </label>
              <label>
                <input
                  type="radio"
                  value="7th gen Toyota Camry"
                  checked={selectCarModel === "7th gen Toyota Camry"}
                  onChange={handleCarModelChange}
                />
                7th gen Toyota Camry
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
                    // setParts(false);
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
                      setWheel(false);
                    }}
                  />
                  Exhaust
                </label>
                <label htmlFor="Exhaust">
                  <input
                    type="radio"
                    id="Bumpers"
                    value="Bumpers"
                    checked={selectedCategory === "Bumpers"}
                    onChange={handleCategoryChange}
                    onClick={() => {
                      setWheel(false);
                    }}
                  />
                  Bumpers
                </label>
                <label htmlFor="Exhaust">
                  <input
                    type="radio"
                    id="Fenders"
                    value="Fenders"
                    checked={selectedCategory === "Fenders"}
                    onChange={handleCategoryChange}
                    onClick={() => {
                      setWheel(false);
                    }}
                  />
                  Fenders
                </label>
                <label htmlFor="Exhaust">
                  <input
                    type="radio"
                    id="Hood"
                    value="Hood"
                    checked={selectedCategory === "Hood"}
                    onChange={handleCategoryChange}
                    onClick={() => {
                      setWheel(false);
                    }}
                  />
                  Hood
                </label>
                <label htmlFor="Wheel">
                  <input
                    type="radio"
                    id="Wheel"
                    value="Wheel"
                    checked={selectedCategory === "Wheel"}
                    onChange={handleCategoryChange}
                    onClick={() => {
                      setWheel(true);
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
                      setWheel(false);
                    }}
                  />
                  Suspension parts
                </label>
                <label htmlFor="Steering wheel">
                  <input
                    type="radio"
                    value="Steering wheel"
                    checked={selectedCategory === "Steering wheel"}
                    onChange={handleCategoryChange}
                    onClick={() => {
                      setWheel(false);
                    }}
                  />
                  Steering Wheel
                </label>
              </div>
            </div>

            {wheel && (
              <div className="category title">
                Category Brand
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
              </div>
            )}

            {selectedCategory}
          </div>
        </div>

        <div className="secondpart part">
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
            Price($)
            <div className="number ">
              <label htmlFor="number">
                <input
                  type="number"
                  id="number"
                  className="category-input"
                  onChange={handlePriceChange}
                />
              </label>
            </div>
          </div>

          <div className="Carbrand title ">
            Quantity Avalaible
            <div className="quantity">
              <label htmlFor="quantity">
                <input
                  type="quantity"
                  className="category-input"
                  id="quantity"
                  onChange={handleQuantityChange}
                />
              </label>
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
            <div className="details-wrapper">
              <div className="details-part1">
                <div className="details-images">
                  Product Name
                  <div className="details-selected-images">{product_name}</div>
                </div>

                <div className="details-images">
                  Selected Images
                  <div className="details-selected-images">
                    {imgUrl.map((image) => {
                      return <img src={image} alt="" />;
                    })}
                  </div>
                </div>

                <div className="details-images">
                  Car Brand
                  <div className="details-selected-images">{CarBrand}</div>
                </div>
                <div className="details-images">
                  Car Model
                  <div className="details-selected-images">
                    {selectCarModel}
                  </div>
                </div>
                <div className="details-images">
                  Make Material
                  <div className="details-selected-images">{MakeMaterial}</div>
                </div>
                <div className="details-images">
                  Category Brand
                  <div className="details-selected-images">
                    {category_brand}
                  </div>
                </div>
                <div className="details-images">
                  Category
                  <div className="details-selected-images">
                    {selectedCategory}
                  </div>
                </div>
              </div>
              <div className="details-part2">
                <div className="details-images">
                  Wheel Size
                  <div className="details-selected-images">{WheelSize}</div>
                </div>

                <div className="details-images">
                  Fit-Position
                  <div className="details-selected-images">
                    {selectedFitPosition}
                  </div>
                </div>

                <div className="details-images">
                  Description
                  <div className="details-selected-images">{description}</div>
                </div>
                <div className="details-images">
                  Fitment
                  <div className="details-selected-images">{fitment}</div>
                </div>
                <div className="details-images">
                  Price
                  <div className="details-selected-images">{Price}</div>
                </div>
                <div className="details-images">
                  Quantity
                  <div className="details-selected-images">{quantity_left}</div>
                </div>

                <button
                  className="add-to-db"
                  onClick={() => {
                    handleSubmit();
                    setShowProductDetails(false);
                    setTimeout(retrieveProducts, 1000);
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
