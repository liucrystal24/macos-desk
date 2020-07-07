import React from "react";
import { Footer } from "./components/footer/Footer";
import { Canvas } from "./components/drawing/Canvas";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="modal">
        <Canvas></Canvas>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default App;
