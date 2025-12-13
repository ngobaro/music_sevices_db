import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Mock authentication - Kiểm tra username và password
    if (formData.username === 'admin' && formData.password === 'admin') {
      // Đăng nhập thành công
      localStorage.setItem('token', 'mock-token-123');
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,
        name: 'Admin User'
      }));
      
      alert('Đăng nhập thành công!');
      navigate('/');
      window.location.reload();
    } else {
      // Đăng nhập thất bại
      setError('Username hoặc password không đúng!');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>🎵 Music Web</h1>
        <h2>Đăng nhập</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              placeholder="Nhập username"
              required
              autoComplete="username"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Nhập password"
              required
              autoComplete="current-password"
            />
          </div>
          
          <button type="submit" className="btn-submit">
            Đăng nhập
          </button>
        </form>
        
        {/* <div className="demo-credentials">
          <p>🔑 Tài khoản demo:</p>
          <p><strong>Username:</strong> admin</p>
          <p><strong>Password:</strong> admin</p>
        </div> */}
        
        <p className="auth-link">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;