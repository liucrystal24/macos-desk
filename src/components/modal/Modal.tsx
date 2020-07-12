import ReactDOM from "react-dom";
import React from "react";
import Draggable from "./draggable/index";

type Props = {
  children: React.ReactChild;
  closeModal?: () => void;
  data: {
    width: number;
    height: number;
    id: string;
    moveId: string;
    isShow: boolean;
  };
};

/**
 * 父元素需要传值
 * {
    children，
    data：{
      width；height；
      id：主体dom（Drawing）；
      moveId：可拖拽部分（TitleBar）;
      isshow：是否显示
    }
  }
 */

const Modal = React.memo(({ children, data }: Props) => {
  const domEl = document.getElementById("main-view") as HTMLDivElement;
  if (!domEl) return null;

  // Portal 弹窗
  return ReactDOM.createPortal(
    <Draggable domEl={domEl} data={data}>
      {children}
    </Draggable>,
    domEl
  );
});

export default Modal;
