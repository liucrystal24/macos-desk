import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  CSSProperties,
} from "react";

type Props = {
  children: React.ReactChild;
  domEl: HTMLDivElement;
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
    domEl：（Modal主体dom），
    data：{
      width；height；
      id：主体dom（Drawing）；
      moveId：可拖拽部分（TitleBar）;
      isshow：是否显示
    }
  }
 */
const Draggable = ({ children, domEl, data }: Props) => {
  const dragEl = document.getElementById(data.id) as HTMLDivElement;
  const moveEl = document.getElementById(data.moveId) as HTMLDivElement;
  const localPosition = localStorage.getItem(data.id) || null;
  const initPosition = localPosition
    ? JSON.parse(localPosition)
    : {
        x: data.width === -1 ? 0 : (window.innerWidth - data.width) / 2,
        y: data.height === -1 ? 0 : (window.innerHeight - data.height) / 2,
      };
  // console.log(initPosition);
  const [state, setState] = useState({
    isDragging: false,
    origin: { x: 0, y: 0 },
    position: initPosition,
  });

  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setState((state) => ({
      ...state,
      isDragging: true,
      // 点击处距离 draggle 边框的距离
      origin: {
        x: clientX - state.position.x,
        y: clientY - state.position.y,
      },
    }));
  }, []);

  // 拖拽事件
  const handleMouseMove = useCallback(
    // 边框不出浏览器
    ({ clientX, clientY, target }) => {
      if (!state.isDragging || (moveEl && target !== moveEl)) return;
      let x = clientX - state.origin.x;
      let y = clientY - state.origin.y;
      if (x <= 0) {
        x = 0;
      } else if (x > window.innerWidth - dragEl.offsetWidth) {
        x = window.innerWidth - dragEl.offsetWidth;
      }
      if (y <= 0) {
        y = 0;
      } else if (y > window.innerHeight - dragEl.offsetHeight) {
        y = window.innerHeight - dragEl.offsetHeight;
      }
      const newPosition = { x, y };
      setState((state) => ({
        ...state,
        position: newPosition,
      }));
    },
    [state.isDragging, state.origin, moveEl, dragEl]
  );

  const handleMouseUp = useCallback(() => {
    if (state.isDragging) {
      setState((state) => ({
        ...state,
        isDragging: false,
      }));
    }
  }, [state.isDragging]);

  // 全屏
  useEffect(() => {
    if (data.width === -1) {
      setState({
        isDragging: false,
        origin: { x: 0, y: 0 },
        position: { x: 0, y: 0 },
      });
    }
  }, [data.width]);

  useEffect(() => {
    if (!domEl) return;
    domEl.addEventListener("mousemove", handleMouseMove);
    domEl.addEventListener("mouseup", handleMouseUp);
    return () => {
      domEl.removeEventListener("mousemove", handleMouseMove);
      domEl.removeEventListener("mouseup", handleMouseUp);
      if (data.width !== -1) {
        localStorage.setItem(data.id, JSON.stringify(state.position));
      }
    };
  }, [
    domEl,
    handleMouseMove,
    handleMouseUp,
    data.id,
    data.width,
    state.position,
  ]);

  const styles = useMemo(
    () => ({
      left: `${state.position.x}px`,
      top: data.isShow ? `${state.position.y}px` : "-2000px",
      // top: `${state.position.y}px`,
      zIndex: state.isDragging ? 2 : 1,
      // 最小化 none，是不是画布就清除了？
      // display: data.isShow ? "block" : "none",
      position: "absolute",
    }),
    [state.isDragging, state.position, data.isShow]
  );

  return (
    <div
      id={data.id}
      style={styles as CSSProperties}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

export default Draggable;
