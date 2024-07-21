import React, { useState,useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageDetail from "../../components/PageAlert/PageDetail";
import { productContext } from "../../context/productContext";
import axios from "axios";

function BonusEdit() {
  const bonus = "bonus-edit";
  const routeTo = useNavigate();
  const { state, pdt } = useLocation();
  const { products } = useContext(productContext);

  const [option1, setOption1] = useState(true);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionother, setSelectedOptionother] = useState(state.bonus_name);
  const [coupon, setCoupon] = useState(state.code);
  const [bonus_type, setBonustype] = useState(state.bonus_type);
  const [value, setValue] = useState(state.value);
  const [type, setType] = useState(state.type);
  const [endDate, setEndDate] = useState(state.endDate);
  const [previewDetail, setPreviewDetail] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

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
    routeTo("/bonuses");
  }

  async function updateBonus() {
    const body = {
      product_ids: selectedProducts,
      bonus_type,
      value: value,
      code: coupon,
      type,
      endDate: endDate,
      id:state.id
    };

    if (selectedOption === "black-friday") {
      body.bonus_name = "black-friday";
    } else {
      body.bonus_name = selectedOptionother;
    }

    try {
      console.log(body)
      const {data} = await axios.post('https://yotaperformanceshop.com/yps_server/admin/update_bonus', body);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="home-container bonus">
      <PageDetail page={bonus} />

      {option1 && (
        <div className="option-box box1-option">
          {option2 && (
<></>
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
              placeholder="Enter BonusType"
              onChange={(e) => {
                setBonustype(e.target.value);
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
            <div className="title-addbox2">Type of Value</div>
            <input
              type="text"
              id="title-input"
              value={type}
              className="value-input"
              placeholder="Enter Type of Value"
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </div>
          <div className=" value bonus-code">
            <div className="title-addbox2">Bonus code</div>
            <input
              type="text"
              value={coupon}
              id="title-input"
              className="value-input"
              placeholder="generate bonus code"
              onChange={(e) => {
                e.target.value;
              }}
            />
            <button
              onClick={() => {
                setCoupon("devlap123");
              }}
            >
              generate coupon
            </button>
          </div>
          <div className=" value bonus-code duration">
            <div className="title-addbox2">Bonus Duration</div>
            <p>set end date</p>
          </div>
          <div className="duration-input-container">
            {state.endDate}
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
          {
            coupon ? null : <div className=" value add-images">
            <div className="title-addbox2">Add products to bonus</div>
                       <div className="swiping-box-container">
              <div className="swipping-box">
                {products.map((item) => {
                  return (
                    <div className="product-select">
                      <div className="p-img">
                        <img src={item.images[0]} alt=""/>
                      </div>
                      <div className="product-id">
                        <label htmlFor="pdt123">
                          <input
                            type="checkbox"
                            value={item.id}
                            // checked={state.product_ids.foreach(pdId => {
                            //   if (item.id === pdId) {
                            //     return true
                            //   } else {
                            //     return false;
                            //   }
                            // } )}
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
           </div>
       }
          

          <button
            className="preview"
            onClick={() => {
              setPreviewDetail(!previewDetail);
            }}
          >
            {!previewDetail ? "preview bonus details" : "cancel preview"}
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
                <div className="title-addbox2">Bonus name</div>
                <p>{state.bonus_name}</p>
              </div>
              <div className="bon-V">
                <div className="title-addbox2">Bonus Type</div>
                <p>{bonus_type}</p>
              </div>
              <div className="bon-V">
                <div className="title-addbox2">Bonus Value</div>
                <p>{value}</p>
              </div>
              <div className="bon-c">
                <div className="title-addbox2">Bonus code</div>
                <p>{coupon}</p>
              </div>
              <div className="bon-c">
                <div className="title-addbox2">Type of value</div>
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
              <button className="preview" onClick={updateBonus}>
                Apply Bonus
              </button>
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
      <button className="btnSbonus" onClick={gotoBonuses}>
        See all Bonuses
      </button>
    </div>
  );
}

export default BonusEdit;
