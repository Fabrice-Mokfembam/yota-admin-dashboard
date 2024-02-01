import React from "react";
import "./People.css";
import { BsSearch } from "react-icons/bs";
import me from "../../assets/images/remix1.jpg";
import { useNavigate } from "react-router-dom";

function People() {
  const navigate = useNavigate();

  const handleSmallScreens = () => {
    navigate("/messages");
  };
  const handleBigScreens = () => {
    navigate("/chats");
  };

  function handleClickedPerson() {
    if (window.innerWidth < 750) {
      handleSmallScreens();
    } else {
      handleBigScreens();
    }
  }
  return (
    <div className="people-container">
      <div className="title-addbox2 people-chat-title">Chats</div>
      <div className="people-search-field">
        <input type="text" className="people-search-input" />
        <BsSearch className="people-search-icon" />
      </div>
      <div className="people-box">
        <div className="each-person" onClick={handleClickedPerson}>
          <div className="person-img">
            <img src={me} alt="" />
          </div>
          <div className="details-person">
            <div className="name">Thiago Alcantara</div>
            <p>i want an exhaust</p>
          </div>
        </div>
        <div className="each-person" onClick={handleClickedPerson}>
          <div className="person-img">
            <img src={me} alt="" />
          </div>
          <div className="details-person">
            <div className="name">Thiago Alcantara</div>
            <p>i want an exhaust</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default People;
