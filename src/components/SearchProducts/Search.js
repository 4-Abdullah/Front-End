
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
// import Order from '../components/Order/index';
import { useState } from 'react';


const  Search =( id )=>{
  console.log(id)
  const [searchParams] = useSearchParams();
  const user = searchParams.get("username");
  const  navigate = useNavigate()
  const [quantity, setquantity] = useState(1);

 

  const gotoProduct = () => {
    const destination = user
      ? `/products/${id._id}?username=${user}`
      : `/products/${id._id}`;

    navigate(destination);
  };


  return (
    <div key={id.productname} className="xl:w-1/4 md:w-1/4 p-2">
    <div className="bg-gray-100 p-6 rounded-lg">
      <button onClick={gotoProduct}>
          <img src={id.image[0]} alt={id.productname} width={250} height={200} />
          <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
            {id.category}
          </h3>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-4 multi-line-truncate">
            {id.productname}
          </h2>
          <p className="text-orange-500">Rs. {id.price}</p>
        </button>
      
    </div>
   </div>
    
  )
}
export default Search