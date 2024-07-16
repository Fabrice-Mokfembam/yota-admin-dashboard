import React, { useState } from "react";
import "./sidebar.css";
import { NavLink,Link } from "react-router-dom";

import { BsHouseDoor, BsFillArchiveFill, BsFillChatSquareTextFill, BsListUl, BsGearFill, BsCardChecklist } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";

function Sidebar({ sidebarRef }) {
  const [isProductActive, setIsProductActive] = useState(false);

  return (
    <div ref={sidebarRef} className="sidebar-container">
      <div className="title">Dashboard</div>

      <nav className="sidebar-navigation-items">
        <ul className="list-items">
          <li>
            <NavLink exact='true' to="/" activeClassName="active">
              <BsHouseDoor className="sidebar-icons" /> Home
            </NavLink>
          </li>
          <li
            onClick={() => {
              setIsProductActive(!isProductActive);
            }}
          >
            <Link  activeClassName="active">
              <BsFillArchiveFill className="sidebar-icons" /> Products
              <BsArrowRight
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
            <div className={`product-dropdown `}>
              <ul>
                <li>
                  <NavLink to="/products/list" activeClassName="active">
                    <BsListUl className="sidebar-icons" /> Product List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products/add-product"
                    activeClassName="active"
                  >
                    <BsListUl className="sidebar-icons" /> Add Products
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          <li>
            <NavLink to="/orders" activeClassName="active">
              <BsFillArchiveFill className="sidebar-icons" /> Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/chats" activeClassName="active">
              <BsFillChatSquareTextFill className="sidebar-icons" /> Messages
            </NavLink>
          </li>
          <li>
            <NavLink to="/bonuses" activeClassName="active">
              <BsGearFill className="sidebar-icons" /> Bonus Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/card-details" activeClassName="active">
              <BsCardChecklist className="sidebar-icons" /> Card Details
            </NavLink>
          </li>
          <li>
            <NavLink to="/Reviews" activeClassName="active">
              <MdRateReview className="sidebar-icons" /> Reviews
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;