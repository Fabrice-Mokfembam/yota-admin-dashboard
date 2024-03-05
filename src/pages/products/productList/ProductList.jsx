import React, { useEffect, useState } from "react";
import "./ProductList.css";
import PageDetail from "../../../components/PageAlert/PageDetail";
import axios from "axios";
import { useContext } from "react";
import { productContext } from "../../../context/productContext";
import { useNavigate } from "react-router-dom";

const page = "All Products";

function ProductList() {
  const { products, setProducts ,setLoading,loading} = useContext(productContext);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [names, setNames] = useState('');
   const routeTo = useNavigate();

  const routeToProductDetail = () => {
    routeTo("/product-detail");
  };


  const indexOfLastItem = currentPage * 8;
  const indexOfFirstItem = indexOfLastItem - 8;

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
      try {
        const {data} = await axios.delete(`http://localhost:5000/delete/product/${id}`);
        console.log("deletedData", data);
        setProducts((products) => products.filter((item) => item._id !== data._id));
      } catch (error) {
        console.error("Error deleting data:", error);
        setLoading(false); 
      }
  };
  
    const searchByCategory = async (category) => {
      try {
        setLoading(true);
        const {data} = await axios.get(`http://localhost:5000/get/product/${category}`);
        console.log("categoryData", data);
        setLoading(false)
        setProducts((data));
      } catch (error) {
        console.error("Error category data:", error);
        setLoading(false); 
      }
  };
  
const searchByName = async () => {
  const nProducts = products.filter((product) =>
    product.product_name.match(new RegExp(names, "i"))
  );
  setProducts(nProducts);
};
  
    const searchByname = async () => {
       
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
            onChange={(e) => {
              setNames(e.target.value);
              searchByName();
            }}
          />{names}
        </div>
        <div className="select-product">
          <select
            name="select-category"
            id="select-category"
            onChange={(e) => {
              // setSelectValue(e.target.value);
              searchByCategory(e.target.value);
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
                <div className="product_name">{item.product_name.slice(0, 40) + '...'}</div>
                <div className="product_short_description">
                  {item.description.slice(0, 40) + "...read more"}
                </div>
                <div className="product_prize">{item.price}</div>
                <div className="product_edit_delete">
                  <button className="product_view Pbtn" onClick={routeToProductDetail}>View</button>
                  <button className="product_delete Pbtn" onClick={() => { handleDeleteProduct(item._id) }}>Delete</button>
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