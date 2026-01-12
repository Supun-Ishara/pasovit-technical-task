import React from "react";
import { useDispatch } from "react-redux";
import { updateCartQuantity, removeFromCart } from "../features/cart/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      dispatch(
        updateCartQuantity({
          cartItemId: item._id,
          quantity: newQuantity,
        })
      );
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item._id));
  };

  return (
    <div className="cart-item">
      <img
        src={item?.productId?.images?.[0]?.url || "https://via.placeholder.com/100"}
        alt={item?.productId?.title}
        className="cart-item-image"
      />

      <div className="cart-item-info">
        <h4>{item?.productId?.title}</h4>
        <p>Size: {item?.size}</p>
        <p>Price: ${item?.price}</p>
      </div>

      <div className="cart-item-quantity">
        <button onClick={() => handleQuantityChange(item.quantity - 1)}>
          −
        </button>

        <span>{item.quantity}</span>

        <button onClick={() => handleQuantityChange(item.quantity + 1)}>
          +
        </button>
      </div>

      <div className="cart-item-total">
        <p>${(item.price * item.quantity).toFixed(2)}</p>
        <button onClick={handleRemove} className="remove-btn">
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
