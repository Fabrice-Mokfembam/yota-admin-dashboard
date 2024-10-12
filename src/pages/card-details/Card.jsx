import "./Card.css";
import PageDetail from "../../components/PageAlert/PageDetail.jsx";
import code from "../../assets/images/chip.png";
import icon from "../../assets/images/money.png";

const page = "Card-Details";

function Card({ cards }) {
  return (
    <div className="home-container">
      <PageDetail page={page} />
      <div className="card-main-container">
        {cards.length === 0 ? (
          <div className="no-cards">No card details available</div>
        ) : (
          cards.map((item) =>
            item.CerditCardDetails.map((itemd) => (
              <div className="card-container" key={itemd.cardNumber}>
                <div className="flex-cvv-date">
                  <div className="expiry-date">{itemd.expiryDate}</div>
                  <div className="cvv">{itemd.cvv}</div>
                </div>
                <div className="code-pic">
                  <img src={code} alt="chip" />
                </div>
                <div className="card-number">{itemd.cardNumber}</div>
                <div className="card-holder-icon">
                  <div className="holder-name">{itemd.cardHolderName}</div>
                  <div className="icon-container">
                    <img src={icon} alt="money" />
                  </div>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
}

export default Card;
