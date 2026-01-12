import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../features/order/orderSlice";
import { toast } from "react-toastify";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems = [] } = useSelector((state) => state.cart);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) =>
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    dispatch(createOrder({ shippingInfo, paymentMethod: "Cash on Delivery" }))
      .unwrap()
      .then(() => {
        toast.success("Order placed successfully!");
        navigate("/orders");
      })
      .catch((err) => toast.error(err || "Failed to place order"));
  };

  const fieldLabels = {
    firstName: "First Name",
    lastName: "Last Name",
    mobile: "Mobile Number",
    address: "Street Address",
    city: "City",
    state: "State",
    pincode: "PIN Code",
  };

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <div className="checkout-content">
          <div className="checkout-form-section">
            <div className="section-header">
              <h2 className="section-title">Checkout</h2>
              <p className="section-subtitle">Complete your order</p>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h3 className="form-section-title">
                  <span className="section-icon">📦</span>
                  Shipping Information
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="firstName" className="form-label">
                      {fieldLabels.firstName}
                    </label>
                    <input
                      id="firstName"
                      className="form-input"
                      name="firstName"
                      placeholder="John"
                      value={shippingInfo.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName" className="form-label">
                      {fieldLabels.lastName}
                    </label>
                    <input
                      id="lastName"
                      className="form-input"
                      name="lastName"
                      placeholder="Doe"
                      value={shippingInfo.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="mobile" className="form-label">
                    {fieldLabels.mobile}
                  </label>
                  <input
                    id="mobile"
                    className="form-input"
                    name="mobile"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={shippingInfo.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    {fieldLabels.address}
                  </label>
                  <input
                    id="address"
                    className="form-input"
                    name="address"
                    placeholder="123 Main Street, Apt 4B"
                    value={shippingInfo.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="city" className="form-label">
                      {fieldLabels.city}
                    </label>
                    <input
                      id="city"
                      className="form-input"
                      name="city"
                      placeholder="New York"
                      value={shippingInfo.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="state" className="form-label">
                      {fieldLabels.state}
                    </label>
                    <input
                      id="state"
                      className="form-input"
                      name="state"
                      placeholder="NY"
                      value={shippingInfo.state}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pincode" className="form-label">
                      {fieldLabels.pincode}
                    </label>
                    <input
                      id="pincode"
                      className="form-input"
                      name="pincode"
                      placeholder="10001"
                      value={shippingInfo.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">
                  <span className="section-icon">💳</span>
                  Payment Method
                </h3>
                <div className="payment-method">
                  <div className="payment-badge">Cash on Delivery</div>
                </div>
              </div>

              <button
                type="submit"
                className="submit-button"
                style={{
                  backgroundColor: "#a03cb9",
                  borderColor: "#a03cb9",
                  color: "white",
                  padding: "14px 40px",
                  fontSize: "18px",
                  fontWeight: "600",
                  borderRadius: "30px",
                  minWidth: "220px",
                }}
              >
                <span>Place Order</span>
                <span className="button-icon">→</span>
              </button>
            </form>
          </div>

          <div className="order-summary-section">
            <div className="summary-card">
              <h3 className="summary-title">Order Summary</h3>

              <div className="cart-items">
                {cartItems.length === 0 ? (
                  <p className="empty-cart">Your cart is empty</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item._id} className="cart-item">
                      <div className="item-details">
                        <h4 className="item-title">
                          {item.productId?.title || "Product"}
                        </h4>
                        <p className="item-quantity">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="item-price" style={{ color: "#892ba1" }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-shipping">Free</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span className="total-amount">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
