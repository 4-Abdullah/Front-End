import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import CartItem from "./cart";
import { CartContext, } from '../ShoppingCart/CartContext';

const Cart = () => {
  // const [products, setProducts] = useState([]); // Initialize as an array
  const [searchParams] = useSearchParams();
  const user = searchParams.get("username"); // Extract `username` query parameter
  console.log(user); // Debugging: log the username
    const { cartItems, getCart } = useContext(CartContext);
  
  useEffect(() => {
    // Immediately invoked async function for fetching data
    (async () => {
        await getCart(user)
    })();
  },[]) 

  // console.log(products)

  return(
    <>
    <div>Cart</div>
      <div> {cartItems.map((p) => <CartItem key={p.id} {...p} />) } </div>
    </>
  )}

  export default Cart