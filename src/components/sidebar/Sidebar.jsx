import React, { useState } from "react";
import "./sidebar.css";
import { NavLink, Link } from "react-router-dom";

// Importing new icons from React Icons
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineMessage, AiOutlineRight, AiOutlineSetting, AiOutlineCreditCard } from "react-icons/ai";
import { FiBox, FiList, FiUsers, FiArrowRight } from "react-icons/fi";

function Sidebar({ sidebarRef }) {
  const [isProductActive, setIsProductActive] = useState(false);

  return (
    <div ref={sidebarRef} className="sidebar-container">
      <div className="title">Dashboard</div>

      <nav className="sidebar-navigation-items">
        <ul className="list-items">
          <li>
            <NavLink exact='true' to="/" activeClassName="active">
              <AiOutlineHome className="sidebar-icons" /> Home
            </NavLink>
          </li>
          <li
            onClick={() => {
              setIsProductActive(!isProductActive);
            }}
          >
            <Link  activeClassName="active">
              <FiBox className="sidebar-icons" /> Products
              <AiOutlineRight
                onClick={() => {
                  setIsProductActive(!isProductActive);
                }}
                className={`arrow-icon ${
                  isProductActive ? "rotate-arrow" : null
                }`}
              />
            </Link>
          </li>
          {isProductActive && (
            <div className={`product-dropdown`}>
              <ul>
                <li>
                  <NavLink to="/products/list" activeClassName="active">
                    <FiList className="sidebar-icons" /> Product List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products/add-product"
                    activeClassName="active"
                  >
                    <FiList className="sidebar-icons" /> Add Products
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          <li>
            <NavLink to="/orders" activeClassName="active">
              <AiOutlineShoppingCart className="sidebar-icons" /> Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/chats" activeClassName="active">
              <AiOutlineMessage className="sidebar-icons" /> Messages
            </NavLink>
          </li>
          <li>
            <NavLink to="/bonuses" activeClassName="active">
              <AiOutlineSetting className="sidebar-icons" /> Bonus Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/card-details" activeClassName="active">
              <AiOutlineCreditCard className="sidebar-icons" /> Card Details
            </NavLink>
          </li>
          <li>
            <NavLink to="/customers" activeClassName="active">
              <FiUsers className="sidebar-icons" /> Customers
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
