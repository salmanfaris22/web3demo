import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  MouseEvent,
} from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { geoMercator, GeoProjection } from "d3-geo";
import { feature } from "topojson-client";
import { FeatureCollection } from "geojson";
import styles from "./Map.module.scss";
import Loading from "../../UI/Loading/Loading";

interface GPU {
  lat: number;
  lng: number;
}

interface Position {
  coordinates: [number, number];
  zoom: number;
}

interface Tooltip {
  content: string;
  x: number;
  y: number;
}

interface WorldMapProps {
  rentedGPUs: GPU[];
  zoom: number;
  onZoomChange?: (zoom: number) => void;
  mapColor?: string;
}

const WorldMap: React.FC<WorldMapProps> = ({
  rentedGPUs,
  zoom,
  mapColor = "rgba(191, 191, 191, 1)",
  onZoomChange,
}) => {
  const [geographies, setGeographies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState<Position>({
    coordinates: [0, 0],
    zoom: zoom,
  });
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapSize, setMapSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      if (mapContainerRef.current) {
        setMapSize({
          width: mapContainerRef.current.clientWidth,
          height: mapContainerRef.current.clientHeight,
        });
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("/assets/land.json")
      .then((response) => response.json())
      .then((topology) => {
        const features = (
          feature(
            topology,
            topology.objects.land
          ) as unknown as FeatureCollection
        ).features;
        setGeographies(features);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading map data:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setPosition((prevPosition) => ({
      ...prevPosition,
      zoom: zoom,
    }));
  }, [zoom]);

  const projection: GeoProjection | any = useMemo(() => {
    if (isLoading) return null;
    return geoMercator()
      .fitSize([mapSize.width, mapSize.height], {
        type: "FeatureCollection",
        features: geographies,
      })
      .clipExtent([
        [0, 0],
        [mapSize.width, mapSize.height],
      ])
      .center([0, 30]) // Adjust these values to center the map as desired
      .scale(mapSize.width / 6.28) // Adjust this value to zoom in/out
      .translate([mapSize.width / 2, mapSize.height / 2]);
  }, [geographies, isLoading, mapSize]);

  const gpuPoints = useMemo(() => {
    if (!projection) return [];
    if (Array.isArray(rentedGPUs)) {
      return rentedGPUs.map((gpu) => {
        const [x, y] = projection([gpu.lng, gpu.lat]) || [0, 0]; // Fallback if projection fails
        return { ...gpu, x, y };
      });
    }
  }, [rentedGPUs, projection]);

  const handleMoveEnd = (position: Position) => {
    setPosition(position);
    if (onZoomChange) {
      onZoomChange(position.zoom);
    }
  };

  const backgroundCircles = useMemo(() => {
    const circles = [];
    const radius = 3;
    const dx = radius * 2;
    const dy = radius * 2;
    const width = mapSize.width;
    const height = mapSize.height;

    for (let x = 0; x < width; x += dx) {
      for (let y = 0; y < height; y += dy) {
        circles.push({ x, y });
      }
    }
    return circles;
  }, [mapSize]);

  const renderBackgroundCircles = useMemo(() => {
    return backgroundCircles.map((circle, index) => (
      <circle
        key={`bg-${index}`}
        cx={circle.x}
        cy={circle.y}
        r={3}
        fill="none"
        stroke="rgba(21, 37, 42, 1)"
        strokeWidth={2}
      />
    ));
  }, [backgroundCircles]);

  // const renderGPUPoints = useMemo(() => {
  //   return gpuPoints.map((point, index) => (
  //     <circle
  //       key={`gpu-${index}`}
  //       cx={point.x}
  //       cy={point.y}
  //       r={3}
  //       fill="rgba(204, 253, 81, 1)"
  //       stroke="rgba(22, 49, 56, 1)"
  //       strokeWidth={2}
  //       onMouseEnter={(event: MouseEvent<SVGCircleElement>) => {
  //         const { clientX, clientY } = event;
  //         setTooltip({
  //           content: `GPU at: ${point.lat}, ${point.lng}`,
  //           x: clientX,
  //           y: clientY,
  //         });
  //       }}
  //       onMouseLeave={() => setTooltip(null)}
  //     />
  //   ));
  // }, [gpuPoints]);

  const renderGPUPoints = useMemo(() => {
    return (
      gpuPoints &&
      gpuPoints.map((point, index) => (
        <circle
          key={`gpu-${index}`}
          cx={point.x}
          cy={point.y}
          r={3}
          fill="rgba(204, 253, 81, 1)"
          stroke="rgba(21, 37, 42, 1)"
          strokeWidth={2}
          onMouseEnter={(event: MouseEvent<SVGCircleElement>) => {
            const svgElement = mapContainerRef.current?.getBoundingClientRect();
            if (svgElement) {
              const x = event.clientX - svgElement.left + window.scrollX; // Adjust based on the viewport
              const y = event.clientY - svgElement.top + window.scrollY; // Adjust based on the viewport

              setTooltip({
                content: `User at ${point.lat}, ${point.lng}`,
                x: x,
                y: y,
              });
            }
          }}
          onMouseLeave={() => setTooltip(null)}
        />
      ))
    );
  }, [gpuPoints]);

  const MemoizedGeography: React.FC<{ geography: any }> = React.memo(
    ({ geography }) => (
      <Geography
        geography={geography}
        fill={mapColor}
        stroke="#1E2F35"
        strokeWidth={0.5}
      />
    )
  );

  return (
    <div className={styles.mapOuter} ref={mapContainerRef}>
      <div className={styles.mapContainer}>
        {isLoading && <Loading />}
        {!isLoading && projection && (
          <>
            <ComposableMap
              projection={projection}
              width={mapSize.width}
              height={mapSize.height}
              style={{ backgroundColor: "rgba(21, 37, 42, 1)" }}
            >
              <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates}
                onMoveEnd={handleMoveEnd}
                minZoom={position.zoom}
                maxZoom={position.zoom}
                translateExtent={[
                  [0, 0],
                  [mapSize.width, mapSize.height],
                ]}
              >
                <Geographies geography={geographies}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <MemoizedGeography key={geo.rsmKey} geography={geo} />
                    ))
                  }
                </Geographies>
                {renderBackgroundCircles}
                {renderGPUPoints}
              </ZoomableGroup>
            </ComposableMap>
            {/* {zoom && (
              <div className={styles.controls}>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
              </div>
            )} */}

            {tooltip && (
              <div
                className={styles.tooltip}
                style={{
                  left: `${tooltip.x + 10}px`, // Offset to the right
                  top: `${tooltip.y - 20}px`, // Offset above the point
                  position: "absolute", // Ensure it's positioned relative to the map container
                }}
              >
                {tooltip.content}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WorldMap;
