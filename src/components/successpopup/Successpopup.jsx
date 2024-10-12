import "./Successpopup.css";
import successimg from "../../assets/images/successIcon.png";

function Successpopup({ onClose }) {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <img src={successimg} alt="Success" />
        <p>Successful operation!</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default Successpopup;
