import {jwtDecode} from 'jwt-decode';
import { useSearchParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from 'react'; 
import { CartContext, } from '../ShoppingCart/CartContext';

const Header = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
    const user = searchParams.get("username");
    const [searchQuery, setSearchQuery] = useState("");
    const [userauthToken, setuserauthToken] = useState(false)
  // const [cartItem, setcartItem] = useState([]);
 // if not already imported

const [open, setOpen] = useState(false);
  // const { cartLength } = useContext(CartContext)
  const { cartLength } = useContext(CartContext);
  console.log("Cart Length from Context:", cartLength); // Debug to confirm the value


// console.log("Cart Length in Header:", cartLength);
// const refreshAccessToken = async () => {
const backendUrl = process.env.REACT_APP_Back_end_url


// const checkTokenExpiration = (token) => {
//   try {
//     const { exp } = jwtDecode(token); // Decode the token to get expiration time
//     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//     console.log(exp<currentTime)
//     return exp < currentTime; // Check if token is expired
//   } catch (error) {
//     console.error('Failed to decode token:', error);
//     return true; // Treat token as expired if decoding fails
//   }
// };
const checkTokenExpiration = (token) => {
  try {
    if (!token) {
      console.error('No token provided'); // Log if token is missing
      return false; // Treat as expired
    }

    const { exp } = jwtDecode(token); // Decode the token to get expiration time
    console.log(exp)
    if (!exp) {
      console.error('Token does not contain an exp field');
      return false; // Treat as expired
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    console.log('Token expired:', exp < currentTime); // Log the expiration status for debugging
    return exp < currentTime; // Return whether the token is expired
  } catch (error) {
    console.error('Failed to decode token:', error); // Log decoding errors
    return true; // Treat token as expired if decoding fails
  }
};


  useEffect(()=>{
    if(user){
    const authToken = localStorage.getItem('authToken')
console.log(authToken)
if(authToken){
  
if(checkTokenExpiration(authToken)){
    (async()=> {
  const response = await fetch(`${backendUrl}/refresh`, {
    method: 'GET',
    credentials: 'include', // Include cookies in the request
  });

  if (response.ok) {
    const { accessToken } = await response.json();
    localStorage.setItem('accessToken', accessToken);  // Save the new access token
    setuserauthToken(true) 
  } else {
    console.error('Failed to refresh token');
  }
// };
} )()
}
}
else{
  setuserauthToken(false)
}}
},[userauthToken])
// const authToken = localStorage.getItem('authToken')
// if(authToken){
//   setuserauthToken(true)
// }
// else{
//   setuserauthToken(false)
// }
  const [buttonText, setButtonText] = useState('');
      // const router = useRouter()
      useEffect(() => {
        setButtonText(user ? user: 'Login');

      }, [user]);


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
  
    
  
    const gotoBagsPage =(e)=>{
       let  category = "Bags"
      if(user!=null){
          const destination=`/Category?category=${category}&username=${user}`
          navigate(destination) 
      }
      else{
          const destination= `/Category?category=${category}`
          navigate(destination) 
      }
    }
    const gottoHoodiesPage =(e)=>{
      let  category = "Hoodies"
      if(user!=null){
          const destination=`/Category?category=${category}&username=${user}`
          navigate(destination) 
      }
      else{
          const destination= `/Category?category=${category}`
          navigate(destination) 
      }
    }
    
  
    const Cart =(e)=>{
      
      if(user!=null){
          const destination=`/cart?username=${user}`
          navigate(destination) 
      }
      else{
          const destination= `/Login`
          navigate(destination) 
      }
    }

    const handle =(e)=>{
      
      if(user!=null){
          setOpen(!open)
      }
      else{
          const destination= `/Login`
          navigate(destination) 
      }
    }
  
    const handleSearch = async () => {
      
        if(user!=null){
          const destination=`/searchProducts?search=${searchQuery}&username=${user}`
          navigate(destination) 
      }
      else{
          const destination= `/searchProducts?search=${searchQuery}`
          navigate(destination) 
      }
      
    };
  

  return (
    <div className=' bg-slate-700'>
      <header className="text-gray-600 body-font">
    
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <button onClick={Home} className="flex title-font font-medium items-center  mb-4 md:mb-0">
        
        <span className="ml-3 text-xl text-white">MyShop</span>
      </button>  
      <div className=" md:ml-auto flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Search
          </button>
      </div>
      <nav className="md:ml-auto text-white flex flex-wrap items-center text-base justify-center">

        {/* <button className="mr-5 text-black hover:text-gray-900" onClick={Home}>Home</button> */}
        <button className="mr-5 hover:text-gray-900" onClick={gotoBagsPage}>Bags</button>
        <button className="mr-5 hover:text-gray-900" onClick={gottoHoodiesPage}>Hoodies</button>
      {/* <Link to={`/Cart`}> */}
        <button className="btn btn-primary hover:text-gray-900" onClick={Cart} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">cart
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>

            <div
              className="rounded-full absolute w-5 h-5 text-sm text-white bg-lime-700   d-flex justify-content-center align-items-center">
                {cartLength}
          
            </div>
          </button>
        {/* </Link> */}
        </nav>
         <div className="relative inline-block text-left">
  <div>
    <button
      type="button"
      className="inline-flex justify-center w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      onClick={handle}
    >
      {buttonText}
    </button>
  </div>

  {open && (
    <div className="absolute right-0 mt-2 w-56 z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="py-1">
        <button
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          onClick={() => {
            localStorage.clear();
          setOpen(!open)             
            navigate('/');
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )}
</div>
      {/* <button onClick={handle} className="my-2  h-12 text-white bg-black border-0 py-1 md:py-2 px-2 md:px-4 focus:outline-none hover:bg-slate-900 rounded-full text-sm">{buttonText}</button> */}
    </div>
  </header></div>
      
  )
}

export default Header