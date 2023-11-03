import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import ProductList from "../components/ProductList";
import ComboBox from "../components/ComboBox";
import "./ListPage.css";
import Modal from "../components/Modal";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { addProducts } from "../store/reducers/productsReducer";
import { data } from "../data";

const options = [
  { value: "lth", label: "Low to High" },
  { value: "htl", label: "High to Low" },
];

const ListPage = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    dispatch(addProducts(data));
    setFilteredProducts(data.slice(0, productsPerPage));
  }, [dispatch]);

  const handleSearchChange = (e) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);

    if (newSearchText === "") {
      setFilteredProducts(products.slice(0, productsPerPage));
    } else {
      const newProducts = products.filter((item) =>
        item.title.includes(newSearchText)
      );
      setFilteredProducts(newProducts.slice(0, productsPerPage));
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setFilteredProducts(products.slice(startIndex, endIndex));
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="listpage-container">
      <Navbar
        setShowModal={setShowModal}
        searchText={searchText}
        handleSearchChange={handleSearchChange}
      />
      <div className="basic-start">
        Home / Clothing / <strong>Shirts For Men & Women</strong>
      </div>
      {showModal && <Modal />}
      <div className="basic-start">
        <strong>Shirts For Men & Women </strong>- 98665 items
      </div>

      <div className="basic-start1">
        <p>FILTERS</p>
        <ul className="list-details">
          <li>
            <a href="/">Country of Origin</a>
          </li>
          <li>
            <a href="/">Clear all</a>
          </li>

          {/* Rest of the code... */}
        </ul>
        <div className="Combo-box">
          <ComboBox
            options={options}
            setFilteredProducts={setFilteredProducts}
            products={products}
          />
        </div>
      </div>
      <div className="App"></div>
      <hr />
      <Layout setFilteredProducts={setFilteredProducts} products={products}>
        {showModal && <Modal />}
        <h1>Shirt Collection</h1>
        <ProductList products={filteredProducts} />
      </Layout>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="prev_button"
        >
          Previous
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="next_button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListPage;
