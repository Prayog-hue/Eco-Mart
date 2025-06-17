import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PayPalButton from './PayPalButton'
const cart = {
    products: [
        {
            name: "Classic T-Shirt",
            size: ["S", "M", "L"],
            color: ["Red", "Blue", "White"],
            price: 25,
            image: "https://picsum.photos/500/500?random=1"
        },
        {
            name: "Slim Fit Jeans",
            size: ["M", "L", "XL"],
            color: ["Blue", "Black", "Gray"],
            price: 45,
            image: "https://picsum.photos/500/500?random=2"
        },
    ],
    totalPrice: 70,
}

const Checkout = () => {
    const navigate = useNavigate()
    const [checkoutId, setCheckoutId] = useState(null)
    const [ShippingAddress, SetshippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    })
    const handleCreateCheckout = (e) => {
        e.preventDefault()
        setCheckoutId(123)
    }
    const handlePaymentSuccess = (Details) => {
        console.log("Payment Successful", Details);
        navigate("/order-confirmation")
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
            {/* left section */}
            <div className='bg-white rounded-lg p-6'>
                <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
                <form onSubmit={handleCreateCheckout} >
                    <h3 className='text-lg mb-4'>
                        Contact Details
                    </h3>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Email</label>
                        <input
                            type="email"
                            value="user@example.com"
                            className='w-full p-2 border rounded'
                            disabled />
                    </div>
                    <h3 className='text-lg mb-4 font-semibold'>Delivery</h3>
                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-gray-700'>First Name</label>
                            <input
                                onChange={(e) =>
                                    SetshippingAddress({
                                        ...ShippingAddress,
                                        firstName: e.target.value,
                                    })}
                                type="text"
                                value={ShippingAddress.firstName}
                                className='w-full p-2 border rounded'
                                required />
                        </div>
                        <div>
                            <label className='block text-gray-700'>Last Name</label>
                            <input
                                onChange={(e) =>
                                    SetshippingAddress({
                                        ...ShippingAddress,
                                        firstName: e.target.value,
                                    })}
                                type="text"
                                value={ShippingAddress.lastName}
                                className='w-full p-2 border rounded'
                                required />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Address</label>
                        <input
                            type="text"
                            value={ShippingAddress.address}
                            onChange={(e) =>
                                SetshippingAddress({
                                    ...SetshippingAddress,
                                    address: e.target.value
                                })}
                            className='w-full p-2 border rounded'
                            required />
                    </div>
                    <div className='mb-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-gray-700'>City</label>
                            <input
                                onChange={(e) =>
                                    SetshippingAddress({
                                        ...ShippingAddress,
                                        city: e.target.value,
                                    })}
                                type="text"
                                value={ShippingAddress.city}
                                className='w-full p-2 border rounded'
                                required />
                        </div>
                        <div>
                            <label className='block text-gray-700'>Postal Code</label>
                            <input
                                onChange={(e) =>
                                    SetshippingAddress({
                                        ...ShippingAddress,
                                        postalCode: e.target.value,
                                    })}
                                type="text"
                                value={ShippingAddress.postalCode}
                                className='w-full p-2 border rounded'
                                required />
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700'>Country</label>
                        <input
                            type="text"
                            value={ShippingAddress.country}
                            onChange={(e) =>
                                SetshippingAddress({
                                    ...SetshippingAddress,
                                    country: e.target.value
                                })}
                            className='w-full p-2 border rounded'
                            required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Phone </label>
                        <input
                            type="text"
                            value={ShippingAddress.phone}
                            onChange={(e) =>
                                SetshippingAddress({
                                    ...SetshippingAddress,
                                    phone: e.target.value
                                })}
                            className='w-full p-2 border rounded'
                            required />
                    </div>
                    <div className='mt-6'>
                        {!checkoutId ? (
                            <button
                                type='submit'
                                className='w-full bg-black text-white py-3 rounded'
                            >Continue to payment</button>
                        ) : (
                            <div>
                                <h3 className='text-lg mb-4'>Pay with Paypal</h3>
                                <PayPalButton amount={100} onSuccess={handlePaymentSuccess} onError={(err) => alert("Payment failed. Please Try again.")} />
                            </div>

                        )}
                    </div>
                </form>
            </div>
            {/* right section */}
            <div className='bg-gray-50 p-6 rounded-lg '>
                <h3 className='text-lg mb-4'>Order Summary</h3>
                <div className='border-t py-4 mb-4 '>
                    {cart.products.map((product, index) => (
                        <div key={index} className='flex items-start justify-between py-2 border-b'>
                            <div className='flex items-start'>
                                <img src={product.image} alt={product.name} className='w-full h-24 object-cover mr-4' />
                                <div>
                                    <h3 className='text-lg'>{product.name}</h3>
                                    <p className='text-gray-500'>Size: {product.size}</p>
                                    <p className='text-gray-500'>Color:{product.color}</p>
                                    <p className='text-l font-semibold'>${product.price?.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between items-center text-lg mb-4'>
                    <p>Subtotal</p>
                    <p className='font-bold'>${cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className='flex justify-between items-center text-lg'>
                    <p>Shipping</p>
                    <p>Free</p>
                    </div>
                    <div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
                        <p>Total</p>
                        <p>${cart.totalPrice?.toLocaleString()}</p>
                    </div>
                
            </div>
        </div>
    )
}

export default Checkout


