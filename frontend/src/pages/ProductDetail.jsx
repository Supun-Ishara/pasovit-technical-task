import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getProducts } from "../features/products/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, products, isLoading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getProducts({ page: 1, limit: 8 }));
  }, [dispatch, id]);

  useEffect(() => {
    if (product && products) {
      // Get related products (same category, different product)
      const related = products.filter(
        (p) => p.category === product.category && p._id !== product._id
      ).slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product, products]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const cartData = {
      productId: product._id,
      size: selectedSize,
      quantity,
      price: product.price,
    };

    dispatch(addToCart(cartData));
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    handleAddToCart();
    setTimeout(() => {
      navigate("/cart");
    }, 500);
  };

  // Mock images if not available
  const productImages = product?.images?.length > 0
    ? product.images
    : [
        { url: product?.image || "https://via.placeholder.com/600" },
        { url: "https://via.placeholder.com/600" },
        { url: "https://via.placeholder.com/600" },
      ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h2>Product Not Found</h2>
          <p>Sorry, the product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="separator">/</span>
          <Link to="/products">Products</Link>
          <span className="separator">/</span>
          <Link to={`/products?category=${product.category}`}>{product.category}</Link>
          <span className="separator">/</span>
          <span className="current">{product.name || product.title}</span>
        </nav>

        {/* Main Product Section */}
        <div className="product-detail-container">
          {/* Left - Images */}
          <div className="product-images-section">
            <div className="main-image-container">
              <img
                src={productImages[selectedImage]?.url}
                alt={product.name || product.title}
                className="main-product-image"
              />
              {product.discount && (
                <div className="discount-badge">-{product.discount}%</div>
              )}
            </div>
            
            {productImages.length > 1 && (
              <div className="thumbnail-images">
                {productImages.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img.url} alt={`${product.name} ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div className="product-info-section">
            <div className="product-header">
              <div className="product-category-badge" >{product.category}</div>
              <h1 className="product-title">{product.name || product.title}</h1>
              
              {/* Rating */}
              <div className="product-rating">
                <div className="stars">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                </div>
                <span className="rating-text">(4.0) • 128 Reviews</span>
              </div>

              {/* Price */}
              <div className="product-pricing">
                <span className="current-price" style={{color: '#a03cb9'}} >${product.price}</span>
                {product.originalPrice && (
                  <span className="original-price" style={{color: '#a03cb9'}}>${product.originalPrice}</span>
                )}
              </div>

              {/* Short Description */}
              <p className="product-short-desc">
                {product.description?.substring(0, 150)}...
              </p>
            </div>

            {/* Product Options */}
            <div className="product-options">
              {/* Size Selection */}
              <div className="option-group">
                <label className="option-label">
                  Select Size
                  {!selectedSize && <span className="required">*</span>}
                </label>
                <div className="size-options">
                  {(product.size || ["S", "M", "L", "XL"]).map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? "active" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button className="size-guide-btn" style={{color: '#a03cb9'}}>📏 Size Guide</button>
              </div>

              {/* Quantity */}
              <div className="option-group">
                <label className="option-label">Quantity</label>
                <div className="quantity-selector">
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    −
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="btn btn-primary btn-large btn-block" onClick={handleAddToCart}
                style={{backgroundColor: '#a03cb9', borderColor: '#a03cb9'}}>
                  🛒 Add to Cart
                </button>
                <button className="btn btn-secondary btn-large btn-block" onClick={handleBuyNow}>
                  ⚡ Buy Now
                </button>
              </div>

              {/* Additional Actions */}
              <div className="additional-actions">
                <button className="action-link">
                  <span className="icon">❤️</span> Add to Wishlist
                </button>
                <button className="action-link">
                  <span className="icon">🔄</span> Compare
                </button>
                <button className="action-link">
                  <span className="icon">📤</span> Share
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="product-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span className="feature-text">Free shipping on orders over $50</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span className="feature-text">Easy 30-day returns</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span className="feature-text">Secure checkout</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span className="feature-text">100% authentic products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-details-tabs">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`tab-btn ${activeTab === "specifications" ? "active" : ""}`}
              onClick={() => setActiveTab("specifications")}
            >
              Specifications
            </button>
            <button
              className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews (128)
            </button>
            <button
              className={`tab-btn ${activeTab === "shipping" ? "active" : ""}`}
              onClick={() => setActiveTab("shipping")}
            >
              Shipping & Returns
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === "description" && (
              <div className="tab-panel">
                <h3>Product Description</h3>
                <p>{product.description || "No description available."}</p>
                <ul className="description-list">
                  <li>Premium quality fabric</li>
                  <li>Comfortable fit for all-day wear</li>
                  <li>Easy to care for - machine washable</li>
                  <li>Available in multiple sizes and colors</li>
                </ul>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="tab-panel">
                <h3>Specifications</h3>
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <td>Category</td>
                      <td>{product.category}</td>
                    </tr>
                    <tr>
                      <td>Available Sizes</td>
                      <td>{(product.size || ["S", "M", "L", "XL"]).join(", ")}</td>
                    </tr>
                    <tr>
                      <td>Material</td>
                      <td>100% Cotton</td>
                    </tr>
                    <tr>
                      <td>Care Instructions</td>
                      <td>Machine wash cold, tumble dry low</td>
                    </tr>
                    <tr>
                      <td>Country of Origin</td>
                      <td>USA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="tab-panel">
                <h3>Customer Reviews</h3>
                <div className="reviews-summary">
                  <div className="rating-overview">
                    <div className="avg-rating">4.0</div>
                    <div className="stars-large">★★★★☆</div>
                    <p>Based on 128 reviews</p>
                  </div>
                </div>
                
                <div className="reviews-list">
                  <div className="review-item">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <strong>John Doe</strong>
                        <span className="stars">★★★★★</span>
                      </div>
                      <span className="review-date">2 days ago</span>
                    </div>
                    <p className="review-text">
                      Great quality! The fit is perfect and the fabric feels premium. 
                      Highly recommend!
                    </p>
                  </div>

                  <div className="review-item">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <strong>Jane Smith</strong>
                        <span className="stars">★★★★☆</span>
                      </div>
                      <span className="review-date">1 week ago</span>
                    </div>
                    <p className="review-text">
                      Good product overall. Shipping was fast. Size runs slightly large.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="tab-panel">
                <h3>Shipping Information</h3>
                <p>We offer free shipping on all orders over $50.</p>
                <ul className="description-list">
                  <li><strong>Standard Shipping:</strong> 5-7 business days</li>
                  <li><strong>Express Shipping:</strong> 2-3 business days</li>
                  <li><strong>Next Day Delivery:</strong> Order before 2 PM</li>
                </ul>

                <h3 style={{ marginTop: "30px" }}>Returns & Exchanges</h3>
                <p>We accept returns within 30 days of purchase.</p>
                <ul className="description-list">
                  <li>Items must be unworn and in original condition</li>
                  <li>Free return shipping for exchanges</li>
                  <li>Refunds processed within 5-7 business days</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="section-title">You May Also Like</h2>
            <div className="related-products-grid">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  to={`/product/${relatedProduct._id}`}
                  className="related-product-card"
                >
                  <img
                    src={relatedProduct.image || "https://via.placeholder.com/300"}
                    alt={relatedProduct.name || relatedProduct.title}
                    className="related-product-image"
                  />
                  <div className="related-product-info">
                    <h4>{relatedProduct.name || relatedProduct.title}</h4>
                    <p className="related-product-price" style={{color: '#a03cb9'}}>${relatedProduct.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;