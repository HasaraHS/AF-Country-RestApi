import React, { useEffect, useState } from "react";
import Globe from "react-globe.gl";
import WorldGlobe from "../Components/WorldGlobe";

const App = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Fetch data from the restcountries API
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        // Extract capital cities and coordinates (or other relevant data)
        const placesData = data
          .filter((country) => country.capital) // Only include countries with a capital
          .map((country) => ({
            name: country.capital[0], // Get the first capital if there are multiple
            lat: country.latlng ? country.latlng[0] : 0, // If latlng is available, use it, otherwise default to 0
            lng: country.latlng ? country.latlng[1] : 0, // Same for longitude
            countryName: country.name.common, // The common country name
          }));

        setPlaces(placesData); // Set the extracted data to the state
      })
      .catch((err) => console.error("Failed to fetch places:", err));
  }, []);

  return (
    <div className="flex flex-row flex-1/3 justify-between items-center ">
      <div
        style={{
        //   display: "flex",
        //   flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            // display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {places.map((place, index) => (
            <div key={index} style={cardStyle}>
              <h3>{place.name}</h3>
              <p>
                <strong>Country:</strong> {place.countryName}
              </p>
              <p>
                <strong>Coordinates:</strong> {place.lat}, {place.lng}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-2/3 " />
        <WorldGlobe />
      </div>
    </div>
  );
};

// Card styling for each place
const cardStyle = {
  width: "200px",
  margin: "10px",
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
};

export default App;
