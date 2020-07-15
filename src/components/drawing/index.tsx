import React, { useContext, useEffect, useState, useCallback } from "react";
import { useModal } from "../modal/UseModal";
import { FooterContext } from "../footer/Footer";
import { TitleBar } from "react-desktop/macOs";
import { UseCanvas } from "./Canvas";
import "./canvas.scss";
/// <reference path="react-desktop.d.ts" />

export const UseDrawing = () => {
  const { open, close, RenderModal } = useModal();
  const { Canvas, canvasHistory, setCanvasHistory, loadPic } = UseCanvas();
  const Drawing = () => {
    const [
      isDrawingOpen,
      setDrawingOpen,
      isDrawingShow,
      setDrawingShow,
    ] = useContext(FooterContext);
    const [style, setStyle] = useState({ width: 1200, height: 800 });
    const [isFullscreen, setFullscreen] = useState(false);

    // 监听 isDrawingOpen, 打开或关闭 Modal
    useEffect(isDrawingOpen.type ? open : close, [isDrawingOpen]);

    // 最大化
    const maximizeClick = useCallback(() => {
      if (isFullscreen) {
        setStyle({ width: 1200, height: 800 });
      } else {
        setStyle({ width: -1, height: -1 });
      }
      setFullscreen(!isFullscreen);
      // 需要添加画面保存 ?
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
              // 清空历史绘画
              setCanvasHistory([]);
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
              /* 全屏时，canvas高度为屏幕高度减去底下Docker栏高度，否则就按照设置的高度 */
              isFullscreen ? document.body.clientHeight - 120 : style.height
            }
            width={isFullscreen ? document.body.clientWidth : style.width}
          />
        </div>
      </RenderModal>
    );
  };
  return {
    Drawing,
    loadPic,
  };
};
