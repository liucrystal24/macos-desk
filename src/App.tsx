import React, { useCallback } from "react";
import { Footer } from "./components/footer/Footer";
// import { UseHeader } from "./components/header/Header";
// import { Canvas } from "./components/drawing/Canvas";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      {/* {clicknum} */}
      {/* <button onClick={handleClick}>+1 fa</button> */}
      <div id="main-view"></div>
      <Footer />
    </div>
  );
}

export default App;
