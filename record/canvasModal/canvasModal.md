# CanvasModal

## 1. 问题

1. ??? 最小化，放大缩小，图像没了
2. createContext / useContext
3. { children } 的使用
4. useCallback
5. useMemo

## 2. 组件传值

- ### Footer / footer.tsx
  1. #### 引用 **`'drawing / index'`**

```tsx
// 引用主画板
import { Drawing } from "../drawing";

const dockerRef = useRef<HtmlDivElement>(null);
const dockList = useState<string[]>(["xx", "xx", "xx"]);

// 组件传值，将 isDrawingShow,setDrawingShow,isDrawingOpen,setDrawingOpen 传入子组件 Drawing
export const FooterContext = createContext<any>([]);

// 是否打开
const [isDrawingOpen, setDrawingOpen] = useState<OpenTypes>({
  type: false,
});

// 是否最小化
const [isDrawingShow, setDrawingShow] = useState(true);

export const Footer = () => {
  return (
    <React.Fragment>
      <FooterContext.Provider
        value={[isDrawingOpen, setDrawingOpen, isDrawingShow, setDrawingShow]}
      >
        <Drawing />
      </FooterContext.Provider>
      <div ref={dockerRef}>
        {dockList.map((item, index) => {
          return <div onClick={() => dockItemClick(item, index)}></div>;
        })}
      </div>
    </React.Fragment>
  );
};
```

- ### drawing / index.tsx
  1. #### 引用 **`'footer / Footer'`**
  2. #### 引用 **`'modal / UseModal'`**
  3. #### 引用 **`'drawing / Canvas'`**

```tsx
```
