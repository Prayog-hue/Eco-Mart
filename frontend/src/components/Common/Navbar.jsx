import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';

const Navbar = () => {
  const [draweropen, setDraweropen] = useState(false)
  const [navDrawerOpen, setNavDrawerOpen] = useState(false)

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen)
  }

  const toggledrawer = () => {
    setDraweropen(!draweropen);
  }


  return (
    <>
      <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
        {/* logo */}
        <div>
          <Link to="/" className='text-2xl font-medium'>
            EcoMart
          </Link>
        </div>
        {/* center navigation links */}
        <div className='hidden md:flex space-x-6 '>
          <Link to="/collections/all" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
            Men
          </Link>
          <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
            Women
          </Link>
          <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
            Top Wear
          </Link>
          <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
            Bottom Wear
          </Link>
        </div>
        {/* right icons */}
        <div className='flex items-center space-x-4'>
          <Link to="/admin" className='block bg-black px-2 rounded text-sm text-white'>Admin</Link>
          <Link to="/profile" className='hover:text-black'>
            <HiOutlineUser className='h-6 w-6 text-gray-700' />
          </Link>

          <button
            onClick={toggledrawer}
            className='relative hover:text-black'>
            <HiOutlineShoppingBag className='h-6 w-6 text-gray-700' />
            <span className='absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5'>5</span>
          </button>

          {/* searchright */}
          <div className='overflow-hidden'>
            <SearchBar />

          </div>
          <button
            onClick={toggleNavDrawer}
            className='md:hidden'>
            <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
          </button>

        </div>

      </nav>
      <CartDrawer draweropen={draweropen} toggledrawer={toggledrawer} />


      {/* Mobile Navigation  */}
      <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className='flex justify-end p-4'>
          <button>
            <IoMdClose
             onClick={toggleNavDrawer}
              className='h-6 w-6 text-gray-600 ' />
          </button>
        </div>
        <div className='p-4'>
          <h2 className='text-xl font-semibold mb-4'> Menu</h2>
          <nav className='space-y-4 '>

            <Link to="/collections/all" onClick={toggleNavDrawer} className='block
             text-gray-600 hover:text-black'>
              Men
             </Link>

            <Link to="#" onClick={toggleNavDrawer} className='block
             text-gray-600 hover:text-black'>
              Women
             </Link>

            <Link to="#" onClick={toggleNavDrawer} className='block
             text-gray-600 hover:text-black'>
              Top Wear
             </Link>

            <Link to="#" onClick={toggleNavDrawer} className='block
             text-gray-600 hover:text-black'>
              Bottom Wear
             </Link>

          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar
