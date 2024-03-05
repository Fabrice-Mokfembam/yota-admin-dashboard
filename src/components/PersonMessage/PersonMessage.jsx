import React, { useState } from "react";
import "./PersonMessage.css";
import me from "../../assets/images/remix1.jpg";
import { IoIosSend } from "react-icons/io";
import { MdOutlineAttachFile } from "react-icons/md";
import { useLocation } from "react-router-dom";

function PersonMessage() {
  const location = useLocation();
  const { state } = location;

  const [adminID, setAdminID] = useState("admin123");
    const [text, setText] = useState('');


 async function sendMessage() {
    const body = {
      sender: adminID,
	    text,
   }
   
   state.messages.push(body);
   
    try {
      await axios.put(`http://localhost:5000/update/messages/${state._id}/add`, body);
      console.log('successful sending of message', state._id,body);
    } catch (error) {
      console.log(error);
   }
   
   setText('');
  }

  console.log(state);
  return (
    <div className="messages-container pp-ms-container">
      <div className="person-chat-open-detail">
        <div className="each-person chat-opened">
          <div className="person-img chat-opened-img">
            <img src={me} alt="" />
          </div>
          <div className="details-person chat-name">
            <div className="name">{state.username}</div>
          </div>
        </div>
      </div>
      <div className="chat-opened-box">
        {state.messages.map((message) =>
          message.sender === adminID ? (
            <div className="sender-message">
              <p> {message.text}</p>
            </div>
          ) : (
            <div className="receiver-message">
              <p> {message.text}</p>
            </div>
          )
        )}
      </div>
      <div className="textarea-chat-box">
        <MdOutlineAttachFile className="ch-icon" />
        <input
          type="area"
          className="chat-input"
          placeholder="Type a Message"
          value={text}
          onChange={(e)=>{setText(e.target.value)}}
        />
        <IoIosSend className="ch-icon" onClick={sendMessage}/>
      </div>
    </div>
  );
}

export default PersonMessage;
