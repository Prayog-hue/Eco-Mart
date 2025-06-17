import React from 'react'
import heroImg from "../assets/rabbit-hero.webp"
import { Link } from 'react-router-dom'

const Hero = () => {
    const text = " Explore our vacation-ready outfits with fast worldwide shipping.";
  const letters = text.split('').map((letter, index) => (
    <span
      key={index}
      className="animate-letter-color"
      style={{ animationDelay: `${index * 0.1}s` }} // Stagger delay
    >
      {letter}
    </span>
  ));
  return (
  <section className='relative'>
    <img src={heroImg} alt="ecomart" className='w-full h-[500px] md:h-[660px] lg:h-[670px] object-cover' />
    <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center">
        <div className='text-center text-white p-6'>
           <h1 className='animate-color-change text-6xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>
            Vacation <br />Ready
           </h1>
           <p className='text-sm font-bold tracking-tighter md:text-lg mb-6'>
            {letters}
           </p>
           <Link to="#" className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg'>
           Shop Now</Link>
        </div>
    </div>
  </section>
  )
}

export default Hero
