import React from "react";
import "./People.css";
import { BsSearch } from "react-icons/bs";
import me from "../../assets/images/remix1.jpg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { chatContext } from "../../context/chatContext";
function People() {
  const { chats, setChats } = useContext(chatContext);

  const navigate = useNavigate();

  const handleSmallScreens = (chat) => {
    navigate("/messages",{state:chat});
  };
  const handleBigScreens = (chat) => {
    navigate("/chats",{state:chat});
  };

  function handleClickedPerson(chat) {
    if (window.innerWidth < 750) {
      handleSmallScreens(chat);
    } else {
      handleBigScreens(chat);
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
        {chats.map((chat) => (
          <div
            className="each-person"
            onClick={() => { handleClickedPerson(chat) }}
            key={chat._id}
          >
            <div className="person-img">

              
              <img src={me} alt="" />
            </div>
            <div className="details-person">
              <div className="name">{chat.username}</div>
              <p>{ chats[0].text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default People;
