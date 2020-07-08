import React from "react";
import { Footer } from "./components/footer/Footer";
// import { Canvas } from "./components/drawing/Canvas";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <div id = "main-view"></div>
      <Footer />
    </div>
  );
}

export default App;
