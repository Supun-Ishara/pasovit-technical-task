import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productSlice";
import './Home.css';

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    dispatch(getProducts({ page: 1, limit: 8 }));
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      // Get random featured products
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 4));
    }
  }, [products]);

  const categories = [
    {
      name: "Men",
      image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500",
      link: "/products?category=Men",
      description: "Stylish menswear collection"
    },
    {
      name: "Women",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500",
      link: "/products?category=Women",
      description: "Elegant women's fashion"
    },
    {
      name: "Kids",
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500",
      link: "/products?category=Kids",
      description: "Cute & comfortable kids wear"
    }
  ];

  const features = [
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "Free shipping on orders over $50"
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: "↩️",
      title: "Easy Returns",
      description: "30-day return policy"
    },
    {
      icon: "💬",
      title: "24/7 Support",
      description: "Dedicated customer support"
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">New Collection 2026</span>
          <h1 className="hero-title">
            Discover Your
            <span className="hero-title-highlight"> Style</span>
          </h1>
          <p className="hero-description">
            Elevate your wardrobe with our curated collection of premium clothing
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary btn-large"  style={{ backgroundColor: '#4e0361', borderColor: '#4e0361', color: 'white' }}>
              Shop Now
            </Link>
            <Link to="/products" className="btn btn-secondary btn-large">
              View Collection
            </Link>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Explore our diverse collection</p>
          </div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="category-card"
              >
                <div className="category-image-wrapper">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                  />
                  <div className="category-overlay">
                    <span className="category-cta">Shop Now →</span>
                  </div>
                </div>
                <div className="category-info">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Handpicked favorites just for you</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-badge">New</div>
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </Link>
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <div className="product-footer">
                    <span className="product-price" style={{ color: '#a03cb9' }}>${product.price}</span>
                    <Link
                      to={`/product/${product._id}`}
                      className="btn btn-primary btn-sm"
                      style={{ backgroundColor: '#a03cb9', borderColor: '#a03cb9', color: "white" }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/products" className="btn btn-primary btn-large" style={{ backgroundColor: '#a03cb9', borderColor: '#a03cb9', color: "white" }}>
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="container">
          <div className="promo-content">
            <div className="promo-text">
              <h2 className="promo-title">Special Offer!</h2>
              <p className="promo-description">
                Get 20% off on your first order. Use code: <strong>WELCOME20</strong>
              </p>
            </div>
            <Link to="/products" className="btn btn-primary btn-light btn-large">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Stay Updated</h2>
            <p className="newsletter-description">
              Subscribe to our newsletter and get exclusive offers
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn" style={{ backgroundColor: '#a03cb9', borderColor: '#a03cb9', color: "white" }}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real reviews from real people</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Amazing quality and fast shipping! Will definitely order again."
              </p>
              <div className="testimonial-author">
                <strong>Sarah Johnson</strong>
                <span>Verified Buyer</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "The clothes fit perfectly and the fabric quality is outstanding!"
              </p>
              <div className="testimonial-author">
                <strong>Michael Chen</strong>
                <span>Verified Buyer</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Best online shopping experience. Great customer service too!"
              </p>
              <div className="testimonial-author">
                <strong>Emma Davis</strong>
                <span>Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="instagram-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Follow Us on Instagram</h2>
            <p className="section-subtitle">@clothingstore</p>
          </div>
          <div className="instagram-grid">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="instagram-item">
                <img
                  src={`https://images.unsplash.com/photo-${1500000000000 + num * 1000000}?w=300&h=300&fit=crop`}
                  alt={`Instagram ${num}`}
                  className="instagram-image"
                />
                <div className="instagram-overlay">
                  <span className="instagram-icon">📷</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;