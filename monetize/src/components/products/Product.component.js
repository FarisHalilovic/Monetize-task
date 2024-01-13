// src/components/ProductList.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/Api.service";
import ReactPaginate from "react-paginate";
import "./Product.component.css"; // Stilizacija, prilagodite prema potrebi

const ProductComponent = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default to 5 items per page

  useEffect(() => {
    // Provjera je li korisnik prijavljen
    const isUserLoggedIn = !!localStorage.getItem("token");
    if (!isUserLoggedIn) {
      // Ako nije prijavljen, preusmjeri na login
      navigate("/login");
    }

    api
      .getProductsData()
      .then((response) => {
        const productsArray = Object.values(response.data.products);
        setProducts(productsArray);
        setFilteredProducts(productsArray);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []); // Empty dependency array to ensure useEffect runs only once

  const handleFilter = () => {
    // Logika filtriranja prema nazivu i cijeni
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        (priceFilter === "" || product.price <= parseInt(priceFilter))
    );
    setFilteredProducts(filtered);
    setCurrentPage(0); // Resetirajte stranicu na prvu nakon filtriranja
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0); // Reset page to 0 when changing items per page
  };
  

  useEffect(() => {
    // Automatically filter products when name or price changes
    handleFilter();
  }, [nameFilter, priceFilter]);

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="product-list-container">
      <h1>Product List</h1>

      <div>
        <label htmlFor="nameFilter">Name:</label>
        <input
          type="text"
          id="nameFilter"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />

        <label htmlFor="priceFilter">Price:</label>
        <input
          type="text"
          id="priceFilter"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.slice(startIndex, endIndex).map((product, index) => (
            <tr key={product.id || index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

<div className="paginator-data">
<label htmlFor="itemsPerPage">Items per page:</label>
  <select
    id="itemsPerPage"
    value={itemsPerPage}
    onChange={handleItemsPerPageChange}
    className="items-select"
  >
    <option value={5}>5</option>
    <option value={10}>10</option>
    <option value={15}>15</option>
  </select>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
      
  </div>
    </div>
  );
};

export default ProductComponent;
