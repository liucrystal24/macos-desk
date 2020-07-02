import React, { useState, useEffect, useRef, useCallback } from "react";

export const Docker = () => {
  // docker 图标默认宽度
  const [defaultWidth] = useState(76);
  // dockDiv
  const dockerRef = useRef<HTMLDivElement>(null);
  // docker 图标列表
  const [dockList] = useState<string[]>([
    "Finder.png",
    "Launchpad.png",
    "Chrome.png",
    "PrefApp.png",
    "Terminal.png",
    "Calculator.png",
    "Drawing.png",
  ]);
  // docker 图标 放大系数
  const [scaleNum] = useState(2);

  // dockerRef 距离<html>内边距(div->footer + footer-> html)
  const getDockerOffset = useCallback(
    (el: HTMLElement, offsetStyle: "top" | "left"): number => {
      const getOffset = offsetStyle === "top" ? el.offsetTop : el.offsetLeft;
      if (el.offsetParent === null) {
        return getOffset;
      }
      return (
        getOffset + getDockerOffset(el.offsetParent as HTMLElement, offsetStyle)
      );
    },
    []
  );

  // mouseleave 图标宽度恢复默认宽度
  const mouseLeave = useCallback(() => {
    if (!dockerRef.current) {
      return;
    }
    console.log("leave");
    const imgList = dockerRef.current.childNodes;
    for (let i = 0; i < imgList.length; i++) {
      const img = imgList[i] as HTMLImageElement;
      img.width = defaultWidth;
    }
  }, [defaultWidth]);

  /**
   * mousemove 图标宽度变化规则
   * offsetTop 元素左上角到 offsetParent 的上内边距，此处为 footer
   * offsetLeft 元素左上角到 offsetParent 的左内边距，此处为 footer
   *
   */
  const mouseMove = useCallback(
    ({ clientX, clientY }) => {
      if (!dockerRef.current) {
        return;
      }
      const imgList = dockerRef.current.childNodes;
      for (let i = 0; i < imgList.length; i++) {
        const img = imgList[i] as HTMLImageElement;
        // x:点击处距离图标中心的横向距离
        const x = img.offsetLeft + img.offsetWidth / 2 - clientX;
        // y:点击处距离图标中心的纵向距离
        const y =
          img.offsetTop +
          img.offsetHeight / 2 +
          getDockerOffset(dockerRef.current, "top") -
          clientY;
        let scaleImg =
          1 - Math.sqrt(x * x + y * y) / (imgList.length * defaultWidth);
        if (scaleImg < 0.5) {
          scaleImg = 0.5;
        }
        img.width = defaultWidth * scaleNum * scaleImg;
      }
    },
    [getDockerOffset, defaultWidth, scaleNum]
  );

  // 初始化 图标宽度
  useEffect(() => {
    mouseLeave();
  }, [mouseLeave]);

  useEffect(() => {
    if (!dockerRef.current) {
      return;
    }
    const docker: HTMLDivElement = dockerRef.current;
    docker.addEventListener("mousemove", mouseMove);
    docker.addEventListener("mouseleave", mouseLeave);
    return () => {
      docker.removeEventListener("mousemove", mouseMove);
      docker.removeEventListener("mouseleave", mouseLeave);
    };
  }, [mouseMove, mouseLeave]);

  return (
    <div ref={dockerRef} style={{ height: defaultWidth }}>
      {dockList.map((item, index) => {
        return <img src={require("../../img/" + item)} key={index} alt={item} />;
      })}
    </div>
  );
};
