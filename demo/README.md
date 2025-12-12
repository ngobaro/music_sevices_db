# Hướng dẫn Tổ chức Dự án React + Vite

## 🎯 Tổng quan kiến trúc

```
┌──────────────────────────────────────────────────────────────────┐
│                         REACT APPLICATION                         │
│                                                                   │
│  ┌────────────┐      ┌──────────────┐      ┌─────────────────┐  │
│  │   Pages    │ ───> │  Components  │ ───> │  UI Elements    │  │
│  │ (Screens)  │      │  (Reusable)  │      │ (Button, Card)  │  │
│  └────────────┘      └──────────────┘      └─────────────────┘  │
│         │                                                         │
│         ↓                                                         │
│  ┌────────────┐      ┌──────────────┐      ┌─────────────────┐  │
│  │  Services  │ ───> │   API Calls  │ ───> │  Spring Boot    │  │
│  │  (Logic)   │      │    (Axios)   │      │   Backend API   │  │
│  └────────────┘      └──────────────┘      └─────────────────┘  │
│         ↑                                            │            │
│         │                                            ↓            │
│  ┌────────────┐      ┌──────────────┐      ┌─────────────────┐  │
│  │   State    │ <─── │   Response   │ <─── │    Database     │  │
│  │  (useState)│      │    (JSON)    │      │   (MySQL/...)   │  │
│  └────────────┘      └──────────────┘      └─────────────────┘  │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📁 Cấu trúc thư mục chuẩn

```
demo/
│
├── node_modules/              # ❌ KHÔNG SỬA - Thư viện tự động
│
├── public/                    # 📦 File tĩnh công khai
│   ├── vite.svg              # Icon mặc định
│   └── images/               # Hình ảnh tĩnh (logo, banner)
│
├── src/                       # 💻 MÃ NGUỒN CHÍNH - NƠI BẠN CODE
│   │
│   ├── assets/               # 🎨 Tài nguyên (ảnh, icon, font)
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │
│   ├── components/           # 🧩 Component tái sử dụng
│   │   ├── common/          # Component dùng chung
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Modal.jsx
│   │   │
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   └── features/        # Component theo tính năng
│   │       ├── UserCard.jsx
│   │       ├── ProductItem.jsx
│   │       └── OrderTable.jsx
│   │
│   ├── pages/               # 📄 Các trang của ứng dụng
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── UserPage.jsx
│   │   ├── ProductPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── services/            # 🔌 Gọi API Backend
│   │   ├── api.js          # Cấu hình axios chung
│   │   ├── authService.js  # API đăng nhập/đăng ký
│   │   ├── userService.js  # API quản lý user
│   │   └── productService.js
│   │
│   ├── hooks/               # 🪝 Custom React Hooks
│   │   ├── useAuth.js      # Hook xử lý authentication
│   │   ├── useFetch.js     # Hook fetch data chung
│   │   └── useForm.js      # Hook quản lý form
│   │
│   ├── context/             # 🌐 Context API (State global)
│   │   ├── AuthContext.jsx # Context đăng nhập
│   │   └── ThemeContext.jsx # Context theme (dark/light)
│   │
│   ├── utils/               # 🛠️ Hàm tiện ích
│   │   ├── formatDate.js   # Format ngày tháng
│   │   ├── validation.js   # Validate input
│   │   ├── constants.js    # Hằng số (API_URL, STATUS...)
│   │   └── helpers.js      # Các hàm helper khác
│   │
│   ├── routes/              # 🛣️ Định tuyến (Routing)
│   │   └── AppRoutes.jsx   # Cấu hình routes
│   │
│   ├── styles/              # 🎨 CSS/SCSS chung
│   │   ├── global.css      # Style toàn cục
│   │   ├── variables.css   # CSS variables (màu, font...)
│   │   └── responsive.css  # Media queries
│   │
│   ├── App.jsx              # 🏠 Component gốc
│   ├── App.css              # Style cho App
│   ├── main.jsx             # ⚡ Entry point (điểm khởi đầu)
│   └── index.css            # Style global
│
├── .env                      # 🔒 Biến môi trường (API URL, keys)
├── .env.example              # Ví dụ file .env
├── .gitignore               # File không commit lên git
├── package.json             # Quản lý dependencies
├── vite.config.js           # Cấu hình Vite
├── eslint.config.js         # Cấu hình ESLint (code quality)
└── README.md                # Tài liệu dự án
```

---

## 🔄 Luồng dữ liệu chi tiết

### **Luồng 1: Hiển thị dữ liệu từ Backend**

```
[1. User vào trang]
        ↓
[2. React Component (Page) mount]
        ↓
