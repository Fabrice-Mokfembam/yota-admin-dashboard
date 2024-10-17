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

const page = "Add Products";

const items = [
  "Rear trunk",
  "Side skirt",
  "Rear diffuser",
  "Side mirrors & covers",
  "Front grille",
  "Bumper grille",
  "Head lights",
  "Tail lights",
  "Rear trunk",
  "Shift knob & pedals",
  "Steering wheel & Airbags",
  "Seats & Covers",
  "Dashboard panel",
  "Center console",
  "Floor mats",
  "Door & trim panels",
  "Lighting kit",
];


function AddProduct() {
  const [image, setImage] = useState(null);
  const [imagesArray, setImagesArray] = useState([]);
  const [imgUrl, setImageUrl] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
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
            <div className="category-input Model ">
              <label>
                <input
                  type="radio"
                  value="Toyota Corolla GR (2023+)"
                  checked={selectCarModel === "Toyota Corolla GR (2023+)"}
                  onChange={handleCarModelChange}
                />
                Toyota Corolla GR (2023+)
              </label>
              <label>
                <input
                  type="radio"
                  value="12th gen Toyota Corolla (2019+)"
                  checked={selectCarModel === "12th gen Toyota Corolla (2019+)"}
                  onChange={handleCarModelChange}
                />
                12th gen Toyota Corolla (2019+)
              </label>
              <label>
                <input
                  type="radio"
                  value="11th gen Toyota Corolla (2014 - 2019)"
                  checked={
                    selectCarModel === "11th gen Toyota Corolla (2014 - 2019)"
                  }
                  onChange={handleCarModelChange}
                />
                11th gen Toyota Corolla (2014 - 2019)
              </label>
              <label>
                <input
                  type="radio"
                  value="9th gen Toyota Camry (2025+)"
                  checked={selectCarModel === "9th gen Toyota Camry (2025+)"}
                  onChange={handleCarModelChange}
                />
                9th gen Toyota Camry (2025+)
              </label>
              <label>
                <input
                  type="radio"
                  value="8th gen Toyota Camry (2018 - 2024)"
                  checked={
                    selectCarModel === "8th gen Toyota Camry (2018 - 2024)"
                  }
                  onChange={handleCarModelChange}
                />
                8th gen Toyota Camry (2018 - 2024)
              </label>
              <label>
                <input
                  type="radio"
                  value="7th gen Toyota Camry (2015 - 2017)"
                  checked={
                    selectCarModel === "7th gen Toyota Camry (2015 - 2017)"
                  }
                  onChange={handleCarModelChange}
                />
                7th gen Toyota Camry (2015 - 2017)
              </label>
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
                <label htmlFor="Bumpers">
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
                <label htmlFor="Fenders">
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
                <label htmlFor="Hood">
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
                <label htmlFor="Front Lib">
                  <input
                    type="radio"
                    value="Front Lip"
                    checked={selectedCategory === "Front Lip"}
                    onChange={handleCategoryChange}
                    onClick={() => {
                      setWheel(false);
                    }}
                  />
                  Front Lip
                </label>
                <label htmlFor="Rear Spoiler">
                  <input
                    type="radio"
                    value="Rear Spoiler"
                    checked={selectedCategory === "Rear Spoiler"}
                    onChange={handleCategoryChange}
                    onClick={() => {
                      setWheel(false);
                    }}
                  />
                  Rear Spoiler
                </label>

                {items.map((item) => (
                  <Label
                    key={item}
                    id={item}
                    value={item}
                    selectedCategory={selectedCategory}
                    handleCategoryChange={handleCategoryChange}
                    onClick={() => setWheel(false)}
                    label={item}
                  />
                ))}
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
            Category Type
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
                  value="body kits"
                  checked={selectedFitPosition === "body kits"}
                  onChange={handleFitPositionChange}
                />
                Body kits
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
                <textarea
                  id="description"
                  value={description}
                  onChange={handleDescription}
                  placeholder="Product Description"
                  rows={4} // Specifies the number of visible text lines
                  cols={50} // Optional: Specifies the width of the textarea
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
                <span>Fit-Position:</span>
                <div className="modal-value">{selectedFitPosition}</div>
              </div>
              <div className="modal-item">
                <span>Description:</span>
                <div className="modal-value">{description}</div>
              </div>
              <div className="modal-item">
                <span>Fitment:</span>
                <div className="modal-value">{fitment}</div>
              </div>
              <div className="modal-item">
                <span>Price:</span>
                <div className="modal-value">{Price}</div>
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
