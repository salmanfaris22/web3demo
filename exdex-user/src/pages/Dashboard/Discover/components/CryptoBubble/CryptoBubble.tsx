import React, { useEffect, useRef, useState } from "react";
import {
  Engine,
  Render,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
  IRendererOptions,
  Body,
  Runner,
  IMouseConstraintDefinition,
  Events,
  Query,
} from "matter-js";
import classes from "./CryptoBubble.module.scss";
import { formatCurrency } from "../../../../../utils/currencyFormatter";
import Loading from "../../../../../common/UI/Loading/Loading";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import NoData from "../../../../../common/Components/NoData/NoData";
import { getFirstLetter } from "../../../../../utils/name";
import { NFT_URL } from "../../../../../config";

interface CryptoBubbleChartData {
  data: any[];
  isLoading: boolean;
}

const CryptoBubbleChart: React.FC<CryptoBubbleChartData> = ({
  data,
  isLoading,
}) => {
  const scene = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useRef(Engine.create());
  const render = useRef<Render | null>(null);
  const runner = useRef<Runner | null>(null);
  const timer = useRef<any>(null);
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  const [hoverInfo, setHoverInfo] = useState<{
    x: number;
    y: number;
    data: any | null;
  }>({ x: 0, y: 0, data: null });

  useEffect(() => {
    setCryptoData(data);
  }, [data]);

  useEffect(() => {
    const handleWheel = () => {
      // Temporarily disable pointer events during scroll
      canvasRef.current?.classList.add(classes.noPointer);

      // Re-enable pointer events after scrolling stops
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        canvasRef.current?.classList.remove(classes.noPointer);
      }, 100); // Adjust the timeout for a smooth experience
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    if (!scene.current || !canvasRef.current || cryptoData.length === 0) return;

    const cw = scene.current.clientWidth;
    const ch = scene.current.clientHeight;
    canvasRef.current.width = cw;
    canvasRef.current.height = ch;

    const ctx = canvasRef.current.getContext("2d")!;

    engine.current = Engine.create({
      gravity: { x: 0, y: 0.05 },
    });

    render.current = Render.create({
      canvas: canvasRef.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "rgba(31, 69, 79, 1)",
      } as IRendererOptions,
    });

    runner.current = Runner.create();

    const walls = [
      Bodies.rectangle(cw / 2, -10, cw, 20, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, {
        isStatic: true,
        render: { visible: false },
      }),
    ];
    World.add(engine.current.world, walls);

    const maxAmount = Math.max(
      ...cryptoData.map((crypto) => crypto.my_commission)
    );
    const minAmount = Math.min(
      ...cryptoData.map((crypto) => crypto.my_commission)
    );

    const bubbles = cryptoData.map((crypto) => {
      const minRadius = cw > 650 ? (minAmount == maxAmount ? 70 : 40) : 25;
      const maxRadius = cw > 650 ? 100 : 70;
      const radiusRange = maxRadius - minRadius;
      const normalizedAmount =
        minAmount == maxAmount
          ? maxAmount
          : (crypto.my_commission - minAmount) / (maxAmount - minAmount);
      const radius = minRadius + normalizedAmount * radiusRange;

      const x = Math.random() * (cw - radius * 2) + radius;
      const y = Math.random() * (ch - radius * 2) + radius;

      const bubble = Bodies.circle(x, y, radius, {
        label: crypto.full_name,
        restitution: 0,
        friction: 0.0,
        frictionAir: 0.0,
      }) as any;

      bubble.cryptoData = crypto;
      return bubble;
    });

    World.add(engine.current.world, bubbles);

    const mouse = Mouse.create(canvasRef.current);
    const mouseConstraint = MouseConstraint.create(engine.current, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    } as IMouseConstraintDefinition);
    World.add(engine.current.world, mouseConstraint);

    (render.current as any).mouse = mouse;

    const applyFloatingForceAndContain = () => {
      bubbles.forEach((bubble) => {
        const floatingForce = 0.00005 * bubble.mass;
        Body.applyForce(bubble, bubble.position, { x: 0, y: -floatingForce });

        const padding: any = bubble.circleRadius;
        if (bubble.position.x < padding) {
          Body.setPosition(bubble, { x: padding, y: bubble.position.y });
          Body.setVelocity(bubble, {
            x: Math.abs(bubble.velocity.x),
            y: bubble.velocity.y,
          });
        }
        if (bubble.position.x > cw - padding) {
          Body.setPosition(bubble, { x: cw - padding, y: bubble.position.y });
          Body.setVelocity(bubble, {
            x: -Math.abs(bubble.velocity.x),
            y: bubble.velocity.y,
          });
        }
        if (bubble.position.y < padding) {
          Body.setPosition(bubble, { x: bubble.position.x, y: padding });
          Body.setVelocity(bubble, {
            x: bubble.velocity.x,
            y: Math.abs(bubble.velocity.y),
          });
        }
        if (bubble.position.y > ch - padding) {
          Body.setPosition(bubble, { x: bubble.position.x, y: ch - padding });
          Body.setVelocity(bubble, {
            x: bubble.velocity.x,
            y: -Math.abs(bubble.velocity.y),
          });
        }
      });
    };

    const renderBubbles = () => {
      bubbles.forEach((bubble) => {
        const { position, circleRadius } = bubble;
        //         account_number
        // :
        // "0100000022"
        // my_commission
        // :
        // 0
        // created_at
        // :
        // "2024-09-24T06:02:14.724643Z"
        // full_name
        // :
        // "A3"
        // nft_logo
        // :
        // ""
        const { my_commission, account_number, full_name, nft_logo } =
          bubble.cryptoData!;

        const baseColor =
          my_commission >= 0
            ? [204, 253, 80] // #C3FF2A
            : [234, 89, 84]; // #f6465d
        const radius = circleRadius ?? 30;

        const gradient = ctx.createRadialGradient(
          position.x,
          position.y,
          0,
          position.x,
          position.y,
          radius
        );
        gradient.addColorStop(
          1,
          `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.8)`
        );
        gradient.addColorStop(
          0,
          `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.2)`
        );

        ctx.beginPath();
        ctx.arc(position.x, position.y, circleRadius!, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Load and draw the image
        // Draw symbol
        ctx.font = `${radius / 4}px Arial`;
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        const maxLength = 10;
        const displayName =
          full_name.length > maxLength
            ? full_name.substring(0, maxLength) + "..."
            : full_name;
        ctx.fillText(displayName, position.x, position.y + radius / 2);
        // ctx.fillText(full_name, position.x, position.y + radius / 2);

        // Draw name
        ctx.font = `${radius / 5}px Arial`;
        ctx.fillText(account_number, position.x, position.y - radius / 3);

        // Draw amount
        ctx.font = `${radius / 6}px Arial`;
        ctx.fillText(
          `${formatCurrency(my_commission, "en-US", "USD")}`,
          position.x,
          position.y
        );
      });
    };

    Events.on(render.current, "afterRender", () => {
      ctx.clearRect(0, 0, cw, ch);
      renderBubbles();
    });

    Runner.run(runner.current, engine.current);
    Render.run(render.current);

    Events.on(engine.current, "afterUpdate", applyFloatingForceAndContain);

    // canvasRef.current.addEventListener("mousemove", (event) => {
    //   const mousePosition = mouse.position;
    //   const hoveredBody = Query.point(
    //     bubbles,
    //     mousePosition
    //   )[0] as CryptoBody | null;

    //   if (hoveredBody && hoveredBody.cryptoData) {
    //     setHoverInfo({
    //       x: event.clientX,
    //       y: event.clientY,
    //       data: hoveredBody.cryptoData,
    //     });
    //   } else {
    //     setHoverInfo({ x: 0, y: 0, data: null });
    //   }
    // });

    // canvasRef.current.addEventListener("mouseleave", () => {
    //   setHoverInfo({ x: 0, y: 0, data: null });
    // });

    canvasRef.current.addEventListener("mousemove", (event) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      const mousePosition = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      const hoveredBody = Query.point(bubbles, mousePosition)[0] as any | null;

      if (hoveredBody && hoveredBody.cryptoData) {
        setHoverInfo({
          x: event.clientX - rect.left,
          y:
            cw > 650
              ? event.clientY - rect.top - 50
              : event.clientY - rect.top - 100,
          data: hoveredBody.cryptoData,
        });
      } else {
        setHoverInfo({ x: 0, y: 0, data: null });
      }
    });

    canvasRef.current.addEventListener("mouseleave", () => {
      setHoverInfo({ x: 0, y: 0, data: null });
    });

    return () => {
      Render.stop(render.current!);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      if (runner.current) {
        Runner.stop(runner.current);
      }
    };
  }, [cryptoData]);

  return (
    <div
      ref={scene}
      style={{
        width: "100%",
        height: "80vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isLoading && <Loading />}
      {!isLoading && (!cryptoData || !cryptoData.length) && (
        <NoData title={"No Data"} description="" />
      )}
      {!isLoading && cryptoData && cryptoData.length > 0 && (
        <PageAnimation>
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              borderRadius: "20px",
            }}
          />
        </PageAnimation>
      )}

      {hoverInfo.data && (
        <div
          style={{
            position: "fixed",
            left: hoverInfo.x + 10,
            top: hoverInfo.y + 10,
            zIndex: 1000,
          }}
        >
          <div className={classes.wrapper}>
            <div
              className={classes.image}
              style={{
                backgroundImage: `url(${NFT_URL}/${hoverInfo.data.nft_logo})`,
              }}
            >
              {hoverInfo.data.nft_logo
                ? ""
                : getFirstLetter(hoverInfo.data.full_name)}
            </div>
            <div className={classes.details}>
              <div className={classes.name}>{hoverInfo.data.full_name}</div>
              <div className={classes.num}>{hoverInfo.data.account_number}</div>
              <div className={classes.earning}>
                Total Earning:
                {formatCurrency(hoverInfo.data.my_commission, "en-US", "USD")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoBubbleChart;
