import React, { useState, useEffect, useContext, createContext } from "react";
import { Navigator } from "./navigator";
import { Content } from "./context";

export const shareData = createContext<any>([]);
export const HookTest = () => {
  const [title, setTitle] = useState("Father - title");
  const [contentData, setContentData] = useState(1);
  return (
    <shareData.Provider value={[title, contentData, setContentData]}>
      <Navigator />
      <Content />
      <div>
        {/* <button onClick={() => setContentData("123")}>123</button> */}
      </div>
    </shareData.Provider>
  );
};
