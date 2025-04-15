import React from "react";
import Globe from "react-globe.gl";

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0 }}>
      <Globe
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png"
      />
    </div>
  );
};

export default App;
