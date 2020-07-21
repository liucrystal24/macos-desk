import React, { useContext, useEffect, useState, useCallback } from "react";
import { shareData } from "./hooktest";

export const Navigator = () => {
  const [title, contentData, setContentData] = useContext(shareData);
  useEffect(() => {
    console.log("add 1");
    return () => {
      console.log("cancel add");
    };
  }, [contentData]);
  return (
    <div>
      <div>{title}</div>
      <div>
        <button onClick={() => setContentData(contentData + 1)}>add</button>
      </div>
    </div>
  );
};
