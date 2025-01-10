import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch('/api/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });

          if (response.ok) {
            const data = await response.json();
            // Сохраняем токен в локальное хранилище
            localStorage.setItem("authToken", data.token);

            // Перенаправляем на страницу задач
            navigate("/tasks");

          } else {
            alert("Invalid credentials. Please try again.");
          }
        } catch (error) {
          console.error("Login failed:", error);
          alert("An error occurred. Please try again later.");
        }
    };

    return (
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    );
}

export default Login;
