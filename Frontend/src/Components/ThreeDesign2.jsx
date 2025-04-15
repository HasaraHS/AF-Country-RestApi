import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const App = () => {
  const [hexData, setHexData] = useState([]);
  const [isFullWidth, setIsFullWidth] = useState(false); // toggle state
  const globeRef = useRef();

  useEffect(() => {
    fetch("/dataset/ne_110m_admin_0_countries.geojson")
      .then((res) => res.json())
      .then(({ features }) => setHexData(features))
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  // Optional: Add rotation
  useEffect(() => {
    let animationFrameId;
    const speed = 0.3;

    const rotate = () => {
      if (globeRef.current) {
        const { lat, lng, altitude } = globeRef.current.pointOfView();
        globeRef.current.pointOfView({ lat, lng: lng + speed, altitude }, 50);
      }
      animationFrameId = requestAnimationFrame(rotate);
    };

    rotate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      style={{
        width: isFullWidth ? "100vw" : "50vw",
        height: "100vh",
        margin: 0,
        display: "flex",
        justifyContent: "end",
        backgroundImage:
          "url('//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "width 0.5s ease-in-out", // smooth transition
        position: "relative",
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsFullWidth(!isFullWidth)}
        style={{
          position: "absolute",
          left: "20px",
          top: "20px",
          zIndex: 10,
          padding: "10px 15px",
          backgroundColor: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {isFullWidth ? "Shrink Globe" : "Expand Globe"}
      </button>

      {/* Globe */}
      <div style={{ width: "50%", height: "100%" }}>
        <Globe
          ref={globeRef}
          globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png"
          hexPolygonsData={hexData}
          hexPolygonResolution={3}
          hexPolygonMargin={0.3}
          hexPolygonUseDots={true}
          hexPolygonColor={() =>
            `#${Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")}`
          }
        />
      </div>
    </div>
  );
};

export default App;
