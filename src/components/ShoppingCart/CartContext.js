import { useSearchParams } from 'react-router-dom'
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // const [cartItem, setCartItem] = useState([]); // Initial cart state
  const [cartLength, setCartLength] = useState(''); // Initial cart length
  const [cartItems, setCartItems] = useState([]); // Store cart items globally
  // const [searchParams] = useSearchParams();
  // const user = searchParams.get("username");
  const backendUrl = process.env.Back_end_url

const updateCartLength = async (user) => {
    try {
      const response = await fetch(`${backendUrl}/cart/Cartlength?username=${user}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.cart)
      setCartLength(data.cart); // Update cart length globally
      console.log("Updated Cart Length:", cartLength);
    } catch (error) {
      console.error("Error fetching cart length:", error);
    }
  };


const getCart = async (user) => {
    if (!user) {
      console.error("No username provided in query params");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/cart?username=${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send cookies with the request
      });

      console.log("Status Code:", response.status);
      console.log("Response OK?", response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Parse JSON from response
      console.log("Response JSON:", data);

      setCartItems(data.cart); // Safely handle cases where `data.cart` is undefined
      console.log(cartItems[1])
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]); // Reset to empty array on error
    }
  };


  
  return (
    <CartContext.Provider value={{
      cartLength,
      updateCartLength,
      getCart,
      cartItems
    }}
    >
      {children}
    </CartContext.Provider>
  );
};

