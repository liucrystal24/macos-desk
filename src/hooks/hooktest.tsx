import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from "react";
// import { Navigator } from "./navigator";
// import { Content } from "./context";

// export const shareData = createContext<any>([]);
// export const HookTest = () => {
//   const [title, setTitle] = useState("Father - title");
//   const [contentData, setContentData] = useState(1);
//   return (
//     <shareData.Provider value={[title, contentData, setContentData]}>
//       <Navigator />
//       <Content />
//       <div>
//         {/* <button onClick={() => setContentData("123")}>123</button> */}
//       </div>
//     </shareData.Provider>
//   );
// };
export const Counter = ({ initialCount }: any) => {
  // const initialState = { count: 0 };
  function init(initialCount: any) {
    return { count: initialCount };
  }
  function reducer(state: any, action: any) {
    switch (action.type) {
      case "increase":
        return { count: state.count + 1 };
      case "reduce":
        return { count: state.count - 1 };
      case "reset":
        return init(action.payload);
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      <div>{state.count}</div>
      <div>
        <button
          onClick={() => {
            dispatch({ type: "increase" });
          }}
        >
          increase
        </button>
        <button
          onClick={() => {
            dispatch({ type: "reduce" });
          }}
        >
          reduce
        </button>
        <button
          onClick={() => {
            dispatch({ type: "reset", payload: initialCount });
          }}
        >
          reset
        </button>
      </div>
    </>
  );
};
