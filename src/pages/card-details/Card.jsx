import React from "react";
import "./Card.css";
import PageDetail from "../../components/PageAlert/PageDetail.jsx";
import code from "../../assets/images/chip.png";
import icon from "../../assets/images/money.png";

const page = " Card-Details";

function Card() {
  const card = [
    {
      holder: "Thiago A",
      number: "1234 0987 4567 0101",
      cvv: "9876",
      date: "09/25",
    },
    {
      holder: "James Lina",
      number: "0004 7892 9839 3636",
      cvv: "0086",
      date: "09/25",
    },
    {
      holder: "Jon doe",
      number: "1234 0987 4567 0101",
      cvv: "7726",
      date: "03/28",
    },
    {
      holder: "Jane Doe",
      number: "0834 0117 0000 0125",
      cvv: "4567",
      date: "05/24",
    },
  ];
  return (
    <div className="home-container">
      <PageDetail page={page} />
      <div className="card-main-container">
        {card.map((item) => {
          return (
            <div className="card-container">
              <div className="flex-cvv-date">
                <div className="expiry-date">{ item.date}</div>
                <div className="cvv">{item.cvv}</div>
              </div>

              <div className="code-pic">
                <img src={code} alt="" />
              </div>
              <div className="card-number">{item.number}</div>
              <div className="card-holder-icon">
                <div className="holder-name">{item.holder}</div>
                <div className="icon-container">
                  <img src={icon} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
