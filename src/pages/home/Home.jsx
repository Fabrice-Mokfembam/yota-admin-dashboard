import React from 'react'
import './Home.css'
import { MdOutlineProductionQuantityLimits } from "react-icons/md"
import img from '../../assets/images/remix1.jpg'

import PageDetail from '../../components/PageAlert/PageDetail'

function Home() {
  return (
    <div className='home-container'>
      <PageDetail />    
      <div className='title-page'>
          Analytic overview
      </div>
      <div className="grid-box-container">
        <div className="box bf box1">
          <h2>203</h2>
          <h3> Total Products </h3>
          <div>
            <h4>view all</h4>
            <MdOutlineProductionQuantityLimits className='box-icons'/>
          </div>
         </div>
        <div className="box bf box2">
            <h2>5678</h2>
          <h3> Totat orders </h3>
          <div>
            <h4>view all</h4>
            <MdOutlineProductionQuantityLimits className='box-icons'/>  
          </div>
          </div>
        <div className="box bf box3">
            <h2>150</h2>
          <h3> Total customers </h3>
          <div>
            <h4>view all</h4>
            <MdOutlineProductionQuantityLimits className='box-icons'/>  
          </div>
          </div>
        <div className="box box4">
          <h4>Reviews</h4>
          <div className="review-container">
            <div className="review-img-container">
              <img src={img} alt="" />
            </div>
            <div className="review-text">
              The products have been awesome and really good. they are rich in quality
            </div>
          </div>
           <div className="read-all-container"> Read all</div>
         </div>
         <div className="box box5"></div>
      </div>
    </div>
  )
}

export default Home
