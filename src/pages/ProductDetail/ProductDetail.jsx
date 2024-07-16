import React from "react";
import './ProductDetail.css'
import PageDetail from "../../components/PageAlert/PageDetail";
import { useLocation, useNavigate } from "react-router-dom";

function ProductDetail() {
  const location = useLocation();
  const routeTo = useNavigate();

  const { state } = location;
  const { car_model,category,product_name,images,fit_position, description,car_brand,make_material,category_brand,wheel_size,fitment,quantity_left,price } = state;
  
  console.log(images);
  function routeToEditPage() {
    routeTo('/product-edit', {state: state});
  }
  return (
    <div className="home-container product-details">
      <PageDetail page={"product detail"} />

      <div className="product-detail-wrapper">
        <div className="dt">
        <div className="detail-part1">
          <div className="imagges">
            Product Name
            <div className="selected-images">{product_name}</div>
          </div>

          <div className="imagges">
              selected images
              
             <div className="selected-images">
                {images.map((image) => {
                  console.log(image)
                     return <img src={image} alt="" />;
                    })}
                  </div>
            </div>
            

          <div className="imagges">
            Car Brand
            <div className="selected-images"> {car_brand}</div>
          </div>
          <div className="imagges">
            Car Model
            <div className="selected-images"> {car_model}</div>
          </div>
          <div className="imagges">
            Make Material
            <div className="selected-images">{ make_material}</div>
          </div>
          <div className="imagges">
            Category
            <div className="selected-images">{category}</div>
          </div>
        </div>
        <div className="detail-part2 pd2">
          <div className="imagges">
            Category Brand
            <div className="selected-images"> {category_brand?category_brand:'not wheel'}</div>
          </div>
          <div className="imagges">
            Wheel Size
            <div className="selected-images">{wheel_size}</div>
          </div>

          <div className="imagges">
            Fit-Position
            <div className="selected-images">{fit_position}</div>
          </div>

          <div className="imagges">
            Fitment
            <div className="selected-images">{ fitment}</div>
          </div>
          <div className="imagges">
            Price
            <div className="selected-images"> {price}</div>
          </div>
          <div className="imagges">
            Quantity
            <div className="selected-images"> {quantity_left}</div>
          </div>
        </div>
        </div>
        <div className="imagges pdd">
        <h3>Description</h3>
        <div className="selected-images Description"> {description}</div>
        </div>
        
        <button className="editbtn" onClick={routeToEditPage}> Edit </button>
        <button className="deletebtn" > delete </button>
    </div>
      
    </div>
  );
}

export default ProductDetail;
