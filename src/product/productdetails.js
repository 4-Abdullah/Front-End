// 'use client'
// import { Cloudinary } from "@cloudinary/url-gen";
// import { AdvancedImage } from "@cloudinary/react";
// import { CldImage } from 'next-cloudinary';
// import { Button, Card } from "react-bootstrap"
// import increaseCartQuantity from './data'
// import { useCart } from '../components/ShoppingCart/CartContext';
import React, { useContext } from "react";
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
import Order from '../components/Order/index';
import { useState } from 'react';
import { CartContext } from '../components/ShoppingCart/CartContext';


const  Productdetails =( id )=>{
  console.log(id)
  const [searchParams] = useSearchParams();
  const user = searchParams.get("username");
  const  navigate = useNavigate()
  const [quantity, setquantity] = useState(1);
const { updateCartLength } = useContext(CartContext);
  const increment = () => setquantity(quantity + 1);
  const decrement = () => setquantity(quantity - 1);
  const backendUrl = process.env.Back_end_url


  // const import_Img = new Cloudinary({
  //   cloud: { cloudName: "dbsht4sdc" }, // Replace with your Cloudinary Cloud Name
  // }).image(_id.image[0])

  // const { addToCart } = useCart();

//  useEffect(() => {
//    console.log('Productdetails component mounted');
//    return () => { console.log('Productdetails component unmounted'); };
//    }, []);
const HandleAddToCart = async() => {


const response = await fetch(`https://mern-back-end-production.up.railway.app/cart?username=${user}`, {
  method: "POST",
  
  credentials: "include", // ✅ Ensures cookies are sent/received
  headers: {
    "Content-Type": "application/json" // Specify the content type
  },
  body: JSON.stringify([id]),
})

console.log("Status Code:", response.status); // Example: 200, 400, 500
console.log("Response OK?", response.ok); // true if 2xx, false otherwise

console.log("Response JSON:", await response.json()); 
  await updateCartLength(user);
  
}

const buyNow = () => {
  if(user!=null){
    const destination=`/order/${id._id}?username=${user}`
    console.log(id)
    navigate(destination, {state: {id: id, quantity: quantity}})
}
else{
    const destination= `/Login`
    navigate(destination)
}

}
  //  const handleAddToCart = useCallback(() => {
  //    console.log('Add to Cart button clicked:', id);
  //     addToCart(id); },
  //      [id, addToCart]);

  return (
    <div className=" mx-auto flex flex-wrap bg-white">
          <div className='p-2'>
          <img src={id.image[0]} alt={id.productname}  width={500} height={400} />
          
          </div> 
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">MyShop</h2> */}
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{id.productname}</h1>
            <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
              {id.category}
            </h3>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              {/* <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span> */}
            </div>
            <div className='border-b-2'>
                <p className="leading-relaxed">{id.description}</p>
                <span className="title-font font-medium text-4xl  text-gray-900">Rs. {id.price}</span>
            </div>
            {id.category === ('clothes'|| 'footwear' || 'headwear') ?
                  <div className="flex mt-6 items-center pb-5  border-gray-100 mb-5">
                    <div className="flex">
                      <span className="mr-3">Color</span>
                      <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                      <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                    </div>
                    <div className="flex ml-6 items-center">
                      <span className="mr-3">Size</span>
                      <div className="relative">
                        <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                          <option>SM</option>
                          <option>M</option>
                          <option>L</option>
                          <option>XL</option>
                        </select>
                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

              :<></> 

            }
            
      <div className='flex flex-row my-10'>
        <div>Quantity</div>
      <button className="flex  justify-center text-white bg-indigo-500 border-0 py-2 mx-2 px-4 focus:outline-none hover:bg-indigo-600 rounded"
        onClick={decrement} 
        disabled={quantity <= 1}
      >
        -
      </button>
      <div >{quantity}</div>
      <button className="flex  justify-center text-white bg-indigo-500 border-0 py-2 mx-2 px-4 focus:outline-none hover:bg-indigo-600 rounded"
        onClick={increment}
      >
        +
      </button>
    </div>

            <div >
              {/* <span className="title-font font-medium text-4xl text-gray-900">Rs. {id.price}</span> */}
              <div className="flex flex-row p-2">
              <button onClick={HandleAddToCart}  className="flex w-1/3 justify-center text-white bg-indigo-500 border-0 py-3 mx-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>
              <button onClick={buyNow}  className="flex w-1/3 justify-center text-white bg-indigo-500 border-0 py-3 mx-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
              </div>
              {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button> */}
            </div> 
          </div>
         </div>
    
  )
}
export default Productdetails