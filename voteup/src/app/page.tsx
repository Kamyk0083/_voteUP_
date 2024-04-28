import React, { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("/api/test/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age: Number(age) }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Osoba została dodana");
    } else {
      alert("Wystąpił błąd podczas dodawania osoby");
    }
  };

  return (
    <div className="main-container">
      <header>
        <div className="flex font-bold uppercase items-center">
          <p className="text-lg">vote</p>
          <p className="text-green-500 text-2xl">UP</p>
        </div>
      </header>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={handleSubmit}>Dodaj</button>
    </div>
  );
}
