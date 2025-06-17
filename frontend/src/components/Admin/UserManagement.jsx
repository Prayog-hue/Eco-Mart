import React, { useState } from 'react';

const UserManagement = () => {
    const users = [
        {
            _id: 123121,
            name: 'Prayog Pokhrel',
            email: 'prayogpokharel10@gmail.com',
            role: 'admin',
        },
    ];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        // TODO: Send formData to backend API (e.g., MongoDB Atlas /api/users)
        // Example: fetch('/api/users', { method: 'POST', body: JSON.stringify(formData) })

        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'customer',
        });
    };

    const handleRoleChange = (userId, newRole) => {
        console.log({ id: userId, role: newRole })
    };

    const handleDeleteUser =(userId) => { 
        if(window.confirm("Are you sure you want to delete this user?")){
            console.log("Deleting user with id", userId);
            
        }
     }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">User Management</h2>

            {/* Add New User Form */}
            <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg mb-6 sm:mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New User</h3>
                <form onSubmit={handleSubmit} className="space-y-4 sm:w-[70%]">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors w-full sm:w-auto"
                    >
                        Add User
                    </button>
                </form>
            </div>

            {/* Users Table */}
            <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 ">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Existing Users</h3>
                {users.length === 0 ? (
                    <p className="text-gray-500 text-center py-4 text-sm">No users found</p>
                ) : (
                    <div className="overflow-x-auto  ">
                        <table className=" text-gray-600 w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-700">
                                        Name
                                    </th>
                                    <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-700">
                                        Role
                                    </th>
                                    <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-700">
                                        Actions
                                    </th>
                                    <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-gray-700">
                                        Email
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm">{user.name}</td>
                                        <td className="py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm">

                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                className='p-2 border rounded '>

                                                <option value="customer">Customer</option>
                                                <option value="admin">Admin</option>

                                            </select>
                                        </td>

                                        <td className="py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm">
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 '>
                                                Delete
                                            </button>
                                        </td>
                                        <td className="py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm">{user.email}</td>


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

export default UserManagement;