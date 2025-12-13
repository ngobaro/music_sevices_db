import { User, Mail, Calendar } from 'lucide-react';
import './ProfilePage.css';

function ProfilePage() {
  const user = {
    name: 'Ngô Thanh Bảo',
    email: 'ngothanhbao@example.com',
    joinDate: '2024-01-01'
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <User size={64} />
        </div>
        <h1>{user.name}</h1>
        <p className="profile-email">
          <Mail size={16} />
          {user.email}
        </p>
        <p className="profile-join-date">
          <Calendar size={16} />
          Tham gia từ {new Date(user.joinDate).toLocaleDateString('vi-VN')}
        </p>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <h3>0</h3>
          <p>Playlists</p>
        </div>
        <div className="stat-card">
          <h3>0</h3>
          <p>Bài hát yêu thích</p>
        </div>
        <div className="stat-card">
          <h3>0</h3>
          <p>Giờ nghe nhạc</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;