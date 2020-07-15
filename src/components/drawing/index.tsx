import React, { useContext, useEffect, useState, useCallback } from "react";
import { useModal } from "../modal/UseModal";
import { FooterContext } from "../footer/Footer";
import { TitleBar } from "react-desktop/macOs";
import { UseCanvas } from "./Canvas";
import "./canvas.scss";
/// <reference path="react-desktop.d.ts" />

export const Drawing = React.memo(() => {
  const { open, close, RenderModal } = useModal();
  const { Canvas, canvasHistory, loadPic } = UseCanvas();
  const [
    isDrawingOpen,
    setDrawingOpen,
    isDrawingShow,
    setDrawingShow,
  ] = useContext(FooterContext);
  const [style, setStyle] = useState({ width: 1200, height: 800 });
  const [isFullscreen, setFullscreen] = useState(false);

  // useModal中 打开 和 关闭 窗口
  useEffect(isDrawingOpen.type ? open : close, [isDrawingOpen]);

  // 最大化
  const maximizeClick = useCallback(() => {
    if (isFullscreen) {
      setStyle({ width: 1200, height: 800 });
    } else {
      setStyle({ width: -1, height: -1 });
    }
    setFullscreen(!isFullscreen);
  }, [isFullscreen]);

  return (
    <RenderModal
      data={{
        width: style.width,
        height: style.height,
        id: "DrawingView",
        moveId: "DrawingMove",
        isShow: isDrawingShow,
      }}
    >
      <div className="drawing-wrapper">
        <TitleBar
          controls
          id="DrawingMove"
          isFullscreen={isFullscreen}
          onCloseClick={() => {
            close();
            setDrawingOpen({ ...isDrawingOpen, type: false });
          }}
          onMinimizeClick={() => {
            setDrawingShow(false);
            console.log("min");
            console.log(canvasHistory);
          }}
          // 没起作用？
          onMaximizeClick={() => {
            maximizeClick();
            console.log(canvasHistory);
          }}
          onResizeClick={() => {
            maximizeClick();
            setTimeout(() => {
              loadPic();
            }, 50);
          }}
        />
        <Canvas
          height={
            isFullscreen ? document.body.clientHeight - 120 : style.height
          }
          width={isFullscreen ? document.body.clientWidth : style.width}
        />
      </div>
    </RenderModal>
  );
});
