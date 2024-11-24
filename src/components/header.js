import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();


  const handleLogout = () => {
      // localStorage.getItem("authToken");
      localStorage.removeItem("authToken");
      navigate("/");
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
          <li>
            <Link to="/tasks/new">Add Task</Link>
          </li>
          <li>
            <Link to="/notifications">Notifications</Link>
          </li>
          <li>
            <button type="submit" onClick={() => handleLogout()}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
