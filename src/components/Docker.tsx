import React, { useState, useRef, useCallback, useEffect } from "react";

export const Docker = () => {
  const [defaultWidth] = useState(76);
  const [dockList] = useState<string[]>([
    "Finder.png",
    "Launchpad.png",
    "PrefApp.png",
    "Chrome.png",
    "Terminal.png",
    "Calculator.png",
    "Drawing.png",
  ]);
  const dockRef = useRef<HTMLDivElement>(null);
  console.log(dockRef);
  const getOffset = useCallback(
    (el: HTMLElement, offset: "top" | "left"): number => {
      const elOffset = offset === "top" ? el.offsetTop : el.offsetLeft;
      if (el.offsetParent == null) {
        return elOffset;
      }
      return elOffset + getOffset(el.offsetParent as HTMLElement, offset);
    },
    []
  );

  // const mousemove = useCallback(
  //   ({ clientX, clientY }) => {
  //     if (!dockRef.current) {
  //       return;
  //     }
  //     const imgList = dockRef.current.childNodes;
  //     for (let i = 0; i < imgList.length; i++) {
  //       const img = imgList[i] as HTMLImageElement;
  //       const x = img.offsetLeft + defaultWidth / 2 - clientX;
  //       const y =
  //         img.offsetTop +
  //         getOffset(dockRef.current, "top") +
  //         img.offsetHeight / 2 -
  //         clientY;
  //       let imgScale =
  //         1 - Math.sqrt(x * x + y * y) / (imgList.length * defaultWidth);
  //       if (imgScale < 0.5) {
  //         imgScale = 0.5;
  //       }
  //       img.width = defaultWidth * 2 * imgScale;
  //     }
  //   },
  //   [defaultWidth, getOffset]
  // );

  /** 初始化样式
   * 设定每个图片的默认宽度和背景div的宽高
   * mouseleave,鼠标离开Dock事件所需函数
   * */

  const mouseleave = useCallback(() => {
    if (!dockRef.current) {
      return;
    }
    const imgList = dockRef.current.childNodes;
    for (let i = 0; i < imgList.length; i++) {
      const img = imgList[i] as HTMLImageElement;
      img.width = defaultWidth;
    }
  }, [defaultWidth]);

  useEffect(() => {
    mouseleave();
  }, [mouseleave]);

  // 初始化结束
  // useEffect(() => {
  //   if (!dockRef.current) {
  //     return;
  //   }
  //   const dockBackground: HTMLDivElement = dockRef.current;
  //   dockBackground.addEventListener("mousemove", mousemove);
  //   dockBackground.addEventListener("mouseleave", mouseleave);
  //   return () => {
  //     dockBackground.removeEventListener("mousemove", mousemove);
  //     dockBackground.removeEventListener("mouseleave", mouseleave);
  //   };
  // }, [mousemove, mouseleave]);

  // Docker element
  return (
    <div ref={dockRef} style={{ height: defaultWidth }}>
      {dockList.map((item, index) => {
        return (
          <img src={require("../img/" + item)} alt={item} key={index + item} />
        );
      })}
    </div>
  );
};
