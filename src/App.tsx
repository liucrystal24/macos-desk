import React from "react";
import { Docker } from "./components/Docker";
import { Cal } from "./components/cal";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Cal></Cal>
      <footer>
        <Docker></Docker>
      </footer>
    </div>
  );
}

export default App;
