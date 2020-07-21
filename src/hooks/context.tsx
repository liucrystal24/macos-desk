import React, { useContext, useEffect, useState, useCallback } from "react";
import { shareData } from "./hooktest";

export const Content = () => {
  const [title, contentData] = useContext(shareData);
  return (
    <>
      <div>{contentData}</div>
    </>
  );
};
