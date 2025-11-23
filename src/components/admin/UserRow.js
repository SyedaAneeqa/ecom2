'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function UserRow({ user, onDelete, fetchUsers, token }) {
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);

  const toggleAdmin = async () => {
    try {
      await axios.put('/api/admin/users', 
        { _id: user._id, name: user.name, email: user.email, isAdmin: !isAdmin },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsAdmin(!isAdmin);
      fetchUsers(); // refresh list
    } catch (err) {
      console.error(err);
      alert('Failed to update admin status');
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input type="checkbox" checked={isAdmin} onChange={toggleAdmin} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button 
          onClick={() => onDelete(user._id)} 
          className="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
