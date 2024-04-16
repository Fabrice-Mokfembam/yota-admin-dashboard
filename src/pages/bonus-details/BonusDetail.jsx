import React from "react";
import PageDetail from "../../components/PageAlert/PageDetail";
import './GeneralBonus.css'
import { useNavigate } from "react-router-dom";

function BonusDetail() {
    const routeTo = useNavigate();

    function gotoBonusEdit() {
        routeTo('/bonus-edit')
    }
  return (
    <div className="home-container product-details">
      <PageDetail page={"bonus-detail"} />

      <div className="product-detail-wrapper">
        <div className="dt">
          <div className="detail-part1">
            <div className="imagges">
              Bonus Title
              <div className="selected-images">Black Friday</div>
            </div>

            <div className="imagges">
              Bonus Value
              <div className="selected-images"> 10%</div>
            </div>

            <div className="imagges">
              Bonus code
              <div className="selected-images">placeholder</div>
            </div>
          </div>
          <div className="detail-part2 pd2">
            <div className="imagges">
              End-Date
              <div className="selected-images">24/12/2024</div>
            </div>

            
          </div>
        </div>
        <div className="imagges bonus-detail">
          Products Assigned Bonus
          <div className="selected-images"></div>
        </div>
         {/* <div className="imagges">
            Items
              <div className="selected-images"> {state.items.map(item => {
                return (
                  <div>
                  <div>{ item.product_id}</div>
                  <div>{ item.quantities}</div>
                    <div>{item.price}</div>
                    </div>
              )
            })}</div>
          </div> */}
          </div>
          <button className="bonusEditbtn" onClick={gotoBonusEdit}> Edit </button>
          {/* <button className="bonusDeletebtn" > delete </button> */}
    </div>
  );
}

export default BonusDetail;
