import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Header from './components/header/header';
import "./App.css";
import Chats from "./pages/chats/Chats";
import Home from "./pages/home/Home";
import Orders from "./pages/orders/Orders";
import Products from "./pages/products/Products";
import Bonus from "./pages/bonus-settings/Bonus";
import Card from "./pages/card-details/Card";
import AddProduct from "./pages/products/addProduct/AddProduct";
import ProductList from "./pages/products/productList/ProductList";
import Display from "./pages/test/Display";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Reviews from "./pages/Reviews/Reviews";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

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

    return () => {
      
    };
  }, []);

  // Define an async function for data fetching
  const fetchData = async () => {
    try {
      const fetchedData = await axios.get("http://localhost:5000/api/blog");
      setData(fetchedData.data);
      console.log("fdatabml", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Layout = () => {
    return (
      <>
        <div className="layout">
          <Header  hamRef={hamRef} xRef={xRef} showSidebar={showSidebar}/>
          <div className="main">
            <Sidebar sidebarRef={ sidebarRef} />
            <Outlet />
          </div>
        </div>
      </>
    );
  };

  const testdisplay = () => {};

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
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
          element: <ProductList fetchData={fetchData} />,
        },
        {
          path: "/products/add-product",
          element: <AddProduct setData={setData} />,
        },
        {
          path: "/products/list",
          element: <ProductList />,
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
          path: "/test",
          element: <Display data={data} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
