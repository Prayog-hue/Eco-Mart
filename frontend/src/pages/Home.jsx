import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByFilters } from '../Slices/productsSlice'
import axios from 'axios'

const Home = () => {
  const disPatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)
  const [bestSellerProduct, setBestSellerProduct] = useState(null)
  useEffect(() => {

    disPatch(fetchProductsByFilters({
      gender: "Women",
      category: "Bottom Wear",
      limit: 8,
    }))

    //Fetch best seller Product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );;
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Error fetching best seller:", error);
      }
    };
    fetchBestSeller();
  }, [disPatch]);



return (
  <div>
    <Hero />
    <GenderCollectionSection />
    <NewArrivals />
    {/* Best seller */}
    <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
    {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id} />) : (<p className='text-center'>Loading Best Seller Product</p>)}

    <div className='container mx-auto'>
      <h2 className='text-3xl text-center font-bold mb-4'>Top wears for Women</h2>
      <ProductGrid products={products} loading={loading} error={error} />
    </div>
    <FeaturedCollection />
    <FeaturesSection />
  </div>
)
  };

export default Home
