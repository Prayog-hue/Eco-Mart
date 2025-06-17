import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const NewArrivals = () => {
    const scrollRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setstartX] = useState(0)
    const [scrollLeft, setscrollLeft] = useState(0)
    const [canScrollLeft, setcanScrollLeft] = useState(false)
    const [canScrollRight, setcanScrollRight] = useState(true)
    const NewArrivals = [
        {
            _id: "1",
            name: "Stylish Jacket",
            price: 4000,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=2",
                    altText: "Stylish Jacket",
                },
            ],
        },
        {
            _id: "2",
            name: "Stylish Jacket",
            price: 4000,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=3",
                    altText: "Stylish Jacket",
                },
            ],
        },
        {
            _id: "3",
            name: "Stylish Jacket",
            price: 4000,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=5",
                    altText: "Stylish Jacket",
                },
            ],
        },
        {
            _id: "4",
            name: "Stylish Jacket",
            price: 4000,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=6",
                    altText: "Stylish Jacket",
                },
            ],
        },
        {
            _id: "5",
            name: "Stylish Jacket",
            price: 4000,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=7",
                    altText: "Stylish Jacket",
                },
            ],
        },
        {
            _id: "6",
            name: "Stylish Jacket",
            price: 4000,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=8",
                    altText: "Stylish Jacket",
                },
            ],
        },
        {
            _id: "7",
            name: "Stylish Jacket",
            price: 4000,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=9",
                    altText: "Stylish Jacket",
                },
            ],
        },
        {
            _id: "8",
            name: "Stylish Jacket",
            price: 4000,
            images: [
                {
                    url: "https://picsum.photos/500/500/?random=10",
                    altText: "Stylish Jacket",
                },
            ],
        },
    ]
const handleMouseDown = (e) => { 
    setIsDragging(true)
    setstartX(e.pageX - scrollRef.current.offsetLeft)
    setscrollLeft(scrollRef.current.scrollLeft);
}
const handleMouseUpOrLeave = (e) => { 
 setIsDragging(false)
 }

 const handleMouseMove = (e) => { 
    if(!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = x-startX 
    scrollRef.current.scrollLeft = scrollLeft - walk ;
  }


    const scroll = (direction)=>{
        const scrollAmount = direction === "left" ? -500 : 500
        scrollRef.current.scrollBy({left: scrollAmount , behavior: "smooth"})
    }
    //Update scroll buttons
    const updatescrollButtons = () => {
        const container = scrollRef.current

        if(container){
            const leftScroll = container.scrollLeft
            const rightScrollabe = container.scrollWidth> leftScroll + container.clientWidth


           setcanScrollLeft(leftScroll>0)
           setcanScrollRight(rightScrollabe)
        }
      
    }

    useEffect(() => {
        const container = scrollRef.current
        if (container) {
            container.addEventListener("scroll", updatescrollButtons)
            updatescrollButtons();
            return()=> container.removeEventListener("scroll" , updatescrollButtons)
        }
    })


    return ( 


        <section className='py-16 px-4 lg:px-0'>
            <div className="container mx-auto text-center mb-10 relative">
                <h2 className='text-3xl font-bold mb-4'>
                    Explore New Arrivals
                </h2>
                <p className='text-lg text-gray-600 mb-8'>
                    Discover this latest styles straight off therunway, freshly added to keep your wardobe on the cutting edge of fashion.
                </p>

                {/* scroll btn */}
                <div className='absolute right-0 bottom-[-40px] flex space-x-2 '>
                    <button onClick={()=>scroll("left")}
                    disabled = {!canScrollLeft}
                    className={`p-2  rounded border ${canScrollLeft ? "bg-white text-black" :"bg-gray-200 text-gray-400 cursor-not-allowed"} hover:bg-gray-100 transition-colors`}>
                        <FiChevronLeft className='text-2xl' />
                    </button>
                    <button 
                    onClick={()=>scroll("right")}
                    disabled = {!canScrollRight}
                    className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" :"bg-gray-200 text-gray-400 cursor-not-allowed"} hover:bg-gray-100 transition-colors`}>

                        <FiChevronRight className='text-2xl' />
                    </button>
                </div>
            </div>

            {/* scrollable content */}
            <div ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}

                className={`container mx-auto overflow-x-auto whitespace-nowrap px-0 relative custom-scrollbar ${isDragging ? "cursor-grabbing": "cursor-grab"}`}>
                <div className="inline-flex space-x-3">
                    {NewArrivals.map((product) => (
                        <div key={product._id} className="flex-shrink-0 min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
                            <img
                                src={product.images[0]?.url}
                                alt={product.images[0]?.altText || product.name}
                                className="w-full h-[500px] object-cover rounded-lg"
                                draggable = "false"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
                                <Link to={`/product/${product._id}`} className='block'>
                                    <h4 className='font-medium'>{product.name}</h4>
                                    <p className='mt-1'>${product.price}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )


}

export default NewArrivals
