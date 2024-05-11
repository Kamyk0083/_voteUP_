"use client";

import axios from "axios";
import { useState, ChangeEvent, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  admin?: boolean;
}

export default function adminLogin() {
  const [username, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
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

  const AdminLogin = async () => {
    if (username && password) {
      const credentials = { username, password };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post("/api/login", credentials, config);
      console.log("Odpowiedź z serwera:", response.data);
      const data = response.data;

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/admin";
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-lg font-bold mb-4">Logowanie Admina</h1>
        <input
          type="text"
          placeholder="login"
          onChange={handleLoginChange}
          className="mb-3 px-4 py-2 border rounded-lg w-full text-black"
        />
        <input
          type="password"
          placeholder="hasło"
          onChange={handlePasswordChange}
          className="mb-3 px-4 py-2 border rounded-lg w-full text-black"
        />
        <button
          onClick={() => AdminLogin()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
        >
          Zaloguj
        </button>
      </div>
    </div>
  );
}
