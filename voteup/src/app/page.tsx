import { useState } from "react";

export default function Home() {
  // const [name, setName] = useState("");
  // const [age, setAge] = useState("");

  // const addUser = async (e) => {
  //   const user = { name, age };
  // };

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
        placeholder="Enter name "
        // onChange={(e) => setName(e.target.value)}
      />
      <input type="text" placeholder="Enter age " />
      {/* <button onClick={}>Dodaj</button> */}
    </div>
  );
}
