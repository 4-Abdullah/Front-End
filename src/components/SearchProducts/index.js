import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Search from "./Search";

function ProductSearch() {
  const navigate = useNavigate()

const [products, setProducts] = useState([]);

   
    const [searchParams] = useSearchParams();
     const category = searchParams.get("category");
      const search = searchParams.get("search");
    console.log(search, category);

      const backendUrl = process.env.REACT_APP_Back_end_url
    

    useEffect(() => {
      (async () => {
        try {
        setProducts([])
          let url = `${backendUrl}/products`;
          if (search!=null) url += `?search=${search}`;
          if (category!=null) url += `/category?category=${category}`;
          
          // Perform API call
          const response = await fetch(url);
          const data = await response.json();
          console.log("Response JSON:", data);
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      })();
    }, [search,category]);

  if (products.length<1) return <div className='flex items-center justify-center h-screen'><div className=" h-8 w-8 border-4 border-dashed border-spacing-2 rounded-full animate-spin border-blue-500"/></div>
  
  return (
    <main className='list-header'>
  <div className='container mx-auto my-2 px-4 '>
    <section className="text-gray-600 body-font">
    
      <h1 className="text-white text-3xl">{ search!=null?`Search Results for "${search}"` : `${category}`}</h1>
    
      <div className=" flex flex-wrap">
          {products?.map(p => <Search key={p._id} {...p} />)}
      </div>
   
    </section>
    </div>
    </main>
  );
}

export default ProductSearch;
