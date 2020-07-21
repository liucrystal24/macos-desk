# React Hooks

参考：

- https://www.jianshu.com/p/76901410645a
- https://www.ruanyifeng.com/blog/2019/09/react-hooks.html

## useState

1. Hooks 写在函数的最外层，不能写在 if else 条件语句中，来确保 hooks 的执行顺序一致( 附案例 )

## useEffect

1. react 首次渲染和之后的每次渲染都会调用一遍传给 useEffect 的函数 ( componentDidMount + componentDidUpdate )
2. 这些函数是异步执行的
3. 每次组件渲染后都会执行一遍，包括副作用函数返回的这个清理函数也会重新执行一遍
4. 执行函数，return ()=>{} : 取消绑定，[ xx ] : xx 发生变化后，函数才执行( []为空时，只在首次渲染中执行 )

## useContext

1.