import { useState } from "react";
import axios from "axios";
import "./AddProduct.css";
import FileBase64 from "react-file-base64";
import PageDetail from "../../../components/PageAlert/PageDetail";
import { useContext } from "react";
import { productContext } from "../../../context/productContext";
import Loader from "../../../components/Loader/Loader";
import { adminContext } from "../../../context/adminContext";

import Failurepopup from "../../../components/Failurepopoup/Failurepopup";
import Successpopup from "../../../components/successpopup/Successpopup";
import Label from "../../../components/Label/Label";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const page = "Add Products";

const itemsOther = [
  { text: "Exhaust", selected: false },
  { text: "Suspension parts", selected: false },
  { text: "Wheels", selected: true },
  { text: "Rear Spoilers", selected: false },
];

const itemsBodykits = [
  { text: "Hood", selected: false },
  { text: "Bumpers", selected: false },
  { text: "Fenders", selected: false },
  { text: "Rear Trunk", selected: false },
  { text: "Lighting kit", selected: false },
];

const itemsInterior = [
  { text: "Shift knob & pedals", selected: false },
  { text: "Steering wheel & Airbags", selected: false },
  { text: "Seats & Covers", selected: false },
  { text: "Dashboard panel", selected: false },
  { text: "Center console", selected: false },
  { text: "Floor mats", selected: false },
  { text: "Door & trim panels", selected: false },
  { text: "Steering wheel", selected: false },
];

const itemsLighting = [
  { text: "Head Lights", selected: false },
  { text: "Tail Lights", selected: false },
];

const itemsExterior = [
  { text: "Front Lip", selected: false },
  { text: "Side skirt", selected: false },
  { text: "Rear diffuser", selected: false },
  { text: "Side mirrors & covers", selected: false },
  { text: "Front grille", selected: false },
  { text: "Bumper grille", selected: false },
  { text: "Covers", selected: false },
];

const categories = [
  { value: "lighting", label: "Lighting" },
  { value: "exterior", label: "Exterior" },
  { value: "interior", label: "Interior" },
  { value: "body kit", label: "Body Kits" },
  { value: "other", label: "Other" },
];

const carModels = [
  { value: "Toyota Corolla GR (2023+)", label: "Toyota Corolla GR (2023+)" },
  {
    value: "12th gen Toyota Corolla (2019+)",
    label: "12th gen Toyota Corolla (2019+)",
  },
  {
    value: "11th gen Toyota Corolla (2014 - 2019)",
    label: "11th gen Toyota Corolla (2014 - 2019)",
  },
  {
    value: "9th gen Toyota Camry (2025+)",
    label: "9th gen Toyota Camry (2025+)",
  },
  {
    value: "8th gen Toyota Camry (2018 - 2024)",
    label: "8th gen Toyota Camry (2018 - 2024)",
  },
  {
    value: "7th gen Toyota Camry (2015 - 2017)",
    label: "7th gen Toyota Camry (2015 - 2017)",
  },
];

