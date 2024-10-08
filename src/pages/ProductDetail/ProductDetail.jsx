import  { useState,useContext } from "react";
import './ProductDetail.css'
import PageDetail from "../../components/PageAlert/PageDetail";
import { useLocation, useNavigate } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import img from '../../assets/images/bf.jpeg'
import { format as timeAgo } from 'timeago.js';
import moment from "moment";
import { FaStar } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { productContext } from "../../context/productContext";

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(<FaStar className="staricon" />);
    }
    return stars;
  };

  const formatDate = (datesent) => {
    const time = new Date(datesent);
    const now = new Date();

    if (now - time >= 24 * 60 * 60 * 1000) {
      return moment(time).format('DD/MM/YYYY');
    } else {
      return timeAgo(time);
    }
  };


function ProductDetail() {
  const location = useLocation();
  const routeTo = useNavigate();
  const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

  const { state } = location;
  const { id, car_model,category,product_name,images,fit_position, description,car_brand,make_material,category_brand,wheel_size,fitment,quantity_left,price,reviews } = state;
  
   const { setProducts} = useContext(productContext);

  function gotoproducts() {
    routeTo("/products/list");
  }

  function routeToEditPage() {
    routeTo('/product-edit', {state: state});
  }

   const handleDeleteProduct = async () => {
     setIsLoading(true);
     const productId = { id: state.id };
     try {
       await axios.post(
         `https://yotaperformanceshop.com/yps_server/admin/delete_product`,
         productId
       );
       setProducts((prevProducts) =>
         prevProducts.filter((item) => item.id !== id)
       );
       setIsLoading(false);
        window.location.reload();
        gotoproducts();
     } catch (error) {
       console.error("Error deleting data:", error);
       setLoading(false);
        gotoproducts();
     }
   };
  return (
    <div className="home-container product-details">
      <PageDetail page={"product detail"} />
      {isLoading && <Loader message={"Deleting product..."} />}

      <div className="product-detail-wrapper">
        <div className="dt">
          <div className="detail-part1">
            <div className="imagges">
              Product Name
              <div className="selected-images text">{product_name}</div>
            </div>

            <div className="imagges">
              selected images
              <div className="selected-images imageconn">
                {images.map((image) => {
                  console.log(image);
                  return <img src={image} alt={`${image}`} key={image}/>;
                })}
              </div>
            </div>

            <div className="imagges">
              Car Brand
              <div className="selected-images text"> {car_brand}</div>
            </div>
            <div className="imagges">
              Car Model
              <div className="selected-images text"> {car_model}</div>
            </div>
            <div className="imagges">
              Make Material
              <div className="selected-images text">{make_material}</div>
            </div>
            <div className="imagges">
              Category
              <div className="selected-images text">{category}</div>
            </div>
          </div>
          <div className="detail-part2 pd2">
            <div className="imagges">
              Category Brand
              <div className="selected-images text">
                {" "}
                {category_brand ? category_brand : "not wheel"}
              </div>
            </div>
            <div className="imagges">
              Wheel Size
              <div className="selected-images text">{wheel_size}</div>
            </div>

            <div className="imagges">
              Fit-Position
              <div className="selected-images text">{fit_position}</div>
            </div>

            <div className="imagges">
              Fitment
              <div className="selected-images text">{fitment}</div>
            </div>
            <div className="imagges">
              Price
              <div className="selected-images text"> {price}</div>
            </div>
            <div className="imagges">
              Quantity
              <div className="selected-images text"> {quantity_left}</div>
            </div>
          </div>
        </div>
        <div className="imagges pdd">
          <h3>Description</h3>
          <div className="selected-images Description "> {description}</div>
        </div>
        <div className={`productReviews ${open ? "open" : "close"}`}>
          <div className="productReview">Reviews</div>

          <div className="plus">
            <BsPlus
              className="plusDrop"
              onClick={() => {
                setOpen(!open);
              }}
            />
          </div>
          <div className="actual-product-reviews">
            {reviews.map((review, index) => (
              <div className="timeline-item" key={index}>
                <div className="pic-review">
                  {" "}
                  <img src={img} alt="" />
                </div>
                <div className="timeline-content">
                  <div className="timeline-date">
                    {formatDate(review.createdAt)}
                  </div>
                  {renderStars(review.user_rating)}
                  <div className="timeline-description">{review.user_text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="editbtn" onClick={routeToEditPage}>
          <FaEdit />
        </button>
        <button
          className="deletebtn"
          onClick={() => {
            handleDeleteProduct();
          }}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
