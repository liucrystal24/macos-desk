import React, { useState, useEffect, useContext } from "react";
import Navigator from "../../src/hooks/navigator";
import Context from "../../src/hooks/context";
export const HookTest = () => {
  return (
    <div>
      <Navigator />
      <Context />
    </div>
  );
};
