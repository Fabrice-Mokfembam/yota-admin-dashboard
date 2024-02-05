import React from "react";
import "./Review.css";
import PageDetail from "../../components/PageAlert/PageDetail";
import img from '../../assets/images/bf.jpeg'
import { FaStar } from 'react-icons/fa';

function Reviews() {

 const reviews = [
  {
    date: "2024-06-30",
    heading: "Corolla",
    rating: 6,
    description: "The engine performance of this Corolla is exceptional, delivering an exhilarating driving experience."
  },
  {
    date: "2024-02-15",
    heading: "Cammry",
    rating: 4,
    description: "The Cammry's suspension system provides a smooth and comfortable ride, making every journey enjoyable."
  },
  {
    date: "2013-05-25",
    heading: "Camrry",
    rating: 2,
    description: "Although the Camrry's fuel efficiency is commendable, the spacious interior steals the show with its comfort."
  },
  {
    date: "2022-12-20",
    heading: "Corolla",
    rating: 5,
    description: "With its advanced safety features, the Corolla instills confidence and ensures peace of mind on the road."
  },
];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(<FaStar className="staricon"/>);
    }
    return stars;
  };

  const review = "Reviews";

  return (
    <div className="home-container">
      <PageDetail page={review} />

      <div className="timeline">   
        {reviews.map((review, index) => (
          <div className="timeline-item" key={index}>
            <div className="pic-review"> <img src={img} alt="" /></div>
            <div className="timeline-content">
              <div className="timeline-date">{review.date}</div>
              <div className="timeline-heading">{review.heading}</div>
              {renderStars(review.rating)}
              <div className="timeline-description">{review.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;