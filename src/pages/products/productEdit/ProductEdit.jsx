import {useContext,useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import PageDetail from '../../../components/PageAlert/PageDetail';
import FileBase64 from "react-file-base64";
import axios from 'axios';
import Loader from '../../../components/Loader/Loader';
import './ProductEdit.css'
import { adminContext } from '../../../context/adminContext';
import Label from '../../../components/Label/Label';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaTrash } from "react-icons/fa";
import YouTubeEmbed from '../YoutubeEmbed';

const itemsOther = [
  { text: "Exhaust", selected: false },
  { text: "Suspension parts", selected: false },
  { text: "Wheel", selected: true },
];

 const ExhaustSubCategory = [
   { value: "exhaustSystems", label: "Exhaust Systems" },
   { value: "mufflers", label: "Mufflers" },
   { value: "catalyticConverters", label: "Catalytic Converters" },
   { value: "downpipes", label: "Downpipes" },
   { value: "headersManifold", label: "Headers / Manifold" },
   { value: "frontPipeMidPipe", label: "Front Pipe / Mid Pipe" },
   { value: "axleBack", label: "Axle Back" },
   { value: "accessories", label: "Accessories" },
 ];

 const SuspensionPartsSubCategory = [
   { value: "coiloversSprings", label: "Coilovers / Springs" },
   { value: "armsLinks", label: "Arms / Links" },
   { value: "strutTowerBraces", label: "Strut Tower Braces" },
   { value: "swayBars", label: "Sway Bars" },
   { value: "accessories", label: "Accessories" },
 ];

const itemsBodykits = [
  { text: "Hood", selected: false },
  { text: "Bumpers", selected: false },
  { text: "Fenders", selected: false },
  { text: "Rear Trunk", selected: false },
];

const itemsInterior = [
  { text: "Shift knob & pedals", selected: false },
  { text: "Steering wheel & Airbags", selected: false },
  { text: "Seats & Covers", selected: false },
  { text: "Dashboard panel", selected: false },
  { text: "Center console", selected: false },
  { text: "Floor mats", selected: false },
  { text: "Door & trim panels", selected: false },
  { text: "Lighting kit", selected: false },
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
  { text: "Rear Spoilers", selected: false },
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
  {
    value: "ZN7/ZN8 (Toyota GR86) (2021 - Present)",
    label: "ZN7/ZN8 (Toyota GR86) (2021 - Present)",
  },
  {
    value: "ZN6 (Toyota GR86) (2012 - 2020)",
    label: "ZN6 (Toyota GR86) (2012 - 2020)",
  },
  {
    value: "MK4 SUPRA (A80) (1993 - 2002)",
    label: "MK4 SUPRA (A80) (1993 - 2002)",
  },
  {
    value: "MK5 GR SUPRA (A90) (2019 - Present)",
    label: "MK5 GR SUPRA (A90) (2019 - Present)",
  },
];

// Performance Categories
const performanceCategories = [
  { value: "intakeSystem", label: "Intake System" },
  { value: "cooling", label: "Cooling" },
  { value: "brakeUpgrades", label: "Brake Upgrades" },
  { value: "turbo", label: "Turbo" },
  { value: "engines", label: "Engines" },
  { value: "drivetrain", label: "Drivetrain" },
  { value: "electronics", label: "Electronics" },
  { value: "exhaust", label: "Exhaust" },
  { value: "suspensionParts", label: "Suspension Parts" },
];

