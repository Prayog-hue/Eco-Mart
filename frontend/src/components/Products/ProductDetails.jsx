import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../Slices/productsSlice';
import { addToCart } from '../../Slices/cartSlice';




const ProductDetails = ({productId}) => {
 const {id} = useParams()
 const disPatch = useDispatch()
 const {selectedProduct, loading, error, similarProducts} = useSelector((state)=> state.products)
 const {user, guestId}= useSelector((state)=> state.auth)


  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(""); // Fixed casing
  const [selectedColor, setSelectedColor] = useState(""); // Fixed casing
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;
  useEffect(()=>{
if(productFetchId){
  disPatch(fetchProductDetails(productFetchId))
  disPatch(fetchSimilarProducts({id: productFetchId}))
}
  },[disPatch, productFetchId])

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, []); // Removed selectedProduct from deps since it's static

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to cart.", {
        duration: 1500,
      });
      return;
    }

    setIsButtonDisabled(true); // Disable button during "adding" process

 disPatch(
  addToCart({
    productId: productFetchId,
    quantity,
    size: selectedSize,
    color: selectedColor,
    guestId,
    userId: user?._id,

  })
 )
 .then(()=>{
  toast.success("Product added to the cart!"),{
    duration:1000
  }
 })
 .finally(()=>{
  setIsButtonDisabled(false)
 })
  };
  if(loading){
    return <p>Loading...</p>
  }
if(error){
  <p> Error: {error}</p>
}
  return (
    <div className="p-6">
      {selectedProduct && (
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* left thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* main image */}
          <div className="md:w-3/5">
            <div className="mb-4">
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
          {/* Mobile Thumbnails */}
          <div className="md:hidden flex  space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>
          {/* Right side */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              RS {selectedProduct.originalPrice}
            </p>
            <p className="text-xl text-gray-800 font-bold mb-2">
              RS {selectedProduct.price}
            </p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            <div className="mb-4"></div>
            <p className="text-gray-700">Color:</p>
            <div className="flex gap-2 mt-2">
              {selectedProduct.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColor === color ? "border-4 border-black" : "border-gray-300"
                  }`}
                  style={{
                    backgroundColor: color.toLowerCase(),
                  }}
                ></button>
              ))}
            </div>

            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size ? "bg-black text-white" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${
                isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"
              }`}
            >
              {isButtonDisabled ? "Adding" : "ADD TO CART"}
            </button>
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand:</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material:</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='mt-20'>
            <h2 className='text-2xl text-center font-bold mb-4'> You may also like</h2>
            <ProductGrid products={similarProducts} loading={loading} error={error}/>
        </div>
      </div>
      )}
    </div>
  );
};

export default ProductDetails;