// App.js
import React, { useState } from "react";
import Product from "./Product";
// import Cart from "./Cart";


function App() {
  return (
    <div className="App">
      <Product/>
      {/* <Cart items={cartItems} /> */}
    </div>
  );
}


export default App;