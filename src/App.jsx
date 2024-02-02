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
import ImageUploader from "./pages/test/Display";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Reviews from "./pages/Reviews/Reviews";
import axios from "axios";
import Messages from "./components/messages/Messages";
import PersonMessage from "./components/PersonMessage/PersonMessage";

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
  }

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
          element: <ProductList />,
        },
        {
          path: "/products/add-product",
          element: <AddProduct setData={setData} />,
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
