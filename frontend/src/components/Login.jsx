import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mes, setMes] = useState("");
  const apiUrl = "http://localhost:3001/api";
  const navigate = useNavigate();

  const handleLogin = async () => {
    const userData = { username, password };

    try {
      const res = await axios.post(`${apiUrl}/login`, userData, {
        withCredentials: true,
      });

      const { message, token } = res.data;
      setMes(message);

      if (message === "Login success!!!" && token) {
        // ✅ Save token for later API calls
        localStorage.setItem("token", token);

        // ✅ Redirect to home
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        setMes(err.response.data.message);
      } else {
        setMes("Something went wrong");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>

        {/* Always show API message in red */}
        {mes && (
          <div className="mt-4 text-center text-sm font-medium text-red-600">
            {mes}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
