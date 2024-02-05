import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import PageDetail from "../../../components/PageAlert/PageDetail";
import me from "../../../assets/images/remix1.jpg";
import axios from "axios";

import { columnsProduct } from "../../../data.js";
import { rowsProduct } from "../../../data.js";

const page = "All Products";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const [selectValue, setSelectValue] = useState("");

  const indexOfLastItem = currentPage * 8;
  const indexOfFirstItem = indexOfLastItem - 8;

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const changePage = () => {
    setCurrentItems(products.slice(indexOfFirstItem, indexOfLastItem));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    changePage();
  }, [currentPage, products]);

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

  return (
    <div className="home-container pro">
      <div className="prheader">
        <PageDetail page={page} />
        <button className="add-product">Add Product</button>
      </div>
      <div className="prheader2">
        <div className="product-search-bar">
          <input
            type="text"
            id="input-product"
            placeholder="Search product by name"
          />
        </div>
        <div className="select-product">
          <select
            name="select-category"
            id="select-category"
            onChange={(e) => {
              setSelectValue(e.target.value);
            }}
          >
            <option value=" ">Select by category</option>
            <option value="Wheel">Wheel</option>
            <option value="Exhaust">Exhaust</option>
            <option value="Bumpers">Bumpers</option>
            <option value="Exhaust">Fenders</option>
          </select>
          <button className="select-date-added">Last added</button>
        </div>
      </div>

      {loading ? ( 
        <div>Loading....</div>
      ) : (
        <div className="product_list">
          {currentItems.map((item) => {
            return (
              <div className="products_container" key={item._id}>
                <div className="product_image">
                  <img
                    src={
                      item.images[0]
                    }
                    alt=""
                  />
                </div>
                <div className="product_name">{item.product_name}</div>
                <div className="product_short_description">
                  {item.description.slice(0, 40) + "...read more"}
                </div>
                <div className="product_prize">{item.price}</div>
                <div className="product_edit_delete">
                  <button className="product_view Pbtn">View</button>
                  <button className="product_delete Pbtn">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="center">
        <button className="add-r">Add Product</button>
      </div>

      <div className="center">
        <div className="pageChangersbutton">
          <button className="prev" onClick={prevPage}>
            Previous
          </button>
          <button className="next" onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;