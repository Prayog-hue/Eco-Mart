
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: 1233321,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: 'Paypal',
      shippingMethod: 'Standard',
      shippingAddress: {
        city: 'BRT',
        Country: 'Nepal',
      },
      orderItems: [
        {
          productId: '1',
          name: 'Shirt',
          price: 120,
          quantity: 1,
          image: 'https://picsum.photos/500/500/?random=16',
        },
        {
          productId: '2',
          name: 'T-Shirt',
          price: 124,
          quantity: 1,
          image: 'https://picsum.photos/500/500/?random=16',
        },
      ],
    };
    setOrderDetails(mockOrderDetails);
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No Order Details Found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          {/* Order Info */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">Order ID: #{orderDetails._id}</h3>
              <p className="text-gray-600">{new Date(orderDetails.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0 space-y-2">
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
                  ${orderDetails.isPaid
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                  }`}
              >
                {orderDetails.isPaid ? 'Approved' : 'Pending'}
              </span>
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
                  ${orderDetails.isDelivered
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                  }`}
              >
                {orderDetails.isDelivered ? 'Delivered' : 'Delivery Pending'}
              </span>
            </div>
          </div>
          {/* Payment and shipping info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? 'Paid' : 'Unpaid'}</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">Shipping Info</h4>
              <p>Shipping Method: {orderDetails.shippingMethod}</p>
              <p>
                Address: {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.Country}`}
              </p>
            </div>
          </div>
          {/* Product list */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <table className="min-w-full text-gray-600 mb-4 border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left" scope="col">
                    Name
                  </th>
                  <th className="py-2 px-4 text-left" scope="col">
                    Unit Price
                  </th>
                  <th className="py-2 px-4 text-left" scope="col">
                    Quantity
                  </th>
                  <th className="py-2 px-4 text-left" scope="col">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems && orderDetails.orderItems.length > 0 ? (
                  orderDetails.orderItems.map((item) => (
                    <tr key={item.productId} className="border-b">
                      <td className="py-2 px-4 align-middle">
                        <div className="flex items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg mr-4"
                          />
                          <Link
                            to={`/product/${item.productId}`}
                            className="text-blue-500 hover:underline"
                          >
                            {item.name}
                          </Link>
                        </div>
                      </td>
                      <td className="py-2 px-4 align-middle">${item.price.toFixed(2)}</td>
                      <td className="py-2 px-4 align-middle">{item.quantity}</td>
                      <td className="py-2 px-4 align-middle">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-2 px-4 text-center">
                      No items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Back to orders link */}
          <Link to="/my-orders" className="text-blue-500 hover:underline">
            Back to My Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;