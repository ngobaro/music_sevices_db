import React from 'react';
import './UserCard.css';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        <img
          src={user.avatar || '/default-avatar.png'}
          alt={`${user.name} avatar`}
        />
      </div>

      <div className="user-info">
        <h3 className="user-name">{user.name}</h3>
        <p className="user-email">{user.email}</p>
        <p className="user-role">{user.role}</p>
      </div>

      <div className="user-actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(user)}
        >
          Sửa
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(user.id)}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default UserCard;