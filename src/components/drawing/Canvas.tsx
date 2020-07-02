import React, { useState, useEffect, useCallback, useRef } from "react";
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

const Canvas = ({ width, height }: CanvasProps) => {
  // 钩 canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 是否在画
  const [isPainting, setIsPainting] = useState(false);

  // 鼠标位置 （规定好，或 undefined）
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

  // 获取距离最外层的高度
  const getOffset = useCallback(
    (el: HTMLElement, offsetStyle: "top" | "left"): number => {
      const OffsetNum = offsetStyle === "top" ? el.offsetTop : el.offsetLeft;
      if (el.offsetParent === null) {
        return OffsetNum;
      }
      console.log(el, OffsetNum);
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
      const x = event.pageX - getOffset(canvas, "left");
      const y = event.pageY - getOffset(canvas, "top");
      // console.log(x, y);
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
      context.strokeStyle = "red";
      context.lineJoin = "round";
      context.lineWidth = 5;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  // 修改状态，开始作画
  const startPaint = useCallback(
    (event: MouseEvent) => {
      const coordinates = getCoordinates(event);
      if (coordinates) {
        console.log("---startPaint---");
        setIsPainting(true);
        setMousePosition(coordinates);
      }
    },
    [getCoordinates]
  );

  // 作画，并保存 新位置
  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition, getCoordinates]
  );

  // 修改作画状态
  const exitPaint = useCallback(() => {
    setIsPainting(false);
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

  // canvas 画板
  return <canvas ref={canvasRef} height={height} width={width} />;
};

// canvas 默认属性
Canvas.defaultProps = {
  // ！！添加modal后，检查样式问题，本身是 100% ,最后看下样式问题
  width: window.innerWidth / 2,
  height: window.innerHeight / 2,
};

export { Canvas };
