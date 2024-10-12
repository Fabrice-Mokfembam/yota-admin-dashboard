import React, { useState } from "react";
import "./Bonus.css";
import PageDetail from "../../components/PageAlert/PageDetail";
import { productContext } from "../../context/productContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Loader from "../../components/Loader/Loader";


function Bonus() {
  const bonus = "bonus-settings";
  const { products } = useContext(productContext);
  const routeTo = useNavigate();

  const [option1, setOption1] = useState(true);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionother, setSelectedOptionother] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [code, setCode] = useState("");
  const [endDate, setEndDate] = useState("");
  const [previewDetail, setPreviewDetail] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bonus_type, setBonusType] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  

  function handleproductbonus(e) {
    const productId = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedProducts((prevproducts) => [...prevproducts, productId]);
    } else {
      setSelectedProducts((prevproducts) =>
        prevproducts.filter((item) => {
          item !== productId;
        })
      );
    }
  }

  function handleOptionChange(e) {
    setSelectedOption(e.target.value);
  }

  function gotoBonuses() {
    routeTo('/bonuses');
  }

  async function createBonus() {
    setIsLoading(true);
      const body = {
	       products: selectedProducts,
	       value: value,
         type,
         bonus_type,
         code,
	       endDate: endDate,
    }
    
    if (selectedOption === 'black-friday') {
      body.bonus_name = 'black-friday';
    }
    else {
      body.bonus_name = selectedOptionother;
    }


   try {
    
    const data =  await axios.post('https://yotaperformanceshop.com/yps_server/admin/add_bonus', body);
     console.log('successfully creation',data);
     
     setIsLoading(false)
     setPreviewDetail(false)
      alert("succesfully created");
     clearValues()
    } catch (error) {
     console.log(error); 
     setIsLoading(false)
      alert("unsuccesfully");
    }
   finally {
     setPreviewDetail(false);
    }
   
  }

   const clearValues = () => {
     setSelectedOption("");
     setValue("");
     setType("");
     setCode("");
     setEndDate("");
     setSelectedProducts([]);
     setBonusType("");
     setPreviewDetail(false);
   };

  return (
    <div className="home-container bonus">
      <PageDetail page={bonus} />

      { isLoading && <Loader message={'creating bonus'}/>}
      <div className="tabs">
        <div
          className={`option1 ${option1 && option3 ? "red-bg" : null} tab`}
          onClick={() => {
            setOption1(true);
            setOption3(true);
            setOption2(false);
          }}
        >
          General Bonus
        </div>
        <div
          className={`option2 ${option2 ? "red-bg" : null} tab`}
          onClick={() => {
            setOption2(true);
            setOption3(false);
          }}
        >
          Assign bonus to particular Products
        </div>
         <div
          className="underline"
          style={{
            transform: `translateX(${option3 ? 0 : 98}%)`,
          }}
        />
      </div>
        
      {option1 && (
        <div className="option-box box1-option">
          {option2 && (
            <div className="swiping-box-container">
              <div className="swipping-box">
                {products.map((item) => {
                  return (
                    <div className="product-select" key={item}>
                      <div className="p-img">
                        <img src={item.images[0]} alt="" />
                      </div>
                      <div className="product-id">
                        {/* <p> PID: {item._id.slice(0, 9) + '...'}</p> */}
                        <label htmlFor="pdt123">
                          <input
                            type="checkbox"
                            value={item.id}
                            onChange={handleproductbonus}
                          />
                          add to list
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="title-addbox2">Bonus Title</div>
          <div className="title-box">
            <div>
              <label htmlFor="black-friday">
                <input
                  type="radio"
                  id="black-friday"
                  value="black-friday"
                  checked={selectedOption === "black-friday"}
                  onChange={handleOptionChange}
                />
                Black-Friday
              </label>
            </div>
            <div>
              <label htmlFor="other">
                <input
                  type="radio"
                  id="other"
                  value="other"
                  checked={selectedOption === "other"}
                  onChange={handleOptionChange}
                />
                Other
              </label>
            </div>
            {selectedOption === "other" ? (
              <div className="title-input-container">
                <input
                  type="text"
                  value={selectedOptionother}
                  id="title-input"
                  placeholder="Type bonus title here"
                  onChange={(e) => {
                    setSelectedOptionother(e.target.value);
                  }}
                />
              </div>
            ) : null}
          </div>
            <div className="value">
            <div className="title-addbox2">Bonus Type</div>
            <input
              type="text"
              id="title-input"
              value={bonus_type}
              className="value-input"
              placeholder="Enter Bonus_Type"
              onChange={(e) => {
                setBonusType(e.target.value);
              }}
            />
          </div>
          <div className="value">
            <div className="title-addbox2">Bonus Value</div>
            <input
              type="text"
              id="title-input"
              value={value}
              className="value-input"
              placeholder="Enter Bonus Value"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
          <div className="value">
            <div className="title-addbox2">Type</div>
            <input
              type="text"
              id="title-input"
              value={type}
              className="value-input"
              placeholder="Enter Type"
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </div>
          <div className=" value bonus-code duration">
            <div className="title-addbox2">Bonus Duration</div>
            <p>set end date</p>
          </div>
          <div className="duration-input-container">
            <input
              type="date"
              id="end-date"
              className="date-input"
              value={endDate}
              placeholder="End Date"
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
          </div>
          <button
            className="preview"
            onClick={() => {
              setPreviewDetail(!previewDetail);
            }}
          >
         {!previewDetail ? "Preview bonus details" : "cancel preview"}
          </button>
          {previewDetail && (
            <div className="preview-details">
              <div className="bon-T">
                <div className="title-addbox2">Bonus Title</div>
                <p>
                  {selectedOption === "black-friday"
                    ? selectedOption
                    : selectedOptionother}
                </p>
              </div>
              <div className="bon-V">
                <div className="title-addbox2">Bonus Type</div>
                <p>{bonus_type}</p>
              </div>
              <div className="bon-V">
                <div className="title-addbox2">Bonus Value</div>
                <p>{value}</p>
              </div>
              <div className="bon-V">
                <div className="title-addbox2">type of value</div>
                <p>{type}</p>
              </div>
              <div className="bon-D">
                <div className="title-addbox2">Bonus Duration</div>
                <p>{endDate}</p>
              </div>
              <div className="bon-id">
                <div className="title-addbox2">Product ids</div>
                <p>
                  {selectedProducts.length > 0
                    ? selectedProducts
                    : "all products"}
                </p>
              </div>
              <button className="preview" onClick={createBonus}>Apply Bonus</button>
              <div
                className="previewX"
                onClick={() => {
                  setPreviewDetail(!previewDetail);
                }}
              >
                X
              </div>
            </div>
          )}
          
        </div>
        
      )}
    
    </div>
  );
}

export default Bonus;
