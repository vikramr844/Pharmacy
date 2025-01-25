import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import Heading from "./Heading";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
    calculateTotalPrice(storedItems);
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      swal("Your cart is empty", "Add items to the cart before proceeding!", "warning");
    } else {
      swal("Proceeding to checkout", "Your order is ready!", "success");
      // Implement your checkout logic here
    }
  };

  return (
    <div className="container py-5 mt-5">
       <Heading title="Medicines" /> 
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="cart-items row">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item col-12 col-md-6 col-lg-4 mb-4 d-flex align-items-center">
              <img src={item.thumbnail} alt={item.title} className="img-fluid rounded" style={{ maxWidth: '120px', marginRight: '1rem' }} />
              <div>
                <h4 className="mb-2">{item.title}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button 
                  className="btn btn-danger mt-2" 
                  onClick={() => handleRemoveFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total text-center mt-4">
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        <button 
          className="btn btn-primary mt-3" 
          onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
