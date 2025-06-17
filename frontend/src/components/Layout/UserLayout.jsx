import React from 'react'
import Header from '../Common/header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
   <>
   {/* header */}
  <Header/>
   {/* main content */}
   <main>
  <Outlet/>
   </main>
   {/* footer */}
   <Footer/>
   </>
  )
}

export default UserLayout