// Performance Subcategories
const performanceSubcategories = {
  intakeSystem: [
    { value: "airIntakes", label: "Air Intakes Systems" },
    { value: "airFilters", label: "Air Filters" },
    { value: "intakeManifolds", label: "Intake Manifolds" },
  ],
  cooling: [
    { value: "intercoolers", label: "Intercoolers/Charge Pipes" },
    { value: "radiator", label: "Radiator" },
    { value: "radiatorFan", label: "Radiator Fan" },
    { value: "expansionTanks", label: "Expansion / Overflowing Tanks" },
    { value: "coolingPlate", label: "Cooling Plate, Heat Shield" },
  ],
  brakeUpgrades: [
    { value: "bigBrakeKits", label: "Big Brake / Brake Kits" },
    { value: "brakeRotors", label: "Brake Rotors" },
    { value: "brakePads", label: "Brake Pads" },
    { value: "brakeLines", label: "Brake Lines" },
  ],
  turbo: [
    { value: "turbocharger", label: "Turbocharger" },
    { value: "supercharger", label: "Supercharger" },
    { value: "blowOffValves", label: "Blow Off Valves" },
  ],
  engines: [
    { value: "engineBayCovers", label: "Engine Bay Covers" },
    { value: "ecuTuning", label: "ECU Tuning" },
    { value: "motorMounts", label: "Motor Mounts" },
    { value: "fueling", label: "Fueling" },
    { value: "hoodDamper", label: "Hood Damper" },
    { value: "engineBuildParts", label: "Engine Build Parts" },
  ],
  drivetrain: [
    { value: "transmission", label: "Transmission" },
    { value: "shifterKnobs", label: "Shifter / Knobs" },
    { value: "axles", label: "Axles" },
    { value: "differentials", label: "Differentials" },
    { value: "differentialMountBushing", label: "Differential Mount / Bushing" },
    { value: "differentialCovers", label: "Differential Covers" },
    { value: "accessories", label: "Accessories" },
  ],
  electronics: [
    { value: "gauges", label: "Gauges" },
    { value: "ignition", label: "Ignition" },
  ]
};

// Performance Final Categories
const performanceFinalCategories = {
  fueling: [
    { value: "fuelInjectors", label: "Fuel Injectors" },
    { value: "fuelPump", label: "Fuel Pump" },
    { value: "fuelFilter", label: "Fuel Filter" },
  ],
  engineBuildParts: [
    { value: "camshafts", label: "Camshafts" },
    { value: "crankshaft", label: "Crankshaft" },
    { value: "rodsPistonsBearings", label: "Rods, Pistons, Bearings" },
    { value: "valvetrain", label: "Valvetrain" },
    { value: "strokerKit", label: "Stroker Kit" },
    { value: "beltsTimingChains", label: "Belts / Timing Chains" },
  ],
  transmission: [
    { value: "clutches", label: "Clutches" },
    { value: "flywheels", label: "Flywheels" },
    { value: "gearSetGearBoxes", label: "Gear Set / Gear Boxes" },
    { value: "transmissionCoolers", label: "Transmission Coolers" },
  ],
  ignition: [
    { value: "sparkPlugs", label: "Spark Plugs" },
    { value: "ignitionCoils", label: "Ignition Coils" },
    { value: "ignitionAmplifier", label: "Ignition Amplifier" },
    { value: "groundingVoltage", label: "Grounding / Voltage" },
  ],
};


