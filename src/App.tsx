import React from "react";
import { Footer } from "./components/footer/Footer";
// import { Counter } from "./hooks/hooktest";

// import { UseHeader } from "./components/header/Header";
// import { Canvas } from "./components/drawing/Canvas";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <div id="main-view"></div>
      <Footer />
      {/* <Counter /> */}
    </div>
  );
}

export default App;
