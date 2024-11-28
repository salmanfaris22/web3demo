import React from "react";
import QRCode from "react-qr-code";
import classes from "./QrCode.module.scss";

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({
  value,
  size = 128,
  bgColor = "#FFFFFF",
  fgColor = "#000000",
}) => {
  return (
    <div className={classes.qrWrap}>
      <QRCode value={value} size={size} bgColor={bgColor} fgColor={fgColor} />
    </div>
  );
};

export default QRCodeComponent;
