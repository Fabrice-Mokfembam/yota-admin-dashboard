import React from 'react'
import './header.css'
import me from '../../assets/images/remix1.jpg'

import { IoNotificationsOutline } from 'react-icons/io5'
import { BsSearch } from 'react-icons/bs'

import { GiHamburgerMenu } from 'react-icons/gi'
import { BiX } from 'react-icons/bi'


function Header({showSidebar,hamRef,xRef}) {
  return (
    <div className='Header-container'>
          <div className="logo-container">
              
          </div>
          <div className="nav-icons">
              <div className="search-header-container">
                  <div className="input-header-container">
                      <input type="text" id='input-1' />
                      <BsSearch className='icons search'/>
                  </div>
              </div>
              <div className="notification-container">
                  <IoNotificationsOutline className='icons notification-icon'/>
                  <span>1</span>
              </div>
              <div className="profile-header-container">
                  <div className='image-header-container'>
                      <img id='admin-img' src={me} alt="AdminImage" />
                  </div>
                  <div className="profile-name">
                      <span>Ludwig</span>
                  </div>
              </div>
              <div className="hamburger-container " ref={hamRef} onClick={showSidebar}>
                  <GiHamburgerMenu className='icons hamburger '/>
              </div>
              <div className="menuX-container  " ref={xRef} onClick={showSidebar}>
                  <BiX className='icons menuX'/>
              </div>
              
          </div>
    </div>
  )
}

export default Header
