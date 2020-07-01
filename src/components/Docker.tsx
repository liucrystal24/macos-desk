import React, { useState, useRef, useCallback, useEffect } from "react";

export const Docker = () => {
  // Docker栏 默认高度(宽度)
  const [defaultWidth] = useState(76);

  // Docker栏 图标列表
  const [dockList] = useState<string[]>([
    "Finder.png",
    "Launchpad.png",
    "PrefApp.png",
    "Chrome.png",
    "Terminal.png",
    "Calculator.png",
    "Drawing.png",
  ]);

  // Docker栏 html对象
  const dockRef = useRef<HTMLDivElement>(null);

  // getOffset : Docker 栏 距离 浏览器 顶/左 边距( dockRef + footer )，方便以后 Docker 栏左移时的计算
  const getOffset = useCallback(
    (el: HTMLElement, offset: "top" | "left"): number => {
      const elOffset = offset === "top" ? el.offsetTop : el.offsetLeft;
      if (el.offsetParent == null) {
        return elOffset;
      }
      // elOffset : Docker 栏 相对于 footer 的上边距; 后一个是 footer 相对于 html 的上边距
      return elOffset + getOffset(el.offsetParent as HTMLElement, offset);
    },
    []
  );
  const mousemove = useCallback(
    ({ clientX, clientY }) => {
      if (!dockRef.current) {
        return;
      }
      // console.log({ clientX, clientY });
      const imgList = dockRef.current.childNodes;
      for (let i = 0; i < imgList.length; i++) {
        const img = imgList[i] as HTMLImageElement;
        // x : 鼠标 到 图标中心点 的 横坐标差
        /**
         * offsetLeft: 相对于 offsetParent 的左边距，此处是footer
         * */
        console.log(i, img.offsetLeft);
        const x = img.offsetLeft + defaultWidth / 2 - clientX;

        /**
         * offsetTop: 相对于 offsetParent 的上边距（分正负），此处是 footer
         * offsetHeight: 元素的高度，包括 padding,border
         * y : 鼠标 到 图标中心点 的 纵坐标差
         * Math.sqrt(x * x + y * y) : 鼠标 到 图标中心的 距离
         * imgList.length * defaultWidth : Docker 栏总长
         * */
        // console.log(i, img.offsetTop);
        const y =
          img.offsetTop +
          getOffset(dockRef.current, "top") +
          img.offsetHeight / 2 -
          clientY;
        let imgScale =
          1 - Math.sqrt(x * x + y * y) / (imgList.length * defaultWidth);
        if (imgScale < 0.5) {
          imgScale = 0.5;
        }
        // 鼠标移动后图标放大，否则 显示为原图标大小 (2 * 0.5 = 1 , 2 为基础倍数。可以调整)
        img.width = defaultWidth * 2 * imgScale;
      }
    },
    [defaultWidth, getOffset]
  );

  // mouseleave 事件： 鼠标离开后，所有图标 宽高重回 defaultWidth
  const mouseleave = useCallback(() => {
    if (!dockRef.current) {
      console.log("!", dockRef.current);
      return;
    }
    // Docker 栏 所有子元素: Nodelist类型
    const imgList = dockRef.current.childNodes;
    console.log("have", dockRef.current);
    for (let i = 0; i < imgList.length; i++) {
      const img = imgList[i] as HTMLImageElement;
      // 图片为正方形，所以只需要设置宽度，高宽相等
      img.width = defaultWidth;
    }
  }, [defaultWidth]);

  // 初始化样式
  useEffect(() => {
    mouseleave();
  }, [mouseleave]);

  // 绑定 mousemove , mouseleave 事件
  useEffect(() => {
    if (!dockRef.current) {
      return;
    }
    const dockBackground: HTMLDivElement = dockRef.current;
    dockBackground.addEventListener("mousemove", mousemove);
    dockBackground.addEventListener("mouseleave", mouseleave);
    return () => {
      dockBackground.removeEventListener("mousemove", mousemove);
      dockBackground.removeEventListener("mouseleave", mouseleave);
    };
  }, [mousemove, mouseleave]);

  // Docker 栏
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
