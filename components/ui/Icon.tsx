"use client";

import { FC } from "react";
import { IconContext } from "react-icons";
import {
  MdCalendarMonth,
  MdEditDocument,
  MdLink,
  MdLocationPin,
  MdMenu,
} from "react-icons/md";

export const iconNames = [
  "menu",
  "location",
  "calendar",
  "link",
  "edit",
] as const;

export type IconName = (typeof iconNames)[number];

export const iconSizes = ["large", "small"] as const;

export type IconSize = (typeof iconSizes)[number];

export type IconPropTypes = {
  name: IconName | string;
  color?: string;
  size?: IconSize;
  onClick?: any;
  pointer?: boolean;
};

const selectIcon = (
  iconName: IconPropTypes["name"],
  size: IconSize | string
): JSX.Element => {
  switch (iconName) {
    case "menu":
      return <MdMenu />;
    case "location":
      return <MdLocationPin />;
    case "calendar":
      return <MdCalendarMonth />;
    case "link":
      return <MdLink />;
    case "edit":
      return <MdEditDocument />;
    default:
      return <></>;
  }
};

const selectIconSize = (iconSize?: string) => {
  switch (iconSize) {
    case "small":
      return "12px";
    case "large":
      return "50px";
    default:
      return "20px";
  }
};

const IconWrapper = ({pointer, ...props}: any) => (
  <span style={pointer ? { cursor: "pointer" } : {}} {...props} />
);

const Icon: FC<IconPropTypes> = ({ name, color, size, onClick, pointer }) => (
  <IconContext.Provider
    value={{ color: color || "#fffff", size: selectIconSize(size) }}
  >
    <IconWrapper pointer={pointer} onClick={onClick}>
      {selectIcon(name, selectIconSize(size))}
    </IconWrapper>
  </IconContext.Provider>
);

export default Icon;
