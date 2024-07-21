import React, { useContext, useEffect, useState } from "react";
import PageDetail from "../../components/PageAlert/PageDetail";
import "./GeneralBonus.css";
import { useNavigate, useLocation } from "react-router-dom";
import { productContext } from "../../context/productContext";

function BonusDetail() {
  const routeTo = useNavigate();
  const { state } = useLocation();
  const [bonusProducts, setBonusProducts] = useState([]);
  const { products } = useContext(productContext);

  useEffect(() => {
    if (state.code) {
      console.log('coupon')
    } else {
      
      const array = state.product_ids.flatMap((id) => {
        return products.filter((product) => product.id === id);
      });
      setBonusProducts((prevArray) => [...prevArray, ...array]);
      console.log("Bonus Products:", array);
    }
  }, [products]);

  function gotoBonusEdit() {
    routeTo("/bonus-edit", { state: state, pdt: bonusProducts });
  }

  return (
    <div className="home-container product-details">
      <PageDetail page={"bonus-detail"} />

      <div className="product-detail-wrapper">
        <div className="dt">
          <div className="detail-part1">
            <div className="imagges">
              Bonus Title
              <div className="selected-images">{state.bonus_name}</div>
            </div>

            <div className="imagges">
              Bonus Type
              <div className="selected-images">{state.bonus_type}</div>
            </div>

            <div className="imagges">
              Bonus Value
              <div className="selected-images"> {state.value}</div>
            </div>

            <div className="imagges">
              Type
              <div className="selected-images"> {state.type}</div>
            </div>

            {state.code ? (
              <div className="imagges">
                Bonus code
                <div className="selected-images">{state.code}</div>
              </div>
            ) : null}
          </div>
          <div className="detail-part2 pd2">
            <div className="imagges">
              End-Date
              <div className="selected-images">{state.endDate}</div>
            </div>
          </div>
        </div>
        <div className="imagges bonus-detail">
          Products Assigned Bonus
          {bonusProducts.length > 0 ? (
            bonusProducts.map((product, index) => (
              <div className="selected-images" key={index}>
                {product.images.map((item, imgIndex) => (
                  <img key={imgIndex} src={item} alt="" />
                ))}
              </div>
            ))
          ) : (
            <div>No products assigned</div>
          )}
        </div>
      </div>
      <button className="bonusEditbtn" onClick={gotoBonusEdit}>
        Edit
      </button>
      {/* <button className="bonusDeletebtn" > delete </button> */}
    </div>
  );
}

export default BonusDetail;
