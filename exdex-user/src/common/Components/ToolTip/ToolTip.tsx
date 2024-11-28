import React from "react";
import { Tooltip } from "react-tooltip";

type PlacesType =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'

const CustomToolTip = ({ id, message ,className ,placement="bottom" }: { id: string; message?: string | number ,placement?:PlacesType, className?: string }) => {
  return <Tooltip className={`customeToolTip ${className}`} id={id} place={placement} content={`${message}`} />;
};

export default CustomToolTip;
