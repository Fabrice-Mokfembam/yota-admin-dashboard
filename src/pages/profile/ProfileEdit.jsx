import React from 'react';
import './profile.css';
import PageDetail from '../../components/PageAlert/PageDetail.jsx';
import avatar from '../../assets/images/avatar.jpeg'
const page = "Edit Profile";

function ProfileEdit() {
  return (
    <div className="home-container">
      {/* <PageDetail page={page} /> */}
      <div className="profile-container">
        <div className="profile-header">
          <h1>Edit Profile</h1>
        </div>
        <div className="profile-content">
          <div className="profile-picture">
            <img src={avatar} alt="Profile" />
            <button className="change-picture-btn">Change Picture</button>
          </div>
          <form className="profile-form">
            <div className="profile-field">
              <label>Full Name</label>
              <input type="text" placeholder="Onam Sarker" />
            </div>
            <div className="profile-field">
              <label>Email</label>
              <input type="email" placeholder="onamsarker@gmail.com" />
            </div>
            <div className="profile-field">
              <label>Password</label>
              <input type="password" placeholder="******" />
            </div>
            <div className="profile-field">
              <label>Confirm Password</label>
              <input type="password" placeholder="******" />
            </div>
            <button type="submit" className="save-changes-btn">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
