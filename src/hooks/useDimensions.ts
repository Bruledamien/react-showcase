import { RefObject, useState, useEffect } from "react";

type TDimensions = {
  width?: number;
  height?: number;
};

const useDimensions = (ref: RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState<TDimensions>({});

  useEffect(() => {
    const getDimensions = () => {
      if (!ref?.current) {
        return {};
      }
      return {
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      };
    };

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (ref.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return dimensions;
};

export default useDimensions;
