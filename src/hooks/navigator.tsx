import React, { useContext, useEffect, useState, useCallback } from "react";
import { shareData } from "./hooktest";

export const Navigator = () => {
  const [title, contentData, setContentData] = useContext(shareData);
  return (
    <div>
      <div>{title}</div>
      <div>
        <button onClick={() => setContentData("123")}>123</button>
      </div>
    </div>
  );
};
