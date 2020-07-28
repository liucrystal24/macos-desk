# React Hooks

参考：

- https://www.jianshu.com/p/76901410645a
- https://www.ruanyifeng.com/blog/2019/09/react-hooks.html
- https://zh-hans.reactjs.org/docs/hooks-rules.html

## Hook 规则

1. Hooks 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。
2. Hooks 写在函数的最外层，不能写在 if else 条件语句中，来确保 hooks 的执行顺序一致( 附案例 )
3. Hooks 只能在 React 的函数组件 和自定义 Hooks 中调用
4. Hook 是一种复用状态逻辑的方式，它不复用 state 本身。事实上 Hook 的每次调用都有一个完全独立的 state —— 因此你可以在单个组件中多次调用同一个自定义 Hook。

## useState ( 状态变量 )

1. 不会把新的 state 和旧的 state 合并，还是替代
2. 函数退出后，state 中的变量会被 React 保留

## useEffect ( 订阅、检查数据变化 )

1. react 首次渲染和之后的每次渲染都会调用一遍传给 useEffect 的函数 ( componentDidMount + componentDidUpdate + componentWillUnmount )
2. 这些函数是异步执行的
3. 每次组件渲染后都会执行一遍，包括副作用函数返回的这个清理函数也会重新执行一遍
4. 执行函数；return ()=>{} : 清除时执行( React 会在执行当前 effect 之前对上一个 effect 进行清除 )；[ xx ] : xx 发生变化后，函数才执行( []为空时，只在首次渲染中执行 )；

## useContext ( 组件间共享状态 )

1. 当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。
2. 父元素 shareData = createContent( ), shareData.Provider 中的 value 属性值 传递给子组件。
3. 子元素 useContext(shareData);

父 myEle:

```tsx
import { Navigator } from "./navigator";

export const shareData = createContent<any>([]);

export const myEle = () => {
  return (
    <shareData.Provider value={["value1", "value2"]}>
      <Navigator />
    </shareData.Provider>
  );
};
```

子 navigator:

```tsx
import { shareData } from "./myEle";

export const Navigator = () => {
  const [value1, value2] = useContext(shareData);
  return <div>{value1}</div>;
};
```

## useReducer

1. useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。
2. state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等使用。

```tsx
export const Counter = () => {
  // useState 中的初始值
  const initialState = { count: 0 };
  // reducer 代替 setState 方法 , action 根据传值的不同执行函数
  function reducer(state, action) {
    switch (action.type) {
      case "increase":
        return { count: state.count + 1 };
      case "reduce":
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  }
  // state 数值监听， dispatch : setState 方法
  const [state, dispatch] = useReducer(reducer, initialState);
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
      </div>
    </>
  );
};
```
