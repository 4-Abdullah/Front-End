 "use client"
import React, { useEffect, useState } from 'react';
import Productdetails from './productdetails';

const Data = ({ id, user}) => {
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
useEffect(() => {
  (async () => {
   
        const response = await fetch(`/products/${id}`);

        console.log("Status Code:", response.status);
        console.log("Response OK?", response.ok);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response JSON:", data);

        setProducts(data); // Store data in state
     
  })();
  },[id]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;
  if (!products) return <div>No product data available.</div>;

  return (
    <div className='bg-gray-200'>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container p-10 mx-auto">
          {products?.map(p => <Productdetails key={p._id} {...p} />)}
          {/* <img src={products[0].image[0]} alt={products[0].productname}  width={500} height={400} /> */}
        </div>
      </section>
    </div>
  );
};

export default Data;
