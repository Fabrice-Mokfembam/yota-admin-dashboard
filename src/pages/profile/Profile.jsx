import React from 'react';
import './profile.css';
import PageDetail from '../../components/PageAlert/PageDetail.jsx';
import { BsPlus } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import avatar from '../../assets/images/avatar.jpeg'

const page = "Profile";

function Profile() {
    const routeTo = useNavigate();

    function routeToProfileEdit() {
      routeTo("/profileEdit");
  }
  return (
    <div className="home-container">
      <PageDetail page={page} />
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
        </div>
         <div className="profile-picture">
            <img src={avatar} alt="Profile" />
          </div>
        <div className="profile-content">
          <div className="profile-details">
            <div className="profile-field">
              <label>Full Name</label>
              <p>Obmipotem Thiago</p>
            </div>
            <div className="profile-field">
              <label>Email</label>
              <p>obmipotemthiago@gmail.com</p>
            </div>
            <div className="profile-field">
              <label>Admin Type</label>
              <p>Super Admin</p>
            </div>
          </div>
        </div>
         <div className="addButton" onClick={routeToProfileEdit}>
        <BsPlus className="plusIcon" />
      </div>
      </div>
    </div>
  );
}

export default Profile;
