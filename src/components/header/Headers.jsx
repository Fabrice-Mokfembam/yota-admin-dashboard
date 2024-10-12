import "./header.css";
import me from "../../assets/images/avatar.jpeg";
import loadsvg from "../../assets/images/load.svg";

import { IoNotificationsOutline } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";

import { GiHamburgerMenu } from "react-icons/gi";
import { BiX } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Header({ showSidebar, hamRef, xRef }) {
  const routeto = useNavigate();
  const [isInputActive, setInputActive] = useState(null); 

  function gotoProfile() {
    routeto("/profile");
  }

  function gotoproducts() {
    // Navigate to products and disable the input field
    routeto("/products");
    setInputActive(true);

    setTimeout(() => {
      setInputActive(false)
    },1000)
  }

  return (
    <div className="Header-container">
      <div className="logo-container">
        <img src={loadsvg} alt="logo" width="58%" />
      </div>
      <div className="nav-icons">
        <div className="search-header-container">
          <div className="input-header-container">
            <input
              type="text"
              placeholder="search available products"
              id="input-1"
              onClick={gotoproducts}
              disabled={isInputActive} // Disable input when not active
            />
            <BsSearch className="icons search" />
          </div>
        </div>
        <div className="notification-container">
          <IoNotificationsOutline className="icons notification-icon" />
          <span>1</span>
        </div>
        <div className="profile-header-container" onClick={gotoProfile}>
          <div className="image-header-container">
            <img id="admin-img" src={me} alt="AdminImage" />
          </div>
          <div className="profile-name">
            <span>Ludwig</span>
          </div>
        </div>
        <div
          className="hamburger-container "
          ref={hamRef}
          onClick={showSidebar}
        >
          <GiHamburgerMenu className="icons hamburger " />
        </div>
        <div className="menuX-container  " ref={xRef} onClick={showSidebar}>
          <BiX className="icons menuX" />
        </div>
      </div>
    </div>
  );
}

export default Header;
