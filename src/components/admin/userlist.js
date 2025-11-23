'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserRow from './UserRow';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!token) throw new Error('No token found. Please login as admin.');

      const response = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`/api/admin/users?id=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(u => u._id !== userId));
      alert('User deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center p-4">Loading users...</p>;
  if (error) return <p className="text-center text-red-500 p-4">{error}</p>;
  if (users.length === 0) return <p className="text-center p-4">No users found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map(user => (
            <UserRow 
              key={user._id} 
              user={user} 
              onDelete={handleDelete} 
              fetchUsers={fetchUsers} 
              token={token}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
