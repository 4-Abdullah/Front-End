
import React, {useEffect, useState} from 'react'
import Product from './product'
import OIP from '../images/OIP.png'
import { useNavigate, useSearchParams } from 'react-router-dom';
const  HomePage = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  const [searchparams] = useSearchParams()
  const user = searchparams.get('username')
  // const [products, setProducts] = useState(null);
  //  const [loading, setLoading] = useState(true);
  //  const [error, setError] = useState(null);
  const backendUrl = process.env.Back_end_url
  
  useEffect(() => {
  (async () => {
      // try {
        const response = await fetch(`${backendUrl}/products`);

        console.log("Status Code:", response.status);
        console.log("Response OK?", response.ok);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response JSON:", data);

        setProducts(data); // Store data in state
      // } catch (error) {
        // console.error("Error fetching products:", error);
      // }
    // };
  })();
  },[]);

  const Home =(e)=>{
      
    if(user!=null){
        const destination=`/?username=${user}`
        navigate(destination) 

    }
    else{
        const destination= `/`
        navigate(destination) 

    }
  }
  // if (!data) return <div>Loading...</div>;

  return (
    <main className='list-header'>
  <div className='container mx-auto my-2 px-4 '>
    <section className="text-gray-600 body-font">
    <div className="flex flex-wrap w-full md:mb-20">
    <div class="relative bg-indigo-600 text-white">
  <div class="container  mx-auto flex flex-col-reverse md:flex-row items-center py-10 px-6 md:py-20">
     {/* Text Content  */}
    <div class="text-center md:text-left md:w-1/2">
      <h1 class="text-4xl font-bold mb-4">
        Welcome to <span class="text-yellow-400">MyShop</span>
      </h1>
      <p class="text-lg mb-6">
        Explore the best deals on products you love! Shop now and enjoy exclusive discounts.
      </p>
      <button
        onClick={Home}
        class="inline-block bg-yellow-400 text-indigo-600 font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition duration-200"
      >
        Shop Now
      </button>
    </div>

    {/* Image Content */}
    <div class="md:w-1/2">
      <img
        src={OIP}
        alt="Hero Banner"
        class="w-full h-auto rounded-lg shadow-lg"
      />
    </div>
  </div>
</div>

      {/* <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h1 className="text-2xl font-medium title-font mb-2 text-gray-100">Product List</h1>
      </div>  */}
      
    </div>
    <div className="flex flex-wrap -m-4">
    {products.map( p =>
       <Product key={p._id} {...p}/>)}

    </div>
    </section>
  </div>
  </main>
  );
};

export default HomePage;