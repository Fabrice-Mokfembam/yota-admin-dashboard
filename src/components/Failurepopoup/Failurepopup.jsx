import "./failurepopup.css";
import errorimg from "../../assets/images/error.png";

function Failurepopup({ onClose }) {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <img src={errorimg} alt="Failure" />
        <p>Unsuccessful operation!</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default Failurepopup;
