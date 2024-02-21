import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import MediaForm from "./api/media/media";
import LoginForm from "./api/users/LoginForm";
import RegisterForm from "./api/users/RegisterForm";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};
function App() {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <Router>
      <div>
        {/* <nav>
              <ul>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                {/* 你可以在这里添加更多的导航链接 */}
        {/* </ul>
          </nav>
          */}

        {/* 更新後的路由規則使用 Routes 代替 Switch */}
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/media"
            element={
              <ProtectedRoute>
                <MediaForm /> {/* 受保护的页面 */}
              </ProtectedRoute>
            }
          />
          {/* 定義其他路由 */}
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/media" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
