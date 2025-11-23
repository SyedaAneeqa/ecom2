'use client';
import AdminGuard from '@/components/admin/AdminGuard';
import UserList from '@/components/admin/userlist';



export default function ManageUsersPage() {
  return (
    <AdminGuard>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">👥 Manage Users</h1>
        <UserList />
      </div>
    </AdminGuard>
  );
}
