import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import "./ProductList.css";

function ProductList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { products, isLoading, pagination } = useSelector(
    (state) => state.products
  );

  // Debug logging
  console.log("=== ProductList Debug ===");
  console.log("Products:", products);
  console.log("Pagination:", pagination);
  console.log("Is Loading:", isLoading);

  const getInitialFilters = () => {
    const params = new URLSearchParams(location.search);
    return {
      search: params.get("search") || "",
      category: params.get("category") || "",
      size: params.get("size") || "",
      minPrice: params.get("minPrice") || "",
      maxPrice: params.get("maxPrice") || "",
      page: parseInt(params.get("page")) || 1,
      limit: parseInt(params.get("limit")) || 12,
    };
  };

  const initial = getInitialFilters();

  const [filters, setFilters] = useState(initial);
  const [draftFilters, setDraftFilters] = useState(initial);
  const [showFilters, setShowFilters] = useState(false);

  // Sync URL with applied filters
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    navigate(`?${params.toString()}`, { replace: true });
  }, [filters, navigate]);

  // Fetch products when filters are applied
  useEffect(() => {
    console.log("Fetching products with filters:", filters);
    dispatch(getProducts(filters));
  }, [dispatch, filters]);

  const applyFilters = () => {
    setFilters({ 
      ...draftFilters, 
      page: 1,
      limit: parseInt(draftFilters.limit) || 12
    });
  };

  const clearFilters = () => {
    const cleared = {
      search: "",
      category: "",
      size: "",
      minPrice: "",
      maxPrice: "",
      page: 1,
      limit: 12,
    };
    setDraftFilters(cleared);
    setFilters(cleared);
  };

  const hasActiveFilters = () =>
    filters.search || filters.category || filters.size || filters.minPrice || filters.maxPrice;

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  // Calculate pagination info with fallbacks
  const currentPage = pagination?.page || filters.page || 1;
  const totalPages = pagination?.totalPages || 1;
  const totalProducts = pagination?.totalProducts || 0;
  const limit = pagination?.limit || filters.limit || 12;

  console.log("Calculated values:", { currentPage, totalPages, totalProducts, limit });
  console.log("Should show pagination:", totalPages > 1);

  return (
    <div className="product-list-page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Our Products</h1>
          <p className="page-subtitle">Discover our latest collection</p>
        </div>

        {/* Search */}
        <div className="search-section">
          <div className="search-form">
            <div className="search-input-wrapper">
              <input
                className="search-input"
                value={draftFilters.search}
                onChange={(e) =>
                  setDraftFilters({ ...draftFilters, search: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    applyFilters();
                  }
                }}
                placeholder="Search products..."
              />
              <button className="search-button" onClick={applyFilters}>🔍</button>
            </div>
          </div>

          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"} ⚙️
          </button>
        </div>

        {/* Filters */}
        <div className={`filters-section ${showFilters ? "show" : ""}`}>
          <div className="filters-grid">

            <select
              className="filter-select"
              value={draftFilters.category}
              onChange={(e) =>
                setDraftFilters({ ...draftFilters, category: e.target.value })
              }
            >
              <option value="">All Categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>

            <select
              className="filter-select"
              value={draftFilters.size}
              onChange={(e) =>
                setDraftFilters({ ...draftFilters, size: e.target.value })
              }
            >
              <option value="">All Sizes</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>

            <input
              className="filter-input"
              type="number"
              placeholder="Min Price"
              value={draftFilters.minPrice}
              onChange={(e) =>
                setDraftFilters({ ...draftFilters, minPrice: e.target.value })
              }
            />

            <input
              className="filter-input"
              type="number"
              placeholder="Max Price"
              value={draftFilters.maxPrice}
              onChange={(e) =>
                setDraftFilters({ ...draftFilters, maxPrice: e.target.value })
              }
            />

            <select
              className="filter-select"
              value={draftFilters.limit}
              onChange={(e) =>
                setDraftFilters({ ...draftFilters, limit: parseInt(e.target.value) })
              }
            >
              <option value="6">6 per page</option>
              <option value="12">12 per page</option>
              <option value="24">24 per page</option>
              <option value="48">48 per page</option>
            </select>

            <button className="pagination-btn" onClick={applyFilters}>
              Apply Filters
            </button>

            {hasActiveFilters() && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        {totalProducts > 0 && (
          <div className="results-summary">
            Showing {((currentPage - 1) * limit + 1)} - {Math.min(currentPage * limit, totalProducts)} of {totalProducts} products
          </div>
        )}

        {/* Products Grid */}
        <div className="products-grid">
          {products && products.length > 0 ? (
            products.map((p) => <ProductCard key={p._id} product={p} />)
          ) : (
            <div className="no-products">
              <div className="no-products-icon">📦</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms</p>
              {hasActiveFilters() && (
                <button className="btn btn-primary" onClick={clearFilters}>
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination Below Products  */}
        <div className="pagination" style={{ display: 'flex', padding: '20px' }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
             style={{background: "#a03cb9"}}
          >
            ← Previous
          </button>

          <div className="pagination-pages">
            {totalPages > 0 && [...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              
              // Show first page, last page, current page and adjacent pages
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`pagination-number ${currentPage === pageNum ? "active" : ""}`}
                    style={{background: "#83139f"}}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                pageNum === currentPage - 2 ||
                pageNum === currentPage + 2
              ) {
                // Show ellipsis
                return <span key={pageNum} className="pagination-ellipsis">...</span>;
              }
              return null;
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="pagination-btn"
            style={{background: "#a03cb9"}}
          >
            Next →
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductList;

