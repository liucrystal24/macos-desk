import React from "react";
import { Docker } from "./components/footer/Docker";
import { Canvas } from "./components/drawing/Canvas";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="modal">
        <Canvas></Canvas>
      </div>
      <footer>
        <Docker></Docker>
      </footer>
    </div>
  );
}

export default App;
