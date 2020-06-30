import React from "react";
import { Docker } from "./components/Docker";
import { Input_focus } from "./components/useRef";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Input_focus></Input_focus>
      <footer>
        <Docker></Docker>
      </footer>
    </div>
  );
}

export default App;
