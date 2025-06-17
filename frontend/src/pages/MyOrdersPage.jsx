import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate fetching orders
    setTimeout(() => {
      const mockorders = [
        {
          _id: "123",
          createdAt: new Date(),
          shippingAddress: { city: "Brt", Country: "Nepal" },
          orderItems: [
            {
              name: "Product-1",
              image: "https://picsum.photos/500/500/?random=3",
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          _id: "345",
          createdAt: new Date(),
          shippingAddress: { city: "Brt", Country: "Nepal" },
          orderItems: [
            {
              name: "Product-1",
              image: "https://picsum.photos/500/500/?random=77",
            },
          ],
          totalPrice: 100,
          isPaid: false,
        },
      ];
      setOrders(mockorders); // You can set this to [] to test "No Orders"
    }, 1000);
  }, []);

  const handleRowClick = (order) => { 
    navigate(`/order/${order}`)
   }

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <table className="w-full text-left text-gray-500 text-xs sm:text-sm">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-2 sm:px-4 sm:py-3">Image</th>
              <th className="py-2 px-2 sm:px-4 sm:py-3">Order</th>
              <th className="py-2 px-2 sm:px-4 sm:py-3">Created</th>
              <th className="py-2 px-2 sm:px-4 sm:py-3">Address</th>
              <th className="py-2 px-2 sm:px-4 sm:py-3">Items</th>
              <th className="py-2 px-2 sm:px-4 sm:py-3">Price</th>
              <th className="py-2 px-2 sm:px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={()=>handleRowClick(order._id)}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:px-4 sm:py-3">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-2 sm:px-4 sm:py-3 font-bold text-black">#{order._id}</td>
                  <td className="py-2 px-2 sm:px-4 sm:py-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 sm:px-4 sm:py-3">
                    {order.shippingAddress.city}, {order.shippingAddress.Country}
                  </td>
                  <td className="py-2 px-2 sm:px-4 sm:py-3">{order.orderItems.length}</td>
                  <td className="py-2 px-2 sm:px-4 sm:py-3">${order.totalPrice}</td>
                  <td className="py-2 px-2 sm:px-4 sm:py-3">
                    <span
                      className={`px-1 py-1 sm:px-2 sm:py-1 rounded text-xs ${
                        order.isPaid
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-4 px-2 sm:px-4 text-center text-gray-500"
                >
                  No orders placed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;