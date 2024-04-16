import React ,{useState} from 'react'
import { useLocation } from 'react-router-dom'
import PageDetail from '../../../components/PageAlert/PageDetail';
import FileBase64 from "react-file-base64";

function ProductEdit() {
  const { state } = useLocation();

  const [image, setImage] = useState(null);
  const [imagesArray, setImagesArray] = useState(state.images);
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

  const handleImageUpload = (file) => {
    const newArrOfImages = [
      ...imagesArray,
      ...file.map((item) => {
        return item.base64;
      }),
    ];

    setImagesArray(newArrOfImages);
    setImage(newArrOfImages[newArrOfImages.length -1]);
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
        postData,{  maxContentLength: 1000000}
      );
      console.log("product created", response.data);
      setProducts((products)=>[...products,postData])
    } catch (error) {
      console.log("error", error);
    }

  };


  return (
      <div className="home-container product-edit">
      <PageDetail page={'product-edit'} />
      <div className="main-add-product-conatainer">
        <div className="firstpart part">
          <div className="product-info">Product-Info</div>
          <div className="image-name">
            <div className="image-add-product">
              {image ? (
                <img src={image} alt="Uploaded Image" />
              ) : (
                <FileBase64
                  type="file"
                  id="uploadImage"
                  multiple={true}
                  onDone={handleImageUpload}
                />
              )}
            </div>
            {image && (
              <FileBase64
                type="file"
                id="uploadImage"
                multiple={true}
                onDone={handleImageUpload}
              />
            )}
            <div className="imagges">
               added images
              <div className="selected-images">
                {imagesArray.map((image) => {
                  console.log(image);
                  return <img src={image} alt="" />;
                })}
              </div>
            </div>
            <div className="imagges">
              images
              <div className="selected-images">
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
                <input
                  type="textarea"
                  id="description"
                  value={description}
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
  )
}

export default ProductEdit
