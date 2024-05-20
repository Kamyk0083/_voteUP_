"use client";

import axios from "axios";
import { useState, ChangeEvent, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  admin?: boolean;
}

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      if (decoded.admin) {
        window.location.href = "/admin";
      }
    }
  }, []);

  const adminLogin = async () => {
    if (username && password) {
      const credentials = { username, password };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "/api/admin-login",
        credentials,
        config
      );
      console.log("Server response:", response.data);
      const data = response.data;

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/admin";
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <div className="p-8 bg-gray-600 shadow-md rounded-lg">
        <input
          type="text"
          placeholder="login"
          onChange={handleUsernameChange}
          className="mb-4 p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <input
          type="password"
          placeholder="hasło"
          onChange={handlePasswordChange}
          className="mb-4 p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <button
          onClick={adminLogin}
          className="p-2 w-full bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
        >
          Zaloguj
        </button>
      </div>
    </div>
  );
}
