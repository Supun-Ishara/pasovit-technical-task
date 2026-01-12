import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product?.images?.[0]?.url || "https://via.placeholder.com/300"}
        alt={product?.title}
        className="product-image"
      />

      <div className="product-info">
        <h3>{product?.title}</h3>
        <p className="category">{product?.category}</p>
        <p className="price" style={{ color: '#a03cb9' }}>${product?.price}</p>

        <Link to={`/product/${product?._id}`} className="view-btn" style={{ backgroundColor: '#a03cb9', borderColor: '#a03cb9', color: "white" }}>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
