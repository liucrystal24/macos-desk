import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  CSSProperties,
} from "react";

// 加载 drawing
import { Drawing } from "../drawing";
import "./index.scss";

// import { addListener } from "cluster";

export const FooterContext = createContext<any>([]);

interface OpenTypes {
  type: boolean;
  index?: number;
}

export const Footer = () => {
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

  // drawing 打开
  const [isDrawingOpen, setDrawingOpen] = useState<OpenTypes>({
    type: false,
    index: 6,
  });

  // drawing 最小化
  const [isDrawingShow, setDrawingShow] = useState(true);

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
      const img = imgList[i] as HTMLDivElement;
      img.style.width = img.style.height = defaultWidth + "px";
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
        const img = imgList[i] as HTMLDivElement;
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
        img.style.width = img.style.height =
          defaultWidth * scaleNum * scaleImg + "px";
      }
    },
    [getDockerOffset, defaultWidth, scaleNum]
  );

  const dockItemClick = useCallback(
    (item, index) => {
      if (!dockerRef.current) {
        return;
      }
      // const imgList = dockerRef.current.childNodes;
      // const img = imgList[index] as HTMLDivElement;
      switch (item) {
        case "Drawing.png":
          if (!isDrawingOpen.type) {
            // 增加小圆点，表示打开
            // img.classList.add("active");
            console.dir(item.classList);
            console.log(item);
            // setTimeout(() => {
            setDrawingOpen({ type: !isDrawingOpen.type, index });
            // img.classList.remove("bounce");
            // }, 2500);
            return;
          }
          // 最小化,或者显示，只有关闭 x，才真正关闭
          setDrawingShow(!isDrawingShow);
          return;
      }
    },
    [isDrawingOpen, isDrawingShow]
  );

  // 初始化 图标宽度
  useEffect(() => {
    mouseLeave();
  }, [mouseLeave]);

  // 图标打开时，添加 active
  useEffect(() => {
    if (!dockerRef.current) {
      return;
    }
    const imgList = dockerRef.current.childNodes;
    [isDrawingOpen].forEach((item) => {
      if (item.index) {
        const img = imgList[item.index] as HTMLDivElement;
        !item.type
          ? img.classList.remove("active")
          : img.classList.add("active");
      }
    });
  }, [isDrawingOpen]);

  // 绑定事件
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
    <>
      <FooterContext.Provider
        value={[isDrawingOpen, setDrawingOpen, isDrawingShow, setDrawingShow]}
      >
        <Drawing />
      </FooterContext.Provider>
      <footer id="AppFooter">
        <div ref={dockerRef} style={{ height: defaultWidth + 10 }} id="Docker">
          {dockList.map((item, index) => {
            return (
              <div
                className={
                  // 写死 drawing，需要修改
                  index === 6 && isDrawingOpen.type
                    ? "DockItem active"
                    : "DockItem"
                }
                style={
                  {
                    backgroundImage:
                      "url(" + require("../../img/" + item) + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  } as CSSProperties
                }
                key={index + item}
                onClick={() => dockItemClick(item, index)}
              />
            );
          })}
        </div>
      </footer>
    </>
  );
};
