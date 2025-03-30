import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Product = (_id) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = searchParams.get("username");
    console.log(user);

//  const import_Img = new Cloudinary({
//        import Price from './../components/price';
    //  cloud: { cloudName: "dbsht4sdc" }, // Replace with your Cloudinary Cloud Name
//           }).image(attributes.image.data.attributes.url)
  

  const gotoProduct = () => {
    const destination = user
      ? `/products/${_id._id}?username=${user}`
      : `/products/${_id._id}`;

    navigate(destination);
  };

  return (
    <div key={_id.productname} className="xl:w-1/4 md:w-1/4 p-2">
      <div className="bg-gray-100 p-6 rounded-lg">
        <button onClick={gotoProduct}>
            <img src={_id.image[0]} alt={_id.productname} width={250} height={200} />
            <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
              {_id.category}
            </h3>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-4 multi-line-truncate">
              {_id.productname}
            </h2>
            <p className="text-orange-500">Rs. {_id.price}</p>
          </button>
        {/* <button
          onClick={Buynow}
          className="my-2 text-white bg-indigo-500 border-0 py-1 md:py-2 px-2 md:px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm"
        >
          Buy Now
        </button> */}
      </div>
     </div>
  );
};

export default Product;