function AddProduct() {
  const [image, setImage] = useState(null);
  const [imagesArray, setImagesArray] = useState([]);
  const [imgUrl, setImageUrl] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFitPosition, setSelectedFitPosition] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
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
  const { fetchData } = useContext(adminContext);
  // states for conditional rendering
  const [wheel, setWheel] = useState(true);
  const [showDetails, setShowProductDetails] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);

  

    const [isSuccess, setIsSuccess] = useState(false); // For showing success popup
    const [isFailure, setIsFailure] = useState(false); // For showing failure popup

  
    const showSuccessPopup = () => {
      setIsSuccess(true);
    };

  
    const showFailurePopup = () => {
      setIsFailure(true);
    };

  
    const closeSuccessPopup = () => {
      setIsSuccess(false);
    };

    
    const closeFailurePopup = () => {
      setIsFailure(false);
    };

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

  const handleDescription = (e) => {
    setDescription(description);
  };
  const handleFeatures = (e) => {
    setFeatures(e.target.value);
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
        features,
        car_model: selectCarModel,
        car_brand: CarBrand,
        category_brand,
        fitment,
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
      setIsLoading(false);

      if (response.data) {
        alert('success')

        clearAllFields();
      }
       
      setProducts((products2) => [...products2, postData]);
      
    } catch (error) {
      setStatus('failed')
      setIsLoading(false);
      
      console.log("error", error);
      alert("error uploadind product");
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
      {isLoading && <Loader message={"uploading product"} />}

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
            Price($)
            <div className="number">
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

          <div className="Carbrand title">
            Car Brand
            <div className="category-input Model ">
              <label>
                <input
                  type="radio"
                  value="Toyota Corolla"
                  checked={CarBrand === "Toyota Corolla"}
                  onChange={handleCarBrand}
                />
                Toyota Corolla
              </label>
              <label>
                <input
                  type="radio"
                  value="Toyota Camry"
                  checked={CarBrand === "Toyota Camry"}
                  onChange={handleCarBrand}
                />
                Toyota Camry
              </label>
            </div>
          </div>

          <div className="Model title">
            Car Model
            <div className="category-input Model">
              {carModels.map((carModel) => (
                <label key={carModel.value}>
                  <input
                    type="radio"
                    value={carModel.value}
                    checked={selectCarModel === carModel.value}
                    onChange={handleCarModelChange}
                  />
                  {carModel.label}
                </label>
              ))}
            </div>
          </div>

          <div className="Carbrand title">
            Make Material
            <div className="category-input Model ">
              <label>
                <input
                  type="radio"
                  value="carbon fiber"
                  checked={MakeMaterial === "carbon fiber"}
                  onChange={handleMakeMaterial}
                  onClick={() => {
                    // setParts(false);
                    setExhaust(false);
                    setWheel(false);
                    setCfibre(true);
                    handleCategoryChange();
                  }}
                />
                Carbon Fiber
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
              Category Type
              <div className="category-input">
                {categories.map((category) => (
                  <label key={category.value}>
                    <input
                      type="radio"
                      value={category.value}
                      checked={selectedFitPosition === category.value}
                      onChange={handleFitPositionChange}
                    />
                    {category.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="secondpart part">
          <div className="category title">
            Category
            <div className="category-input ">
              {selectedFitPosition === "other"
                ? itemsOther.map((item) => (
                    <Label
                      key={item.text}
                      id={item.text}
                      value={item.text}
                      selectedCategory={selectedCategory}
                      handleCategoryChange={handleCategoryChange}
                      onClick={() => setWheel(item.selected)}
                      label={item.text}
                    />
                  ))
                : selectedFitPosition === "interior"
                ? itemsInterior.map((item) => (
                    <Label
                      key={item.text}
                      id={item.text}
                      value={item.text}
                      selectedCategory={selectedCategory}
                      handleCategoryChange={handleCategoryChange}
                      onClick={() => setWheel(item.selected)}
                      label={item.text}
                    />
                  ))
                : selectedFitPosition === "exterior"
                ? itemsExterior.map((item) => (
                    <Label
                      key={item.text}
                      id={item.text}
                      value={item.text}
                      selectedCategory={selectedCategory}
                      handleCategoryChange={handleCategoryChange}
                      onClick={() => setWheel(item.selected)}
                      label={item.text}
                    />
                  ))
                : selectedFitPosition === "body kit"
                ? itemsBodykits.map((item) => (
                    <Label
                      key={item.text}
                      id={item.text}
                      value={item.text}
                      selectedCategory={selectedCategory}
                      handleCategoryChange={handleCategoryChange}
                      onClick={() => setWheel(item.selected)}
                      label={item.text}
                    />
                  ))
                : selectedFitPosition === "lighting"
                ? itemsLighting.map((item) => (
                    <Label
                      key={item.text}
                      id={item.text}
                      value={item.text}
                      selectedCategory={selectedCategory}
                      handleCategoryChange={handleCategoryChange}
                      onClick={() => setWheel(item.selected)}
                      label={item.text}
                    />
                  ))
                : ""}
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
                {/* <textarea
                  id="description"
                  value={description}
                  onChange={handleDescription}
                  placeholder="Product Description"
                  rows={4} // Specifies the number of visible text lines
                  cols={50} // Optional: Specifies the width of the textarea
                /> */}
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={(description) => setDescription(description)}
                />
                {/* <div
                  className="output"
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div> */}
              </label>
            </div>
          </div>

          <div className="Carbrand title">
            Features
            <div className="description">
              <label htmlFor="features">
                {/* <textarea
                  id="features"
                  value={features}
                  onChange={handleFeatures}
                  placeholder="Product Features"
                  rows={4} // Specifies the number of visible text lines
                  cols={50} // Optional: Specifies the width of the textarea
                /> */}
                <ReactQuill
                  theme="snow"
                  value={features}
                  onChange={(features) => setFeatures(features)}
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
        <div className="product-detail-modal">
          <div className="modal-header">
            <span>Product Detail</span>
            <button
              className="close-modal-btn"
              onClick={() => {
                setShowProductDetails(false);
              }}
            >
              X
            </button>
          </div>
          <div className="modal-content">
            <div className="modal-left">
              <div className="modal-item">
                <span>Product Name:</span>
                <div className="modal-value">{product_name}</div>
              </div>
              <div className="modal-item">
                <span>Selected Images:</span>
                <div className="modal-images imageconn">
                  {imgUrl.map((image, index) => (
                    <img key={index} src={image} alt={`Selected ${index}`} />
                  ))}
                </div>
              </div>
              <div className="modal-item">
                <span>Price:</span>
                <div className="modal-value">{Price}</div>
              </div>
              <div className="modal-item">
                <span>Car Brand:</span>
                <div className="modal-value">{CarBrand}</div>
              </div>
              <div className="modal-item">
                <span>Car Model:</span>
                <div className="modal-value">{selectCarModel}</div>
              </div>
              <div className="modal-item">
                <span>Make Material:</span>
                <div className="modal-value">{MakeMaterial}</div>
              </div>
              <div className="modal-item">
                <span>Category Brand:</span>
                <div className="modal-value">{category_brand}</div>
              </div>
              <div className="modal-item">
                <span>Category Type:</span>
                <div className="modal-value">{selectedFitPosition}</div>
              </div>
              <div className="modal-item">
                <span>Category:</span>
                <div className="modal-value">{selectedCategory}</div>
              </div>
            </div>
            <div className="modal-right">
              <div className="modal-item">
                <span>Wheel Size:</span>
                <div className="modal-value">{WheelSize}</div>
              </div>

              <div className="modal-item">
                <span>Description:</span>
                <div
                  className="modal-value"
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div>
              </div>
              <div className="modal-item">
                <span>Features:</span>
                <div
                  className="modal-value"
                  dangerouslySetInnerHTML={{ __html: features }}
                >
                </div>
              </div>
              <div className="modal-item">
                <span>Fitment:</span>
                <div className="modal-value">{fitment}</div>
              </div>

              <div className="modal-item">
                <span>Quantity:</span>
                <div className="modal-value">{quantity_left}</div>
              </div>
              <button
                className="add-to-db-btn"
                onClick={() => {
                  handleSubmit();
                  setShowProductDetails(false);
                  setTimeout(() => {
                    fetchData();
                  }, 1000);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
