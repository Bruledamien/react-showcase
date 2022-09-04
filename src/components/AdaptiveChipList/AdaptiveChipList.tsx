import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import Chip, { TChip } from "src/components/Chip/Chip";
import useDimensions from "src/hooks/useDimensions";

import "./AdaptiveChipList.scss";

const CHIP_STYLE = {
  fontSize: "16px",
  fontWeight: 500,
};

interface IAdapativeChipList {
  chipsData: TChip[];
  condensed?: boolean;
}

const AdaptiveChipList = ({
  chipsData = [],
  condensed = false,
}: IAdapativeChipList) => {
  const ref = useRef<HTMLInputElement>(null);
  const { width: containerWidth } = useDimensions(ref);

  const [maxDisplayedChips, setMaxDisplayedChips] = useState(0);

  let displayedChips: TChip[] = chipsData;
  let extraChips: TChip[] = [];
  if (condensed) {
    displayedChips = chipsData.slice(0, maxDisplayedChips);
    extraChips = chipsData.slice(maxDisplayedChips);
  }

  useEffect(() => {
    if (containerWidth && containerWidth > 0) {
      const newMaxDisplayedChips = getMaxDisplayedChips({
        chipsData,
        containerWidth,
      });
      setMaxDisplayedChips(newMaxDisplayedChips);
    }
  }, [containerWidth]);

  const extraChipsCount = extraChips.length;
  // console.log("displayedChips", displayedChips);
  // console.log("extraChipsCount", extraChipsCount);

  return (
    <div className="resizable-label-list" ref={ref}>
      {_.map(displayedChips, (chipData, index) => {
        return (
          <Chip key={index} label={chipData?.label} color={chipData?.color} />
        );
      })}

      {extraChipsCount > 0 && (
        <Chip label={`+${extraChipsCount}`} />
        // <Popup
        //   className="resizable-label-list-popup"
        //   trigger={}
        //   position="bottom center"
        // >
        //   <AdaptiveChipList chipsData={extraChips} />
        // </Popup>
      )}
    </div>
  );
};

// TODO: 1. add types
// TODO: 2. pass variables to chip as style prop ?
// TODO: 3. remove console.logs
const getMaxDisplayedChips = ({ chipsData, containerWidth }: any) => {
  const EXTRA_CHIP_WIDTH = 64;
  const PADDING = 10;
  const MARGIN = 4;
  const CONTAINER_NEGATIVE_MARGIN = -8;
  const availableWidth =
    containerWidth - EXTRA_CHIP_WIDTH - CONTAINER_NEGATIVE_MARGIN;

  const measureChip = (label: any) =>
    measureText({ text: label, style: CHIP_STYLE })?.width +
    2 * PADDING +
    2 * MARGIN;

  let maxDisplayedChips = 0;
  let totalChipsWidth = 0;
  let currentChipIndex = 0;
  while (currentChipIndex < chipsData.length) {
    const currentChip = chipsData[currentChipIndex];
    if (totalChipsWidth + measureChip(currentChip?.label) > availableWidth) {
      break;
    }
    totalChipsWidth += measureChip(currentChip?.label);
    // console.log(
    //   "totalChipsWidth",
    //   totalChipsWidth,
    //   "at index",
    //   currentChipIndex
    // );
    currentChipIndex += 1;
    maxDisplayedChips += 1;
  }

  // if last skill fits instead of "+1 other", leave it
  if (currentChipIndex === chipsData.length - 1) {
    const lastChip = chipsData[currentChipIndex];
    const lastChipWidth = measureChip(lastChip?.Chip);
    // console.log('lastChipWidth', lastChipWidth, 'totalChipsWidth', totalChipsWidth, 'containerWidth', containerWidth);
    if (
      totalChipsWidth + lastChipWidth <
      containerWidth - CONTAINER_NEGATIVE_MARGIN
    ) {
      maxDisplayedChips += 1;
      currentChipIndex += 1;
      totalChipsWidth += lastChipWidth;
    }
  }

  // console.log("finalChipsWidth", totalChipsWidth);
  // console.log("maxDisplayedChips", maxDisplayedChips);
  return maxDisplayedChips;
};

interface IMeasureText {
  text?: string;
  style?: any; // TODO:
}

const measureText = ({ text, style }: IMeasureText) => {
  // console.log('measureText', text, style);
  const tempElement = document.createElement("div");
  tempElement.className = "measure-text-temp";

  // IMPORTANT: "hides" div from view
  tempElement.style.left = "-1000";
  tempElement.style.top = "-1000";
  tempElement.style.position = "absolute";

  tempElement.innerHTML = text || "";
  tempElement.style.fontSize = style?.fontSize || "16px";
  tempElement.style.fontFamily = style?.fontFamily || "Noto Sans";
  tempElement.style.fontWeight = style?.fontWeight || 500;

  document.body.appendChild(tempElement);

  const textMeasures = {
    width: tempElement.clientWidth,
    height: tempElement.clientHeight,
  };

  document.body.removeChild(tempElement);
  // console.log("textMeasures", text, textMeasures?.width);
  return textMeasures;
};

export default AdaptiveChipList;
