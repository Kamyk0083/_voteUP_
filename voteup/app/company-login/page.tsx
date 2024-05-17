"use client";

import axios from "axios";
import { useState, ChangeEvent, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  admin?: boolean;
}

export default function CompanyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      if (decoded.admin) {
        window.location.href = "/company";
      }
    }
  }, []);

  const companyLogin = async () => {
    if (email && password) {
      const credentials = { email, password };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post("/api/login", credentials, config);
      console.log("Server response:", response.data);
      const data = response.data;

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/company";
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-lg font-bold mb-4">Logowanie Firmy</h1>
        <input
          type="text"
          placeholder="Email"
          onChange={handleEmailChange}
          className="mb-3 px-4 py-2 border rounded-lg w-full text-black"
        />
        <input
          type="password"
          placeholder="Hasło"
          onChange={handlePasswordChange}
          className="mb-3 px-4 py-2 border rounded-lg w-full text-black"
        />
        <button
          onClick={companyLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
        >
          Zaloguj
        </button>
      </div>
    </div>
  );
}
