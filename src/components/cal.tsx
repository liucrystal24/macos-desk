import React, { useState, useEffect } from "react";
import "../scss/common.scss";
export const Cal = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `${count}`;
  });
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>addcount</button>
    </div>
  );
};
