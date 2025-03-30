import { useEffect, useState } from "react"
import { useSearchParams } from 'react-router-dom'
import logo512 from '../../logo512.png'

const Orderdetails = ({id, quantity}) => {
  console.log(id, quantity)
 
return(
  
   
        <div className="flex flex-row  ">
          <img src={id.image[0]} alt={id.productname}  width={100} height={100} />
             <div className=" justify-center items-center gap-x-28  flex flex-wrap"> 
                <div className="text-gray-900   text-xl ">{id.productname}</div>
                  {/* <div className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                    {id.category}
                  </div> */}
                  <span className="title-font font-medium text-2xl text-gray-900">Rs. {id.price}</span>
                  <div className="flex flex-col px-2">
                    <div>Qty</div>
                        <span className="title-font font-medium text-lg text-gray-900">{quantity}</span>
                  </div>
           </div> 
      
        </div>
)
}

export default Orderdetails