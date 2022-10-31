import * as React from "react";

interface LengthObject {
  value: number;
  unit: string;
}

const cssUnit: { [unit: string]: boolean } = {
  cm: true,
  mm: true,
  in: true,
  px: true,
  pt: true,
  pc: true,
  em: true,
  ex: true,
  ch: true,
  rem: true,
  vw: true,
  vh: true,
  vmin: true,
  vmax: true,
  "%": true,
};

/**
 * If size is a number, append px to the value as default unit.
 * If size is a string, validate against list of valid units.
 * If unit is valid, return size as is.
 * If unit is invalid, console warn issue, replace with px as the unit.
 *
 * @param {(number | string)} size
 * @return {LengthObject} LengthObject
 */
export function parseLengthAndUnit(size: number | string): LengthObject {
  if (typeof size === "number") {
    return {
      value: size,
      unit: "px",
    };
  }
  let value: number;
  const valueString: string = (size.match(/^[0-9.]*/) || "").toString();
  if (valueString.includes(".")) {
    value = parseFloat(valueString);
  } else {
    value = parseInt(valueString, 10);
  }

  const unit: string = (size.match(/[^0-9]*$/) || "").toString();

  if (cssUnit[unit]) {
    return {
      value,
      unit,
    };
  }

  console.warn(
    `React Spinners: ${size} is not a valid css value. Defaulting to ${value}px.`
  );

  return {
    value,
    unit: "px",
  };
}

/**
 * Take value as an input and return valid css value
 *
 * @param {(number | string)} value
 * @return {string} valid css value
 */
export function cssValue(value: number | string): string {
  const lengthWithunit = parseLengthAndUnit(value);

  return `${lengthWithunit.value}${lengthWithunit.unit}`;
}

import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";

export type LengthType = number | string;

interface CommonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  color?: string;
  loading?: boolean;
  cssOverride?: CSSProperties;
  speedMultiplier?: number;
}

export interface LoaderHeightWidthProps extends CommonProps {
  height?: LengthType;
  width?: LengthType;
}

export interface LoaderSizeProps extends CommonProps {
  size?: LengthType;
}

export interface LoaderSizeMarginProps extends CommonProps {
  size?: LengthType;
  margin?: LengthType;
}

export interface LoaderHeightWidthRadiusProps extends CommonProps {
  height?: LengthType;
  width?: LengthType;
  radius?: LengthType;
  margin?: LengthType;
}

const createAnimation = (
  loaderName: string,
  frames: string,
  suffix: string
): string => {
  const animationName = `react-spinners-${loaderName}-${suffix}`;

  if (typeof window == "undefined" || !window.document) {
    return animationName;
  }

  const styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  const styleSheet = styleEl.sheet;

  const keyFrames = `
      @keyframes ${animationName} {
        ${frames}
      }
    `;

  if (styleSheet) {
    styleSheet.insertRule(keyFrames, 0);
  }

  return animationName;
};

const circle = createAnimation(
  "CircleLoader",
  "0% {transform: rotate(0deg)} 50% {transform: rotate(180deg)} 100% {transform: rotate(360deg)}",
  "circle"
);

function CircleLoader({
  loading = true,
  color = "#69b1ec",
  speedMultiplier = 1,
  cssOverride = {},
  size = 50,
  ...additionalprops
}: LoaderSizeProps): JSX.Element | null {
  const wrapper: React.CSSProperties = {
    display: "inherit",
    position: "relative",
    width: cssValue(size),
    height: cssValue(size),
    ...cssOverride,
  };

  const style = (i: number): React.CSSProperties => {
    const { value, unit } = parseLengthAndUnit(size);

    return {
      position: "absolute",
      height: `${value * (1 - i / 10)}${unit}`,
      width: `${value * (1 - i / 10)}${unit}`,
      borderTop: `1px solid ${color}`,
      borderBottom: "none",
      borderLeft: `1px solid ${color}`,
      borderRight: "none",
      borderRadius: "100%",
      transition: "2s",
      top: `${i * 0.7 * 2.5}%`,
      left: `${i * 0.35 * 2.5}%`,
      animationFillMode: "",
      animation: `${circle} ${1 / speedMultiplier}s ${
        (i * 0.2) / speedMultiplier
      }s infinite linear`,
    };
  };

  if (!loading) {
    return null;
  }

  return (
    <span style={wrapper} {...additionalprops}>
      <span style={style(0)} />
      <span style={style(1)} />
      <span style={style(2)} />
      <span style={style(3)} />
      <span style={style(4)} />
    </span>
  );
}

export default CircleLoader;
