import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";

import { IoHome } from "react-icons/io5";
import { BsArchive, BsChatSquareTextFill } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { FcViewDetails } from "react-icons/fc";
import { FaServicestack } from "react-icons/fa";
import { useRef, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { MdOutlineReviews } from "react-icons/md";

function Sidebar({ sidebarRef}) {
  const [isProductActive, setIsProductActive] = useState(false);
 

  return (
    <div ref={sidebarRef} className="sidebar-container">
      <div className="title">Dashboard</div>

      <nav className="sidebar-navigation-items">
        <ul className="list-items">
          <li>
            <NavLink exact to="/" activeClassName="active">
              <IoHome className="sidebar-icons" /> Home
            </NavLink>
          </li>
          <li
            onClick={() => {
              setIsProductActive(!isProductActive);
            }}
          >
            <NavLink to="/products" activeClassName="active">
              <FaServicestack className="sidebar-icons" /> Products
              <SlArrowRight
                onClick={() => {
                  setIsProductActive(!isProductActive);
                }}
                className={`arrow-icon ${isProductActive? 'rotate-arrow': null}`}
              />
            </NavLink>
          </li>
          {isProductActive && (
            <div className={`product-dropdown `}>
              <ul>
                <li>
                  <NavLink to="/products/list" activeClassName="active">Product List</NavLink>
                </li>
                <li>
                  <NavLink to="/products/add-product" activeClassName="active">Add Products</NavLink>
                </li>
              </ul>
            </div>
          )}
          <li>
            <NavLink to="/orders" activeClassName="active">
              <BsArchive className="sidebar-icons" /> Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/chats" activeClassName="active">
              <BsChatSquareTextFill className="sidebar-icons" /> Messages
            </NavLink>
          </li>
          <li>
            <NavLink to="/bonus-settings" activeClassName="active">
              <CiSettings className="sidebar-icons" /> Bonus Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/card-details" activeClassName="active">
              <FcViewDetails className="sidebar-icons" /> Card Details
            </NavLink>
          </li>
          <li>
            <NavLink to="/Reviews" activeClassName="active">
              <MdOutlineReviews className="sidebar-icons"/> Reviews
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
