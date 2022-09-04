import _ from "lodash";
import { RefObject, useEffect, useState } from "react";
import useDimensions from "./useDimensions";

interface IUseResizeHandle {
  ref: RefObject<HTMLElement>;
  minWidth?: number;
  maxWidth?: number;
}

const useMeasureWidthOnDrag = ({
  ref,
  minWidth = 0,
  maxWidth,
}: IUseResizeHandle) => {
  const { width: initWidth } = useDimensions(ref);
  const [width, setWidth] = useState(initWidth);

  // initial measure of ref's width
  useEffect(() => {
    if (initWidth) {
      setWidth(initWidth);
    }
  }, [initWidth]);

  const onMouseDown = (mouseDownEvent: any) => {
    const startWidth = width; // keep initial width during the resizing

    const onMouseMove = (mouseMoveEvent: any) => {
      setWidth(
        getBoundValue({
          min: minWidth,
          max: maxWidth,
          value: startWidth + mouseMoveEvent.pageX - mouseDownEvent.pageX,
        })
      );
    };

    const onMouseUp = () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    };

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  return {
    ref,
    width,
    onMouseDown,
  };
};

interface IGetBoundedValue {
  min?: number;
  max?: number;
  value: number;
}

const getBoundValue = ({ min, max, value }: IGetBoundedValue) => {
  let result = value;
  if (_.isNumber(min)) {
    result = Math.max(min, result);
  }
  if (_.isNumber(max)) {
    result = Math.min(result, max);
  }
  return result;
};

export default useMeasureWidthOnDrag;
