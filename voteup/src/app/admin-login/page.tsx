"use client";

import axios from "axios";
import { useState, ChangeEvent } from "react";

export default function adminLogin() {
  const [username, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const adminLogin = async () => {
    if (username && password) {
      const cerdentials = { username, password };

      const response = await axios.post("/api/login", cerdentials);
      console.log(response);
      const data = response.data;

      if (data.success && data.token) {
        sessionStorage.setItem("token", data.token);
        window.location.href = "/admin";
      }
    }
  };

  return (
    <div>
      <input type="text" placeholder="login" onChange={handleLoginChange} />
      <input
        type="password"
        placeholder="hasło"
        onChange={handlePasswordChange}
      />
      <button onClick={() => adminLogin()}>Zaloguj</button>
    </div>
  );
}
