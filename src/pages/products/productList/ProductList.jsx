import React, { useEffect, useState, useContext } from "react";
import "./ProductList.css";
import PageDetail from "../../../components/PageAlert/PageDetail";
import axios from "axios";
import { productContext } from "../../../context/productContext";
import { useNavigate } from "react-router-dom";
import { BsPlus, BsSearch } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const page = "All Products";

function ProductList() {
  const { products, setProducts, setLoading, loading } = useContext(productContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const routeTo = useNavigate();

  function routeToAddProduct() {
    routeTo('/products/add-product');
  }

  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const changePage = () => {
    if (products && products.length > 0) {
      setCurrentItems(products.slice(indexOfFirstItem, indexOfLastItem));
    }
  };

  useEffect(() => {
    changePage();
  }, [currentPage, products]);

  const handleDeleteProduct = async (id) => {
    const productId = { id };
    try {
      const { data } = await axios.post(`https://yotaperformanceshop.com/yps_server/admin/delete_product`, productId);
      setProducts((prevProducts) => prevProducts.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
      setLoading(false);
    }
  };

  const searchByCategory = async (category) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:5000/get/product/${category}`);
      setLoading(false);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching category data:", error);
      setLoading(false);
    }
  };

  const searchByName = () => {
    const filteredProducts = products.filter((product) =>
      product.product_name.match(new RegExp(searchQuery, "gi"))
    );
    setCurrentItems(filteredProducts.slice(indexOfFirstItem, indexOfLastItem));
  };

  const routeToProductDetail = (product) => {
    routeTo("/product-detail", { state: product });
  };

  return (
    <div className="home-container">
      <div className="prheader">
        <PageDetail page={page} />
      </div>
      <div className="pro">
        <div className="prheader2">
          <div className="product-search-bar">
            <input
              type="text"
              id="input-product"
              placeholder="Search product by name"
              onChange={(e) => {
                setSearchQuery(e.target.value);
                searchByName();
              }}
            />
            <BsSearch className="bsSearch" />
          </div>
          <div className="select-product">
            <select
              name="select-category"
              id="select-category"
              onChange={(e) => searchByCategory(e.target.value)}
            >
              <option value="">Select by category</option>
              <option value="Wheel">Wheel</option>
              <option value="Exhaust">Exhaust</option>
              <option value="Bumpers">Bumpers</option>
              <option value="Fenders">Fenders</option>
              <option value="Hood">Hood</option>
              <option value="Suspension parts">Suspension parts</option>
              <option value="Steering Wheel">Steering Wheel</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div>Loading....</div>
        ) : (
          <div className="product_list">
            {currentItems.map((item) => (
              <div className="products_container" key={item._id}>
                <div className="product_image">
                  <img
                    src={item.images[0]}
                    alt="product"
                  />
                </div>
                <div className="product_name">{item.product_name.slice(0, 40) + '...'}</div>
                <div className="product_short_description">
                  {item.description.slice(0, 40) + "...read more"}
                </div>
                <div className="product_prize">{item.price}</div>

                <div className="product_edit_delete">
                  <button className="product_view Pbtn" onClick={() => routeToProductDetail(item)}>View</button>
                  <button className="product_delete Pbtn" onClick={() => handleDeleteProduct(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="addButton" onClick={routeToAddProduct}>
          <BsPlus className="plusIcon" />
        </div>

        <div className="pageChangersbutton">
          <button className="prev" onClick={prevPage}>
            <FaArrowLeft /> Previous
          </button>
          <button className="next" onClick={nextPage}>
            Next <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
