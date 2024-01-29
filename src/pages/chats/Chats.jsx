import React from "react";
import "./Chats.css";

import PageDetail from "../../components/PageAlert/PageDetail";
import People from "../../components/people/People";
import Messages from "../../components/messages/Messages";

function Chats() {
  const chats = "Chats";
  return (
    <div className="home-container">
      <PageDetail page={chats} />
      <div className="chatbox">
        <People />
        <Messages />
      </div>
    </div>
  );
}

export default Chats;
