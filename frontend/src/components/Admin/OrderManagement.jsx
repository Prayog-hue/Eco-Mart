import React from 'react';
import { Link } from 'react-router-dom';

const OrderManagement = () => {
  const orders = [
    {
      _id: 1232321,
      user: {
        name: 'Prayog',
      },
      totalPrice: 110,
      status: 'Processing',
    },
  ];

  const handleStatusChange = (orderId, status)=>{
    console.log({id:orderId , status})
  }

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">Order Management</h2>
      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full min-w-[600px] text-gray-600">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-700 w-[120px]">
                Order ID
              </th>
              <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-700 w-[150px]">
                Customer
              </th>
              <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-700 w-[100px]">
                Total Price
              </th>
              <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-700 w-[120px]">
                Status
              </th>
              <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-700 w-[150px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
                  <td className="py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-900 max-w-[120px] truncate">
                    #{order._id}
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm max-w-[150px] truncate">
                    {order.user.name}
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm max-w-[100px]">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                 <select
                  value={order.status}
                   onChange={(e)=>handleStatusChange(order._id, e.target.value)} 
                 className=' py-2 px-3 sm:py-3 sm:px-4 sm:mt-2 mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
                 >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>




                 </select>
                  <td className="py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm max-w-[150px]">
                   
                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                     Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-xs sm:text-sm text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;