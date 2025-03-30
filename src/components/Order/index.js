import { useEffect, useState } from "react"
import { useSearchParams, useParams, useLocation } from 'react-router-dom'
import Orderdetails from "./orderdetails";
import { loadStripe } from "@stripe/stripe-js";

const Order = () => {
    const [products, setProducts] = useState([]);
    const { id } = useParams();
    const location  = useLocation()
    const productObj = location.state || {}; 
    const [searchParams]=useSearchParams();
    const user =searchParams.get('username')
    const payment_method = {"payment_method": "pm_card_visa"}
    const Delivery_fee = 0
    console.log(user, id, productObj.quantity)    
    
      const [formData, setFormData] = useState({
        fullname: "",
        phone: "",
        province: "",
        city: "",
        address: "",
      });
    
      const provinces = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Federal Capital Territory"];
      const cities = {
        Punjab: ["Lahore", "Rawalpindi", "Faisalabad", "Multan"],
        Sindh: ["Karachi", "Hyderabad", "Sukkur"],
        "Khyber Pakhtunkhwa": ["Peshawar", "Abbottabad", "Mardan"],
        Balochistan: ["Quetta", "Gwadar", "Turbat"],
        "Federal Capital Territory": ["Islamabad"],
      };
     
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted: ", formData);
        // Add API call here
      };


    
      const Stripe_publish_key = process.env.Stripe_publish_key
      const backendUrl = process.env.Back_end_url
    const ProceedtoCheckout = async () => {
      const stripe = await loadStripe(`${Stripe_publish_key}`);
          const response = await fetch(`${backendUrl}/order/${id}?username=${user}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}` // Include JWT token here
            },
            // credentials: "include", // Ensures cookies are sent/received
            body: JSON.stringify({productObj, payment_method, formData}),
        });
        
          console.log("Status Code:", response.status);
          console.log("Response OK?", response.ok);
          const session = await response.json();
          const result = await stripe.redirectToCheckout({
            sessionId:session.sessionId
          })
    
          if((result).error){
            console.log(result.error)
          }
         
    };

 

return(
     <div className="bg-gray-200 p-2 justify-center items-center">

        <div className="flex flex-row mx-20 px-10 py-4 bg-gray-200">

          <form className="bg-white mx-10 w-full p-4 border-l-stone-400 flex flex-col gap-10 font-italic">
            {/* <form onSubmit={handleSubmit} className="bg-gray-50 p-2 border-l-stone-400 flex flex-col gap-4 font-italic"> */}
              <div className="text-2xl">Shipping Address</div>
              <div className=" flex flex-row gap-20">
                  <div className=" flex flex-col ">
                    <label htmlFor="fullname">Full Name</label>
                    <input className="p-1 text-black focus:text-black border-black border-opacity-25 border-2 w-56"
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                    />
                 </div>
                  <div className=" flex flex-col ">
                    <label htmlFor="phone">Phone Number</label>
                    <input className="p-1 text-black focus:text-black border-black border-opacity-25 border-2 w-56"
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
            </div>

            <div className=" flex flex-row gap-20">
                <div className=" flex flex-col ">

                    <label htmlFor="province">Province</label>
                    <select className="border-opacity-25 border-2"
                      id="province"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled >Please choose your province</option>
                      {provinces.map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                </div>

                <div className=" flex flex-col">
                    <label htmlFor="city">City</label>
                    <select className="border-opacity-25 border-2"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      disabled={!formData.province}
                    >
                      <option value="" disabled>Please choose your city</option>
                      {formData.province &&
                        cities[formData.province]?.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                </div>
             </div>

            <div className=" flex flex-row gap-2">
                <div className=" flex flex-col w-full">
                  <label htmlFor="address">Address</label>
                  <textarea className="w-full border-opacity-25 border-2"
                    id="address"
                    name="address"
                    // typeof="text"
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                  </div>
            </div>
      {/* <button className="w-56 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4" type="submit">Submit</button> */}
    {/* </form> */}
          </form>

          <div className="bg-white p-4 border-l-stone-400 flex flex-col justify-between mx-20 gap-2 font-italic">
                <div>Order Summmary</div>
                <div className="flex flex-row justify-between">
                  <div className="self-start">Total Items({productObj.quantity} Items)</div>
                  <div className="self-end">{((productObj.id.price)*(productObj.quantity))}</div>
                </div>
                <div className="flex flex-row border-b-2 justify-between">
                  <div className="self-start">Delivery Fee</div>
                  <div className="self-end">{Delivery_fee}</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="self-start">Total:</div>
                  <div className="self-end">{((productObj.id.price)*(productObj.quantity)) + (Delivery_fee)}</div>
                </div>
                <button className="w-56 h-10 bg-gray-200 p-0 border-0 self-end text-gray-500 ml-4" onClick={ProceedtoCheckout}
                      disabled={!(formData.address&&formData.city&&formData.fullname&&formData.phone&&formData.province)}>
                                  Proceed to Checkout
                  </button>
          </div>
      </div>
      <div className="bg-white  p-2 mx-40  max-w-3xl">
      <Orderdetails id={productObj.id} quantity={productObj.quantity} />
      </div>
 </div>

)
}

export default Order