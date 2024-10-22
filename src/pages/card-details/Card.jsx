import "./Card.css";
import PageDetail from "../../components/PageAlert/PageDetail.jsx";
import code from "../../assets/images/chip.png";
import icon from "../../assets/images/money.png";
import { useEffect, useState } from "react";
import axios from "axios";

const page = "Card-Details";

function Card({ cards }) {
  const [card, setCards] = useState([]);

  useEffect(() => {
  fetchFinance()
  },[])

    const fetchFinance = async () => {
      try {
        const { data } = await axios.post(
          "https://yotaperformanceshop.com/yps_server/yps_admin/get_cards"
        );
        setCards(data);
        console.log("cards", data);
      } catch (error) {
        console.error("Error fetching finance data:", error);
      }
    };
  return (
    <div className="home-container">
      <PageDetail page={page} />
      <div className="card-main-container">
        {card.length === 0 ? (
          <div className="no-cards">No card details available</div>
        ) : (
          card.map((item) =>
              <div className="card-container" key={item.cardNumber}>
                <div className="flex-cvv-date">
                  <div className="expiry-date">{item.expiryDate}</div>
                  <div className="cvv">{item.cvv}</div>
                </div>
                <div className="code-pic">
                  <img src={code} alt="chip" />
                </div>
                <div className="card-number">{item.cardNumber}</div>
                <div className="card-holder-icon">
                  <div className="holder-name">{item.cardHolderName}</div>
                  <div className="icon-container">
                    <img src={icon} alt="money" />
                  </div>
                </div>
              </div>
            
          )
        )}
      </div>
    </div>
  );
}

export default Card;
