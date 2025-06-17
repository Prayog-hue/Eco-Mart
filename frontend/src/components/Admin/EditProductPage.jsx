import React, { useState } from 'react';

const EditProductPage = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: '',
    sku: '',
    Brand: '',
    sizes: [],
    color: [],
    collections: '',
    material: '',
    gender: '',
    images: [
      {
        url: 'https://picsum.photos/500/500/?random=2',
      },
      {
        url: 'https://picsum.photos/500/500/?random=4',
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product data submitted:', productData);

  };

  const handleImageUplaod = async (e) => {
    const file = e.target.files[0]
    console.log(file);

  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Edit Product</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-4 sm:p-6 space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 max-w-full truncate"
            required
          />
        </div>
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 max-w-full"
            rows={4}
            required
          />
        </div>
        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 max-w-full"
            required
            min="0"
            step="1"
          />
        </div>
        {/* count in stock */}
        <div>
          <label htmlFor="countInStock" className="block text-sm font-semibold text-gray-700 mb-1">
            Count In Stock
          </label>
          <input
            type="number"
            id="countInStock"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 max-w-full"
            required
            min="0"
            step="1"
          />
        </div>
        {/* sku */}
        <div>
          <label htmlFor="sku" className="block text-sm font-semibold text-gray-700 mb-1">
            SKU
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 max-w-full"
            required

          />
        </div>
        {/* sizes */}
        <div>
          <label htmlFor="sku" className="block text-sm font-semibold text-gray-700 mb-1">
            Sizes (comma-seperated)
          </label>
          <input
            type="text"
            id="sizes"
            name="sizes"
            value={productData.sizes.join(",")}
            onChange={(e) => setProductData({ ...productData, sizes: e.target.value.split(",").map((size) => size.trim()) })}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 max-w-full"
            required

          />
        </div>
        {/* colors */}
        <div>
          <label htmlFor="sku" className="block text-sm font-semibold text-gray-700 mb-1">
            Colors (comma-seperated)
          </label>
          <input
            type="text"
            id="sizes"
            name="Colors"
            value={productData.color.join(",")}
            onChange={(e) => setProductData({ ...productData, color: e.target.value.split(",").map((color) => color.trim()) })}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 max-w-full"
            required

          />
        </div>

        {/* image upload */}
        <div className='mb-6'>
          <label htmlFor="" className='block font-semibold mb-2'>Uplaod Image</label>
          <input type="file" onChange={handleImageUplaod} className='cursor-pointer' />
          <div className='flex gap-4 mt-4'>
            {productData.images.map((image, index) => (
              <div key={index}>
                <img src={image.url} alt={image.altText || "Product Image"}
                  className='w-20 h-20 object-cover rounded-md shadow-md' />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;