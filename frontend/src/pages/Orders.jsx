import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../features/order/orderSlice';
import { Link } from 'react-router-dom';
import './Orders.css';

function Orders() {
  const dispatch = useDispatch();
  const { orders = [], isLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="orders-container">
        <div className="orders-wrapper">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  } 

  return (
    <div className="orders-container">
      <div className="orders-wrapper">
        <div className="orders-header">
          <h1 className="orders-title">My Orders</h1>
          <p className="orders-subtitle">Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">📦</div>
            <h2 className="empty-title">No Orders Yet</h2>
            <p className="empty-message">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Link to="/products" className="shop-now-button">
              <span>Start Shopping</span>
              <span>→</span>
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-header-left">
                    <h3 className="order-id">
                      Order <span className="order-id-number">#{order._id.slice(-8).toUpperCase()}</span>
                    </h3>
                    <p className="order-date">
                      <span className="date-icon">📅</span>
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="order-header-right">
                    <span className={`order-status ${order.orderStatus.toLowerCase()}`}>
                      <span className="status-dot"></span>
                      {order.orderStatus}
                    </span>
                    <p className="order-total">${order.totalPrice.toFixed(2)}</p>
                  </div>
                </div>

                <div className="order-body">
                  <h4 className="items-header">
                    <span className="items-icon">📋</span>
                    Order Items
                  </h4>
                  <div className="order-items">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="item-content">
                          <h5 className="item-title">{item.product?.title || 'Product'}</h5>
                          <div className="item-details">
                            <span className="item-detail">
                              <span className="item-detail-label">Size:</span> {item.size}
                            </span>
                            <span className="item-detail">
                              <span className="item-detail-label">Qty:</span> {item.quantity}
                            </span>
                            <span className="item-detail">
                              <span className="item-detail-label">Price:</span> ${item.price.toFixed(2)} each
                            </span>
                          </div>
                        </div>
                        <div className="item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-footer">
                  <div className="order-actions">
                    <button className="action-button primary">
                      <span>Track Order</span>
                    </button>
                    <button className="action-button">
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;