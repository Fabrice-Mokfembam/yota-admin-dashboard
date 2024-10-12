import {useContext,useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import PageDetail from '../../../components/PageAlert/PageDetail';
import FileBase64 from "react-file-base64";
import axios from 'axios';
import Loader from '../../../components/Loader/Loader';
import './ProductEdit.css'
import { adminContext } from '../../../context/adminContext';


function ProductEdit() {
  const { state } = useLocation();
  const { id,images} = state;
  const [image, setImage] = useState(null);
  const [imagesArray2, setImagesArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(state.category);
  const [selectedFitPosition, setSelectedFitPosition] = useState(state.fit_position);
  const [description, setDescription] = useState(state.description);
  const [selectCarModel, setSelectModel] = useState(state.car_model);
  const [CarBrand, setCarBrand] = useState(state.car_brand);
  const [MakeMaterial, setMakeMaterial] = useState(state.make_material);
  const [fitment, setFitment] = useState(state.fitment);
  const [Price, setPrice] = useState(state.price);
  const [quantity_left, setQuantity_left] = useState(state.quantity_left);
  const [WheelSize, setWheelSize] = useState(state.wheel_size);
  const [product_name, setProduct_Name] = useState(state.product_name);
  const [category_brand, setCategoryBrand] = useState(state.category_brand);
  const [imgUrl, setImageUrl] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

   const { fetchData } = useContext(adminContext);

  function gotoproducts() {
    navigate('/products/list')
  }

    const setImageurlsAndNames = (e) => {
    const urls = [];
    const imageNames = [];
    const files = e.target.files;

    for (const file of files) {
      urls.push(URL.createObjectURL(file));
      imageNames.push(file.name);
      setImgFiles((prev) => [...prev, file]);
    }
    setImageUrl((prevUrls) => [...prevUrls, ...urls]);
    setImage(imgUrl[0]);
    setImagesArray((previmageNames)=> [...previmageNames, ...imageNames]);
  };

    const handleImageInsertion = async (event) => {
    const formData = new FormData();
      for (const file of imgFiles) {
      console.log(file)
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
      console.log('success uploading image');
    } catch (error) {
      console.error("Error uploading image Server:", error);
    }
  };
    
  // states for conditional rendering
  const [wheel, setWheel] = useState(true);
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

  // const handleImageUpload = (file) => {
  //   const newArrOfImages = [
  //     ...imagesArray,
  //     ...file.map((item) => {
  //       return item.base64;
  //     }),
  //   ];

  //   setImagesArray(newArrOfImages);
  //   setImage(newArrOfImages[newArrOfImages.length -1]);
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

  function getUnslicedPart(str, start, end) {
    return str.slice(0, start) + str.slice(end);
  }
  
  const handleSubmit = async (e) => {
    handleImageInsertion();
     setIsLoading(true);

    const array = images.map(image => {
      console.log(image)
      return getUnslicedPart(image,0,41)
    })
    console.log(imgUrl)
    console.log('sliced array', array);
    console.log(imagesArray2)

    try {
      const postData = {
        id,
        product_name,
        images: [...array, ...imagesArray2],
        category: selectedCategory,
        fit_position: selectedFitPosition,
        description,
        car_model: selectCarModel,
        car_brand: CarBrand,
        category_brand,
        make_material: MakeMaterial,
        wheel_size: WheelSize,
        price: Price,
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
      console.log(postData);

      const {data} = await axios.put(
        "https://yotaperformanceshop.com/yps_server/admin/update_product",
        postData,{  maxContentLength: 1000000}
      );
      console.log("product updated", data);
      setIsLoading(false);
      clearAllFields();
      gotoproducts()
    } catch (error) {
      console.log("error", error);
       setIsLoading(false);
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
    <div className="home-container product-edit">
      <PageDetail page={"product-edit"} />
      {isLoading && <Loader message={"Editing Product"} />}
      <div className="main-add-product-conatainer">
        <div className="firstpart part">
          <div className="product-info">Product-Info</div>
          <div className="image-name">
            <div className="image-add-product">
              {image ? (
                <img src={image} alt="Uploaded Image" />
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={setImageurlsAndNames}
                  name="imageFiles"
                />
              )}
            </div>
            {image && (
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={setImageurlsAndNames}
                name="imageFiles"
              />
            )}
            <div className="imagges">
              added images
              <div className="selected-images">
                {imgUrl.map((image) => {
                  return <img src={image} alt="" />;
                })}
              </div>
            </div>
            <div className="imagges">
              images
              <div className="selected-images imageconn">
                {state.images.map((image) => {
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
                  value={product_name}
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
                  value="Corrola GR"
                  checked={selectCarModel === "Corrola GR"}
                  onChange={handleCarModelChange}
                />
                Corrola GR
              </label>
              <label>
                <input
                  type="radio"
                  value="12th gen Toyota Corrola"
                  checked={selectCarModel === "12th gen Toyota Corrola"}
                  onChange={handleCarModelChange}
                />
                12th gen Toyota Corrola
              </label>
              <label>
                <input
                  type="radio"
                  value="11th gen Toyota Corrola"
                  checked={selectCarModel === "11th gen Toyota Corrola"}
                  onChange={handleCarModelChange}
                />
                11th gen Toyota Corrola
              </label>
              <label>
                <input
                  type="radio"
                  value=" 8th gen Toyota Cammry"
                  checked={selectCarModel === " 8th gen Toyota Cammry"}
                  onChange={handleCarModelChange}
                />
                8th gen Toyota Cammry
              </label>
              <label>
                <input
                  type="radio"
                  value="7th gen Toyota Cammry"
                  checked={selectCarModel === "7th gen Toyota Cammry"}
                  onChange={handleCarModelChange}
                />
                7th gen Toyota Cammry
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
                    value={WheelSize}
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
                  value={fitment}
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
                  value={Price}
                  onChange={handlePriceChange}
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
                  value={quantity_left}
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
        <div className="product-details-container">
          <div className="product-details-header">
            Product Detail
            <button
              className="close-btn"
              onClick={() => {
                setShowProductDetails(false);
              }}
            >
              X
            </button>
          </div>
          <div className="product-details-wrapper">
            <div className="product-details-part1">
              <div className="product-detail-item">
                Product Name
                <div className="product-detail-value">{product_name}</div>
              </div>

              <div className="product-detail-item">
                Selected Images
                <div className="product-detail-value">
                  {[...images, ...imgUrl].map((image) => (
                    <img src={image} alt="Selected Product" key={image} />
                  ))}
                </div>
              </div>

              <div className="product-detail-item">
                Car Brand
                <div className="product-detail-value">{CarBrand}</div>
              </div>

              <div className="product-detail-item">
                Car Model
                <div className="product-detail-value">{selectCarModel}</div>
              </div>

              <div className="product-detail-item">
                Make Material
                <div className="product-detail-value">{MakeMaterial}</div>
              </div>

              <div className="product-detail-item">
                Category Brand
                <div className="product-detail-value">{category_brand}</div>
              </div>

              <div className="product-detail-item">
                Category
                <div className="product-detail-value">{selectedCategory}</div>
              </div>
            </div>

            <div className="product-details-part2">
              <div className="product-detail-item">
                Wheel Size
                <div className="product-detail-value">{WheelSize}</div>
              </div>

              <div className="product-detail-item">
                Fit Position
                <div className="product-detail-value">
                  {selectedFitPosition}
                </div>
              </div>

              <div className="product-detail-item">
                Description
                <div className="product-detail-value">{description}</div>
              </div>

              <div className="product-detail-item">
                Fitment
                <div className="product-detail-value">{fitment}</div>
              </div>

              <div className="product-detail-item">
                Price
                <div className="product-detail-value">{Price}</div>
              </div>

              <div className="product-detail-item">
                Quantity
                <div className="product-detail-value">{quantity_left}</div>
              </div>

              <button
                className="save-btn"
                onClick={() => {
                  handleSubmit();
                  setShowProductDetails(false);
                  setTimeout(() => {
                    fetchData();
                  }, 1000);
                }}
              >
                Save Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductEdit
