import React, { useState } from "react";
import "./Bonus.css";
import me from '../../assets/images/remix1.jpg'
import PageDetail from "../../components/PageAlert/PageDetail";

function Bonus() {
  const bonus = "bonus-settings";

  const [option1, setOption1] = useState(true);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionother, setSelectedOptionother] = useState("");
  const [coupon, setCoupon] = useState("");
  const [value, setValue] = useState("");
  const [endDate, setEndDate] = useState("");
  const [previewDetail, setPreviewDetail] = useState(false);

  function handleOptionChange(e) {
    setSelectedOption(e.target.value);
  }

  return (
    <div className="home-container">
      <PageDetail page={bonus} />

      <div className="bonus-options">
        <div
          className={`option1 ${option1 ? "red-bg" : null}`}
          onClick={() => {
            setOption1(true);
            setOption2(false);
            setOption3(false);
          }}
        >
          General Bonus
        </div>
        <div
          className={`option2 ${option2 ? "red-bg" : null}`}
          onClick={() => {
            setOption2(true);
            setOption1(false);
            setOption3(false);
          }}
        >
          Assign bonus to particular Products
        </div>
        <div
          className={`option3 ${option3 ? "red-bg" : null}`}
          onClick={() => {
            setOption2(false);
            setOption1(false);
            setOption3(true);
          }}
        >
          Assign bonus to a particular product
        </div>
      </div>
      {option1 && (
        <div className="option-box box1-option">
          <div className="title-addbox2">Bonus Title</div>
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
                id="title-input"
                placeholder="Type bonus title here"
                onChange={(e) => {
                  setSelectedOptionother(e.target.value);
                }}
              />
            </div>
          ) : null}
          <div className="value">
            <div className="title-addbox2">Bonus Value</div>
            <input
              type="text"
              id="title-input"
              className="value-input"
              placeholder="Enter Bonus Value"
              onChange={(e) => {
                setValue(e.target.value);
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
                <div className="title-addbox2">Bonus Value</div>
                <p>{value}</p>
              </div>
              <div className="bon-c">
                <div className="title-addbox2">Bonus code</div>
                <p>{coupon}</p>
              </div>
              <div className="bon-D">
                <div className="title-addbox2">Bonus Duration</div>
                <p>{endDate}</p>
              </div>
              <div className="bon-id">
                <div className="title-addbox2">Product ids</div>
                <p>All products selected</p>
              </div>
              <button className="preview">Apply Bonus</button>
            </div>
          )}
        </div>
      )}
      {option2 && (
        <div className="option-box">
          <div className="swiping-box-container">
            <div className="swipping-box">
              <div className="product-select">
                <div className="p-img">
                  <img src={me} alt="" />
                </div>
                <div className="product-id">
                  <p> Product ID: pdt123</p>
                  <label htmlFor="pdt123">
                    <input type="checkbox" />
                    add to list
                  </label>
                </div>
                  </div>
              <div className="product-select">
                <div className="p-img">
                  <img src={me} alt="" />
                </div>
                <div className="product-id">
                  <p> Product ID: pdt123</p>
                  <label htmlFor="pdt123">
                    <input type="checkbox" />
                    add to list
                  </label>
                </div>
                  </div>
            </div>
          </div>
        </div>
      )}
      {option3 && (
        <div className="option-box">
          <div className="swiping-box-container">
            <div className="swipping-box">
              <div className="product-select">
                <div className="p-img">
                  <img src={me} alt="" />
                </div>
                <div className="product-id">
                  <p> Product ID: pdt123</p>
                  <label htmlFor="pdt123">
                    <input type="checkbox" />
                    add to list
                  </label>
                </div>
                  </div>
              <div className="product-select">
                <div className="p-img">
                  <img src={me} alt="" />
                </div>
                <div className="product-id">
                  <p> Product ID: pdt123</p>
                  <label htmlFor="pdt123">
                    <input type="checkbox" />
                    add to list
                  </label>
                </div>
                  </div>
              <div className="product-select">
                <div className="p-img">
                  <img src={me} alt="" />
                </div>
                <div className="product-id">
                  <p> Product ID: pdt123</p>
                  <label htmlFor="pdt123">
                    <input type="checkbox" />
                    add to list
                  </label>
                </div>
                  </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bonus;
