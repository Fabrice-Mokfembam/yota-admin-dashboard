import React from 'react'
import './home.css'
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
      <div className="home-main-container">
        <div className="home-div1">
          <div className="data-boxes">
            <div className="box1 product-box">
              <div className="number">3567</div>
              <div className="product">Products</div>
              <div className="view-icon">
                <div className='view'> view</div>
                <div className="icon"> <MdOutlineProductionQuantityLimits className='icon-home'/> </div>
              </div>
            </div>

            <div className="box1 customer-box">
              <div className="number">103</div>
              <div className="product">Customers</div>
              <div className="view-icon">
                <div className='view'> view</div>
                <div className="icon"> <MdOutlineProductionQuantityLimits className='icon-home'/> </div>
              </div>
            </div>

            <div className="box1 order-box">
              <div className="number">356</div>
              <div className="product">Orders</div>
              <div className="view-icon">
                <div className='view'> view</div>
                <div className="icon"> <MdOutlineProductionQuantityLimits className='icon-home'/> </div>
              </div>
            </div>
           
          </div>

          <div className="graph-box">
            graph
          </div>
        </div>
        <div className="home-div2">
          <div className="review-highlight">
            <div className="review-container">
              <div className="iner">
                 <img src={img} alt="" />
              </div>
              <div className="info-h-container">
                <p>02/11/2034</p>
                <div className="review-text">
                  The iphone x is great phone. its features are spectacular
                </div>
              </div>
            </div>
            <div className="review-container">
              <div className="iner">
                 <img src={img} alt="" />
              </div>
              <div className="info-h-container">
                <p>02/11/2034</p>
                <div className="review-text">
                  The iphone x is great phone. its features are spectacular
                </div>
              </div>
            </div>
            <div className="review-container">
              <div className="iner">
                 <img src={img} alt="" />
              </div>
              <div className="info-h-container">
                <p>02/11/2034</p>
                <div className="review-text">
                  The iphone x is great phone. its features are spectacular
                </div>
              </div>
            </div>
             <div className="rdmore">Read more</div>
          </div>
          
        </div>
       
    </div>
    </div>
  )
}

export default Home
