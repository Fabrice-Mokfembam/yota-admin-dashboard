import { useEffect, useState, useContext } from "react";
import "./ProductList.css";
import PageDetail from "../../../components/PageAlert/PageDetail";
import axios from "axios";
import { productContext } from "../../../context/productContext";
import { useNavigate } from "react-router-dom";
import { BsPlus, BsSearch } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Loader from "../../../components/Loader/Loader";

const page = "All Products";

function ProductList() {
  const { products, setProducts, setLoading, loading } =
    useContext(productContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemsPerPage] = useState(9);
  const [isLoading, setIsLoading] = useState(false);

  const routeTo = useNavigate();

  function routeToAddProduct() {
    routeTo("/products/add-product");
  }

  // Calculate the pagination indexes
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Paginate filtered products
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Fetch and update filtered products when search or category changes
  const filterProducts = () => {
    let updatedProducts = products;

    // Filter by category if selected
    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by name if search query is entered
    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
    setCurrentPage(1); // Reset to first page on new filter
  };

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory]);

  // Page navigation with boundary checks
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleDeleteProduct = async (id) => {
    setIsLoading(true);
    const productId = { id };
    try {
      await axios.post(
        `https://yotaperformanceshop.com/yps_server/admin/delete_product`,
        productId
      );
      setProducts((prevProducts) =>
        prevProducts.filter((item) => item.id !== id)
      );
      setIsLoading(false);
       window.location.reload();
    } catch (error) {
      console.error("Error deleting data:", error);
      setLoading(false);
    }
  };

  const routeToProductDetail = (product) => {
    routeTo("/product-detail", { state: product });
  };

  return (
    <div className="home-container">
      <div className="prheader">
        <PageDetail page={page} />
      </div>

      {isLoading && <Loader message={"Deleting product..."} />}

      <div className="pro">
        <div className="prheader2">
          {/* Search Bar */}
          <div className="product-search-bar">
            <input
              type="text"
              id="input-product"
              placeholder="Search product by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <BsSearch className="bsSearch" />
          </div>

          {/* Category Dropdown */}
          <div className="select-product">
            <select
              name="select-category"
              id="select-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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

        {/* Product List */}
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div className="product_list">
            {currentItems.map((item) => (
              <div className="products_container" key={item.id}>
                <div
                  className="product_image"
                  onClick={() => routeToProductDetail(item)}
                >
                  <img src={item.images[0]} alt="product" />
                </div>
                <div
                  className="product_name"
                  onClick={() => routeToProductDetail(item)}
                >
                  {item.product_name.slice(0, 40) + "..."}
                </div>
                <div
                  className="product_short_description"
                  onClick={() => routeToProductDetail(item)}
                >
                  {item.description.slice(0, 40) + "...read more"}
                </div>
                <div className="product_prize">${item.price}</div>

                <div className="product_edit_delete">
                  <button
                    className="product_view Pbtn"
                    onClick={() => routeToProductDetail(item)}
                  >
                    View
                  </button>
                  <button
                    className="product_delete Pbtn"
                    onClick={() => handleDeleteProduct(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Product Button */}
        <div className="addButton" onClick={routeToAddProduct}>
          <BsPlus className="plusIcon" />
        </div>

        {/* Pagination Controls */}
        <div className="pageChangersbutton">
          <button
            className="prev"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <FaArrowLeft /> Previous
          </button>
          <span>
            Page {currentPage} of{" "}
            {Math.ceil(filteredProducts.length / itemsPerPage)}
          </span>
          <button
            className="next"
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(filteredProducts.length / itemsPerPage)
            }
          >
            Next <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
