import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa';
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../Slices/productsSlice';

const CollectionPage = () => {
    const {collection}= useParams()
    const[searchparams] = useSearchParams()
    const dispatch = useDispatch()
    const {products, loading,error} = useSelector((state)=> state.products)
    const queryParams = Object.fromEntries([...searchparams])
    const sidebarRef = useRef(null)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

useEffect(()=>{
    dispatch(fetchProductsByFilters({collection, ...queryParams}))
},[dispatch,collection,searchparams])

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen)

    }

    const handleClickOutside = (e) => {
        // close siddebar if clicked outside
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSideBarOpen(false)
        }
    }

    useEffect(() => {
        // event listener for clicks
        document.addEventListener("mousedown", handleClickOutside)
        //clean event listener
        return()=>{
        document.removeEventListener("mousedown", handleClickOutside)
        }
    },[])

  


   
    return (
        <div className='flex flex-col lg:flex-row'>
            {/* mobile filter */}
            <button onClick={toggleSideBar} className='lg:hidden border p-2 flex justify-center items-center'>
                <FaFilter className='mr-2' />Filters
            </button>
            {/* filter sidebar */}
            <div ref={sidebarRef} className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
                <FilterSidebar />
            </div>
            <div className='flex-grow p-4'>
                <h2 className='text-2xl uppercase mb-4'> All Collection</h2>

                {/* sort options */}
                <SortOptions/>

                {/* productgrid */}
                <ProductGrid products={products} loading={loading} error={error}/>
            </div>
        </div>
    )
}

export default CollectionPage
