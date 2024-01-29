import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import PageDetail from "../../../components/PageAlert/PageDetail";
import me from "../../../assets/images/remix1.jpg";

import { columnsProduct } from "../../../data.js";
import { rowsProduct } from "../../../data.js";

const page = "All Products";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  const [selectValue, setSelectValue] = useState('');

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
  const data = [
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 500,
    },
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 500,
    },
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 500,
    },
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 500,
    },
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 500,
    },
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 500,
    },
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 800,
    },
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 800,
    },
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 800,
    },
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 900,
    },
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 1000,
    },
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 4500,
    },
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 590,
    },
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 8500,
    },
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 540,
    },
    {
      name: "Iphone XR",
      description: "Light in size plus 3d features",
      price: "$" + 550,
    },
  ];

  useEffect(() => {
    setProducts(data);
  }, []);

  useEffect(() => {
    changePage();
  }, [currentPage, products]);

  return (
    <div className="home-container pro">
      <div className="prheader">
        <PageDetail page={page} />
          <button className="add-product">Add Product</button>
      </div>
      <div className="prheader2">
        <div className="product-search-bar">
            <input type="text" id="input-product" placeholder="Search product by name" />
        </div> 
        <div className="select-product">
          <select name="select-category" id="select-category">
            <option value=" ">Select by category</option>
            <option value="Wheel" onChange={(e) => { setSelectValue(e.target.value) }}>Wheel</option>
            <option value="Exhaust" onChange={(e) => { setSelectValue(e.target.value) }}>Exhaust</option>
            <option value="Bumpers" onChange={(e) => { setSelectValue(e.target.value) }}>Bumpers</option>
            <option value="Exhaust" onChange={(e) => { setSelectValue(e.target.value) }}>Fenders</option>
            <option value="Hood" onChange={(e) => { setSelectValue(e.target.value) }}>Hood</option>
          </select>
           <button className="select-date-added">Last added</button>
        </div>
          
      </div>

      <div className="product_list">
        {currentItems.map((item) => {
          return (
            <div className="products_container">
              <div className="product_image">
                <img src={me} alt="" />
              </div>
              <div className="product_name">{item.name}</div>
              <div className="product_short_description">
                {item.description}
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
