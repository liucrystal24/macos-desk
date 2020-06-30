import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

export const Input_focus = () => {
  // 第一个 input 事件 useRef
  const inputEl = useRef<HTMLInputElement>(null);
  const buttonClick = () => {
    if (inputEl.current) {
      console.log(inputEl.current.value);
    }
  };

  // 第二个 input 事件 useState,useEffect
  const [text, setText] = useState("");
  useEffect(() => {
    console.log(text);
  });

  return (
    <div>
      <input type="text" ref={inputEl} />
      <button onClick={buttonClick}>click focus</button>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
};
