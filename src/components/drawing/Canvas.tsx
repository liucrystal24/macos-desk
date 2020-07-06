import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  CSSProperties,
} from "react";
import { Iconfont } from "../iconfont";
import { CSSTransition } from "react-transition-group";
import "./canvas.scss";

// canvans props
interface CanvasProps {
  width: number;
  height: number;
}

// 鼠标位置
type Coordinate = {
  x: number;
  y: number;
};

// 清除圆形区域
interface ClearArcOptions {
  x: number;
  y: number;
  r: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
  //--------------------- Canvas 画板 -----------------
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 是否在画
  const [isPainting, setIsPainting] = useState(false);

  // 鼠标位置 （规定好，或 undefined）
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

  //--------------------- tools 工具栏 -----------------

  // tools 画笔/橡皮 选择
  const [toolsMap] = useState<string[]>(["huabi", "xiangpi"]);
  const [eraserEnabled, setEraserEnabled] = useState(false);
  const onToolsClick = useCallback(([e, tool]) => {
    // 这里逻辑不同，后续查看
    tool === "xiangpi" ? setEraserEnabled(true) : setEraserEnabled(false);
  }, []);

  // 画板开关状态
  const [isToolboxOpen, setIsToolboxOpen] = useState(true);
  // 画笔 宽度
  const [lineWidth, setLineWidth] = useState(5);
  // 画笔 颜色
  const [strokeStyle, setStrokeStyle] = useState("black");
  const [colorMap] = useState<string[]>(["black", "red", "yellow", "blue"]);

  //-------------------- canvas 画板 -------------------

  // 获取距离最外层的高度
  const getOffset = useCallback(
    (el: HTMLElement, offsetStyle: "top" | "left"): number => {
      const OffsetNum = offsetStyle === "top" ? el.offsetTop : el.offsetLeft;
      if (el.offsetParent === null) {
        return OffsetNum;
      }
      // console.log(el, OffsetNum);
      return OffsetNum + getOffset(el.offsetParent as HTMLElement, offsetStyle);
    },
    []
  );

  // 获取当前鼠标的坐标
  const getCoordinates = useCallback(
    (event: MouseEvent): Coordinate | undefined => {
      if (!canvasRef.current) {
        return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      // event.offsetX
      // event.offsetY
      const x = event.pageX - getOffset(canvas, "left");
      const y = event.pageY - getOffset(canvas, "top");
      return { x, y };
    },
    [getOffset]
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
      // 判断是否是 清除状态
      // if (eraserEnabled) {
      // context.strokeStyle = "white";
      // } else {
      context.strokeStyle = strokeStyle;
      // }
      context.lineJoin = "round";
      context.lineWidth = lineWidth;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  // 修改状态，开始作画
  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  // 清除圆形区域
  const clearArc = useCallback((x, y, radius, ctx, stepClear) => {
    var calcWidth = radius - stepClear;
    var calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth);

    var posX = x - calcWidth;
    var posY = y - calcHeight;

    var widthX = 2 * calcWidth;
    var heightY = 2 * calcHeight;

    if (stepClear <= radius) {
      ctx.clearRect(posX, posY, widthX, heightY);
      stepClear += 1;
      clearArc(x, y, radius, ctx, stepClear);
    }
  }, []);

  const clearArcFun = useCallback(
    ({ x, y, r }: ClearArcOptions) => {
      if (!canvasRef.current) {
        return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        var stepClear = 1;
        clearArc(x, y, r, context, stepClear);
      }
    },
    [clearArc]
  );

  // 作画，并保存 新位置
  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          if (eraserEnabled) {
            const newr = Number(lineWidth / 2);
            clearArcFun({
              x: newMousePosition.x,
              y: newMousePosition.y,
              r: newr,
            });
          } else {
            drawLine(mousePosition, newMousePosition);
            setMousePosition(newMousePosition);
          }
        }
      }
    },
    [isPainting, eraserEnabled, mousePosition, lineWidth, drawLine, clearArcFun]
  );

  // 修改作画状态
  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);

  // 按下鼠标，修改状态，开始作画
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousedown", startPaint);
    return () => {
      canvas.removeEventListener("mousedown", startPaint);
    };
  }, [startPaint]);

  // 鼠标移动，跟踪轨迹
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousemove", paint);
    return () => {
      canvas.removeEventListener("mousemove", paint);
    };
  }, [paint]);

  // 鼠标送，或离开画板，停止作画
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);
    return () => {
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [exitPaint]);

  //--------------------- tools 工具栏 -----------------

  // 画板开关 点击事件
  const toolboxOpenClick = useCallback(() => {
    setIsToolboxOpen(!isToolboxOpen);
    console.log(isToolboxOpen);
  }, [isToolboxOpen]);

  const onSizesChange = useCallback((e) => {
    setLineWidth(e.target.value);
  }, []);

  const onColorsClick = useCallback((e, selector, color) => {
    setStrokeStyle(color);
  }, []);

  // 调色盘
  const onColorsChange = useCallback((e) => {
    setStrokeStyle(e.target.value);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} height={height} width={width} />
      <div
        id="toolbox-open"
        style={
          {
            borderRadius: isToolboxOpen ? null : 5,
          } as CSSProperties
        }
      >
        <Iconfont
          type={isToolboxOpen ? "icon-zhankai" : "icon-shouqi"}
          style={{
            width: "100%",
            fontSize: 32,
          }}
          clickEvent={toolboxOpenClick}
        />
      </div>
      <CSSTransition
        in={isToolboxOpen}
        timeout={300}
        classNames="toolbox"
        unmountOnExit
      >
        <div id="toolbox" /* 画笔/橡皮 */>
          <span>Options</span>
          <div className="options">...</div>
          <span>Toolbox</span>
          <div className="tools">
            {toolsMap.map((tool, index) => {
              return (
                <Iconfont
                  key={index + tool}
                  className={
                    tool === "xiangpi"
                      ? eraserEnabled
                        ? "active"
                        : ""
                      : !eraserEnabled
                      ? "active"
                      : ""
                  }
                  type={"icon-" + tool}
                  style={{ fontSize: 50 }}
                  clickEvent={(e) => onToolsClick([e, tool])}
                />
              );
            })}
          </div>
          <div className="sizes" /* 画笔粗细*/>
            <input
              style={
                {
                  backgroundColor: eraserEnabled ? "#ebeff4" : strokeStyle,
                } as CSSProperties
              }
              type="range"
              id="range"
              name="range"
              min="1"
              max="20"
              value={lineWidth}
              onChange={onSizesChange}
            />
          </div>
          <ol className="colors" /* 常用颜色选择 */>
            {colorMap.map((color, index) => {
              return (
                <li
                  key={index + color}
                  className={color === strokeStyle ? color + " active" : color}
                  onClick={(e) => onColorsClick(e, "li", color)}
                ></li>
              );
            })}
            <input
              type="color" // 调色盘
              value={strokeStyle}
              onChange={onColorsChange}
              id="currentColor"
            />
          </ol>
        </div>
      </CSSTransition>
    </>
  );
};

// canvas 默认属性
Canvas.defaultProps = {
  // ！！添加modal后，检查样式问题，本身是 100% ,最后看下样式问题
  width: window.innerWidth / 2,
  height: window.innerHeight / 2,
};

export { Canvas };
