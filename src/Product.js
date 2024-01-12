// Product.js
import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
  },
];

function Product(props) {
  const [cart, setCart] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      // If the product is already in the cart, increment the quantity
      setCart((currentCart) =>
        currentCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCart((currentCart) => [...currentCart, { product, quantity: 1 }]);
    }

    // Update the order total
    setOrderTotal((prevTotal) => prevTotal + product.price);
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cart.map((item) =>
      item.product.id === itemToRemove.product.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    // Remove items with quantity 0 from the cart
    setCart(updatedCart.filter((item) => item.quantity > 0));

    // Update the order total
    setOrderTotal((prevTotal) => prevTotal - itemToRemove.product.price);
  };

  return (
    <div className="p-5">
      <h1 className="flex items-center justify-center font-bold text-4xl">
        Shopping Cart
      </h1>
      <div className="mt-10 p-5">
        <div className="border-2 w-[60%] mx-auto space-y-5">
          <h1 className="text-2xl font-semibold flex justify-center items-center">
            Products
          </h1>
          {products.map((product, index) => (
            <div key={index} className="flex justify-between p-2">
              <div>
                <h2>{product.name}</h2>
                <h3>{product.price}</h3>
              </div>
              <div>
                <button
                  className="bg-blue-800 text-white p-2 rounded-xl items-center"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-10 ">
          <div className="mx-auto border-2 w-[30%]">
            <h1 className="font-semibold text-2xl flex justify-center items-center">
              Cart
            </h1>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between p-2">
                <div>
                  <h2>{item.product.name}</h2>
                  <h3>{item.product.price}</h3>
                </div>
                <div className="flex gap-4">
                  <button
                    className="text-2xl px-4 bg-red-700  p-2 rounded-xl text-white items-center"
                    onClick={() => removeFromCart(item)}
                  >
                    -
                  </button>
                  <p className="flex items-center">{item.quantity}</p>
                  <button
                    className="flex px-4 bg-green-700  p-2 rounded-xl text-white items-center"
                    onClick={() => addToCart(item.product)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto border-2 w-[30%]">
            <h1 className="text-xl flex items-center justify-center font-semibold">
              Order Summary
            </h1>
            <div className="p-4">
              <p className="text-lg">Total: ${orderTotal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
