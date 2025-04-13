// import React, { useEffect, useState } from "react";
// import Globe from "react-globe.gl";

// const App = () => {
//   const [countries, setCountries] = useState({ features: [] });

//   useEffect(() => {
//     fetch("./Dataset/ne_110m_admin_0_countries.geojson")
//       .then((res) => res.json())
//       .then(setCountries)
//       .catch((err) => console.error("Error loading GeoJSON:", err));
//   }, []);

//   useEffect(() => {
//     console.log("Updated countries:", countries);
//   }, [countries]);

//   return (
//     <div style={{ width: "100vw", height: "100vh", margin: 0 }}>
//       <Globe
//         globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg"
//         hexPolygonsData={countries.features}
//         hexPolygonResolution={3}
//         hexPolygonMargin={0.3}
//         hexPolygonUseDots={true}
//         hexPolygonColor={() =>
//           `#${Math.round(Math.random() * Math.pow(2, 24))
//             .toString(16)
//             .padStart(6, "0")}`
//         }
//         hexPolygonLabel={({ properties: d }) => `
//           <div>
//             <div><b>${d.ADMIN} (${d.ISO_A2})</b></div>
//             <div>Population: <i>${d.POP_EST}</i></div>
//           </div>
//         `}
//       />
//     </div>
//   );
// };

// export default App;


// File: App.jsx
import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";
// import dad from '../public/Dataset/ne_110m_admin_0_countries.geojson'

const App = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("/Dataset/ne_110m_admin_0_countries.geojson")
      .then((res) => res.json())
      .then(({ features }) => setPlaces(features))
      .catch((err) => console.error("Failed to fetch places:", err));
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0 }}>
      <Globe
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png"
        labelsData={places}
        labelLat={(d) => d.properties.latitude}
        labelLng={(d) => d.properties.longitude}
        labelText={(d) => d.properties.name}
        labelSize={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
        labelDotRadius={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
        labelColor={() => "rgba(255, 165, 0, 0.75)"}
        labelResolution={2}
      />
    </div>
  );
};

export default App;

