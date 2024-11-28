import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import SignaturePad from "react-signature-pad-wrapper";

interface SignatureProps {
  width?: number;
  height?: number;
  options: any;
}

const Signature = forwardRef<SignaturePad, SignatureProps>(
  ({ width, height, options }, ref) => {
    const internalRef = useRef<SignaturePad>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => internalRef.current!);

    const resizeCanvas = () => {
      if (canvasRef.current) {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvasRef.current.width = canvasRef.current.offsetWidth * ratio;
        canvasRef.current.height = canvasRef.current.offsetHeight * ratio;
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.scale(ratio, ratio);
        }
        if (internalRef.current) {
          internalRef.current.clear(); // Clear the canvas to reset it
        }
      }
    };

    useEffect(() => {
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    }, []);

    return (
      <div
        style={{
          width: width ? `${width}px` : "100%",
          height: height ? `${height}%` : "100%",
        }}
      >
        <SignaturePad
          ref={internalRef}
          canvasProps={{
            style: {
              width: "100%",
              height: "100%",
            },
          }}
          options={options}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    );
  }
);

export default Signature;
