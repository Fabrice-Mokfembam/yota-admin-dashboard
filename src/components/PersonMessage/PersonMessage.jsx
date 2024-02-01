import React from 'react'
import './PersonMessage.css'
import me from '../../assets/images/remix1.jpg'
import { IoIosSend } from "react-icons/io";
import { MdOutlineAttachFile } from "react-icons/md";

function PersonMessage() {
  return (
    <div className='messages-container pp-ms-container'>
      <div className="person-chat-open-detail">
        <div className="each-person chat-opened">
                  <div className="person-img chat-opened-img">
                      <img src={me} alt="" />
                  </div>
                  <div className="details-person chat-name">
                      <div className="name">Thiago Alcantara</div>
                  </div>
              </div>
      </div>
      <div className='chat-opened-box'>
        <div className="sender-message">
             <p> Hey, good morning, how are yoou</p>
         </div>
        <div className="receiver-message">
             <p> Good morning,how far, are you in the right state of mine</p>
         </div>
      </div>
      <div className="textarea-chat-box">
        <MdOutlineAttachFile className='ch-icon'/>
        <input type="area" className='chat-input' placeholder='Type a Message' />
        <IoIosSend className='ch-icon'/>
      </div>
    </div>
  )
}

export default PersonMessage;
