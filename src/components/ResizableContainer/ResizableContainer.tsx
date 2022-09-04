import { ReactNode, useRef } from "react";
import useMeasureWidthOnDrag from "src/hooks/useMeasureWidthOnDrag";
import "./ResizableContainer.scss";

interface IResizableContainer {
  initWidth?: number | string;
  minWidth?: number;
  maxWidth?: number;
  children: ({ width }: { width?: number }) => ReactNode;
}

const MIN_WIDTH = 200;
const MAX_WIDTH = 1200;

const ResizableContainer = ({
  initWidth = "100%",
  minWidth = MIN_WIDTH,
  maxWidth = MAX_WIDTH,
  children,
}: IResizableContainer) => {
  const ref = useRef<HTMLDivElement>(null);
  const { width, onMouseDown } = useMeasureWidthOnDrag({
    ref,
    minWidth,
    maxWidth,
  });

  return (
    <div
      ref={ref}
      className="resizable-container"
      style={{
        minWidth,
        maxWidth,
        // As soon as width is measured, use it instead of initWidth
        width: width || initWidth,
      }}
    >
      {children({ width })}

      <div className="resizeable-container-handle" onMouseDown={onMouseDown} />
    </div>
  );
};

export default ResizableContainer;
