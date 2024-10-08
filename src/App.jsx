import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import Chats from "./pages/chats/Chats";
import Home from "./pages/home/Home";
import Orders from "./pages/orders/Orders";
import Bonus from "./pages/bonus-settings/Bonus";
import Card from "./pages/card-details/Card";
import AddProduct from "./pages/products/addProduct/AddProduct";
import ProductList from "./pages/products/productList/ProductList";
import ImageUploader from "./pages/test/Display";
import Header from "./components/header/Headers";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom"; // Import Navigate
import Reviews from "./pages/Reviews/Reviews";
import axios from "axios";
import PersonMessage from "./components/PersonMessage/PersonMessage";
import { productContext } from "./context/productContext";
import { userContext } from "./context/userContext";
import { ordersContext } from "./context/ordersContext";
import { chatContext } from "./context/chatContext";
import { bonusContext } from "./context/bonusContext";
import { loginContext } from "./context/loginContext";
import OrderDetail from "./pages/orderDetail/OrderDetail";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Customer from "./pages/customers/Customer";
import ProductEdit from "./pages/products/productEdit/ProductEdit";
import Bonuses from "./pages/bonus-details/Bonuses";
import BonusDetail from "./pages/bonus-details/BonusDetail";
import BonusEdit from "./pages/bonus-details/BonusEdit";
import BonusCoupon from "./pages/bonus-settings/BonusCoupon";
import ProfileEdit from "./pages/profile/ProfileEdit";
import Profile from "./pages/profile/Profile";
import Login from "./pages/auth/Login";
import { adminContext } from "./context/adminContext";

function App() {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [cards, setCards] = useState([]);
  const [chats, setChats] = useState([]);
  const [bonusArray, setBonuses] = useState([]);
  const [isLogin, setIsLogin] = useState(() => {
    const storedLoginStatus = localStorage.getItem("isLogin");
    return storedLoginStatus === "true";
  });

  const [admin, setAdmin] = useState(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    return admin || {};
  });

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
    getAllOrders();
    fetchReviews();
    fetchFinance();
    fetchChats();
    fetchBonus();
  }, []);

  useEffect(() => {
    localStorage.setItem("isLogin", isLogin.toString());
  }, [isLogin]);

  async function getAllOrders() {
    try {
      const { data } = await axios.get("http://localhost:5000/get/orders");
      setOrders(data.map((item) => ({ id: item.id, ...item._doc })));
    } catch (error) {
      console.log(error);
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://yotaperformanceshop.com/yps_server/admin/get_products"
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchBonus = async () => {
    try {
      const { data } = await axios.post(
        "https://yotaperformanceshop.com/yps_server/admin/get_all_bonus"
      );
      setBonuses(data);
    } catch (error) {
      console.error("Error fetching bonus:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.post(
        "https://yotaperformanceshop.com/yps_server/admin/get_all_users"
      );
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchChats = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/get/chat/admin/admin123"
      );
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const fetchFinance = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/get/cards");
      setCards(data);
    } catch (error) {
      console.error("Error fetching finance data:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/get/products/reviews"
      );
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const Layout = () => (
    <>
      <loginContext.Provider value={{ isLogin, setIsLogin }}>
        <productContext.Provider
          value={{ products, setProducts, setLoading, loading }}
        >
          <userContext.Provider value={{ users }}>
            <ordersContext.Provider value={{ orders }}>
              <chatContext.Provider value={{ chats, setChats }}>
                <bonusContext.Provider value={{ bonusArray, setBonuses }}>
                  <div className="layout">
                    <Header
                      hamRef={hamRef}
                      xRef={xRef}
                      showSidebar={showSidebar}
                    />
                    <div className="main">
                      <Sidebar sidebarRef={sidebarRef} />
                      <Outlet />
                    </div>
                  </div>
                </bonusContext.Provider>
              </chatContext.Provider>
            </ordersContext.Provider>
          </userContext.Provider>
        </productContext.Provider>
      </loginContext.Provider>
    </>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        Object.keys(admin).length !== 0 ? <Layout /> : <Navigate to="/login" />,
      children: [
        { path: "/", element: <Home reviews={reviews} /> },
        { path: "/chats", element: <Chats /> },
        { path: "/orders", element: <Orders orders={orders} /> },
        { path: "/products", element: <ProductList /> },
        { path: "/products/add-product", element: <AddProduct /> },
        { path: "/products/list", element: <ProductList data={data} /> },
        { path: "/product-detail", element: <ProductDetail /> },
        { path: "/card-details", element: <Card cards={cards} /> },
        { path: "/bonus-settings", element: <Bonus /> },
        { path: "/coupon-settings", element: <BonusCoupon /> },
        { path: "/bonuses", element: <Bonuses /> },
        { path: "/bonus-detail", element: <BonusDetail /> },
        { path: "/bonus-edit", element: <BonusEdit /> },
        { path: "/profile", element: <Profile /> },
        { path: "/profileEdit", element: <ProfileEdit /> },
        { path: "/Reviews", element: <Reviews /> },
        { path: "/messages", element: <PersonMessage /> },
        { path: "/order-detail", element: <OrderDetail /> },
        { path: "/test", element: <ImageUploader /> },
        { path: "/customers", element: <Customer /> },
        { path: "/product-edit", element: <ProductEdit /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <adminContext.Provider value={{ admin, setAdmin }}>
      <loginContext.Provider value={{ isLogin, setIsLogin }}>
        <RouterProvider router={router} />
      </loginContext.Provider>
    </adminContext.Provider>
  );
}

export default App;
