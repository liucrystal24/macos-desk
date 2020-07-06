import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  CSSProperties,
} from "react";
import moment from "moment";
import { Iconfont } from "../iconfont";
import { CSSTransition } from "react-transition-group";
// import { useDialog } from "../dialog";
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
  //--------------------- Canvas 画板 State -----------------
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 是否在画
  const [isPainting, setIsPainting] = useState(false);

  // 鼠标位置 （规定好，或 undefined）
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

  //--------------------- tools 工具栏 State -----------------

  // tools 画笔/橡皮 选择
  const [toolsMap] = useState<string[]>(["pen", "eraser"]);
  const [eraserEnabled, setEraserEnabled] = useState(false);
  const onToolsClick = useCallback(([e, tool]) => {
    // 这里逻辑不同，后续查看
    tool === "eraser" ? setEraserEnabled(true) : setEraserEnabled(false);
  }, []);

  // 画板开关状态
  const [isToolboxOpen, setIsToolboxOpen] = useState(true);
  // 画笔 宽度
  const [lineWidth, setLineWidth] = useState(5);
  // 画笔 颜色
  const [strokeStyle, setStrokeStyle] = useState("black");
  const [colorMap] = useState<string[]>(["black", "red", "yellow", "blue"]);

  // back,next
  const backRef = useRef<SVGSVGElement>(null);
  const nextRef = useRef<SVGSVGElement>(null);

  // 保存，删除，前进，后退
  const optionsMap = ["save", "delete", "turn_back", "turn_next"];

  // 前进，后退步数
  const [step, setStep] = useState(-1);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);

  // const { openDialog, closeDialog, RenderDialog } = useDialog();

  //-------------------- canvas 画板 Function -------------------

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

  // 圆形橡皮 x,y,r
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

  //--------------------- tools 工具栏 Function ----------------

  // 画板开关 点击事件
  const toolboxOpenClick = useCallback(() => {
    setIsToolboxOpen(!isToolboxOpen);
    console.log(isToolboxOpen);
  }, [isToolboxOpen]);

  // 画笔宽度
  const onSizesChange = useCallback((e) => {
    setLineWidth(e.target.value);
  }, []);

  // 常见颜色选择
  const onColorsClick = useCallback((e, selector, color) => {
    setStrokeStyle(color);
  }, []);

  // 调色盘
  const onColorsChange = useCallback((e) => {
    setStrokeStyle(e.target.value);
  }, []);

  // 保存 canvas
  const saveCanvas = useCallback(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      // 用于记录当前 context.globalCompositeOperation ——（合成或混合模式）
      const compositeOperation = context.globalCompositeOperation;
      // 设置为 “在现有的画布内容后面绘制新的图形”
      context.globalCompositeOperation = "destination-over";
      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);
      const imageData = canvas.toDataURL("image/png");
      // 将数据从已有的 ImageData 对象绘制到位图
      context.putImageData(context.getImageData(0, 0, width, height), 0, 0);
      // 复原 context.globalCompositeOperation
      context.globalCompositeOperation = compositeOperation;
      // 下载
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = imageData;
      const dateNow = moment().format("YYYY-MM-DD HH-mm-ss");
      a.download = "myPaint " + dateNow;
      a.target = "_blank";
      console.log("myPainting " + dateNow);
      a.click();
    }
  }, [width, height]);

  // 后退、前进
  const changeCanvas = useCallback(
    (type) => {
      if (!canvasRef.current || !backRef.current || !nextRef.current) {
        return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas.getContext("2d");
      const back: SVGSVGElement = backRef.current;
      const next: SVGSVGElement = nextRef.current;
      if (context) {
        let currentStep = -1;
        if (type === "back" && step >= 0) {
          currentStep = step - 1;
          next.classList.add("active");
          if (currentStep < 0) {
            back.classList.remove("active");
          }
        } else if (type === "next" && step < canvasHistory.length - 1) {
          currentStep = step + 1;
          back.classList.add("active");
          if (currentStep === canvasHistory.length - 1) {
            next.classList.remove("active");
          }
        } else {
          return;
        }
        context.clearRect(0, 0, width, height);
        const canvasPic = new Image();
        canvasPic.src = canvasHistory[currentStep];
        canvasPic.addEventListener("load", () => {
          context.drawImage(canvasPic, 0, 0);
        });
        setStep(currentStep);
      }
    },
    [height, width, step, canvasHistory]
  );

  // 清空画布
  const checkClearDialog = useCallback((e) => {
    console.log("清空");
  }, []);

  // 保存、清空、后退、前进
  const onOptionsClick = useCallback(
    (el, toolName) => {
      switch (toolName) {
        case "delete":
          // setClearDialogOpen(true);
          checkClearDialog(el);
          break;
        case "save":
          saveCanvas();
          break;
        case "turn_back":
          changeCanvas("back");
          break;
        case "turn_next":
          changeCanvas("next");
          break;
      }
    },
    [checkClearDialog, saveCanvas, changeCanvas]
  );

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
          type={isToolboxOpen ? "icon-turn_down" : "icon-turn_up"}
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
          <div className="options">
            {optionsMap.map((option, index) => {
              return (
                <Iconfont
                  svgRef={
                    option === "turn_back"
                      ? backRef
                      : option === "turn_next"
                      ? nextRef
                      : undefined
                  }
                  key={index + option}
                  type={"icon-" + option}
                  className={option}
                  style={{ fontSize: 50 }}
                  clickEvent={(el) => onOptionsClick(el, option)}
                />
              );
            })}
          </div>
          <span>Toolbox</span>
          <div className="tools">
            {toolsMap.map((tool, index) => {
              return (
                <Iconfont
                  key={index + tool}
                  className={
                    tool === "eraser"
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
      {/* <RenderDialog
        width={300}
        height={120}
        id="clear-dialog"
        title="您确定要清空该画布吗？"
        message="一旦清空将无法撤回。"
        imgSrc={"Drawing.png"}
        onCheck={checkClearDialog}
        onClose={closeClearDialog}
      /> */}
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