function ProductEdit() {
  const { state } = useLocation();
  const { id, images } = state;
  const [image, setImage] = useState(null);
  const [imagesArray2, setImagesArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(state.category);
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedFitPosition, setSelectedFitPosition] = useState(
    state.fit_position
  );
  const [description, setDescription] = useState(state.description);
  const [features, setFeatures] = useState(state.features);
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
  const [prevImage, setPrevImage] = useState(state.images);
  const [hotProduct, setHotProduct] = useState(state.hot_product);
  const [youtubeId, setYoutubeId] = useState(state.video);
  const [isPerformancePart, setIsPerformancePart] = useState(state.performance_part); 
  const [performanceCategory, setPerformanceCategory] = useState(state.category); 
  const [performanceSubcategory, setPerformanceSubcategory] = useState(state.subcategory);
  const [performanceFinalCategory, setPerformanceFinalCategory] = useState(state.final_subcategory); 

  const navigate = useNavigate();

  const { fetchData } = useContext(adminContext);

  function gotoproducts() {
    navigate("/products/list");
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
    setImagesArray((previmageNames) => [...previmageNames, ...imageNames]);
  };

  const handleImageInsertion = async (event) => {
    const formData = new FormData();
    for (const file of imgFiles) {
      console.log(file);
      formData.append("imageFiles[]", file);
    }
    console.log("formdata", formData);
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
      console.log("success uploading image");
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

    const handleSubCategoryChange = (event) => {
      setSelectedSubCategory(event.target.value);
  };
  
  const handleCategorybrandChange = (event) => {
    setCategoryBrand(event.target.value);
  };

  const handleFitPositionChange = (event) => {
    setSelectedFitPosition(event.target.value);
  };

  const handleHotProduct = (e) => {
    setHotProduct(e.target.value === "true");
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

  const handleYoutubeId = (e) => {
    setYoutubeId(e.target.value);
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

    const array = prevImage.map((image) => {
      console.log(image);
      return getUnslicedPart(image, 0, 41);
    });
    console.log(imgUrl);
    console.log("sliced array", array);
    console.log(imagesArray2);

    

    if (isPerformancePart) {
         try {
           const postData = {
             id,
             product_name,
             images: [...array, ...imagesArray2],
             category: selectedCategory,
             fit_position: selectedFitPosition,
             subcategory: performanceSubcategory,
             final_subcategory: performanceFinalCategory,
             performance_part: isPerformancePart,
             description,
             features,
             fitment,
             car_model: selectCarModel,
             car_brand: CarBrand,
             category_brand,
             make_material: MakeMaterial,
             wheel_size: WheelSize,
             price: Price,
             quantity_left,
             hot_product: hotProduct,
             video: youtubeId,
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

           const { data } = await axios.put(
             "https://yotaperformanceshop.com/yps_server/admin/update_product",
             postData,
             { maxContentLength: 1000000 }
           );
           console.log("product updated", data);
           setIsLoading(false);
           clearAllFields();
           gotoproducts();
         } catch (error) {
           console.log("error", error);
           setIsLoading(false);
         }
      
    } else {
         try {
           const postData = {
             id,
             product_name,
             images: [...array, ...imagesArray2],
             category: selectedCategory,
             fit_position: selectedFitPosition,
             subcategory: selectedSubCategory,
             performance_part: isPerformancePart,
             description,
             features,
             fitment,
             car_model: selectCarModel,
             car_brand: CarBrand,
             category_brand,
             make_material: MakeMaterial,
             wheel_size: WheelSize,
             price: Price,
             quantity_left,
             hot_product: hotProduct,
             video: youtubeId,
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

           const { data } = await axios.put(
             "https://yotaperformanceshop.com/yps_server/admin/update_product",
             postData,
             { maxContentLength: 1000000 }
           );
           console.log("product updated", data);
           setIsLoading(false);
           clearAllFields();
           gotoproducts();
         } catch (error) {
           console.log("error", error);
           setIsLoading(false);
         }
    }
 
  };

  const clearAllFields = () => {
    setImage(null);
    setImagesArray([]);
    setImageUrl([]);
    setImgFiles([]);
    setSelectedCategory("");
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

  const handleDeleteImage = async (name) => {
    console.log(name);
    try {
      const { data } = axios.post(
        "https://yotaperformanceshop.com/yps_server/yps_admin/delete_image",
        {
          label: name,
        }
      );
      console.log(data);
      setPrevImage(prevImage.filter((item) => item !== name));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePerformanceCategoryChange = (event) => {
    setPerformanceCategory(event.target.value);
    setPerformanceSubcategory(""); // Reset subcategory when category changes
    setPerformanceFinalCategory(""); // Reset final category when category changes
  };

  const handlePerformanceSubcategoryChange = (event) => {
    setPerformanceSubcategory(event.target.value);
    setPerformanceFinalCategory(""); // Reset final category when subcategory changes
  };

  const handlePerformanceBTN = () => {
    setIsPerformancePart(!isPerformancePart);
  };
  
  const handlePerformanceFinalCategoryChange = (event) => {
    setPerformanceFinalCategory(event.target.value);
  };

  return (
    <div className="home-container product-edit">
      <div className="flex ">
        <PageDetail page={"Product Edit"} />
        <div className="performance-container">
          {" "}
          Performance Part
          <div
            className={`toggle_container ${
              isPerformancePart ? "end" : "start"
            } `}
            onClick={handlePerformanceBTN}
          >
            <div
              className={`toggle_container_wrapper ${
                isPerformancePart ? "end" : "start"
              } `}
            ></div>
          </div>
        </div>
      </div>
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
                {prevImage.map((image, index) => {
                  return (
                    <div key={index} className="imageEdit">
                      <FaTrash
                        className="imagedelete"
                        onClick={() => {
                          handleDeleteImage(image);
                        }}
                      />

                      <img src={image} alt="" />
                    </div>
                  );
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
              {carModels
                .filter((carModel) => {
                  if (CarBrand === "Toyota Corolla") {
                    return carModel.label.includes("Corolla");
                  } else if (CarBrand === "Toyota Camry") {
                    return carModel.label.includes("Camry");
                  } else if (CarBrand === "Toyota GR86") {
                    return carModel.label.includes("GR86");
                  } else if (CarBrand === "Toyota Supra") {
                    return carModel.label.includes("SUPRA");
                  }
                  return true;
                })
                .map((carModel) => (
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
            Hot Product
            <div className="category-input Model ">
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={hotProduct === true}
                  onChange={handleHotProduct}
                />
                True
              </label>
              <label>
                <input
                  type="radio"
                  value="false"
                  checked={hotProduct === false}
                  onChange={handleHotProduct}
                />
                False
              </label>
            </div>
          </div>

          <div className="Carbrand title">
            Make Material
            <div className="category-input Model">
              <label>
                <input
                  type="radio"
                  value="carbon fiber"
                  checked={MakeMaterial === "carbon fiber"}
                  onChange={handleMakeMaterial}
                  onClick={() => {
                    setParts(false);
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

          {!isPerformancePart && (
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
          )}
        </div>

        <div className="secondpart part">
          {!isPerformancePart && (
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
          )}

          {!isPerformancePart && (
            <>
              {selectedCategory === "Exhaust" ||
              selectedCategory === "Suspension parts" ? (
                <div className="category title">
                  Sub-Category
                  <div className="category-input ">
                    {selectedCategory === "Exhaust"
                      ? ExhaustSubCategory.map((category) => (
                          <label key={category.value}>
                            <input
                              type="radio"
                              value={category.value}
                              checked={selectedSubCategory === category.value}
                              onChange={handleSubCategoryChange}
                            />
                            {category.label}
                          </label>
                        ))
                      : selectedCategory === "Suspension parts"
                      ? SuspensionPartsSubCategory.map((category) => (
                          <label key={category.value}>
                            <input
                              type="radio"
                              value={category.value}
                              checked={selectedSubCategory === category.value}
                              onChange={handleSubCategoryChange}
                            />
                            {category.label}
                          </label>
                        ))
                      : ""}
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          )}

          {isPerformancePart && (
            <div className="performance-part">
              {/* Performance Category */}
              <div className="category title">
                Performance Category
                <div className="category-input">
                  {performanceCategories.map((category) => (
                    <label key={category.value}>
                      <input
                        type="radio"
                        value={category.value}
                        checked={performanceCategory === category.value}
                        onChange={handlePerformanceCategoryChange}
                      />
                      {category.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Performance Subcategory */}
              {performanceCategory && (
                <div className="category title">
                  Performance Subcategory
                  <div className="category-input">
                    {performanceSubcategories[performanceCategory]?.map(
                      (subcategory) => (
                        <label key={subcategory.value}>
                          <input
                            type="radio"
                            value={subcategory.value}
                            checked={
                              performanceSubcategory === subcategory.value
                            }
                            onChange={handlePerformanceSubcategoryChange}
                          />
                          {subcategory.label}
                        </label>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Performance Final Category */}
              {performanceSubcategory && (
                <div className="category title">
                  Performance Final Category
                  <div className="category-input">
                    {performanceFinalCategories[performanceSubcategory]?.map(
                      (finalCategory) => (
                        <label key={finalCategory.value}>
                          <input
                            type="radio"
                            value={finalCategory.value}
                            checked={
                              performanceFinalCategory === finalCategory.value
                            }
                            onChange={handlePerformanceFinalCategoryChange}
                          />
                          {finalCategory.label}
                        </label>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

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
                    value={WheelSize}
                    onChange={handleWheelSize}
                  />
                </label>
              </div>
            </div>
          )}

          {selectedCategory === "Exhaust" && (
            <>
              <div className="Carbrand title wheel">
                Youtube Id
                <div className="number">
                  <label htmlFor="youtubeID">
                    <input
                      type="text"
                      id="youtubeID"
                      value={youtubeId}
                      placeholder="Enter Wheel size"
                      onChange={handleYoutubeId}
                    />
                  </label>
                </div>
              </div>

              <div>
                {youtubeId ? (
                  <YouTubeEmbed videoId={youtubeId} />
                ) : (
                  "Input part id to see the video preview"
                )}
              </div>
            </>
          )}

          <div className="Carbrand title ">
            Fitment
            <div className="number">
              <label htmlFor="fitment">
                {/* <input
                  type="text"
                  id="fitment"
                  value={fitment}
                  placeholder="Enter Fitment"
                  onChange={handleFitment}
                /> */}
                <ReactQuill
                  theme="snow"
                  value={fitment}
                  onChange={(fitment) => setFitment(fitment)}
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
        <>
          {isPerformancePart ? (
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
                    <div className="product-detail-value selected-images imageconn">
                      {[...images, ...imgUrl].map((image) => (
                        <img src={image} alt="Selected Product" key={image} />
                      ))}
                    </div>
                  </div>

                  <div className="product-detail-item">
                    Perfomance Part
                    <div className="product-detail-value">
                      {isPerformancePart ? "yes" : "no"}
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
                    Hot Product
                    <div className="product-detail-value">{hotProduct}</div>
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
                    <div className="product-detail-value">
                      {performanceCategory}
                    </div>
                  </div>
                  {selectedCategory === "Exhaust" && (
                    <>
                      <div className="product-detail-item">
                        YoutubeId
                        <div className="product-detail-value">{youtubeId}</div>
                      </div>
                      <div>
                        {youtubeId ? (
                          <YouTubeEmbed videoId={youtubeId} />
                        ) : (
                          "Input part id to see the video preview"
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="product-details-part2">
                  <div className="product-detail-item">
                    Wheel Size
                    <div className="product-detail-value">{WheelSize}</div>
                  </div>
                  <div className="product-detail-item">
                    Sub-Category
                    <div className="product-detail-value">{performanceSubcategory}</div>
                  </div>
                  <div className="product-detail-item">
                    final-Category
                    <div className="product-detail-value">{performanceFinalCategory}</div>
                  </div>

                  <div className="product-detail-item">
                    Category Type
                    <div className="product-detail-value">
                      {selectedFitPosition}
                    </div>
                  </div>

                  <div className="product-detail-item">
                    Description
                    <div
                      className="product-detail-value"
                      dangerouslySetInnerHTML={{ __html: description }}
                    ></div>
                  </div>
                  <div className="product-detail-item">
                    Features
                    <div
                      className="product-detail-value"
                      dangerouslySetInnerHTML={{ __html: features }}
                    ></div>
                  </div>

                  <div className="product-detail-item">
                    Fitment
                    <div
                      className="product-detail-value"
                      dangerouslySetInnerHTML={{ __html: fitment }}
                    ></div>
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
          ) : (
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
                    <div className="product-detail-value selected-images imageconn">
                      {[...images, ...imgUrl].map((image) => (
                        <img src={image} alt="Selected Product" key={image} />
                      ))}
                    </div>
                  </div>

                  <div className="product-detail-item">
                    Perfomance Part
                    <div className="product-detail-value">
                      {isPerformancePart ? "yes" : "no"}
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
                    Hot Product
                    <div className="product-detail-value">{hotProduct}</div>
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
                    <div className="product-detail-value">
                      {selectedCategory}
                    </div>
                  </div>
                  {selectedCategory === "Exhaust" && (
                    <>
                      <div className="product-detail-item">
                        YoutubeId
                        <div className="product-detail-value">{youtubeId}</div>
                      </div>
                      <div>
                        {youtubeId ? (
                          <YouTubeEmbed videoId={youtubeId} />
                        ) : (
                          "Input part id to see the video preview"
                        )}
                      </div>
                    </>
                  )}

                  <div className="product-detail-item">
                   Sub-Category
                    <div className="product-detail-value">
                      {selectedSubCategory}
                    </div>
                  </div>
                </div>

                <div className="product-details-part2">
                  <div className="product-detail-item">
                    Wheel Size
                    <div className="product-detail-value">{WheelSize}</div>
                  </div>

                  <div className="product-detail-item">
                    Category Type
                    <div className="product-detail-value">
                      {selectedFitPosition}
                    </div>
                  </div>

                  <div className="product-detail-item">
                    Description
                    <div
                      className="product-detail-value"
                      dangerouslySetInnerHTML={{ __html: description }}
                    ></div>
                  </div>
                  <div className="product-detail-item">
                    Features
                    <div
                      className="product-detail-value"
                      dangerouslySetInnerHTML={{ __html: features }}
                    ></div>
                  </div>

                  <div className="product-detail-item">
                    Fitment
                    <div
                      className="product-detail-value"
                      dangerouslySetInnerHTML={{ __html: fitment }}
                    ></div>
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
        </>
      )}
    </div>
  );
}

export default ProductEdit
