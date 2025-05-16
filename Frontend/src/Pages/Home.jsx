import React, { useEffect, useRef, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import Globe from "react-globe.gl";
import Card from "../Components/Card";

const Home = () => {
  const [hexData, setHexData] = useState([]);
  const [datas, setData] = useState([]);
  const [isFullWidth, setIsFullWidth] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const globeRef = useRef();

  const [allCountries, setAllCountries] = useState([]);

  // Get unique language codes and map codes to names
  const languageCodes = Array.from(
    new Set(allCountries.flatMap((country) => Object.keys(country.languages || {})))
  );
  const languageNames = Object.fromEntries(
    allCountries.flatMap((c) =>
      Object.entries(c.languages || {}).map(([code, name]) => [code, name])
    )
  );

  const fetchAllCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setData(data);
      setAllCountries(data);
    } catch (err) {
      console.error("Failed to fetch all countries:", err);
    }
  };

  const fetchCountryByName = async (name) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      if (!res.ok) throw new Error("Country not found");
      const data = await res.json();
      setData(data);
    } catch (error) {
      setError("No country found.");
      console.error("Error fetching countries by name:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtering logic on searchTerm, regionFilter, languageFilter, allCountries
  useEffect(() => {
    const timeout = setTimeout(() => {
      const fetchFilteredCountries = async () => {
        try {
          setLoading(true);
          setError(null);

          if (searchTerm.trim() !== "") {
            await fetchCountryByName(searchTerm);
          } else if (regionFilter) {
            const res = await fetch(`https://restcountries.com/v3.1/region/${regionFilter}`);
            if (!res.ok) throw new Error("Failed to fetch by region");
            const data = await res.json();

            let filteredData = data;
            if (languageFilter) {
              filteredData = data.filter(
                (c) =>
                  c.languages &&
                  Object.keys(c.languages).includes(languageFilter)
              );
            }

            setData(filteredData);
          } else if (languageFilter) {
            const res = await fetch(`https://restcountries.com/v3.1/lang/${languageFilter}`);
            if (!res.ok) throw new Error("Failed to fetch by language");
            const data = await res.json();
            setData(data);
          } else {
            setData(allCountries);
          }
        } catch (err) {
          console.error("Filtering error:", err);
          setError("No country found.");
        } finally {
          setLoading(false);
        }
      };

      fetchFilteredCountries();
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm, regionFilter, languageFilter, allCountries]);

  useEffect(() => {
    fetchAllCountries();
  }, []);

  useEffect(() => {
    fetch(
      "https://af-country-rest-api-pepl.vercel.app/Data/dataset/ne_110m_admin_0_countries.geojson"
    )
      .then((res) => res.json())
      .then(({ features }) => setHexData(features))
      .catch((err) => console.error("Failed to fetch hex data:", err));
  }, []);

  // Rotate the globe slowly
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

  const regions = Array.from(new Set(allCountries.map((c) => c.region).filter(Boolean)));

  return (

    
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      {!isFullWidth && (
        <div
          style={{
            width: "50vw",
            height: "100vh",
            backgroundColor: "#1a1a1a",
            overflow: "auto",
          }}
        >
          <div>
            <div
              className="bg-[#161c1d] flex items-center gap-16 p-4">
              <input
                type="text"
                placeholder="Search by country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-2 px-3 border border-gray-300 rounded-lg shadow-sm"
                style={{ color: "white", backgroundColor: "#161c1d" }}/>

              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="py-2 px-3 border border-gray-300 rounded-lg shadow-sm"
                 style={{ color: "white", backgroundColor: "#161c1d" }}>

                <option value="">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="py-2 px-3 border border-gray-300 rounded-lg shadow-sm"
                style={{ color: "white", backgroundColor: "#161c1d" }}>
                  
                <option value="">All Languages</option>
                {languageCodes.map((code) => (
                  <option key={code} value={code}>
                    {languageNames[code] || code}
                  </option>
                ))}
              </select>
            </div>

            {loading && (
              <p className="text-white text-center py-4">Loading...</p>
            )}
            {error && <p className="text-red-500 text-center py-4">{error}</p>}

            <Card datas={datas} />
          </div>
          
        </div>
      )}

      {/* Globe */}
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
        <button
          onClick={() => setIsFullWidth(!isFullWidth)}
          style={{
            position: "absolute",
            left: isFullWidth ? "110px" : "40px",
            top: isFullWidth ? "570px" : "80px",
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

        <div
          style={{
            position: "absolute",
            left: isFullWidth ? "110px" : "40px",
            top: isFullWidth ? "620px" : "130px",
            zIndex: 5,
            backgroundColor: "white",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const token = credentialResponse.credential;
              const decoded = jwtDecode(token);
              console.log("Decoded User Info:", decoded);
            }}
            onError={() => console.log("Login Failed")}
          />
        </div>

        <div style={{ width: "90%", height: "100%" }}>
          <Globe
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
          />
        </div>

        <div
          className={`absolute text-white font-extralight ${
            !isFullWidth ? "top-10 left-10 text-2xl" : "left-30 top-30 text-7xl"
          }`}
          style={{ pointerEvents: "none" }}
        >
          GoFIND-WORLD
          <span
            className={`mt-6 font-sans w-[400px] text-lg pl-1 ${
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

export default Home;
