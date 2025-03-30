import React, { createContext, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';

const  CartItem =( {productId, quantity } )=>{
  console.log(productId)
  const navigate = useNavigate()
  const [searchparams] = useSearchParams()
  const user = searchparams.get('username')
  const { productname, price, image } = productId;
  const [productquantity, setproductquantity] = useState(quantity);
  console.log(productname, price, image[0])
  
  const increment = () => setproductquantity(productquantity + 1);
  const decrement = () => setproductquantity(productquantity - 1);
  const backendUrl = process.env.Back_end_url
  const buyNow = () => {
    if(user!=null){
      const destination=`/order/${productId._id}?username=${user}`
      console.log(productId)
      navigate(destination, {state: {id: productId, quantity: quantity}})
  }
  else{
      const destination= `/Login`
      navigate(destination)
  }
  
  }

  return (<>

<div className="flex items-center border p-4 mb-4 rounded-lg shadow-lg bg-white">
  <img
    src={productId.image[0]}
    alt={productId.productname}
    className="w-24 h-24 object-cover rounded-lg"
  />

  <div className="flex-1 ml-4">
    <h2 className="text-xl font-bold text-gray-900 mb-2">{productId.productname}</h2>
    <p className="text-gray-700">Price: Rs. {productId.price}</p>
    <p className="text-gray-700">Quantity: {quantity}</p>
    <p className="text-indigo-700 font-semibold mt-2">
      Total: Rs. {productId.price * quantity}
    </p>
  </div>

  <div className="flex items-center gap-x-4">
    <button
      onClick={decrement}
      disabled={productquantity <= 1}
      className="w-8 h-8 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
    >
      -
    </button>
    <span>{productquantity}</span>
    <button
      onClick={increment}
      className="w-8 h-8 bg-indigo-500 text-white rounded hover:bg-indigo-600"
    >
      +
    </button>
  </div>

  <button
    onClick={buyNow}
    className="mx-1  bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
  >
    Buy Now
  </button>
</div>
     </>
    
    
  )
}
export default CartItem