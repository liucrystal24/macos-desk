import React, { useState, useCallback } from "react";
export const UseHeader = () => {
  const [clicknum, setClicknum] = useState(0);
  const handleClick = useCallback(() => {
    setClicknum(clicknum + 1);
  }, [clicknum]);
  const Header = () => {
    return (
      <>
        <div>headerTest</div>
        <div>
          <button onClick={handleClick}>+1</button>
        </div>
        <div>{clicknum}</div>
      </>
    );
  };

  return {
    Header,
    clicknum,
    setClicknum,
  };
};
