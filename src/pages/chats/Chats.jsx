import React from "react";
import "./Chats.css";
import PageDetail from "../../components/PageAlert/PageDetail";

function Chats() {
  const chats = "Chats";

  return (
    <div className="home-container">
      <PageDetail page={chats} />
      <div className="chatbox no-messages-container">
        <div className="no-messages">No messages available</div>
      </div>
    </div>
  );
}

export default Chats;
