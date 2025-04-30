import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import Card from "../Components/Card";

const ThreeDesign2 = () => {
  const [hexData, setHexData] = useState([]);
  const [datas, setData] = useState([]);
  const [isFullWidth, setIsFullWidth] = useState(true);
  const globeRef = useRef();

  //Fetching Country datas
  useEffect(() => {
    const fetchContries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setData(data);
    };
    fetchContries();
  }, []);

  useEffect(() => {
    fetch("/dataset/ne_110m_admin_0_countries.geojson")
      .then((res) => res.json())
      .then(({ features }) => setHexData(features))
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  useEffect(() => {
    let animationFrameId;
    const speed = 0.2;

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
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      {/* Left Side: Render Home only when globe is not full screen */}
      {!isFullWidth && (
        <div
          style={{
            width: "50vw",
            height: "100vh",
            backgroundColor: "#1a1a1a", // optional styling #1a1a1a
            overflow: "auto",
          }}
        >
          {/* <Home /> */}
          <Card datas={datas} />
        </div>
      )}

      {/* Right Side: Globe */}
      <div
        style={{
          width: isFullWidth ? "100vw" : "15vw",
          height: "100vh",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundImage:
            "url('//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "width 0.5s ease-in-out",
          position: "relative",
        }}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsFullWidth(!isFullWidth)}
          style={{
            position: "absolute",
            left: isFullWidth ? "118px" : "40px",
            top: isFullWidth ? "600px" : "80px",
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

        <div style={{ width: "90%", height: "100%" }}>
          {/* <Globe
            ref={globeRef}
            globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png"
            hexPolygonsData={hexData}
            hexPolygonResolution={3}
            hexPolygonMargin={0.1}
            hexPolygonUseDots={true}
            hexPolygonColor={() =>
              `#${Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0")}`
            }
          /> */}
        </div>

        <div
          className={`absolute text-white  font-extralight text-pretty ${
            !isFullWidth ? "top-10 left-10 text-2xl" : "left-30 top-30 text-7xl"
          }`}
        >
          GoFIND-WORLD
          <span
            className={`mt-6 font-sans w-[400px] text-lg pl-1  ${
              !isFullWidth ? "hidden" : "block"
            }`}
          >
            Discover the world like never before. Explore every country with
            in-depth insights into their capital cities, currencies, religions,
            languages, translations, and precise geographic coordinates. From
            bustling urban centers to remote hidden gems, uncover the unique
            stories, cultures, and traditions that shape our global tapestry.
            Whether you're a curious traveler, an eager student, or simply
            passionate about diverse civilizations, this interactive globe
            transforms your screen into a window to the world—bringing rich
            knowledge and boundless discovery to your fingertips, one nation at
            a time.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThreeDesign2;
