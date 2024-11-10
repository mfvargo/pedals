import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function pedal_types() {
    await invoke("start", {});
    setGreetMsg("Got pedal types");
  }

  return (
    <main className="container">
      <h1>Welcome to Pedals</h1>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          pedal_types();
          // greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
