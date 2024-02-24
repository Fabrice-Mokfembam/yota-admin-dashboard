import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/header";
import "./App.css";
import Chats from "./pages/chats/Chats";
import Home from "./pages/home/Home";
import Orders from "./pages/orders/Orders";
import Products from "./pages/products/Products";
import Bonus from "./pages/bonus-settings/Bonus";
import Card from "./pages/card-details/Card";
import AddProduct from "./pages/products/addProduct/AddProduct";
import ProductList from "./pages/products/productList/ProductList";
import ImageUploader from "./pages/test/Display";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Reviews from "./pages/Reviews/Reviews";
import axios from "axios";
import Messages from "./components/messages/Messages";
import PersonMessage from "./components/PersonMessage/PersonMessage";
import { productContext } from "./context/productContext";
import { userContext } from "./context/userContext";
import { ordersContext } from "./context/ordersContext";

function App() {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);

  const sidebarRef = useRef(null);
  const hamRef = useRef(null);
  const xRef = useRef(null);

  function showSidebar() {
    hamRef.current.classList.toggle("hidden");
    xRef.current.classList.toggle("visible");
    sidebarRef.current.classList.toggle("visible");
    sidebarRef.current.classList.toggle("slide-in");
  }

  useEffect(() => {
    fetchData();
    fetchUsers();
    fetchOrders();
    fetchReviews();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get/products/");
      console.log("fetchedData", response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchUsers = async () => {

    try {
      const {data} = await axios.get("http://localhost:5000/get/users/");
      console.log("fetchedData", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchOrders = async () => {

    try {
      const {data} = await axios.get("http://localhost:5000/get/order");
      console.log("fetchedData", data);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchReviews = async () => {

    try {
      const {data} = await axios.get("http://localhost:5000/get/products/reviews");
      console.log("fetchedData", data);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Layout = () => {
    return (
      <>
        <productContext.Provider    value={{ products, setProducts, setLoading, loading }}>
          <userContext.Provider value={{ users }}>
            <ordersContext.Provider value={ {orders}}>
          <div className="layout">
            <Header hamRef={hamRef} xRef={xRef} showSidebar={showSidebar} />
            <div className="main">
              <Sidebar sidebarRef={sidebarRef} />
              <Outlet />
            </div>
              </div>
              </ordersContext.Provider>
          </userContext.Provider>
        </productContext.Provider>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home reviews={ reviews} />,
        },
        {
          path: "/chats",
          element: <Chats />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/products",
          element: <ProductList />,
        },
        {
          path: "/products/add-product",
          element: <AddProduct />,
        },
        {
          path: "/products/list",
          element: <ProductList data={data} />,
        },
        {
          path: "/card-details",
          element: <Card />,
        },
        {
          path: "/bonus-settings",
          element: <Bonus />,
        },
        {
          path: "/Reviews",
          element: <Reviews />,
        },
        {
          path: "/messages",
          element: <PersonMessage />,
        },
        {
          path: "/test",
          element: <ImageUploader />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
