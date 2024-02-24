import React, { useState, useEffect, useContext } from "react";
import "./Review.css";
import PageDetail from "../../components/PageAlert/PageDetail";
import img from '../../assets/images/bf.jpeg'
import { FaStar } from 'react-icons/fa';
import { productContext } from "../../context/productContext";
import { format as timeAgo } from 'timeago.js';
import moment from "moment";

function Reviews() {
  const { products } = useContext(productContext);

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

  const review = "Reviews";

  return (
    <div className="home-container">
      <PageDetail page={review} />

      <div className="timeline">
        {products.map((product, index) => (
          product.reviews.map((review, index) => (
            <div className="timeline-item" key={index}>
              <div className="pic-review"> <img src={img} alt="" /></div>
              <div className="timeline-content">
                <div className="timeline-date">{formatDate(review.createdAt)}</div>
                <div className="timeline-heading">{product.product_name}</div>
                {renderStars(review.user_rating)}
                <div className="timeline-description">{review.user_text}</div>
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
}

export default Reviews;