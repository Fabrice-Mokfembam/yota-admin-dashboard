import React from 'react'
import PageDetail from '../../components/PageAlert/PageDetail'
import img from '../../assets/images/tes2.jpg'
import './Customer.css'
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { useContext } from 'react';
import { userContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';



function Customer() {
  const { users } = useContext(userContext);
  const routeTo = useNavigate();

  function createAchat() {

    if (window.innerWidth < 750) {
      routeTo('/messages');
    } else {
      routeTo('/chats');
    }
    
  }

  return (
    <div className='home-container main-customer-container'>
      <PageDetail page={'customers'} />
      
      <div className="customers">
        {users.map(user => (
          <div className="each_customer">
          <div className="c_pic">
            <img src={img} alt="image of thiago" />
          </div>
          <div className="c_info">
              <h3>{user.username}</h3>
              <div className="email_c">{ user.email}</div>
          </div>
              <BsFillChatSquareTextFill className="c_icons" />   
        </div>
        ))}
      </div>
    </div>
  )
}

export default Customer
