import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../services/userService';
import UserCard from '../components/features/UserCard';
import Button from '../components/common/Button';
import './UserPage.css';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Không thể tải danh sách người dùng');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    // TODO: Open edit modal or navigate to edit page
    console.log('Editing user:', user);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        alert('Xóa người dùng thành công!');
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Không thể xóa người dùng. Vui lòng thử lại.');
      }
    }
  };

  const handleAddNew = () => {
    // TODO: Navigate to add user page or open modal
    console.log('Adding new user');
  };

  if (loading) {
    return <div className="loading">Đang tải danh sách người dùng...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-page">
      <div className="page-header">
        <h1>Quản lý người dùng</h1>
        <Button variant="primary" onClick={handleAddNew}>
          Thêm người dùng mới
        </Button>
      </div>

      <div className="users-list">
        {users.length === 0 ? (
          <div className="no-users">
            <p>Chưa có người dùng nào</p>
            <Button variant="outline-primary" onClick={handleAddNew}>
              Thêm người dùng đầu tiên
            </Button>
          </div>
        ) : (
          users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserPage;