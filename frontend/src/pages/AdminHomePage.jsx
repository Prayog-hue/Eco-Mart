import React from 'react';
import { Link } from 'react-router-dom';

const AdminHomePage = () => {
  const orders = [
    {
        _id: 213323,
        user: { name: 'Prayog Pokhrel' },
        totalPrice: 110,
        status: 'Processing',
      },
      {
        _id: 213324,
        user: { name: 'Jane Doe' },
        totalPrice: 250,
        status: 'Shipped',
      },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Revenue</h2>
          <p className="text-2xl font-bold text-green-600">$1,000,000</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Orders</h2>
          <p className="text-2xl font-bold text-pink-700">{orders.length}</p>
          <Link to="/admin/orders" className="text-blue-500 hover:underline mt-2 inline-block">
            Manage Orders
          </Link>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Products</h2>
          <p className="text-2xl font-bold text-purple-600">500</p>
          <Link to="/admin/products" className="text-blue-500 hover:underline mt-2 inline-block">
            Manage Products
          </Link>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Orders</h2>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No orders found</p>
            <Link
              to="/admin/orders"
              className="mt-4 inline-block text-blue-500 hover:underline"
            >
              View All Orders
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-gray-600">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    User
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Total Price
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                 
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{order._id}</td>
                    <td className="py-3 px-4">{order.user.name}</td>
                    <td className="py-3 px-4">${order.totalPrice.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;