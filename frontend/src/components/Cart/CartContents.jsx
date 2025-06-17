import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'

const CartContents = () => {
    const cartproducts = [
        {
            productId: 1,
            name: "T-shirt",
            size: "M",
            color: "Red",
            quantity: 1,
            price: 2000,
            image: "https://picsum.photos/200?random=4",
        },
        {
            productId: 2,
            name: "Jeans",
            size: "M",
            color: "Black",
            quantity: 1,
            price: 2300,
            image: "https://picsum.photos/200?random=3",
        }
    ]
    return (
        <div>
            {cartproducts.map((product, index) => (
                <div key={index} 
                className='flex items-start justify-between py-4 border-b'>
               <div className="flex items-start">
                <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded ' />
                <div>
                    <h3> {product.name}</h3>
                    <p className='text-sm text-gray-500'>
                        Size: {product.size} | Color: {product.color}
                    </p>
                    <div className='flex items-center mt-2'>
                        <button className='border rounded px-2 py-1 text-xl font-medium '>
                            -
                        </button>
                        <span className='mx-4'>{product.quantity}</span>
                        <button className='border rounded px-2 py-1 text-xl font-medium '>
                            +
                        </button>
                     
                    </div>
                </div>
                <div className='flex flex-col items-end '>
                <p className='whitespace-nowrap'>RS {product.price.toLocaleString()}
               

                </p>
                <button>
                  <RiDeleteBin3Line className='h-6 w-6  ml-2 text-red-600'/>
              </button>
              </div>
               
               </div>
              
               
                 </div>
                 
                

            ))}

        </div>
    )
}

export default CartContents
