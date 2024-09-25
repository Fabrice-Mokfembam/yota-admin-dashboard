import React, { useEffect, useState } from "react";
import "./home.css";
import img from "../../assets/images/remix1.jpg";
import PageDetail from "../../components/PageAlert/PageDetail";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { productContext } from "../../context/productContext";
import { userContext } from "../../context/userContext";
import { ordersContext } from "../../context/ordersContext";
import { BsFillPeopleFill, BsList, BsCartFill } from "react-icons/bs";
import { format as timeAgo } from "timeago.js";
import moment from "moment";
import Animation from "../../components/animation/Animation";
import BarChart from "../../components/barChart/BarChart";


// $r->addRoute('POST', '/admin/add_products',function(){
//         AddProducts();
//     });

//     $r->addRoute('GET', '/admin/get_products',function(){
//         AdminGetAllProducts();
//     });

//     $r->addRoute('POST', '/admin/get_product_id',function(){
//         GetProductonID();
//     });
    
//     $r->addRoute('PUT', '/admin/update_product',function(){
//         UpdateProduct();
//     });

//     $r->addRoute('POST', '/admin/add_bonus',function(){
//         AddBonus();
//     });

//     $r->addRoute('POST', '/admin/get_bonus',function(){
//         getBonus();
//     });

//     $r->addRoute('POST', '/admin/get_all
//     _bonus',function(){
//         getBonus();
//     });

const homeReview = [
  {
    createdAt: '04/03/2003',
    user_text: 'This product is top notch, in this era'
  },
  {
    createdAt: '04/03/2033',
    user_text: 'This product is top notch, in this era'
  },
  {
    createdAt: '12/23/2003',
    user_text: 'This product is top notch, in this era'
  },
  {
    createdAt: '05/33/2013',
    user_text:'This product is top notch, in this era'
  },
  {
    createdAt: '09/03/2056',
    user_text:'This product is top notch, in this era'
  }
]


function Home({ reviews }) {
  const { products, setLoading, loading } = useContext(productContext);
  const { users } = useContext(userContext);
  const { orders } = useContext(ordersContext);
  // const [homeReview, setHomeReview] = useState([]);

  const routeTo = useNavigate();

  const routeToProductList = () => {
    routeTo("/products");
  };
  
  const routeToReviews = () => {
    routeTo("/reviews");
  };
  const routeToOrders = () => {
    routeTo("/orders");
  };
  const routeToCustomers = () => {
    routeTo("/customers");
  };

  const formatDate = (datesent) => {
    const date = new Date(datesent);
    const now = new Date();

    if (now - date >= 24 * 60 * 60 * 1000) {
      return moment(date).format("DD/MM/YYYY");
    }
    return timeAgo(date);
  };

  function setRW(rview) {
    rview.forEach((review) => {
      review.reviews.forEach((item) =>
        setHomeReview((current) => [...current, item])
      );
    });
  }
  useEffect(() => {
    setRW(reviews);
  }, []);

  console.log(homeReview);

  const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 3, 5, 2, 3, 8],
        borderColor:'rgba(75,192,192,1)',
      backgroundColor:[ '#9e9798','#f90707',],
    },
  ],
};

  const home = "Home";
  return (
    <div className="home-container">
      {(!products || loading) && <Animation />}
      <PageDetail page={home} />
      <div className="title-page">Analytic overview</div>
      <div className="home-main-container">
        <div className="home-div1">
          <div className="data-boxes">
            <div
              className="box1 product-box"
              onClick={routeToProductList}
            >
              <div className="number">{products.length}</div>
              <div className="product">Products</div>
              <div className="view-icon">
                <div
                  className="view"
                  onClick={routeToProductList}
                >
                  view
                </div>
                <div className="icon">
                  <BsList className="icon-home" />
                </div>
              </div>
            </div>

            <div className="box1 customer-box" onClick={routeToCustomers}>
              <div className="number">{users.length}</div>
              <div className="product">Customers</div>
              <div className="view-icon">
                <div
                  className="view"
                  onClick={routeToCustomers}
                >
                  view
                </div>
                <div className="icon">
                  <BsFillPeopleFill className="icon-home" />
                </div>
              </div>
            </div>

            <div className="box1 order-box" onClick={routeToOrders}>
              <div className="number">{orders.length}</div>
              <div className="product">Orders</div>
              <div className="view-icon">
                <div className="view" onClick={routeToOrders}>
                  view
                </div>
                <div className="icon">
                  <BsCartFill className="icon-home" />
                </div>
              </div>
            </div>
          </div>

          <div className="graph-box">
            <div style={{width:630}}>
            <BarChart chartdata={data}/></div>
          </div>
        </div>
        <div className="home-div2">
          <div className="review-highlight">
            {homeReview.map((item) => {
              return (
                <div className="review-container">
                  <div className="iner">
                    <img src={img} alt="" />
                  </div>
                  <div className="info-h-container">
                    <p>{formatDate(item.createdAt)}</p>
                    <div className="review-text">
                      {item.user_text
                        .split(" ")
                        .slice(0, 10)
                        .join(" ")}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="rdmore" onClick={routeToReviews}>
              Read more
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;