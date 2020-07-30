# 画板（一）：绘画和圆形橡皮擦除

:dart: [项目地址](https://liucrystal24.github.io/macos-desk)，欢迎 watch :eyes: 和 star :star:
:book: [项目预览](https://liucrystal24.github.io/macos-desk)，点击即可查看

- ### 效果图

  ![canvasModal](../gif/write & earaser.gif)

- ### 画板初始化

  ```tsx
  export const UseCanvas = () => {
    interface CanvasProps {
      width: number;
      height: number;
    }
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const Canvas = ({ width, height }: CanvasProps) => {
      // ... 添加各种功能
      return (
        <>
          <canvas ref={canvasRef} height={height} width={width} />
        </>
      );
    };
    Canvas.defaultProps = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    return { Canvas };
  };
  ```

- ### 画板状态管理（绘画和擦除）

  - 添加 **`是否在画`**，**`是否擦除`**，**`鼠标位置`** 的状态。

  ```tsx
  // 是否在画
  const [isPainting, setIsPainting] = useState(false);
  // 是否擦除
  const [eraserEnabled, setEraserEnabled] = useState(false);

  // 鼠标位置
  type Coordinate = {
    x: number;
    y: number;
  };
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );
  ```

- ### 鼠标事件逻辑

  ```tsx
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    // 按下鼠标，修改状态，开始作画
    canvas.addEventListener("mousedown", startPaint);
    // 鼠标移动，跟踪轨迹
    canvas.addEventListener("mousemove", paint);
    // 鼠标松开，停止作画(有保存状态)
    canvas.addEventListener("mouseup", exitPaint);
    // 鼠标离开，停止作画(无保存状态)
    canvas.addEventListener("mouseleave", leaveCanvas);
    return () => {
      canvas.removeEventListener("mousedown", startPaint);
      canvas.removeEventListener("mousemove", paint);
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", leaveCanvas);
    };
  }, [startPaint, paint, exitPaint, leaveCanvas]);
  ```

- ### 鼠标事件定义

  - 获取鼠标位置

  ```tsx
  // 获取当前鼠标的坐标
  const getCoordinates = useCallback(
    (event: MouseEvent): Coordinate | undefined => {
      if (!canvasRef.current) {
        return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      // getOffset(el,dir) : 获取 el 距离 body 在 dir 方向上的距离，见第一章 masOS-dock
      const x = event.pageX - getOffset(canvas, "left");
      const y = event.pageY - getOffset(canvas, "top");
      return { x, y };
    },
    [getOffset]
  );
  ```

  - startPaint

  ```tsx
  // 修改状态，开始作画
  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);
  ```

  - paint

  ```tsx
  // 作画，并保存 新位置
  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          // ... 这里后续添加 橡皮状态的判断和清除
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition, drawLine]
  );

  // 鼠标移动，画线函数
  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      context.strokeStyle = strokeStyle;
      context.lineJoin = "round";
      context.lineWidth = lineWidth;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };
  ```

  - exitPaint
    :link: [saveFragment 说明](http://www.baidu.com)

  ```tsx
  // 修改作画状态
  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
    // 保存当前画板的状态，在《 画板（三）：画板历史存储：撤销和前进 》中说明
    saveFragment();
  }, [saveFragment]);
  ```

  - leaveCanvas

  ```tsx
  const leaveCanvas = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);
  ```

- ### 圆形橡皮清除

  Canvas 自带的 clear 为 矩形清除画板的路径，圆形清除原理
