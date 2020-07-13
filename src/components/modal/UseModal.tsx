import React, { useState } from "react";

import Modal from "./Modal";

// Modal组件最基础的两个事件，open/close
export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const open = () => {
    setIsVisible(true);
    console.log("openDrawing");
  };
  const close = () => {
    setIsVisible(false);
    console.log("closeDrawing");
  };

  const RenderModal = ({
    children,
    data,
  }: {
    children: React.ReactChild;
    data: {
      width: number;
      height: number;
      id: string;
      moveId: string;
      isShow: boolean;
    };
  }) => (
    <>
      {isVisible && (
        <Modal data={data} closeModal={close}>
          {children}
        </Modal>
      )}
    </>
  );

  return {
    open,
    close,
    RenderModal,
  };
};
