import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";
const NavBar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const userNameUrl =
    "https://media-api-v2-f4hfj5ldpa-de.a.run.app/api/user/me";

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(userNameUrl, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUserName(response.data.name);
      } catch (error) {
        console.error("获取用户信息失败", error);
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      {/* <div className="navbar-content"> */}
      <span className="navbar-username">{userName}</span>
      <button className="navbar-logout" onClick={handleLogout}>
        登出
      </button>
      {/* </div> */}
    </div>
  );
};

export default NavBar;
