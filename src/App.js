import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginForm from "./api/users/LoginForm";
import RegisterForm from "./api/users/RegisterForm";
// 引入其他需要的組件

function App() {
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
          {/* 定義其他路由 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
