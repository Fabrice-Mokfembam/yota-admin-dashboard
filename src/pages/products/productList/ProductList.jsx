import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import PageDetail from "../../../components/PageAlert/PageDetail";
import me from "../../../assets/images/remix1.jpg";

import { columnsProduct } from "../../../data.js";
import { rowsProduct } from "../../../data.js";

const page = "All Products";

function ProductList({data}) {
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
    setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem));
  };
  const datal = [
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
          <select name="select-category" id="select-category" onChange={(e) => { setSelectValue(e.target.value)}}>
            <option value=" ">Select by category</option>
            <option value="Wheel" >Wheel</option>
            <option value="Exhaust" >Exhaust</option>
            <option value="Bumpers">Bumpers</option>
            <option value="Exhaust">Fenders</option>
          </select>
           <button className="select-date-added">Last added</button>
        </div>
          
      </div>

      <div className="product_list">
        {currentItems.map((item) => {
          return (
            <div className="products_container" key={item._id}>
              <div className="product_image">
                <img src={'http://localhost:5173/d8fb44a8-890f-44f8-a63f-39a899663010'} alt="" />
              </div>
              <div className="product_name">{item.product_name}</div>
              <div className="product_short_description">
                {item.description.slice(0,40) + "...read more"}
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