[3. useEffect() được trigger]
        ↓
[4. Gọi function từ Service]
   ↓ userService.getAllUsers()
        ↓
[5. Service gọi Axios]
   ↓ axios.get('http://localhost:8080/api/users')
        ↓
[6. Request đến Spring Boot]
        ↓
[7. Spring Boot xử lý]
   - Controller nhận request
   - Service xử lý logic
   - Repository query Database
        ↓
[8. Trả về JSON Response]
        ↓
[9. Axios nhận response]
        ↓
[10. Service trả data về Component]
        ↓
[11. Component setState(data)]
        ↓
[12. React tự động re-render]
        ↓
[13. UI hiển thị dữ liệu mới]
```

### **Ví dụ Code thực tế:**

#### **Bước 1: Tạo Service (src/services/userService.js)**
```javascript
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Lấy tất cả users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Lấy user theo ID
export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

// Tạo user mới
export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

// Cập nhật user
export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/users/${id}`, userData);
  return response.data;
};

// Xóa user
export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/users/${id}`);
};
```

#### **Bước 2: Tạo Component (src/components/features/UserCard.jsx)**
```javascript
// Component nhỏ, chỉ hiển thị 1 user
function UserCard({ user, onDelete }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onDelete(user.id)}>Xóa</button>
    </div>
  );
}

export default UserCard;
```

#### **Bước 3: Tạo Page (src/pages/UserPage.jsx)**
```javascript
import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../services/userService';
import UserCard from '../components/features/UserCard';

