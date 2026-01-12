import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
} from '../features/cart/cartSlice';
import './Cart.css';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems = [], isLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    if (user) {
      dispatch(getCart());
    }
  }, [user, dispatch]);

  const handleRemove = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
    toast.success('Item removed from cart');
  };

  const handleQuantityChange = (cartItemId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ cartItemId, quantity }));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.productId?.price || item.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Loading State
  if (isLoading) {
    return (
      <div className="cart-page">
        <div className="cart-loading">
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  // Not Logged In
  if (!user) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-content">
            <div className="empty-cart-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2>Please Login</h2>
            <p>You need to login to view your cart</p>
            <button
              onClick={() => navigate('/login')}
              className="empty-cart-btn"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-content">
            <div className="empty-cart-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#a03cb9"

              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet</p>
            <button
              onClick={() => navigate('/products')}
              className="empty-cart-btn"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Cart with Items
  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <svg
            className="cart-header-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h1>Shopping Cart</h1>
        </div>
        <p className="cart-subtitle">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
        </p>

        <div className="cart-grid">
          {/* Cart Items Section */}
          <div className="cart-items-section">
            {cartItems.map((item) => {
              const product = item.productId;
              const itemTotal = (product?.price || item.price || 0) * item.quantity;

              return (
                <div key={item._id} className="cart-item-card">
                  <div className="cart-item-content">
                    {/* Product Image */}
                    <div className="cart-item-image-wrapper">
                      <div className="cart-item-image">
                        <img
                          src={
                            product?.images?.[0]?.url ||
                            'https://via.placeholder.com/300'
                          }
                          alt={product?.title || 'Product'}
                        />
                      </div>
                      <div className="quantity-badge">{item.quantity}x</div>
                    </div>

                    {/* Product Details */}
                    <div className="cart-item-details">
                      <div className="cart-item-header">
                        <div>
                          <h3 className="cart-item-title">
                            {product?.title || 'Unknown Product'}
                          </h3>
                          <div className="cart-item-meta">
                            <span className="cart-item-size">
                              Size: {item.size}
                            </span>
                            <span className="cart-item-category">
                              {product?.category}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="remove-btn"
                          title="Remove item"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="cart-item-footer">
                        {/* Quantity Controls */}
                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            className="quantity-btn"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="quantity-display">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="quantity-btn"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Price */}
                        <div className="cart-item-price">
                          <div className="cart-item-unit-price">
                            ${product?.price || item.price} each
                          </div>
                          <div className="cart-item-total-price">
                            ${itemTotal.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Free Shipping Banner */}
            {subtotal < 100 && (
              <div className="free-shipping-banner">
                <div className="shipping-banner-content">
                  <svg
                    className="shipping-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  <div className="shipping-text">
                    <h4>
                      Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
                    </h4>
                    <div className="shipping-progress-bar">
                      <div
                        className="shipping-progress-fill"
                        style={{ width: `${(subtotal / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>

            {/* Summary Items */}
            <div className="summary-items">
              <div className="summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={`summary-row ${shipping === 0 ? 'free' : ''}`}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="summary-divider">
                <div className="summary-total">
                  <span className="summary-total-label">Total</span>
                  <span className="summary-total-price">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="checkout-btn"
              style={{backgroundColor: '#a03cb9', borderColor: '#a03cb9'}}
            >
              Proceed to Checkout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>

            {/* Continue Shopping */}
            <button
              onClick={() => navigate('/products')}
              className="continue-shopping-btn"
            >
              Continue Shopping
            </button>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <svg
                  className="trust-badge-icon green"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Secure checkout guaranteed</span>
              </div>
              <div className="trust-badge">
                <svg
                  className="trust-badge-icon blue"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <span>Free returns within 30 days</span>
              </div>
              <div className="trust-badge">
                <svg
                  className="trust-badge-icon purple"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span>Multiple payment options</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="promo-section">
              <div className="promo-header">
                <svg
                  className="promo-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <span className="promo-title">Have a promo code?</span>
              </div>
              <div className="promo-input-group">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="promo-input"
                />
                <button className="promo-apply-btn">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;