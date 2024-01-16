// Product.js
import React, { useEffect, useState } from "react";

// const products = [
//     {
//         id: 1,
//         name: "Product 1",
//         price: 100,
//     },
//     {
//         id: 2,
//         name: "Product 2",
//         price: 200,
//     },
//     {
//         id: 3,
//         name: "Product 3",
//         price: 300,
//     },
// ];

function Product(props) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);


    useEffect(() => {
        // Fetch products from the FakeStore API when the component mounts
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };


    const addToCart = (product) => {

        const existingItem = cart.find((item) => item.product.id === product.id);
        if (existingItem) {
            // If the product is already in the cart, increment the quantity
            setCart((currentCart) =>
                currentCart.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
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
            item.product.id === itemToRemove.product.id ? { ...item, quantity: item.quantity - 1 } : item);

        // Remove items with quantity 0 from the cart
        setCart(updatedCart.filter((item) => item.quantity > 0));

        // Update the order total
        setOrderTotal((prevTotal) => prevTotal - itemToRemove.product.price);
    };

    return (
        <div className="p-5  bg-[white]">
            <div className="">
                {/* <h1 className="flex items-center justify-center font-bold text-4xl">
                    Shopping Cart
                </h1> */}
                <div className="flex p-5">
                    <div className="w-[70%] mx-auto space-y-5 ">

                        <div className="rounded-l-xl bg-[#F8F8F8] p-5">
                            <h1 className="text-2xl font-semibold flex justify-center items-center mb-2"> Products </h1>
                            <div className="max-h-screen overflow-y-auto grid grid-cols-2 gap-4 rounded-xl">
                                {products.map((product, index) => (
                                    <div key={index} className=" justify-between p-2  bg-white rounded-xl mb-5">
                                        <div className=" flex p-4 text-justify mx-2">
                                            <div className="w-[30%] p-4 mr-2">
                                                <img src={product.image} alt={product.image} className=" " />
                                            </div>
                                            <div className="text-xs w-[70%] pl-2">
                                                <h2 className="font-bold">{product.title}</h2>
                                                <h2 className="p-2 max-h-32 overflow-auto">{product.description}</h2>
                                                {/* <h2 className="font-semibold">{product.category}</h2> */}
                                                <h3 className="font-semibold text-[#F8C09F]">${product.price}</h3>
                                                <div className="mx-auto">
                                                    <button className="text-sm border-[#F8C09F] border-2 text-[#F8C09F] px-6 py-1 rounded-xl items-center"
                                                        onClick={() => addToCart(product)}> Add to cart </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white w-[35%] rounded-r-xl p-2">
                        <div className="mx-auto max-h-screen">
                            <h1 className="font-semibold text-2xl flex justify-center items-center mb-5"> Cart </h1>
                            <div className="overflow-y-auto max-h-screen p-2 pb-6">
                                {cart.map((item, index) => (
                                    <div key={index} className="">
                                        <div className="flex grid-rows-2 gap-5 space-y-2 items-center">
                                            <div className=" max-w-[15%] ">
                                                <img src={item.product.image} alt={item.product.image} />
                                            </div>
                                            <div>
                                                <h2 className="text-xs">{item.product.title}</h2>
                                                <h3 className="text-xs">{item.product.price}</h3>
                                                <div className="flex text-xs gap-4 max-h-8 my-auto">
                                                    <button className=" px-4 bg-red-700  p-2 rounded-xl text-white items-center"
                                                        onClick={() => removeFromCart(item)}>-</button>
                                                    <p className="flex items-center">{item.quantity}</p>
                                                    <button className="flex px-4 bg-green-700  p-2 rounded-xl text-white items-center"
                                                        onClick={() => addToCart(item.product)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="">
                                {/* <p className="text-lg">Total: ${orderTotal}</p> */}

                            </div>
                        </div>



                        {/* <div className="bg-white mx-auto border-2">
                            <h1 className="text-xl flex items-center justify-center font-semibold">
                                Order Summary
                            </h1>
                            <div className="p-4">
                                <p className="text-lg">Total: ${orderTotal}</p>
                                <p>Shipping charge on order below 500 : $100 </p>
                            </div>
                            <div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