function UserPage() {
  // State lưu danh sách users
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API khi component load
  useEffect(() => {
    fetchUsers();
  }, []); // [] = chỉ chạy 1 lần khi mount

  // Function lấy danh sách users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers(); // Gọi service
      setUsers(data); // Cập nhật state
    } catch (err) {
      setError('Không thể tải danh sách users');
    } finally {
      setLoading(false);
    }
  };

  // Function xóa user
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa?')) {
      try {
        await deleteUser(id); // Gọi API xóa
        fetchUsers(); // Load lại danh sách
      } catch (err) {
        alert('Xóa thất bại!');
      }
    }
  };

  // Hiển thị loading
  if (loading) return <div>Đang tải...</div>;
  
  // Hiển thị lỗi
  if (error) return <div>{error}</div>;

  // Hiển thị danh sách
  return (
    <div className="user-page">
      <h1>Danh sách Users</h1>
      <div className="user-list">
        {users.map(user => (
          <UserCard 
            key={user.id} 
            user={user}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default UserPage;
```

---

## 📋 Chi tiết từng thư mục

### **1. src/services/** - Gọi API Backend

**Mục đích:** Tập trung tất cả logic gọi API ở đây

**Cấu trúc file api.js:**
```javascript
import axios from 'axios';

// Tạo instance axios với config mặc định
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor: Tự động thêm token vào mỗi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor: Xử lý lỗi chung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn -> logout
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

**Sử dụng api.js trong các service khác:**
```javascript
// userService.js
import api from './api';

export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};
```

---

### **2. src/components/** - Component tái sử dụng

**Nguyên tắc:**
- Mỗi component làm 1 việc duy nhất
- Nhận data qua props
- Không gọi API trực tiếp (để Page lo)

**Ví dụ Button component:**
```javascript
// components/common/Button.jsx
function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false 
}) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
```

**Sử dụng:**
```javascript
<Button variant="primary" onClick={handleSubmit}>
  Lưu
</Button>
<Button variant="danger" onClick={handleDelete}>
  Xóa
</Button>
```

---

### **3. src/pages/** - Các trang chính

**Đặc điểm:**
- Kết hợp nhiều components
- Gọi API qua services
- Quản lý state phức tạp

**Ví dụ LoginPage:**
```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Sai email hoặc mật khẩu');
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h1>Đăng nhập</h1>
        {error && <p className="error">{error}</p>}
        
        <Input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        
        <Input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
        />
        
        <Button type="submit">Đăng nhập</Button>
      </form>
    </div>
  );
}

export default LoginPage;
```

---

### **4. src/hooks/** - Custom Hooks

**Mục đích:** Tái sử dụng logic giữa các components

**Ví dụ useFetch hook:**
```javascript
import { useState, useEffect } from 'react';

function useFetch(fetchFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]);

  return { data, loading, error };
}

export default useFetch;
```

**Sử dụng:**
```javascript
import useFetch from '../hooks/useFetch';
import { getAllUsers } from '../services/userService';

function UserPage() {
  const { data: users, loading, error } = useFetch(getAllUsers);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
}
```

---

### **5. src/context/** - State toàn cục

**Khi nào dùng Context:**
- Thông tin user đăng nhập (dùng ở nhiều nơi)
- Theme (dark/light mode)
- Ngôn ngữ (i18n)

**Ví dụ AuthContext:**
```javascript
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook để dùng AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
```

**Sử dụng:**
```javascript
// Trong main.jsx
import { AuthProvider } from './context/AuthContext';

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

// Trong component bất kỳ
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      {user ? (
        <>
          <span>Xin chào {user.name}</span>
          <button onClick={logout}>Đăng xuất</button>
        </>
      ) : (
        <a href="/login">Đăng nhập</a>
      )}
    </header>
  );
}
```

---

### **6. src/routes/** - Định tuyến

**Cài đặt React Router:**
```bash
npm install react-router-dom
```

**Cấu hình routes:**
```javascript
// routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import UserPage from '../pages/UserPage';
import NotFoundPage from '../pages/NotFoundPage';
import { useAuth } from '../context/AuthContext';

// Route bảo vệ (cần đăng nhập)
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Route cần đăng nhập */}
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          } 
        />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
```

**Sử dụng trong App.jsx:**
```javascript
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
```

---

### **7. src/utils/** - Hàm tiện ích

**constants.js:**
```javascript
export const API_URL = 'http://localhost:8080/api';

export const STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER'
};
```

**formatDate.js:**
```javascript
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN');
};
```

**validation.js:**
```javascript
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^(0|\+84)[0-9]{9}$/;
  return regex.test(phone);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};
```

---

## 🔐 File .env - Biến môi trường

**Tạo file .env:**
```
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=MyApp
VITE_TIMEOUT=10000
```

**⚠️ Lưu ý:** 
- Biến trong Vite phải bắt đầu bằng `VITE_`
- Không commit file `.env` lên git
- Tạo file `.env.example` để team biết cần config gì

**Sử dụng:**
```javascript
const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL); // http://localhost:8080/api
```

---

## 🚀 Các lệnh thường dùng

```bash
# Cài dependencies
npm install

# Chạy dev server
npm run dev

# Build production
npm run build

# Preview build
npm run preview

# Cài thư viện mới
npm install axios
npm install react-router-dom
npm install @mui/material

# Xóa node_modules và cài lại
rm -rf node_modules
npm install
```

---

## 📊 Luồng xử lý Form (Tạo/Sửa User)

```
[1. User nhập form]
        ↓
[2. onChange event] → setState cho từng field
        ↓
[3. User click "Lưu"]
        ↓
[4. onSubmit event]
        ↓
[5. Validate dữ liệu]
   ├─ Nếu lỗi → Hiển thị message
   └─ Nếu OK → Tiếp tục
        ↓
[6. Gọi service.createUser(data)]
        ↓
[7. Axios POST request]
        ↓
[8. Spring Boot nhận request]
   - Validate
   - Lưu vào DB
   - Trả về response
        ↓
[9. React nhận response]
   ├─ Thành công → Hiển thị thông báo + redirect
   └─ Lỗi → Hiển thị error message
```

**Code ví dụ:**
```javascript
function CreateUserPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Tên không được trống';
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createUser(formData);
      alert('Tạo user thành công!');
      navigate('/users');
    } catch (error) {
      alert('Có lỗi xảy ra!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Tên"
      />
      {errors.name && <span className="error">{errors.name}</span>}
      
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}
      
      <button type="submit">Tạo User</button>
    </form>
  );
}
```

---

## 🎨 Best Practices

### ✅ **Nên làm:**

1. **Tách logic rõ ràng:**
   - Page: Quản lý state, gọi API
   - Component: Chỉ hiển thị UI
   - Service: Xử lý API calls

2. **Đặt tên file:**
   - Component: PascalCase (`UserCard.jsx`)
   - Service/Utils: camelCase (`userService.js`)
   - Constant: UPPER_SNAKE_CASE (`API_URL`)

3. **Xử lý lỗi:**
   ```javascript
   try {
     const data = await fetchData();
   } catch (error) {
     console.error('Error:', error);
     setError(error.message);
   }
   ```

4. **Loading state:**
   ```javascript
   if (loading) return <Spinner />;
   if (error) return <ErrorMessage error={error} />;
   return <DataComponent data={data} />;
   ```

### ❌ **Không nên:**

1. Gọi API trực tiếp trong component
2. Đặt tất cả code trong 1 file
3. Hardcode API URL trong code
4. Không xử lý lỗi
5. Không có loading state

---

## 📚 Tài nguyên học thêm

- [React Official Docs](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

---

**Chúc bạn code hiệu quả! 💪**