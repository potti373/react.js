import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  async function fetchData() {
    const result = await fetch("https://fakestoreapi.com/products");
    const myResult = await result.json();
    setData(myResult);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function addToCart(myItem) {
    const existingItem = cart.find((cartItem) => cartItem.id === myItem.id);
    if (!existingItem) {
      setCart([...cart, myItem]);
    } else {
      alert("Item already in the cart");
    }
  }

  function removeCart(myItem) {
    const newCart = cart.filter((item) => item.id !== myItem.id);
    setCart(newCart);
  }

  return (
    <div className="app">
      <header className="navbar">
        <h2 className="logo">🛒 MyStore</h2>
        <div className="cart-info">
          Cart: <span>{cart.length}</span>
        </div>
      </header>

      <div className="container">
        <div className="products">
          {data.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.title} className="product-image" />
              <h3 className="product-title">{item.title}</h3>
              <p className="product-price">₹{(item.price * 80).toFixed(2)}</p>
              <button className="add-btn" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="cart">
          <h2>Your Cart ({cart.length})</h2>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} className="cart-image" />
                <div>
                  <h4>{item.title}</h4>
                  <p>₹{(item.price * 80).toFixed(2)}</p>
                </div>
                <button className="remove-btn" onClick={() => removeCart(item)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
