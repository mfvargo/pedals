import { useState } from "react";
import { invoke, Channel } from "@tauri-apps/api/core";
import "./App.css";

type UnitMessage = 
  | {
      event: "level";
      data: {
        masterVol: number;
      };
    }
  | {
      event: "boards";
      data: {
        name: string;
        count: number;
      };
  };

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function pedal_types() {
    const token = await invoke("start", { onEvent });
    setGreetMsg("jam unit token: " + JSON.stringify(token, null, 2));
    await invoke("do_message", { });
  }

  const onEvent = new Channel<UnitMessage>();
  onEvent.onmessage = (message) => {
    console.log(message);
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
