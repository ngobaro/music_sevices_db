import { Link, useNavigate } from 'react-router-dom';
import { Search, User, LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <h1>🎵 spoti-five</h1>
        </Link>
      </div>
      
      <div className="header-center">
        <form onSubmit={handleSearch} className="search-container">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Tìm kiếm bài hát, nghệ sĩ, album..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      
      <div className="header-right">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="user-menu">
              <User size={24} />
            </Link>
            <button onClick={handleLogout} className="btn-logout">
              <LogOut size={20} />
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-auth">
              <LogIn size={20} />
              Đăng nhập
            </Link>
            <Link to="/register" className="btn-auth-primary">
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;